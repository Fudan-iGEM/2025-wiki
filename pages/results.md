---
title: Results
authors:
  - name: Zhiqin Wang
    url: /fudan/team/#Zhiqin
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/wzq-a.webp
  - name: Yixuan Lu
    url: /fudan/team/#Yixuan
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/lyx-a.webp
  - name: Yue Yue
    url: /fudan/team/#Yue
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/yy-a.webp
layout: igem
heroImage: https://static.igem.wiki/teams/5643/header/screenshot-2025-10-08-at-23-13-36.avif
description: On this page, we show the results of our experiments.
---

## Characteristics of Grape Yeast

### Chitin Imaging Reveals the Morphology of Multicellularity

<div style="text-align:center;" id="fig1">
  <img src="https://static.igem.wiki/teams/5643/pageimage/results/single-vs-multi.avif" style="width:50%">  
  <div><span style="text-align:left; margin:0; color:gray;">Figure 1. Chitin Imaging of Single vs Grape Yeast.
    <br>Morphological comparison of unicellular and multicellular yeast under bright-field (BF) and calcofluor white fluorescence (FL) microscopy. Scale bar = 10 &mu;m.
  </span></div>
</div>

We first confirmed the multicellular morphology of the *ACE2*-knockout grape yeast. As shown in Figure 1, the yeast cell wall was [stained](/experiemnts/#chitin-staining) with a chitin-specific dye calcofluor white and immediately imaged under both bright-field and fluorescence microscopy. The multicellular cells grew in grape-like clusters, and at the junctions—where the walls were markedly thicker—the corresponding fluorescence intensity was higher. This pattern allowed us to delineate familial clusters. Next we compared multicellular pattern between 2N and 4N Grape Yeast. As shown in Figure 2, blue arrows highlight regions where cells appeared to contact each other in bright-field images but showed no connecting fluorescent signal, indicating that these were not true cellular junctions.

To determine the temporal sequence of growth and identify mother–daughter relationships, the culture was resumed for an additional 24 h after staining. Under bright-field illumination, several cells lacked detectable fluorescence (orange arrows), demonstrating that the fluorophore had not yet incorporated into these nascent cell structures.

<div style="text-align:center;" id="fig2">
  <img src="https://static.igem.wiki/teams/5643/pageimage/results/chitin-imaging-2.webp" style="width:100%">  
  <div><span style="text-align:left; margin:0; color:gray;">Figure 2. Chitin Imaging of 2N and 4N Grape Yeast.
    <br>Morphological comparison of diploid and tetraploid yeast under bright-field (BF) and fluorescence (FL) microscopy. Fix: cells were fixed and stained immediately before imaging; Fix-Grow: cells were stained and then allowed to grow for an additional 24 hours prior to fixation and imaging. Blue arrows: regions that appear as cell junctions or buds in the bright-field channel but lack corresponding fluorescence signals; Orange arrows: newly formed cells (buds) that emerged after the staining procedure and display minimal or no fluorescence signal. Scale bar = 10 &mu;m.
  </span></div>
</div>

However, a subset of cells in the Fix group were found outside the focal plane during image acquisition, making their fluorescence undetectable and potentially confounding the identification of newborn cells in the Fix-and-Grow cohort. To overcome this limitation, we engineered a brighter and more definitive reporter [TU Timer](/part-collection/#fluorescent-timer) (BBa_25AT6YR4) to resolve the temporal relationships between adjacent cells.


### Settling Selection Leads to Ploidy Abnormalities in Tetraploid Yeast

It is indicated that during gravity-based selection, multicellular yeast undergoes ploidy doubling[^1], which is much similar to the change some pathogenic fungi undergo under the pressure of drug[^2]. Hence, we subjected both diploid (2N) and tetraploid (4N) Grape Yeast under [settling selection](/experiments/#grape-yeast-settling-selection) over successive generations to simulate the ploidy shift experienced by pathogenic fungi under drug-induced stress. We performed Propidium Iodide (PI) staining on the cell nuclei and subsequently acquired fluorescence images. The log-transformed PI fluorescence intensity is known to be linearly correlated with the number of chromosomes[^1].

While the ploidy of diploid grape yeast remained relatively stable in short time (9 generations), we unexpectedly discovered a distinct abnormality in the ploidy of the tetraploid (4N) strain. As shown in Figure 3A, the blue arrow points to a single cell containing two nuclei—the nucleus on the right appears to be in a state of division—suggesting a higher ploidy state, potentially hexaploid (6N). 

Our quantitative statistical data (Figure 3B, C) further supports this observation. The distribution of PI fluorescence intensity for the 4N strain was significantly more dispersed than the 2N strain, and a distinct minor peak corresponding to a putative hexaploid (6N) population was visible in the histogram (Figure 3B).

These results collectively suggest that, under the pressure of settling selection, higher-ploidy strains of *S. cerevisiae* possess a comparatively less stable genome and exhibit a pronounced tendency toward increased ploidy. We hypothesize that the underlying cause involves a failure in the ploidy sensing and maintenance machinery. This defect may lead to chromosome missegregation events, resulting in an unstable state where the cell is unable to correctly regulate its division cycle based on its current chromosome complement.

<div style="text-align:center;" id="fig3">
  <img src="https://static.igem.wiki/teams/5643/pageimage/results/ploid-abnormality-2.webp" style="width:100%">  
  <div><span style="text-align:left; margin:0; color:gray;">Figure 3. Microscopy images and statistical analysis of yeast ploidy changes.
    <br>(A) Merged bright-field and fluorescence images of PI-stained diploid (left) and tetraploid (right) yeast after 9 generations of settling selection. Blue arrow: a single cell containing two nuclei, suggestive of an abnormal karyotype. Scale bar = 10 &mu;m. <br>
(B) Population-level distribution of fluorescence intensity in diploid and tetraploid yeast. <br>
(C) Fluorescence intensity distribution across individual biological replicates of diploid (n = 7) and tetraploid (n = 9) yeast samples.
  </span></div>
</div>


### Polyploid Yeast Exhibits a Faster Sedimentation Rate

Throughout the settling selection experiment, we noticed a gradual increase in yeast settling speed with successive passages. As illustrated in Fig.1 & Fig.2(A), tetraploid cells displayed noticeably larger cell volumes compared to diploids. Together with our earlier observation that chromosome number tends to rise during long-term passaging, this led us to hypothesize that higher passage number and increased ploidy may both contribute to larger cell size and faster sedimentation.

To test this idea, we measured the settling rates of yeast at different passages (d15 vs. d45) and ploidy levels (2× vs. 4×). Consistent with our expectation, the 4× strain in d45 settled the fastest.

<div style="text-align: center;" id="vid1">
    <img src="https://static.igem.wiki/teams/5643/pageimage/results/od5.webp" style="width:80%">
    <div>
        <span style="color:gray">Video 1. Comparison of sedimentation rate OD600 values for four strains.</span>
        <br><br>
    </div>
</div>


### Dynamics of Grape Yeast Branching

As microscopic images of fixed yeast cells fail to capture the real-time, authentic dynamics of Grape Yeast branching, we employed [live-cell imaging](/experiments/#yeast-live-cell-imaging-in-agarose) over a 3-hour span to track the yeast growth process.

<div style="text-align:center;" id="fig4">
  <img src="https://gitlab.igem.org/2025/fudan/-/raw/main/microscopy.webp?ref_type=heads" style="width:100%;margin-bottom:0"><br>
  <img src="https://static.igem.wiki/teams/5643/pageimage/results/pos5-1-montage.avif" style="width:100%;margin-top:0">
  <div><span style="text-align:left; margin:0; color:gray;">Figure 4. Live-cell imaging of Grape Yeast.
    <br>Grape Yeast was embedded in 0.4% low-melting agarose in SC media and presented on a glass-botton dish. Live-cell growth was imaged using a microscope at a maintained temperature of 30°C. Red arrows indicate the buddiing process of Grape Yeast in 3 h. The time-lapse movie at the top left corner was used to generate the montage image.
  </span></div>
</div>


## Visualize the Evolution: The Timer & Recorder Extension

Having obtained the multicellular [Grape Yeast](/design/) and gained familiarity with the its properties, we initiated an evolutionary tracing study.

In this section, we evaluated various combination of promoters and fluorescent protein from different perspectives, including [fluoresence imaging](/measurement/#microscopy-qualitative-observation-of-signal-variation), [flow cytometry](/measurement/#flow-cytometry-data-processing-and-composite-score-calculating) and [deep sequencing](/measurement/#deep-sequencing-molecular-validation-of-the-mechanism). Through this thorough assessment, we eventually come up with a optimized fluorescent reporter, pSTM1 driven EMSfp499 (BBa_255T0PHY), that can function effectively under stress conditions. For more details, please refer to our [Measurement](/measurement/) page.


## What we learn

### Grape Yeast Characteristics

- The multicellular Grape Yeast grows in grape-like clusters and was confirmed using chitin staining, which provides a great chassis for us to trace the growth and mutation of yeast.
- Higher-ploidy tetraploid yeast exhibits a less stable genome than diploid yeast under gravity-based settling selection. This characteristic shows the potential for grape yeast to mimic pathogenic fungus under pressure. 
- Meanwhile, as some studies have reported that certain fungi develop drug resistance by downregulating the expression of drug targets—potentially through mechanisms such as gene modification or genome ploidy reduction—we employed IME1 to induce meiosis in grape yeast as a model for this phenomenon. The corresponding results will be presented in our presentation video.
- Both higher ploidy and increased passage number lead to faster sedimentation rates.
Future teams may easily sort out grape yeast based on this characteristic.

### Evolution Tracing

- The live-cell images give us confidence to track mother-daughter sequence utilizing our [TU timer](/part-collection/#fluorescent-timer).
- An optimized fluorescent reporter, [pSTM1 driven EMSfp499](https://registry.igem.org/parts/bba-255t0phy) was developed to effectively trace the evolutionary dynamics of the Grape Yeast under selective pressure. 
- On the next stage of our project, we will integrate [pSTM1 driven EMSfp499](https://registry.igem.org/parts/bba-255t0phy) into sixteen chromosomes of yeast to find out the most unstable chromosome and even gene loci. This work would lay the foundation for advancing the understanding of fungal drug resistance mechanisms as well as the development of fungal drug targets.


## Reference

[^1]: Tong, K., Datta, S., Cheng, V., Haas, D. J., Gourisetti, S., Yopp, H. L., Day, T. C., Lac, D. T., Khalil, A. S., Conlin, P. L., Bozdag, G. O., & Ratcliff, W. C. (2025). Genome duplication in a long-term multicellularity evolution experiment. *Nature*, *639*(8055), 691–699. DOI: 10.1038/s41586-025-08689-6
[^2]: Khateb, A., Gago, S., Bromley, M., Richardson, M., & Bowyer, P. (2023). Aneuploidy Is Associated with Azole Resistance in Aspergillus fumigatus. *Antimicrobial agents and chemotherapy*, *67*(4), e0125322. DOI: 10.1128/aac.01253-22
