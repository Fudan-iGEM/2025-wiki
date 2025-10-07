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

Our project **DR.sTraTeGY** (Drug Resistance mutation Tracking Technology based on Grape Yeast) has developed and test three part collections: [Grape Yeast](https://registry.igem.org/collections/5a15daa1-9c25-4fd7-9c31-aa4667c13141), [TU Recorders](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30) (the optimal promoter–fluorescent protein combination screening collection), and [the homologous arms integration collection](https://registry.igem.org/collections/b64cd4a7-59f1-4dae-83a7-909b69a778d0) for *Saccharomyces cerevisiae*.

## Collection 1: [Grape Yeast](https://registry.igem.org/collections/5a15daa1-9c25-4fd7-9c31-aa4667c13141)

### *ACE2* Knockout and Functional Human GPCR Integration

To create Grape Yeast, we first knocked out the transcription factor gene *ACE2*, whose function is essential for septum degradation during yeast cell division. The resulting strain fails to release daughter cells after cytokinesis, instead forming multicellular clusters that resemble grape bunches (Ratcliff *et al*.,2011; Tong *et al.*, 2025)[^1][^2]. And its morphology and characteristics closely mimic those of pathogenic fungi.[^3] Next, we introduced the human &delta;-opioid receptor - HsDOR (BBa_256S6J1M) to the *ACE2* deletion locus. Applying SNC80, which is an extracellular ligand that capable of binding to HsDOR, could activate the downstream signaling pathway. As human-derived HsDOR, which is on the membrane, cannot transduce signals inside yeast cells, we introduced Gpa1 (BBa_254K9906), described previously in Brown *et al.* (2000)[^4]. Introduced Gpa1 will serve as the intracellular messenger for HsDOR, thereby achieving a functional human GPCR-yeast coupling. This modification not only endowed the multicellular yeast chassis with drug-ensing capabilities but also demonstrated the feasibility of transplanting human receptors into yeast.

We used [the modular assembly yeast toolkit](https://www.addgene.org/kits/moclo-ytk/), described by Lee *et al.* (2015)[^5], to construct the parts in our project. An intermediate plasmid (BBa_25EI9P2P) was constructed to integrate different translational units (TU) in *ACE2* locus, which is very similar to [pYTK096](https://www.addgene.org/kits/moclo-ytk/) for URA3 locus integration. The GFP dropout cassette in BBa_25EI9P2P has the [BsaI](https://www.neb.com/en/products/r3733-bsai-hf-v2) sites oriented in reverse relative to standard parts. When performing the [Golden Gate assembly](/experiments/#golden-gate-assembly) to produce BBa_25EI9P2P no 55°C digestion nor 80°C heat-inactivation, only ligation — cycling between 37°C and 16°C for 30 cycles. After cycling, the mixture is directly transformed into *E. coli*, and correct clones are identified by gain of GFP fluorescence with kanamycin resistance, followed by whole-plasmid sequencing confirmation.

This “end-on-ligation” method successfully yielded BBa_25EI9P2P internally we called it *234r-ACE2HRs-G418R*. Then, we use it to generate the integration plasmid to put pREV1 driven HsDOR (BBa_25AKJ83S) into *ACE2* locus.

### Controlled Expression of *IME1* and *BAX* to Modulate Yeast Morphology

To generate morphological diversity of our multicellular yeast system, we introduced the *IME1* (BBa_250R9OVR) and *BAX* (BBa_K5441013) genes. *IME1*, a key regulator of meiosis (Smith *et al.*,1990), was integrated into the yeast genome via homologous recombination, which resulted in changes to the size and morphology of daughter cells.[^6] *BAX*, a regulator of apoptosis (Greenhalf *et al.*, 1995), was expressed in the multicellular yeast to accelerate cell death, producing branches of varying sizes and altering the overall morphology of the clusters.[^7]

To tightly control the expression of these genes, we implemented the Tet-on/off system. In the presence of doxycycline or aTc, the pTet2 promoter is active, and transcribes *IME1* and *BAX*, thereby leading to either meiosis or apoptosis, which could be the first reported differentiation events in multicellular yeasts. We also developed pCUP1 driven *IME1* (BBa_25N9YOTD) or *BAX* (BBa_25KYY8AI) which could be induced just adding CuSO<sub>4</sub>.

### Replacing Ergosterol with Cholesterol to Mimic Pathogens

Pathogenic fungi differ significantly from *Saccharomyces cerevisiae* in their membrane lipid composition. The presence of cholesterol components in the cell membranes of pathogenic fungi, which resemble those of human cells, is a key factor in their invasiveness. Therefore, in addition to morphological engineering, we aimed to modify the membrane structure of [Grape Yeast](/design/) by replacing ergosterol with cholesterol to more closely mimic the cell membranes of clinically relevant pathogenic fungi, such as *Candida albicans*. The products of the *ERG5* and *ERG6* genes are key enzymes in the *S. cerevisiae* ergosterol biosynthesis pathway, responsible for catalyzing the formation of the C-22(23) double bond and the C-24 methyl transfer reaction (Bean *et al.*, 2022)[^8]. We replaced *ERG5* and *ERG6* with *DrDHCR7* (BBa_25RCU5CB) and *DrDHCR24* (BBa_25FOVO4C) respectively, using BBa_25XKAUNH and BBa_25E9K479, BBa_25U7DH3R and BBa_25O1ZVOU for targeted yeast genome integration. This redirection of the metabolic pathway enabled the substitution of ergosterol with cholesterol on the Grape Yeast cell membrane surface.

### Fluorescent Timer

Grape Yeast forms complex multicellular clusters as mother cells continuously bud to generate new daughter cell branches. After a period of incubation, this repetitive budding leads to intricate, tangled three-dimensional clusters. This structural complexity makes it extremely difficult to trace the genealogical relationship among individual yeast cells. Consequently, we cannot precisely determine the timing and sequence of drug-resistance mutations within the cluster. To resolve this critical limitation, we introduced a fluorescent timer (BBa_25AT6YR4). By expressing this fluorescent timer within the multicellular yeast system, we can accurately determine the time elapsed since a given yeast cell underwent cell division. This enables us to precisely track the temporal accumulation of resistance mutations across different cells and time points.

The core component of the fluorescent timer is modified mCherry (BBa_25TQG9WZ), a monomeric derivative of mCherry whose fluorescence spectrum gradually shifts from blue to red over time. This chromophore maturation rate is temperature-dependent, based on previous finding[^9] and our [modeling results](/model/): at yeast's culture temperature 30∘C, the blue fluorescence reaches its maximum at approximately 0.4 h, while the red fluorescence half-maximum appears at around 12 h. 

Leveraging these spectral dynamics, we constructed the fluorescent timer by flanking modified mCherry (BBa_25TQG9WZ) with the ASH1 promoter (BBa_25VHXKNL) and the ASH1 3' UTR (BBa_25AIDL8P). A periodic promoter that drives the rhythmic transcription of color-changing mCherry is needed, otherwise all cells would be mixed with blue and red fluoresence. Because the promoter's choice critically affects the accuracy of time measurement, we developed a mathematical model to evaluate key characters of the promoter. Consistent with a previous study[^10], [our modeling](/model/) verified the rationality of using the ASH1 promoter prior to any wet-lab experiments (see our [Model](/model/) page for more details). In addition, ASH1 3' UTR is crucial for spatial regulation. It ensures that the color-changing mCherry mRNA is guided to the daughter cells, and only translated in the daugther cells.[^10][^11] Together, the continuous and uninterrupted expression of the fluorescent protein in the progeny, guarantees the continuity and accuracy of fluorescence-based timing throughout successive cell divisions.

Table 1. Parts for [Grape Yeast Collection](https://registry.igem.org/collections/5a15daa1-9c25-4fd7-9c31-aa4667c13141)

| Part Number  |              Type        |                  Part Name            |
| :----------: | :----------------------: | :-----------------------------------: |
| BBa_25MIG4EW | Homologous Region |             HR5'\_*ACE2*\_Chr12L             |
| BBa_259HCU8C | Homologous Region |             HR3'\_*ACE2*\_Chr12R             |
| BBa_25EI9P2P |            Plasmid       | Plasmid carrying ACE2HRs and G418 resistence |
| BBa_256S6J1M |             coding       |                    HsDOR              |
| BBa_25AKJ83S |       Translational_Unit |              pREV1 driven HsDOR       |
| BBa_25XKAUNH | Homologous Region |             HR5'\_*ERG5*\_Chr13L             |
| BBa_25E9K479 | Homologous Region |             HR3'\_*ERG5*\_Chr13R             |
| BBa_25U7DH3R | Homologous Region |             HR5'\_*ERG6*\_Chr13L             |
| BBa_25O1ZVOU | Homologous Region |             HR3'\_*ERG6*\_Chr13R             |
| BBa_25RCU5CB |             coding       |                   DrDHCR7             |
| BBa_25FOVO4C |             coding       |                   DrDHCR24            |
| BBa_25FU0JM9 |       Translational_Unit |            pREV1 driven *DrDHCR7*     |
| BBa_25JA9ZHO |       Translational_Unit |           pREV1 driven *DrDHCR24*     |
| BBa_254K9906 |             coding       |               Modified *Gpa1*         |
| BBa_K3944000 |            promoter      |                    pCUP1              |
| BBa_255U7XC8 |       Translational_Unit |          pCUP1 driven modified Gpa1   |
| BBa_K3944010 |           regulatory     |                     rtTA              |
| BBa_25JOF7TY |       Translational_Unit |              pREV1 driven rtTA        |
| BBa_252BO17G |            promoter      |                    pTet2              |
| BBa_K5441013 |             coding       |                    *BAX*              |
| BBa_250R9OVR |             coding       |                    *IME1*             |
| BBa_K5470011 |             coding       |                   GSG-E2A             |
| BBa_25IB5O7X |             coding       |                     mSG               |
| BBa_25MTFXKO |       Translational_Unit |         pTet2 driven *BAX*-E2A-mSG    |
| BBa_25N811P5 |       Translational_Unit |        pTet2 driven *IME1*-E2A-mSG    |
| BBa_25KYY8AI |       Translational_Unit |         pCUP1 driven *BAX*-E2A-mSG    |
| BBa_25N9YOTD |       Translational_Unit |        pCUP1 driven *IME1*-E2A-mSG    |
| BBa_25AIDL8P | 3'UTR             |      ASH1 3'UTR      |
| BBa_25TQG9WZ | coding            |   modified mCherry   |
| BBa_25VHXKNL | promoter          |      ASH1 AIpro      |
| BBa_25AT6YR4 |       Translational Unit | ASH1 AIpro driven modified mCherry-ASH1 3'UTR |

We use the following primers to verify the yeast genome intergration

<pre>ACE2_5H_F59     5-GCACTTTGGGAAAATTTCAGGACAC
common_5H_R56   5-ccatctagatgcgaattcaggg    # paired with any _5H_Forward
common_3H_F58   5-gtgaatgctggtcgctatactg    # paired with any _3H_Reverse
ACE2_3H_R58     5-GACCTGCGTGCCCATTGTA

ERG5_5H_F58   5-GCAGCTGCTCGTTCGC
ERG5_3H_R57   5-GAAGAACATCCTTCTTGGATTGC

ERG6_5H_F57   5-CCAAACAGCTAGGGCTGG
ERG6_3H_R57   5-CGCAAGAAATCCAATGGCTTTC</pre>


## Collection 2: [TU Recorders](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30) using EMS-insensitive Fluorescent Protein

Under the induction of the EMS mutagen, the sequence of the promoter undergoes G/C to A/T base mutations[^12], causing a change in the expression level of the fluorescent protein it regulates. This change reflects the degree of promoter sequence mutation. We aim to use this as a gene mutation recorder. However, the fluorescent protein's sequence itself can also change under EMS mutagenesis, leading to alterations in its fluorescence and interfering with the accurate assessment of the promoter's mutation degree. To solve this problem and make the fluorescent protein as stable as possible under EMS, we developed a [Software Tool](/software/) to optimize the fluorescent protein sequence. The tool replaces as many G/C bases with A/T bases as possible to enhance the fluorescent protein's resistance to mutagenesis under EMS induction. Thereby, we have EMS-resist fluorescent proteins and mutagenic promoters combinations as [TU recorders](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30).

To identify the optimal mutation-tracking [TU recorder](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30) for our project, we selected 4 promoters: pOST1 (BBa_259JX52V), pRNR2 (BBa_K3748013), pSTM1 (BBa_25FQBGJW) and pTDH3 (BBa_K3190001); 7 EMSfps (the number in the name represents the central excitation wavelength of the fluorescent protein): EMSfp383 (BBa_25F6RD26), EMSfp399 (BBa_25M2Z9H7), EMSfp499 (BBa_25IB5O7X), EMSfp506 (BBa_25FAVHQY), EMSfp569 (BBa_25TYRLM9), EMSfp642 (BBa_25GARG3E), EMSfp643 (BBa_2599SI53), and 1 common terminator tENO1 (BBa_K2753051) - yielding a total of 28 TU Recorders. Please note 3 out 4 promoters were inspired by Hodgins-Davis *et al.* (2019)[^9], the other pTDH3 (BBa_K3190001) is the strongest promoter test by Lee *et al.* (2015)[^4]. By comparing fluorescence changes between the EMS-treated group and the control group, we [screened out](/measurement/) the combination with the most significant variation as the optimal pair, which was then integrated into the 16 chromosomes of yeast using [our homologous arms collection](https://registry.igem.org/collections/b64cd4a7-59f1-4dae-83a7-909b69a778d0).

In [the YTK Toolkit](https://www.addgene.org/kits/moclo-ytk/) developed by Lee *et al.* (2015)[^5], pYTK096 is a *URA3* integration vector pre-assembled from the following parts: Type 7 (the URA3 3' homology arm), Type 8a (the *E. coli* replication origin + kanamycin resistance marker + flanking [NotI](https://www.neb.com/en/products/r3189-noti-hf) sites), and Type 8b (the URA3 5' homology arm). This design allows the vector to be linearized by [NotI](https://www.neb.com/en/products/r3189-noti-hf) digestion prior to transformation. Any TU (Type 2+3+4) put into pYTK096, would be stable, single-copy chromosomal integration at *URA3* locus.

All 28 [TU Recorders](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30) expressing yeast strains were made with the following steps:

1. Assembly into pYTK096 integration vector;
2. Linearize by [NotI](https://www.neb.com/en/products/r3189-noti-hf) digestion, which exposes the *URA3* homology arms;
3. Transform yeast strain [BY4741](https://www.yeastgenome.org/strain/by4741), followed by integration into the chromosomal *URA3* locus via homologous recombination;
4. Confirm integration through *URA3* phenotypic selection and PCR verification (a fragment of approximately 500 bp can be amplified upon correct integration).

We showcase the results of [NotI]((https://www.neb.com/en/products/r3189-noti-hf)) digest and Phire ([a commercial PCR Master Mix](https://www.thermofisher.com/order/catalog/product/F160S)) amplification on corressponding [iGEM Registry pages](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30).

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


## Collection 3:  [Sites of Integration to Assess Chromosomal Instability](https://registry.igem.org/collections/b64cd4a7-59f1-4dae-83a7-909b69a778d0) in *Saccharomyces cerevisiae*

In synthetic biology, efficient and predictable genome integration is fundamental for constructing complex biological systems and accelerating the engineering cycle. To address this need, we have assembled the [Homologous Arms Integration Collection](https://registry.igem.org/collections/b64cd4a7-59f1-4dae-83a7-909b69a778d0) for *Saccharomyces cerevisiae*, covering all 16 chromosomes. This collection not only incorporates previously validated safe integration sites, but also extends to novel replacement-based strategies to another 6 dangerous integration sites, providing future [iGEM teams](https://teams.igem.org/) with a powerful, flexible, and standardized solution.

There two groups homologous arms in [this collection](https://registry.igem.org/collections/b64cd4a7-59f1-4dae-83a7-909b69a778d0):

### 10 Safe Integration Sites

Shaw *et al.* (2023) designed 10 sets of safe integration sites located on different chromosomes of the [S288C](https://www.yeastgenome.org/strain/s288c) strain *Saccharomyces cerevisiae*. The selection and design of these integration sites were rigorously based on four standards[^13]:

1. **Minimize Host Cell Impact:** To ensure that the integration of the foreign DNA into the host genome has the least possible disruptive effect on the yeast cell's essential physiology.
2. **Maximize Integration Efficiency and Stability:** To increase the likelihood of achieving highly efficient and stable integration of the genetic constructs.
3. **Highly Conserved in Common Strains:** To guarantee that the loci are well-conserved across common laboratory strains of *S. cerevisiae*, thereby ensuring the broad utility and portability of the toolkit.
4. **Directly Amenable to CRISPR-Cas9 Manipulation:** To make these sites readily accessible and targetable for precise editing using CRISPR-Cas9 technology. Please note in our project, no gRNA nor Cas9 were introduced into yeast.

To uphold these principles, Shaw *et al.* (2023) picked 10 sites because they reside in true intergenic regions (non-coding DNA), being located more than 1 kb from any known gene's start codon and more than 0.5 kb from its stop codon.

Furthermore, we recognized that these integration sites exhibit varying distances from the centromere across the chromosomes. We hypothsize that during yeast growth, sites located farther from the centromere undergo more frequent recombination events, leading to greater genetic variation. The question of whether these variations can be recorded was part of the inspiration behind our [design](/design/) of the [TU Recorders](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30).

Table 3. Integration Sites with varying distances to the centromere

| Part number  |  Part name   |     Integration Loci     |
| :----------: | :----------: | :----------------------: |
| BBa_250U3B6G | HR5'\_Chr1L  |  ChrI: 169,422-169,940   |
| BBa_25GQIZIK | HR3'\_Chr1R  |  ChrI: 169,942-170,478   |
| BBa_253K1B8N | HR5'\_Chr4L  |  ChrIV: 359,868-360,355  |
| BBa_25P0EZQP | HR3'\_Chr4R  |  ChrIV: 360,356-360,897  |
| BBa_2552AC6E | HR5'\_Chr6L  |   ChrVI: 10,278-10,913   |
| BBa_25IULUBT | HR3'\_Chr6R  |   ChrVI: 10,914-11,424   |
| BBa_25ZYL3GW | HR5'\_Chr7L  |  ChrVII: 12,472-12,982   |
| BBa_25H1VEJW | HR3'\_Chr7R  |  ChrVII: 12,983-13,498   |
| BBa_25FYK3TX | HR5'\_Chr8L  | ChrVIII: 191,015-191,539 |
| BBa_25PJP4LG | HR3'\_Chr8R  | ChrVIII: 191,540-192,044 |
| BBa_25FUWBU7 | HR5'\_Chr9L  |  ChrIX: 340,431-340,933  |
| BBa_25PDQZ8Z | HR3'\_Chr9R  |  ChrIX: 340,935-341,523  |
| BBa_25DIWZUL | HR5'\_Chr11L |   ChrXI: 24,931-25,451   |
| BBa_257IAIOG | HR3'\_Chr11R |   ChrXI: 25,452-25,963   |
| BBa_25F4SCLY | HR5'\_Chr13L | ChrXIII: 408,123-408,657 |
| BBa_25GCY7VQ | HR3'\_Chr13R | ChrXIII: 408,658-409,161 |
| BBa_25B7ZBSD | HR5'\_Chr15L |  ChrXV: 686,950-687,450  |
| BBa_25Q3F2B3 | HR3'\_Chr15R |  ChrXV: 687,451-687,964  |
| BBa_25RRB2RQ | HR5'\_Chr16L | ChrXVI: 569,995-570,541  |
| BBa_25U7CTYJ | HR3'\_Chr16R | ChrXVI: 570,542-571,023  |



### 6 Dangerous Integration Sites

To provide comprehensive coverage across the yeast genome, we analyzed genome-wide stability data to identify locus whose perturbation could potentially disrupt chromosomal integrity. The rationale for selecting these six dangerous integration sites was guided by quantitative findings from Puddu *et al.* (2019)[^14], which systematically characterized genomic instability across *Saccharomyces cerevisiae* deletion strains.

In this landmark work, the authors analyzed over one thousand yeast isolates and knockout mutants to explore the causes of chromosomal aneuploidy and genome instability. Their results showed that deletion of certain genes markedly increases genome instability, often leading to chromosomal gain or loss, genome duplication, and altered karyotypes.[^14] These rearrangements were strongly associated with antifungal drug resistance. Their finding indicates that perturbations leading to genome duplication can also create opportunities for evolutionary innovation, as the extra genomic content allows cells to rewire gene expression and acquire new functions. Consistently, a recent study by Tong *et al.* (2025)[^2], observed whole-genome duplication upon daily selection for larger size, over 1000 days.

Building on these insight, we hypothesized that integrating [our TU Recorders](#collection-2-tu-recorders-using-ems-insensitive-fluorescent-protein) into locus associated with genome instability could allow us to record mutational events while simultaneously observing the potential emergence of adaptive phenotypes. In other words, while [the 10 safe integration sites](#10-safe-integration-sites) reported by Shaw *et al.* (2023) ensure genome stability[^13], [the 6 dangerous integration sites](#6-dangerous-integration-sites) we picked, provide a complementary perspective — a framework to study how instability itself may drive mutation, adaptation, and genomic evolution.

Using the dataset from Puddu *et al.* (2019)[^14], we examined indicators such as chromosomal copy number variation, genome duplication frequency, and inter-chromosomal effects. Based on these parameters, we selected 6 representative locus — *CAF*, *SWI4*, *DPB3*, *FEN2*, *SOD1*, and *BDF1* — each located on a distinct chromosome, where gene knockout was correlated with either:

1. Instability of other chromosomes;
2. Aneuploidy of the affected chromosome itself.

These loci represent genomic regions prone to rearrangement and serve as a useful contrast to [the safe integration sites](#10-safe-integration-sites) described by Shaw *et al.*. (2023)[^13]. Although we integrate [TU Recorders](#collection-2-tu-recorders-using-ems-insensitive-fluorescent-protein) rather than mutagenic drivers, including these instability-prone loci completes whole-genome chromosomal coverage and allows exploration of how genomic context impacts mutation capture and recording fidelity.

To support this rationale, we provide an reorganized summary table derived from Puddu *et al.*. (2019)[^14] supplementary information showing chromosomal copy number changes and genome stability indicators for *CAF*, *SWI4*, *DPB3*, *FEN2*, *SOD1*, and *BDF1* ([Supplementary Table](https://static.igem.wiki/teams/5643/pageimage/part/copy-of-supplementary-table-of-collection-3.csv)).

Table 4. [Sites of Integration to Assess Chromosomal Instability](https://registry.igem.org/collections/b64cd4a7-59f1-4dae-83a7-909b69a778d0) in *Saccharomyces cerevisiae*

| Part number  |      Part name       |    Integration Loci     |
| :----------: | :------------------: | :---------------------: |
| BBa_25ATGCHY | HR5'\_*DPB3*\_Chr2L  |  ChrII: 735469-735988   |
| BBa_25Y6BTXZ | HR3'\_*DPB3*\_chr2R  |  ChrII: 736574-737141   |
| BBa_25Q67BOD | HR5'\_*FEN2*\_Chr3L  |  ChrIII: 165465-165991  |
| BBa_25TEB42Q | HR3'\_*FEN2*\_Chr3R  |  ChrIII: 163418-163951  |
| BBa_25TMD7MC | HR5'\_*SWI4*\_Chr5L  |   ChrV: 390514-391024   |
| BBa_255A36IQ | HR3'\_*SWI4*\_Chr5R  |   ChrV: 386704-387244   |
| BBa_25CLCLXX | HR5'\_*SOD1*\_Chr10L |   ChrX: 601161-601690   |
| BBa_2533RATE | HR3'\_*SOD1*\_Chr10R |   ChrX: 600171-600723   |
| BBa_25MZORVY | HR5'\_*BDF1*\_Chr12L |  ChrXII: 867546-868044  |
| BBa_25R5XTI0 | HR3'\_*BDF1*\_Chr12R |  ChrXII: 864985-865484  |
| BBa_25U88LU3 | HR5'\_*CAF*\_Chr14L  |   ChrXIV: 82768-83297   |
| BBa_25O0GI56 | HR3'\_*CAF*\_Chr14R  |   ChrXIV: 84390-84957   |
| BBa_25U7CTYJ |     HR3'\_Chr16R     | ChrXVI: 570,542-571,023 |

In addition to [Shaw's primers](https://pubs.acs.org/doi/10.1021/acssynbio.3c00423#_i26) for verifying genome integration, we use the following primers as well

<pre>SOD1_5H_F56     5-CTGCACAAGATAAACTGAGATGACT
common_5H_R56   5-ccatctagatgcgaattcaggg    # paired with any _5H_Forward
common_3H_F58   5-gtgaatgctggtcgctatactg    # paired with any _3H_Reverse
SOD1_3H_R56     5-CAGTTCTACAGAATTTTTGGACGAG

CAF_5H_F56      5-CCAAGTGCATTTATTGAATGTTTTTGG
CAF_3H_R57      5-CTTTTGTCCTATCCGTATTTGTTTAGTTATTTTG

SWI4_5H_F56     5-CGCGTTTGAAGTGACGC
SWI4_3H_R58     5-CAAAGTTTGCTCAAGTTGACTTAGAAATTG

DPB3_5H_F56     5-CAGGTATCGCCCTCTCTATGAA
DPB3_3H_R57     5-CTGTTGAATTAGATTAGTGACGTTTGTTTTG

FEN2_5H_F58     5-CTTCAGAATAATTGTAATATTTACGCTTGCTTATTT
FEN2_3H_R57     5-CTTTTCATGGCCTGGCAATT

BDF1_5H_F59     5-GAATCTCGCAAGTCGCCT
BDF1_3H R58     5-GAACTGCTACTGAATCCCTCAGAC</pre>


### Summary

Together, these three collections establish a comprehensive toolkit for engineering, recording, and evaluating genomic behavior in multicellular *Saccharomyces cerevisiae*.

Starting from the [Grape Yeast](https://registry.igem.org/collections/5a15daa1-9c25-4fd7-9c31-aa4667c13141) chassis, which mimics pathogenic fungal morphology and membrane composition, we created a medically relevant and modular foundation for synthetic design. Building on this, the [TU Recorders](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30) enable direct visualization and quantification of mutation events through EMS sensitive promoters driven EMS-resistant fluorescent proteins, forming the core of our mutation-tracking system. Finally, by integrating these recorders into both [safe](#10-safe-integration-sites) and [dangerous](#6-dangerous-integration-sites) integration sites, we extended our investigation to the chromosomal level — examining how genome stability, duplication, and structural variation influence multicellular yeasts' adaptive evolution.

This multi-layered design not only expands the experimental versatility of yeast synthetic biology but also bridges the gap between stable genetic engineering and dynamic evolutionary processes, providing future [iGEM teams](https://teams.igem.org/) with a powerful framework for studying mutation, adaptation, and genomic resilience.


## Reference

[^1]:Ratcliff, W. C., Denison, R. F., Borrello, M., & Travisano, M. (2012). Experimental evolution of multicellularity. *Proceedings of the National Academy of Sciences of the United States of America*, *109*(5), 1595–1600. DOI: 10.1073/pnas.1115323109
[^2]:Tong, K., Datta, S., Cheng, V., Haas, D. J., Gourisetti, S., Yopp, H. L., Day, T. C., Lac, D. T., Khalil, A. S., Conlin, P. L., Bozdag, G. O., & Ratcliff, W. C. (2025). Genome duplication in a long-term multicellularity evolution experiment. *Nature*, *639*(8055), 691–699. DOI: 10.1038/s41586-025-08689-6
[^3]:Saputo, S., Chabrier-Rosello, Y., Luca, F. C., Kumar, A., & Krysan, D. J. (2012). The RAM network in pathogenic fungi. *Eukaryotic cell*, *11*(6), 708–717. DOI: 10.1128/EC.00044-12
[^4]:Brown, A. J., Dyos, S. L., Whiteway, M. S., White, J. H., Watson, M. A., Marzioch, M., Clare, J. J., Cousens, D. J., Paddon, C., Plumpton, C., Romanos, M. A., & Dowell, S. J. (2000). Functional coupling of mammalian receptors to the yeast mating pathway using novel yeast/mammalian G protein alpha-subunit chimeras. *Yeast (Chichester, England)*, *16*(1), 11–22. PMID: 10620771
[^5]:Lee, M. E., DeLoache, W. C., Cervantes, B., & Dueber, J. E. (2015). A Highly Characterized Yeast Toolkit for Modular, Multipart Assembly. **ACS synthetic biology**, **4**(9), 975–986. DOI: 10.1021/sb500366v
[^6]:Smith, H. E., Su, S. S., Neigeborn, L., Driscoll, S. E., & Mitchell, A. P. (1990). Role of IME1 expression in regulation of meiosis in Saccharomyces cerevisiae. *Molecular and cellular biology*, *10*(12), 6103–6113. DOI: 10.1128/mcb.10.12.6103-6113.1990
[^7]:Greenhalf, W., Stephan, C., & Chaudhuri, B. (1996). Role of mitochondria and C-terminal membrane anchor of Bcl-2 in Bax induced growth arrest and mortality in Saccharomyces cerevisiae. *FEBS letters*, *380*(1-2), 169–175. DOI: 10.1016/0014-5793(96)00044-0
[^8]:Bean, B. D. M., Mulvihill, C. J., Garge, R. K., Boutz, D. R., Rousseau, O., Floyd, B. M., Cheney, W., Gardner, E. C., Ellington, A. D., Marcotte, E. M., Gollihar, J. D., Whiteway, M., & Martin, V. J. J. (2022). Functional expression of opioid receptors and other human GPCRs in yeast engineered to produce human sterols. *Nature communications*, *13*(1), 2882. DOI: 10.1038/s41467-022-30570-7
[^9]:Subach, F. V., Subach, O. M., Gundorov, I. S., Morozova, K. S., Piatkevich, K. D., Cuervo, A. M., & Verkhusha, V. V. (2009). Monomeric fluorescent timers that change color from blue to red report on cellular trafficking. *Nature chemical biology*, *5*(2), 118–126. DOI: 10.1038/nchembio.138
[^10]:Bertrand, E., Chartrand, P., Schaefer, M., Shenoy, S. M., Singer, R. H., & Long, R. M. (1998). Localization of ASH1 mRNA particles in living yeast. *Molecular cell*, *2*(4), 437–445. DOI: 10.1016/s1097-2765(00)80143-4 ↩
[^11]:Brodsky, A. S., & Silver, P. A. (2000). Pre-mRNA processing factors are required for nuclear export. *RNA (New York, N.Y.)*, *6*(12), 1737–1749. DOI: 10.1017/s1355838200001059
[^12]:Hodgins-Davis, A., Duveau, F., Walker, E. A., & Wittkopp, P. J. (2019). Empirical measures of mutational effects define neutral models of regulatory evolution in *Saccharomyces cerevisiae*. *Proceedings of the National Academy of Sciences of the United States of America*, *116*(42), 21085–21093. DOI: 10.1073/pnas.1902823116
[^13]:Shaw, W. M., Khalil, A. S., & Ellis, T. (2023). A Multiplex MoClo Toolkit for Extensive and Flexible Engineering of *Saccharomyces cerevisiae*. *ACS synthetic biology*, *12*(11), 3393–3405. DOI: 10.1021/acssynbio.3c00423
[^14]:Puddu, F., Herzog, M., Selivanova, A., Wang, S., Zhu, J., Klein-Lavi, S., Gordon, M., Meirman, R., Millan-Zambrano, G., Ayestaran, I., Salguero, I., Sharan, R., Li, R., Kupiec, M., & Jackson, S. P. (2019). Genome architecture and stability in the Saccharomyces cerevisiae knockout collection. *Nature*, *573*(7774), 416–420. DOI: 10.1038/s41586-019-1549-9
