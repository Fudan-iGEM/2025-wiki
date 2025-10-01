---
title: Model
authors:
  - name: Tang Jihua
    url: （先不填）
    avatar: （头像，先不填）
layout: igem （勿动）
heroImage: （拍摄并且选取页面图像，作为顶部展示）
description: （页面描述）
---
## Why This Model?

In synthetic biology and cellular timing studies, constructing a reliable and readable intracellular timer is crucial for understanding cellular life cycles, lineage relationships, and dynamic processes. Fluorescent Timer (FT) proteins, which change color over time, have become a powerful tool for achieving this goal. However, in practical applications, the performance of FT proteins is influenced by multiple factors, including expression strategies, maturation dynamics, cell division inheritance, and environmental conditions. To systematically evaluate and optimize these factors before conducting experiments, we have developed this mathematical model. It aims to theoretically screen feasible parameter ranges, validate the reasonableness of promoter selection and expression control, and provide clear design guidelines for subsequent wet-lab experiments.

## Introduction

This model is centered around the "single pulse → three-step irreversible maturation chain (C→B→I→R)" and simulates the entire process from promoter expression to the complete maturation of the fluorescent protein. It uses $r(t) = \frac{R}{B + R}$ and $\Delta r$ as criteria to evaluate the readability and monotonicity of the timer. By adjusting the pulse width (the duration of ASH1 pulses), maturation time constants ($\tau_B, \tau_I, \tau_R$), and pulse intensity (adjusting promoter strength), we first screen for "usable intervals" mathematically, and then provide reproducible target conditions for wet experiments. The model compares periodic promoters (ASH1) with constitutive promoters: the former provides short and clean expression windows, improving $\Delta r$ and monotonicity; the latter, under the same maturation parameters, tends to dilute time resolution due to continuous new molecule generation, and thus is used as a control to demonstrate the necessity of pulse gating. To address cases where promoter expression is either too high or too low, the model incorporates promoter strength ($pulse_{amp}$) and intergenerational inheritance (inheritance fraction, $pp$) into sensitivity analysis. By controlling promoter strength, we ensure that the system provides an appropriate level of protein expression while avoiding premature saturation or insufficient signaling. In summary, the model systematically examines and quantifies two critical factors: promoter selection and promoter strength, validating the reasonableness of selecting the ASH1 promoter and an appropriate promoter strength from both the mathematical and model perspectives before conducting wet experiments.

## Model Design

In a yeast multicellular system, the timer fluorescent protein (FT) is introduced to represent the time process between the birth and maturation of cells. FT consists of an irreversible maturation chain: **C→B→I→R**, where:

- **C** represents the immature protein;
- **B** represents the blue state;
- **I** represents the intermediate state;
- **R** represents the red state.

The color change reflects the time elapsed since the cell's birth.

This model is based on the following experimental settings:

- Cell cycle: approximately **87 minutes** (source: BioNumbers);
- Fluorescent protein: **Fast-FT**^[1]^ is selected;
- Expression trigger: using a single pulse (based on the later comparison of periodic and constitutive promoters).

## Parameters

| **Parameter** | **Meaning**                                | **Default Value**       | **Unit** |
| ------------------- | ---------------------------------------------- | -------------------------------- | -------- |
| **$Tcc_{min}$**      | Cell cycle length | 87                               | min      |
| **$t_{endmin}$**   | Single-cell simulation duration | 20160                       | min      |
| **$dt_{min}$**      | Integration step size | 1.0                           | min      |
| **$pulse_{widthmin}$** | Pulse duration | 15                               | min      |
| **$pulse_{amp}$**   | Pulse amplitude                   | 1.0                              | -        |
| **$k_{tx}$**        | Transcription rate                | 分段函数（详见下表）            | min⁻¹    |
| **$k_{dm}$**        | mRNA degradation rate | \($\ln 2 / 10$\)                 | min⁻¹    |
| **$k_{tl}$**        | Translation rate                  | 分段函数（详见下表）                       | min⁻¹    |
| **$\tau_{Bmin}$** | C to B time constant       | 12.0                             | min      |
| **$\tau_{Imin}$** | B to I time constant       | 45.0                             | min      |
| **$\tau_{Rmin}$**  | I to R time constant       | 720.0                            | min      |
| **$t_{12}^{(R)} $** | Red protein half-life      | 247.2                       | h        |
| **$inherit_{frac,C}$** | Inheritance fraction of C-state protein | 1.0                           | -        |
| **$k_B$**           | C to B rate constant         | \($1 / \tau_B$\)                 | min⁻¹    |
| **$k_I$**           | B to I rate constant         | \($1 / \tau_I$\)                 | min⁻¹    |
| **$k_R$**           | I to R rate constant         | \($1 / \tau_R$\)                 | min⁻¹    |
| **$k_{DR}$**       | Red protein degradation rate | \($\ln 2 / (t_{12}^{(R)} \cdot 60)$\) | min⁻¹    |

### Fast-FT Time Parameter Calculation at 30°C

#### 1. Basis for Calculation and Core Logic

The fluorescence maturation of Fast-FT (from blue to red) is essentially a chemical process involving chromophore oxidation and conformational rearrangement. The rate of this process is strictly dependent on temperature and follows the biochemistry "temperature coefficient (Q₁₀)" rule — that is, for every 10°C increase, the reaction rate increases by 1.5–2.5 times. The typical Q₁₀ value for FT-like proteins in the literature is close to 2.0.

##### 1.1 Literature Data Summary

The core data for the calculation is derived from literature on Fast-FT key time parameters at 25°C (in vitro purified + intracellular, Drosophila S2 cells) and 37°C (in vitro purified + intracellular, HeLa cells). Specific data are shown below:

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

### 1) **Input (Single Birth Pulse)**

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

These equations are computed in the inline function `f(t, y)` in `simulate_single_cell`, and then advanced using a numerical integration method (such as RK4).

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
C_{\text{子细胞}}(0) = C_{\text{母细胞}}(\text{分裂时}) \times inherit_{frac,C}\\B_{\text{子细胞}}(0) = 0,\quad I_{\text{子细胞}}(0) = 0, \quad R_{\text{子细胞}}(0) = 0
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
        <span style="color:gray">Figure1. Single-cell- B-R (left) & r (right)</span>
        <br><br>
    </div>

### Pulse width versus $\Delta r$

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
        <span style="color:gray">Figure2. Δr(65→145 min) vs pulse width τ</span>
        <br><br>
    </div>

### Lineage analysis

Birth-aligned lineage heatmaps show that $r$ increases roughly monotonically over time in each generation, with the largest increment concentrated in $24\text{–}48\mathrm{h}$. Across generations, the signal exhibits a unimodal pattern: it grows from $G0$ to $G2$ (maximal at $G2$), then declines from $G3$ onward, reaching its lowest level by $G5\text{–}G6$. Row-wise baseline correction within each generation ($r'$) enhances contrast and emphasizes the same inter-generational ordering and the slope differences in the $24\text{–}48\mathrm{h}$ interval, without altering the overall temporal trend.

![](https://static.igem.wiki/teams/5643/pageimage/model/figure3-lineage-r-heatmap-birth-aligned.webp)

<div style="text-align: center;" id="fig1">
        <span style="color:gray">Figure3. Lineage r heatmap (birth-aligned)</span>
        <br><br>
    </div>

![](https://static.igem.wiki/teams/5643/pageimage/model/figure4-lineage-r-heatmap-baseline-corrected.webp)

<div style="text-align: center;" id="fig1">
        <span style="color:gray">Figure4. Lineage r' heatmap (baseline-corrected)</span>
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
        <span style="color:gray">Figure5. Delta r vs τ (10-90 min window)</span>
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
        <span style="color:gray">Figure6. rt(t) overlay (fairness- equal_intensity)</span>
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
        <span style="color:gray">Figure7. Lineage Heatmap Comparison</span>
        <br><br>
    </div>

#### Single-Chain Four-Generation $r'$ Overlaid Curves

- **Observation:** In the time series of the mother cell (G0) to the fourth generation (G4):
  
  - **$\tau = 15$**: Each generation's $r'$ curve shows significant bending and steepening in the $0\text{–}90\mathrm{min}$ window.
  
  - ON: Each generation’s $r'$ curve rises more slowly, with weaker bending and a smoother curve in the early stage.
- **Interpretation:** Over multiple generations, $\tau = 15$ maintains high readability, while ON expression causes a slow start, making it difficult to finely resolve age differences between generations.

![](https://static.igem.wiki/teams/5643/pageimage/model/figure8-four-generation-rprime-chains-fairness-equal-intensity.webp)

<div style="text-align: center;" id="fig1">
        <span style="color:gray">Figure8. Four-generation rprime chains - fairness equal_intensity</span>
        <br><br>
    </div>

In summary, using a periodic promoter (ASH1) with a pulse width controlled between 10–15 minutes provides a reliable and distinguishable timing signal; in contrast, a constitutive promoter is not suitable for use as a timer input.

### Strong Promoter vs Weak Promoter

In this model, the red-to-blue ratio $r(t)$ is used as the key indicator for evaluating timer performance, representing the ratio of red-state protein (R) to blue-state protein (B) at any given time, as described by the formula:
$$
r(t) = \frac{R(t)}{B(t) + R(t)}
$$
This ratio reflects the maturation process and transition dynamics of the protein, serving as a crucial representation of the time evolution. The strength of the promoter has a different impact on the timer performance depending on the pulse amplitude and pulse width. Changing the pulse amplitude affects the overall protein expression level in the system, while the pulse width directly influences the time distribution of protein production. To balance these two factors, we compare the performance of strong and weak promoters.

**1.  Advantages and Limitations of Strong Promoters**

Strong promoters (such as Factor 3x and Factor 5x) exhibit rapid dynamic responses in the red-to-blue ratio $r(t)$, allowing the system to quickly reach equilibrium (close to 1) within a short time. This is because stronger promoters provide higher protein expression, enabling the rapid conversion of blue-state protein (B) to red-state protein (R). However, strong promoters may lead to rapid saturation of the system, which is a drawback for their function as timers. A timer needs to maintain the variation in the red-to-blue ratio over a longer period, but strong promoters may cause the system to stabilize at the saturation point too quickly, resulting in $r(t)$ reaching 1 too soon and losing the ability to track time changes effectively.

**2. Advantages and Limitations of Weak Promoters**

In contrast, weak promoters (such as Factor 0.5x and Factor 0.75x) produce lower expression levels, but they drive the red-to-blue ratio change more gradually. Under these conditions, the rise in the red-to-blue ratio is slower, allowing the system to provide continuous dynamic changes over a longer period, making $r(t)$ more suitable for use as a timer. Weak promoters effectively prevent rapid saturation and can steadily reflect the cell's time evolution, providing enough variation to infer the cell’s age or state. However, weak promoters have clear limitations. First, lower protein expression results in weaker signals, which affects the signal-to-noise ratio (SNR). In low-signal conditions, measurement noise significantly impacts $r(t)$, especially over longer experimental durations, where signal fluctuations may become more pronounced, potentially causing noise to obscure the real signal and affect the accuracy and readability of the timer. Additionally, weak promoters are more prone to interference from experimental noise due to their lower expression levels. The weak response makes the system more sensitive to noise, leading to larger fluctuations in $r(t)$, thus decreasing the system's stability and repeatability. Therefore, although weak promoters provide smoother dynamic changes, their higher noise sensitivity makes them less suitable than strong or medium-strength promoters for high-precision timer applications.

**3. Balance of Medium Strength Promoters (1x)**

After comparing various promoter strengths, a medium-strength promoter (such as the 1x promoter, shown by the green curve in the graph) demonstrates the best balance:

- **Moderate Dynamic Response:** With the 1x promoter, the red-to-blue ratio $r(t)$ increases at a moderate rate, enabling quick response without premature saturation, providing smoother and more stable changes.
- **Higher Signal-to-Noise Ratio (SNR):** The 1x promoter provides a higher SNR, meaning the experimental results are clearer and more reliable, making it ideal for high-precision timer applications.
- **Avoidance of Excessive Inheritance Effects:** Strong promoters (like Factor 3x and 5x) can cause significant inheritance effects, resulting in high baseline red-state protein levels in the previous generation, which may affect the measurement accuracy in the next generation. The 1x promoter provides better control over this issue.

**4. Conclusion**

- **Weak Promoters (0.5x and 0.75x):** These are better suited for timers requiring slower and continuous changes, but they may perform poorly in high-precision applications due to their weak signal.
- **Strong Promoters (3x and 5x):** While strong promoters have advantages in fast response and high expression, their rapid saturation makes them unsuitable for precise timers, as they lose the ability to maintain continuous variation.
- **1x Medium Promoter:** Provides the best balance, ensuring moderate response speed, high-quality signal, and low noise, making it the ideal choice for timers, particularly in applications that require smooth changes and high precision.

Therefore, choosing the 1x medium promoter is a reasonable decision that balances signal strength, dynamic response, and noise control, while avoiding rapid saturation and unstable system performance. It is especially suitable as a timer for measuring cellular lifespan.

![](https://static.igem.wiki/teams/5643/pageimage/model/figure9-strong-promoter-vs-weak-promoter.webp)

<div style="text-align: center;" id="fig1">
        <span style="color:gray">Figure9. Strong Promoter vs Weak Promoter</span>
        <br><br>
    </div>

## Conclusion

1. **Pulse Duration Control:** The pulse duration $(\tau)$ directly impacts the dynamic range of the timer. When controlled within the range of $10\text{–}15\mathrm{min}$, the timer provides sufficient dynamic range ($\Delta r > 3\sigma$), meeting the readability requirements.
2. **Comparison of Different Promoters:** Based on the current model, periodic promoters (e.g., ASH1) are much more effective than constitutive promoters for time tracking. The periodic promoters restrict the expression window, preventing excessive new protein generation, which helps maintain the accuracy of the timer signal.
3. **Promoter Strength Selection:** The strength of the promoter directly influences the protein expression level, thereby affecting the timer's performance. Strong promoters (e.g., Factor 3x, 5x) lead to rapid changes in the red-blue ratio and quickly saturate the signal, losing the ability to track time accurately. In contrast, weak promoters (e.g., Factor 0.5x, 0.75x) provide slower changes but suffer from weak signals, leading to higher noise sensitivity. The 1x medium-strength promoter offers the best balance, providing optimal response speed, higher signal-to-noise ratio, and better stability, making it ideal for precise time tracking applications.

In summary, the model successfully validates the importance of **periodic promoters**, **pulse width control**, and **promoter strength** in enhancing timer performance. The 1x medium-strength promoter strikes the best balance between dynamic response and signal-to-noise ratio, providing the most suitable timer functionality. Meanwhile, controlling the pulse width ensures high temporal resolution while avoiding the risk of excessive saturation. Therefore, the combination of **1x promoter and short pulses (10–15 min)** theoretically offers the best timer performance in experiments, making it ideal for applications such as cell lifespan measurement or time tracking.

## Bug Fix Log

1. **Data Source Correction:** Incorrect use of in vitro data for modeling under cellular conditions led to underestimations in protein maturation times. Parameters were recalculated based on intracellular environments (2025.08).

- **Issue:** The fluorescence protein maturation time parameters (e.g., blue peak time, red half-peak time) were mistakenly based on in vitro purified protein data (without cellular environment). This led to a significant underestimation of the maturation time for fluorescence proteins (e.g., the blue peak time was initially set to 15 minutes, which is much shorter than the actual time in the cellular environment). In vitro conditions lack cellular translation delays, molecular chaperone regulation, and metabolic context, causing a mismatch in the "blue-to-red" conversion dynamics compared to experimental observations.   
- **Fix:** Removed in vitro data and recalculated parameters based on intracellular environments, specifically using the Fast-FT maturation dynamics for eukaryotic cells (which are temperature-dependent), and applied the Q₁₀ temperature coefficient (≈2.0) derived from literature on 25°C and 37°C data for intracellular conditions.
- **Impact:** The revised model now aligns with yeast cell cycle and protein dynamics (e.g., polarity transport and intergenerational transmission), avoiding the "signal compression" caused by overly rapid maturation, thus providing a reasonable basis for subsequent temporal resolution.

2. **Modeling Mechanism Fix:** Adjustments to Ash1 promoter expression timing and protein allocation logic (2025.07).

- **Issue:** The original model had two mechanism errors: ① Ash1 promoter expression timing was set to "start at the beginning of the cell cycle," which conflicts with the biological characteristic of "expression near the end of the cell cycle"; ② The protein allocation logic assumed "mature proteins stay in the mother cell," and the $inherit_{frac} \approx 0.2$ assumption limited the amount inherited by daughter cells, which contradicted the actual process where proteins enter the daughter cells during division and mature there.
- **Fix:** ① Adjusted the promoter expression timing: the pulse start time was changed from "0 min of the cell cycle" to "near the end of the cell cycle (e.g., $T_{cc}-30$ min, where $T_{cc}$ is the cell cycle length)" to reflect the quick expression of Ash1 before cell division. We also changed transcription and translation rate values to be dependent on the cell cycle stage, incorporating the significant differences in activity across the cycle. ② Recalibrated the protein allocation logic: Set the $inherit_{frac,C}$ parameter to ≈1, meaning that almost all newly synthesized fluorescent proteins enter the daughter cells during division and initiate the "blue-to-red" maturation process there.  
- **Impact:** This fix accurately models the sequential process of "protein inheritance to daughter cells → maturation in daughter cells," resolving the issue of "mother cell maturation signal interfering with daughter cell lineage," and improving the specificity of lineage tracking by tightly linking fluorescence signal changes with the cell division cycle and developmental stages of daughter cells.

3. **Environmental Factors Added:** Introduced growth conditions (30°C, YPD 6.0-6.5) into the model parameters, clarifying 30°C as a core variable and YPD 6.0-6.5 as a non-core variable (2025.08).

- **Issue:** The original model did not include environmental parameters, leading to a lack of connection between maturation times and the actual experimental conditions, which could introduce system errors.   
- **Fix:** ① Core variable (30°C): We used literature data to quantify its effect on maturation rates (as described in Fix 1), and confirmed that 30°C is the key factor in regulating the "blue-to-red" transition rate, requiring a temperature coefficient to quantify the shortening effect on maturation time. ② Non-core variable (YPD 6.0-6.5): This condition maintains the pH of Fast-FT within its stable fluorescence range (pH 5.4–7.4). Since the YPD medium only provides nutrients and does not directly influence the chromophore chemical maturation process, its effect on protein maturation dynamics is negligible.   
- **Impact:** By distinguishing between core and non-core environmental variables, we ensured that core parameters (temperature) are accurately accounted for while avoiding interference from unnecessary variables. This makes the model more closely aligned with actual experimental conditions and improves its reproducibility.  

**Summary:** The fixes above address data accuracy, biological mechanism consistency, and the inclusion of environmental factors, establishing a more reliable model foundation for determining specific parameters and verifying "protein maturation in daughter cells" in future experiments.

## Model Usage Guide

This model provides a complete theoretical framework and computational implementation for simulating the dynamic behavior of fluorescent timer proteins (FT) in yeast cells. Through systematic parameter scanning and virtual experiments, users can optimize experimental designs, verify hypotheses, and predict potential outcomes before conducting actual wet-lab experiments. Below are the detailed usage guidelines:

### 1. Basic Simulation: Single-cell Dynamics Analysis

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

### 2. Parameter Optimization: Pulse Width Screening Analysis

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

### 3. Promoter Strategy Comparison: Periodic vs Constitutive Expression

**Use Case:** Evaluate the impact of different expression strategies on timer performance and provide theoretical justification for promoter selection.

The choice of expression strategy directly affects the core performance of the timer. Periodic promoters (such as ASH1) produce short bursts of expression at specific stages of the cell cycle, creating a clear "express-silence" alternating pattern that is beneficial for generating a sharp age gradient. In contrast, constitutive promoters express continuously throughout the cell cycle, producing new blue proteins constantly, which may "dilute" the changes in the red-to-blue ratio, reducing temporal resolution.

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
  - **Periodic Promoters (ASH1):** Provide clear age signals and good intra-generational contrast, highly recommended for precise time-tracking applications.
  - **Constitutive Promoters:** Provide smooth signals with lower temporal resolution, typically used as a negative control or for validating the advantages of periodic expression.

### 4. Lineage Tracking Analysis: Multi-generational Cell Behavior Study

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

## Code Accessibility

Periodic Promoter vs Constitutive Promoter Part：ft_compare_promoters.py

Strong Promoter vs Weak Promoter Part：df_strength.py

Result Part：FT.py

## References

[1] Subach, F. V., Subach, O. M., Gundorov, I. S., Morozova, K. S., Piatkevich, K. D., Cuervo, A. M., & Verkhusha, V. V. (2009). Monomeric fluorescent timers that change color from blue to red report on cellular trafficking. *Nature Chemical Biology*, *5*(2), 118–126.

[2] Lee, M. E., DeLoache, W. C., Cervantes, B., & Dueber, J. E. (2015). A highly characterized yeast toolkit for modular, multipart assembly. *ACS Synthetic Biology*, *4*, 975–986.