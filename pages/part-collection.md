---
title: Part Collection
authors:
  - name: Peining Wu
    url: /team/#wu-peining
    avatar: （头像，先不填）
layout: igem （勿动）
heroImage: （拍摄并且选取页面图像，作为顶部展示）
description: On this page, we
---

## Part Collection

Based on our team’s project **DR.sTraTeGY (Drug Resistance mutation Tracking Technology based on Grape Yeast)**, we designed three collections: Grape Yeast, the optimal promoter–fluorescent protein combination screening collection, and the homologous arms integration collection for *Saccharomyces cerevisiae*.

### Collection 1: Grape-Yeast

The construction of Grape Yeast is the foundational engineering of our project. To create this chassis, we knocked out the transcription factor gene **ACE2**, which is essential for septum degradation during yeast cell division. The resulting strain fails to release daughter cells after cytokinesis, instead forming multicellular clusters that resemble grape bunches. And its morphology and characteristics closely mimic those of pathogenic fungi. To expand the functionality of the strain, we introduced the human **δ-opioid receptor **- **HsDOR** to the **ACE2** deletion locus. As human-derived HsDOR cannot transduce signals inside yeast cells upon ligand binding, we introduced **Modified GAP1** (BBa_254K9906) downstream of **HsDOR**. This allowed **Modified GAP1** to serve as the intracellular ligand for **HsDOR**, thereby achieving a functional human GPCR-yeast coupling. This modification not only endowed the multicellular yeast chassis with drug-ensing capabilities but also demonstrated the feasibility of transplanting human receptor proteins into this system.

To stimulate the differentiation potential of our multicellular yeast system, we introduced the **IME1** (BBa_250R9OVR) and **BAX** (BBa_K5441013) genes to generate morphological diversity. **IME1**, a key regulator of meiosis, was integrated into the yeast genome via homologous recombination, which resulted in changes to the size and morphology of daughter cells. **BAX**, a regulator of apoptosis, was expressed in the multicellular yeast to accelerate cell death, producing branches of varying sizes and altering the overall morphology of the clusters. To tightly control the expression of these genes, we implemented the Tet-on/off system. In the presence of doxycycline, the system activates the transcription of **IME1** and **BAX** by binding to the pTet2 promoter, thereby precisely regulating their expression.

Pathogenic fungi differ significantly from *Saccharomyces cerevisiae* in their membrane lipid composition. The presence of cholesterol components in the cell membranes of pathogenic fungi, which resemble those of human cells, is a key factor in their invasiveness. Therefore, in addition to morphological engineering, we aimed to modify the membrane structure of Grape Yeast by replacing ergosterol with cholesterol to more closely mimic the cell membranes of clinically relevant pathogenic fungi, such as *Candida albicans*. The products of the **ERG5** and **ERG6** genes are key enzymes in the *S. cerevisiae* ergosterol biosynthesis pathway, responsible for catalyzing the formation of the C-22(23) double bond and the C-24 methyl transfer reaction, respectively. We replaced **ERG5** and **ERG6** with **DrDHCR7** (BBa_25RCU5CB) and **DrDHCR24** (BBa_25FOVO4C), respectively. This redirection of the metabolic pathway enabled the substitution of ergosterol with cholesterol on the Grape Yeast cell membrane surface.

Table 1: Parts for Grape-Yeast 

| Part Number  |        Type        |        Part Name         |
| :----------: | :----------------: | :----------------------: |
| BBa_256S6J1M |       coding       |          HsDOR           |
| BBa_254K9906 |       coding       |      Modified GAP1       |
| BBa_K3944010 |     regulatory     |           rtTA           |
| BBa_252BO17G |      promoter      |          pTet2           |
| BBa_K5470011 |       coding       |           E2A            |
| BBa_K5441013 |       coding       |           BAX            |
| BBa_250R9OVR |       coding       |           IME1           |
| BBa_25RCU5CB |       coding       |         DrDHCR7          |
| BBa_25FOVO4C |       coding       |         DrDHCR24         |
| BBa_25AKJ83S | Translational_Unit |    pREV1-HsDOR-tENO1     |
| BBa_25JOF7TY | Translational_Unit |     pREV1-rtTA-tENO1     |
| BBa_25MTFXKO | Translational_Unit | pTet2-BAX-E2A-mSG-tENO1  |
| BBa_25N811P5 | Translational_Unit | pTet2-IME1-E2A-mSG-tENO1 |
| BBa_25FU0JM9 | Translational_Unit |   pREV1-DrDHCR7-tENO1    |
| BBa_25JA9ZHO | Translational_Unit |   pREV1-DrDHCR24-tENO1   |



### Collection 2:  The Optimal Promoter–Fluorescent Protein Combination Screening

      Fluorescent proteins (EMSfp) can respond to gene mutations induced by the mutagen EMS, resulting in changes in fluorescence intensity at the corresponding wavelengths. To identify the optimal mutation-tracking device for our project, we selected four promoters (**pOST1, pRNR2, pSTM1, pTDH3**), six EMSfps (**EMSfp569, EMSfp499, EMSfp383, EMSfp642, EMSfp399, EMSfp643**), and one fixed terminator (**tENO1**), yielding a total of 24 TU modules. [^1]By comparing fluorescence changes between the EMS-treated group and the control group, we screened out the combination with the most significant variation as the optimal pair, which was then integrated into the 16 chromosomes of yeast via homologous arms.

Table 2: Parts for 24 TU Recorders

| Part Number  |        Type        |        Part Name        |
| :----------: | :----------------: | :---------------------: |
| BBa_25S7HMJ7 | Translational_Unit | pOST1- EMSfp383 - tENO1 |
| BBa_25DWU82I | Translational_Unit | pOST1- EMSfp399 - tENO1 |
| BBa_25L56M2M | Translational_Unit | pOST1- EMSfp499 - tENO1 |
| BBa_251VI6SD | Translational_Unit | pOST1- EMSfp569 - tENO1 |
| BBa_25T5YP8M | Translational_Unit | pOST1- EMSfp642 - tENO1 |
| BBa_25BWBNVL | Translational_Unit | pOST1- EMSfp643 - tENO1 |
| BBa_25FQWVZE | Translational_Unit | pRNR2- EMSfp383 - tENO1 |
| BBa_25P3CYM6 | Translational_Unit | pRNR2- EMSfp399 - tENO1 |
| BBa_250UY7YR | Translational_Unit | pRNR2- EMSfp499 - tENO1 |
| BBa_25GIKETL | Translational_Unit | pRNR2- EMSfp569 - tENO1 |
| BBa_25R85SZ9 | Translational_Unit | pRNR2- EMSfp642 - tENO1 |
| BBa_258547VP | Translational_Unit | pRNR2- EMSfp643 - tENO1 |
| BBa_25T01PTJ | Translational_Unit | pSTM1- EMSfp383 - tENO1 |
| BBa_25R7QESE | Translational_Unit | pSTM1- EMSfp399 - tENO1 |
| BBa_255T0PHY | Translational_Unit | pSTM1- EMSfp499 - tENO1 |
| BBa_259AX3UO | Translational_Unit | pSTM1- EMSfp569 - tENO1 |
| BBa_259Z131H | Translational_Unit | pSTM1- EMSfp642 - tENO1 |
| BBa_25DI5UXV | Translational_Unit | pSTM1- EMSfp643 - tENO1 |
| BBa_25PHHOV9 | Translational_Unit | pTDH3- EMSfp383 - tENO1 |
| BBa_258CH7EU | Translational_Unit | pTDH3- EMSfp399 - tENO1 |
| BBa_25L2MY7F | Translational_Unit | pTDH3- EMSfp499 - tENO1 |
| BBa_25A00YSZ | Translational_Unit | pTDH3- EMSfp569 - tENO1 |
| BBa_257O6RCL | Translational_Unit | pTDH3- EMSfp642 - tENO1 |
| BBa_25RJG3B2 | Translational_Unit | pTDH3- EMSfp643 - tENO1 |


### Collection 3:  **Homologous Arm Integration Collection for Saccharomyces cerevisiae**

In synthetic biology, efficient and predictable genome integration is fundamental for constructing complex biological systems and accelerating the engineering cycle. To address this need, our team developed a robust **Homologous Arm Integration Collection for Saccharomyces cerevisiae**. This collection not only incorporates validated safe integration sites but also extends to novel replacement-based strategies, providing future iGEM teams with a powerful, flexible, and standardized solution.

The core of this collection consists of two parts of homologous arms :

#### **10 Safe Insertion Homologous Arms**

Based on the MoClo toolkit published by Shaw et al. (2023)[^2], we identified and validated ten genomic integration sites (**Int.1–Int.10**). These loci are situated in non-coding regions of the Y55 yeast genome, ensuring that the integration of exogenous genes does not interfere with endogenous expression. This approach minimizes off-target effects and avoids impairing host cell growth. Through homologous recombination, any transcriptional unit (TU) can be stably integrated into these sites. These loci provide a reliable foundation for constructing complex multi-gene circuits while preserving the physiological homeostasis of the host cell.

#### **6 Gene Replacement Homologous Arms**

To provide comprehensive coverage across the yeast genome, we designed a set of homologous arms (**Int.11–Int.16**) for replacing endogenous genes on six different chromosomes of the Y55 strain. This library facilitates the precise deletion or replacement of target genes via homologous recombination. This strategy is particularly valuable in metabolic engineering, where it can be applied to eliminate competing pathways or introduce new functions. By complementing the safe insertion library, this replacement library expands our toolkit's functionality, enabling applications ranging from simple gene addition to complex genome reprogramming.

Table 3: Homologous Arm Integration Collection for Saccharomyces cerevisiae

| Part number  |    Part name     |          Integration Loci          |
| :----------: | :--------------: | :--------------------------------: |
| BBa_250U3B6G |    HR5'\_chr1L    |  Int.1(pMYT75):ChrI:169,422-169,940   |
| BBa_25GQIZIK |    HR3'\_chr1R    |  Int.1(pMYT75):ChrI:169,942-170,478   |
| BBa_253K1B8N |    HR5'\_chr4L    |  Int.2(pMYT76):ChrIV:359,868-360,355  |
| BBa_25P0EZQP |    HR3'\_chr4R    |  Int.2(pMYT76):ChrIV:360,356-360,897  |
| BBa_2552AC6E |    HR5'\_chr6L    |   Int.3(pMYT77):ChrVI:10,278-10,913   |
| BBa_25IULUBT |    HR3'\_chr6R    |   Int.3(pMYT77):ChrVI:10,914-11,424   |
| BBa_25ZYL3GW |    HR5'\_chr7L    |  Int.4(pMYT78):ChrVII:12,472-12,982   |
| BBa_25H1VEJW |    HR3'\_chr7R    |  Int.4(pMYT78):ChrVII:12,983-13,498   |
| BBa_25FYK3TX |    HR5'\_chr8L    | Int.5(pMYT79):ChrVIII:191,015-191,539 |
| BBa_25PJP4LG |    HR3'\_chr8R    | Int.5(pMYT79):ChrVIII:191,540-192,044 |
| BBa_25FUWBU7 |   HR5'\_chr9L     |  Int.6(pMYT80):ChrIX:340,431-340,933  |
| BBa_25PDQZ8Z |    HR3'\_chr9R    |  Int.6(pMYT80):ChrIX:340,935-341,523  |
| BBa_25DIWZUL |   HR5'\_chr11L    |  Int.7(pMYT81):ChrXI:24,931-25,451   |
| BBa_257IAIOG |   HR3'\_chr11R    |   Int.7(pMYT81):ChrXI:25,452-25,963   |
| BBa_25F4SCLY |   HR5'\_chr13L    | Int.8(pMYT82):ChrXIII:408,123-408,657 |
| BBa_25GCY7VQ |   HR3'\_chr13R    | Int.8(pMYT82):ChrXIII:408,658-409,161 |
| BBa_25B7ZBSD |   HR5'\_chr15L    |  Int.9(pMYT83):ChrXV:686,950-687,450  |
| BBa_25Q3F2B3 |   HR3'\_chr15R    |  Int.9(pMYT83):ChrXV:687,451-687,964  |
| BBa_25RRB2RQ |   HR5'\_chr16L    | Int.10(pMYT84):ChrXVI:569,995-570,541 |
| BBa_25U7CTYJ |   HR3'\_chr16R    | Int.10(pMYT84):ChrXVI:570,542-571,023 |
| BBa_25ATGCHY | HR5'\_DPB3_chr2L  |     Int.11:ChrII:735469-735988    |
| BBa_25Y6BTXZ | HR3'\_DPB3_chr2R  |     Int.11:ChrII:736574-737141    |
| BBa_25Q67BOD | HR5'\_FEN2_chr3L  |    Int.12:ChrIII:165465-165991    |
| BBa_25TEB42Q | HR3'\_FEN2_chr3R  |    Int.12:ChrIII:163418-163951    |
| BBa_25TMD7MC | HR5'\_SWI4_chr5L  |     Int.13:ChrV:390514-391024     |
| BBa_255A36IQ | HR3'\_SWI4_chr5R  |     Int.13:ChrV:386704-387244     |
| BBa_25CLCLXX | HR5'\_SOD1_chr10L |     Int.14:ChrX:601161-601690     |
| BBa_2533RATE | HR3'\_SOD1_chr10R |     Int.14:ChrX:600171-600723     |
| BBa_25MIG4EW | HR5'\_ACE2_chr12L |    Int.15:ChrXII:390877-391176    |
| BBa_259HCU8C | HR3'\_ACE2_chr12R |    Int.15:ChrXII:388.058-388563   |
| BBa_25U88LU3 | HR5'\_CAF_chr14L  |     Int.16:ChrXIV:82768-83297     |
| BBa_25O0GI56 | HR3'\_CAF_chr14R  |     Int.16:ChrXIV:84390-84957     |


----

[^1]: Hodgins-Davis, Andrea et al. “Empirical measures of mutational effects define neutral models of regulatory evolution in *Saccharomyces cerevisiae*.” *Proceedings of the National Academy of Sciences of the United States of America* vol. 116,42 (2019): 21085-21093. doi:10.1073/pnas.1902823116
[^2]:Shaw, William M et al. “A Multiplex MoClo Toolkit for Extensive and Flexible Engineering of *Saccharomyces cerevisiae*.” *ACS synthetic biology* vol. 12,11 (2023): 3393-3405. doi:10.1021/acssynbio.3c00423
