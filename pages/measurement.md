---
title: Measurement
authors:
  - name: Zhiqin Wang
    url: /fudan/team/#Zhiqin
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/wzq-a.web
  - name: Yuxin Duan
    url: /fudan/team/#Yuxin
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/dyx-a.webp
layout: igem
heroImage: https://static.igem.wiki/teams/5643/header/measurement.webp
description: On this page, we document how we quantify our experimental results.
---

## Overview

Our project *DR.&nbsp;sTraTeGY* is trying to dynamically record natural mutations in living cells using engineered biological systems. The core of this strategy is a mutation recorder based on the [EMSfp parts](/part-collection/#collection-2-tu-recorders-using-ems-insensitive-fluorescent-protein), which converts random mutations into quantifiable changes in fluorescence intensity. To validate this recorder's functionality, we employed a comprehensive three-stage approach: fluorescence microscopy for direct visual confirmation of intensity variation at single-cell level, flow cytometry for statistical analysis of population-wide fluorescence distribution, and deep sequencing to confirm mutation localization in promoter regions but not EMSfp regions. 

## Microscopy - Qualitative Observation of Signal Variation

To visually record and quantify gene mutations under evolutionary pressure in yeast, we specifically designed the [TU Recorders](/part-collection/#collection-2-tu-recorders-using-ems-insensitive-fluorescent-protein). This novel biological tool dynamically tracks natural mutations in living cells, particularly in yeast, by converting random genetic mutations into quantifiable changes in fluorescence intensity. This is achieved by combining a mutation-sensitive promoter with an EMS (ethyl methanesulfonate)-resistant fluorescent protein. To qualitatively assess the performance of our [28 TU Recorders](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30) combinations and narrow down the most promising candidate, we employed fluorescence microscopy, visually observing changes in fluorescence intensity and distribution within individual yeast cells before and after EMS treatment.

Our screening focused on two key aspects:

- **Primary Channel Reactivity**

  We looked for a noticeable change in fluorescence intensity and brightness distribution within the primary fluorescent channel (the channel corresponding to the specific EMSfp used in the recorder) after EMS treatment. A good recorder would show a more heterogeneous intensity distribution, potentially with a subset of cells becoming noticeably brighter or dimmer, indicating a mutation-driven change in promoter activity.

- **EMS Resistance**

  Simultaneously, we carefully monitored the fluorescence intensity in the other three fluorescent channels. Ideally, these non-primary channels should exhibit minimal to no change in intensity or brightness distribution. This observation would confirm that the EMSfp sequence itself is resistant to mutagenesis, and that the observed changes are specific to the promoter's response to EMS, rather than a general degradation or alteration of the fluorescent protein.
  
  <div style="text-align: center;" id="fig1">
      <img src="https://static.igem.wiki/teams/5643/pageimage/measurement/f1.avif" style="width:80%">
      <div>
          <span style="color:gray"></span>
          <br><br>
      </div>
  </div>
  
  <div style="text-align: center;" id="fig1">
      <img src="https://static.igem.wiki/teams/5643/pageimage/measurement/f2.avif" style="width:80%">
      <div>
          <span style="color:gray"></span>
          <br><br>
      </div>
  </div>

<div style="text-align: center;" id="fig1">
    <img src="https://static.igem.wiki/teams/5643/pageimage/measurement/f3.avif" style="width:80%">
    <div>
        <span style="color:gray">Figure 1. Different promoter-fluorescent protein pairs exhibited distinct fluorescence intensities across channels after EMS treatment. <a href="https://static.igem.wiki/teams/5643/pageimage/measurement/fluorescence-micriscope.avif" target=_blank>(A) pOST1-EMSfp499. (B) pRNR2-EMSfp399. (C) pRNR2-EMSfp499. (D) pRNR2-EMSfp569. (E) pRNR2-EMSfp643. (F) pSTM1-EMSfp569. (G) pTDH3 EMSfp569. (H) pSTM1-EMSfp499.</a> Pre-EMS treatment, pSTM1-EMSfp499 exhibited higher green channel fluorescence intensity compared to other channels. Post-EMS treatment, the green fluorescence intensity and brightness distribution became more heterogeneous, with a subset of cells appearing noticeably brighter.</span>
        <br><br>
    </div>
</div>


Based on initial observations through fluorescence microscopy, we identified some promising combinations that qualitatively met these criteria, showing clear changes in their primary fluorescence channel while maintaining stability in other channels, one of them is BBa_255T0PHY [pSTM1 driven EMSfp499](https://registry.igem.org/parts/bba-255t0phy). This qualitative selection gave us confidence to continue quantitative validation using flow cytometry and deep sequencing.


## Flow Cytometry - Data Processing and Composite Score Calculating

The flow cytometry data processing pipeline was designed to ensure signal fidelity, correct for autofluorescence, and provide statistically robust metrics for quantifying the effect of EMS induction on fluorescent protein expression. This process is divided into three critical stages: (1) Quality Control and Data Normalization, (2) Fold Change Calculation and Significance Test, and (3) Composite Score Calculation.

### Quality Control and Data Normalization

Following initial gating to isolate single-cell populations (for experimental details, please refer to our [Experiments](/experiments/#flow-cytometry-of-single-cell-yeast) page), a rigorous, batch-specific quality control (QC) filter was applied to distinguish true positive fluorescence from background noise and to normalize data.

The non-fluorescent control strain, BY4741, was used to establish the noise threshold and generate corrected fluorescent intensity. Only single-cell events registering a fluorescence intensity above the BY4741 median in the designated channel were retained for downstream analysis, otherwise they were considered non-expressing or indistinguishable from background, and were thus discarded. The effectiveness of this filtration was monitored by calculating the retained event ratio (retained signal count / total event count), which served as the key sample-specific quality control metric (see supplemental table in [gitlab](https://gitlab.igem.org/2025/fudan/-/tree/main/measurement/cytoflex?ref_type=heads)). 

$$
\text{Corrected\_Fluorescence\_Intensity}_{\text{sample}} = \text{Raw\_Fluorescence\_Intensity}_{\text{sample}} - \text{Median\_Intensity}_{\text{BY4741}}   
$$

> Note that to mitigate batch effects, BY4741 control was synchronously treated alongside every batch of experimental samples.

### Fold Change Calculation and Significance Test

Because raw cellular fluorescence data exhibit an **exponential, highly skewed distribution**, we employed logarithmic transformation, which is widely adopted transformation that effectively stabilizes the variance and converts the skewed distribution into an approximately normal distribution for statistical validation.[^1]

$$
\text{Transformed\_Intensity} = \ln(1 + \text{Corrected\_Intensity})
$$

While the t-test on log-transformed data establishes significance, the magnitude of the fluorescent change was quantified using the medium intensity, instead of mean intensity, of the corrected data. This transition is because the median is a non-parametric measure of central tendency that is less sensitive to extreme outliers or subtle shifts in population shape than the mean.[^1] This mixed approach—using log data for statistical confidence (P-Value) and raw median for quantification (FC) —is a key strategy to maximize both the **statistical validity** and the **biological utility** of the final metrics.

$$
\log_2 {\text{FC}} = \log_2 \left( \text{Median}(\text{Corrected\_Intensity}_{\text{Post-EMS}}) \right) - \log_2 \left( \text{Median}(\text{Corrected\_Intensity}_{\text{Pre-EMS}}) \right)
$$

<div style="text-align: center;" id="fig2">
    <img src="https://static.igem.wiki/teams/5643/pageimage/measurement/analysis-for-flow-cytometry.webp" style="width:100%">
    <div>
        <span style="color:gray">Figure 2. Different promoter-fluorescent protein pairs exhibited different fluorescence intensity change pattern after EMS-treatment</span>
        <br><br>
    </div>
</div>

##### Composite Score Calculation

$$
\text{S}_{\text{loss}} = \text{Mean} \left( \left(\log_2 \text{Fold Change}_{\text{Non-Primary Channels}} \right)^2 \right)
$$

This mean-squared function severely penalizes any substantial, non-specific signal change, regardless of whether that change is an increase or a decrease, thereby isolating stable reporting systems.

- **Effectiveness (E)** 

$$
\text{Effectiveness (E)}=|\log_2 \text{Fold Change}|\times(-\log_{10}(\text{P}_{\text{Value}}))
$$

The ∣log<sub>2</sub>Fold Change∣ term measures the magnitude of the expression change in the primary channel—the macro-level effect of the promoter mutation, while the statistical significance term −lg(P<sub>Value</sub>) ensures that only changes that are highly improbable to be due to random noise are rewarded. This filters out unreliable or unstable expression changes.

-  **Composite Score (S)**

The Composite Score (S) synthesizes these two orthogonal performance dimensions (E and S<sub>loss</sub>) into a single weighted objective function:

$$
\text{Composite Score (S)}= W_E \times \text{Effectiveness (E)}- W_s \times \text{Specificity Loss (S}_{\text{loss}}\text{)}
$$

We set a high weight on Effectiveness (WE = 10.0) and a lower weight on Specificity Loss (WS = 1.0), for the model explicitly prioritizes successful mutational outcomes (Effectiveness) but simultaneously enforces a necessary penalty for any system instability (Specificity Loss).

Following a comprehensive performance analysis of all promoter and fluorescent protein combinations, we selected the three optimal pairs -- BBa_25FQWVZE [pRNR2 driven EMSfp383](https://registry.igem.org/parts/bba-25fqwvze), BBa_255T0PHY [pSTM1 driven EMSfp499](https://registry.igem.org/parts/bba-255t0phy), and BBa_25PHHOV9 [pTDH3 driven EMSfp383](https://registry.igem.org/parts/bba-25phhov9).

**Table 1. Performance of Individual Promoter**

| Promoter Performance                |                         |                       |                               |              |
| ----------------------------------- | ----------------------- | --------------------- | ----------------------------- | ------------ |
| Promoter                            | Avg Composite Score (S) | Avg Effectiveness (E) | Avg Specificity Loss (S_loss) | Avg log2(FC) |
| pSTM1                               | 1036.3509               | 103.7323              | 0.9717                        | 0.4013       |
| pOST1                               | 925.2462                | 92.5575               | 0.3292                        | 0.5683       |
| pRNR2                               | 833.1798                | 83.3489               | 0.3097                        | 0.4926       |
| pTDH3                               | 643.8616                | 64.5087               | 1.2255                        | 0.0766       |

**Table 2. Performance of Individual Fluorescent Protein**

| Fluorescent Protein                 | Avg Composite Score (S) | Avg Effectiveness (E) | Avg Specificity Loss (S_loss) | Avg log2(FC) |
| ----------------------------------- | ----------------------- | --------------------- | ----------------------------- | ------------ |
| EMSfp383                            | 2052.6009               | 205.3097              | 0.4958                        | 0.6844       |
| EMSfp399                            | 1294.4916               | 129.5028              | 0.5363                        | 0.4317       |
| EMSfp642                            | 867.7118                | 86.9942               | 2.2302                        | 0.2677       |
| EMSfp499                            | 708.2665                | 70.8591               | 0.3248                        | 0.327        |
| EMSfp643                            | 632.2894                | 63.2449               | 0.1596                        | 0.5662       |
| EMSfp569                            | 316.8661                | 31.776                | 0.8941                        | 0.1562       |
| EMSfp506                            | 19.8933                 | 2.0086                | 0.1927                        | -0.1271      |

**Table 3. Performance of Combination of Different Promoter and Fluorescent Protein**

| Promoter | Fluorescent Protein | Composite Score (S) | Effectiveness (E) | Specificity Loss (S_loss) | log2 (FC) |
| -------- | ------------------- | ------------------- | ----------------- | ------------------------- | -------- |
| pRNR2    | EMSfp383            | 2289.7735           | 228.9991          | 0.2177                    | 0.7633   |
| pSTM1    | EMSfp499            | 1847.6624           | 184.804           | 0.378                     | 0.616    |
| pTDH3    | EMSfp383            | 1815.4284           | 181.6202          | 0.7739                    | 0.6054   |
| pOST1    | EMSfp399            | 1712.5224           | 171.2602          | 0.0795                    | 0.5709   |
| pOST1    | EMSfp642            | 1644.489            | 164.5644          | 1.1547                    | 0.6371   |
| pSTM1    | EMSfp643            | 1155.6685           | 115.574           | 0.0718                    | 0.4703   |
| pRNR2    | EMSfp399            | 1144.0798           | 114.4309          | 0.2291                    | 0.3814   |
| pRNR2    | EMSfp569            | 1122.074            | 112.2424          | 0.3501                    | 0.3741   |
| pTDH3    | EMSfp399            | 1026.8727           | 102.8173          | 1.3002                    | 0.3427   |
| pTDH3    | EMSfp642            | 800.9384            | 80.6409           | 5.471                     | -0.2755  |
| pOST1    | EMSfp643            | 788.7509            | 78.8851           | 0.1005                    | 1.0745   |
| pTDH3    | EMSfp499            | 534.4092            | 53.4454           | 0.0443                    | 0.1782   |
| pOST1    | EMSfp499            | 440.2585            | 44.0377           | 0.1186                    | 0.4455   |
| pTDH3    | EMSfp643            | 310.0307            | 31.0259           | 0.2284                    | -0.2071  |
| pRNR2    | EMSfp643            | 274.7075            | 27.4945           | 0.2378                    | 0.9272   |
| pRNR2    | EMSfp642            | 157.7081            | 15.7773           | 0.0649                    | 0.4414   |
| pSTM1    | EMSfp569            | 105.722             | 10.8187           | 2.4654                    | 0.1177   |
| pOST1    | EMSfp569            | 40.2101             | 4.0403            | 0.1926                    | 0.1135   |
| pTDH3    | EMSfp506            | 19.8933             | 2.0086            | 0.1927                    | -0.1271  |
| pRNR2    | EMSfp499            | 10.7358             | 1.1494            | 0.7583                    | 0.0683   |
| pTDH3    | EMSfp569            | -0.5416             | 0.0027            | 0.5683                    | 0.0194   |


## Growth Curve - Quantitative Assessment of Metabolic Burden

To evaluate the metabolic burden imposed by the top three fluorescent reporters, we quantified and compared their growth rates by recording their hourly growth curves via optical density (OD) measurements. Although the average size of yeast is about 5-10 &mu;m, we only have NanoCym950 nanoparticles with a diameter of 950 nm. We estimated that 1 OD600 corresponds to 10^8 nanoparticles per mL, which was used to convert yeast counts. Experimental details please refer to our [protocol](/experiments/#yeast-growth-curves). 

The experimental growth data were fitted to the Logistic Model to quantify key kinetic parameters, including the maximum population density and the specific growth rate, allowing a quantitative comparison of strain performance. It was performed by fitting the raw data to the Self-Starting Logistic Model (SSlogis) using the nls function in [R](https://gitlab.igem.org/2025/fudan/-/tree/main/measurement/cytoflex).

**Logistic Model:**

$$
y = \frac{\text{Asym}}{1 + e^{-(\text{scal} \times (\text{Time} - \text{xmid}))}}
$$

- **Asym:** asymptote, representing the upper horizontal limit that the curve approaches as the independent variable (Time) increases towards infinity. For growth curves, it is the maximum cell density of the environment.
- **xmid:** inflection point time, representing the value of the independent variable (Time) at which the curve reaches its midpoint. At this point, the value of y is Asym/2. For growth curves, it is the time point when the growth rate is maximal.
- **scal:** scale parameter, defining the spread or slope of the curve. For growth curves, it is inversely related to the growth rate (r). A smaller scal value means a steeper slope and a faster growth rate.

<div style="text-align: center;" id="fig3">
    <img src="https://static.igem.wiki/teams/5643/pageimage/measurement/growth-curve-1.svg" style="width:50%">
    <div>
        <span style="color:gray">Figure 3. Self-Starting Logistic Model Fitted Parameters</span>
        <br><br>
    </div>
</div>

**Table 4. Self-Starting Logistic Model Fitted Parameters**

| Group              | Asym (x 10^8 / mL) | xmid (Time of Inflection) | scal (Growth Rate) | R-squared |
| ------------------ | ------------------ | ------------------------- | ------------------ | --------- |
| **BY4741**         | 3.67               | 5.76                      | 1.3649             | 0.9953    |
| **pSTM1-EMSfp499** | 3.63               | 6.25                      | 1.4536             | 0.9947    |
| **pTDH3-EMSfp383** | 4.07               | 8.82                      | 2.0227             | 0.9924    |
| **pRNR2-EMSfp383** | 5.74               | 16.23                     | 3.0789             | 0.9874    |

According to analysis, [pSTM1-EMSfp499](https://registry.igem.org/parts/bba-255t0phy) demonstrated a growth pattern most similar to the wild-type BY4741 strain, with pTDH3-EMSfp383 following closely ([Figure 3](#fig3) & Table 4). While the pRNR2-EMSfp383 combination achieved the highest Composite Score (S) in flow cytometry, it imposed a significant metabolic burden on the yeast, rendering it unsuitable as an ideal fluorescent reporter. By synthesizing the fluorescent change patterns with the metabolic burden profiles, we concluded that BBa_255T0PHY [pSTM1 driven EMSfp499](https://registry.igem.org/parts/bba-255t0phy) is the optimal reporter combination for our Recorder module.

## Deep Sequencing - Molecular Validation of the Mechanism

To further validate that the EMS Sequence Optimizer-optimized fluorescent protein exhibits high resistance to EMS mutagenesis, we performed deep sequencing (third-generation [Nanopore](https://gitlab.igem.org/2025/fudan/-/tree/main/measurement/nanopore/) sequencing) on select gene sequences.

Using the pre-EMS-induction sequence as the reference, we employed the [NanoPlot](https://github.com/wdecoster/NanoPlot) tool to align the Nanopore reads to the reference/target sequence. We then generated a pileup output to calculate the base counts and percentages at each position. Supplemental data is available in [gitlab](https://gitlab.igem.org/2025/fudan/-/tree/main/measurement/cytoflex).

A site was designated as a genuine mutation—rather than a sequencing error—if its matching rate fell below 95% relative to the reference base. This 95% threshold was established based on the reported ∼5% error rate of Nanopore sequencing itself. The potential contribution of mutations arising from the high-fidelity Phanta PCR amplification was deemed negligible, as its [mutation rate](https://bio.vazyme.com/product/115.html) (∼10<sup>−5</sup> divided by 128 for Phanta Max fidelity) is several orders of magnitude lower than the Nanopore error rate.

<div style="text-align: center;" id="fig4">
    <img src="https://static.igem.wiki/teams/5643/pageimage/measurement/ems-mutation-rates.avif" style="width:50%">
    <div>
        <span style="color:gray">Figure 4. EMS induced mutation rate in different regions</span>
        <br><br>
    </div>
</div>

By separately quantifying the putative EMS-induced mutations (G/C ↔ A/T) within the promoter, coding sequence (CDS or EMSfp), and terminator regions, we calculated the respective mutation rates. The results showed that the EMS mutation rate in the promoter region was significantly higher than that in the CDS/EMSfp region（one-way ANOVA and followed with Tukey's multiple comparisons test, p < 0.001). Our analysis confirms that the EMSfp sequence indeed confers resistance to EMS-induced mutagenesis.


### Summary

The integrated results demonstrate that EMS-induced mutations specifically accumulate in the promoter region rather than the coding sequence, directly linking observed fluorescence changes to targeted genetic alterations. Through this systematic validation spanning cellular, population, and molecular levels, we have established BBa_255T0PHY [pSTM1 driven EMSfp499](https://registry.igem.org/parts/bba-255t0phy) in our [TU Recorders collection](/part-collection/#collection-2-tu-recorders-using-ems-insensitive-fluorescent-protein) as a reliable standardized biological part that effectively records mutation events, thereby enabling dynamic tracking by our *DR.&nbsp;sTraTeGY*.

### Reference

[^1]: Hodgins-Davis, A., Duveau, F., Walker, E. A., & Wittkopp, P. J. (2019). Empirical measures of mutational effects define neutral models of regulatory evolution in *Saccharomyces cerevisiae*. *Proceedings of the National Academy of Sciences of the United States of America*, *116*(42), 21085–21093. DOI: 10.1073/pnas.1902823116 
