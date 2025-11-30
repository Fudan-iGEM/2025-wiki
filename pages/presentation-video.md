---
title: Presentation Vide
authors:
  - name: All Members
    url: /fudan/team/#meet-our-members
layout: igem
heroImage: https://static.igem.wiki/teams/5643/img/screenshot-2025-08-06-at-21-23-43.webp
description: We are still cooking our presentation at this moment.
---

Our presentation is at [https://video.igem.org/w/iRsWyoY68ey3E83McFmNf2](https://video.igem.org/w/iRsWyoY68ey3E83McFmNf2).

----
Welcome to this video! Me, a medical student, is conducting research on on fungi.

Fungi are usually our tiny, friendly partners. But here's the twist: scholars warn that these "friends" can turn into foes, with fungal infections becoming a serious global health threat.

I heard the same frustration from patients in hospitals: their medications were failing.
But there's a team tackling this problem. Today, I will visit Fudan iGEM 2025 — a group working on yeast-focused solutions.

Fungal issues aren't a distant tale—they're happening right around us.

In hospital infection clinics and icus, the fight against fungi unfolds in real life every single day.

Worse still, the limited antifungal weapons at our disposal are gradually losing their effectiveness.The constant emergence of drug-resistant strains has made treatment extremely difficult—even to the point where no effective medications are available.

We're up against an opponent that evolves—but all we can see are the results not the process itself.
Can we track the full trajectory of fungal drug resistance evolution?

To answer this question, what we need is not a clearer static snapshot, but real-time documentation of the entire evolutionary process.
To document the mutation process of drug-resistant fungi and support the development of new antifungal drugs, Fudan iGEM 2025 has designed an innovative solution: DR.sTraTeGY.

Our project is divided into three core components: Grape Yeast, the Timer and Recorder, and YeastVerse. This unique multicellular chassis transforms the evolving population into a physical, spatio-temporal lineage tree, overcoming the limitations of static endpoint snapshots provided by traditional unicellular systems.

We chose Saccharomyces cerevisiae as our model organism due to its well-sequenced genome, robust genetic tools, and conserved resistance mechanisms. However, traditional unicellular yeast models, often relying on bulk sequencing, only give us a static 'snapshot' of an evolving population. This makes it challenging to capture low-frequency mutations or the real-time emergence of complex traits.

To overcome this, we designed the Grape Yeast – a novel multicellular chassis. The multicellular structure is key: imagine a living lineage tree where physical links between mother and daughter cells record evolutionary history.

Our inspiration came from seminal work by Ratcliff et al., who observed emergent multicellularity in S. cerevisiae under gravity-based selection. This phenomenon was strongly correlated with the loss-of-function of ACE2, a transcription factor that ensures mother-daughter cell separation after budding.
By deleting ACE2 in strain Y55, we prevent this separation, leading to the formation of 'grape-like' multicellular clusters – hence, 'Grape Yeast'. This creates a physically linked cluster that functions as a spatio-temporal lineage recorder.
Next, we endowed our Grape Yeast with the ability to respond to external chemical signals. This is crucial because endogenous signaling pathways play central roles in regulating efflux pumps, cell wall remodeling, and stress responses, fundamentally shaping antifungal resistance.
First is Rewiring the Pheromone Response with HsDOR: We rewired the native yeast pheromone response pathway by replacing ACE2 with the human &delta; opioid receptor HsDOR and coupling it to the pathway via a Gpa1 chimera. This allows us to activate the MAPK signaling cascade, enhancing the expression of Ste12-regulated genes, simply by introducing a specific ligand like SNC80. We validate this by quantifying mRNA levels of FUS3 and STE2 via qPCR.

Second is Yeast Membrane Engineering: To facilitate proper function and mimic drug-resistant fungal membranes, we deleted ERG5 and ERG6, redirecting sterol flux toward cholesterol by introducing zebrafish DHCR7/24 genes, making our chassis more comparable to mammalian cells and relevant for drug resistance studies. This modification can be verified through cholesterol staining.

To simulate diverse resistance mechanisms, we first focused on controlling individual diversity within the population. We know that genomic instability, such as changes in chromosome ploidy, can lead to rapid drug resistance in fungi. Some fungi enhance resistance by increasing gene copy numbers, like duplicating drug efflux pump genes; while others might reduce drug resistance-related genes by losing sensitive ones.
First, by passaging diploid and tetraploid yeast under gravitational selection, we discovered a ploidy abnormality similar to what occurs in antifungal-resistant fungi.

Second, we introduced the meiosis-inducing gene IME1 under inducible promoters (like pTet2 or pCUP1). This triggers haploidization in yeast, simulating gene reduction or loss. Both these ploidy changes can be verified using cell size measurements and PI staining.

To enhance controllability and safety, and to mimic cell specialization in multicellular organisms, we introduced BAX—an apoptosis-inducing protein—under inducible promoters. BAX induces cell apoptosis via a mitochondria-mediated pathway, allowing us to control cluster size or, when needed, induce the apoptosis of the entire system. This also provides a platform to explore concepts such as nutrient reallocation and optimal collective fitness within multicellular populations.

Now, let's talk about our core visualization modules: the Timer and the Recorder.
First, the Timer, which tracks cell lineage: Microscopic observation alone cannot reveal the chronological relationship between neighboring cells within a cluster. Our Timer module, the TU Timer, visually records a single cell's life cycle in real-time. It consists of an Ash1 promoter, a modified mCherry fluorescent protein, and an Ash1 3′UTR that localizes mRNA to the daughter cell. This ingenious system allows us to visualize cell lineage in the Grape Yeast cluster, clearly showing us which cell came from which and when.

Next, let's discuss the Recorder, which is designed for recording selective pressure: To intuitively record the selective pressure and mutation frequency at different chromosomal loci, we developed the Recorder module. It comprises a promoter designed to undergo mutations and a reporter fluorescent protein. We hypothesize that mutations in the promoter will affect the expression level of the reporter, thereby quantifying pressure by measuring the fluorescence intensity. The observed fluorescence intensity thus serves as a direct biological measure of accumulated mutation frequency.
To determine the optimal Recorder configuration, we screened 28 combinations of four promoters and seven EMS-resistant fluorescent proteins. 

After EMS mutagenesis, we selected the combination – the TU Recorder – that showed the most significant and predictable change in brightness. This allows us to track genetic changes dynamically and in a lineage-specific manner.

For Long-Term Natural Evolution Tracking, we integrated the optimized TU Recorder into 16 chromosomal sites of a simplified Grape Yeast strain, including both neutral 'safe sites' and 'dangerous sites' related to genome stability.

Throughout this project, we fully embraced a 'dry-lab guiding wet-lab' approach using YeastVerse—our virtual yeast simulation platform. In synthetic biology, the traditional DBTL cycle is fundamental. This year, we introduced a significant innovation by integrating AI-assisted reasoning into the DBTL framework, creating a fast-paced, standardizable, and efficient workflow.
YeastVerse is more than just a simulator; it's a powerful platform that combines both mathematical models and large language models. This enables us to independently cross-validate design parameters before conducting any wet-lab experiments, allowing us to accurately simulate Grape Yeast's growth, division, protein expression, and response to external signals in a virtual environment.

YeastVerse truly bridges the gap between dry and wet lab by translating abstract predictions into intuitive, visual guidance for our experimentalists. Our interactive 3D visualization tools, the Yeast Growth Simulator and Fluorescent Timer Maturation visualization can achieve this. Imagine seeing a fully rendered, evolving yeast cluster, where you can zoom in to observe individual cell divisions, track the real-time maturation of fluorescent proteins within specific cell lineages, and even dynamically adjust environmental parameters to visualize their impact on growth and mutation patterns. This interactive 3D environment allows us to literally see the evolutionary process unfold, making complex data immediately understandable and guiding our wet-lab designs with unprecedented clarity.
Focusing on the most genuine societal needs,  we strive to deliver welfare to the pharmaceutical industry, academia, and society, continuously iterate our project via external feedback, and thus gain recognition from stakeholders across sectors.

With a direct reach of 5000 peple, we try to make HP sustainable. have you noticed that in most public science activities

> science lead and patients are mainly told
> when inclusivity becomes a one-way event
> the identities solidify
> science and patient
> giver and receiver

This creates invisible barriers that keep some voices outside science and we wanted to make a difference

Our project focuses on the differentiation and evolutionary potential of fungal multicellular clusters as we study fungal infectious diseases we began to say that fungal challenges aren't just biological.
They are deeply human stripped by people intersectioning identities and lived realities through the lens of intersectionalities.
we saw that barriers in science often overlap and building an inclusive scientific community begins right here.

We found that patients with epidermolysis bullosa, a rare disease, face three barriers in science. They are unseen voiceless and excluded - we call this scientific voicelessness.

To respond, we build a three-step framework: first visibility, through an art charity sale where patients appeared as artists not just patient; second empowerment, using sensory friendly method, colors and doodles, patients could more easily express real feelings and these voices deserve to be heard by science; third involvement, in photovoice workshops and the art experience exhibition patients, doctors and researchers co-design solutions to fungal challenges - identified in our earlier studies throughout this process.

Patients became co-designers not just subjects. Inspired by the patient's story, we develop our lab assistive software protocol flow and launch the laboratory mental health in a crucial initiative, inviting people at the margins to be seen, to express and to join in creation, showed us how crucial in science benefit everyone that's the true power of inclusivity.

For us, Inclusivity is not a destination, it's a way of asking better questions. Not just how can we help others, but also how can others shape science with us.
We brought the seeds of science back to campus enlightening the curiosity of the younger generation through activities. We participated in entrepreneurship competitions, promoting our target screening service to cros in the CCiC. We engaged in deep dialogs with life science professors, doctors from Huashan hospital and representatives of patients.

What's truly exciting about DR.strategy is its life dynamic tracking of resistance evolution this leap from static data to real time insights is a powerful advance.

I see this project having a profound positive impact on accelerating new antifungal drug development worldwide.
More than a platform, this is DR.strategy born from our curiosity and dedication to life. We're decoding revolution to secure humanity's future and sparkle the dawn of next-generation therapies.

----

By the way, our promotion video is at [https://video.igem.org/w/nri1zca7eHRFtGVEZWxfqe](https://video.igem.org/w/nri1zca7eHRFtGVEZWxfqe).
