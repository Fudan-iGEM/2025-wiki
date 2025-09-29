---
title: design
authors:
  - name: Yining Zhao
    url: 
    avatar: 
layout: igem
heroImage: 
description: Design of DR. sTraTeGY.
---

# Overview

On this page, we introduce **DR. sTraTeGY**, a Drug Resistance mutation **Tracking** Technology based on Grape Yeast. Our approach combines synthetic biology with advanced modeling and visualization tools to provide an unprecedented view into the dynamics of resistance evolution.

- **The Problem:** The rapid rise of drug-resistant pathogens poses a serious threat to global health.
- **Our Solution:**DR. sTraTeGY, a modular, **multicellular yeast platform**, is a powerful tool designed to track fungal acquisition of drug resistance under selective pressure. This unique multicellular chassis turns the evolving population into a **physical, spatio-temporal lineage tree**, overcoming the limitations of static endpoint snapshots provided by unicellular systems.
- **Key Innovations:** The platform consists of a "Grape Yeast" chassis, the "Timer & Recorder" visualization modules, and the "YeastVerse" virtual experiment platform.

# How It Started?

Fungal pathogens cause a wide range of diseases that have a significant impact on plant and animal life. It's estimated that approximately 1.7 billion people are affected globally, with more than 1.5 million deaths annually[^1]. Treatment options for invasive fungal infections are extremely limited, with only five main classes of drugs currently available. The long-term abuse of antibiotics has led to the constant emergence of drug-resistant variants, making it crucial to study the mutation and evolution of fungi under drug pressure.

To address this challenge, we developed DR. sTraTeGY, an innovative platform built on a multicellular yeast chassis to track the evolutionary dynamics of fungal resistance. Our project is divided into three key components:

1. **Grape Yeast:** The core chassis engineered to be multicellular and responsive to external signals.
2. **Timer & Recorder:** A visualization toolkit to track the evolutionary history and selective pressure in real-time.
3. **YeastVerse:** A virtual experiment platform to guide our wet lab designs and simulate evolutionary processes.

<div style="text-align: center;" id="fig1">
    <img src="https://static.igem.wiki/teams/5643/pageimage/design/fig1-dr.webp" style="width:80%">
    <div>
        <span style="color:gray">Figure 1: DR. sTraTeGY overview</span>
        <br><br>
    </div>
</div>


# Constructing the Grape Yeast

## What is the Grape Yeast

To study fungal evolution, we focused on *Saccharomyces cerevisiae*, a classic model organism for eukaryotes and a widely used chassis in synthetic biology. It offers significant advantages, including a fully sequenced genome, mature genetic tools[^2], and a non-pathogenic nature with conserved resistance mechanisms[^3].  However, traditional methods that based on unicellular yeast like bulk sequencing provide only a static endpoint snapshot of evolving populations, making it challenging to capture low-frequency mutations or the real-time emergence of complex traits[^4].

To overcome this, we designed the **Grape Yeast**—a new modular chassis based on a multicellular yeast system. The multicellular structure of the Grape Yeast is what differentiates **DR. sTraTeGY** from traditional methods. While unicellular models provide only a static endpoint snapshot of evolving populations, the Grape Yeast cluster, when combined with our visualization modules, functions as a spatio-temporal lineage recorder. The physical linkage between mother and daughter cells allows us to observe a tree of resistance evolution in a single cluster, where the Timer tracks cell lineage and the Recorder logs selective pressure at different points in that lineage. This provides an unprecedented, real-time view into the dynamics of resistance evolution that low-frequency mutations or complex traits would mask in a conventional bulk culture.

We engineered this chassis through a simple four-module approach that allows us to achieve key functions: multicellularity development, external signal response, cluster size control, and individual diversity control.  In essence, these designs provide synthetic biology with a new chassis organism. Unlike conventional unicellular chassis that act mainly as simple cell factories, the multicellular Grape Yeast represents an efficient, controllable, and scalable engineered biological system. It functions more like an organized multicellular body—with spatial structure and division of labor among cells—similar to the natural paradigms of plants, animals, fungi, and algae. This highlights its potential not only as a production platform but also as a foundational model for exploring multicellular engineering.

<div style="text-align: center;" id="fig2">
    <img src="https://static.igem.wiki/teams/5643/pageimage/design/fig2-grapeyeast.webp" style="width:80%">
    <div>
        <span style="color:gray">Figure 2:  Constructing the Grape Yeast</span>
        <br><br>
    </div>
</div>




## *Module 1—Multicellularity Development*

The multicellular structure of the **Grape Yeast** is what differentiates **DR. sTraTeGY** from traditional methods. While bulk sequencing and unicellular models provide only a static endpoint snapshot of evolving populations, the Grape Yeast cluster, when combined with our visualization modules, functions as a spatio-temporal lineage recorder. The physical linkage between mother and daughter cells allows us to observe a tree of resistance evolution in a single cluster, where the Timer tracks cell lineage and the Recorder logs selective pressure at different points in that lineage. This provides an unprecedented, real-time view into the dynamics of resistance evolution that low-frequency mutations or complex traits would mask in a conventional bulk culture.

To ensure the stability of the introduced genes in our chassis, we decided to integrate the modules into the genome. However, given the time constraints and the fact that *S. cerevisiae* naturally exhibits highly efficient homologous recombination, we chose to rely on this endogenous mechanism instead of introducing the additional CRISPR-Cas9 system this year. This approach was adapted from the yeast modular DNA assembly methods described by Lee et al. [^6] and Shaw et al. [^7].

### *ACE2* Deletion

To validate the feasibility of a multifunctional multicellular chassis, we first used homologous recombination to knock out the  ACE2 gene in the Y55 strain (a unicellular yeast). ACE2 encodes a transcription factor that, when disrupted, prevents mother-daughter cell separation after budding[^8], leading to the formation of a multicellular yeast system. We confirmed the successful knockout by observing the formation of these clusters under a microscope.

## *Module2— External Signal Response*

Endogenous signaling pathways such as MAPK and calcineurin play central roles in regulating efflux pumps, cell wall remodeling, and stress responses, thereby shaping fungal drug resistance[^9]. This underscores the critical importance of external signal perception and membrane context in fungal biology. Building on this understanding, we introduced two key modifications into the Grape Yeast chassis: (1) the HsDOR–Gpa1 signaling pathway, and (2) the substitution of ergosterol with cholesterol in the membrane. The first one endows the chassis with the ability to respond to external signals, while the second not only facilitates proper insertion and function of human GPCRs but also mimics drug-resistant fungal membrane changes and enhances comparability with mammalian cells. In this way, Grape Yeast emerges as more than an engineered system for synthetic biology—it is also a novel multicellular chassis with value for drug resistance studies and cross-species translatability.

### 1) Replace ACE2 with HsDOR

Responding to external environmental signals is crucial for both fungal adaptation and synthetic control. Thus, in this module we expanded the signal transduction pathway,creating an interface that can be further utilized to respond to signals from other organisms or the environment by the community. GPCRs are among the most common drug targets in humans, highlighting their physiological relevance. We linked G-protein coupled receptors (GPCRs) to the yeast pheromone response pathway (PRP) which can activate a mitogen-activated protein kinase (MAPK) signaling cascade, leading to the upregulation of Ste12-regulated genes. 

While a complete modification of the GPCR system would require the knockout of a series of genes such as Ste2 to restrict native GPCR expression, due to the time constraints of the iGEM competition, we focused our efforts on modifying only the most critical genes.  We replaced *ACE2* with the human δ opioid receptor (*HsDOR*) (BBa_256S6J1M) and coupled it to the PRP via a Gpa1 chimera(BBa_254K9906) with five residues replaced by Giα3.We validated this pathway using the small molecule agonist SNC80 [^10].

### 2)Yeast Membrane Engineering

The ergosterol biosynthesis pathway is crucial, with ERG6 and ERG5 defining membrane sterol composition and influencing the expression and functionality of heterologously expressed human GPCRs. High ergosterol levels impair the proper insertion and activity of GPCRs in the yeast membrane. Consequently, deleting ERG5/6 and redirecting sterol flux toward cholesterol significantly enhances receptor efficiency[^10]. Furthermore, the resulting reduced ergosterol content mimics a phenotype associated with antifungal drug resistance[^11], offering a platform to investigate the impact of membrane composition on drug sensitivity and to identify non-ergosterol-related targets.

To leverage this for our application, we deleted *ERG5/6* and added TDH3p-driven zebrafish genes (*DHCR7/24*:BBa_25RCU5CB and BBa_25FOVO4C). This modification blocks ergosterol production and redirects zymosterol to cholesterol, which is necessary for the human receptor to function properly[^10]. We confirmed this modification using cholesterol staining.

<div style="text-align: center;" id="fig3">
    <img src="https://static.igem.wiki/teams/5643/pageimage/design/fig4-gpcr.webp" style="width:80%">
    <div>
        <span style="color:gray">Figure 3: Mechanism of external signal response</span>
        <br><br>
    </div>
</div>



## *Module 3—Controlling Cluster Size*

For increased control and safety, we introduced BAX(BBa_K5441013), an apoptosis-inducing protein, under the control of a pTet2 promoter. BAX is a pro-apoptotic member of the Bcl-2 protein family. When expressed in *S. cerevisiae*, it induces cell apoptosis via a mitochondria-related pathway[^12]. This mechanism allows us to control the size of our clusters and, if necessary, induce the apoptosis of the entire system. We verified the module's effectiveness by observing and analyzing the cluster size under a microscope.

## *Module* 4—*Controlling Individual Diversity*

Genomic instability can lead to cells acquiring multiple drug resistances in a short period. For example, changes in chromosome ploidy (e.g. from diploid to haploid) can result in the loss of sensitive genes, contributing to multi-drug resistance. This suggests a strong link between ploidy and resistance[^13].

To control individual diversity within the cluster, we introduced the meiosis-inducing gene Ime1(BBa_250R9OVR) under the control of a pTet2 promoter. Ime1 is an essential transcriptional activator for meiosis-specific gene expression. By interacting with other transcription factors, it activates genes involved in the meiotic process[^14]. We verified this module through cell size analysis and PI staining observed under a microscope.

<div style="text-align: center;" id="fig4">
    <img src="https://static.igem.wiki/teams/5643/pageimage/design/fig3-bax-ime.webp" style="width:80%">
    <div>
        <span style="color:gray">Figure 4: use Bax and Ime1 to control the grape yeast</span>
        <br><br>
    </div>
</div>








# Visualize the Evolution: The Timer & Recorder Extension

Our project features two simple yet powerful visualization tools designed to track evolutionary history and mutations. They can be directly integrated into the Grape Yeast chassis by replacing  *ACE2* or inserted at other desired locations.

## **Timer: Tracking Cell Lineage**

Microscopic observation alone cannot determine the chronological relationship between two neighboring cells. To address this, we developed the **Timer** module, which visually records a single cell's life cycle in real-time. The TU Timer (BBa_25AT6YR4) consists of an AI-optimized Ash1 promoter (Ash1 aipro), a modified-mCherry fluorescent protein, the Ash1 3'UTR, and the ScENO1terminator.

Modified mCherry is a mutant that changes color over time from blue ( which has excitation/emission peaks of 403/466nm) to red (which has excitation/emission peaks of 583/606)[^15]. To ensure it is only expressed in daughter cells, we used the Ash1 3'UTR, which localizes the mRNA to the bud tip of dividing daughter cells[^16]. Based on our modeling, we selected Ash1 aipro, a promoter optimized with the DeePromClass deep learning algorithm[^17], which initiates transcription during the late M phase[^18].

**Table: Spectral Properties of Modified mCherry**

| State (Color) | Excitation Peak (nm) | Emission Peak (nm) | Description                    |
| ------------- | -------------------- | ------------------ | ------------------------------ |
| Blue          | 403                  | 466                | Initial state after expression |
| Red           | 583                  | 606                | Matured state after conversion |

<div style="text-align: center;" id="fig5">
    <img src="https://static.igem.wiki/teams/5643/pageimage/design/fig5-timer.webp" style="width:80%">
    <div>
        <span style="color:gray">Figure 5: Design of the Timer</span>
        <br><br>
    </div>
</div>




## **Recorder: Recording Selective Pressure**

### **1) Building the  Recorder**

To intuitively record the pressure at different chromosomal loci during evolution, we developed the **Recorder** module. It contains a promoter designed to record mutations and a reporter fluorescent protein. We hypothesized that mutations in the promoter would affect the expression level of the reporter, allowing us to quantify the pressure by measuring fluorescence intensity. To impose stress, we applied ethyl methanesulfonate (EMS) mutagenesis to yeast, which predominantly induces single-nucleotide polymorphisms (SNPs), the most common mutation type in *S. cerevisiae*[^19]. We screened 24 combinations of four promoters[^20] and six optimized fluorescent proteins after EMS mutagenesis(For more details of EMS-resistant proteins,please check our [software](/software/)). Based on our [model](/model/)'s predictions, we selected the combination with the most significant change in brightness and named it the TU Recorder.

| Part ID                                                 | Name     | Description                          |
| ------------------------------------------------------- | -------- | ------------------------------------ |
| **Fluorescent Proteins (optimized for EMS resistance)** |          |                                      |
| BBa_25TYRLM9                                            | EMSfp569 | Optimized mScarlet to resist EMS.    |
| BBa_25IB5O7X                                            | EMSfp499 | Optimized mSG to resist EMS.         |
| BBa_25F6RD26                                            | EMSfp383 | Optimized eBFP2 to resist EMS.       |
| BBa_25GARG3E                                            | EMSfp642 | Optimized smURFP to resist EMS.      |
| BBa_25M2Z9H7                                            | EMSfp399 | Optimized Bluebonnet2 to resist EMS. |
| BBa_2599SI53                                            | EMSfp643 | Optimized miRFP670-2 to resist EMS.  |
| **Promoters**[^19]                                      |          |                                      |
| BBa_259JX52V                                            | pOST1    |                                      |
| BBa_K3748013                                            | pRNR2    |                                      |
| BBa_K530004                                             | pSTM1    |                                      |
| BBa_K3190001                                            | pTDH3    |                                      |



### **2) Multi-chromosomal Integration**

We integrated the TU Recorder into multiple chromosomes (chr2, 3, 5, 10, 12, 14) to study its stability and performance in different genomic environments.

### 3) **Long-Term Natural Evolution Tracking**

In the final version of our project, we integrated the TU Recorder into a "simplified grape yeast" strain(with only Ace2 removed), covering all 16 chromosomes (with the recorder replacing *ACE2* on chromosome 12). For this iteration, we no longer relied on EMS mutagenesis. Instead, we used **long-term cultivation and selective pressure** to induce the natural evolution of the strain to a diploid state. By utilizing **FACS analysis**, we were able to track changes in fluorescence over a period of seven days or more, allowing us to reconstruct the population's dynamics like reading a flight recorder.



# **YeastVerse: Our Virtual Experiment Platform**



Throughout this project, we fully embraced the "dry lab guiding wet lab" approach by creating **YeastVerse**, our virtual yeast simulation platform. YeastVerse, a portmanteau for "Yeast Metaverse," was used extensively to simulate the growth, division, protein expression, and external signal response of both Grape Yeast and normal unicellular yeast. This guided our wet lab work and visually demonstrated the advantage of Grape Yeast in tracking evolutionary history. YeastVerse is a powerful platform with various functional modules and adjustable parameters, serving as the "zero-th machine" for our Grape Yeast chassis. Please check our [model page](/model/) for more details.

<div style="text-align: center;" id="fig6">
    <img src="https://static.igem.wiki/teams/5643/pageimage/design/fig6-yeastverse.webp" style="width:80%">
    <div>
        <span style="color:gray">Figure 6: use digital YeastVerse to guide our wet lab</span>
        <br><br>
    </div>
</div>


# **Summary**

  - We successfully engineered a novel yeast chassis, the **Grape Yeast**, for studying fungal mutation and evolution under drug pressure. The modular design, including control modules and external signal interfaces, gives it unlimited potential for further modifications.
  - We developed two powerful extension modules, the **Timer** and **Recorder**, to visualize cell lineage and evolutionary pressure, respectively. These modules are designed as flexible plugins that can be widely used by the iGEM community.
  - We built the **YeastVerse** virtual simulation platform to guide our wet lab experiments. As the ""zero-th machine" for Grape Yeast, YeastVerse can be widely used for various experimental tests, providing crucial support for wet lab work.



# Reference

[^1]: Brown, G. D., Denning, D. W., Gow, N. A., Levitz, S. M., Netea, M. G., & White, T. C. (2012). Hidden killers: human fungal infections. *Science translational medicine*, *4*(165), 165rv13. https://doi.org/10.1126/scitranslmed.3004404
[^2]:Vanderwaeren, L., Dok, R., Voordeckers, K., Nuyts, S., & Verstrepen, K. J. (2022). *Saccharomyces cerevisiae* as a Model System for Eukaryotic Cell Biology, from Cell Cycle Control to DNA Damage Response. *International journal of molecular sciences*, *23*(19), 11665. https://doi.org/10.3390/ijms231911665
[^3]:Maneira, C., Chamas, A., & Lackner, G. (2025). Engineering Saccharomyces cerevisiae for medical applications. Microbial cell factories, 24(1), 12. https://doi.org/10.1186/s12934-024-02625-5
[^4]:Blundell, J. R., & Levy, S. F. (2014). Beyond genome sequencing: lineage tracking with barcodes to study the dynamics of evolution, infection, and cancer. Genomics, 104(6 Pt A), 417–430. https://doi.org/10.1016/j.ygeno.2014.09.005
[^5]: Bozdag, G. O., Zamani-Dahaj, S. A., Day, T. C., Kahn, P. C., Burnetti, A. J., Lac, D. T., Tong, K., Conlin, P. L., Balwani, A. H., Dyer, E. L., Yunker, P. J., & Ratcliff, W. C. (2023). De novo evolution of macroscopic multicellularity. *Nature*, *617*(7962), 747–754. https://doi.org/10.1038/s41586-023-06052-1
[^6]:Lee, M. E., DeLoache, W. C., Cervantes, B., & Dueber, J. E. (2015). A Highly Characterized Yeast Toolkit for Modular, Multipart Assembly. *ACS synthetic biology*, *4*(9), 975–986. https://doi.org/10.1021/sb500366v
[^7]: Shaw, W. M., Khalil, A. S., & Ellis, T. (2023). A Multiplex MoClo Toolkit for Extensive and Flexible Engineering of *Saccharomyces cerevisiae*. *ACS synthetic biology*, *12*(11), 3393–3405. https://doi.org/10.1021/acssynbio.3c00423
[^8]: Laabs, T. L., Markwardt, D. D., Slattery, M. G., Newcomb, L. L., Stillman, D. J., & Heideman, W. (2003). ACE2 is required for daughter cell-specific G1 delay in Saccharomyces cerevisiae. *Proceedings of the National Academy of Sciences of the United States of America*, *100*(18), 10275–10280. https://doi.org/10.1073/pnas.1833999100
[^9]:Després, P. C., Shapiro, R. S., & Cuomo, C. A. (2024). New approaches to tackle a rising problem: Large-scale methods to study antifungal resistance. PLoS pathogens, 20(9), e1012478. https://doi.org/10.1371/journal.ppat.1012478
[^10]:Bean, B. D. M., Mulvihill, C. J., Garge, R. K., Boutz, D. R., Rousseau, O., Floyd, B. M., Cheney, W., Gardner, E. C., Ellington, A. D., Marcotte, E. M., Gollihar, J. D., Whiteway, M., & Martin, V. J. J. (2022). Functional expression of opioid receptors and other human GPCRs in yeast engineered to produce human sterols. *Nature communications*, *13*(1), 2882. https://doi.org/10.1038/s41467-022-30570-7
[^11]:Young, L. Y., Hull, C. M., & Heitman, J. (2003). Disruption of ergosterol biosynthesis confers resistance to amphotericin B in Candida lusitaniae. Antimicrobial agents and chemotherapy, 47(9), 2717–2724. https://doi.org/10.1128/AAC.47.9.2717-2724.2003
[^12]:Zha, H., Fisk, H. A., Yaffe, M. P., Mahajan, N., Herman, B., & Reed, J. C. (1996). Structure-function comparisons of the proapoptotic protein Bax in yeast and mammalian cells. *Molecular and cellular biology*, *16*(11), 6494–6508. https://doi.org/10.1128/MCB.16.11.6494
[^13]:Ksiezopolska, E., & Gabaldón, T. (2018). Evolutionary Emergence of Drug Resistance in Candida Opportunistic Pathogens. *Genes*, *9*(9), 461. https://doi.org/10.3390/genes9090461
[^14]:Kassir, Y., Granot, D., & Simchen, G. (1988). IME1, a positive regulator gene of meiosis in S. cerevisiae. *Cell*, *52*(6), 853–862. https://doi.org/10.1016/0092-8674(88)90427-8
[^15]:Subach, F. V., Subach, O. M., Gundorov, I. S., Morozova, K. S., Piatkevich, K. D., Cuervo, A. M., & Verkhusha, V. V. (2009). Monomeric fluorescent timers that change color from blue to red report on cellular trafficking. *Nature chemical biology*, *5*(2), 118–126. https://doi.org/10.1038/nchembio.138
[^16]:Brodsky, A. S., & Silver, P. A. (2000). Pre-mRNA processing factors are required for nuclear export. *RNA (New York, N.Y.)*, *6*(12), 1737–1749. https://doi.org/10.1017/s1355838200001059
[^17]:Kari, H., Bandi, S. M. S., Kumar, A., & Yella, V. R. (2023). DeePromClass: Delineator for Eukaryotic Core Promoters Employing Deep Neural Networks. *IEEE/ACM transactions on computational biology and bioinformatics*, *20*(1), 802–807. https://doi.org/10.1109/TCBB.2022.3163418
[^18]:Yu, Y., Yarrington, R. M., & Stillman, D. J. (2020). FACT and Ash1 promote long-range and bidirectional nucleosome eviction at the HO promoter. *Nucleic acids research*, *48*(19), 10877–10889. https://doi.org/10.1093/nar/gkaa819
[^19]:Peter, J., De Chiara, M., Friedrich, A., Yue, J. X., Pflieger, D., Bergström, A., Sigwalt, A., Barre, B., Freel, K., Llored, A., Cruaud, C., Labadie, K., Aury, J. M., Istace, B., Lebrigand, K., Barbry, P., Engelen, S., Lemainque, A., Wincker, P., Liti, G., … Schacherer, J. (2018). Genome evolution across 1,011 Saccharomyces cerevisiae isolates. *Nature*, *556*(7701), 339–344. https://doi.org/10.1038/s41586-018-0030-5
[^20]:Hodgins-Davis, A., Duveau, F., Walker, E. A., & Wittkopp, P. J. (2019). Empirical measures of mutational effects define neutral models of regulatory evolution in *Saccharomyces cerevisiae*. *Proceedings of the National Academy of Sciences of the United States of America*, *116*(42), 21085–21093. https://doi.org/10.1073/pnas.1902823116