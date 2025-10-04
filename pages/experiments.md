---
title: Experiments
authors: 
  - name: Yixuan Lu
    url: /fudan/team/#Yixuan
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/lyx-a.webp
layout: igem
heroImage: https://static.igem.wiki/teams/5643/img/screenshot-2025-08-06-at-21-23-43.webp
description: On this page, we 
---


## Golden Gate Assembly

Shaw et al. (2023)

### Expanded Golden Gate

tba


## Site-Directed Mutagenesis PCR

Primers were designed as in DOI: 10.1186/1472-6750-8-91 Figure 2[114]. The non-overlapping sequences are larger (significantly larger than suggested in [13]) than the complementary sequences to make the melting temperature of non-overlapping sequences (Tm no, 47.5-60.2) 5 to 10°C higher than the melting temperature of primer-primer complementary sequences (41.1-50.3 Tm pp < Tm no).

For single-site mutation, deletion or insertion, the PCR reaction of 25 &mu;l contained 1–5 ng of template, 1 &mu;M primer pair, 200 &mu;M dNTPs and 3 units of Pfu DNA polymerase. The PCR cycles were initiated at 95°C for 5 minutes to denature the template DNA, followed by 12 amplification cycles. Each amplification cycle consisted of 95°C for 1 minute, Tm no -5°C for 1 minute and 72°C for 10 minutes or 15 minutes according to the length of the template constructs (for Phanta DNA polymerase is 30-60 sec per kb). The PCR cycles were finished with an annealing step at Tm pp-5°C for 1 minute and an extension step at 72°C for 30 minutes. The PCR products were treated with 2 units of DpnI at 37°C for 2 hours and then 10 &mu;l of each PCR reactions was analyzed by agarose gel electrophoresis. Once verified by [agarose gel electrophoresis](#other-experimental-methods) the PCR products was transformed respectively into *E. coli* Turbo competent cells by heat shock.

114. Liu H, Naismith JH. An efficient one-step site-directed deletion, insertion, single and multiple-site plasmid mutagenesis protocol. BMC Biotechnol, 2008 Dec 4:8:91. PMID:19055817

13. Zheng L, Baumann U, Reymond JL. An efficient one-step site-directed and site-saturation mutagenesis protocol. Nucleic Acids Res, 2004, 32: e115



## Yeast Transformation

### Yeast Frozen Cell Preparation

1. Pick colony from plate into 5 mL growth medium for overnight growth at 30°C, 250 rpm.

2. Do a 1:100 dilution of saturated overnight culture into fresh growth medium and incubate at 30°C, 250 rpm.

   `2 mL culture = 1 competent cell aliquot = 1 transformation`

3. Grow up yeast to OD600 ~0.75.

4. Pellet at 4000 *g* for 5 min in large centrifuge.

5. Wash with 0.5x volume H<sub>2</sub>O.

6. Pellet at 4000 *g* for 5 min in large centrifuge.

7. Resuspend in 0.025x volume frozen competent cell (FCC) solution (filter sterilize):

   |       |      Reagent      | Volume (50 mL solution) |
   | :---: | :---------------: | :---------------------: |
   | **1** |   Glycerol (5%)   |         2.5 mL          |
   | **2** |    DMSO (10%)     |          5 mL           |
   | **3** | ddH­<sub>2</sub>O |         42.5 mL         |

8. Aliquot 50 &mu;L of cell suspension into 1.5 mL tubes and put into -80°C freezer for long term storage.

### DNA Digestion

This step linearizes plasmid DNA prior to transformation to increase integration efficiency.

1. Set up the digestion reaction in a sterile microcentrifuge tube. For a 20 &mu;L reaction, combine the following:

   |       |       Reagent       |          Volume (&mu;L)          |
   | :---: | :-----------------: | :---------------------------: |
   | **1** |       NotI-HF       |              0.1              |
   | **2** | 10x CutSmart Buffer |               2               |
   | **3** |  ddH­<sub>2</sub>O  |  to a final volume of 20 &mu;L   |
   | **4** |         DNA         | Variable amount (600-1000 ng) |
   |       |      **Total**      |            **20**             |

2. Incubate the reaction for approximately 6 h at 37°C.

### Incubation with PEG/Lithium Acetate

1. Ahead of time, prepare the following reagents:

   - PEG-LiOAc-mixture

     |       |      Reagent       | Volume per transformation (&mu;L) |
     | :---: | :----------------: | :----------------------------: |
     | **1** | PEG-3350 (50% w/v) |              260               |
     | **2** |   LiOAc (1.0 M)    |               36               |
     |       |     **Total**      |            **296**             |

   - DNA cocktail

     |       |        Reagent         | Volume per transformation (&mu;L) |
     | :---: | :--------------------: | :----------------------------: |
     | **1** | Boiled ssDNA (2 mg/mL) |               50               |
     | **2** | DNA + ddH<sub>2</sub>O |               14               |
     |       |       **Total**        |             **64**             |

### Heat Shock

1. Thaw frozen cell samples at room temperature (a few mins).

   `Thaw the samples on ice!`

2. Centrifuge cells at 8000 rpm on small bench top centrifuge for 30 s and remove supernatant.

3. Resuspend cell pellet with 104 &mu;L of DNA cocktail and incubate at room temperature for 30 min.

4. Mix cell-DNA suspension with 296 &mu;L of PEG-LiOAc mixture and incubate at room temperature for 30 min.

5. Transfer tubes to 42°C water bath for 15 min, or longer if needed (up to 45 min).

   `Immediately place the tubes on ice to cool after heat shock!`

6. Centrifuge 8000 rpm on small bench top centrifuge for 30 s and remove supernatant.

7. Depending on the selection marker:

   `Be careful not to mix up the selection markers!`

   - Auxotrophic selection marker: Add 0.1-1 mL H<sub>2</sub>O and leave for 10 mins at room temperature to resuspend.

   - Antibiotic selection marker: Recover in 1 mL YPD for 2-3 h at 30°C, 250 rpm.

8. Plate desired volume on plates.

9. Incubate plates for 2-3 days upside down at 30°C.


### 1-day Yeast Transformation

overnight culture 1:20 into fresh YPD; start NotI digestion; 4 hours later when OD reaches 0.7, harvest yeast (1 mL for one transformation), wash with 0.2 M LiAc 这些在frozen之前的一节


## Yeast Colony PCR

1. Pick a single colony from solid medium and resuspend it in 50 &mu;L of sterile water; or use 1 &mu;L of liquid culture.

2. Combine the following components in a PCR tube:

   |       |               Reagent                | Volume (&mu;L) |
   | :---: | :----------------------------------: | :---------: |
   | **1** |           Yeast Suspension           |      1      |
   | **2** |        Forward Primer (10 &mu;M)        |     0.5     |
   | **3** |        Reverse Primer (10 &mu;M)        |     0.5     |
   | **4** |           ddH<sub>2</sub>O           |      3      |
   | **5** | 2x Phire Plant Direct PCR Master Mix |      5      |
   |       |              **Total**               |   **10**    |

3. Transfer the reaction to a thermocycler and run the following program:

   a. Initial Denaturation: 98°C for 5 min.

   b. Cycling (30 cycles):

   -   Denaturation: 98°C for 5 s.
   -   Annealing: 60°C for 5 s.
   -   Extension: 72°C for 30 s.

   c. Final Extension: 72°C for 30 s.

### Quick Yeast Genome DNA Purification

If the routine genotyping above fails, the following protocol can be used to quickly extract good quality genome for PCR fragments < 3.5kb with your polyermase of choice.

1. Pick one yeast colony from the plate into 100 &mu;L of water or spin down 100 &mu;L of saturated liquid yeast culture in 1.5-mL tube.
2. Resuspend cells in 100 &mu;L of lysis buffer (200 mM LiOAc, 1% SDS)
3. Incubate for 5 min at 70°C.
4. Add 300 &mu;L of 96-100% ethanol and vortex well.
5. Pellet DNA and cell debris at 15000 *g* for 3 min and remove ethanol.
6. Wash pellet with 200 &mu;L ethanol, spin down and remove as much ethanol as possible.
7. Dry pellet with lid open for 5-10 min.
8. Dissolve pellet in 100 &mu;L of H<sub>2</sub>O or TE and spin down cell debris for 15 s at 15000 *g*.
9. Transfer supernatant to fresh tube.
10. Use 1 &mu;L of supernatant for PCR.


## Grape Yeast Settling Selection

1. Grow the diploid and tetraploid yeast with *ACE2* deletion in 3 mL of YPD media with and without G418 at 30 °C with shaking at 250 rpm for 24 h.
2. Transfer 1 mL of the culture into a 1.5-mL Ep tube.
3. Let clusters settle on the bench for 3 min.
4. Transfer the bottom 50 &mu;L into 3 mL of fresh YPD media for the next day of growth. 
5. Archive a glycerol (20%) stock for each population every 7 days. 


## Yeast Growth Curves


## Flow Cytometry of Single Cell Yeast

BY4741 or BY4742, not Graphe Yeast


## Grape Yeast Cluster Size Measurement

### Strain Revival and Culture Growth

1. Revive strains from glycerol stocks by growing them on YPD plates at 30°C for 2 days.
2. Inoculate each strain into 10 mL of YPD media. Grow at 30°C with 250 rpm shaking for 3 days, performing daily settling selection before transferring to fresh media.
3. On the last day, after settling selection and transfer, grow the cultures for 24 hours. Sample them at 4 hours (exponential phase) and 24 hours (stationary phase) for measuring cluster size.

### Sample Preparation for Imaging

1. Gently shake each culture by hand. In a 24-well plate, add an appropriate volume of the culture (1–250 &mu;L) to H<sub>2</sub>O containing 10 &mu;L of 16% (w/v) formaldehyde, making a final volume of 510 &mu;L per well. 
2. For macroscopic strains, use wide-bore 1-mL tips and sample twice from each culture into two separate wells.
3. Gently shake the 24-well plate to evenly spread out the clusters and allow 5–10 minutes for clusters to settle.

### Image Acquisition and Analysis

Use a microscope to scan the entire well. Take and stitch 5 × 8 bright-field, shading-corrected images with 10% overlap at ×4 magnification, scanning at 1 mm/s.

Use ImageJ for a semi-automated image analysis pipeline:

1. Segment clusters using auto local thresholding and split touching clusters using seed-based watershed.
2. Perform manual correction as needed.
3. Measure the cross-sectional area of each cluster.
4. Remove segmented objects with an area below 40 &mu;m².
5. Using R, convert cluster areas to cluster volumes and radiuses, treating clusters as perfect spheres.
6. For each strain, calculate its biomass-weighted mean cluster radius by first calculating its mean cluster volume weighted by cluster volume, and then converting it to a radius.


## Cell Volume and Aspect Ratio Measurement

### Strain Revival and Culture Growth

1. Revive strains from glycerol stocks by growing them on YPD plates at 30°C for 2 days.
2. Inoculate each strain into 10 mL of YPD media and grow at 30°C with 250 rpm shaking for 3 days. Perform daily settling selection before transferring to fresh media each day.
3. On the last day, transfer 100 &mu;L of culture (without settling selection) to 10 mL of fresh media and grow for 12 hours.

### Sample Preparation for Imaging

1. Transfer 25 &mu;L of each culture to a 1.5-mL microcentrifuge tube. 
2. For macroscopic strains, use 100-&mu;L wide-bore tips to sample the culture and break clusters into tiny pieces by pipetting with 100-&mu;L regular-bore tips.
3. Pellet the cells by spinning at 5,000 *g*, and then wash the pellet with 1 mL of 1× PBS.
4. Resuspend the pellet and incubate in 100 &mu;L of 5 &mu;M Calcofluor White in 1× PBS at room temperature.
5. Gently crush 5 &mu;L of stained clusters into a single layer of cells between a microscope slide and a coverslip. Avoid shearing the cells.

### Image Acquisition

1. Take brightfield and fluorescent (UV channel) images of at least five fields of view (FOVs) per strain at ×40 magnification.
2. For each FOV, set the focus in the brightfield channel by manually moving to a z-plane where cells look grey, then move down by 0.7 &mu;m for sharp fluorescent signals.

### Image Analysis

1. Use a semi-automated image analysis pipeline with Cellpose to perform automated cell segmentation. Specify a cell diameter of 80 pixels for images with 0.073 &mu;m per pixel. Run on GPUs.
2. Manually correct the segmentation using the Cellpose Graphical User Interface (GUI).
3. Use ImageJ to measure the area, lengths of major and minor axis, aspect ratio, and solidity of each cell.
4. Remove segmented objects with an area below 1 &mu;m² or a solidity below 0.8.
5. Using R, calculate cell volumes using the formula V = 4/3 × πab², where a and b are the lengths of the major and minor axis of each cell, respectively.



## Imaging-based Ploidy Measurement of Grape Yeast

In every experiment, two control strains with known ploidy, namely, the engineered grande diploid and tetraploid snowflake 还没改 yeast, also went through the same procedure of sample preparation and imaging. 

需要PI染色的

### Preparation Procedure

1. Grow each strain of interest in YPD media to mid-log phase.
2. Transfer 250 &mu;L of the culture into a 1.5-mL microcentrifuge tube. 
3. Pellet the clusters by spinning at 5,000 *g* for 1  min and wash them with 1 mL of H<sub>2</sub>O.
   `For macroscopic strains, break the clusters into small pieces by pipetting vigorously using 100-&mu;L regular-bore tips before washing.` 
4. Fix and permeabilize the cells in 1 mL of 70% ethanol at room temperature for 2 h with end-to-end rotation on a mini-rotator at a speed of 40 rpm. 
5. Centrifugat for ethanol removal and wash the pellet with 1 mL of 50 mM sodium citrate twice. 
6. Resuspend the clusters in 200 &mu;L of 50 mM sodium citrate containing 0.5 mg/ml RNase A and incubate them in a 37 °C heat block for 2 h with gentle inversion every 30 min (as clusters settle over time). 
7. After RNA digestion, add 5  &mu;L of 1 mg /mL propidium iodide and incubate the mixture in a 30 °C incubator in dark overnight with rotation on a mini-rotator at  at a speed of 10 rpm to keep clusters from settling.
8. Propidium iodide-stained clusters can be stored at 4 °C for no longer than 1 week before imaging.

### Fluorescent Imaging

1. Crush 5 &mu;L of propidium iodide-stained clusters into a single layer of cells between a microscope slide and a coverslip.
2. For each sample, take 14-bit images of approximately 10 FOVs at ×20 magnification. 
3. For each FOV (fields of view), set the focus by manually moving to a *z*-plane in which cells look grey (rather than brighter or darker) in the brightfield channel and then moving down by 1 &mu;m to get sharp fluorescent signals of the nuclei. 
4. Image the flattened clusters in the red fluorescent channel (exposure of 600 ms and gain of 2.2×) at the focal plane as well as one *z*-plane 0.3 &mu;m above and below the focal plane (three *z*-planes in total) to detect the propidium iodide-stained nuclei, and then imaged in the brightfield channel (exposure of 100 ms and gain of 4.1×) at the focal plane. 
5. Set the exposure and gain of the fluorescent channel such that the brightest pixels in the tetraploid control strain are approximately 80% of the maximal allowed pixel value while minimizing photobleaching and noise.

### Image Analysis

Images were quantitatively analyzed by ImageJ.

1. Perform maximum intensity projection of the three *z*-planes taken in the fluorescent channel and used the resulting image for segmentation and fluorescence quantification.
2. Segment nuclei and filter them to include only single round nuclei.
3. Measure the total propidium iodide fluorescence intensity of each nucleus with background subtraction, in which the background fluorescence is the median propidium iodide fluorescence intensity of the cytoplasm in the cluster that the focal nucleus is in. The resulting nuclear propidium iodide intensity scales linearly with the DNA content.

Analyze the image analysis results in R. 

1. For each sample, remove tiny segmented objects with areas two median absolute deviations below median (which are nucleus segmentation artefacts).
2. Manually remove FOVs with outlier distributions of nuclear propidium iodide intensity. The distribution of nuclear propidium iodide intensity in a clonal strain contains two peaks that correspond to G1-phase and G2-phase cells.
3. Estimate the DNA content of each nucleus by dividing its propidium iodide intensity with the propidium iodide intensity of a haploid genome, which was estimated by averaging across the two ploidy control strains, that is, mean (G1 peak intensity of diploid control strain/2, G1 peak intensity of tetraploid control strain/4).
4. Estimate the DNA content of a clonal strain as the DNA content of its G1 peak.



## Yeast Live-cell Imaging in Agarose

OD between 0.7-1

0.4% low melting agarose in SC complete media

拍照和分析的具体参数修改



## Mating of *a* and *&alpha;* Yeast Strains

1. Inoculate *a* and *&alpha;* strains separately into liquid medium and grow overnight at 30°C until cultures reach saturation.

2. Mix the two cultures at a 1:1 ratio.

3. Spot 10 &mu;L of the mixture onto a solid agar plate.

4. Allow the spot to air-dry for ~10 min, then incubate the plate inverted at 30°C for ~24 h.

5. Following incubation, pick a small portion from the mating spot and streak onto selective medium with Nat and Hyg (containing both antibiotics) to isolate single colonies.

   `Yeast mate more efficiently on solid medium~`



## Other Experimental Methods

[Bateria plasmid transformation](https://2023.igem.wiki/fudan/experiments/#plasmid-transformation) was conducted as described on our 2023 page.

[Plasmid miniprep](https://2022.igem.wiki/fudan/experiments#plasmid-miniprep) was conducted as described on our 2022 page.

[Bacteria colony PCR](https://2022.igem.wiki/fudan/experiments#colony-pcr) was conducted as described previously.

[Agarose gel electrophoresis](https://2022.igem.wiki/fudan/experiments#agarose-gel-electrophoresis) was conducted as described previously.


## References

[1] Tong, K., Datta, S., Cheng, V., Haas, D. J., Gourisetti, S., Yopp, H. L., Day, T. C., Lac, D. T., Khalil, A. S., Conlin, P. L., Bozdag, G. O., & Ratcliff, W. C. (2025). Genome duplication in a long-term multicellularity evolution experiment. *Nature*, *639*(8055), 691–699. https://doi.org/10.1038/s41586-025-08689-6

[2] Lee, M. E., DeLoache, W. C., Cervantes, B., & Dueber, J. E. (2015). A Highly Characterized Yeast Toolkit for Modular, Multipart Assembly. *ACS synthetic biology*, *4*(9), 975–986. https://doi.org/10.1021/sb500366v

[3] Shaw, W. M., Khalil, A. S., & Ellis, T. (2023). A Multiplex MoClo Toolkit for Extensive and Flexible Engineering of *Saccharomyces cerevisiae*. *ACS synthetic biology*, *12*(11), 3393–3405. https://doi.org/10.1021/acssynbio.3c00423

[4] Sorida, M., & Bonasio, R. (2023). An efficient cloning method to expand vector and restriction site compatibility of Golden Gate Assembly. *Cell reports methods*, *3*(8), 100564. https://doi.org/10.1016/j.crmeth.2023.100564

[5] Lõoke, M., Kristjuhan, K., & Kristjuhan, A. (2011). Extraction of genomic DNA from yeasts for PCR-based applications. *BioTechniques*, *50*(5), 325–328. https://doi.org/10.2144/000113672
