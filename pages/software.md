---
title: Software
authors:
  - name: Yufan Han
    url: /fudan/team/#Yufan
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/hyf-a.webp
layout: igem
heroImage: https://static.igem.wiki/teams/5643/pageimage/software/header-software.webp
description: EMS Sequence Optimizer -- A web-based tool for optimizing gene sequences to tune their EMS mutagenesis sensitivity through synonymous codon substitution
---

> **Try EMS-Optimizer at&nbsp;**  https://2025.igem.wiki/software-tools/fudan/
>
> **Source code at&nbsp;** https://gitlab.igem.org/2025/software-tools/fudan


## Problem Statement

Directed evolution through EMS (ethyl methanesulfonate) mutagenesis is powerful but faces a key challenge: **how to control mutation rates in specific regions**. Researchers need to:
- **Maximize mutations** in target regions for library diversity
- **Minimize mutations** in critical functional domains to preserve protein function

**Current limitation**: No tools exist to rationally design sequences with tunable EMS sensitivity while maintaining protein identity.

## Our Solution

**EMS-Optimizer** intelligently selects synonymous codons to modulate G/C content, thereby controlling EMS mutation susceptibility. Key innovations:

1. **Dual modes**: Forward (G&rarr;A, C&rarr;T for EMS) and Reverse (A&rarr;G, T&rarr;C for suppressor screening)
2. **Risk-based algorithm**: Scores codons by stop/missense/silent mutation potential (not just G/C count)
3. **CAI integration**: Monitors translation efficiency impact using Codon Adaptation Index
4. **GFP specialization**: Built-in analysis for 22+ critical fluorescent protein sites
5. **Real-time visualization**: Interactive risk heatmaps with per-codon probability tooltips

<div style="text-align: center;" id="fig1">
    <img src="https://static.igem.wiki/teams/5643/pageimage/software/software.webp" style="width:80%">
    <div>
        <span style="color:gray">Figure 1. The GUI of the EMS-Optimizer.</span>
        <br><br>
    </div>
</div>

## Key Features

### Intelligent Mutagenesis Design

At the core of our software is the **Smart Codon Selection** tool, which allows users to strategically target specific regions of a gene for mutagenesis. This feature operates in two distinct modes to suit different experimental goals. The **Maximize mode** is engineered to introduce high-risk codons into EMS-sensitive regions, thereby increasing the likelihood of desired mutations. Conversely, the **Minimize mode** selects low-risk codons for regions intended to remain stable. To quantify the potential impact of mutations, we have implemented a risk scoring system that heavily penalizes stop codons (×10) and missense mutations (×3) over silent mutations (×0). All codon selections are optimized for expression in *Saccharomyces cerevisiae* (yeast), ensuring that the resulting protein variants can be effectively produced for our project.

The software supports two operational modes for modeling genetic changes. The default **G:C &rarr; A:T Transition Mode** simulates the effects of EMS mutagenesis, specifically G&rarr;A and C&rarr;T transitions, which is ideal for standard mutagenesis screening experiments. For researchers interested in studying genetic suppression or reversion events, the **A:T &rarr; G:C Transition Mode** models the corresponding reversion mutations (A&rarr;G, T&rarr;C), providing a powerful tool for identifying suppressor mutations and conducting reversion screening.

### Real-time Expression and Functional Analysis

To maintain a balance between mutagenesis and protein expression, our software includes **Translation Efficiency Tracking**. This feature calculates the Codon Adaptation Index (CAI) in real-time as sequence modifications are made. Visual cues—a green indicator (🟢) for an increase in CAI, red (🔴) for a decrease, and white (⚪) for neutral changes—provide immediate feedback, allowing users to make informed decisions that align their mutagenesis goals with optimal expression efficiency.

<div style="text-align: center;" id="fig2">
    <img src="https://static.igem.wiki/teams/5643/pageimage/software/cai.webp" style="width:50%">
    <div>
        <span style="color:gray">Figure 2. Translation Efficiency Tracking Panel</span>
        <br><br>
    </div>
</div>

For projects focused on fluorescent protein engineering, the software offers a **GFP-Specific Analysis** module. This pre-configured tool is tailored for the analysis of Green Fluorescent Protein (GFP) and its derivatives. It automatically identifies and tracks over 22 critical sites, including the essential chromophore core (Thr65-Tyr66-Gly67), key catalytic residues (Arg96, Glu222), and common color variants such as Y66H (BFP), Y66W (CFP), and T203Y (YFP). The analysis is weighted to prioritize these functionally significant residues, and reference sequences for EGFP and a yeast-optimized yEGFP are included for easy comparison.

### User-Friendly and Accessible

Our software is designed with the user in mind. As a web-based application, it requires no installation and is accessible from any modern web browser. It accommodates both DNA and protein sequences as input, with an automatic conversion feature for seamless workflow. The mutation rate is highly adjustable, with precision down to 1×10<sup>-10</sup>, giving users fine-grained control over their in-silico experiments. Once an optimized sequence is generated, it can be copied to the clipboard with a single click. To cater to a global user base, the interface is available in both English and Chinese.

## How It Works

### Algorithm Overview

<div style="text-align: center;" id="fig3">
    <img src="https://static.igem.wiki/teams/5643/pageimage/software/algorithm.webp" style="width:80%">
    <div>
        <span style="color:gray">Figure 3. Flow chart of the algorithm</span>
        <br><br>
    </div>
</div>

### Risk Scoring Method

For each codon position (0, 1, 2):
1. **Identify mutable bases** (G/C for forward, A/T for reverse)
2. **Simulate mutation** (G&rarr;A, C&rarr;T, or A&rarr;G, T&rarr;C)
3. **Score outcome**:
   - Nonsense (stop codon): +10 points
   - Missense (AA change): +3 points
   - Silent (synonymous): 0 points
   - Base presence: +1 point
4. **Sum scores** across 3 positions

### Probability Calculation

**Per-codon probabilities**: direct simulation of all 3 positions

**Sequence-wide cumulative probability**:
```
P(≥1 mutation) = 1 - ∏[1 - P(single codon)]
```
implemented with log-space arithmetic for numerical stability:
```
P(≥1 mutation) = -expm1(∑log1p(-Pᵢ))
```

## Installation &amp; Usage

### Online Access
**Live demo at&nbsp;** https://2025.igem.wiki/software-tools/fudan/

### Local Deployment
```bash
git clone https://gitlab.igem.org/2025/software-tools/fudan.git
cd fudan
pnpm install
pnpm run serve
```

**Requirements**: Node.js ≥18, modern browser (Chrome/Firefox/Safari/Edge)

### Quick Start Guide

1. **Input sequence**: Paste CDS (must be multiple of 3) or protein sequence
2. **Select mutation mode**: Forward (EMS) or Reverse (suppressor)
3. **Adjust mutation rates** (optional): Default 1.67×10⁻⁸% per site
4. **Choose optimization**: Minimize (protective) or Maximize (mutagenic)
5. **Analyze results**:
   - View color-coded risk heatmap (red=stop, orange=change, green=silent)
   - Check CAI changes in statistics panel
   - Hover codons for detailed probabilities
   - Copy optimized sequences with one click

## Development Process (DBTL cycles)

### Cycle 1: Algorithm Validation

- **Design**: Python CLI to test core optimization logic
- **Build**: Implemented G/C-based codon selection
- **Test**: Distributed to team members
- **Learn**: ❌ Poor usability (requires Python installation), results not intuitive

**Key insight**: A powerful algorithm needs an accessible interface.

### Cycle 2: Web Application

**Design**: Browser-based GUI with 3-step workflow (Input &rarr; Optimize &rarr; Export)

**Build**:
- Migrated Python logic to JavaScript/TypeScript
- Created Vue 3 single-page application
- Added side-by-side sequence comparison view

**Test**: Positive feedback on ease of use and visualization

**Learn**: ✅ Web delivery removes installation barriers and enables instant feedback

### Cycle 3: Advanced Features (Current)

**Design**: Based on user feedback, added:
- Reverse mutation mode for suppressor screening
- CAI tracking for expression efficiency
- GFP-specific site analysis
- Bilingual support

**Build**: Implemented all features with full test coverage

**Test**: In progress with wet-lab validation

**Learn**: Integrated features increase utility without sacrificing simplicity

## Future Development

- **Expand organism support**: add *E. coli*, mammalian cell codon tables
- **Integrate structural data**: incorporate [AlphaFold](https://alphafoldserver.com) predictions to weight solvent accessibility
- **Experimental feedback**: implement machine learning to tune parameters from observed mutation distributions

## References

1. Sharp, P. M., & Li, W. H. (1987). The codon adaptation index — a measure of directional synonymous codon usage bias, and its potential applications. *Nucleic Acids Research*, 15(3), 1281-1295. DOI: 10.1093/nar/15.3.1281

2. Tsien, R. Y. (1998). The green fluorescent protein. *Annual Review of Biochemistry*, 67, 509-544. DOI: 10.1146/annurev.biochem.67.1.509

3. Zacharias, D. A., et al. (2002). Partitioning of lipid-modified monomeric GFPs into membrane microdomains. *Science*, 2002;296(5569):913‑916. DOI: 10.1126/science.1068539

4. Greene E. A., et al. (2003). Spectrum of chemically induced mutations from a large-scale reverse-genetic screen in Arabidopsis. *Genetics*, 164(2):731-740. DOI: 10.1093/genetics/164.2.731

5. Bennetzen J. L., Hall B. D. (1982). Codon selection in yeast. *J Biol Chem*, 257(6):3026-3031. PMID: 6277903

6. Ormö M. et al. (1996). Crystal structure of the Aequorea victoria green fluorescent protein. *Science*, 273(5280):1392‑1395. DOI: 10.1126/science.273.5280.1392

7. Cormack B. P., Valdivia R. H., Falkow S. (1996). FACS-optimized mutants of the green fluorescent protein (GFP). *Gene*, 173(1):33‑38. DOI: 10.1016/0378-1119(95)00685-0

8. Heim R., Tsien R.Y. (1996). Engineering green fluorescent protein for improved brightness, longer wavelengths and fluorescence resonance energy transfer. *Curr Biol*, 6(2):178‑182. DOI: 10.1016/s0960-9822(02)00450-5
