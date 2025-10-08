---
title: Results
authors:
  - name: Zhiqin Wang
    url: /fudan/team/#Zhiqin
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/dyx-a.webp
  - name: Yixuan Lu
    url: /fudan/team/#Yixuan
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/dyx-a.webp
  - name: Yue Yue
    url: /fudan/team/#Yue
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/dyx-a.webp
layout: igem
heroImage: https://static.igem.wiki/teams/5643/img/screenshot-2025-08-06-at-21-23-43.webp
description: On this page, we
---

## Characteristics of Grape Yeast

### Chitin Imaging Reveals the Morphology of Multicellularity

We first confirmed the multicellular morphology of the *ACE2*-knockout grape yeast. As shown in Figure 1, the yeast cell wall was [stained](/experiemnts/#chitin-staining) with a chitin-specific dye calcofluor white and immediately imaged under both bright-field and fluorescence microscopy. The cells grew in grape-like clusters, and at the junctions—where the walls were markedly thicker—the corresponding fluorescence intensity was higher. This pattern allowed us to delineate familial clusters. Blue arrows highlight regions where cells appeared to contact each other in bright-field images but showed no connecting fluorescent signal, indicating that these were not true cellular junctions.

To determine the temporal sequence of growth and identify mother–daughter relationships, the culture was resumed for an additional 24 h after staining. Under bright-field illumination, several cells lacked detectable fluorescence (orange arrows), demonstrating that the fluorophore had not yet incorporated into these nascent cell structures.

<div>
  <p style="text-align:center; margin:0; color:gray;">
    <img src="https://static.igem.wiki/teams/5643/pageimage/results/chitin-imaging-2.webp">  
    <small>Figure 1. Chitin Imaging of 2x and 4x Grape Yeast</small>
  </p>
  <!-- 第二段: 靠左，紧贴上一行 -->
  <p style="text-align:left; margin:0; color:gray;">
  <small>Morphological comparison of diploid and tetraploid yeast under bright-field (BF) and fluorescence (FL) microscopy. Fix: cells were fixed and stained immediately before imaging; Fix-Grow: cells were stained and then allowed to grow for an additional 24 hours prior to fixation and imaging. Blue arrows: regions that appear as cell junctions or buds in the bright-field channel but lack corresponding fluorescence signals; Orange arrows: newly formed cells (buds) that emerged after the staining procedure and display minimal or no fluorescence signal. Scale bar = 10 &mu;m.</small>
  </p>
</div>

However, a subset of cells in the Fix group were found outside the focal plane during image acquisition, making their fluorescence undetectable and potentially confounding the identification of newborn cells in the Fix-and-Grow cohort. To overcome this limitation, we engineered a brighter and more definitive reporter—[TU Timer](/part-collection/#Fluorescent-Timer) (BBa_25AT6YR4)—to resolve the temporal relationships between adjacent cells.



### Settling Selection Leads to Ploidy Abnormalities in Tetraploid Yeast

It is indicated that during gravity-based selection, multicellular yeast undergoes ploidy doubling[^1], which is much similar to the change some pathogenic fungi undergo under the pressure of drug[^2]. Hence, we subjected both diploid (2x) and tetraploid (4x)  Grape Yeast under [settling selection](/experiments/#grape-yeast-settling-selection)over successive generations to simulate the ploidy shift experienced by pathogenic fungi under drug-induced stress. We performed Propidium Iodide (PI) staining on the cell nuclei and subsequently acquired fluorescence images. The log-transformed PI fluorescence intensity is known to be linearly correlated with the number of chromosomes（引用童凯）.

While the ploidy of diploid grape yeast remained relatively stable in short time (9 generations), we unexpectedly discovered a distinct abnormality in the ploidy of the tetraploid (4x) strain. As shown in Figure 2A, the blue arrow points to a single cell containing two nuclei—the nucleus on the right appears to be in a state of division—suggesting a higher ploidy state, potentially hexaploid (6x). 

Our quantitative statistical data (Figure 2B, C) further supports this observation. The distribution of PI fluorescence intensity for the 4x strain was significantly more dispersed than the 2x strain, and a distinct minor peak corresponding to a putative hexaploid (6x) population was visible in the histogram (Figure 2B).

These results collectively suggest that, under the pressure of settling selection, higher-ploidy strains of *S. cerevisiae* possess a comparatively less stable genome and exhibit a pronounced tendency toward increased ploidy. We hypothesize that the underlying cause involves a failure in the ploidy sensing and maintenance machinery. This defect may lead to chromosome missegregation events, resulting in an unstable state where the cell is unable to correctly regulate its division cycle based on its current chromosome complement.

<div>

  <p style="text-align:center; margin:0; color:gray;">
    <img src="https://static.igem.wiki/teams/5643/pageimage/results/ploid-abnormality-2.webp">  
    <small>Figure 2. Microscopy images and statistical analysis of yeast ploidy changes.</small>
  </p>

  <p style="text-align:left; margin:0; color:gray;">
    <small> (A) Merged bright-field and fluorescence images of PI-stained diploid (left) and tetraploid (right) yeast after 9 generations of settling selection. Blue arrow: a single cell containing two nuclei, suggestive of an abnormal karyotype. Scale bar = 10 &mu;m. </br>
 (B) Population-level distribution of fluorescence intensity in diploid and tetraploid yeast. </br>
 (C) Fluorescence intensity distribution across individual biological replicates of diploid (n = 7) and tetraploid (n = 9) yeast samples. </small>
  </p>
</div>



### Polyploid Yeast Exhibits a Faster Sedimentation Rate

在做settling selection实验的过程中，我们感觉到随着传代数量的增加，酵母沉降的速度似乎逐渐变快。同时，如Figure 1, 2A中所示，四倍体的细胞体积相对于二倍体更大，结合上述在传代过程中酵母染色体数量增加的发现，我们猜测传代数和染色体数量越多的酵母，体积越大，沉降越快。因此，我们比较了不同代数（d15, d45）、不同倍型（2x, 4x）酵母的沉降速率，发现如我们所预期，d45, 4x的酵母沉降最快。



### Dynamics of Grape Yeast Branching

As microscopic images of fixed yeast cells fail to capture the real-time, authentic dynamics of Grape Yeast branching, we employed live-cell imaging over a 3-hour span to track the yeast growth process.


## Visualize the Evolution: The Timer & Recorder Extension

Having obtained the multicellular Grape Yeast and gained familiarity with the its properties, we initiated an evolutionary tracing study. 

In this section, we evaluated various combination of promoters and fluorescent protein from different perspectives, including [confocal imaging](/measurement/#Microscopy-Qualitative-Observation-of-Signal-Variation), [flow cytometry](/measurement/Flow-Cytometry-Data-Processing-and-Composite-Score-Calculating) and [deep sequencing](/measurement/#Deep-Sequencing-Molecular-Validation-of-the-Mechanism) . Through this thorough assessment, we eventually come up with a optimized fluorescent reporter, pSTM1 driven EMSfp499 (BBa_25IB5O7X)，that can function effectively under pressure conditions.



## Reference

[^1]: Tong, K., Datta, S., Cheng, V., Haas, D. J., Gourisetti, S., Yopp, H. L., Day, T. C., Lac, D. T., Khalil, A. S., Conlin, P. L., Bozdag, G. O., & Ratcliff, W. C. (2025). Genome duplication in a long-term multicellularity evolution experiment. *Nature*, *639*(8055), 691–699. DOI: 10.1038/s41586-025-08689-6
[^2]: Khateb, A., Gago, S., Bromley, M., Richardson, M., & Bowyer, P. (2023). Aneuploidy Is Associated with Azole Resistance in Aspergillus fumigatus. *Antimicrobial agents and chemotherapy*, *67*(4), e0125322. DOI: 10.1128/aac.01253-22
