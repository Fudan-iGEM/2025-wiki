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

#### ACE2 Knockout and Functional Human GPCR Integration

The construction of Grape Yeast is the foundational engineering of our program. To create this chassis, we knocked out the transcription factor gene *ACE2*, which is essential for septum degradation during yeast cell division. The resulting strain fails to release daughter cells after cytokinesis, instead forming multicellular clusters that resemble grape bunches. (Tong *et al*., 2025)[^1] And its morphology and characteristics closely mimic those of pathogenic fungi. To expand the functionality of the strain, we introduced the human δ-opioid receptor - HsDOR (BBa_256S6J1M) to the *ACE2* deletion locus. Additionally, we add SNC80, which is extracellular ligand that capable of binding to HsDOR, thereby activating the downstream signaling pathway. As human-derived HsDOR cannot transduce signals inside yeast cells upon ligand binding, we introduced Modified Gpa1 (BBa_254K9906) downstream of HsDOR, as described in Brown, A. J. *et al.* (2000)[^2] . This allowed Modified Gpa1 to serve as the intracellular ligand for HsDOR, thereby achieving a functional human GPCR-yeast coupling. This modification not only endowed the multicellular yeast chassis with drug-ensing capabilities but also demonstrated the feasibility of transplanting human receptor proteins into this system.

Plasmid carrying ACE2HRs and G418 resistence (BBa_25EI9P2P) is the vector of TUs that were integrated in *ACE2* loci. In the modular yeast assembly system described by Lee *et al.* (2015)[^3] , the construction of  this vector was obtained by replacing the GFP dropout cassette in a Type-234 vector (*e.g.*, pYTK047) through BsaI-mediated Golden Gate assembly. Because the BsaI sites in Type-234 vectors are oriented in reverse relative to standard parts, performing a final high-temperature digestion or 80 °C heat-inactivation would undesirably re-cut or damage the assembled product. Therefore, the reaction should end with ligation — cycling between 37 °C and 16 °C for about 30 cycles — without any subsequent 55 °C digestion or 80 °C heat-inactivation steps. After cycling, the mixture is directly transformed into *E. coli*, and correct clones are identified by loss of GFP fluorescence or appropriate antibiotic resistance, followed by PCR or sequencing confirmation. This “end-on-ligation” method successfully yields constructs like 234r-ACE2HRs-G418R, though it carries a higher misassembly rate, so careful screening is required.


#### Controlled Expression of *IME1* and *BAX* to Modulate Yeast Morphology

To stimulate the differentiation potential of our multicellular yeast system, we introduced the *IME1* (BBa_250R9OVR) and *BAX* (BBa_K5441013) genes to generate morphological diversity. *IME1*, a key regulator of meiosis (Smith *et al.*,1990), was integrated into the yeast genome via homologous recombination, which resulted in changes to the size and morphology of daughter cells.[^4] *BAX*, a regulator of apoptosis（Greenhalf, Stephan, & Chaudhuri, 1995）, was expressed in the multicellular yeast to accelerate cell death, producing branches of varying sizes and altering the overall morphology of the clusters.[^5] To tightly control the expression of these genes, we implemented the Tet-on/off system. In the presence of doxycycline, the system activates the transcription of *IME1* and *BAX* by binding to the pTet2 promoter, thereby precisely regulating their expression.


#### Replacing Ergosterol with Cholesterol to Mimic Pathogens

Pathogenic fungi differ significantly from *Saccharomyces cerevisiae* in their membrane lipid composition. The presence of cholesterol components in the cell membranes of pathogenic fungi, which resemble those of human cells, is a key factor in their invasiveness. Therefore, in addition to morphological engineering, we aimed to modify the membrane structure of Grape Yeast by replacing ergosterol with cholesterol to more closely mimic the cell membranes of clinically relevant pathogenic fungi, such as *Candida albicans*. The products of the *ERG5* and *ERG6* genes are key enzymes in the *S. cerevisiae* ergosterol biosynthesis pathway, responsible for catalyzing the formation of the C-22(23) double bond and the C-24 methyl transfer reaction, respectively. We replaced *ERG5* and *ERG6* with *DrDHCR7* (BBa_25RCU5CB) and *DrDHCR24* (BBa_25FOVO4C) respectively, as described in Bean et al.(2022).[^6] This redirection of the metabolic pathway enabled the substitution of ergosterol with cholesterol on the Grape Yeast cell membrane surface.


Table 1. Parts for [Grape Yeast Collection](https://registry.igem.org/collections/5a15daa1-9c25-4fd7-9c31-aa4667c13141)

| Part Number  |              Type              |                  Part Name                   |
| :----------: | :----------------------------: | :------------------------------------------: |
| BBa_25MIG4EW | Homologous Region |             HR5'\_*ACE2*\_Chr12L             |
| BBa_259HCU8C | Homologous Region |             HR3'\_*ACE2*\_Chr12R             |
| BBa_25EI9P2P |            Plasmid             | Plasmid carrying ACE2HRs and G418 resistence |
| BBa_256S6J1M |             coding             |                    HsDOR                     |
| BBa_25AKJ83S |       Translational_Unit       |              pREV1 driven HsDOR              |
| BBa_25XKAUNH | Homologous Region |             HR5'\_*ERG5*\_Chr13L             |
| BBa_25E9K479 | Homologous Region |             HR3'\_*ERG5*\_Chr13R             |
| BBa_25U7DH3R | Homologous Region |             HR5'\_*ERG6*\_Chr13L             |
| BBa_25O1ZVOU | Homologous Region |             HR3'\_*ERG6*\_Chr13R             |
| BBa_25RCU5CB |             coding             |                   DrDHCR7                    |
| BBa_25FOVO4C |             coding             |                   DrDHCR24                   |
| BBa_25FU0JM9 |       Translational_Unit       |            pREV1 driven *DrDHCR7*            |
| BBa_25JA9ZHO |       Translational_Unit       |           pREV1 driven *DrDHCR24*            |
| BBa_254K9906 |             coding             |               Modified *Gpa1*                |
| BBa_K3944000 |            promoter            |                    pCUP1                     |
| BBa_255U7XC8 |       Translational_Unit       |          pCUP1 driven modified Gpa1          |
| BBa_K3944010 |           regulatory           |                     rtTA                     |
| BBa_25JOF7TY |       Translational_Unit       |              pREV1 driven rtTA               |
| BBa_252BO17G |            promoter            |                    pTet2                     |
| BBa_K5441013 |             coding             |                    *BAX*                     |
| BBa_250R9OVR |             coding             |                    *IME1*                    |
| BBa_K5470011 |             coding             |                   GSG-E2A                    |
| BBa_25IB5O7X |             coding             |                     mSG                      |
| BBa_25MTFXKO |       Translational_Unit       |         pTet2 driven *BAX*-*E2A*-mSG         |
| BBa_25N811P5 |       Translational_Unit       |        pTet2 driven *IME1*-*E2A*-mSG         |
| BBa_25KYY8AI |       Translational_Unit       |         pCUP1 driven *BAX*-*E2A*-mSG         |
| BBa_25N9YOTD |       Translational_Unit       |        pCUP1 driven *IME1*-*E2A*-mSG         |




### Collection 2: [TU Recorders using EMS-insensitive Fluorescent Protein](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30)

Under the induction of the EMS mutagen, the sequence of the promoter undergoes G/C to A/T base mutations, causing a change in the expression level of the fluorescent protein it regulates. This change reflects the degree of promoter sequence mutation. Our program aims to use this principle as a yeast gene mutation recorder. However, the fluorescent protein's sequence itself can also change under EMS mutagenesis, leading to alterations in its fluorescence and interfering with the accurate assessment of the promoter's mutation degree. To solve this problem and make the fluorescent protein as stable as possible under EMS, we developed a [Software](https://2025.igem.wiki/fudan/software.html) to optimize the fluorescent protein sequence. Based on codon degeneracy, we replaced as many G/C bases with A/T bases as possible to enhance the fluorescent protein's resistance to mutagenesis under EMS induction. Thereby, we have EMS-resist fluorescent proteins and mutagenic promoters combinations as TU recorders of yeast mutation.

To identify the optimal mutation-tracking TU recorder for our program, we selected: 4 promoters : pOST1 (BBa_259JX52V) , pRNR2 (BBa_K3748013) , pSTM1 (BBa_25FQBGJW) and pTDH3 (BBa_K3190001) , 7 EMSfps (the number in the name represents the excitation wavelength of the fluorescent protein under EMS) : EMSfp383 (BBa_25F6RD26) , EMSfp399 (BBa_25M2Z9H7) , EMSfp499 (BBa_25IB5O7X) , EMSfp506 (BBa_25FAVHQY) , EMSfp569 (BBa_25TYRLM9) , EMSfp642 (BBa_25GARG3E) , EMSfp643 (BBa_2599SI53) , and 1 fixed terminator tENO1 (BBa_K2753051) , yielding a total of 28 TU modules (Hodgins-Davis *et al.*, 2019) .[^7] By comparing fluorescence changes between the EMS-treated group and the control group, we screened out the combination with the most significant variation as the optimal pair, which was then integrated into the 16 chromosomes of yeast via homologous arms.

According to the YTK toolkit by Lee *et al.* (2015), pYTK096 is a *URA3* integration vector pre-assembled from the following parts: Type 7 (the URA3 3′ homology arm) , Type 8a (the *E. coli* replication origin + resistance marker + flanking *Not*I sites) , and Type 8b (the URA3 5′ homology arm) .[^3] This design allows the vector to be linearized prior to transformation. This standardized design (Type 7 + 8a + 8b module combination) makes pYTK096 a versatile vector within the YTK system for stable, single-copy chromosomal integration. In this collection, the integration of all TU Recorders is achieved via:

1. Assembly using the pYTK096 integration vector;
2. Linearization by NotI restriction digest, which exposes the *URA3* homology arms;
3. Transformation into yeast, followed by integration into the chromosomal *URA3* locus via *URA3* homologous recombination;
4. Confirmation of correct integration either through *URA3* phenotypic selection or PCR verification (a fragment of approximately 500 bp can be amplified upon correct integration) .

In the part collection of our registry, we showcase the results of the *Not*I digest and phire amplification. For these information, please read our documentation of [TU Recorders using EMS-insensitive Fluorescent Protein](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30)



Table 2. Parts for 28 [TU Recorders](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30)

| Part Number  |        Type        |              Part Name              |
| :----------: | :----------------: | :---------------------------------: |
| BBa_25S7HMJ7 | Translational_Unit |    pOST1 driven EMSfp383 (eBFP2)    |
| BBa_25DWU82I | Translational_Unit | pOST1 driven EMSfp399 (Bluebonnet2) |
| BBa_25L56M2M | Translational_Unit |     pOST1 driven EMSfp499 (mSG)     |
| BBa_2584P1I8 | Translational_Unit | pOST1 driven EMSfp506 (mNeonGreen)  |
| BBa_251VI6SD | Translational_Unit |  pOST1 driven EMSfp569 (mScarlet)   |
| BBa_25T5YP8M | Translational_Unit |   pOST1 driven EMSfp642 (smURFP)    |
| BBa_25BWBNVL | Translational_Unit | pOST1 driven EMSfp643 (miRFP670-2)  |
| BBa_25FQWVZE | Translational_Unit |    pRNR2 driven EMSfp383 (eBFP2)    |
| BBa_25P3CYM6 | Translational_Unit | pRNR2 driven EMSfp399 (Bluebonnet2) |
| BBa_250UY7YR | Translational_Unit |     pRNR2 driven EMSfp499 (mSG)     |
| BBa_2517PQWR | Translational_Unit | pRNR2 driven EMSfp506 (mNeonGreen)  |
| BBa_25GIKETL | Translational_Unit |  pRNR2 driven EMSfp569 (mScarlet)   |
| BBa_25R85SZ9 | Translational_Unit |   pRNR2 driven EMSfp642 (smURFP)    |
| BBa_258547VP | Translational_Unit | pRNR2 driven EMSfp643 (miRFP670-2)  |
| BBa_25T01PTJ | Translational_Unit |    pSTM1 driven EMSfp383 (eBFP2)    |
| BBa_25R7QESE | Translational_Unit | pSTM1 driven EMSfp399 (Bluebonnet2) |
| BBa_255T0PHY | Translational_Unit |     pSTM1 driven EMSfp499 (mSG)     |
| BBa_25P31EK5 | Translational_Unit | pSTM1 driven EMSfp506 (mNeonGreen)  |
| BBa_259AX3UO | Translational_Unit |  pSTM1 driven EMSfp569 (mScarlet)   |
| BBa_259Z131H | Translational_Unit |   pSTM1 driven EMSfp642 (smURFP)    |
| BBa_25DI5UXV | Translational_Unit | pSTM1 driven EMSfp643 (miRFP670-2)  |
| BBa_25PHHOV9 | Translational_Unit |    pTDH3 driven EMSfp383 (eBFP2)    |
| BBa_258CH7EU | Translational_Unit | pTDH3 driven EMSfp399 (Bluebonnet2) |
| BBa_25L2MY7F | Translational_Unit |     pTDH3 driven EMSfp499 (mSG)     |
| BBa_25FED5Y1 | Translational_Unit | pTDH3 driven EMSfp506 (mNeonGreen)  |
| BBa_25A00YSZ | Translational_Unit |  pTDH3 driven EMSfp569 (mScarlet)   |
| BBa_257O6RCL | Translational_Unit |   pTDH3 driven EMSfp642 (smURFP)    |
| BBa_25RJG3B2 | Translational_Unit | pTDH3 driven EMSfp643 (miRFP670-2)  |





### Collection 3:  [Sites of Integration to Assess Chromosomal Instability](https://registry.igem.org/collections/b64cd4a7-59f1-4dae-83a7-909b69a778d0) in *Saccharomyces cerevisiae*

In synthetic biology, efficient and predictable genome integration is fundamental for constructing complex biological systems and accelerating the engineering cycle. To address this need, our team developed a robust Homologous Arms Integration Collection for Saccharomyces cerevisiae. This collection not only incorporates validated safe integration sites but also extends to novel replacement-based strategies, providing future iGEM teams with a powerful, flexible, and standardized solution.

The core of this collection consists of two parts of homologous arms :


#### 10 Safe Integration Sites

In the article by Shaw *et al.* (2023) , the authors designed 10 sets of safe integration sites located on different chromosomes of the S288C strain *Saccharomyces cerevisiae*. The selection and design of these integration sites were rigorously based on four standards[^8] :

1. Minimize Host Cell Impact: To ensure that the integration of the foreign DNA into the host genome has the least possible disruptive effect on the yeast cell's essential physiology.
2. Maximize Integration Efficiency and Stability: To increase the likelihood of achieving highly efficient and stable integration of the genetic constructs.
3. Highly Conserved in Common Strains: To guarantee that the loci are well-conserved across common laboratory strains of *S. cerevisiae*, thereby ensuring the broad utility and portability of the toolkit.
4. Directly Amenable to CRISPR-Cas9 Manipulation: To make these sites readily accessible and targetable for precise editing using CRISPR-Cas9 technology.

To uphold these principles, the final 10 sites were selected specifically because they reside in true intergenic regions (non-coding DNA), being located more than 1 kb from any known gene's start codon and more than 0.5 kb from its stop codon.

Furthermore, we recognized that these integration sites exhibit varying distances from the centromere across the chromosomes. There is a hypothesis suggesting that during yeast growth, sites located farther from the centromere undergo more frequent recombination events, leading to greater genetic variation. The question of whether these variations can be recorded was part of the inspiration behind our design of the [TU Recorders](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30).


#### 6 Dangerous Integration Sites

To provide comprehensive coverage across the yeast genome, we analyzed genome-wide stability data to identify locus whose perturbation could potentially disrupt chromosomal integrity. The rationale for selecting these six Dangerous Integration Sites was guided by quantitative findings from Puddu *et al.* (2019) , which systematically characterized genomic instability across *Saccharomyces cerevisiae* deletion strains.[^9]

In this landmark work, the authors analyzed over one thousand yeast isolates and knockout mutants to explore the causes of chromosomal aneuploidy and genome instability. Their results showed that deletion of certain genes markedly increases genome instability, often leading to chromosomal gain or loss, genome duplication, and altered karyotypes.[^9] These rearrangements were strongly associated with stress adaptation of environmental stress and antifungal drug resistance. This finding indicates that perturbations leading to *genome duplication* can also create opportunities for evolutionary innovation, as the extra genomic content allows cells to rewire gene expression and acquire new functions.

Building on this insight, we hypothesized that integrating our TU Recorders into locus associated with genome instability could allow us to record mutational events while simultaneously observing the potential emergence of adaptive phenotypes. In other words, while the Safe Integration Sites described by Shaw *et al.* (2023) ensure stability and predictability[^8] , the Dangerous Integration Sites provide a complementary perspective—a framework to study how instability itself may drive mutation, adaptation, and genomic evolution.

Using the dataset from Puddu *et al.* (2019)[^9] , we examined indicators such as chromosomal copy number variation, genome duplication frequency, and inter-chromosomal effects. Based on these parameters, we selected 6 representative locus — *CAF*, *SWI4*, *DPB3*, *FEN2*, *SOD1*, and *BDF1* — each located on a distinct chromosome, where gene knockout was correlated with either :

1. Instability of other chromosomes;
2. Aneuploidy of the affected chromosome itself.

These locus represent genomic regions prone to rearrangement and serve as a useful contrast to the Safe Integration Sites described by Shaw *et al.* (2023) .[^8] Although our constructs act as *recorders* rather than mutagenic drivers, including these instability-prone locus broadens the system’s chromosomal coverage and allows exploration of how genomic context impacts mutation capture and recording fidelity.

To support this rationale, we provide an reorganized summary table derived from Puddu *et al.* (2019) supplementary information showing chromosomal copy number changes and genome stability indices for *CAF*, *SWI4*, *DPB3*, *FEN2*, *SOD1*, and *BDF1*.[^9] The fully processed dataset s available in the supplementary table file. [Supplementary Table](https://static.igem.wiki/teams/5643/pageimage/part/copy-of-supplementary-table-of-collection-3.csv)

Below is the table of parts for our Collection 3:  [Sites of Integration to Assess Chromosomal Instability](https://registry.igem.org/collections/b64cd4a7-59f1-4dae-83a7-909b69a778d0) in *Saccharomyces cerevisiae*


Table 3. [Sites of Integration to Assess Chromosomal Instability](https://registry.igem.org/collections/b64cd4a7-59f1-4dae-83a7-909b69a778d0)

| Part number  |      Part name       |     Integration Loci     |
| :----------: | :------------------: | :----------------------: |
| BBa_250U3B6G |     HR5'\_Chr1L      |  ChrI: 169,422-169,940   |
| BBa_25GQIZIK |     HR3'\_Chr1R      |  ChrI: 169,942-170,478   |
| BBa_25ATGCHY | HR5'\_*DPB3*\_Chr2L  |   ChrII: 735469-735988   |
| BBa_25Y6BTXZ | HR3'\_*DPB3*\_chr2R  |   ChrII: 736574-737141   |
| BBa_25Q67BOD | HR5'\_*FEN2*\_Chr3L  |  ChrIII: 165465-165991   |
| BBa_25TEB42Q | HR3'\_*FEN2*\_Chr3R  |  ChrIII: 163418-163951   |
| BBa_253K1B8N |     HR5'\_Chr4L      |  ChrIV: 359,868-360,355  |
| BBa_25P0EZQP |     HR3'\_Chr4R      |  ChrIV: 360,356-360,897  |
| BBa_25TMD7MC | HR5'\_*SWI4*\_Chr5L  |   ChrV: 390514-391024    |
| BBa_255A36IQ | HR3'\_*SWI4*\_Chr5R  |   ChrV: 386704-387244    |
| BBa_2552AC6E |     HR5'\_Chr6L      |   ChrVI: 10,278-10,913   |
| BBa_25IULUBT |     HR3'\_Chr6R      |   ChrVI: 10,914-11,424   |
| BBa_25ZYL3GW |     HR5'\_Chr7L      |  ChrVII: 12,472-12,982   |
| BBa_25H1VEJW |     HR3'\_Chr7R      |  ChrVII: 12,983-13,498   |
| BBa_25FYK3TX |     HR5'\_Chr8L      | ChrVIII: 191,015-191,539 |
| BBa_25PJP4LG |     HR3'\_Chr8R      | ChrVIII: 191,540-192,044 |
| BBa_25FUWBU7 |     HR5'\_Chr9L      |  ChrIX: 340,431-340,933  |
| BBa_25PDQZ8Z |     HR3'\_Chr9R      |  ChrIX: 340,935-341,523  |
| BBa_25CLCLXX | HR5'\_*SOD1*\_Chr10L |   ChrX: 601161-601690    |
| BBa_2533RATE | HR3'\_*SOD1*\_Chr10R |   ChrX: 600171-600723    |
| BBa_25DIWZUL |     HR5'\_Chr11L     |   ChrXI: 24,931-25,451   |
| BBa_257IAIOG |     HR3'\_Chr11R     |   ChrXI: 25,452-25,963   |
| BBa_25MZORVY | HR5'\_*BDF1*\_Chr12L |  ChrXII: 867546-868044   |
| BBa_25R5XTI0 | HR3'\_*BDF1*\_Chr12R |  ChrXII: 864985-865484   |
| BBa_25F4SCLY |     HR5'\_Chr13L     | ChrXIII: 408,123-408,657 |
| BBa_25GCY7VQ |     HR3'\_Chr13R     | ChrXIII: 408,658-409,161 |
| BBa_25U88LU3 | HR5'\_*CAF*\_Chr14L  |   ChrXIV: 82768-83297    |
| BBa_25O0GI56 | HR3'\_*CAF*\_Chr14R  |   ChrXIV: 84390-84957    |
| BBa_25B7ZBSD |     HR5'\_Chr15L     |  ChrXV: 686,950-687,450  |
| BBa_25Q3F2B3 |     HR3'\_Chr15R     |  ChrXV: 687,451-687,964  |
| BBa_25RRB2RQ |     HR5'\_Chr16L     | ChrXVI: 569,995-570,541  |
| BBa_25U7CTYJ |     HR3'\_Chr16R     | ChrXVI: 570,542-571,023  |





### Summary

Together, these three collections establish a comprehensive toolkit for engineering, recording, and evaluating genomic behavior in *Saccharomyces cerevisiae*.

 Starting from the Grape Yeast chassis, which mimics pathogenic fungal morphology and membrane composition, we created a biologically relevant and modular foundation for synthetic design. Building on this, the TU Recorders enable direct visualization and quantification of mutation events through EMS-resistant fluorescent protein reporters, forming the core of our mutation-tracking system. Finally, by integrating these recorders into both Safe and Dangerous Integration Sites, we extended our investigation to the chromosomal level — examining how genome stability, duplication, and structural variation influence mutation recording and adaptive evolution.

This multi-layered design not only expands the experimental versatility of yeast synthetic biology but also bridges the gap between stable genetic engineering and dynamic evolutionary processes, providing future iGEM communities with a powerful framework for studying mutation, adaptation, and genomic resilience.





## Reference

[^1]:Tong, K., Datta, S., Cheng, V., Haas, D. J., Gourisetti, S., Yopp, H. L., Day, T. C., Lac, D. T., Khalil, A. S., Conlin, P. L., Bozdag, G. O., & Ratcliff, W. C. (2025). Genome duplication in a long-term multicellularity evolution experiment. *Nature*, *639*(8055), 691–699. https://doi.org/10.1038/s41586-025-08689-6
[^2]:Brown, A. J., Dyos, S. L., Whiteway, M. S., White, J. H., Watson, M. A., Marzioch, M., Clare, J. J., Cousens, D. J., Paddon, C., Plumpton, C., Romanos, M. A., & Dowell, S. J. (2000). Functional coupling of mammalian receptors to the yeast mating pathway using novel yeast/mammalian G protein alpha-subunit chimeras. *Yeast (Chichester, England)*, *16*(1), 11–22. https://doi.org/10.1002/(SICI)1097-0061(20000115)16:1[11::AID-YEA502](11::AID-YEA502)3.0.CO;2-K
[^3]:Lee, M. E., DeLoache, W. C., Cervantes, B., & Dueber, J. E. (2015). A Highly Characterized Yeast Toolkit for Modular, Multipart Assembly. *ACS synthetic biology*, *4*(9), 975–986. https://doi.org/10.1021/sb500366v
[^4]:Smith, H. E., Su, S. S., Neigeborn, L., Driscoll, S. E., & Mitchell, A. P. (1990). Role of IME1 expression in regulation of meiosis in Saccharomyces cerevisiae. *Molecular and cellular biology*, *10*(12), 6103–6113. https://doi.org/10.1128/mcb.10.12.6103-6113.1990
[^5]:Greenhalf, W., Stephan, C., & Chaudhuri, B. (1996). Role of mitochondria and C-terminal membrane anchor of Bcl-2 in Bax induced growth arrest and mortality in Saccharomyces cerevisiae. *FEBS letters*, *380*(1-2), 169–175. https://doi.org/10.1016/0014-5793(96)00044-0
[^6]:Bean, B. D. M., Mulvihill, C. J., Garge, R. K., Boutz, D. R., Rousseau, O., Floyd, B. M., Cheney, W., Gardner, E. C., Ellington, A. D., Marcotte, E. M., Gollihar, J. D., Whiteway, M., & Martin, V. J. J. (2022). Functional expression of opioid receptors and other human GPCRs in yeast engineered to produce human sterols. *Nature communications*, *13*(1), 2882. https://doi.org/10.1038/s41467-022-30570-7
[^7]:Hodgins-Davis, A., Duveau, F., Walker, E. A., & Wittkopp, P. J. (2019). Empirical measures of mutational effects define neutral models of regulatory evolution in *Saccharomyces cerevisiae*. *Proceedings of the National Academy of Sciences of the United States of America*, *116*(42), 21085–21093. https://doi.org/10.1073/pnas.1902823116
[^8]:Shaw, W. M., Khalil, A. S., & Ellis, T. (2023). A Multiplex MoClo Toolkit for Extensive and Flexible Engineering of *Saccharomyces cerevisiae*. *ACS synthetic biology*, *12*(11), 3393–3405. https://doi.org/10.1021/acssynbio.3c00423 ↩
[^9]:Puddu, F., Herzog, M., Selivanova, A., Wang, S., Zhu, J., Klein-Lavi, S., Gordon, M., Meirman, R., Millan-Zambrano, G., Ayestaran, I., Salguero, I., Sharan, R., Li, R., Kupiec, M., & Jackson, S. P. (2019). Genome architecture and stability in the Saccharomyces cerevisiae knockout collection. *Nature*, *573*(7774), 416–420. https://doi.org/10.1038/s41586-019-1549-9