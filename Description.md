---
title: Description
author:
  - name: Zuyao Wu, Yining Zhao
    url: （先不填）
    avatar: （头像，先不填）
layout: igem （勿动）
heroImage: （拍摄并且选取页面图像，作为顶部展示）
description: （页面描述）
---

## An Emerging Crisis

---

### ***Antimicrobial Resistance***

Fungi are responsible for a wide spectrum of human diseases, ranging from superficial infections to severe, life-threatening systemic mycoses. It's estimated that approximately 1.7 billion people are affected globally, with more than 1.5 million deaths annually. [^1]

Alarmingly, pathogenic fungi are now evolving resistance to nearly all licensed systemic antifungal drugs[^2], a trend that represents a serious yet often overlooked dimension of the global antimicrobial resistance crisis. 

【图片待传】

### ***Why did this happen?***

The global burden of these infections has been amplified by profound environmental change and the expansion of at-risk populations. Most importantly, this phenomenon reflects the broader consequences of long-term antibiotic misuse, where selective pressure has consistently driven the emergence and spread of resistant variants.

### ***The trend has to be stopped...***

Action is urgently needed before fungal resistance evolve beyond the limits of current human interventions. To act against this alarming trend of antimicrobial resistance, elucidating how fungi acquire resistance mutations and adapt under drug pressure is critical for anticipating resistance trajectories and informing future therapeutic strategies.

---

## What is the Goal of Our Project?

The overarching goal of the Fudan iGEM 2025 team is to develop an innovative platform built on a multicellular yeast chassis (which we call "grape yeast") to track the evolutionary dynamics of fungal resistance.  Our project, **DR. sTraTeGY** (Drug Resistance mutation Tracking Technology based on Grape Yeast), integrates a programmable living chassis with a complementary computational tool.

The core of our platform is the **Grape Yeast**, a novel multicellular chassis engineered to serve as a programmable evolutionary arena. This living system is designed to enable the study of multicellular development, external signal responses, cluster size control, and individual diversity. Besides, we have developed a suite of real-time visualization tools to track the process of evolution. To enable systematic prediction and pre-experimental testing of yeast behaviors across diverse environmental conditions, we also developed YeastVerse, a predictive computational platform.

These integrated designs allow the platform not only to observe but also to model and predict the dynamics of resistance evolution, providing a complete solution that goes beyond the capabilities of traditional, single-component tools in fungal resistance studies.



---

## What is Our Inspiration?

- **Yeast as chassis **

  Fungi are an important source of human pathogens (such as *Candida*), so using yeast makes it directly relevant to the study of antifungal resistance.  At the same time, yeast is a safe, non-pathogenic, and well-established model organism in both synthetic biology and evolutionary research, equipped with extensive genetic and experimental toolkits.[^3] 

- **Why multicellular yeast? **

  The multicellular yeast system[^4] developed by Ratcliff et al. represents a novel form of biological evolution that can be observed over relatively short timescales. Meanwhile, antimicrobial resistance is a manifestation of evolutionary processes. By linking these two phenomena, we leverage the multicellular system to both preserve lineage information and render the evolutionary dynamics of resistance directly visible.


---

## What Limitations are We Attempting to Overcome?

Many existing approaches to studying antimicrobial resistance are retrospective and static—they rely on analyzing clinical isolates or endpoint samples. These methods struggle with distinguishing the truly causative gene  mutations for resistance versus incidental; face high costs and time burdens for sample preparation, sequencing, and analysis; lack standardized protocols for comparing results across labs or conditions; and are often blind to lineage and temporal dynamics especially in real-world settings.[^5]

---

## What is Our Solution?

We developed DR. sTraTeGY, an innovative platform built on a multicellular yeast chassis to track the evolutionary dynamics of fungal resistance. Our project is divided into three key components:

1. **Grape Yeast:** The core robust chassis engineered to be multicellular and responsive to external signals.
2. **Timer & Recorder:** A visualization toolkit to track the evolutionary history and selective pressure in real-time.
3. **YeastVerse:** A virtual experiment platform to guide our wet lab designs and simulate evolutionary processes.

【MAP插图，我们的框架，大概就是dr.stategy分成三个模块，grape yeast，timer&recorder，yeastverse】

# Constructing the Grape Yeast

## *What is the Grape Yeast*

To study fungal evolution, we focused on *Saccharomyces cerevisiae*, a classic model organism for eukaryotes and a widely used chassis in synthetic biology. It offers significant advantages, including a fully sequenced genome, mature genetic tools[^6], and a non-pathogenic nature with conserved resistance mechanisms[^7].  However, traditional methods that based on unicellular yeast like bulk sequencing provide only a static endpoint snapshot of evolving populations, making it hard to capture low-frequency mutations or the real-time emergence of complex traits[^8].

To overcome this, we designed the **Grape Yeast**—a new modular chassis based on the multicellular yeast system[^9] developed by Ratcliff et al. We engineered this chassis through a simple four-module approach that allows us to achieve four key functions: Multicellularity development, cluster size control, individual diversity control, and external signal response. 

【MAP：插图，大概就是体现三个模块四个功能就行】

## *Module 1—Multicellularity Development*

Given that we needed to ensure the stability of the introduced genes in our chassis, we decided to integrate the modules into the genome. However, given the time constraints and the fact that *S. cerevisiae* naturally exhibits highly efficient homologous recombination, we chose to rely on this endogenous mechanism instead of introducing the additional CRISPR-Cas9 system this year. This approach was adapted from the yeast modular DNA assembly methods described by Lee et al. [^10] and Shaw et al. [^11].

### *ACE2* Deletion

To validate the feasibility of a multifunctional multicellular chassis, we first used homologous recombination to knock out the  ACE2 gene in the Y55 strain (a unicellular yeast). ACE2 encodes a transcription factor that, when disrupted, prevents mother-daughter cell separation after budding[^12], leading to the formation of a multicellular yeast system. We verified the successful knockout by observing the formation of these clusters under a microscope.

## *Module2—External Signal Response*

### 1) Replace *ACE2* with *HsDOR*

To enable the Grape Yeast to respond to external environmental signals, we leveraged the importance of G-protein coupled receptors(GPCRs), which serve as master regulators of diverse signaling cascades. GPCRs are among the most common drug targets in humans, highlighting their physiological relevance. Accordingly, we replaced *ACE2* with the human δ opioid receptor (*HsDOR*). We coupled *HsDOR* (BBa_256S6J1M) to the yeast pheromone response pathway (PRP) via a Gpa1 chimera (a Gα protein with five amino acid residues replaced by the endogenous *HsDOR*-interacting protein Giα3), which acts as an additional sensing route, thereby enabling controllable intercellular communication within our multicellular yeast system. We validated this pathway using the small molecule agonist SNC80[^13].



### 2)Yeast membrane engineering

To enhance the binding efficiency of HsDOR to its ligand, we engineered the cell membrane. We deleted *ERG5/6* and added TDH3p-driven zebrafish genes (*DHCR7/24*,BBa_25RCU5CB and BBa_25FOVO4C). This modification blocks ergosterol production and redirects zymosterol to cholesterol, which is necessary for the receptor to function properly[^9]. We confirmed this modification using cholesterol staining.

【回路的原理图】

【中文文献怎么引用？】

## *Module 3—Controlling Cluster Size*

For increased control and safety, we introduced Bax(BBa_K5441013), an apoptosis-inducing protein, under the control of a pTet2 promoter. Bax is a pro-apoptotic member of the Bcl-2 protein family. When expressed in *S. cerevisiae*, it induces cell apoptosis via a mitochondria-related pathway[^14]. This mechanism allows us to control the size of our clusters and, if necessary, induce the apoptosis of the entire system. We verified the module's effectiveness by observing and analyzing the cluster size under a microscope.

## *Module* 4—*Controlling Individual Diversity*

Genomic instability can lead to cells acquiring multiple drug resistances in a short period. For example, changes in chromosome ploidy (e.g., from diploid to haploid) can result in the loss of sensitive genes, contributing to multi-drug resistance. This suggests a strong link between ploidy and resistance[^15].

To control individual diversity within the cluster, we introduced the meiosis-inducing gene *IME1*(BBa_250R9OVR) under the control of a pTet2 promoter. Ime1 is an essential transcriptional activator for meiosis-specific gene expression. By interacting with other transcription factors, it activates genes involved in the meiotic process[^16]. We verified this module through cell size analysis and PI staining observed under a microscope.

【质粒图】

【microscope具体？】



# Visualize the Evolution: The Timer & Recorder Extension

Our project features two simple yet powerful visualization tools designed to track evolutionary history and mutations. They can be directly integrated into the Grape Yeast chassis by replacing *ACE2* or inserted at other desired locations.

## **Timer: Tracking Cell Lineage**

Microscopic observation alone can not determine the chronological relationship between two neighboring cells. To address this, we developed the **Timer** module, which visually records a single cell's life cycle in real-time. The TU Timer (composite part UID absent)consists of an AI-optimized Ash1 promoter (Ash1 aipro), a modified-mCherry fluorescent protein, the Ash1 3'UTR, and the ScENO1terminator.

Modified mCherry is a mutant that changes color over time from blue ( has excitation/emission peaks of 403/466nm) to red (has excitation/emission peaks of 583/606)[^17]. To ensure it is only expressed in daughter cells, we used the Ash1 3'UTR, which localizes the mRNA to the bud tip of dividing daughter cells[^18]. Based on our modeling, we selected Ash1 aipro, a promoter optimized with the DeePromClass deep learning algorithm[^19], which initiates transcription during the late M phase[^20].

【原理图】

**Table: Spectral Properties of Modified mCherry**

| State (Color) | Excitation Peak (nm) | Emission Peak (nm) | Description                    |
| ------------- | -------------------- | ------------------ | ------------------------------ |
| Blue          | 403                  | 466                | Initial state after expression |
| Red           | 583                  | 606                | Matured state after conversion |

## **Recorder: Recording Selective Pressure**

### **1) Building the  Recorder**

To intuitively record the pressure at different chromosomal loci during evolution, we developed the **Recorder** module. It contains a promoter designed to record mutations and a reporter fluorescent protein. We hypothesized that mutations in the promoter would affect the expression level of the reporter, allowing us to quantify the pressure by measuring fluorescence intensity. To impose stress, we applied ethyl methanesulfonate (EMS) mutagenesis to yeast, which predominantly induces single-nucleotide polymorphisms (SNPs), the most common mutation type in *S. cerevisiae*[^21]. We screened 24 combinations of four promoters[^22] and six optimized fluorescent proteins after EMS mutagenesis(For more details of EMS-resistant proteins,please check our [software](/software/)). Based on our [model](/model/)'s predictions, we selected the combination with the most significant change in brightness and named it the TU Recorder.

| Part ID                                                 | Name     | Description                          |
| ------------------------------------------------------- | -------- | ------------------------------------ |
| **Fluorescent Proteins (optimized for EMS resistance)** |          |                                      |
| BBa_25TYRLM9                                            | EMSfp569 | Optimized mScarlet to resist EMS.    |
| BBa_25IB5O7X                                            | EMSfp499 | Optimized mSG to resist EMS.         |
| BBa_25F6RD26                                            | EMSfp383 | Optimized eBFP2 to resist EMS.       |
| BBa_25GARG3E                                            | EMSfp642 | Optimized smURFP to resist EMS.      |
| BBa_25M2Z9H7                                            | EMSfp399 | Optimized Bluebonnet2 to resist EMS. |
| BBa_2599SI53                                            | EMSfp643 | Optimized miRFP670-2 to resist EMS.  |
| **Promoters**[^18]                                      |          |                                      |
| BBa_259JX52V                                            | pOST1    |                                      |
| BBa_K3748013                                            | pRNR2    |                                      |
| BBa_K530004                                             | pSTM1    |                                      |
| BBa_K3190001                                            | pTDH3    |                                      |



### **2) Multi-chromosomal Integration**

We integrated the TU Recorder into multiple chromosomes (chr2, 3, 5, 10, 12, 14) to study its stability and performance in different genomic environments.

### 3) **Simplified Yeast for Long-Term Tracking**

In the final version of our project, we integrated the TU Recorder into a "simplified grape yeast" strain, covering all 16 chromosomes (with the recorder replacing *ACE2* on chromosome 12). For this iteration, we no longer relied on EMS mutagenesis. Instead, we used long-term cultivation and selective pressure to induce the natural evolution of the strain to a diploid state. By utilizing FACS analysis, we were able to track changes in fluorescence over a period of seven days or more, allowing us to reconstruct the population's dynamics like reading a flight recorder.



# **YeastVerse: Our Virtual Experiment Platform**



Throughout this project, we fully embraced the "dry lab guiding wet lab" approach by creating **YeastVerse**, our virtual yeast simulation platform. YeastVerse, a portmanteau for "Yeast Metaverse," was used extensively to simulate the growth, division, protein expression, and external signal response of both Grape Yeast and normal unicellular yeast. This guided our wet lab work and visually demonstrated the advantage of Grape Yeast in tracking evolutionary history. YeastVerse is a powerful platform with various functional modules and adjustable parameters, serving as the "zero-th machine" for our Grape Yeast chassis. Please check our [model page](/model/) for more details.

【待：插图】

---

## In Conclusion

- We successfully engineered a novel multicellular yeast chassis, the **Grape Yeast**, to directly study fungal evolution and drug resistance under selective pressure. 

- To capture evolutionary dynamics in real time, we developed two extension modules: the **Timer**, which preserves and visualizes cell lineage continuity, and the **Recorder**, which reports chromosomal changes under stress. Both are designed as flexible, plug-and-play tools for the wider iGEM community.

- We further established the **YeastVerse** virtual simulation platform as the “zero-th machine” of Grape Yeast, enabling in silico testing and optimization that closely supports and accelerates wet-lab experimentation.

---

## Future Impacts and Significance

The DR.sTraTeGY platform is a powerful testament to the potential of synthetic biology to address pressing global challenges. Its modular architecture—with programmable control units and signal interfaces—offers broad adaptability for future extensions. The innovation of this project lies in the synergistic combination of its modules, making it a comprehensive tool that is far greater than the sum of its parts. We believe DR.sTraTeGY holds immense potential for accelerating the development of new antifungal drugs, deepening our understanding of evolutionary biology, and serving as a critical component of humanity's defense against microbial threats.

---

## References：

[^1]: Bongomin F, Gago S, Oladele RO, Denning DW. Global and Multi-National Prevalence of Fungal Diseases-Estimate Precision. *J Fungi (Basel)*. 2017;3(4):57. Published 2017 Oct 18. doi:10.3390/jof3040057
[^2]: Fisher MC, Alastruey-Izquierdo A, Berman J, et al. Tackling the emerging threat of antifungal resistance to human health. *Nat Rev Microbiol*. 2022;20(9):557-571. doi:10.1038/s41579-022-00720-1
[^3]: Vanderwaeren, L., Dok, R., Voordeckers, K., Nuyts, S., & Verstrepen, K. J. (2022). *Saccharomyces cerevisiae* as a Model System for Eukaryotic Cell Biology, from Cell Cycle Control to DNA Damage Response. *International journal of molecular sciences*, *23*(19), 11665. https://doi.org/10.3390/ijms231911665
[^4]:Bozdag, G. O., Zamani-Dahaj, S. A., Day, T. C., Kahn, P. C., Burnetti, A. J., Lac, D. T., Tong, K., Conlin, P. L., Balwani, A. H., Dyer, E. L., Yunker, P. J., & Ratcliff, W. C. (2023). De novo evolution of macroscopic multicellularity. *Nature*, *617*(7962), 747–754. https://doi.org/10.1038/s41586-023-06052-1 
[^5]:Blundell, J. R., & Levy, S. F. (2014). Beyond genome sequencing: lineage tracking with barcodes to study the dynamics of evolution, infection, and cancer. Genomics, 104(6 Pt A), 417–430. https://doi.org/10.1016/j.ygeno.2014.09.005
[^6]: Vanderwaeren, L., Dok, R., Voordeckers, K., Nuyts, S., & Verstrepen, K. J. (2022). *Saccharomyces cerevisiae* as a Model System for Eukaryotic Cell Biology, from Cell Cycle Control to DNA Damage Response. *International journal of molecular sciences*, *23*(19), 11665. https://doi.org/10.3390/ijms231911665
[^7]: Maneira, C., Chamas, A., & Lackner, G. (2025). Engineering Saccharomyces cerevisiae for medical applications. Microbial cell factories, 24(1), 12. https://doi.org/10.1186/s12934-024-02625-5
[^8]: Blundell, J. R., & Levy, S. F. (2014). Beyond genome sequencing: lineage tracking with barcodes to study the dynamics of evolution, infection, and cancer. Genomics, 104(6 Pt A), 417–430. https://doi.org/10.1016/j.ygeno.2014.09.005
[^9]: Bozdag, G. O., Zamani-Dahaj, S. A., Day, T. C., Kahn, P. C., Burnetti, A. J., Lac, D. T., Tong, K., Conlin, P. L., Balwani, A. H., Dyer, E. L., Yunker, P. J., & Ratcliff, W. C. (2023). De novo evolution of macroscopic multicellularity. *Nature*, *617*(7962), 747–754. https://doi.org/10.1038/s41586-023-06052-1
[^10]: Lee, M. E., DeLoache, W. C., Cervantes, B., & Dueber, J. E. (2015). A Highly Characterized Yeast Toolkit for Modular, Multipart Assembly. *ACS synthetic biology*, *4*(9), 975–986. https://doi.org/10.1021/sb500366v
[^11]: Shaw, W. M., Khalil, A. S., & Ellis, T. (2023). A Multiplex MoClo Toolkit for Extensive and Flexible Engineering of *Saccharomyces cerevisiae*. *ACS synthetic biology*, *12*(11), 3393–3405. https://doi.org/10.1021/acssynbio.3c00423
[^12]: Laabs, T. L., Markwardt, D. D., Slattery, M. G., Newcomb, L. L., Stillman, D. J., & Heideman, W. (2003). ACE2 is required for daughter cell-specific G1 delay in Saccharomyces cerevisiae. *Proceedings of the National Academy of Sciences of the United States of America*, *100*(18), 10275–10280. https://doi.org/10.1073/pnas.1833999100
[^13]: Bean, B. D. M., Mulvihill, C. J., Garge, R. K., Boutz, D. R., Rousseau, O., Floyd, B. M., Cheney, W., Gardner, E. C., Ellington, A. D., Marcotte, E. M., Gollihar, J. D., Whiteway, M., & Martin, V. J. J. (2022). Functional expression of opioid receptors and other human GPCRs in yeast engineered to produce human sterols. *Nature communications*, *13*(1), 2882. https://doi.org/10.1038/s41467-022-30570-7
[^14]: Zha, H., Fisk, H. A., Yaffe, M. P., Mahajan, N., Herman, B., & Reed, J. C. (1996). Structure-function comparisons of the proapoptotic protein Bax in yeast and mammalian cells. *Molecular and cellular biology*, *16*(11), 6494–6508. https://doi.org/10.1128/MCB.16.11.6494
[^15]: Ksiezopolska, E., & Gabaldón, T. (2018). Evolutionary Emergence of Drug Resistance in Candida Opportunistic Pathogens. *Genes*, *9*(9), 461. https://doi.org/10.3390/genes9090461
[^16]: Kassir, Y., Granot, D., & Simchen, G. (1988). IME1, a positive regulator gene of meiosis in S. cerevisiae. *Cell*, *52*(6), 853–862. https://doi.org/10.1016/0092-8674(88)90427-8
[^17]: Subach, F. V., Subach, O. M., Gundorov, I. S., Morozova, K. S., Piatkevich, K. D., Cuervo, A. M., & Verkhusha, V. V. (2009). Monomeric fluorescent timers that change color from blue to red report on cellular trafficking. *Nature chemical biology*, *5*(2), 118–126. https://doi.org/10.1038/nchembio.138
[^18]: Brodsky, A. S., & Silver, P. A. (2000). Pre-mRNA processing factors are required for nuclear export. *RNA (New York, N.Y.)*, *6*(12), 1737–1749. https://doi.org/10.1017/s1355838200001059
[^19]: Kari, H., Bandi, S. M. S., Kumar, A., & Yella, V. R. (2023). DeePromClass: Delineator for Eukaryotic Core Promoters Employing Deep Neural Networks. *IEEE/ACM transactions on computational biology and bioinformatics*, *20*(1), 802–807. https://doi.org/10.1109/TCBB.2022.3163418
[^20]: Yu, Y., Yarrington, R. M., & Stillman, D. J. (2020). FACT and Ash1 promote long-range and bidirectional nucleosome eviction at the HO promoter. *Nucleic acids research*, *48*(19), 10877–10889. https://doi.org/10.1093/nar/gkaa819
[^21]: Peter, J., De Chiara, M., Friedrich, A., Yue, J. X., Pflieger, D., Bergström, A., Sigwalt, A., Barre, B., Freel, K., Llored, A., Cruaud, C., Labadie, K., Aury, J. M., Istace, B., Lebrigand, K., Barbry, P., Engelen, S., Lemainque, A., Wincker, P., Liti, G., … Schacherer, J. (2018). Genome evolution across 1,011 Saccharomyces cerevisiae isolates. *Nature*, *556*(7701), 339–344. https://doi.org/10.1038/s41586-018-0030-5
[^22]: Hodgins-Davis, A., Duveau, F., Walker, E. A., & Wittkopp, P. J. (2019). Empirical measures of mutational effects define neutral models of regulatory evolution in *Saccharomyces cerevisiae*. *Proceedings of the National Academy of Sciences of the United States of America*, *116*(42), 21085–21093. https://doi.org/10.1073/pnas.1902823116