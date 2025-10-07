---
title: Model
authors:
  - name: Jihua Tang
    url: /fudan/team/#Jihua
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/tjh-a.webp
  - name: Yue Yue
    url: /fudan/team/#Yue
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/yy-a.webp
layout: igem
heroImage: https://static.igem.wiki/teams/5643/pageimage/model/heroimage-model.webp
description: On this page, we describe a model of dynamic protein timers in yeast, with design recommendations independently validated by AI-assisted reasoning, before any wet-lab experiment.
---

## Highlights — A New Paradigm for Synthetic Biology in the AI Era

Traditional synthetic biology relies on iterative Design–Build–Test–Learn (DBTL) cycles, where modeling informs initial designs, but multiple rounds of wet-lab experimentation are often needed to refine parameters and achieve functional outcomes. While effective, this process can be time-consuming and resource-intensive, especially when initial model predictions lack sufficient biological fidelity.

Our work reimagines this cycle by introducing an [AI-augmented modeling framework](#ai-aided-validation-of-model-predictions) that dramatically increases the predictive accuracy of in silico design—enabling first-attempt success in wet experiments. Centered on a biophysically grounded model of fluorescent timer (Fast-FT) dynamics in yeast, we systematically screen critical parameters—such as Ash1 promoter pulse width (10–15 min), promoter strength (1×), and maturation kinetics—under realistic cellular conditions (30°C, YPD medium). Crucially, these model-derived recommendations were independently validated by two large language models ([DeepSeek](https://chat.deepseek.com/) and [Qwen](https://chat.qwen.ai/)), which—when prompted only with biological first principles—converged on the same optimal design choices.

This convergence between mechanistic modeling and AI reasoning provides unprecedented confidence in pre-experimental parameter selection. Rather than replacing the DBTL cycle, our approach supercharges the “Design” phase, minimizing failed builds and accelerating the path to reliable, interpretable results. By demonstrating that AI can serve as a “AI reasoning partner” in hypothesis generation and experimental planning, we offer a scalable, reproducible blueprint for the next generation of synthetic biology projects—one where computational foresight and wet-lab execution move in lockstep from day one.

## Why This Model?

In synthetic biology and cellular timing studies, constructing a reliable and readable intracellular timer is crucial for understanding cellular life cycles, lineage relationships, and dynamic processes. Fluorescent Timer (FT) proteins, which change color over time, have become a powerful tool for achieving this goal. However, in practical applications, the performance of FT proteins is influenced by multiple factors, including expression strategies, maturation dynamics, cell division inheritance, and environmental conditions. To systematically evaluate and optimize these factors before conducting experiments, we have developed this mathematical model. It aims to theoretically screen feasible parameter ranges, validate the reasonableness of promoter selection and expression control, and provide clear design guidelines for subsequent wet-lab experiments.

## Introduction

This model is centered around the "single pulse → three-step irreversible maturation chain (C→B→I→R)" and simulates the entire process from promoter expression to the complete maturation of the fluorescent protein. It uses $r(t) = \frac{R}{B + R}$ and $\Delta r$ as criteria to evaluate the readability and monotonicity of the timer. By adjusting the pulse width (the duration of Ash1 pulses), maturation time constants ($\tau_B, \tau_I, \tau_R$), and pulse intensity (adjusting promoter strength), we first screen for "usable intervals" mathematically, and then provide reproducible target conditions for wet experiments. The model compares periodic promoters (Ash1) with constitutive promoters: the former provides short and clean expression windows, improving $\Delta r$ and monotonicity; the latter, under the same maturation parameters, tends to dilute time resolution due to continuous new molecule generation, and thus is used as a control to demonstrate the necessity of pulse gating. To address cases where promoter expression is either too high or too low, the model incorporates promoter strength ($pulse_{amp}$) and intergenerational inheritance (inheritance fraction, $pp$) into sensitivity analysis. By controlling promoter strength, we ensure that the system provides an appropriate level of protein expression while avoiding premature saturation or insufficient signaling. In summary, the model systematically examines and quantifies two critical factors: promoter selection and promoter strength, validating the reasonableness of selecting the Ash1 promoter and an appropriate promoter strength from both the mathematical and model perspectives before conducting wet experiments.

## Model Design

In a yeast multicellular system, the timer fluorescent protein (FT) is introduced to represent the time process between the birth and maturation of cells. FT consists of an irreversible maturation chain: **C→B→I→R**, where:

- **C** represents the immature protein;
- **B** represents the blue state;
- **I** represents the intermediate state;
- **R** represents the red state.

The color change reflects the time elapsed since the cell's birth.

This model is based on the following experimental settings:

- Cell cycle: approximately 87 minutes[^6] (source: [BioNumbers](https://bionumbers.hms.harvard.edu/bionumber.aspx?id=104360&ver=15));
- Fluorescent protein: *Fast-FT*[^1] is selected;
- Expression trigger: using a single pulse (based on the later comparison of periodic and constitutive promoters).

## Parameters

<div style="text-align: left;">
        <span style="color:gray">Table 1. Parameters (global variables) for the model</span>
        <br>
    </div>

| **Parameter** | **Meaning**                                | **Default Value**       | **Unit** |
| ------------------- | ---------------------------------------------- | -------------------------------- | -------- |
| **$Tcc_{min}$**      | Cell cycle length | 87                               | min      |
| **$t_{endmin}$**   | Single-cell simulation duration | 20160                       | min      |
| **$dt_{min}$**      | Integration step size | 1.0                           | min      |
| **$pulse_{widthmin}$** | Pulse duration | 15                               | min      |
| **$pulse_{amp}$**   | Pulse amplitude                   | 1.0                              | -        |
| **$k_{dm}$**        | mRNA degradation rate | \($\ln 2 / 10$\)                 | min⁻¹    |
| **$\tau_{Bmin}$** | C to B time constant       | 12.0                             | min      |
| **$\tau_{Imin}$** | B to I time constant       | 45.0                             | min      |
| **$\tau_{Rmin}$**  | I to R time constant       | 720.0                            | min      |
| **$t_{12}^{(R)}$** | Red protein half-life      | 247.2                       | h        |
| **$inherit_{frac,C}$** | Inheritance fraction of C-state protein | 1.0                           | -        |
| **$k_B$**           | C to B rate constant         | \($1 / \tau_B$\)                 | min⁻¹    |
| **$k_I$**           | B to I rate constant         | \($1 / \tau_I$\)                 | min⁻¹    |
| **$k_R$**           | I to R rate constant         | \($1 / \tau_R$\)                 | min⁻¹    |
| **$k_{DR}$**       | Red protein degradation rate | \($\ln 2 / (t_{12}^{(R)} \cdot 60)$\) | min⁻¹    |

### Fast-FT Time Parameter Calculation

#### 1. Basis for Calculation and Core Logic

The fluorescence maturation of Fast-FT (from blue to red) is essentially a chemical process involving chromophore oxidation and conformational rearrangement. The rate of this process is strictly dependent on temperature and follows the biochemistry "temperature coefficient (Q₁₀)" rule — that is, for every 10°C increase, the reaction rate increases by 1.5–2.5 times. The typical Q₁₀ value for FT-like proteins in the literature is close to 2.0.

##### 1.1 Literature Data Summary

The core data for the calculation is derived from literature on Fast-FT key time parameters at 25°C (in vitro purified + intracellular, Drosophila S2 cells) and 37°C (in vitro purified + intracellular, HeLa cells). Specific data are shown below:

<div style="text-align: center;">
        <span style="color:gray">Table 2. Data summary for Fast-FT time parameter</span>
        <br>
    </div>

| Temperature | Experimental System        | Blue Fluorescence Peak Time (h) | Red Fluorescence Half-Peak Time (h) | Remarks                                                      |
| ----------- | -------------------------- | ------------------------------- | ----------------------------------- | ------------------------------------------------------------ |
| 25°C        | In vitro purified protein  | 0.58                            | 18.0                                | No cellular environment, reflects chromophore maturation     |
| 25°C        | Intracellular (S2 cells)   | 13.0                            | 38.0 (estimated)                    | Includes mRNA translation delay and protein degradation      |
| 37°C        | In vitro purified protein  | 0.25                            | 7.1                                 | Higher temperature accelerates maturation, much faster than at 25°C |
| 37°C        | Intracellular (HeLa cells) | 17.0 (trend value)              | 41.0 (trend value)                  | Longer blue/red time compared to in vitro                    |

##### 1.2 Q₁₀ Calculation (Temperature Coefficient)

Q₁₀ is the core index for quantifying the impact of temperature on the reaction rate. The formula (Arrhenius equation) is:
$$
Q_{10} = \left( \frac{v_{T2}}{v_{T1}} \right)^{\frac{10}{T2-T1}}
$$
Where:

- $v_{T1}$ and $v_{T2}$ are the reaction rates at temperatures T1 and T2;
- T1 and T2 are the two temperature points (°C).

We calculate Q₁₀ based on the in vitro data at 25°C (T1) and 37°C (T2):

- T1=25°C, red half-peak time $t1 = 18.0\ \text{h}$, rate $v1 = 1/18.0\ \text{h}^{-1}$;
- T2=37°C, red half-peak time $t2 = 7.1\ \text{h}$, rate $v2 = 1/7.1\ \text{h}^{-1}$;
- Temperature difference $\Delta T = 12°C$.

Substituting into the formula:
$$
Q_{10} = \left( \frac{1/7.1}{1/18.0} \right)^{\frac{10}{12}} \approx 2.0
$$
This result aligns with the typical Q₁₀ range (1.8–2.2) for FT-like proteins in literature, confirming the reliability of the subsequent calculations.

##### 1.3 Parameter Calculation at 30°C

For yeast experiments, the target temperature is 30°C (T3). We will use the data at 25°C (T1) for intracellular conditions (aligned with the yeast physiological environment) and a Q₁₀ value of 2.0 for calculations:

###### (1) Core Formula

When the temperature rises from T1 (25°C) to T3 (30°C), the temperature difference is $\Delta T' = 5°C$, and the rate increase factor and time shortening ratio are:
$$
\text{Rate increase factor} = Q_{10}^{\frac{\Delta T'}{10}} = 2.0^{0.5} \approx 1.41
$$
Thus, the 30°C time can be calculated as:
$$
\text{30°C time} = \frac{\text{25°C intracellular time}}{\text{Rate increase factor}}
$$

###### (2) Specific Parameter Calculation

<div style="text-align: center;">
        <span style="color:gray">Table 3. Specific parameter calculation at 30°C</span>
        <br>
    </div>

| Metric                          | 25°C Intracellular Time (h) | 30°C Estimated Time (h) | Calculation Logic                                            |
| ------------------------------- | --------------------------- | ----------------------- | ------------------------------------------------------------ |
| Blue Fluorescence Peak Time     | 13.0                        | 9.2 (≈9–10)             | 13.0 / 1.41 ≈ 9.2, considering differences in translation rate between yeast and S2 cells |
| Red Fluorescence Half-Peak Time | 38.0                        | 30.0 (≈29–31)           | 38.0 / 1.41 ≈ 30.0, more stable as red maturation is less influenced by intracellular factors |
| Red Fluorescence Peak Time      | 200.0 (S2 cells)            | 141.8 (≈140–145)        | 200.0 / 1.41 ≈ 141.8, used for long-term tracking experiments (e.g., intergenerational lineage analysis) |

##### 1.4 Reasonableness Check

- **Temperature Range Match**: 30°C is between 25°C (lower limit for yeast) and 37°C (mammalian body temperature), so the estimated result is free from extrapolation errors.
- **Cellular Environment Consistency**: The translation and protein degradation rates in S2 cells at 25°C align closely with yeast, and since both are lower eukaryotes, the biochemical interference is minimal, ensuring the chemical maturation and biological interference total time is comparable.
- **Non-Core Variables Exclusion**: The pH of YPD 6.0–6.5 is within the fluorescent stability range of Fast-FT (pH 5.4–7.4), and the YPD medium only provides nutrients without affecting chromophore chemical maturation. Hence, no parameter adjustments are needed.

## Assumptions

1. **Single Pulse**: Each cell expresses the fluorescent protein once near the end of the cell cycle and stops expression after the pulse.
2. **Protein Transfer Mechanism**: The immature C-state protein generated in the mother cell enters the daughter cell and matures within the daughter cell.
3. **Irreversible Maturation Chain**: The maturation process from C (immature protein) to B (blue state), I (intermediate state), and R (red state) is irreversible.
4. **Red-state Degradation**: Red-state protein has a degradation rate controlled by its half-life, $t_{12}^{(R)}$.

## Model Establishment

### 1) Input

The input function $u(t)$ represents a "pulse starting at the birth time, lasting for $\tau$ minutes" with an amplitude $A$:
$$
u(t)=A\cdot \mathbf{1}_{0\le t < \tau}
$$
where $\mathbf{1}_{0 \leq t < \tau}$ indicates that when $t$ is within the duration of the pulse, $u(t)=A$; otherwise, it is 0. This is specifically implemented as `u_birth_pulse`.

```python
def u_birth_pulse(t_since_div: float, pulse_width: float, pulse_amp: float, 
                  start_offset: float, Tcc: float) -> float:
    """Generate cell division-related expression pulse"""
    # Calculate time position within cell cycle (0 to Tcc)
    cycle_time = t_since_div % Tcc
    # pulse starts near end of cell cycle (from start_offset to Tcc)
    if start_offset <= cycle_time <= Tcc:
        # maintain amplitude within pulse duration, else 0
        return pulse_amp if (cycle_time - start_offset) <= pulse_width else 0.0
    return 0.0
```

### 2) State Variables

- **m**: mRNA concentration
- **C**: Immature protein concentration
- **B**: Blue-state concentration
- **I**: Intermediate-state concentration
- **R**: Red-state concentration

- **Output reading**：$r(t) = \frac{R}{B + R}$

### 3) Kinetic Equations

The system's kinetic equations describe mRNA synthesis, translation, and maturation processes:
$$
\begin{aligned} \dot m &= k_{tx}\,u(t)-k_{dm}\,m,\\ \dot C &= k_{tl}\,m - k_B\,C,\\ \dot B &= k_B\,C - k_I\,\,B,\\ \dot I &= k_I\,B - k_R\,I,\\ \dot R &= k_R\,I - k_{DR}\,R. \end{aligned}
$$

These equations are computed in the inline function `f(t, y)` in `simulate_single_cell`, and then advanced using a numerical integration method (such as RK4)[^4][^5].

```python
def f(t: float, y: np.ndarray) -> np.ndarray:
    m, C, B, I, R, v, t_since_div = y
    
    # Cell division logic (concentration dilution and state reset)
    division_occurred = False
    if t_since_div >= p.Tcc_min or v >= p.v0 * p.division_volume_ratio:
        # divide all concentrations by 2 (dilution)
        m = m / 2.0
        C = C / 2.0
        B = B / 2.0
        I = I / 2.0
        R = R / 2.0
        v = p.v0  # reset volume
        t_since_div = 0.0  # reset division timer
        division_occurred = True
    
    # Promoter pulse input
    u = u_birth_pulse(t_since_div, p.pulse_width_min, p.pulse_amp, p.pulse_start_offset, p.Tcc_min)
    k_tx_base, k_tl_base = get_transcription_translation_rates(t_since_div, p.Tcc_min)
    
    # Calculate crowding effect
    total_conc = m + C + B + I + R
    crowding_factor = crowding_correction(total_conc, p.crowding_threshold, p.crowding_strength)
    
    # Apply crowding correction to rates
    k_tx = k_tx_base * crowding_factor
    k_tl = k_tl_base * crowding_factor
    k_B = p.k_B * crowding_factor
    k_I = p.k_I * crowding_factor
    k_R = p.k_R * crowding_factor

    # Calculate derivatives with volume correction
    dm_dt_amount = k_tx * u - p.k_dm * m
    dm_dt = (dm_dt_amount / v) - (m / v) * (p.growth_rate * v)  # mRNA rate
    
    dC_dt_amount = k_tl * m - k_B * C
    dC_dt = (dC_dt_amount / v) - (C / v) * (p.growth_rate * v)  # C-state rate
    
    dB_dt_amount = k_B * C - k_I * B
    dB_dt = (dB_dt_amount / v) - (B / v) * (p.growth_rate * v)  # B-state rate
    
    dI_dt_amount = k_I * B - k_R * I
    dI_dt = (dI_dt_amount / v) - (I / v) * (p.growth_rate * v)  # I-state rate
    
    dR_dt_amount = k_R * I
    if include_decay:
        dR_dt_amount -= p.k_DR * R
    dR_dt = (dR_dt_amount / v) - (R / v) * (p.growth_rate * v)  # R-state rate
    
    dv_dt = p.growth_rate * v  # volume growth rate
    dt_since_div_dt = 1.0      # division timer increment
    
    return np.array([dm_dt, dC_dt, dB_dt, dI_dt, dR_dt, dv_dt, dt_since_div_dt])
```

### 4) Inheritance Logic

Only the immature C-state protein is inherited, while B, I, and R are not inherited. The initial conditions for daughter cells are:
$$
C_{\text{daughter cell}}(0) = C_{\text{mother cell}}(\text{at division}) \times inherit_{frac,C}, \quad B_{\text{daughter cell}}(0) = 0, \quad I_{\text{daughter cell}}(0) = 0, \quad R_{\text{daughter cell}}(0) = 0
$$

```python
# Daughter cell inherits mother's C-state protein
if t[-1] >= p.Tcc_min:
    # interpolate C-state concentration at division time
    C_T = float(np.interp(p.Tcc_min, t, out["C"]))
else:
    C_T = out["C"][-1]
# calculate initial C-state for daughter cell by inheritance ratio
C_inherit = p.inherit_frac_C * C_T

# Initial state of daughter cell (B/I/R are 0)
# B_inherit = 0.0
# I_inherit = 0.0
# R_inherit = 0.0
```

## Results

### Single-cell time series

**Objective match:** We verify whether the chosen maturation constants $(\tau_B, \tau_I, \tau_R)$ yield the expected phase ordering (blue rises first, red later), and whether the readout $r(t)=\dfrac{R}{B+R}$ is monotonic.

**Observations:**

- $B(t)$ peaks at approximately $\sim 20,\mathrm{h}$ and then decays.
- $R(t)$ exhibits a delayed rise and accumulates markedly only after several tens of hours.
- As $B\to 0$, $r(t)\to 1$.

**Consistency check:** The curve shapes are consistent with a three-step irreversible chain $C\to B \to I \to R$.

**Conclusion:** The relative ordering of maturation times is physically reasonable and reproduces the expected waveform morphology.

![](https://static.igem.wiki/teams/5643/pageimage/model/figure1-single-cell-b-r-left-r-right.webp)

<div style="text-align: center;" id="fig1">
        <span style="color:gray">Figure 1. Single-cell- B-R (left) & r (right)</span>
        <br><br>
    </div>


### Pulse width vs $\Delta r$

**Objective match:** For the $65\text{–}145\mathrm{min}$ window under the current maturation times, assess how temporal resolvability varies with pulse width $\tau$.

**Observations (quantified):** As $\tau$ increases, $\Delta r$ decreases approximately linearly:

- $\tau=8,10,12,15\mathrm{min}$ give $\Delta r\approx 0.115,0.112,0.107,0.101$;
- $\tau=20,25,30\mathrm{min}$ give $\Delta r\approx 0.091,0.082,0.076$.

**Criterion:** With a typical quantitative imaging noise $\sigma_r\approx 0.03$, the “3σ” line is $3\sigma_r\approx 0.09$. Thus:

- $\tau\le 15,\mathrm{min}$ **passes**;
- $\tau=20,\mathrm{min}$ is **borderline**;
- $\tau\ge 25,\mathrm{min}$ **fails**.

**Conclusion:** Under the present Fast-FT kinetics, constraining the birth pulse to $10\text{–}15\mathrm{min}$ yields $\Delta r>3\sigma$ in the $65\text{–}145\mathrm{min}$ window and is therefore readable.

![](https://static.igem.wiki/teams/5643/pageimage/model/figure2-r-65-145-min-vs-pulse-width.webp)

<div style="text-align: center;" id="fig1">
        <span style="color:gray">Figure 2. &delta;r(65→145 min) vs pulse width τ</span>
        <br><br>
    </div>


### Lineage analysis

Birth-aligned lineage heatmaps show that $r$ increases roughly monotonically over time in each generation, with the largest increment concentrated in $24\text{–}48\mathrm{h}$. Across generations, the signal exhibits a unimodal pattern: it grows from $G0$ to $G2$ (maximal at $G2$), then declines from $G3$ onward, reaching its lowest level by $G5\text{–}G6$. Row-wise baseline correction within each generation ($r'$) enhances contrast and emphasizes the same inter-generational ordering and the slope differences in the $24\text{–}48\mathrm{h}$ interval, without altering the overall temporal trend.

![](https://static.igem.wiki/teams/5643/pageimage/model/figure3-lineage-r-heatmap-birth-aligned.webp)

<div style="text-align: center;" id="fig1">
        <span style="color:gray">Figure 3. Lineage r heatmap (birth-aligned)</span>
        <br><br>
    </div>


![](https://static.igem.wiki/teams/5643/pageimage/model/figure4-lineage-r-heatmap-baseline-corrected.webp)

<div style="text-align: center;" id="fig1">
        <span style="color:gray">Figure 4. Lineage r' heatmap (baseline-corrected)</span>
        <br><br>
    </div>


## Analysis

### Periodic Promoter vs Constitutive Promoter

#### $\Delta r$ vs Pulse Width

- **Observation:** Under fixed expression strength, $\Delta r$ decreases monotonically as the pulse width $\tau$ increases:
   $\tau=10 \mathrm{min}$ is superior to $\tau=15\mathrm{min}$, and both are much better than $\tau=30\mathrm{min}$ or ON (continuous expression), namely $\tau$=10 ≳ $\tau$=15 ≫ $\tau$=30 > $\tau$=50 ≫ ON.

    The readings are approximately as follows:

  - $\tau=10\mathrm{min} \approx 0.11$, $\tau=15\mathrm{min} \approx 0.10$ (significantly above the threshold $3\sigma \approx 0.09$);
  
  - $\tau=30\mathrm{min} \approx 0.074$, $\tau=50\mathrm{min} \approx 0.049$, lower than 0.09;

  -  ON expression gives $\Delta r \approx 0.031$, the worst performance.
  
- **Criterion:**
    $\Delta r = r(90) - r(10)$ measures the dynamic range within the $10\text{–}90,\mathrm{min}$ window. Using a typical noise level of $\sigma_r \approx 0.03$, the 3$\sigma_r$ threshold is $\Delta r \approx 0.09$.

   - $\tau \leq 15\mathrm{min}$ **passes**;
   - $\tau = 20\mathrm{min}$ is **borderline**;
   - $\tau \geq 25\mathrm{min}$ **fails**.
   
- **Conclusion:** Shorter pulses, such as $\tau=10\text{–}15\mathrm{min}$, effectively compress the expression near cell birth, followed by the maturation process, yielding a clear signal within the $10\text{–}90\mathrm{min}$ window. Meanwhile, continuous expression dilutes the signal, making it difficult to distinguish changes in $r(t)$.

![](https://static.igem.wiki/teams/5643/pageimage/model/figure5-delta-r-vs-10-90-min-window.webp)

<div style="text-align: center;" id="fig1">
        <span style="color:gray">Figure 5. &Delta;r vs τ (10-90 min window)</span>
        <br><br>
    </div>


#### $r(t)$ Overlaid Curves

- **Observation:** All curves show monotonic increase within $0\text{–}120\mathrm{min}$, but the slope and final value decrease significantly with increasing $\tau$, with the ON expression showing the flattest rise.

- **Interpretation:** While monotonicity is achieved (a key feature of the timer), readability (slope and amplitude) is strongest in shorter pulses:
- $\tau = 10\mathrm{min}$ and $\tau = 15\mathrm{min}$ show the fastest increase in $r(t)$ from $60\text{–}120\mathrm{min}$ with the highest final value;
  - The ON curve rises the slowest.

This pattern occurs because after a short pulse, the system almost no longer adds new blue protein, and the red protein accumulates, making $r$ increase rapidly. In contrast, continuous expression constantly adds new blue proteins, dampening $r$.

![](https://static.igem.wiki/teams/5643/pageimage/model/figure6-rt-t-overlay-fairness-equal-intensity.webp)

<div style="text-align: center;" id="fig1">
        <span style="color:gray">Figure 6. r(t) overlay (fairness- equal_intensity)</span>
        <br><br>
    </div>



#### Lineage Heatmap Comparison

##### $r$ Lineage Heatmap Comparison

- **Observation:** The left side of all heatmaps (near birth) shows a "bright band," indicating inheritance of the red baseline across generations. Comparing the three conditions:
  - **$\tau = 15$**: After birth, $r$ rises quickly, and the "bright band" dims, followed by a rapid brightening in later generations, showing strong temporal resolution.
  
  - **$\tau = 50$**: The gradient is much shallower.
  
  - ON: The gradient is the flattest and overall dimmer, indicating poor resolution within $0\text{–}90\mathrm{min}$.
- **Interpretation:** Shorter pulses result in stronger intra-generational dynamics, while ON expression leads to weak signal contrast within generations, making inter-generational analysis less effective.

##### $r'$ (Baseline Subtracted) Lineage Heatmap Comparison

- **Observation:** After baseline subtraction, all three heatmaps show the "pure contemporary increment." The color scale upper limit reflects the dynamic range:
  
  - **$\tau = 15$**: The upper limit is $\approx 0.09$ with the steepest gradient across generations.
  
  - **$\tau = 50$**: The upper limit is $\approx 0.04$, with a gentler gradient.
  
  - ON: The upper limit is $\approx 0.028$, with the flattest gradient.
- **Interpretation:** Even after baseline correction, shorter pulses maintain strong temporal resolution within generations, while ON expression fails to distinguish subtle age differences.

![](https://static.igem.wiki/teams/5643/pageimage/model/figure7-lineage-heatmap-comparison.webp)

<div style="text-align: center;" id="fig1">
        <span style="color:gray">Figure 7. Lineage Heatmap Comparison</span>
        <br><br>
    </div>


#### Single-Chain Four-Generation $r'$ Overlaid Curves

- **Observation:** In the time series of the mother cell (G0) to the fourth generation (G4):
  
  - **$\tau = 15$**: Each generation's $r'$ curve shows significant bending and steepening in the $0\text{–}90\mathrm{min}$ window.
  
  - ON: Each generation’s $r'$ curve rises more slowly, with weaker bending and a smoother curve in the early stage.
- **Interpretation:** Over multiple generations, $\tau = 15$ maintains high readability, while ON expression causes a slow start, making it difficult to finely resolve age differences between generations.

![](https://static.igem.wiki/teams/5643/pageimage/model/figure8-four-generation-rprime-chains-fairness-equal-intensity.webp)

<div style="text-align: center;" id="fig1">
        <span style="color:gray">Figure 8. Four-generation rprime chains - fairness equal_intensity</span>
        <br><br>
    </div>


In summary, using a periodic promoter (Ash1) with a pulse width controlled between 10–15 minutes provides a reliable and distinguishable timing signal; in contrast, a constitutive promoter is not suitable for use as a timer input.

### Strong Promoter vs Weak Promoter

In this model, the red-to-blue ratio $r(t)$ is used as the key indicator for evaluating timer performance, representing the ratio of red-state protein (R) to blue-state protein (B) at any given time, as described by the formula:
$$
r(t) = \frac{R(t)}{B(t) + R(t)}
$$
This ratio reflects the maturation process and transition dynamics of the protein, serving as a crucial representation of the time evolution. The strength of the promoter has a different impact on the timer performance depending on the pulse amplitude and pulse width. [^2]Changing the pulse amplitude affects the overall protein expression level in the system, while the pulse width directly influences the time distribution of protein production. To balance these two factors, we compare the performance of strong and weak promoters.

#### 1.  Advantages and Limitations of Strong Promoters

Strong promoters (such as Factor 3x and Factor 5x) exhibit rapid dynamic responses in the red-to-blue ratio $r(t)$, allowing the system to quickly reach equilibrium (close to 1) within a short time. This is because stronger promoters provide higher protein expression, enabling the rapid conversion of blue-state protein (B) to red-state protein (R). However, strong promoters may lead to rapid saturation of the system, which is a drawback for their function as timers. A timer needs to maintain the variation in the red-to-blue ratio over a longer period, but strong promoters may cause the system to stabilize at the saturation point too quickly, resulting in $r(t)$ reaching 1 too soon and losing the ability to track time changes effectively.

#### 2. Advantages and Limitations of Weak Promoters

In contrast, weak promoters (such as Factor 0.5x and Factor 0.75x) produce lower expression levels, but they drive the red-to-blue ratio change more gradually. Under these conditions, the rise in the red-to-blue ratio is slower, allowing the system to provide continuous dynamic changes over a longer period, making $r(t)$ more suitable for use as a timer. Weak promoters effectively prevent rapid saturation and can steadily reflect the cell's time evolution, providing enough variation to infer the cell’s age or state. However, weak promoters have clear limitations. First, lower protein expression results in weaker signals, which affects the signal-to-noise ratio (SNR). In low-signal conditions, measurement noise significantly impacts $r(t)$, especially over longer experimental durations, where signal fluctuations may become more pronounced, potentially causing noise to obscure the real signal and affect the accuracy and readability of the timer. Additionally, weak promoters are more prone to interference from experimental noise due to their lower expression levels. The weak response makes the system more sensitive to noise, leading to larger fluctuations in $r(t)$, thus decreasing the system's stability and repeatability. Therefore, although weak promoters provide smoother dynamic changes, their higher noise sensitivity makes them less suitable than strong or medium-strength promoters for high-precision timer applications.

#### 3. Balance of Medium Strength Promoters (1x)

After comparing various promoter strengths, a medium-strength promoter (such as the 1x promoter, shown by the green curve in the graph) demonstrates the best balance:

- **Moderate Dynamic Response:** With the 1x promoter, the red-to-blue ratio $r(t)$ increases at a moderate rate, enabling quick response without premature saturation, providing smoother and more stable changes.
- **Higher Signal-to-Noise Ratio (SNR):** The 1x promoter provides a higher SNR, meaning the experimental results are clearer and more reliable, making it ideal for high-precision timer applications.
- **Avoidance of Excessive Inheritance Effects:** Strong promoters (like Factor 3x and 5x) can cause significant inheritance effects, resulting in high baseline red-state protein levels in the previous generation, which may affect the measurement accuracy in the next generation. The 1x promoter provides better control over this issue.

#### 4. Conclusion

- **Weak Promoters (0.5x and 0.75x):** These are better suited for timers requiring slower and continuous changes, but they may perform poorly in high-precision applications due to their weak signal.
- **Strong Promoters (3x and 5x):** While strong promoters have advantages in fast response and high expression, their rapid saturation makes them unsuitable for precise timers, as they lose the ability to maintain continuous variation.
- **1x Medium Promoter:** Provides the best balance, ensuring moderate response speed, high-quality signal, and low noise, making it the ideal choice for timers, particularly in applications that require smooth changes and high precision.

Therefore, choosing the 1x medium promoter is a reasonable decision that balances signal strength, dynamic response, and noise control, while avoiding rapid saturation and unstable system performance. It is especially suitable as a timer for measuring cellular lifespan.

![](https://static.igem.wiki/teams/5643/pageimage/model/figure9-strong-promoter-vs-weak-promoter.webp)

<div style="text-align: center;" id="fig1">
        <span style="color:gray">Figure 9. Strong Promoter vs Weak Promoter</span>
        <br><br>
    </div>


## Visualization Modules

To enhance the interpretability and accessibility of our modeling framework, we developed two interactive 3D visualization tools as part of the YeastVerse virtual experiment platform. These tools simulate key aspects of the multicellular yeast chassis and fluorescent timer dynamics, providing intuitive insights into system behavior under various parameters. Built using React.js and Three.js, they allow users to explore spatial growth patterns and temporal fluorescence changes in real-time, bridging abstract mathematical predictions with visual, biologically grounded representations.

### 3D Yeast Growth Simulation

This module simulates the three-dimensional growth of the multicellular "grape yeast" cluster, modeling cell division, elongation, and cluster formation under controlled environmental conditions (e.g. temperature at 30°C, YPD medium). Starting from a single ancestral cell, the simulation applies deterministic branching rules inspired by Pascal’s triangle developmental pattern[^9], incorporating asynchronous division to generate geometrically defined, clonal clusters. Users can toggle between "grape" and "normal" yeast types, adjusting simulation speed (0.5–3×) to observe morphological transitions and cluster expansion. This interactive visualization gives us a more graphic understanding of "grape yeast's'' growth, thereby guiding the design of our multicellular chassis to enable precise, real-time tracking of drug resistance evolution in the [DR. sTraTeGY platform](/design/).

<div style="text-align: center;">
        <span style="color:gray">Table 4. Parameters (local variables) for 3D Yeast Growth Simulation</span>
        <br>
    </div>

| Parameter            | Meaning                                                      | **Default Value***                  | Unit   |
| -------------------- | ------------------------------------------------------------ | ----------------------------------- | ------ |
| MAX_LENGTH_RATIO     | long/short axis ratio for cell elongation under low oxygen/stress | 1.8 (estimated)[^9][^10]            | -      |
| nucleus size         | Relative nucleus radius in cell model                        | 0.3 (estimated)                     | -      |
| produceTwoCells prob | Probability of multi-bud formation (bipolar mode)            | 0.3–0.6 (estimated)                 | -      |
| maxAngle             | Budding cone angle limit                                     | Grape: 20°; normal: 60° (estimated) | degree |

<div style="text-align: left;">
        <span style="color:gray">Note. *The term "estimated" means that few corresponding literature data was found during the modeling process, but subsequent wet experiments have provided some measurements for this value.</span>
    </div>
Other minor parameters are detailed in the [code](#code-and-data-accessibility).



![](https://static.igem.wiki/teams/5643/pageimage/model/visual1.webp)

<div style="text-align: center;" id="fig1">
        <span style="color:gray">Figure 10. Animation demo of 3D Yeast Growth Simulation</span>
        <br><br>
    </div>

### 3D Fluorescent Timer Maturation Visualization

This module visualizes the spatiotemporal maturation of Fast-FT proteins within the "grape yeast" cluster, integrating the core ODE framework for mRNA transcription, protein synthesis, and state transitions (C → B → I → R). It simulates fluorescence color shifts over cell cycles. Users interact via OrbitControls for 3D navigation, clicking cells to inspect maturation states (e.g. r-ratio). The tool supports speed adjustments (1× default) and displays real-time stats like average maturation stage and total cells, facilitating optimization of promoter pulses and inheritance fractions for lineage tracing in multicellular contexts.



<img src="https://static.igem.wiki/teams/5643/pageimage/model/visual2-480p.webp" style="zoom:150%;" />

<div style="text-align: center;" id="fig1">
        <span style="color:gray">Figure 11. Animation demo of 3D Fluorescent Timer Maturation</span>
        <br><br>
    </div>

## AI-Aided Validation of Model Predictions

To further validate the robustness and generalizability of our model, we leveraged the reasoning capabilities of two state-of-the-art Chinese large language models, [DeepSeek](https://chat.deepseek.com/) and [Qwen](https://chat.qwen.ai/), both of which have demonstrated strong, comprehensive capabilities. These two AI models were independently prompted with specific design parameters for fluorescent timers (FT) optimized for tracking yeast cell lineage and age. The prompts were structured to guide the models toward biological first principles, specifically targeting the selection of FT variants, promoter strategies, pulse characteristics, and expression levels in the context of the yeast cell cycle.

Remarkably, the answers provided by both AI models converged with the key conclusions drawn from our mathematical model, reinforcing the credibility of our findings. The models independently highlighted the following optimal choices:

1. Fast-FT as the preferred timer variant, aligning with our analysis of maturation times relative to the yeast cell cycle (~87 minutes).
2. A periodic promoter strategy, exemplified by the Ash1 promoter, which naturally expresses during the late M phase[^7] and enables precise "timestamping" of daughter cells at division.
3. The necessity for short pulse widths (≈10–15 min), which ensures optimal temporal resolution within a single cell cycle.
4. A medium-strength promoter, which provides the best balance between signal intensity and biological burden, ensuring reliable signal detection without saturating the fluorescence detectors.

This alignment between our mathematical model and independent AI reasoning provides an additional layer of validation for our experimental design. The convergence of these independent pathways of hypothesis generation — one computational and one AI-based — not only supports the validity of our conclusions but also underscores the potential for AI to act as a powerful reasoning partner in hypothesis-driven research. [^3]Notably, the use of models like [DeepSeek](https://chat.deepseek.com/) and [Qwen](https://chat.qwen.ai/), with their deep knowledge and reasoning capabilities, enhances the persuasiveness of our model’s predictions, presenting a novel approach for integrating AI into experimental design in synthetic biology. However, this is not a one-size-fits-all AI solution, but one use case demonstrating its value in targeted validation.

The full AI conversation logs, including model reasoning and conclusions, are available in the supplementary materials and can be accessed via [Code and Data Accessibility](#code-and-data-accessibility).

## Conclusion

1. **Pulse Duration Control:** The pulse duration $(\tau)$ directly impacts the dynamic range of the timer. When controlled within the range of $10\text{–}15\mathrm{min}$, the timer provides sufficient dynamic range ($\Delta r > 3\sigma$), meeting the readability requirements.
2. **Comparison of Different Promoters:** Based on the current model, periodic promoters (e.g., Ash1) are much more effective than constitutive promoters for time tracking. The periodic promoters restrict the expression window, preventing excessive new protein generation, which helps maintain the accuracy of the timer signal.
3. **Promoter Strength Selection:** The strength of the promoter directly influences the protein expression level, thereby affecting the timer's performance. Strong promoters (e.g., Factor 3x, 5x) lead to rapid changes in the red-blue ratio and quickly saturate the signal, losing the ability to track time accurately. In contrast, weak promoters (e.g., Factor 0.5x, 0.75x) provide slower changes but suffer from weak signals, leading to higher noise sensitivity. The 1x medium-strength promoter offers the best balance, providing optimal response speed, higher signal-to-noise ratio, and better stability, making it ideal for precise time tracking applications.

In summary, the model successfully validates the importance of periodic promoters, pulse width control, and promoter strength in enhancing timer performance. The 1x medium-strength promoter strikes the best balance between dynamic response and signal-to-noise ratio, providing the most suitable timer functionality. Meanwhile, controlling the pulse width ensures high temporal resolution while avoiding the risk of excessive saturation. Therefore, the combination of 1x promoter and short pulses (10–15 min) theoretically offers the best timer performance in experiments, making it ideal for applications such as cell lifespan measurement or time tracking.

## Improvement Log

To systematically improve our model, we adopted the Design–Build–Test–Learn (DBTL) cycle, a core methodology in synthetic biology. This iterative process allowed us to refine model parameters and mechanisms based on both literature and values obtained from our own wet-lab experiments. Below, we describe two rounds of DBTL cycles that led to the current robust model.

### DBTL Round1

#### Literature-Based Initial Model and Identification of Gaps

Objective: Develop a preliminary model using literature-derived parameters to simulate fluorescent timer (FT) dynamics in yeast.

- **Design (2025.06):**
  The initial model was designed based on published data for Fast-FT proteins, including maturation kinetics from in vitro studies (e.g., blue peak time and red half-peak time at 25°C and 37°C). Parameters such as maturation time constants ($\tau_B, \tau_I, \tau_R$) were sourced from literature [^1], and the model assumed a generic promoter expression pattern without cell-cycle specificity.
- **Build (2025.06):**
  We implemented the model using ordinary differential equations (ODEs) to describe the irreversible maturation chain (C→B→I→R). Key parameters were set based on in vitro values, such as $\tau_B$=12 min and $\tau_R$=720 min, and the Ash1 promoter was initially erroneously modeled to express at the start of the cell cycle.
- **Test (2025.07):**
  Simulation results revealed discrepancies with expected cellular behaviors. The in vitro-based maturation kinetics caused the fluorescent proteins to mature from blue to red far too rapidly. This led to a premature saturation of the red signal, where the r(t) ratio approached its maximum too quickly within a single cell cycle, influencing the time gradient needed for resolution. Consequently, over just one or two generations, all cells accumulated a similarly high red signal, making it impossible to distinguish young daughter cells from old mother cells and causing the timer to lose its core function.
- **Learn (2025.07):**
  We identified that in vitro data did not account for cellular factors like translation delays, chaperone interactions, and metabolic context. This highlighted the need for intracellular-specific parameters and better alignment with yeast physiology. Additionally, the promoter expression timing and protein inheritance logic required biological validation from our [wet-lab experiments](#).

### DBTL Round2

#### Integration of Wet-Lab Data and Model Validation

Objective: To redesign the model using an AI-augmented framework that leverages biological first principles and the learnings from Round1, with the goal of validating both the model's predictive power and the reliability of this [research paradigm](#highlights — a-new-paradigm-for-synthetic-biology-in-the-ai-era) through [data from wet-lab experiment](#).

- **Design (2025.07-08):**

  Informed by the failures of Round 1, we initiated a redesigned DBTL cycle centered on computational prediction. We employed two independent pathways to converge on optimal parameters:

  - Mechanistic Modeling: We refined the model structure to correct the identified biological inaccuracies. This included setting the Ash1 promoter pulse to occur near the end of the cell cycle and revising the protein inheritance logic to allow for near-complete transfer of immature protein to the daughter cell.

  - AI-Assisted Reasoning: We prompted two large language models ([DeepSeek](https://chat.deepseek.com/) and [Qwen](https://chat.qwen.ai/)) with the core design problem—optimizing a fluorescent timer for yeast lineage tracking—guiding them with biological first principles but without providing our model's interim results. This served as an independent validation of our design logic.

- **Build (2025.08):**
  Based on Round1 DBTL learnings, we rebuilt the model to incorporate intracellular parameters from [logical calculations](#fast-ft-time-parameter-calculation) and these data are later supported by our [wet-lab yeast experiments](#). This included:

  - Using temperature-dependent maturation kinetics derived from [Q₁₀](#fast-ft-time-parameter-calculation) calculations to adjust Fast-FT[^1] times for 30°C.
  - Adjusting the Ash1 promoter to express during the late M phase[^7] in our model to match biological evidence.
  - Revising protein inheritance logic to allow immature C-state proteins to be almost fully transferred to daughter cells, and mature in the daughter cells produced after a cell division[^8].
  
- **Test (2025.08–09):**
  The predictions of the refined model were subsequently tested through [wet-lab experiments](#). The results confirmed the computational forecasts:

  - The experimentally observed blue-to-red transition timeline closely matched the model's prediction, providing a clear r(t) gradient.
  - The chosen pulse width and promoter strength yielded a strong and distinguishable signal, enabling precise lineage tracking over multiple generations.
  - The corrected inheritance logic was validated, as daughter cells showed the expected timing signal that was distinct from the mother cell's baseline.

- **Learn (2025.10):**
  The convergence between our [AI-augmented model predictions](#highlights — a-new-paradigm-for-synthetic-biology-in-the-ai-era) and the [experimental outcomes](#) demonstrated the power of "Design" phase. This approach minimized the traditional DBTL iterations, as the parameters defined in silico proved to be functionally accurate in vivo. It validated that integrating mechanistic modeling with AI reasoning can dramatically increase pre-experimental confidence and serve as a blueprint for first-attempt success in synthetic biology.

## How to use our model

This model provides a complete theoretical framework and computational implementation for simulating the dynamic behavior of fluorescent timer proteins (FT) in yeast cells. Through systematic parameter scanning and virtual experiments, users can optimize experimental designs, verify hypotheses, and predict potential outcomes before conducting actual wet-lab experiments. Below are the detailed usage guidelines:

### 1. Basic Simulation

#### Single-cell Dynamics Analysis

**Use Case:** Understand the fundamental behavior of the timer within a single cell cycle and validate the core dynamics of the model.

Single-cell simulations form the foundation for understanding FT system behavior. By observing the full cycle of a single cell from birth to division, users can verify whether the maturation chain (C→B→I→R) behaves as expected, check the monotonicity of the red-to-blue ratio $r(t)$, and assess whether the time evolution of each protein state aligns with biological intuition. This level of analysis is especially useful for users encountering the model for the first time, helping them develop an intuitive understanding of the system behavior.

When analyzing the results, focus on the following aspects:

- The $r(t)$ curve should increase monotonically, reflecting the irreversible conversion of the protein from blue to red. Any non-monotonic behavior may indicate issues with parameter settings.
- $B(t)$ should peak early and then decay, while $R(t)$ should show a delayed rise, a crucial feature for the proper functioning of the timer.
- The system should reach a stable state within a reasonable time scale, typically aligned with the cell cycle duration.

```python
# Basic parameter setup
p = Params()
p.pulse_width_min = 15.0    # Pulse width in minutes
p.pulse_amp = 1.0           # Promoter strength

# Run simulation
t, out = simulate_single_cell(p, include_decay=True)

# Extract key metrics
r_ratio = out["r"]          # Red/blue ratio time series
B_blue = out["B"]           # Blue-state protein concentration  
R_red = out["R"]            # Red-state protein concentration
```

**Output Interpretation:**
  - The $r(t)$ curve should exhibit a smooth, monotonic increase, reflecting the irreversible maturation process from blue to red. Any non-monotonic behavior suggests an issue with the parameters.
  - $B(t)$ should peak early and then decline, while $R(t)$ should show a delayed increase. This phase relationship is critical for the proper functioning of the timer.
  - Ensure the curve reaches a stable state within a reasonable time scale; premature saturation may limit the effective time window for the timer.

### 2. Parameter Optimization

#### Pulse Width Screening Analysis

**Use Case:** Identify the optimal promoter expression window to achieve maximum temporal resolution and provide quantifiable guidelines for experimental design.

Pulse width is one of the most crucial parameters influencing timer performance. If the pulse width is too wide, new blue proteins are continuously synthesized, diluting the changes in the red-to-blue ratio. If the pulse width is too narrow, the signal may not be strong enough. By systematically scanning different pulse widths and calculating the corresponding $\Delta r$ values, users can find the optimal balance between signal strength and dynamic range.

This model uses a quantitative criterion based on noise levels: assuming typical imaging noise $\sigma \approx 0.03$, the threshold for distinguishability is set at $3\sigma \approx 0.09$. This approach turns subjective design decisions into objective numerical standards, significantly improving the scientific rigor of experimental design.

```python
# Scan different pulse widths
tau_values = [10, 15, 20, 25, 30]  # minutes
delta_r_results = []

for tau in tau_values:
    p.pulse_width_min = tau
    dr = delta_r_custom(p, t_start_min=24*60, t_end_min=48*60)
    delta_r_results.append(dr)
    
# Evaluate based on 3σ criterion (σ≈0.03)
threshold = 0.09  # 3σ threshold
optimal_tau = max([tau for tau, dr in zip(tau_values, delta_r_results) if dr > threshold])
```

**Decision Criteria:**
  - $\Delta r > 0.09$: Distinguishable (recommended), indicating that the timer provides a clear age signal.
  - $0.06 < \Delta r \leq 0.09$: Borderline, indicating a need for further parameter optimization or acceptance of lower temporal resolution.
  - $\Delta r \leq 0.06$: Undistinguishable, avoid using these parameter settings.

### 3. Promoter Strategy Comparison

#### Periodic vs Constitutive Expression

**Use Case:** Evaluate the impact of different expression strategies on timer performance and provide theoretical justification for promoter selection.

The choice of expression strategy directly affects the core performance of the timer. Periodic promoters (such as Ash1) produce short bursts of expression at specific stages of the cell cycle, creating a clear "express-silence" alternating pattern that is beneficial for generating a sharp age gradient. In contrast, constitutive promoters express continuously throughout the cell cycle, producing new blue proteins constantly, which may "dilute" the changes in the red-to-blue ratio, reducing temporal resolution.

By comparing the $\Delta r$ values, lineage heatmap patterns, and intergenerational behaviors under different strategies, users can gain an intuitive understanding of whether periodic promoters are more suitable for timer applications. This comparative analysis is valuable because it not only shows "which strategy is better," but also explains "why it is better," making it particularly useful for educational purposes or for explaining design choices to collaborators unfamiliar with synthetic biology.

```python
# Run comparative analysis (using provided script)
# python ft_compare_promoters.py

# Key observation metrics:
# - Δr: Dynamic range, quantitative indicator of temporal resolution
# - Lineage heatmap gradient: Visual representation of intra-generational time resolution
# - Baseline-corrected r': Pure signal after removing inheritance bias
```

**Selection Recommendations:**
  - **Periodic Promoters (Ash1):** Provide clear age signals and good intra-generational contrast, highly recommended for precise time-tracking applications.
  - **Constitutive Promoters:** Provide smooth signals with lower temporal resolution, typically used as a negative control or for validating the advantages of periodic expression.

### 4. Lineage Tracking Analysis

#### Multi-generational Cell Behavior Study

**Use Case:** Study the behavior of the timer across multiple generations, verify the inheritance logic, and assess the feasibility of long-term culture.

In real applications, cell timers often need to maintain functionality across multiple generations. Lineage analysis simulates protein inheritance and dilution during continuous cell division, revealing the timer's long-term stability. Baseline correction techniques (calculating $r'$) are particularly important because they remove the inheritance bias from the mother cell's signal, leaving only the contribution from newly matured proteins in the current generation.

By analyzing the heatmap patterns across generations, users can assess the long-term stability of the timer, detect potential signal decay or accumulation effects, and provide guidance for experimental imaging time windows. For example, if the model shows a significant signal decay after the third generation, experimental design should focus on observing earlier generations.

```python
# Generate multi-generation data
mat, trow = lineage_matrix(p, generations=6, include_decay=True)

# Baseline correction (remove inheritance bias)
mat_corrected = mat - mat[:, 0:1]

# Analyze inter-generational patterns
generation_trends = np.mean(mat_corrected, axis=1)  # Average signal intensity per generation
```

**Analysis Focus:**
  - Check monotonicity within each generation to ensure age gradients are clear within a single cell cycle.
  - Observe signal decay or enhancement patterns between generations to evaluate the feasibility of long-term use.

### 5. Environmental Parameter Adjustment and Condition Optimization

**Use Case:** Adapt the model to different growth conditions or optimize experimental settings, evaluating the influence of environmental factors on timer performance.

Biological systems are highly sensitive to environmental conditions, such as temperature and pH, which can affect protein maturation dynamics. This model incorporates the impact of temperature using the Arrhenius equation with the Q₁₀ temperature coefficient, allowing users to predict timer behavior under different cultivation temperatures. This capability is especially valuable because actual experimental conditions may differ from the standard conditions reported in the literature.

### 6. Advanced Customization and Function Extension

**Use Case:** Modify the model structure to meet specific needs, add new features, or integrate with other systems.

For advanced users with specific requirements, the modular design of the model supports a variety of custom modifications. Users can modify the maturation pathway (e.g., skipping the intermediate state I), add new regulatory modules (such as optogenetic or chemical induction systems), or integrate other cellular process models.

This flexibility makes the model not only a specific FT system simulator but also a versatile platform for modeling various cellular processes. For example, users could incorporate the effects of cellular metabolic state on protein expression or integrate cell fate decision models to study timer behavior during differentiation.

```python
# Modify maturation pathway (e.g., skip intermediate state)
def custom_maturation_chain(t, y, p):
    m, C, B, R = y  # Remove I state
    # Custom kinetic equations...
    return np.array([dm, dC, dB, dR])

# Add new regulation modules
def additional_regulation(t, y, p):
    # Implement additional regulation like optogenetics or chemical induction
    regulation_factor = calculate_regulation(t)
    return regulation_factor
```

The entire model is built with a modular design, ensuring good readability and extensibility. Users can flexibly adjust parameters or modify functional modules according to their specific needs. It is recommended to conduct a systematic virtual screening before major experimental investments, as this can save valuable experimental resources and time and significantly improve research efficiency by "failing on silicon" rather than in the laboratory.

## Code and Data Accessibility

Periodic Promoter vs Constitutive Promoter Part：[ft_compare_promoters.py](https://gitlab.igem.org/2025/fudan/-/blob/main/model/ft_compare_promoters.py)

Strong Promoter vs Weak Promoter Part：[df_strength.py](https://gitlab.igem.org/2025/fudan/-/blob/main/model/df_strength.py)

Result Part：[FT.py](https://gitlab.igem.org/2025/fudan/-/blob/main/model/FT.py)

AI-Aided Validation: [DeepSeek Conversation JSON](https://gitlab.igem.org/2025/fudan/-/blob/main/model/AI_DeepSeek_Assistant.json), [Qwen Conversation JSON](https://gitlab.igem.org/2025/fudan/-/blob/main/model/AI_Qwen_Assistant.json)

3D Visualization Modules: [iGEMmodel](https://gitlab.igem.org/2025/fudan/-/tree/main/model?ref_type=heads)

## References

[^1]: Subach, F. V., Subach, O. M., Gundorov, I. S., Morozova, K. S., Piatkevich, K. D., Cuervo, A. M., & Verkhusha, V. V. (2009). Monomeric fluorescent timers that change color from blue to red report on cellular trafficking. *Nature Chemical Biology*, 5(2), 118–126. DOI: 10.1038/nchembio.138
[^2]: Lee, M. E., DeLoache, W. C., Cervantes, B., & Dueber, J. E. (2015). A highly characterized yeast toolkit for modular, multipart assembly. *ACS Synthetic Biology*, *4*, 975–986. DOI: 10.1021/sb500366v
[^3]: Penadés, J. R., Gottweis, J., He, L., Patkowski, J. B., Daryin, A., Weng, W.-H., Tu, T., Palepu, A., Myaskovsky, A., Pawlosky, A., Natarajan, V., Karthikesalingam, A., & Costa, T. R. D. (2025). AI mirrors experimental science to uncover a mechanism of gene transfer crucial to bacterial evolution. *Cell, 188*(5), 1–12. DOI: 10.1016/j.cell.2025.08.018
[^4]: Kutta, W. (1901). Beitrag zur näherungsweisen Integration totaler Differentialgleichungen. Teubner.
[^5]: Butcher, J. C. (2000). Numerical methods for ordinary differential equations in the 20th century. Journal of Computational and Applied Mathematics, 125(1-2), 1-29. DOI: 10.1016/S0377-0427(00)00455-6
[^6]: Di Talia, S., Skotheim, J. M., Bean, J. M., Siggia, E. D., & Cross, F. R. (2007). The effects of molecular noise and size control on variability in the budding yeast cell cycle. *Nature*, *448*(7156), 947–951. DOI: 10.1038/nature06072
[^7]: Yu, Y., Yarrington, R. M., & Stillman, D. J. (2020). FACT and Ash1 promote long-range and bidirectional nucleosome eviction at the HO promoter. *Nucleic acids research*, *48*(19), 10877–10889. DOI: 10.1093/nar/gkaa819
[^8]: Brodsky, A. S., & Silver, P. A. (2000). Pre-mRNA processing factors are required for nuclear export. *RNA (New York, N.Y.)*, *6*(12), 1737–1749. DOI: 10.1017/s1355838200001059
[^9]: Ratcliff, W., Fankhauser, J., Rogers, D. *et al.* Origins of multicellular evolvability in snowflake yeast. *Nat Commun* **6**, 6102 (2015). DOI: 10.1038/ncomms7102
[^10]: Fukuda, N. Apparent diameter and cell density of yeast strains with different ploidy. *Sci Rep* **13**, 1513 (2023). DOI: 10.1038/s41598-023-28800-z