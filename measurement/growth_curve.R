# Load necessary packages
library(ggplot2)
library(dplyr)
library(nls2) # For nonlinear least squares fitting
library(broom) # For tidying model results

# Read the data
# Please manually import the data and name it growth_curve

# 2. Basic Visualization: Scatter plot with error bars
base_plot <- ggplot(growth_curve, aes(x = Time, y = Mean, color = Group, group = Group)) +
  geom_point(size = 2) +
  geom_errorbar(aes(ymin = Mean - SD, ymax = Mean + SD), width = 0.5) +
  labs(x = "Time (Hour)", y = "Cell Count x 10^6 /mL",
       title = "Growth Curves with Error Bars") +
  theme_minimal()

print(base_plot)

# 3. Model Fitting - Using the Logistic Growth Model (Most common)
# Logistic Model Formula: y = K / (1 + exp(-r*(t - t0)))

# Fit the model for each group separately
fit_models <- function(data) {
  print(paste("Type of 'data' is:", class(data))) 
  models <- list()
  # Initialize results list
  models <- list()
  model_results <- data.frame()
  
  # Perform fitting for each group
  for(group_name in unique(data$Group)) {
    group_data <- data[data$Group == group_name, ]
    
    # --- Integration Improvement 1: Calculate weights and prevent SD=0 ---
    # Use 1e-6 as a tiny constant to prevent division by zero
    group_data$Weight <- 1 / (group_data$SD^2 + 1e-6)
    # The max() replacement is no longer needed because 1e-6 already prevents Inf
    
    # --- Integration Improvement 2: Estimate initial parameters for better convergence ---
    # 1. Asym (Maximum growth): Take the maximum value of Mean and slightly increase it by 5%
    max_y <- max(group_data$Mean)
    # 2. xmid (Inflection point time): Take the midpoint of the Time range
    mid_t <- (min(group_data$Time) + max(group_data$Time)) / 2
    # 3. scal (Growth rate): Set a reasonable initial value
    initial_guess <- list(Asym = max_y * 1.05, 
                          xmid = mid_t, 
                          scal = 3) # Default to 3
    
    tryCatch({
      # Attempt to use the Self-Starting model (SSlogis) + Weighted fitting
      # Note: Theoretically, 'start' parameter isn't needed with SSlogis,
      # but nls's internal mechanism allows both, we provide it as an extra safeguard.
      model <- nls(Mean ~ SSlogis(Time, Asym, xmid, scal),
                   data = group_data,
                   weights = Weight,
                   start = initial_guess)  # <--- Key integration point
      
      # Save model, extract parameters, and calculate R-squared (The following code remains unchanged)
      models[[group_name]] <- model
      params <- coef(model)
      predicted <- predict(model)
      r_squared <- 1 - sum((group_data$Mean - predicted)^2) /
        sum((group_data$Mean - mean(group_data$Mean))^2)
      
      # Store results
      result <- data.frame(
        Group = group_name,
        Asym = params["Asym"],
        xmid = params["xmid"],
        scal = params["scal"],
        R_squared = r_squared,
        AIC = AIC(model),
        BIC = BIC(model)
      )
      model_results <- rbind(model_results, result)
      
      cat("Successfully fitted group:", group_name, "\n")
      cat("Model parameters:\n")
      print(params)
      cat("R-squared:", r_squared, "\n\n")
      
    }, error = function(e) {
      cat("Fitting failed for group", group_name, ":", e$message, "\n")
    })
  }
  
  return(list(models = models, results = model_results))
}


# Execute model fitting
fitting_results <- fit_models(growth_curve)
models <- fitting_results$models
model_stats <- fitting_results$results

# Output model statistics
print("Model fitting statistics for each group:")
print(model_stats)

# 4. Generate fitted curve data and add to the plot (Code remains unchanged)
generate_fit_curves <- function(data, models) {
  # Create a dense sequence of time points for a smooth curve
  time_range <- range(data$Time)
  time_seq <- seq(time_range[1], time_range[2], length.out = 100)
  
  fit_data <- data.frame()
  
  for(group_name in names(models)) {
    model <- models[[group_name]]
    
    # Predict fitted values
    predicted <- predict(model, newdata = data.frame(Time = time_seq))
    
    group_fit <- data.frame(
      Time = time_seq,
      Mean = predicted,
      Group = group_name
    )
    
    fit_data <- rbind(fit_data, group_fit)
  }
  
  return(fit_data)
}

# Generate fitted curve data
fit_curves <- generate_fit_curves(growth_curve, models)

# 5. Final Plot: Raw data + Error bars + Fitted curve (Code remains unchanged)
final_plot <- ggplot() +
  # Add raw data points and error bars
  geom_point(data = growth_curve, aes(x = Time, y = Mean, color = Group), size = 2) +
  geom_errorbar(data = growth_curve,
                aes(x = Time, ymin = Mean - SD, ymax = Mean + SD, color = Group),
                width = 0.5) +
  # Add fitted curve - Use linewidth instead of size
  geom_line(data = fit_curves, aes(x = Time, y = Mean, color = Group),
            linewidth = 1.0, linetype = "solid") + 
  labs(x = "Time (Hour)", y = "Cell Count x 10^6 /mL",
       title = "Growth Curves with Logistic Model Fitting",
       subtitle = "Points: measured data with error bars, Lines: logistic model fit") +
  theme_minimal() +
  theme(
    text = element_text(family = "Outfit"),
    
    plot.title = element_text(size = 18, face = "bold"),
    plot.subtitle = element_text(size = 14),
    
    axis.title.x = element_text(size = 16),
    axis.title.y = element_text(size = 16),
    
    axis.text.x = element_text(size = 12),
    axis.text.y = element_text(size = 12),
    
    legend.text = element_text(size = 12),
    legend.title = element_blank(), 
    legend.position = "bottom"
  )

print(final_plot)

