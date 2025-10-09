---
title: Improved Parts
authors:
  - name: Yining Zhao
    url: /fudan/team/#Yining
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/zyn-a.webp
layout: igem
heroImage: https://static.igem.wiki/teams/5643/pageimage/improved-part/improvedparts-header.avif
description: On this page, we describe how we improved mCherry to our Timer module https://2025.igem.wiki/fudan/part-collection/#fluorescent-timer
---

## Overview

mCherry is a monomeric red fluorescent protein first reported in 2004. It is widely used due to its advantage of fast maturation kinetics. This year, to better characterize cellular lineage and cell life cycle, we introduced a modified mCherry variant based on academic literature[^1]. Its color emission changes predictably over time (blue &rarr; red), thereby gaining the ability to resolve time.

|               | PART NAME        | PART ID      | DESCRIPTION                                                  |
| ------------- | ---------------- | ------------ | ------------------------------------------------------------ |
| original part | mCherry          | [BBa_J06504](https://registry.igem.org/parts/bba-j06504)   | monomeric RFP optimized for bacteria                         |
| improved part | modified mCherry | BBa_25TQG9WZ | Fluorescent timer based on mCherry whose color changes over tim |


## Improvement Strategy

mCherry consists of 236 amino acids. According to previous studies, the M23V / E39K / K75R / L88W / S152T / A222S mutations (numbered relative to mCherry, starting from the initiator methionine) enable the protein to exhibit time-dependent color transition in fluorescence[^1].

<div style="text-align: center;" id="fig1">    <img src="https://static.igem.wiki/teams/5643/pageimage/improved-part/sequence-compressed.webp" style="width:80%">    <div>        <span style="color:gray">Figure 1. Sequence alignment of mCherry and modified mCherry</span>        <br><br>    </div></div>

Modified mCherry exhibits a color transition from blue (excitation/emission peaks: 403/466 nm) to red (excitation/emission peaks: 583/606 nm). This color change primarily results from the oxidation of the C&alpha;2–C&beta;2 bond in Tyr72. The roles of other key residues are summarized below[^2]:

<div style="text-align: center;">

| Residue    | Functional Description                                       |
| ---------- | ------------------------------------------------------------ |
| **Arg75**  | Slows down the blue-to-red conversion.                       |
| **Val23**  | Slightly reduces red fluorescence intensity, but this effect is compensated by Trp88. |
| **Ser222** | Accelerates the formation of the blue chromophore.           |
| **Trp88**  | Delays the blue-to-red conversion and enhances both blue and red fluorescence intensity. |

</div>

<div style="text-align: center;" id="fig2">    <img src="https://static.igem.wiki/teams/5643/pageimage/improved-part/modified-mcherry.webp" style="width:80%">    <div>        <span style="color:gray">Figure 2. Structure of modified mCherry.<br>The mutated residues and the fluorescent core are highlighted in different colors.Structural data were obtained from the Protein Data Bank (ID: pdb_00003lf3).</span>        <br><br>    </div></div>

Based on the study by Subach et al. (2009)[^1], the red/blue fluorescence intensity ratio of modified mCherry increases progressively over time (Subach et al. Figure 2d–f). Furthermore, the rate of increase is positively correlated with temperature. According to these findings, we calculated the red/blue ratio at 30°C to represent the maturation stage of the fluorescent protein, thereby serving as a quantitative indicator of elapsed time.

We constructed the TU Timer (BBa_25AT6YR4) to utilize the modified mCherry . Since our yeast population is continuously proliferating, the timing of protein transcription and translation is inherently asynchronous. To accurately represent cell lineage progression, we needed the timer to initiate maturation at a defined cell-cycle stage. Therefore, selecting an appropriate promoter was essential.

Based on the results from our [Model](/model/), we chose the ASH1 AIpro promoter (BBa_25VHXKNL), which is transcriptionally activated during the late M phase. In addition, we incorporated the ASH1 3' UTR (BBa_25AIDL8P), which localizes the mRNA to the bud tip of the daughter cell, ensuring that translation begins specifically within the daughter cell[^3]. 

Consequently, the modified mCherry transcript is produced in the mother cell during late M phase, and its mRNA is then localized to the newly formed daughter cell, where translation and chromophore maturation occur. This process is repeated at every cell division, enabling the TU Timer (BBa_25AT6YR4) to visually track cell lineage over successive generations.


## Experimental Validation

We performed both dry-lab and wet-lab experiments on the modified mCherry. For details, please refer to our [Model](/model/) and BBa_25AT6YR4 on [the Registry](https://registry.igem.org/).

## Community Value

This year, we introduce an advanced Fluorescent Timer (FT) into [the iGEM Registry](https://registry.igem.org/). The coding sequence of this part originates from a previously published work of rational protein engineering[^1]. We have incorporated this efficient element into [the Registry](https://registry.igem.org/) as a fully documented part BBa_25TQG9WZ with a standard BioBrick interface.

We recognize that extending fluorescent proteins into the temporal dimension has become a frontier in synthetic biology.  Multiple strategies exist for implementing timing functions, and our modified mCherry represents one effective approach.

Our modified mCherry is the only coding sequence of [TU Timer](/part-collection/#fluorescent-timer) based on color maturation kinetics. Its main advantages include:

- **Broad temporal range**: Capable of recording **long-term** (multi-hour to days) biological events such as cell cycle progression and lineage evolution.
- **Easy integration**: Readily observable under standard fluorescence microscopy, offering low experimental barriers and broad application potential.

Historically, fluorescent protein engineering has focused on enhancing color diversity and brightness stability. However, recent breakthroughs have demonstrated the feasibility and vast potential of expanding applications into the temporal dimension.

> In September 2025, A groundbreaking study from Westlake University[^4], published in *Cell*, introduced a new family of proteins known as tr-FTs (fluorescence-lifetime timers), based on fluorescence lifetime imaging (FLIM). The researchers systematically engineered seven fluorescent proteins spanning the visible spectrum, generating a “rainbow” library of mutants with distinct fluorescence lifetimes.
> 
> These variants share identical excitation and emission wavelengths but differ in their lifetimes (ranging from 1 ns to 5 ns), thereby overcoming the long-standing limitations of spectral overlap and restricted channel capacity. Remarkably, the team applied these proteins to an improved Fucci (cell-cycle indicator) system—using fluorophores of the same color but different lifetimes to trace cell-cycle dynamics, allowing single-channel, full-cycle tracking. The tracking performance illustrated in *Figure 6B* of their paper compellingly supports the feasibility of introducing temporal functionality into fluorescent proteins—an idea closely aligned with our goal of using modified mCherry to trace cell life-cycle timing.

Here, by introducing a high-performance, user-friendly modified mCherry to the iGEM community, we provide a practical tool for long-term temporal recording. Meanwhile, groundbreaking innovations such as [tr-FTs](https://doi.org/10.1016/j.cell.2025.08.035) underscores our strategic awareness of the emerging trend toward temporal functional expansion in fluorescent tools.

Together, these new strategies — operating across distinct temporal dimensions — are poised to drive the broader adoption of Timer elements in the future of synthetic biology.


## Reference

[^1]: Subach, F. V., Subach, O. M., Gundorov, I. S., Morozova, K. S., Piatkevich, K. D., Cuervo, A. M., & Verkhusha, V. V. (2009). Monomeric fluorescent timers that change color from blue to red report on cellular trafficking. *Nature Chemical Biology*, 5(2), 118–126. DOI: 10.1038/nchembio.138

[^2]: Pletnev, S., Subach, F. V., Dauter, Z., Wlodawer, A., & Verkhusha, V. V. (2010). Understanding blue-to-red conversion in monomeric fluorescent timers and hydrolytic degradation of their chromophores. *Journal of the American Chemical Society*, 132(7), 2243–2253. DOI: 10.1021/ja908418r

[^3]: Brodsky, A. S., & Silver, P. A. (2000). Pre-mRNA processing factors are required for nuclear export. *RNA (New York, N.Y.)*, 6(12), 1737–1749. DOI: 10.1017/s1355838200001059

[^4]: Tan, Z., Hsiung, C.-H., Feng, J., Zhang, Y., Wan, Y., Chen, J., Sun, K., Lu, P., Zang, J., Yang, W., Gao, Y., Yin, J., Zhu, T., Lu, Y., Pan, Z., Zou, Y., Liao, C., Li, X., Ye, Y., Liu, Y., & Zhang, X. (2025). Time-resolved fluorescent proteins expand fluorescent microscopy in temporal and spectral domains. *Cell*, 188(1), 1–19. DOI: 10.1016/j.cell.2025.08.035
