import { nextTick } from 'vue';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export function useScene3() {
  const doctorReplies = [
    { id: 3, text: 'The reasons for the outbreak of the crisis are complicated, changing climates, changing biotic interactions, changing virulence of the fungi and so much more.' },
    { id: 4, text: 'But at the heart of tackling the problem and stemming the tide of emerging antimicrobial resistance, tracking the drug resistant gene mutations in the microbials are of paramount importance.' }
  ];

  const triggerDoctorReplies = (dialogs, dialogBoxRefs, isActive = () => true) => {
    const getActive = typeof isActive === 'function'
      ? isActive
      : () => Boolean(isActive?.value ?? isActive);

    const firstReplyDelay = gsap.delayedCall(1.5, () => {
      if (!getActive()) return;
      dialogs.value.push(doctorReplies[0]);
      nextTick(() => {
        if (!getActive()) return;
        const el1 = dialogBoxRefs[doctorReplies[0].id];
        if (el1) {
          gsap.to(el1, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' });
          gsap.to(el1, { text: doctorReplies[0].text, duration: 1.5, ease: 'none' });
        }
      });
    });

    const secondReplyDelay = gsap.delayedCall(4.0, () => {
      if (!getActive()) return;
      dialogs.value.push(doctorReplies[1]);
      nextTick(() => {
        if (!getActive()) return;
        const el2 = dialogBoxRefs[doctorReplies[1].id];
        if (el2) {
          gsap.to(el2, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' });
          gsap.to(el2, { text: doctorReplies[1].text, duration: 1.5, ease: 'none' });
        }
      });
    });

    return () => {
      firstReplyDelay?.kill();
      secondReplyDelay?.kill();
    };
  };

  return { triggerDoctorReplies };
}
