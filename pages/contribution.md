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

- We successfully completed the following Competition Deliverables: [Wiki](https://2025.igem.wiki/fudan/), [Project Promotion Video](/promotion-video/), [Presentation Video](https://teams.igem.org/5643/project-presentation), [Judging Form](https://teams.igem.org/5643/judging), and in-person at the Paris for Judging Session.
- We carefully describe what work our team members did and what external staff did for our project on our [Attributions Form](https://teams.igem.org/5643/attributions) and embeded on [Attributions](/attributions/) page.
- We describe how and why we chose our iGEM project on our [Description](/description/) page.
- Here we list our useful contributions for future iGEM teams.

### [Silver](/contribution/#silver)

- We showcase our engineering achievements within a segment of our project by undergoing multiple iterations of the engineering design cycle, which can be found on our [Engineering](/engineering/) page.
- We elucidate how our efforts are deemed responsible and beneficial for the world on our [Human Practices](/human-practices/) page.

### [Gold](/contribution/#gold)

We have decided to compete for three special awards: [New Composite Part](https://registry.igem.org/parts/bba-255t0phy), [Model](/model/), [Inclusivity](/inclusivity/).

- We developed a useful new composite part BBa_255T0PHY that functions as an optimized transcription unit: [pSTM1 driven EMSfp499](/part-collection/#collection-2-tu-recorders-using-ems-insensitive-fluorescent-protein). By combining a mutation-sensitive promoter with an EMS-resistant fluorescent protein, it enables high-fidelity recording of mutation dynamics. We confirmed it by whole-plasmid sequencing, and integrated it into yeast strain [BY4741](https://www.yeastgenome.org/strain/by4741) at *URA3* locus. We compared it with other [TU Recorders](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30) by [flow cytometry](/experiments/#flow-cytometry-of-single-cell-yeast) and fluoresence imaging, and [quantitively](https://gitlab.igem.org/2025/fudan/-/tree/main/measurement?ref_type=heads) show that it fluctuates most under mutation pressure.

- We developed the [YeastVerse](https://2025.igem.wiki/fudan/model.html) modeling and 3D simulation platform to predict key parameters including fluorescent protein expression and maturation dynamics. We have established a Design-Build-Test-Learn cycle that integrates mathematical modeling with [AI-assisted reasoning](/model/#ai-aided-validation-of-model-predictions) to cross-validate designs like the [Fluorescent Timer](/part-collection/#fluorescent-timer) before wet-lab experiments.

- Through [Visibility &rarr; Empowerment &rarr; Involvement](/inclusivity/#our-visibility-%E2%86%92-empowerment-%E2%86%92-involvement-model) model, we leveraged intersectionality theory to enhance Epidermolysis Bullosa patients' visibility and voice, and through practices like [sensory-friendly research](/inclusivity/#sensory-friendly-research-design), [multi-stakeholder dialogues](/inclusivity/#encouraging-participation-let-the-vulnerable-dialogue-with-researchers), and development of [ProtocolFlow](https://protocolflow-290e68.igem.wiki/), we empower marginalized groups to build a truly inclusive community that drives systemic transformation in science.

## New Composite Part - pSTM1 driven EMSfp499

The pSTM1 driven EMSfp499 BBa_255T0PHY is the best-performing *TU Recorder* from a collection of 28 [Transcriptional Unit (TU) Recorders](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30) systematically designed and screened by our team. It exemplifies both design innovation and experimental rigor, making it a strong candidate for the Best Composite Part Award. This part combines the EMS–responsive promoter pSTM1[^1] with an EMS-resistant fluorescent reporter EMSfp499 (optimized mSG), achieving stable tracking of promoter mutagenesis under stress. 

Because any DNA sequences could mutate under EMS treatment and distort expression signals, EMSfp499 was optimized using our [Software Tool](/software) to minimize G/C content, thereby enhancing its resistance to EMS-induced transitions. When the pSTM1 promoter undergoes G/C &rarr; A/T mutations under EMS treatment, the resulting transcriptional changes are faithfully captured through the fluorescence of EMSfp499. This enables a high-fidelity, real-time readout of promoter mutation dynamics, offering the first mutagenic recording tool for *Saccharomyces cerevisiae*.

The selection of [pSTM1 driven EMSfp499](https://registry.igem.org/parts/bba-255t0phy) was the culmination of extensive literature searching, and experimental screening across 28 [TU Recorders](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30) designs, each combining a different promoter–reporter pair. All TUs were assembled following the Yeast Toolkit (YTK) MoClo setting (Lee *et al.* 2015)[^2], and integrated into *URA3* locus in the yeast genome to ensure single-copy expression. By comparing flow cytometry results, fluorescence microscopy imageing results, growth curve of yeast when expressing the TU, and Nanopore sequencing of the mutagenized DNA, we identified [pSTM1 driven EMSfp499](https://registry.igem.org/parts/bba-255t0phy) as the TU exhibiting one of the most distinct, reproducible, and interpretable responses to mutagenic induction. This systematic benchmarking highlights the strong sensitivity of pSTM1 to DNA mutation and the exceptional stability of EMSfp499, establishing [pSTM1 driven EMSfp499](https://registry.igem.org/parts/bba-255t0phy) as the most effective and reliable TU Recorder within [the collection](https://registry.igem.org/collections/6594370b-999e-4d9c-a3ea-7c1b83e12a30).

This composite part provides a novel conceptual and technical framework for recording mutational events in living cells. By integrating a mutagen-sensitive promoter with a mutagen-resistant fluorescent reporter, [pSTM1 driven EMSfp499](https://registry.igem.org/parts/bba-255t0phy) demonstrates a strategy that can be readily adopted for studying genome stability, promoter evolution, or DNA repair dynamics in yeast and other eukaryotes. It expands the toolkit of iGEM-generated biosensors by demonstrating how computational codon optimization can be directly applied to improve experimental reliability. Fully standardized, compatible with any MoClo/YTK system, this part can be seamlessly reused or adapted by future research. Beyond its individual utility, it stands as the representative product of a data-driven design and screening effort — embodying the collaborative, innovative, and open-science principles that define the [iGEM](https://igem.org/) community.

## Model - YeastVerse

In the field of synthetic biology, the Design–Build–Test–Learn (DBTL) cycle has been fundamental for experimental success. This year, we present a significant innovation in this process by integrating [AI-assisted reasoning](/model/#ai-aided-validation-of-model-predictions) into the traditional DBTL framework, creating a fast-paced, standardizable, and efficient workflow. Our approach leverages both mathematical modeling and large language models ([LLM](https://en.wikipedia.org/wiki/Large_language_model)s) to independently cross-validate design parameters before any wet-lab experiments, dramatically increasing the probability of first-attempt success.

Centered on creating a dynamic fluorescent timer (FT) in a multicellular "[Grape Yeast](https://2025.igem.wiki/fudan/description.html)" chassis, we developed a biophysically grounded ordinary differential equation model to simulate protein maturation under realistic conditions. Crucially, all key parameters—including FT variant selection (Fast/Medium/Slow), promoter strategy, Ash1 pulse width, and optimal expression strength — were not only optimized in silico but also independently validated by two powerful LLMs, [DeepSeek](https://huggingface.co/deepseek-ai) and [Qwen](https://huggingface.co/Qwen). When prompted solely with biological first principles, both AIs [converged](/model/#ai-aided-validation-of-model-predictions) on the same design recommendations as our mathematical model, providing robust pre-experimental confidence.

To further bridge the gap between dry- and wet-lab, we built interactive [3D visualization tool](/model/#visualization-modules) — Yeast Growth Simulator with Fluorescent Timer Maturation module, that translate abstract predictions into intuitive, visual guidance for our experimentalists.

By augmenting the DBTL cycle with AI reasoning and interactive visualization, our [model](/model/) offers a novel and replicable framework for future research, where [computationally guided](/model/) [design](/design/) paves a reliable and efficient path to [experimental realization](/results/).

## Inclusivity

Our fungal research inspires us to address the complex societal challenges of fungi and the intersectional pressures faced by vulnerable groups. We are dedicated to empowering marginalized individuals in science, particularly Epidermolysis Bullosa (EB) patients, to build a truly inclusive scientific community. Following the [Visibility &rarr; Empowerment &rarr; Involvement](/inclusivity/#our-visibility-%E2%86%92-empowerment-%E2%86%92-involvement-model) model, we elevate EB patients as "artists" through charity sales and art pop-ups, boosting their social visibility. Applying [intersectionality theory](/inclusivity/#improving-our-theoretical-framework-intersectionality), we dismantle singular labels, fostering public understanding of their multifaceted identities.

In the *Empowering Expression* phase, using in-depth interviews and [sensory-friendly research](/inclusivity/#sensory-friendly-research-design) such as participatory mapping, we help fungus-susceptible groups (including EB patients) voice their unmet needs regarding healthcare pathways and treatment experiences. These insights directly informed our experimental project and exposed systemic communication barriers.

For *Encouraging Participation*, our [PhotoVoice](/inclusivity/#facilitating-dialogue-photovoice) method facilitates multi-stakeholder dialogues on improving healthcare. Participants co-designed an ideal hospital space plan, which gain expert approval. The [Fingertip Warmth &middot; Science in Healing Together art exhibition](/inclusivity/#co-creation-in-action-the-art-experience-exhibition) offered interactive simulations of lab difficulties for EB patients, promoting empathy, and fostered two-way feedback via patient artworks.

These efforts led to [ProtocolFlow](https://protocolflow-290e68.igem.wiki/), our laboratory-assistive software. It provides visualized experimental guidance and a built-in mental health assessment, boosting lab efficiency while supporting researchers' well-being. We also initiated a "[Lab Mental Health Week](/inclusivity/#_4-2-lab-mental-health-week-check-in-campaign)" to promote collective awareness.

We believe this replicable, evolving cycle of inclusive practice will transcend labels, genuinely empower diverse identities, and drive systemic transformation in science.


## [Reference](/contribution/#reference)

[^1]: Hodgins-Davis, A., Duveau, F., Walker, E. A., & Wittkopp, P. J. (2019). Empirical measures of mutational effects define neutral models of regulatory evolution in *Saccharomyces cerevisiae*. *Proceedings of the National Academy of Sciences of the United States of America*, *116*(42), 21085–21093. https://doi.org/10.1073/pnas.1902823116
[^2]: Lee, M. E., DeLoache, W. C., Cervantes, B., & Dueber, J. E. (2015). A Highly Characterized Yeast Toolkit for Modular, Multipart Assembly. *ACS synthetic biology*, *4*(9), 975–986. https://doi.org/10.1021/sb500366v
