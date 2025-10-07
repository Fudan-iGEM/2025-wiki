---
title: Contribution
authors:
  - name: Duan Yuxin
    url: /fudan/team/#Yuxin
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/dyx-a.webp
layout: igem
heroImage: https://static.igem.wiki/teams/5643/header/contribution.webp
description: Below is what we put in the judging form.
---

## [Medal Criteria](/contribution/#medal-criteria)

### [Bronze](/contribution/#bronze)

- We successfully completed the following Competition Deliverables: [Wiki](/2025.igem.wiki/fudan/), [Project Promotion Video](/promotion-video/), [Presentation Video](https://teams.igem.org/5643/project-presentation), [Judging Form](https://teams.igem.org/5643/judging), and in-person at the Paris for Judging Session.
- We carefully describe what work our team members did and what external staff did for our project on our [Attributions Form](https://teams.igem.org/5643/attributions) and embeded on [Attributions](/attributions/) page.
- We describe how and why we chose our iGEM project on our [Description](/description/) page.
- Here we list our useful [Contributions](/contribution/) for future iGEM teams.

### [Silver](/contribution/#silver)

- We showcase our engineering achievements within a segment of our project by undergoing multiple iterations of the engineering design cycle, which can be found on our [Engineering](/engineering/) page.
- We elucidate how our efforts are deemed responsible and beneficial for the world on our [Human Practices](/human-practices/) page.

### [Gold](/contribution/#gold)

We have decided to compete for three special awards: [New Composite Part](https://registry.igem.org/parts/bba-25fqwvze), [Model](/model/), [Inclusivity](/inclusivity/).

- We developed a useful new composite part [BBa_255T0PHY](https://registry.igem.org/parts/bba-255t0phy) that functions as an optimized transcription unit: [the pSTM1 driven EMSfp499 system](/part-collection/#collection-2-tu-recorders-using-ems-insensitive-fluorescent-protein). By combining a mutation-sensitive promoter with an EMS-resistant fluorescent protein, it enables high-fidelity recording of mutation dynamics.
- We developed the YeastVerse modeling and [3D simulation platform](/model/#3d-yeast-growth-simulation) to predict key parameters including fluorescent protein expression and maturation dynamics, and established an AI-augmented [Design-Build-Test-Learn cycle](/engineering/) that integrates mathematical modeling with [AI-assisted reasoning](/model/#ai-aided-validation-of-model-predictions) to cross-validate designs like the fluorescent timer through dry lab simulations.
- Through [Visibility - Empowering Expression - Encouraging Participation model](/inclusivity/#0-2-our-visibility-%E2%86%92-empowerment-%E2%86%92-involvement-model), we leveraged intersectionality theory to enhance EB patients' visibility and voice, and through practices like [sensory-friendly research](/inclusivity/#sensory-friendly-research-design), [multi-stakeholder dialogues](/inclusivity/#3-encouraging-participation-let-the-vulnerable-dialogue-with-researchers) and the [ProtocolFlow](https://protocolflow-290e68.igem.wiki/) software, we empower marginalized groups to build a truly inclusive community that drives systemic transformation in science.

#### [New Composite Part](/contribution/#new-composite-part)

The pSTM1 driven EMSfp499 ([BBa_255T0PHY](https://registry.igem.org/parts/bba-255t0phy)) is the best-performing TU from a comprehensive collection of 28 Transcriptional Unit (TU) Recorders systematically designed and screened by our team - [TU Recorders using EMS-insensitive Fluorescent Protein Collection](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30). It exemplifies both experimental rigor and design innovation, making it a strong candidate for the Best Composite Part Award. This part combines the EMS–responsive promoter pSTM1[^1] with an EMS-resistant fluorescent reporter EMSfp499 (optimized mSG), achieving precise and stable tracking of promoter mutagenesis under chemical stress. 

Unlike conventional fluorescent systems that themselves mutate under EMS induction and distort expression signals, EMSfp499 was optimized using our [Software](/fudan/software) to minimize G/C content, thereby enhancing its resistance to EMS-induced transitions. When the pSTM1 promoter undergoes G/C→A/T mutations under EMS treatment, the resulting transcriptional changes are faithfully captured through the fluorescence of EMSfp499. This enables a high-fidelity, real-time readout of promoter mutation dynamics, offering the first stable mutagenic recording system for *Saccharomyces cerevisiae*.

The selection of pSTM1 driven EMSfp499 was the culmination of extensive construction and screening work across 28 TU designs, each combining a different promoter–reporter pair. All TUs were assembled using the Yeast Toolkit (YTK) MoClo system into the *URA3* integration vector pYTK096, linearized with [NotI](https://www.neb.com/en/products/r3189-noti-hf), and integrated into the yeast genome to ensure single-copy expression according to Lee *et al.* (2015). [^2] By comparing flow cytometry, growth curve and fluorescence microscopic imaging result, we identified pSTM1 driven EMSfp499 as the TU exhibiting one of the most distinct, reproducible, and interpretable responses to mutagenic induction. This systematic benchmarking highlights the strong sensitivity of pSTM1 to DNA mutation and the exceptional stability of EMSfp499, establishing pSTM1 driven EMSfp499 as the most effective and reliable TU Recorder within the collection.

This composite part provides a new conceptual and technical framework for recording mutational events in living cells. By integrating a mutagen-sensitive promoter with a mutagen-resistant fluorescent reporter, pSTM1 driven EMSfp499 introduces a strategy that can be readily adopted for studying genome stability, promoter evolution, or DNA repair dynamics in yeast and other eukaryotes. It also expands the toolkit of iGEM-compatible biosensors by demonstrating how computational codon optimization can be directly applied to improve experimental reliability. Fully standardized under the MoClo/YTK system, this part can be seamlessly reused or adapted by future iGEM teams. Beyond its individual utility, it stands as the representative product of a large-scale, data-driven design and screening effort—embodying the collaborative, innovative, and open-science principles that define the iGEM community.

#### [Model](/contribution/#model)

In the field of synthetic biology, the traditional Design–Build–Test–Learn ([DBTL](/engineering/)) cycle has been fundamental for experimental success. This year, we present a significant innovation in this process by integrating [AI-assisted reasoning](/model/#ai-aided-validation-of-model-predictions) into the DBTL framework, creating a more predictive and efficient workflow. Our approach leverages both mathematical models and large language models (LLMs) to independently cross-validate design parameters before any wet-lab experiments, dramatically increasing the probability of first-attempt success.

Centered on a dynamic fluorescent timer (FT) in a multicellular "Grape Yeast" chassis, we developed a biophysically grounded ODE model to simulate protein maturation under realistic conditions. Crucially, all key parameters—including FT variant selection (Fast/Medium/Slow), promoter strategy, Ash1 pulse width, and optimal expression strength—were not only optimized in silico but also independently validated by two powerful LLMs, DeepSeek and Qwen. When prompted solely with biological first principles, both AIs converged on the same design recommendations as our mathematical model, providing robust pre-experimental confidence.

To further bridge the gap between dry and wet lab, we built interactive [3D visualization](/model/#visualization-modules) tools—Yeast Growth Simulator and Fluorescent Timer Maturation module—that translate abstract predictions into intuitive, visual guidance for our experimentalists.

By augmenting the DBTL cycle with AI reasoning and interactive visualization, our [model](/model/) offers a novel, scalable blueprint for synthetic biology, where computationally guided design paves a more reliable and efficient path to [experimental realization.](/experiments/)

#### [Inclusivity](/contribution/#inclusivity)

Our fungal research inspires us to address the complex societal challenges of fungi and the intersectional pressures faced by vulnerable groups. We are dedicated to empowering marginalized individuals in science, particularly Epidermolysis Bullosa (EB) patients, to build a truly inclusive scientific community.Our approach follows the [Visibility - Empowering Expression - Encouraging Participation model](/inclusivity/#0-2-our-visibility-%E2%86%92-empowerment-%E2%86%92-involvement-model). We elevate EB patients as "artists" through charity sales and art pop-ups, boosting their social visibility. Applying [intersectionality theory](/inclusivity/#1-3-improving-our-theoretical-framework-intersectionality), we dismantle singular labels, fostering public understanding of their multifaceted identities.

In the Empowering Expression phase, using in-depth interviews and [sensory-friendly research](/inclusivity/#sensory-friendly-research-design) such as participatory mapping, we help fungus-susceptible groups (including EB patients) voice their unmet needs regarding healthcare pathways and treatment experiences. These insights directly informed our experimental project and exposed systemic communication barriers.

For Encouraging Participation, our [PhotoVoice](/inclusivity/#3-2-facilitating-dialogue-photovoice) method facilitates multi-stakeholder dialogues on improving healthcare. Participants co-designed an ideal hospital space plan, gaining expert approval. The [Fingertip Warmth · Science in Healing Together art exhibition](/inclusivity/#3-3-co-creation-in-action-the-art-experience-exhibition) offered interactive simulations of lab difficulties for EB patients, promoting empathy, and fostered two-way feedback via patient artworks.

These efforts led to [ProtocolFlow](https://protocolflow-290e68.igem.wiki/), our laboratory-assistive software. It provides visualized experimental guidance and a built-in mental health assessment, boosting lab efficiency while supporting researchers' well-being. We also initiated a "Lab Mental Health Week" to promote collective awareness.

We believe this replicable, evolving cycle of inclusive practice will transcend labels, genuinely empower diverse identities, and drive systemic transformation in science.

## [Reference](/contribution/#reference)

[^1]: Hodgins-Davis, A., Duveau, F., Walker, E. A., & Wittkopp, P. J. (2019). Empirical measures of mutational effects define neutral models of regulatory evolution in *Saccharomyces cerevisiae*. *Proceedings of the National Academy of Sciences of the United States of America*, *116*(42), 21085–21093. DOI: 10.1073/pnas.1902823116
[^2]: Lee, M. E., DeLoache, W. C., Cervantes, B., & Dueber, J. E. (2015). A Highly Characterized Yeast Toolkit for Modular, Multipart Assembly. ACS synthetic biology, 4(9), 975–986. DOI: 10.1021/sb500366v  

