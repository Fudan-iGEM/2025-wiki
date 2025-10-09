---
title: Description
author:
  - name: Zuyao Wu
    url: /fudan/team/#Zuyao
    avatar: https://static.igem.wiki/teams/5643/pageimage/team/wzy-a.webp
layout: igem
heroImage: https://static.igem.wiki/teams/5643/header/sus.webp
description: On this page, we describe why we developed a new way to study microbial evolution.
---

## The Global Challenge: Antifungal Resistance

Fungi are responsible for a wide spectrum of human diseases, ranging from superficial infections to severe, life-threatening systemic mycoses. According to recent estimates, more than **6.55 million cases of acute fungal-related infections** occur every year worldwide, leading to approximately **3.8 million deaths**[^1].

<div style="text-align: center;" id="fig1">
    <img src="https://static.igem.wiki/teams/5643/pageimage/description/fig-1-fungal-infection.webp" style="width:50%"/>
    <div>
        <span style="color:gray">Figure 1. Superficial infections caused by fungi<br>
(Image from https://www.freepik.com/) </span>
        <br><br>
    </div>
</div>


What makes this challenge especially alarming is the rapid rise of **antifungal resistance**. Pathogenic fungi are increasingly resistant to nearly all licensed systemic antifungal drugs[^2]. Multidrug-resistant species such as *Candida auris* have already caused widespread outbreaks across multiple regions, posing a direct and escalating threat to public health[^3] [^4]. Despite this immense burden, public awareness of fungal diseases remains limited, and the development of antifungal therapies has been stagnant for decades, worsening this dire situation.

In the face of this growing crisis, identifying new drug targets is not just an academic pursuit — it is an urgent necessity. A reliable and innovative platform to uncover resistance mutations could pave the way for next-generation antifungal therapies and strengthen our ability to respond to this silent yet pressing epidemic.

<div style="text-align: center;" id="fig2">
    <img src="https://static.igem.wiki/teams/5643/pageimage/description/antifungal-resistance.webp" style="width:50%"/>
    <div>
        <span style="color:gray">Figure 2. Antifungal Resistance<br>
(Image from https://www.freepik.com/) </span>
        <br><br>
    </div>
</div>


## Current Limitations in Drug Target Discovery

Although the urgency of developing new antifungal strategies is clear, current approaches to identifying drug resistance mutations remain deeply limited. Most existing methods are **retrospective and static** which rely on analyzing clinical isolates or endpoint samples. These methods struggle with distinguishing the truly causative gene mutations for resistance versus incidental; face high computational demands and time burdens for sample preparation, sequencing, and analysis; lack standardized protocols for comparing results across labs or conditions. As a result, the most crucial aspect of resistance — **how it develops over time within populations** — remains largely invisible.[^5]

Taken together, these shortcomings demonstrate the need for a **new kind of platform**: one that is standardized, dynamic, and able to directly track resistance mutations in real time. Such a system would not only allow us to identify resistance earlier but also reveal the evolutionary pathways fungi take as they adapt, offering insights that static methods cannot provide.


## Our Inspiration: From Multicellularity to Evolution

The turning point for our project came from an unexpected source of inspiration. While exploring literature on traceable evolution, one of our team members encountered the book *The Song of The Cell*[^6], which introduced the concept of **multicellularity as a visible form of short-term evolution**. This idea struck us profoundly. If multicellularity can make evolutionary change observable within the span of a few generations, perhaps it could also be used to track something as elusive and critical as the evolution of drug resistance. After all, fungi acquiring  resistance itself is an evolutionary process—fungal populations adapt to survive under drug pressure, and these adaptations leave a trail of mutations that, if properly recorded, could be studied in real time.



<div style="text-align: center;" id="fig3">
    <img src="https://static.igem.wiki/teams/5643/pageimage/description/fig2-the-song-of-the-cells.webp" style="width:80%"/>
    <div>
        <span style="color:gray">Figure 3. The inspiring page of the book <em>The Song of The Cell</em></span>
        <br><br>
    </div>
</div>

Intrigued by this possibility, we began tracing the origins of multicellular yeast research and were surprised to discover that it had strong ties to our own university. The pioneering work in this field was carried out by our alumnus **Kai Tong**, under the mentorship of Professor [Ratcliff](https://ratclifflab.biosci.gatech.edu/), a leading researcher in experimental evolution. When we reached out to them, they not only affirmed the novelty of our idea but also encouraged us that such a system could indeed be feasible. Their guidance and enthusiasm gave us the confidence to move forward.

This was the moment when a conceptual link turned into a concrete plan. We realized that by leveraging synthetic biology tools to engineer multicellular yeast as a living recorder, we could capture the evolutionary trajectory of antifungal resistance. From that moment, our project was born: building a platform that transforms the study of resistance from static snapshots into **dynamic, observable evolution in action**.


## Our Solution: *DR.sTraTeGY*

This led the Fudan iGEM 2025 team to create *DR.sTraTeGY* (**Drug Resistance mutation Tracking Technology based on Grape Yeast**), an innovative platform to track the evolutionary dynamics of fungal resistance.

Our project uses a novel chassis organism, the multicellular **“Grape Yeast”**. Unlike traditional unicellular systems, Grape Yeast provides a structured, programmable arena where spatial organization and cell differentiation make evolutionary processes directly observable.

<div style="text-align: center;" id="fig4">
    <img src="https://static.igem.wiki/teams/5643/pageimage/description/wiki-logo-1.webp" style="width:33%"/>
    <div>
        <span style="color:gray">Figure 4. Our logo</span>
        <br><br>
    </div>
</div>

Building on this chassis, we developed two key modules: the **Timer**, which traces cell lineage and developmental history, and the **Recorder**, which inscribes the genetic footprint of evolutionary pressures. Together, they shift resistance research from static snapshots to a **dynamic, unfolding narrative**.

Through this design, our aim is to move beyond retrospective analysis and establish a system that not only tracks the resistance mutations but also visualizes the trajectories. Ultimately, *DR.sTraTeGY* offers a new framework to confront the global crisis of antifungal resistance—capturing fungal evolution, inspiring future research to build upon this new chassis and guiding the development of next-generation therapies.

Learn more about the design and construction of *DR.sTraTeGY* on our [Design](/design/) page.


## From Wet-Lab to Dry-Lab: Model Integration

While the Grape Yeast chassis gives us a powerful biological platform to observe resistance in real time, experimental work alone is not enough. To systematically explore evolutionary dynamics and guide our design choices, we built a complementary computational tool: **YeastVerse**. This modeling platform was developed to bridge wet-lab and dry-lab, enabling us to simulate yeast behavior across diverse environmental conditions before committing resources to experiments.

YeastVerse allows us to do several critical things. It can screen feasible parameter ranges, ensuring that the design of our constructs is realistic and efficient. It helps us validate promoter selection and expression strategies, confirming whether the biological mechanisms we propose are likely to work as intended. It also provides clear design guidelines for subsequent wet-lab experiments, reducing unnecessary trial-and-error and making our engineering cycle more efficient.

<div style="text-align: center;" id="fig5">
    <img src="https://static.igem.wiki/teams/5643/pageimage/description/yeastverse-1.webp" style="width:80%"/>
    <div>
        <span style="color:gray">Figure 5. Using YeastVerse to simulate the growth of multicellular yeast</span>
        <br><br>
    </div>
</div>

By combining experimental and computational perspectives, we ensure that *DR.sTraTeGY* is not only observable but also predictable. In doing so, we provide future researchers with a robust framework to study resistance dynamics and design their own interventions with greater confidence.

Explore more details about **YeastVerse** on our [Model](/model/) page.


## Beyond the Lab: Inclusivity &amp; Diversity

Just as fungi adapt under relentless drug pressure, patients with fungal infections similarly endure survival pressures not only from the disease itself but also from the social environments that surround them. As we studied fungal resistance, we became increasingly aware that those living with fungal infections often face challenges that go far beyond the biological disease itself. Many patients shared experiences of being **misunderstood, judged, or stigmatized** because of their condition. 

This observation reminds us that resilience is not merely a biological phenomenon but also a profoundly human one—shaped by systems that can either support or stigmatize. Guided by this perspective, our project seeks to remain rooted in laboratory research while staying connected to the lived experiences of the people it ultimately serves.

In response, we designed an outreach program that placed **inclusivity at its center**. We experimented with sensory-friendly and creative research methods that allowed participants to express what is often difficult to articulate in words. Through [participatory mapping](/Inclusivity/), patients, elderly participants, and transplant recipients used drawings, colors, and metaphors to reflect on their lived experiences. By employing approaches such as **PhotoVoice** and the **Science of Healing**, we invited participants to act as both contributors and "artists", giving them visibility and a stronger sense of agency.

<div style="text-align: center;" id="fig6">
    <img src="https://static.igem.wiki/teams/5643/pageimage/inclusivity/inclusivecharity.webp" style="width:100%"/>
    <div>
        <span style="color:gray">Figure 6. A glimpse into our Inclusivity activities</span>
        <br><br>
    </div>
</div>

These activities did more than document perspectives—they created spaces for dialogue,brought people together and opened channels for mutual understanding.  Just as we aim to track resistance evolution in real time, we also strive to make sure that those affected by fungal infections are seen and heard in real life. We believe that a scientific platform addressing antifungal resistance must also reflect the values of equity, respect, and shared humanity.

Discover vivid stories of our [Inclusivity](/Inclusivity/) activities.


## Conclusion

Our project, *DR.sTraTeGY*, is more than a technological advancement - is our response to one of the most urgent yet underappreciated challenges in global health. The innovation of this project lies in the synergistic combination of its modules, making it a comprehensive tool that is far greater than the sum of its parts. By engineering the **Grape Yeast** as a multicellular chassis, and equipping it with the **Timer** and **Recorder** modules, we have created a living platform capable of transforming resistance research from static, retrospective analysis into real-time, observable evolution. This shift allows us not only to track resistance mutations but also to anticipate their trajectories, paving the way for the discovery of new antifungal targets and strategies.

Yet our vision extends beyond the laboratory. Through **YeastVerse**, our integrated computational model, we ensure that the biology we study is both predictable and testable, strengthening the Design–Build–Test–Learn cycle and offering future researchers a tool that can accelerate antifungal research. At the same time, our commitment to **inclusivity** ensures that science does not unfold in isolation but in conversation with the people most affected by fungal infections. By amplifying marginalized voices and creating new forms of dialogue, we show that scientific innovation and social responsibility can and must go hand in hand.

Together, these elements capture the essence of *DR.sTraTeGY*: not just a new way to study microbial evolution, but a new way of practicing science — advancing knowledge while serving humanity. We believe *DR.sTraTeGY* holds the potential to accelerate antifungal drug development, deepen our understanding of evolution, and stand as a vital tool in humanity’s defense against fungal threats.


## References

[^1]: Denning D. W. (2024). Global incidence and mortality of severe fungal disease. *The Lancet. Infectious diseases*, 24(7), e428–e438. DOI: 10.1016/S1473-3099(23)00692-8
[^2]: Fisher, M. C., Alastruey-Izquierdo, A., Berman, J., Bicanic, T., Bignell, E. M., Bowyer, P., Bromley, M., Brüggemann, R., Garber, G., Cornely, O. A., Gurr, S. J., Harrison, T. S., Kuijper, E., Rhodes, J., Sheppard, D. C., Warris, A., White, P. L., Xu, J., Zwaan, B., & Verweij, P. E. (2022). Tackling the emerging threat of antifungal resistance to human health. *Nature reviews. Microbiology*, 20(9), 557–571. DOI: 10.1038/s41579-022-00720-1
[^3]: Bhargava, A., Klamer, K., Sharma, M., Ortiz, D., & Saravolatz, L. (2025). *Candida auris*: A Continuing Threat. *Microorganisms*, 13(3), 652. DOI: 10.3390/microorganisms13030652
[^4]: Shawn R. Lockhart, Kizee A. Etienne, Snigdha Vallabhaneni, Joveria Farooqi, Anuradha Chowdhary, Nelesh P. Govender, Arnaldo Lopes Colombo, Belinda Calvo, Christina A. Cuomo, Christopher A. Desjardins, Elizabeth L. Berkow, Mariana Castanheira, Rindidzani E. Magobo, Kauser Jabeen, Rana J. Asghar, Jacques F. Meis, Brendan Jackson, Tom Chiller, Anastasia P. Litvintseva, Simultaneous Emergence of Multidrug-Resistant *Candida auris* on 3 Continents Confirmed by Whole-Genome Sequencing and Epidemiological Analyses, *Clinical Infectious Diseases*, Volume 64, Issue 2, 15 January 2017, Pages 134–140, DOI: 10.1093/cid/ciw691
[^5]: Blundell, J. R., & Levy, S. F. (2014). Beyond genome sequencing: lineage tracking with barcodes to study the dynamics of evolution, infection, and cancer. *Genomics*, 104(6 Pt A), 417–430. DOI: 10.1016/j.ygeno.2014.09.005
[^6]: Mukherjee, S. (2022). *The song of the cell: An exploration of medicine and the new human*. Scribner.
