---
title: Part Collection
authors:
  - name: Peining Wu
    url: /fudan/team/#Peining
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/wpn-a.webp
layout: igem
heroImage: https://static.igem.wiki/teams/5643/img/screenshot-2025-08-06-at-21-23-43.webp
description: On this page, we describe 3 collections built around Grape Yeast, foundamentally advaced the power of <i>Saccharomyces cerevisiae</i>.
---

Based on our team’s project **DR.sTraTeGY (Drug Resistance mutation Tracking Technology based on Grape Yeast)**, we designed three collections: Grape Yeast, the optimal promoter–fluorescent protein combination screening collection, and the homologous arms integration collection for *Saccharomyces cerevisiae*.


### Collection 1: [Grape Yeast](https://registry.igem.org/collections/5a15daa1-9c25-4fd7-9c31-aa4667c13141)

The construction of Grape Yeast is the foundational engineering of our project. To create this chassis, we knocked out the transcription factor gene ***ACE2***, which is essential for septum degradation during yeast cell division. The resulting strain fails to release daughter cells after cytokinesis, instead forming multicellular clusters that resemble grape bunches. And its morphology and characteristics closely mimic those of pathogenic fungi. To expand the functionality of the strain, we introduced the human **δ-opioid receptor **- **HsDOR** (BBa_256S6J1M) to the ***ACE2*** deletion locus. Additionally, we add SNC80, which is extracellular ligand that capable of binding to HsDOR, thereby activating the downstream signaling pathway. As human-derived HsDOR cannot transduce signals inside yeast cells upon ligand binding, we introduced **Modified Gpa1** (BBa_254K9906) downstream of **HsDOR**,as described in Brown, A. J. et al.(2000). This allowed **Modified Gpa1** to serve as the intracellular ligand for **HsDOR**, thereby achieving a functional human GPCR-yeast coupling. This modification not only endowed the multicellular yeast chassis with drug-ensing capabilities but also demonstrated the feasibility of transplanting human receptor proteins into this system.

To stimulate the differentiation potential of our multicellular yeast system, we introduced the ***IME1*** (BBa_250R9OVR) and ***BAX*** (BBa_K5441013) genes to generate morphological diversity. ***IME1***, a key regulator of meiosis (Smith et al.,1990), was integrated into the yeast genome via homologous recombination, which resulted in changes to the size and morphology of daughter cells. ***BAX***, a regulator of apoptosis（Greenhalf, Stephan, & Chaudhuri, 1995）, was expressed in the multicellular yeast to accelerate cell death, producing branches of varying sizes and altering the overall morphology of the clusters. To tightly control the expression of these genes, we implemented the Tet-on/off system. In the presence of doxycycline, the system activates the transcription of ***IME1*** and ***BAX*** by binding to the pTet2 promoter, thereby precisely regulating their expression.

Pathogenic fungi differ significantly from *Saccharomyces cerevisiae* in their membrane lipid composition. The presence of cholesterol components in the cell membranes of pathogenic fungi, which resemble those of human cells, is a key factor in their invasiveness. Therefore, in addition to morphological engineering, we aimed to modify the membrane structure of Grape Yeast by replacing ergosterol with cholesterol to more closely mimic the cell membranes of clinically relevant pathogenic fungi, such as *Candida albicans*. The products of the ***ERG5*** and ***ERG6*** genes are key enzymes in the *S. cerevisiae* ergosterol biosynthesis pathway, responsible for catalyzing the formation of the C-22(23) double bond and the C-24 methyl transfer reaction, respectively. We replaced ***ERG5*** and ***ERG6*** with ***DrDHCR7*** (BBa_25RCU5CB) and ***DrDHCR24*** (BBa_25FOVO4C) respectively, as described in Bean et al.(2022). This redirection of the metabolic pathway enabled the substitution of ergosterol with cholesterol on the Grape Yeast cell membrane surface.


Table 1. Parts for [Grape Yeast Collection](https://registry.igem.org/collections/5a15daa1-9c25-4fd7-9c31-aa4667c13141)

缺少敲除 ego5 ego6 的四个同源臂

| Part Number  |        Type        |           Part Name           |
| :----------: | :----------------: | :---------------------------: |
| BBa_25MIG4EW | HR5'\_*ACE2*\_Chr12L |  ChrXII: 390877-391176      |
| BBa_259HCU8C | HR3'\_*ACE2*\_Chr12R |  ChrXII: 388.058-388563     |
| BBa_25EI9P2P |      Plasmid       |         234r-ACE2-77          |
| BBa_256S6J1M |       coding       |             HsDOR             |
| BBa_25AKJ83S | Translational_Unit |      pREV1 driven HsDOR       |
| BBa_25RCU5CB |       coding       |            DrDHCR7            |
| BBa_25FOVO4C |       coding       |           DrDHCR24            |
| BBa_25FU0JM9 | Translational_Unit |    pREV1 driven *DrDHCR7*     |
| BBa_25JA9ZHO | Translational_Unit |    pREV1 driven *DrDHCR24*    |
| BBa_254K9906 |       coding       |        Modified *Gpa1*        |
| BBa_K3944000 |      promoter      |             pCUP1             |
| BBa_255U7XC8 | Translational_Unit |  pCUP1 driven modified Gpa1   |
| BBa_K3944010 |     regulatory     |             rtTA              |
| BBa_25JOF7TY | Translational_Unit |       pREV1 driven rtTA       |
| BBa_252BO17G |      promoter      |             pTet2             |
| BBa_K5441013 |       coding       |             *BAX*             |
| BBa_250R9OVR |       coding       |            *IME1*             |
| BBa_K5470011 |       coding       |            GSG-E2A            |
| BBa_25IB5O7X |       coding       | 你要去BBa_K4162001页面加个doc，说description错了，这仅仅是荧光蛋白 StayGold = (n2)oxStayGold(c4)v2.0 |
| BBa_25MTFXKO | Translational_Unit | pTet2 driven *BAX*-*E2A*-mSG  |
| BBa_25N811P5 | Translational_Unit | pTet2 driven *IME1*-*E2A*-mSG |
| BBa_25KYY8AI | Translational_Unit | pCUP1 driven *BAX*-*E2A*-mSG  |
| BBa_25N9YOTD | Translational_Unit | pCUP1 driven *IME1*-*E2A*-mSG |

找 Lee (2015) 附件，说 BBa_25EI9P2P 怎么得到的 when performing [Golden Gate assembly](/experiments#golden-gate-assembly), just cycling between 37 degree and 16 degree for 30 cycles, no additional 55 degree enzyme digestion or 80 degree heat-inactivation 以及怎么用


### Collection 2: [TU Recorders using EMS-insensitive Fluorescent Protein](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30)

Fluorescent proteins (EMSfp) can respond to gene mutations induced by the mutagen EMS, resulting in changes in fluorescence intensity at the corresponding wavelengths. 这两句话没写好，为什么明明EMSfp要说清楚

To identify the optimal mutation-tracking device for our project, we selected 4 promoters : **pOST1**(BBa_259JX52V), **pRNR2**(BBa_K3748013), **pSTM1**(BBa_25FQBGJW) and **pTDH3**(BBa_K3190001), 7 EMSfps : **EMSfp383**(BBa_25F6RD26), **EMSfp399**(BBa_25M2Z9H7), **EMSfp499**(BBa_25IB5O7X), **EMSfp506**(BBa_25FAVHQY), **EMSfp569**(BBa_25TYRLM9), **EMSfp642**(BBa_25GARG3E), **EMSfp643**(BBa_2599SI53), and 1 fixed terminator **tENO1**(BBa_K2753051), yielding a total of 28 TU modules(Hodgins-Davis et al., 2019). By comparing fluorescence changes between the EMS-treated group and the control group, we screened out the combination with the most significant variation as the optimal pair, which was then integrated into the 16 chromosomes of yeast via homologous arms.


Table 2. Parts for 28 [TU Recorders](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30)

| Part Number  |        Type        |       Part Name       |
| :----------: | :----------------: | :-------------------: |
| BBa_25S7HMJ7 | Translational_Unit | pOST1 driven EMSfp383 (mScarliet) |
| BBa_25DWU82I | Translational_Unit | pOST1 driven EMSfp399 (mSG) |
| BBa_25L56M2M | Translational_Unit | pOST1 driven EMSfp499 (eBFP2) |
| BBa_2584P1I8 | Translational_Unit | pOST1 driven EMSfp506 (smURFP) |
| BBa_251VI6SD | Translational_Unit | pOST1 driven EMSfp569 (Bluebonnet2) |
| BBa_25T5YP8M | Translational_Unit | pOST1 driven EMSfp642 (miRFP670-2) |
| BBa_25BWBNVL | Translational_Unit | pOST1 driven EMSfp643 (mNeonGreen) |
| BBa_25FQWVZE | Translational_Unit | pRNR2 driven EMSfp383 (mScarliet) |
| BBa_25P3CYM6 | Translational_Unit | pRNR2 driven EMSfp399 (mSG) |
| BBa_250UY7YR | Translational_Unit | pRNR2 driven EMSfp499 (eBFP2) |
| BBa_2517PQWR | Translational_Unit | pRNR2 driven EMSfp506 (smURFP) |
| BBa_25GIKETL | Translational_Unit | pRNR2 driven EMSfp569 (Bluebonnet2) |
| BBa_25R85SZ9 | Translational_Unit | pRNR2 driven EMSfp642 (miRFP670-2) |
| BBa_258547VP | Translational_Unit | pRNR2 driven EMSfp643 (mNeonGreen) |
| BBa_25T01PTJ | Translational_Unit | pSTM1 driven EMSfp383 (mScarliet) |
| BBa_25R7QESE | Translational_Unit | pSTM1 driven EMSfp399 (mSG) |
| BBa_255T0PHY | Translational_Unit | pSTM1 driven EMSfp499 (eBFP2) |
| BBa_25P31EK5 | Translational_Unit | pSTM1 driven EMSfp506 (smURFP) |
| BBa_259AX3UO | Translational_Unit | pSTM1 driven EMSfp569 (Bluebonnet2) |
| BBa_259Z131H | Translational_Unit | pSTM1 driven EMSfp642 (miRFP670-2) |
| BBa_25DI5UXV | Translational_Unit | pSTM1 driven EMSfp643 (mNeonGreen) |
| BBa_25PHHOV9 | Translational_Unit | pTDH3 driven EMSfp383 (mScarliet) |
| BBa_258CH7EU | Translational_Unit | pTDH3 driven EMSfp399 (mSG) |
| BBa_25L2MY7F | Translational_Unit | pTDH3 driven EMSfp499 (eBFP2) |
| BBa_25FED5Y1 | Translational_Unit | pTDH3 driven EMSfp506 (smURFP) |
| BBa_25A00YSZ | Translational_Unit | pTDH3 driven EMSfp569 (Bluebonnet2) |
| BBa_257O6RCL | Translational_Unit | pTDH3 driven EMSfp642 (miRFP670-2) |
| BBa_25RJG3B2 | Translational_Unit | pTDH3 driven EMSfp643 (mNeonGreen) |

找 Lee (2015) 附件，说这些部件都通过pYTK096，整合到了酵母URA3位点；Lee关于096所有的文字及实验转述过来

在registry collection要展示 NotI phire 等


### Collection 3:  [Sites of Integration to Assess Chromosomal Instability](https://registry.igem.org/collections/b64cd4a7-59f1-4dae-83a7-909b69a778d0) in *Saccharomyces cerevisiae*

In synthetic biology, efficient and predictable genome integration is fundamental for constructing complex biological systems and accelerating the engineering cycle. To address this need, our team developed a robust **Homologous Arms Integration Collection for Saccharomyces cerevisiae**. This collection not only incorporates validated safe integration sites but also extends to novel replacement-based strategies, providing future iGEM teams with a powerful, flexible, and standardized solution.

The core of this collection consists of two parts of homologous arms :

#### 10 Safe Integration Sites

Based on the MoClo toolkit published by Shaw, Khalil, and Ellis (2023), we identified and validated ten genomic integration sites. These loci are situated in non-coding regions of the 不是Y55是BY yeast genome, ensuring that the integration of exogenous genes does not interfere with endogenous expression. This approach minimizes off-target effects and avoids impairing host cell growth. Through homologous recombination, any transcriptional unit (TU) can be stably integrated into these sites. These loci provide a reliable foundation for constructing complex multi-gene circuits while preserving the physiological homeostasis of the host cell.

10个来自Shaw 要转述他的标准，以及我们意识到这些位点在染色体离着丝粒距离不同的，有个假设在酵母生长中远离着丝粒的会更频繁的交换，有较多变异，是不是能记录？是启发我们开发TU Recorder的原因之一。

#### 6 Dangerous Integration Sites

To provide comprehensive coverage across the yeast genome, we designed a set of homologous arms for replacing endogenous genes on 6 different chromosomes of the 不是Y55是BY strain（2 lous are in ChrXII）. This library facilitates the precise deletion or replacement of target genes via homologous recombination. This strategy is particularly valuable in metabolic engineering, where it can be applied to eliminate competing pathways or introduce new functions. By complementing the safe insertion library, this replacement library expands our toolkit's functionality, enabling applications ranging from simple gene addition to complex genome reprogramming.

自己选的6个的理由的文献，描述文章核心发现，然后用附件数据（分析有一个excel在飞书 去掉作者信息后可以上传提供给大家）；不是该文章有写的，而使用了文章数据自己挑的；整合在不同染色体，KO对应基因，会造成其他染色体或自身染色体不稳定

Table 3. [Sites of Integration to Assess Chromosomal Instability](https://registry.igem.org/collections/b64cd4a7-59f1-4dae-83a7-909b69a778d0)

| Part number  |      Part name       |    Integration Loci     |
| :----------: | :------------------: | :---------------------: |
| BBa_250U3B6G |      HR5'\_Chr1L      |  ChrI: 169,422-169,940   |
| BBa_25GQIZIK |      HR3'\_Chr1R      |  ChrI: 169,942-170,478   |
| BBa_25ATGCHY | HR5'\_*DPB3*\_Chr2L  |   ChrII: 735469-735988   |
| BBa_25Y6BTXZ | HR3'\_*DPB3*\_chr2R  |   ChrII: 736574-737141   |
| BBa_25Q67BOD | HR5'\_*FEN2*\_Chr3L  |  ChrIII: 165465-165991   |
| BBa_25TEB42Q | HR3'\_*FEN2*\_Chr3R  |  ChrIII: 163418-163951   |
| BBa_253K1B8N |      HR5'\_Chr4L      |  ChrIV: 359,868-360,355  |
| BBa_25P0EZQP |      HR3'\_Chr4R      |  ChrIV: 360,356-360,897  |
| BBa_25TMD7MC | HR5'\_*SWI4*\_Chr5L  |   ChrV: 390514-391024    |
| BBa_255A36IQ | HR3'\_*SWI4*\_Chr5R  |   ChrV: 386704-387244    |
| BBa_2552AC6E |      HR5'\_Chr6L      |   ChrVI: 10,278-10,913   |
| BBa_25IULUBT |      HR3'\_Chr6R      |   ChrVI: 10,914-11,424   |
| BBa_25ZYL3GW |      HR5'\_Chr7L      |  ChrVII: 12,472-12,982   |
| BBa_25H1VEJW |      HR3'\_Chr7R      |  ChrVII: 12,983-13,498   |
| BBa_25FYK3TX |      HR5'\_Chr8L      | ChrVIII: 191,015-191,539 |
| BBa_25PJP4LG |      HR3'\_Chr8R      | ChrVIII: 191,540-192,044 |
| BBa_25FUWBU7 |     HR5'\_Chr9L      |  ChrIX: 340,431-340,933  |
| BBa_25PDQZ8Z |      HR3'\_Chr9R      |  ChrIX: 340,935-341,523  |
| BBa_25CLCLXX | HR5'\_*SOD1*\_Chr10L |   ChrX: 601161-601690    |
| BBa_2533RATE | HR3'\_*SOD1*\_Chr10R |   ChrX: 600171-600723    |
| BBa_25DIWZUL |     HR5'\_Chr11L     |   ChrXI: 24,931-25,451   |
| BBa_257IAIOG |     HR3'\_Chr11R     |   ChrXI: 25,452-25,963   |
| BBa_25MZORVY | HR5'\_*BDF1*\_Chr12L |  ChrXII: 867546-868044   |
| BBa_25R5XTI0 | HR3'\_*BDF1*\_Chr12R |  ChrXII: 864985-865484   |
| BBa_25F4SCLY |     HR5'\_Chr13L      | ChrXIII: 408,123-408,657 |
| BBa_25GCY7VQ |     HR3'\_Chr13R      | ChrXIII: 408,658-409,161 |
| BBa_25U88LU3 | HR5'\_*CAF*\_Chr14L  |   ChrXIV: 82768-83297    |
| BBa_25O0GI56 | HR3'\_*CAF*\_Chr14R  |   ChrXIV: 84390-84957    |
| BBa_25B7ZBSD |     HR5'\_Chr15L      |  ChrXV: 686,950-687,450  |
| BBa_25Q3F2B3 |     HR3'\_Chr15R      |  ChrXV: 687,451-687,964  |
| BBa_25RRB2RQ |     HR5'\_Chr16L      | ChrXVI: 569,995-570,541  |
| BBa_25U7CTYJ |     HR3'\_Chr16R      | ChrXVI: 570,542-571,023  |


缺总结文字，这个页面内容是拆出来到三个registry collection 页面（都要有总起总结，链接回wiki）


## Reference 参考文献要在正文方框引用，在这下面编号

Bean, B. D. M., Mulvihill, C. J., Garge, R. K., Boutz, D. R., Rousseau, O., Floyd, B. M., Cheney, W., Gardner, E. C., Ellington, A. D., Marcotte, E. M., Gollihar, J. D., Whiteway, M., & Martin, V. J. J. (2022). Functional expression of opioid receptors and other human GPCRs in yeast engineered to produce human sterols. *Nature communications*, *13*(1), 2882. https://doi.org/10.1038/s41467-022-30570-7

Brown, A. J., Dyos, S. L., Whiteway, M. S., White, J. H., Watson, M. A., Marzioch, M., Clare, J. J., Cousens, D. J., Paddon, C., Plumpton, C., Romanos, M. A., & Dowell, S. J. (2000). Functional coupling of mammalian receptors to the yeast mating pathway using novel yeast/mammalian G protein alpha-subunit chimeras. *Yeast (Chichester, England)*, *16*(1), 11–22. https://doi.org/10.1002/(SICI)1097-0061(20000115)16:1<11::AID-YEA502>3.0.CO;2-K

Greenhalf, W., Stephan, C., & Chaudhuri, B. (1996). Role of mitochondria and C-terminal membrane anchor of Bcl-2 in Bax induced growth arrest and mortality in Saccharomyces cerevisiae. *FEBS letters*, *380*(1-2), 169–175. https://doi.org/10.1016/0014-5793(96)00044-0

Hodgins-Davis, A., Duveau, F., Walker, E. A., & Wittkopp, P. J. (2019). Empirical measures of mutational effects define neutral models of regulatory evolution in *Saccharomyces cerevisiae*. *Proceedings of the National Academy of Sciences of the United States of America*, *116*(42), 21085–21093. https://doi.org/10.1073/pnas.1902823116

Shaw, W. M., Khalil, A. S., & Ellis, T. (2023). A Multiplex MoClo Toolkit for Extensive and Flexible Engineering of *Saccharomyces cerevisiae*. *ACS synthetic biology*, *12*(11), 3393–3405. https://doi.org/10.1021/acssynbio.3c00423

Smith, H. E., Su, S. S., Neigeborn, L., Driscoll, S. E., & Mitchell, A. P. (1990). Role of IME1 expression in regulation of meiosis in Saccharomyces cerevisiae. *Molecular and cellular biology*, *10*(12), 6103–6113. https://doi.org/10.1128/mcb.10.12.6103-6113.1990