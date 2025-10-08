---
title: Design
authors:
  - name: Yining Zhao
    url: /fudan/team/#Yining
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/zyn-a.webp
  - name: Zhiqin Wang
    url: /fudan/team/#Zhiqin
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/wzq-a.webp
layout: igem
heroImage: https://static.igem.wiki/teams/5643/pageimage/design/design-headmap.webp
description: On this page, we describe DR. sTraTeGY, a Drug Resistance mutation Tracking Technology based on Grape Yeast.
---

<script setup>
import ChromosomeVisualization from '../.vitepress/components/ChromosomeVisualization.vue'
</script>

## Overview

On this page, we introduce DR. sTraTeGY, a Drug Resistance mutation Tracking Technology based on Grape Yeast. Our approach combines synthetic biology with advanced modeling and visualization tools to provide an unprecedented view into the dynamics of resistance evolution.

- The Problem: The rapid rise of drug-resistant pathogens poses a serious threat to global health.
- Our Solution: DR. sTraTeGY, a modular, multicellular yeast platform, is a powerful tool designed to track fungal acquisition of drug resistance under selective pressure. This unique multicellular chassis turns the evolving population into a physical, spatio-temporal lineage tree, overcoming the limitations of static endpoint snapshots brought by unicellular systems.
- Key Innovations: The platform consists of a "Grape Yeast" chassis, the "Timer &amp; Recorder" visualization modules, and the "YeastVerse" virtual experiment platform.

## How It Started?

Fungal pathogens cause a wide range of diseases that have a significant impact on plant and animal life. It's estimated that approximately 1.7 billion people are affected globally, with more than 1.5 million deaths annually[^1]. Treatment options for invasive fungal infections are extremely limited, with only five main classes of drugs currently available. The long-term abuse of antibiotics has led to the constant emergence of drug-resistant variants, making it crucial to study the mutation and evolution of fungi under drug pressure.

To address this challenge, we developed DR. sTraTeGY, an innovative platform built on a multicellular yeast chassis to track the evolutionary dynamics of fungal resistance. Our project is divided into three key components:

1. Grape Yeast: The chassis engineered to be multicellular and responsive to external signals.
2. Timer &amp; Recorder: A visualization toolkit to track the evolutionary history and selective pressure in real-time.
3. YeastVerse: A virtual experiment platform to guide our wet lab designs and simulate evolutionary processes.

<div style="text-align: center;" id="fig1">
    <img src="https://static.igem.wiki/teams/5643/pageimage/design/fig1-dr-strategy.webp" style="width:80%">
    <div>
        <span style="color:gray">Figure 1. DR. sTraTeGY overview</span>
        <br><br>
    </div>
</div>



## Constructing the Grape Yeast

### What is the Grape Yeast

To study fungal evolution, we focused on *Saccharomyces cerevisiae*, a classic model organism for eukaryotes and a widely used chassis in synthetic biology. It offers significant advantages, including a fully sequenced genome, mature genetic tools[^2], and a non-pathogenic nature with conserved resistance mechanisms[^3].  However, traditional methods that based on unicellular yeast like bulk sequencing provide only a static endpoint snapshot of evolving populations, making it challenging to capture low-frequency mutations or the real-time emergence of complex traits[^4].

To overcome this, we designed the Grape Yeast—a new modular chassis based on a multicellular yeast system[^5]. The multicellular structure of the Grape Yeast is what differentiates DR. sTraTeGY from traditional methods. While unicellular models provide only a static endpoint snapshot of evolving populations, the Grape Yeast cluster, when combined with our visualization modules, functions as a spatio-temporal lineage recorder. The physical linkage between mother and daughter cells allows us to observe a tree of resistance evolution in a single cluster, where the [Timer](#timer-tracking-cell-lineage) tracks cell lineage and the [Recorder](#recorder) logs selective pressure at different points in that lineage. This provides an unprecedented, real-time view into the dynamics of resistance evolution that low-frequency mutations or complex traits would mask in a conventional bulk culture.

We engineered this chassis through a simple four-module approach that allows us to achieve key functions: multicellularity development, external signal response, cluster size control, and individual diversity control.  In essence, these designs provide synthetic biology with a new chassis organism. Unlike conventional unicellular chassis that act mainly as simple cell factories, the multicellular Grape Yeast presents an efficient, controllable, and scalable engineered biological system. It functions more like an organized multicellular body—with spatial structure and division of labor among cells—similar to the natural paradigms of plants, animals, fungi, and algae. This highlights its potential not only as a production platform but also as a foundational model for exploring multicellular engineering.

<div style="text-align: center;" id="fig2">
    <img src="https://static.igem.wiki/teams/5643/pageimage/design/figure2-grapeyeast.webp" style="width:80%">
    <div>
        <span style="color:gray">Figure 2. Constructing the Grape Yeast</span>
        <br><br>
    </div>
</div>




### Module 1—Multicellularity Development

#### Inspiration and Mechanistic Basis

The earliest description of multicellularity in yeast was reported by Ratcliff et al.[^24], which served as the primary inspiration for our project. In that seminal study, Saccharomyces cerevisiae (strain Y55) was subjected to gravity-based selection, favoring cells with a rapid sedimentation phenotype. Multicellular aggregates were observed after just 60 transfers.

Subsequent reports have revealed a strong correlation between this emergent multicellularity and the loss-of-function of the ACE2 gene. Furthermore, during the process of directed evolution, it was consistently observed that diploid yeast rapidly evolve to become tetraploid.

To ensure the stability of the introduced genes in our chassis, we decided to integrate the modules into the genome. However, given the time constraints and the fact that *S. cerevisiae* naturally exhibits highly efficient homologous recombination, we strategically chose to rely on this endogenous mechanism instead of introducing the additional CRISPR-Cas9 system(which might cause safety problems) this year. This approach was adapted from the yeast modular DNA assembly methods described by Lee et al. [^6] and Shaw et al. [^7].

#### *ACE2* Deletion

To validate the feasibility of a multifunctional multicellular chassis, we first used homologous recombination to knock out the  *ACE2* gene in the Y55 strain (a unicellular yeast).

*ACE2* encodes a transcription factor that, when disrupted, prevents mother-daughter cell separation after budding[^8], leading to the formation of a multicellular yeast system. 

We confirmed the successful knockout by observing the formation of multicellular clusters, clearly visualized through cell wall staining under a microscope.


### Module2— External Signal Response

Endogenous signaling pathway play central roles in regulating efflux pumps, cell wall remodeling, and stress responses, thereby fundamentally shaping fungal drug resistance[^10]. This underscores the critical importance of external signal perception and membrane context in fungal biology. Building on this understanding, we introduced two key modifications into the Grape Yeast chassis: 

(1) the HsDOR-PRP signaling pathway: The HsDOR-PRP system endows the chassis with the ability to respond to specific external chemical signals.

(2) Membrane Re-engineering: The substitution of native ergosterol with cholesterol. This modification not only facilitates the proper function of human GPCRs but also mimics a drug-resistant fungal membrane phenotype, enhancing its comparability with mammalian cells.

Collectively, these two modules transform the Grape Yeast into more than a synthetic biology system—it emerges as a novel multicellular chassis with high value for drug resistance studies and cross-species translatability.


#### 1) Rewiring the Pheromone Response: HsDOR Integration

Sensing and responding to environmental cues is essential for fungal adaptation and for enabling advanced synthetic regulation. In this module, we extended the native signal transduction network to create a versatile interface that the community can later use to detect signals from other organisms or the environment. Given that G-protein coupled receptors (GPCRs) are among the most frequent drug targets in humans, they are particularly physiologically relevant targets for synthetic biology.

Based on previous studies (Bean et al., 2022)[^11], we engineered yeast to activate to their native pheromone response pathway (PRP) via a heterologous GPCR, thereby triggering a MAPK signaling cascade and enhancing the expression of Ste12-regulated genes(Figure 3).

While a complete modification of the GPCR system would ideally require the knockout of a series of genes such as Ste2 to restrict native GPCR expression, due to the time constraints of the iGEM competition, we focused on the most critical modifications: We replaced *ACE2* with the human &delta; opioid receptor (*HsDOR*, BBa_256S6J1M) and coupled it to the PRP via a Gpa1 chimera(BBa_254K9906) in which five key residues were replaced with those from Gi&alpha; to ensure functional heterologous coupling.

<div style="text-align: center;" id="fig3">
    <img src="https://static.igem.wiki/teams/5643/pageimage/design/gpcr1007.webp" style="width:80%">
    <div>
        <span style="color:gray">Figure 3. Mechanism of external signal response.We rewired the yeast pheromone response pathway by replacing ACE2 with human δ opioid receptor (HsDOR) and coupling it via a Gpa1–Giα3 chimera, enabling MAPK activation and validated by the agonist SNC80</span>
        <br><br>
    </div>
</div>

We validated this pathway using the small molecule agonist SNC80 [^11].The system activates the MAPK cascade and the STE12 transcription factor to regulate downstream genes. To confirm this, we quantified FUS3 and STE2 expression by qPCR[^25] (Table 1), as both are well-known Ste12 targets that indicate pathway activation.


<div style="text-align: center;">
        <span style="color:gray">Table 1. Primers used for the qPCR validation</span>
        <br>
</div>

| Gene/Reference Gene | Forward Primer (5’&rarr;3’)   | Reverse Primer (5’&rarr;3’)   |
| ------------------- | ------------------------ | ------------------------ |
| FUS3                | 5-GAGCTAATGCAGACAGATTTA    | 5-CACTTTCACTGCTCTCAAG      |
| STE2                | 5-CCTTCTTGTGGCTTCTATTG     | 5-CGTCAGCATCAAACCTATC      |
| 5S                  | 5-GTTGCGGCCATATCTACCAGAAAG | 5-CGTATGGTCACCCACTACACTACT |


#### 2)Yeast Membrane Engineering

The ergosterol biosynthesis pathway is crucial, with *ERG6* and *ERG5* defining membrane sterol composition and influencing the expression and functionality of heterologously expressed human GPCRs. Crucially, elevated ergosterol levels disrupt the proper integration and function of GPCRs in the yeast membrane. Consequently, deleting *ERG5/6* and redirecting sterol flux toward cholesterol significantly enhances receptor efficiency[^11]. 

To leverage this for our application, we deleted *ERG5/6* and added TDH3p-driven zebrafish genes (*DHCR7/24*:BBa_25RCU5CB and BBa_25FOVO4C) through homologous recombination. This modification blocks ergosterol production and redirects zymosterol to cholesterol, which is necessary for the human receptor to function properly[^11]. We confirmed this modification using cholesterol staining.

Furthermore, the resulting reduced ergosterol content mimics a phenotype associated with antifungal drug resistance[^12], offering a platform to investigate the impact of membrane composition on drug sensitivity and to identify non-ergosterol-related targets.



### Module 3—Controlling Individual Diversity

Genomic instability can cause fungi to acquire multiple drug resistances in a short period. For example, changes in chromosome ploidy (e.g. from diploid to haploid) can result in the loss of sensitive genes, contributing to multi-drug resistance[^14]. Similarly, chromosome duplication can result in the upregulation of resistance-related genes[^26]. These findings suggest a strong correlation between ploidy and drug resistance.

To simulate this phenomenon, we introduced two strategies to control chromosomal ploidy.

First, we introduced the meiosis-inducing gene IME1(BBa_250R9OVR) under the control of a pTet2 promoter or pCUP1 promoter. Ime1 is an essential transcriptional activator for meiosis-specific gene expression. By interacting with other transcription factors, it activates genes involved in the meiotic process[^15]. We verified this module through cell size analysis and PI staining observed under a microscope.



<div style="text-align: center;" id="fig4">
    <img src="https://static.igem.wiki/teams/5643/pageimage/design/fig-ime1-compressed.webp" style="width:80%">
    <div>
        <span style="color:gray">Figure 4. Use Ime1 to control individual diversity</span>
        <br><br>
    </div>
</div>

Previous research has shown that during gravity-based selection, the Y55 (*ACE2* &Delta;) strain undergoes a ploidy shift from diploid (2x) to tetraploid (4x)[^9]. To mimic the liquid environment where drug resistance evolves in vivo, we further investigated the ploidy stability of the tetraploid Y55 strain during gravity-based passaging under G418 selection pressure. To isolate the specific effects of the antibiotic, we also performed comparative passaging experiments under both selective (G418) and non-selective (G418-free) conditions.


### Module 4—Controlling Cluster Size

To enhance controllability and safety, we introduced *BAX*(BBa_K5441013), an apoptosis-inducing protein, under the control of a pTet2 promoter or a pCUP1 promoter.

Bax is a pro-apoptotic member of the Bcl-2 protein family. When expressed in *S. cerevisiae*, it induces cell apoptosis via a mitochondria-mediated pathway[^13]. 
 
This mechanism allows us to control the size of our clusters and, when required, induce the apoptosis of the entire system. 

We verified the module's effectiveness by observing and analyzing the cluster size under a confocal microscope .

<div style="text-align: center;" id="fig5">
    <img src="https://static.igem.wiki/teams/5643/pageimage/design/fig-bax-compressed.webp" style="width:80%">
    <div>
        <span style="color:gray">Figure 5. Use BAX to control the cluter size</span>
        <br><br>
    </div>
</div>


## Visualize the Evolution: The Timer &amp; Recorder Extension

Our project features two simple yet powerful visualization modules designed to track evolutionary history and mutations. They can be directly integrated into the Grape Yeast chassis by replacing  *ACE2* or inserted at other desired locations.

### Timer: Tracking Cell Lineage

Microscopic observation alone cannot reveal the chronological relationship between two neighboring cells. To overcome this limitation, we developed the Timer module, which visually records a single cell's life cycle in real-time. 

The TU Timer (BBa_25AT6YR4) consists of an AI-optimized Ash1 promoter (Ash1 AIpro,BBa_25VHXKNL), a modified mCherry fluorescent protein(BBa_25TQG9WZ), the Ash1 3'UTR, and the ScENO1 terminator(BBa_K2753051).

The Timer matures in daughter cells based on model-guided selection of the Ash1 AIpro promoter (see [Model](/model/) page), and, together with the modified mCherry (see [Improved Part](/improve/) page), enables visualization of the cell life cycle.



<div style="text-align: center;" id="fig6">
    <img src="https://static.igem.wiki/teams/5643/pageimage/design/timer1008.avif" style="width:80%">
    <div>
        <span style="color:gray">Figure 6. Design of the Timer.The Timer module enables real-time visualization of a cell’s life cycle, shifting from blue to red fluorescence specifically in daughter cells after division.</span>
        <br><br>
    </div>
</div>





<h3 id="recorder">Recorder: Recording Selective Pressure</h3>

#### 1) Building the Recorder

To intuitively record the pressure at different chromosomal loci during evolution, we developed the Recorder module. It contains a promoter designed to record mutations and a reporter fluorescent protein. We hypothesized that mutations in the promoter would affect the expression level of the reporter protein, allowing us to quantify the pressure by measuring fluorescence intensity. 

To impose stress, we applied ethyl methanesulfonate (EMS) mutagenesis to yeast, which predominantly induces single-nucleotide polymorphisms (SNPs)(G/C->A/T), the most common mutation type in *S. cerevisiae*[^20].

To identify the optimal reporter configuration, we constructed a combinatorial library, testing four distinct promoters[^21] with seven of our EMS-optimized fluorescent proteins(The sequences of these proteins were designed to be EMS-resistant to eliminate the direct impact of EMS on their fluorescence; see our Software page
for details.). This promoter set was specifically chosen to capture a range of expression dynamics under EMS mutagenesis.Menawhile, to isolate the effects of the promoter-reporter interaction, a single, consistent terminator was used across all constructs, as its contribution to expression variance was presumed to be minor compared to that of the promoters[^6] [^23].

We screened 28 combinations of four promoters and seven optimized fluorescent proteins after EMS mutagenesis by FACS analysis and selected the combination with the most significant change in brightness and named it the TU Recorder.

<div style="text-align: center;">
        <span style="color:gray">Table 2. Optimized Fluorescent Proteins and Promoters for the Recorder Module</span>
        <br>
</div>

| DNA NAME           | DESCRIPTION                              | EXCITATION WAVELENGTH (NM) | EMISSION WAVELENGTH (NM) | Part ID      |
| ------------------ | ---------------------------------------- | -------------------------- | ------------------------ | ------------ |
| EMSfp383           | Optimized eBFP2 to resist EMS.           | 383                        | 448                      | BBa_25F6RD26 |
| EMSfp399           | Optimized Bluebonnet2 to resist EMS.     | 399                        | 454                      | BBa_25M2Z9H7 |
| EMSfp499           | Optimized mSG to resist EMS.             | 499                        | 510                      | BBa_25IB5O7X |
| EMSfp506           | Optimized NeolGreen to resist EMS.       | 506                        | 517                      | BBa_25FAVHQY |
| EMSfp569           | Optimized mScarlet to resist EMS.        | 569                        | 594                      | BBa_25TYRLM9 |
| EMSfp642           | Optimized smURFP to resist EMS.          | 642                        | 670                      | BBa_25GARG3E |
| EMSfp643           | Optimized miRFP670-2 to resist EMS.      | 643                        | 670                      | BBa_2599SI53 |
| **Promoters**[^21] |                                          |                            |                          |              |
| pOST1              | Remains stable                           |                            |                          | BBa_259JX52V |
| pRNR2              | Tends to decrease expression             |                            |                          | BBa_K3748013 |
| pSTM1              | Tends to increase expression             |                            |                          | BBa_K530004 |
| pTDH3              | A strong constitutive benchmark promoter |                            |                          | BBa_K3190001 |



#### 2) Long-Term Natural Evolution Tracking

To study its stability and performance in different genomic environments, we integrated the TU Recorder into a "simplified grape yeast" strain(with only *ACE2* removed), covering all 16 chromosomes. We selected sixteen chromosomal integration sites (one per chromosome), including both neutral "safe sites" without functional roles and "dangerous sites" that replace non-essential genes. 

To accurately reflect the natural genomic pressure during long-term evolution, the neutral sites—adapted from Shaw et al.[^7]—were chosen for their minimal influence on host physiology.

Following the reference dataset (Puddu et al., *Nature*, 2019)[^22], we introduced six risk loci whose deletion was reported to increase genome instability. In that study, 4,732 yeast knockout strains were sequenced to assess how the loss of each non-essential gene influences genome integrity, revealing frequent copy-number variations, nuclear–mitochondrial crosstalk, and adaptive chromosomal rearrangements.

We were particularly interested in such genomic alterations, as chromosomal duplication and rearrangement are closely related to the emergence of drug resistance—yeast often adapts to the environment by duplicating or losing the function of parts of its chromosomes. Based on the supplementary information, we selected loci whose gene deletions affect the ploidy or number of chromosomal rearrangements detected (GCR) on other chromosomes. For instance, replacing *SWI4* on chromosome V—a key subunit of the cell-cycle–dependent transcription complex that binds CCB elements with *SWI6*—alters the ploidy of chromosome II (2 &rarr; 2.65) and increases GCR to 5. Further details can be found in the Supporting Information.

In this iteration, we no longer relied on EMS mutagenesis. Instead, we used long-term cultivation and selective pressure to induce the natural evolution of the strain to a diploid state. By utilizing FACS analysis, we were able to track changes in fluorescence over a period of seven days or more, allowing us to reconstruct the population's dynamics like reading a flight recorder.

#### 3)Special Design for Homology Arm Entry

The Yeast Toolkit (YTK) and MoClo systems facilitate the construction of transcriptional units (TUs) by using standardized Level 1 assembly methods, such as the 234r GFP dropout cassette designed to accept Type 2 (Promoter), Type 3 (CDS), and Type 4 (Terminator) parts. However, efficiently swapping or integrating different homologous arms (HAs) into the final assembled plasmid presents a separate challenge. 

##### Homology Arm Entry Vector

To address this, we designed a dedicated Homology Arm Entry Vector based on pMTK078 (Shaw et al., 2023)[^7] and inspired by Sorida et al. (2023)[^27]. Our design incorporates two distinct cloning strategies: 
1) we introduced two Type IIP restriction enzymes sites, XhoI and XbaI, at the 5' end of the original 5' HA and the 3' end of the original 3' HA respectively, under whose digestion the whole 5'HA-Inserted Fragment-3'HA will be released; 
2) at the other end of 5'/3' HA, [BsmBI](https://www.neb.com/en/products/r0739-bsmbi-v2) sites are designed to release original 5'/3' HA and generate 4-nt flanks. 

All the flanks produced in this section do not overlap with any standard ends in YTK or the Multiplex Yeast Toolkit (MYT), so they will not conflict with other assembly and therefore ensured specific and correct ligation.

##### Standard preexisting 5'/3' Homology Arms

To replace the original HA and to enable [BsmBI](https://www.neb.com/en/products/r0739-bsmbi-v2) assembly into the entry vector, primers for amplifying preexisting HA should be designed as illustrated in Fig.序号 . Please note that the 4-nt at the end of primers should not be omitted, for they are essential for effective enzyme cleaving.

For 3'HA, we specially introduced two reversed [BbsI](https://www.thermofisher.com/order/catalog/product/FD1014) site, which can adapt to the MYT system in Shaw et al. (2023)[^7] for introducing selective marker. In addition, though not used in our project, we leave a PstI site, a design used in Shaw  et al. (2023)[^7] for transposition of gRNA arrays, which could be utilized if further researchers require.

<div style="text-align: center;" id="fig7">
    <img src="https://static.igem.wiki/teams/5643/pageimage/design/golden.webp" style="width:80%">
    <div>
        <span style="color:gray">Figure 7. Structure of Homology Arm Entry plasmid and Assembly of New Homology Arm..</span>
        <br><br>
    </div>
</div>

- For experiment details, please visit [Experiments | Fudan](/experiments/). The whole process could be completed without an intermediate purification step, which is both convenient and highly-efficient.

##### Verification for Integration in Yeasts

While Shaw et al.[^7] included additional barcodes within their homology arms primarily for PCR amplification and high-throughput, multiplexed quality control, our Recorder module has different priorities. Since our project only required verifying a few integrated sites and our construct was sensitive to DNA burden, we opted for a targeted integration analysis that avoids non-functional sequence additions.

We used two primer sets to confirm correct integration via junction analysis. The 5H Forward / 3H Reverse primers anneal to the native genome sequence, while the 5H Reverse / 3H Forward primers anneal to the inserted construct (specifically, the ConLS and AgTEF Terminator sequences)（Fig. 8）. This arrangement ensures that only precise integration at the target locus is amplified, yielding a band of near 500 bp. Native strains or off-target integrations will result in no amplification. 


<div style="text-align: center;" id="fig8">
    <img src="https://static.igem.wiki/teams/5643/pageimage/design/gg-l.webp" style="width:80%">
    <div>
        <span style="color:gray">Figure 8. Design of colony PCR primers for verification of chromosomal integrations.</span>
        <br><br>
    </div>
</div>


## Cloning Strategy

In our previous projects, our teams were used to Gibson Assembly for DNA construction. This year, however, we opted to utilize Golden Gate (GG) Assembly, primarily because GG's use of standardized Type IIS restriction sites eliminates the need to redesign homology arms for every new assembly junction, thereby enabling rapid, combinatorial construction and part reusability. 

Besides, GG offers crucial technical superiority by maintaining high fidelity even with difficult sequences (such as repetitive regions or secondary structures), effectively assembling small fragments, and ensuring vector integrity by avoiding 5′ exonuclease damage, all of which accelerated our timeline and ensured the system's required high fidelity[^27].



## YeastVerse: Our Virtual Experiment Platform

Throughout this project, we fully embraced the "dry-lab guiding wet-lab" approach by creating [YeastVerse](/model/), our virtual yeast simulation platform. YeastVerse, a portmanteau for "Yeast Metaverse," was used extensively to simulate the growth, division, protein expression, and external signal response of both Grape Yeast and normal unicellular yeast. This guided our wet lab work and visually demonstrated the advantage of Grape Yeast in tracking evolutionary history. YeastVerse is a powerful platform with various functional modules and adjustable parameters, serving as the "zero-th machine" for our Grape Yeast chassis. Please check our [Model](/model/) page for more details.

<div style="text-align: center;" id="fig9">
    <img src="https://static.igem.wiki/teams/5643/pageimage/design/fig6-yeast-verse.webp" style="width:80%">
    <div>
        <span style="color:gray">Figure 9. Use digital YeastVerse to guide our wet lab.Once we have an idea, we first conduct background research and collect relevant data. Then, we input this data into Yeastverse and obtain feedback, which helps guide the design and implementation of our wet lab experiments.</span>
        <br><br>
    </div>
</div>



## Summary

  - We successfully engineered a novel yeast chassis, the Grape Yeast, for studying fungal mutation and evolution under drug pressure. The modular design, including control modules and external signal interfaces, gives it unlimited potential for further modifications.

  - We developed two powerful extension modules, the Timer and Recorder, to visualize cell lineage and evolutionary pressure, respectively. These modules are designed as flexible plugins that can be widely used by the iGEM community.

  - We built the YeastVerse virtual simulation platform to guide our wet lab experiments. As the ""zero-th machine" for Grape Yeast, YeastVerse can be widely used for various experimental tests, providing crucial support for wet lab works.



## Reference

[^1]: Brown, G. D., Denning, D. W., Gow, N. A., Levitz, S. M., Netea, M. G., & White, T. C. (2012). Hidden killers: human fungal infections. *Science translational medicine*, *4*(165), 165rv13. DOI: 10.1126/scitranslmed.3004404

[^2]: Vanderwaeren, L., Dok, R., Voordeckers, K., Nuyts, S., & Verstrepen, K. J. (2022). *Saccharomyces cerevisiae* as a Model System for Eukaryotic Cell Biology, from Cell Cycle Control to DNA Damage Response. *International journal of molecular sciences*, *23*(19), 11665. DOI: 10.3390/ijms231911665

[^3]: Maneira, C., Chamas, A., & Lackner, G. (2025). Engineering Saccharomyces cerevisiae for medical applications. Microbial cell factories, 24(1), 12. DOI: 10.1186/s12934-024-02625-5

[^4]: Blundell, J. R., & Levy, S. F. (2014). Beyond genome sequencing: lineage tracking with barcodes to study the dynamics of evolution, infection, and cancer. Genomics, 104(6 Pt A), 417–430. DOI: 10.1016/j.ygeno.2014.09.005

[^5]: Bozdag, G. O., Zamani-Dahaj, S. A., Day, T. C., Kahn, P. C., Burnetti, A. J., Lac, D. T., Tong, K., Conlin, P. L., Balwani, A. H., Dyer, E. L., Yunker, P. J., & Ratcliff, W. C. (2023). De novo evolution of macroscopic multicellularity. *Nature*, *617*(7962), 747–754. DOI: 10.1038/s41586-023-06052-1

[^6]: Lee, M. E., DeLoache, W. C., Cervantes, B., & Dueber, J. E. (2015). A Highly Characterized Yeast Toolkit for Modular, Multipart Assembly. *ACS synthetic biology*, *4*(9), 975–986. DOI: 10.1021/sb500366v

[^7]: Shaw, W. M., Khalil, A. S., & Ellis, T. (2023). A Multiplex MoClo Toolkit for Extensive and Flexible Engineering of *Saccharomyces cerevisiae*. *ACS synthetic biology*, *12*(11), 3393–3405. DOI: 10.1021/acssynbio.3c00423

[^8]: Laabs, T. L., Markwardt, D. D., Slattery, M. G., Newcomb, L. L., Stillman, D. J., & Heideman, W. (2003). *ACE2* is required for daughter cell-specific G1 delay in Saccharomyces cerevisiae. *Proceedings of the National Academy of Sciences of the United States of America*, *100*(18), 10275–10280. DOI: 10.1073/pnas.1833999100

[^9]: Tong, K., Datta, S., Cheng, V., Haas, D. J., Gourisetti, S., Yopp, H. L., Day, T. C., Lac, D. T., Khalil, A. S., Conlin, P. L., Bozdag, G. O., & Ratcliff, W. C. (2025). Genome duplication in a long-term multicellularity evolution experiment. Nature, 639(8055), 691–699. DOI: 10.1038/s41586-025-08689-6

[^10]: Després, P. C., Shapiro, R. S., & Cuomo, C. A. (2024). New approaches to tackle a rising problem: Large-scale methods to study antifungal resistance. PLoS pathogens, 20(9), e1012478. DOI: 10.1371/journal.ppat.1012478

[^11]: Bean, B. D. M., Mulvihill, C. J., Garge, R. K., Boutz, D. R., Rousseau, O., Floyd, B. M., Cheney, W., Gardner, E. C., Ellington, A. D., Marcotte, E. M., Gollihar, J. D., Whiteway, M., & Martin, V. J. J. (2022). Functional expression of opioid receptors and other human GPCRs in yeast engineered to produce human sterols. *Nature communications*, *13*(1), 2882. DOI: 10.1038/s41467-022-30570-7

[^12]: Young, L. Y., Hull, C. M., & Heitman, J. (2003). Disruption of ergosterol biosynthesis confers resistance to amphotericin B in Candida lusitaniae. Antimicrobial agents and chemotherapy, 47(9), 2717–2724. DOI: 10.1128/AAC.47.9.2717-2724.2003

[^13]: Zha, H., Fisk, H. A., Yaffe, M. P., Mahajan, N., Herman, B., & Reed, J. C. (1996). Structure-function comparisons of the proapoptotic protein Bax in yeast and mammalian cells. *Molecular and cellular biology*, *16*(11), 6494–6508. DOI: 10.1128/MCB.16.11.6494

[^14]: Ksiezopolska, E., & Gabaldón, T. (2018). Evolutionary Emergence of Drug Resistance in Candida Opportunistic Pathogens. *Genes*, *9*(9), 461. DOI: 10.3390/genes9090461

[^15]: Kassir, Y., Granot, D., & Simchen, G. (1988). IME1, a positive regulator gene of meiosis in S. cerevisiae. *Cell*, *52*(6), 853–862. DOI: 10.1016/0092-8674(88)90427-8

[^16]: Kari, H., Bandi, S. M. S., Kumar, A., & Yella, V. R. (2023). DeePromClass: Delineator for Eukaryotic Core Promoters Employing Deep Neural Networks. *IEEE/ACM transactions on computational biology and bioinformatics*, *20*(1), 802–807. 

[^17]: Yu, Y., Yarrington, R. M., & Stillman, D. J. (2020). FACT and Ash1 promote long-range and bidirectional nucleosome eviction at the HO promoter. *Nucleic acids research*, *48*(19), 10877–10889. DOI: 10.1093/nar/gkaa819

[^18]: Subach, F. V., Subach, O. M., Gundorov, I. S., Morozova, K. S., Piatkevich, K. D., Cuervo, A. M., & Verkhusha, V. V. (2009). Monomeric fluorescent timers that change color from blue to red report on cellular trafficking. *Nature chemical biology*, *5*(2), 118–126. DOI: 10.1038/nchembio.138

[^19]: Brodsky, A. S., & Silver, P. A. (2000). Pre-mRNA processing factors are required for nuclear export. *RNA (New York, N.Y.)*, *6*(12), 1737–1749. DOI: 10.1017/s1355838200001059

[^20]: Peter, J., De Chiara, M., Friedrich, A., Yue, J. X., Pflieger, D., Bergström, A., Sigwalt, A., Barre, B., Freel, K., Llored, A., Cruaud, C., Labadie, K., Aury, J. M., Istace, B., Lebrigand, K., Barbry, P., Engelen, S., Lemainque, A., Wincker, P., Liti, G., … Schacherer, J. (2018). Genome evolution across 1,011 Saccharomyces cerevisiae isolates. *Nature*, *556*(7701), 339–344. DOI: 10.1038/s41586-018-0030-5

[^21]: Hodgins-Davis, A., Duveau, F., Walker, E. A., & Wittkopp, P. J. (2019). Empirical measures of mutational effects define neutral models of regulatory evolution in *Saccharomyces cerevisiae*. *Proceedings of the National Academy of Sciences of the United States of America*, *116*(42), 21085–21093. DOI: 10.1073/pnas.1902823116

[^22]: Puddu, F., Herzog, M., Selivanova, A., Wang, S., Zhu, J., Klein-Lavi, S., Gordon, M., Meirman, R., Millan-Zambrano, G., Ayestaran, I., Salguero, I., Sharan, R., Li, R., Kupiec, M., & Jackson, S. P. (2019). Genome architecture and stability in the Saccharomyces cerevisiae knockout collection. *Nature*, *573*(7774), 416–420. DOI: 10.1038/s41586-019-1549-9

[^23]: Niederau, P. A., Eglé, P., Willig, S., Parsons, J., Hoernstein, S. N. W., Decker, E. L., & Reski, R. (2024). Multifactorial analysis of terminator performance on heterologous gene expression in Physcomitrella. *Plant cell reports*, *43*(2), 43. DOI: 10.1007/s00299-023-03088-5

[^24]: Ratcliff, W. C., Denison, R. F., Borrello, M., & Travisano, M. (2012). Experimental evolution of multicellularity. Proceedings of the National Academy of Sciences of the United States of America, 109(5), 1595–1600. DOI: 10.1073/pnas.1115323109

[^25]: Ramos-Alonso, L., Garcia, I., Enserink, J. M., & Chymkowitch, P. (2022). Analysis of the pheromone signaling pathway by RT-qPCR in the budding yeast Saccharomyces cerevisiae. STAR protocols, 3(1), 101210. DOI: 10.1016/j.xpro.2022.101210

[^26]: Khateb, A., Gago, S., Bromley, M., Richardson, M., & Bowyer, P. (2023). Aneuploidy Is Associated with Azole Resistance in Aspergillus fumigatus. Antimicrobial agents and chemotherapy, 67(4), e0125322. DOI: 10.1128/aac.01253-22

[^27]: Sorida, M., & Bonasio, R. (2023). An efficient cloning method to expand vector and restriction site compatibility of Golden Gate Assembly. Cell reports methods, 3(8), 100564. DOI: 10.1016/j.crmeth.2023.100564 