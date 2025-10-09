---
title: Experiments
authors: 
  - name: Yixuan Lu
    url: /fudan/team/#Yixuan
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/lyx-a.webp
layout: igem
heroImage: https://static.igem.wiki/teams/5643/header/exp.webp
description: On this page, we describe detailed protocols for Golden Gate assembly, yeast transformation and genome integration validation, as well as yeast imaging and flow cytometry analysis. 
---

## Golden Gate Assembly

As described in Shaw et al. (2023)[^1], briefly: 

### Assembly Reaction

1. Normalize the concentration of all DNA parts prior to assembly. Use a [Nanodrop](https://www.thermofisher.com/order/catalog/product/hk/en/ND-2000) for quantification.

> Accurate DNA quantification and normalization are crucial for high assembly efficiency.

- **Inserts:** Dilute to a final concentration of 50 fmol/&mu;L.
- **Plasmid Backbones:** Dilute to a final concentration of 25 fmol/&mu;L.

2. Prepare the Golden Gate reaction mixtures in PCR tube: 

> Assemble reactions on ice to prevent premature enzyme activity, and put the enzymes back immediately after use!

> For multiple reactions, create a master mix. The total number of reactions can be overcounted by 0.2 allowing for the inaccuracy of pipettes.

   |       |                      Reagent                       |        Volume (&mu;L)         |   Final Concentration/Amount    |
   | :---: | :------------------------------------------------: | :---------------------------: | :-----------------------------: |
   | **1** |      Each DNA Insert/Plasmid (50 fmol/&mu;L)       |              0.5              |             25 fmol             |
   | **2** |          Plasmid Backbone (25 fmol/&mu;L)          |              0.5              |            12.5 fmol            |
   | **3** |              10x T4 DNA Ligase Buffer              |               1               |               1x                |
   | **4** |            T4 DNA Ligase (400 U/&mu;L)             |              0.5              |              200 U              |
   | **5** | Restriction Enzyme ([BsaI](https://www.neb.com/en/products/r3733-bsai-hf-v2) or [BsmBI](https://www.neb.com/en/products/r0739-bsmbi-v2) or BpiI) |              0.5              | 10 U ([BsaI](https://www.neb.com/en/products/r3733-bsai-hf-v2)) or 5 U ([BsmBI](https://www.neb.com/en/products/r0739-bsmbi-v2)/[BpiI](https://www.thermofisher.com/order/catalog/product/FD1014)) |
   | **6** |                Nuclease-Free Water                 | to a final volume of 10 &mu;L |                -                |
   |       |                     **Total**                      |            **10**             |                                 |

> Do not confuse [BpiI](https://www.thermofisher.com/order/catalog/product/FD1014) (for marker assembly with high efficiency) with [BsaI](https://www.neb.com/en/products/r3733-bsai-hf-v2) or [BsmBI](https://www.neb.com/en/products/r0739-bsmbi-v2), which is an isoschizomer of BbsI.

3. Place the reaction tubes in a thermocycler and run the following program: 

   - For level 1 assembly: 
     a. **Cycling (25 cycles):**

     - **Digestion:** For reactions with more than 6 inserts, increase digestion time to 5 min.
       - For [BsaI](https://www.neb.com/en/products/r3733-bsai-hf-v2): 37°C for 2 min.
       - For [BsmBI](https://www.neb.com/en/products/r0739-bsmbi-v2): 42°C for 2 min.
     - **Ligation:** 16°C for 5 min.

     b. **Final Digestion:** 55°C for 10 min.
     c. **Heat Inactivation:** 80°C for 10 min.
     d. **Hold:** 16°C

   - For marker assembly: 
     a. **Cycling (10 cycles):**

     - **Digestion:** 37°C for 2 min.
     - **Ligation:** 16°C for 5 min.

     b. **Final Digestion:** 55°C for 10 min.
     c. **Heat Inactivation:** 80°C for 10 min.
     d. **Hold:** 16°C
   
> For inserts containing internal [BsmBI](https://www.neb.com/en/products/r0739-bsmbi-v2) and [BsaI](https://www.neb.com/en/products/r3733-bsai-hf-v2) sites, we added a dedicated 30-minute incubation with additional T4 DNA Ligase at 16°C after the thermal cycles to maximize the repair and ligation of all ends.

### Bacteria Transformation and Plating

1.  Thaw [Turbo](https://www.neb.com/en/products/c2984-neb-turbo-competent-e-coli-high-efficiency) competent *E. coli* on ice, within 5 min aliquot 30 &mu;L for each assembly reaction.
2.  Add 2 &mu;L Golden Gate reaction mixture to the cells. Gently mix.
3.  Incubate on ice for 25 min.
4.  Heat shock the bacteria at 42°C for 45 s.
5.  Immediately return the tube to ice for another 2 min.
6.  Add 500 &mu;L of SOC medium (pre-warmed to 37°C).
7.  Incubate at 37°C with rotating for 1 h.
8.  Plate 100-200 &mu;L of the culture onto an LB agar plate containing the appropriate antibiotic.
9.  Incubate plates at 37°C for 8-12 hours before picking the colony.

> Ensure the antibiotic on the plate matches the resistance marker of the destination plasmid backbone (kanamycin or ampicillin), not chloramphenicol.

### Colony Screening

For level 0 and level 1 Golden Gate assembly: 

- Screen bacterial colonies for the loss of the fluorescent dropout cassette (level 0, loss GFP; level 1, loss RFP) using a blue light transilluminator.
- Pick 2-4 non-fluorescent (correctly assembled) colonies for each construct.

For marker assembly: 
- Pick a random colony from the plate.

Then, 

1.  Inoculate colonies into liquid LB medium with the appropriate antibiotic and grow for 6-10 hours.
2.  Perform a [plasmid miniprep](#other-experimental-methods) to isolate the assembled plasmid DNA.
3.  Validate the plasmid structure using [NotI](https://www.neb.com/en/products/r3189-noti-hf) and [agarose gel electrophoresis](#other-experimental-methods).
4.  Analyze the fragment sizes to confirm the correct assembly. 

### Expanded Golden Gate

Inspired by Sorida et al. (2023)[^2], briefly: 

1. Prepare the digestion mixtures in PCR tube: 

   |       |           Reagent           |    Volume (&mu;L)    |
   | :---: | :-------------------------: | :------------------: |
   | **1** | Restriction Enzyme 1 (XhoI) |         0.2          |
   | **2** | Restriction Enzyme 2 (XbaI) |         0.2          |
   | **3** |  10x DNA Ligase Buffer      |          1           |
   | **4** |           Vector            |      500 ng       |
   | **5** |     Nuclease-Free Water     | Bring up to 10 &mu;L |
   |       |          **Total**          |        **10**        |

2. Incubate the reaction at 37°C for 4 h, and then 65°C for 20 min to heat inactivate the enzymes.

3. Take 1 &mu;L digested vector, add 0.25 &mu;L each of new 5' and 3' HA, 0.25 &mu;L [BsmBI](https://www.neb.com/en/products/r0739-bsmbi-v2), and 0.25 &mu;L T4 DNA Ligase to a total reaction volume of 2 &mu;L, and then conduct 37°C - 16°C 2-min cycling of Golden Gate assembly for 25 cycles. Preform [bateria transformation](https://2023.igem.wiki/fudan/experiments/#plasmid-transformation) as described above.

4. Once correct bacteria clones are obtained, use [BpiI](https://www.thermofisher.com/order/catalog/product/FD1014) to [introduce the selection marker into the vector](#golden-gate-assembly).


## Site-Directed Mutagenesis PCR

As described in Liu et al. (2008)[^3], briefly: 

### Primer Design

Primers were designed as in Liu et al. (2008) Figure 2[^3]. The non-overlapping sequences are larger (significantly larger than suggested in [^4])than the complementary sequences to make the melting temperature of non-overlapping sequences (Tm no, 47.5-60.2) 5 to 10°C higher than the melting temperature of primer-primer complementary sequences (41.1-50.3 Tm pp < Tm no).

### PCR Reaction Setup

1. Prepare the PCR master mix in a 0.2-mL microcentrifuge tube on ice: 

   |       |             Reagent              | Final Concentration/Amount |
   | :---: | :------------------------------: | :------------------------: |
   | **1** | Template DNA / Bacteria Solution |      1-5 ng / 1 &mu;L      |
   | **2** |             F-primer             |          1 &mu;M           |
   | **3** |             R-primer             |          1 &mu;M           |
   | **4** |               dNTP               |         0.5 &mu;M          |
   | **5** |              Phanta              |         0.2 &mu;L          |
   | **6** |        10x Phanta Buffer         |         12.5 &mu;L         |
   | **7** |        ddH<sub>2</sub>O         |    Bring up to 25 &mu;L    |
   |       |            **Total**             |           **25**           |

2. Place the reaction tubes in a thermocycler and run the following program: 

   a. **Initial Denaturation:**
   - For template DNA: 95°C for 30 s.
   - For bacteria solution:  95°C for 3 min.

   b. **Amplification (12 cycles):**

   -   **Denaturation:** 95°C for 15 s.
   -   **Annealing:** T<sub>m no</sub> - 5°C for 15 s.
   -   **Extension:** 72°C for appropriate time (according to the length of the template constructs, for Phanta DNA polymerase is 30-60 s/kb)

   c. **Final Annealing:** T<sub>m pp</sub> - 5°C for 15 s.
   d. **Final Extension:** 72°C for 10 min.

3. While verifying 10&mu;L PCR products by [agarose gel electrophoresis](https://2022.igem.wiki/fudan/experiments#agarose-gel-electrophoresis); treat the remaining 15&mu;L PCR products with 0.5 &mu;L [DpnI](https://www.neb.com/en/products/r0176-dpni) at 37°C for > 4 h. Once verified and DpnI digestion completed, the PCR products were [transformed](#other-experimental-methods) into *E. coli*.


## Yeast Transformation

As described in Shaw et al. (2023)[^1]. Briefly: 

### One-day Competent Yeast Preparation

1. Pick colony from plate into 3 mL growth medium for overnight growth at 30°C, 250 rpm.
2. Do a 1:20 dilution of saturated overnight culture into fresh growth medium (YPD) and incubate at 30°C, 250 rpm.

   1 mL culture = 1 transformation

3. Grow up yeast to OD600 ~0.7 (about 4 h).
4. Pellet cells at 3000 *g* for 3 min, room temperature; use large centrifuge if needed.
5. Wash with 0.5x volume 0.2 M LiOAc and pellet cells at 3000 *g* for 3 min in large centrifuge, room temperature.
6. Resuspend cells in 0.2 M LiOAc, 100 &mu;L per transformation 
7. Aliquot 100 &mu;L of cells into individual 1.5-mL tubes and pellet at 8000 rpm for 1 min at room temperature on small tabletop centrifuge and remove supernatant.

### DNA Digestion

This step linearizes plasmid DNA prior to yeast transformation to increase integration efficiency.

> This step can be done during the period when the yeast grows to OD600 ～0.7.

1. Set up the digestion reaction in a sterile microcentrifuge tube. For a 20 &mu;L reaction, combine the following:

   |       |       Reagent       |        Volume (&mu;L)         |
   | :---: | :-----------------: | :---------------------------: |
   | **1** |       [NotI](https://www.neb.com/en/products/r3189-noti-hf)       |              0.1              |
   | **2** | 10x CutSmart Buffer |               2               |
   | **3** |  ddH<sub>2</sub>O  |     Bring up to 20 &mu;L      |
   | **4** |         DNA         | Variable Amount (600-1000 ng) |
   |       |      **Total**      |            **20**             |

2. Incubate the reaction for at least 4 h at 37°C. Run 4 &mu;L digestion products if needed by [agarose gel electrophoresis](https://2022.igem.wiki/fudan/experiments#agarose-gel-electrophoresis).

### PEG/Lithium Acetate Preparation

1. Ahead of [heat shock](#heat-shock), prepare the following reagents:

   - Fresh prepared PEG-LiOAc mixture

     |       | Filter Steriled Reagent | Volume per transformation (&mu;L) |
     | :---: | :----------------: | :-------------------------------: |
     | **1** | PEG-4000 (50% w/v) |                260                |
     | **2** |   LiOAc (1.0 M)    |                36                 |
     |       |     **Total**      |              **296**              |

   - DNA cocktail

     |       |        Reagent         | Volume per transformation (&mu;L) |
     | :---: | :--------------------: | :-------------------------------: |
     | **1** | Boiled [ssDNA](https://www.pombevolution.eu/labwiki/index.php/SsDNA) (2 mg/mL) |                50                 |
     | **2** | DNA + ddH<sub>2</sub>O |                14                 |
     |       |       **Total**        |              **64**               |

### Heat Shock

1. Resuspend [cell pellet](#one-day-competent-yeast-preparation) with 64 &mu;L of DNA cocktail.
2. Mix cell-DNA suspension with 296 &mu;L of PEG-LiOAc mixture and incubate at room temperature for 30 min.
3. Transfer tubes to 42°C water bath for 15 min, or longer if needed (up to 45 min).

> Immediately place the tubes on ice to cool after heat shock!

4. Centrifuge 8000 rpm on small bench top centrifuge for 30 s and remove supernatant.
5. Depending on the selection marker:

> Be careful not to mix up the selection markers!

   - Auxotrophic selection marker: Add 0.5 mL H<sub>2</sub>O and leave for 10 mins at room temperature to resuspend.
   - Antibiotic selection marker: Recover in 0.5 mL YPD for 2-3 h at 30°C rotating.

6. Plate desired volume on plates.
7. Incubate plates for 2-3 days upside down at 30°C.

### Yeast Frozen Competent Cell Preparation

For the convenience of the transformation experiments, yeast competent cells can be prepared ahead and stored for a long time.

1. Pick colony from plate into 5 mL growth medium for overnight growth at 30°C, 250 rpm.
2. Do a 1:100 dilution of saturated overnight culture into fresh growth medium and incubate at 30°C, 250 rpm.

   2 mL culture = 1 competent cell aliquot = 1 transformation

3. Grow up yeast to OD600 ~0.75.
4. Pellet at 4000 *g* for 5 min in large centrifuge.
5. Wash with 0.5x volume H<sub>2</sub>O.
6. Pellet at 4000 *g* for 5 min in large centrifuge.
7. Resuspend in 0.025x volume frozen competent cell solution (filter sterilize):

   |       |      Reagent      | Volume (mL) |
   | :---: | :---------------: | :---------: |
   | **1** |   Glycerol (5%)   |     2.5     |
   | **2** |    DMSO (10%)     |      5      |
   | **3** | ddH<sub>2</sub>O |    42.5     |
   |       |     **Total**     |   **50**    |

8. Aliquot 50 &mu;L of cell suspension into 1.5 mL tubes and put into -80°C freezer for long term storage.

On the day of transformation: 

1. Thaw frozen competent cells on ice, ~5 min.
2. Centrifuge cells at 8000 rpm on small bench top centrifuge for 30 s and remove supernatant.
3. Conduct [heat shock](#heat-shock) for digested DNA.


## Yeast Colony PCR

As described in Shaw et al. (2023)[^1], briefly: 

1. Pick a single colony from solid medium and resuspend it in 50 &mu;L of sterile water; or use 1 &mu;L of liquid culture.
2. Combine the following components in a PCR tube:

   |       |               Reagent                | Volume (&mu;L) |
   | :---: | :----------------------------------: | :---------: |
   | **1** |           Yeast Suspension           |      1      |
   | **2** |        Forward Primer (10 &mu;M)        |     0.5     |
   | **3** |        Reverse Primer (10 &mu;M)        |     0.5     |
   | **4** |           ddH<sub>2</sub>O           |      3      |
   | **5** | 2x [Phire](https://www.thermofisher.com/order/catalog/product/F160S) Plant Direct PCR Master Mix |      5      |
   |       |              **Total**               |   **10**    |

3. Put tubes into a thermocycler and run the following program:

   a. **Initial Denaturation:** 98°C for 5 min.
   b. **Cycling (30 cycles):**

   -   **Denaturation:** 98°C for 5 s.
   -   **Annealing:** 57°C for 5 s.
   -   **Extension:** 72°C for 30 s.

   c. **Final Extension:** 72°C for 30 s.

### Quick Yeast Genome DNA Purification

If the routine genotyping above fails, the following protocol was used to quickly extract good quality genome for PCR fragments < 3.5kb with DNA polyermase[^5].

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

As described in Tong et al. (2025)[^6], briefly: 

1. Grow the diploid and tetraploid yeast with *ACE2* deletion in 3 mL of YPD media with and without G418 at 30°C with shaking at 250 rpm for 24 h.
2. Transfer 1 mL of the culture into a 1.5-mL microcentrifuge tube.
3. Let clusters settle on the bench for 3 min.
4. Transfer the bottom 50 &mu;L into 3 mL of fresh YPD media for the next day of growth. 
5. Archive a glycerol (20%) stock for each population every 7 days. 

### Sedimentation Rate Measurement

1. Grow the diploid and tetraploid yeast with *ACE2* deletion of certain generation until OD600 > 1.
2. After sufficient pipetting, take 1 mL fresh yeast culture to measure its OD600.
3. Record the change of OD600 value with a camera until it declines under 0.5, and then calculate the sedimentation rate.


## Yeast Growth Curves

1. Grow yeast cultures in YPD at 30°C with 220 rpm shaking until OD600 > 1.
2. Normalized OD600 reading usng fresh YPD among cultures.
3. Dilute the cultures at 1:20 into 4 mL of fresh YPD and incubate at 30°C with 220 rpm shaking.
4. Every 1 h, 200&mu;L of the cultures was sampled, and mixed with 800&mu;L of ddH<sub>2</sub>O to achieve a 5-fold dilution.
5. Measure OD600 of the diluted samples and draw the growth curve.


## Flow Cytometry of Single Cell Yeast

Flow cytometry is performed to detect the fluorescence of [TU recorder](/design/#recorder) transformed into BY4741 or BY4742 (unicellular yeast). We did not use chitinase to treat multicellular yeast for this analysis.

1. Pick strains into 3 mL synthetic complete (SC) medium and grow them at 30°C with 250 rpm shaking overnight.
2. Take 2 mL cultures into a 2-mL tube and pellet the cells by spinning at 8,000 *g* for 1 min.

   - For cells whose flourescence from smURFP or miRFP670-2, take 1 mL of fresh yeast culture (OD600 > 1), centrifuge the cells at 8,000 *g* for 1 min and resuspend the pellet in 100 &mu;L SC medium, and then add 10 &mu;L of 1 mM PCB shaking for 1 h in the dark[^7].

> We greatly appreciate Dr. Chuanwei Yang and Dr. Lin Li for providing us with ready to use phycocyanobilin (PCB) 1 mM solution in our initial test, and Dr. Hongtai Liu for sending PCB powder on the same day which is enough for the following year!

3. Wash the pellet with PBS and resuspend the cell in 1 mL PBS.
4. Measure cell fluorescence using CytoFlex LX according to the following settings: FSC 300 V, SSC 350 V, gating for singlets using FSC-A vs FSC-H. Record 4 channels of fluorescence (Y585-A, B525-A, R660-A, V450-A) at the same time.

> For yeast, set FSC-A vs FSC-H with logarithmic axes (Log Axis), and adjust the axis scale as needed so that the cell population is centered in the plot.

> Use a parallelogram gate in the plot to enclose the region where FSC-A and FSC-H are approximately proportional (this region represents single cells).


## EMS Mutagenesis

As described in Hodgins-Davis et al. (2019)[^8], briefly: 

1. Wash a 2 mL aliquot of saturated culture (~10<sup>7</sup> cells/mL) twice in 5 mL of H<sub>2</sub>O, and then resuspend in 2 mL of sodium phosphate buffer (0.1 M, pH = 7).
2. Divide the culture into two 1 mL aliquots in 1.5-mL microcentrifuge tubes. 
3. Add 10 &mu;L EMS (99%) to one sample (EMS treatment), but not the other (sham treatment), and seal both samples with parafilm. 
4. Incubate both samples at 30°C on a rotor for mixing for 70 min.
5. Treat both samples with 1 mL of neutralizing sodium thiosulfate (5% in ddH<sub>2</sub>O).
6. Pellet and resuspend cells in 1 mL of sodium thiosulfate (5%), twice in 1 mL of H<sub>2</sub>O, and finally suspend cells in 1 mL of YPD.
7. 1/8 of either EMS treated or sham samples were seeded into 3 mL YPD, culture at 30°C for 10 h before [flow cytometry](#flow-cytometry-of-single-cell-yeast).


## Grape Yeast Cluster Size Measurement

As described in Tong et al. (2025)[^6], briefly: 

### Strain Revival

1. Revive strains from glycerol stocks by growing them on YPD plates at 30°C for 2 days.
2. Inoculate each strain into 5 mL of YPD media. Grow at 30°C with 220 rpm shaking for 3 days, performing daily settling selection before transferring to fresh media.
3. On the last day, after settling selection and transfer, grow the cultures for 24 hours. Sample them at 4 hours (exponential phase) and 24 hours (stationary phase) for measuring cluster size.

### Sample Preparation for Imaging

1. Gently shake each culture by hand. In a 24-well plate, add an appropriate volume of the culture (1–250 &mu;L) to H<sub>2</sub>O containing 10 &mu;L of 16% (w/v) formaldehyde, making a final volume of 510 &mu;L per well. 
2. For macroscopic strains, use wide-bore 1-mL tips and sample twice from each culture into two separate wells.
3. Gently shake the 24-well plate to evenly spread out the clusters and allow 5–10 minutes for clusters to settle.

### Image Acquisition and Analysis

Use a microscope to scan the entire well. Take and stitch 5 x 8 bright-field, shading-corrected images with 10% overlap at x4 magnification.

Use [ImageJ](https://imagej.net/ij/) for a semi-automated image analysis:

1. Segment clusters using auto local thresholding and split touching clusters using seed-based watershed.
2. Perform manual correction as needed.
3. Measure the cross-sectional area of each cluster.
4. Remove segmented objects with an area below 40 &mu;m^2.
5. Using R, convert cluster areas to cluster volumes and radiuses, treating clusters as perfect spheres.
6. For each strain, calculate its biomass-weighted mean cluster radius by first calculating its mean cluster volume weighted by cluster volume, and then converting it to a radius.


## Imaging-based Ploidy Measurement

As described in Tong et al. (2025)[^6], briefly: 

In every experiment, two control strains with known ploidy, namely, the engineered grande diploid and tetraploid grape yeast, also went through the same procedure of sample preparation and imaging. 

### Propidium Iodide (PI) Staining

1. Grow each strain of interest in YPD media to mid-log phase.
2. Transfer 250 &mu;L of the culture into a 1.5-mL microcentrifuge tube. 
3. Pellet the clusters by spinning at 5,000 *g* for 1 min and wash them with 1 mL of H<sub>2</sub>O.
4. Fix and permeabilize the cells in 1 mL of 70% ethanol at room temperature for 2 h with end-to-end rotation on a mini-rotator at a speed of 40 rpm. 
5. Centrifugat for ethanol removal and wash the pellet with 1 mL of 50 mM sodium citrate twice. 
6. Resuspend the clusters in 200 &mu;L of 50 mM sodium citrate containing 0.5 mg/ml RNase A and incubate them in a 37°C heat block for 2 h with gentle inversion every 30 min (as clusters settle over time). 
7. After RNA digestion, add 5  &mu;L of 1 mg /mL propidium iodide and incubate the mixture in a 30°C incubator in dark overnight with rotation on a mini-rotator at  at a speed of 10 rpm to keep clusters from settling.
8. Propidium iodide-stained clusters can be stored at 4°C for no longer than 1 week before imaging.

### PI Fluorescent Imaging

1. Crush 5 &mu;L of propidium iodide-stained clusters into a single layer of cells between a microscope slide and a coverslip, seal the coverslip with nail polish.
2. For each sample, take 14-bit images of approximately 5 FOVs at x100 magnification. 
3. For each FOV (fields of view), set the focus by manually moving to a *z*-plane in which cells look grey (rather than brighter or darker) in the brightfield channel; do not adjust the focus using red fluoresent channel. 
4. Image the flattened clusters in the red fluorescent channel (excitation laser 561 nm in our case) at the focal plane as well as one *z*-plane 0.3 &mu;m above and below the focal plane (three *z*-planes in total) to capture the propidium iodide-stained nuclei, and then imaged in the brightfield channel at the focal plane. 

> Set the exposure and gain of the fluorescent channel such that the brightest pixels in the tetraploid control strain are approximately 80% of the maximal allowed pixel value while minimizing photobleaching and noise.

### Image Analysis

Images were quantitatively analyzed by [ImageJ](https://imagej.net/ij/).

1. Perform maximum intensity projection of the three *z*-planes taken in the fluorescent channel and used the resulting image for segmentation and fluorescence quantification.
2. Segment nuclei and filter them to include only single round nuclei.
3. Measure the total propidium iodide fluorescence intensity of each nucleus with background subtraction, in which the background fluorescence is the median propidium iodide fluorescence intensity of the cytoplasm in the cluster that the focal nucleus is in. The resulting nuclear propidium iodide intensity scales linearly with the DNA content.

Continue the analysis in R. 

1. For each sample, remove tiny segmented objects with areas two median absolute deviations below median (which are nucleus segmentation artefacts).
2. Manually remove FOVs with outlier distributions of nuclear propidium iodide intensity. The distribution of nuclear propidium iodide intensity in a clonal strain contains two peaks that correspond to G1-phase and G2-phase cells.
3. Estimate the DNA content of each nucleus by dividing its propidium iodide intensity with the propidium iodide intensity of a haploid genome, which was estimated by averaging across the two ploidy control strains, that is, mean (G1 peak intensity of diploid control strain/2, G1 peak intensity of tetraploid control strain/4).
4. Estimate the DNA content of a clonal strain as the DNA content of its G1 peak.


## Chitin staining

We stained cells with [calcofluor white](https://www.sigmaaldrich.com/HK/en/product/sial/18909) as described in Tong et al. (2025)[^6], briefly: 

1. Sample 150&mu;L from the cell culture from the ancestor.
2. Remove the supernatant through an iterated process of centrifugation and pipetting medium removal. 
3. Build 15&mu;L of 1 mg/mL calcofluor solution into 500&mu;L 1x phosphate-buffered saline solution (PBS) and mixed with the yeast pellet.
4. Incubate the sample in the dark at room temperature for 25 min.
5. Remove the calcofluor media by centrifugation and pipetting. 
6. Add 200 &mu;L 1x PBS on top of the pellet. 5&mu;L of this cell suspension was pipetted onto a clean glass slide and covered with a coverslip for microscopy analysis.


## Yeast Live-cell Imaging in Agarose

1. Grow yeast overnight in 3 mL of YPD at 30°C with 220 rpm shaking.
2. Dilute the overnight cultures 1:20 into fresh SC media and incubate at 30°C with 220 rpm shaking until OD600 between 0.7-1.
3. Prepare 0.4% low melting agarose in SC media, and keep at 42°C.
4. Mix appropriate amout of yeast with melted agarose, vortex, and drop a total of ∼500&mu;L onto a glass-bottom dish allow it to solidify. Cover the agarose pad with SC media if needed.
6. Observe cells immediately using a fluorescence microscope equipped with appropriate filters. Maintain stage temperature at 30°C.


## Mating of *a* and &alpha; Yeast Strains

As described in Tong et al. (2025)[^6], briefly: 

1. Inoculate *a* and *&alpha;* strains separately into liquid medium and grow overnight at 30°C until cultures reach saturation.
2. Mix the two cultures at a 1:1 ratio.
3. Spot 10 &mu;L of the mixture onto a solid agar plate.

> Yeasts mate more efficiently on solid medium.

4. Allow the spot to air-dry for ~10 min, then incubate the plate inverted at 30°C for ~24 h.
5. Following incubation, pick a small portion from the mating spot and streak onto selective medium (containing both antibiotics, Nat and Hyg in our case) to isolate single colonies.


## Other Experimental Methods

[Bateria transformation](https://2023.igem.wiki/fudan/experiments/#plasmid-transformation) was conducted as described on our 2023 page.

[Plasmid miniprep](https://2022.igem.wiki/fudan/experiments#plasmid-miniprep) was conducted as described on our 2022 page.

[Bacteria colony PCR](https://2022.igem.wiki/fudan/experiments#colony-pcr) was conducted as described on our 2022 page.

[Agarose gel electrophoresis](https://2022.igem.wiki/fudan/experiments#agarose-gel-electrophoresis) was conducted as described on our 2022 page.


## References

[^1]: Shaw, W. M., Khalil, A. S., & Ellis, T. (2023). A Multiplex MoClo Toolkit for Extensive and Flexible Engineering of *Saccharomyces cerevisiae*. *ACS synthetic biology*, *12*(11), 3393–3405. DOI: 10.1021/acssynbio.3c00423
[^2]: Sorida, M., & Bonasio, R. (2023). An efficient cloning method to expand vector and restriction site compatibility of Golden Gate Assembly. *Cell reports methods*, *3*(8), 100564. DOI: 10.1016/j.crmeth.2023.100564
[^3]: Liu, H., & Naismith, J. H. (2008). An efficient one-step site-directed deletion, insertion, single and multiple-site plasmid mutagenesis protocol. *BMC biotechnology*, *8*, 91. DOI: 10.1186/1472-6750-8-91
[^4]: Zheng, L., Baumann, U., & Reymond, J. L. (2004). An efficient one-step site-directed and site-saturation mutagenesis protocol. *Nucleic acids research*, *32*(14), e115. DOI: 10.1093/nar/gnh110
[^5]: Lõoke, M., Kristjuhan, K., & Kristjuhan, A. (2011). Extraction of genomic DNA from yeasts for PCR-based applications. *BioTechniques*, *50*(5), 325–328. DOI: 10.2144/000113672
[^6]: Tong, K., Datta, S., Cheng, V., Haas, D. J., Gourisetti, S., Yopp, H. L., Day, T. C., Lac, D. T., Khalil, A. S., Conlin, P. L., Bozdag, G. O., & Ratcliff, W. C. (2025). Genome duplication in a long-term multicellularity evolution experiment. *Nature*, *639*(8055), 691–699. DOI: 10.1038/s41586-025-08689-6
[^7]: Sakai, K., Kondo, Y., Fujioka, H., Kamiya, M., Aoki, K., & Goto, Y. (2021). Near-infrared imaging in fission yeast using a genetically encoded phycocyanobilin biosynthesis system. *Journal of cell science*, *134*(24), jcs259315. DOI: 10.1242/jcs.259315
[^8]: Hodgins-Davis, A., Duveau, F., Walker, E. A., & Wittkopp, P. J. (2019). Empirical measures of mutational effects define neutral models of regulatory evolution in *Saccharomyces cerevisiae*. *Proceedings of the National Academy of Sciences of the United States of America*, *116*(42), 21085–21093. DOI: 10.1073/pnas.1902823116
