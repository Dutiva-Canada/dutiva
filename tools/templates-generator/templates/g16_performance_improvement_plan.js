// G16 — Performance Improvement Plan (Jurisdiction-Aware)
module.exports = function(j) {
  return {
    id: "T16",
    slug: "Performance_Improvement_Plan",
    kind: "form",
    titleEN: "Performance Improvement Plan",
    titleFR: "Plan d'amélioration du rendement",

    bodyEN: [
      { type: "h1", text: "Performance Improvement Plan", align: "center" },
      { type: "p", text: "**Employee:** {{employee_name}}   •   **Role:** {{position_title}}   •   **Manager:** {{manager_name}}", align: "center" },
      { type: "p", text: "**PIP Start:** {{pip_start_date}}   •   **PIP End:** {{pip_end_date}}   •   **Review Cadence:** {{pip_review_cadence}}", align: "center" },

      { type: "p", text: "This Performance Improvement Plan (PIP) exists because we believe you can succeed in your role at **{{employer_legal_name}}**, and we want to give you clear, fair support to get there. A PIP is not a disciplinary measure and it is not, by itself, a step towards termination. It is a structured plan — specific expectations, concrete support, scheduled check-ins, and honest feedback — so that there are no surprises and you know exactly where you stand." },

      { type: "h2", text: "1. Why we are having this conversation" },
      { type: "p", text: "Over the past period, the following areas of your performance have not met the expectations of your role: **{{performance_concerns_summary}}**. We are setting these out in plain language, with specific examples where we can, so that we are both working from the same understanding of the situation. If you see it differently, we want to hear that — this plan works best when it is a two-way conversation." },

      { type: "h2", text: "2. Expectations for the PIP period" },
      { type: "p", text: "During the PIP period, you will be expected to meet the following specific, measurable expectations:" },
      { type: "bullet", text: "**Expectation 1:** {{expectation_1}}" },
      { type: "bullet", text: "**Expectation 2:** {{expectation_2}}" },
      { type: "bullet", text: "**Expectation 3:** {{expectation_3}}" },
      { type: "p", text: "These expectations are what success looks like for the PIP. They are not in addition to your regular job — they describe your regular job, done at the standard the role requires." },

      { type: "h2", text: "3. Support the Company will provide" },
      { type: "p", text: "We are not setting you up to fail. The Company will provide the following support during the PIP period:" },
      { type: "bullet", text: "**Coaching and feedback** — regular working sessions with your manager on **{{coaching_cadence}}**, focused on the specific expectations above." },
      { type: "bullet", text: "**Training and resources** — **{{training_resources}}**, paid for by the Company." },
      { type: "bullet", text: "**Clear priorities** — your manager will help you prioritize your workload so the expectations above are achievable in the time available." },
      { type: "bullet", text: "**Accommodation** — if any of the concerns relate to a medical condition, disability, family status or other ground protected by human rights legislation, please let us know. We will engage in a good-faith accommodation process up to the point of undue hardship, in accordance with the " + j.hrStatEN + " and the *Meiorin* standard (*British Columbia (PSERC) v. BCGSEU*, [1999] 3 S.C.R. 3)." },

      { type: "h2", text: "4. Check-ins and progress reviews" },
      { type: "p", text: "Your manager will meet with you **{{pip_review_cadence}}** throughout the PIP period to discuss your progress, give honest feedback, and adjust the plan where it makes sense. A written summary of each check-in will be shared with you promptly so you can keep track of where you stand. If something in this plan becomes unrealistic because of a change in your role or priorities, we will revisit it together." },

      { type: "h2", text: "5. What happens at the end of the PIP" },
      { type: "p", text: "At the end of the PIP period, your manager and HR will assess your progress against the expectations above and one of the following will happen:" },
      { type: "bullet", text: "**Successful completion** — If the expectations are met, the PIP closes and you continue in your role. We'll also put a note in your file confirming the successful outcome — something to be proud of." },
      { type: "bullet", text: "**Extension** — If progress has been made but the expectations are not yet fully met, the PIP may be extended for a further period where that is fair and realistic." },
      { type: "bullet", text: "**Further action** — If the expectations are not met and the Company concludes that your performance is unlikely to reach the required standard, further employment action may result, up to and including termination of employment. Any such decision will be made fairly and in good faith, with honest and accurate reasons, without humiliating or abusive conduct in the manner of dismissal, and in accordance with the principles established in " + j.unjustDismissEN + " and applicable employment standards legislation. Your statutory entitlements under the " + j.termStatEN + " and other applicable law will be fully respected." },

      { type: "h2", text: "6. Your rights during this process" },
      { type: "p", text: "You have the right to: (a) receive clear, specific feedback on your performance and how to improve it; (b) ask questions at any point and have them answered; (c) raise concerns about any part of the PIP process through HR or the Company's internal grievance channels without fear of retaliation; (d) ask for and receive reasonable accommodation where human rights legislation requires it; and (e) be treated with dignity and good faith throughout this process." },

      { type: "h2", text: "7. If something outside work is affecting your performance" },
      { type: "p", text: "People are not machines, and sometimes things outside of work — health, family, loss — affect how we show up. If that is part of what's happening for you, please let us know what you're comfortable sharing. We offer an Employee and Family Assistance Program for confidential support, and we can often adjust the plan or provide other accommodations. Asking for help is never held against anyone here." },

      { type: "h2", text: "8. Acknowledgement" },
      { type: "p", text: "Your signature below confirms that you have received a copy of this PIP and that it has been discussed with you. It does not mean you agree with every point — if you disagree with any part, please say so, and you are welcome to submit a written response that will be kept alongside this plan in your file." },

      { type: "spacer" },
      { type: "sig", leftLabel: "MANAGER", rightLabel: "EMPLOYEE — RECEIVED AND DISCUSSED" },
    ],

    bodyFR: [
      { type: "h1", text: "Plan d'amélioration du rendement", align: "center" },
      { type: "p", text: "**Salarié(e) :** {{employee_name}}   •   **Poste :** {{position_title}}   •   **Gestionnaire :** {{manager_name}}", align: "center" },
      { type: "p", text: "**Début du PAR :** {{pip_start_date}}   •   **Fin du PAR :** {{pip_end_date}}   •   **Fréquence des suivis :** {{pip_review_cadence}}", align: "center" },

      { type: "p", text: "Le présent plan d'amélioration du rendement (PAR) existe parce que nous croyons que vous pouvez réussir dans votre poste chez **{{employer_legal_name}}**, et nous voulons vous offrir un appui clair et équitable pour y parvenir. Un PAR n'est pas une mesure disciplinaire et ne constitue pas, en soi, une étape vers la cessation d'emploi. C'est un plan structuré — attentes précises, soutien concret, points de suivi planifiés et rétroaction honnête — afin qu'il n'y ait aucune surprise et que vous sachiez exactement où vous en êtes." },

      { type: "h2", text: "1. Pourquoi nous avons cette conversation" },
      { type: "p", text: "Au cours de la dernière période, les aspects suivants de votre rendement n'ont pas satisfait aux attentes de votre poste : **{{performance_concerns_summary}}**. Nous les présentons en langage clair, avec des exemples précis lorsque possible, afin que nous partagions la même compréhension de la situation. Si vous voyez les choses autrement, nous voulons l'entendre — ce plan fonctionne mieux lorsqu'il est une conversation à deux voix." },

      { type: "h2", text: "2. Attentes pour la période du PAR" },
      { type: "p", text: "Durant la période du PAR, vous devrez répondre aux attentes précises et mesurables suivantes :" },
      { type: "bullet", text: "**Attente 1 :** {{expectation_1}}" },
      { type: "bullet", text: "**Attente 2 :** {{expectation_2}}" },
      { type: "bullet", text: "**Attente 3 :** {{expectation_3}}" },
      { type: "p", text: "Ces attentes correspondent à ce qu'est la réussite dans ce PAR. Elles ne s'ajoutent pas à votre emploi habituel — elles décrivent votre emploi habituel, accompli à la hauteur du poste." },

      { type: "h2", text: "3. Soutien fourni par la Société" },
      { type: "p", text: "Nous ne cherchons pas à vous faire échouer. La Société offrira le soutien suivant pendant la période du PAR :" },
      { type: "bullet", text: "**Accompagnement et rétroaction** — séances régulières avec votre gestionnaire selon la fréquence **{{coaching_cadence}}**, axées sur les attentes ci-dessus." },
      { type: "bullet", text: "**Formation et ressources** — **{{training_resources}}**, payées par la Société." },
      { type: "bullet", text: "**Priorités claires** — votre gestionnaire vous aidera à prioriser votre charge afin que les attentes ci-dessus soient réalisables dans le temps imparti." },
      { type: "bullet", text: "**Accommodement** — si l'une des préoccupations est liée à un état de santé, à un handicap, à une situation familiale ou à un autre motif protégé par " + j.hrStatFR + ", dites-le-nous. Nous engagerons un processus d'accommodement de bonne foi, jusqu'à la contrainte excessive, conformément à la norme *Meiorin* (*C.-B. (PSERC) c. BCGSEU*, [1999] 3 R.C.S. 3)." },

      { type: "h2", text: "4. Points de suivi et revues de progrès" },
      { type: "p", text: "Votre gestionnaire vous rencontrera **{{pip_review_cadence}}** tout au long du PAR pour discuter de votre progression, offrir une rétroaction honnête et ajuster le plan lorsque cela se justifie. Un résumé écrit de chaque point sera partagé avec vous sans délai, afin que vous puissiez suivre votre évolution. Si un élément du plan devient irréaliste en raison d'un changement dans votre rôle ou vos priorités, nous le réviserons ensemble." },

      { type: "h2", text: "5. Ce qui se passe à la fin du PAR" },
      { type: "p", text: "À la fin de la période du PAR, votre gestionnaire et les RH évalueront votre progression par rapport aux attentes ci-dessus, et l'une des issues suivantes s'appliquera :" },
      { type: "bullet", text: "**Réussite** — Si les attentes sont satisfaites, le PAR prend fin et vous poursuivez dans votre poste. Une note au dossier confirmera la réussite — ce sera une bonne nouvelle." },
      { type: "bullet", text: "**Prolongation** — Si des progrès ont été accomplis mais que les attentes ne sont pas encore pleinement satisfaites, le PAR pourra être prolongé lorsque cela est juste et réaliste." },
      { type: "bullet", text: "**Autre mesure** — Si les attentes ne sont pas satisfaites et que la Société conclut que votre rendement n'atteindra probablement pas le niveau requis, d'autres mesures peuvent être prises, pouvant aller jusqu'à la cessation d'emploi. Toute décision sera prise avec équité et bonne foi, avec des motifs honnêtes et exacts, sans conduite abusive dans le mode de congédiement, et conformément aux principes énoncés dans " + j.unjustDismissFR + " et la législation applicable sur les normes du travail. Vos droits légaux prévus par la " + j.termStatFR + " et toute autre loi applicable seront pleinement respectés." },

      { type: "h2", text: "6. Vos droits pendant le processus" },
      { type: "p", text: "Vous avez le droit de : a) recevoir une rétroaction claire et précise sur votre rendement et sur la manière de l'améliorer; b) poser des questions à tout moment et obtenir des réponses; c) soulever des préoccupations sur tout aspect du processus par l'intermédiaire des RH ou des mécanismes internes de la Société, sans crainte de représailles; d) demander et recevoir un accommodement raisonnable lorsque la législation sur les droits de la personne l'exige; e) être traité(e) avec dignité et bonne foi tout au long du processus." },

      { type: "h2", text: "7. Si quelque chose à l'extérieur du travail affecte votre rendement" },
      { type: "p", text: "Les gens ne sont pas des machines, et parfois des événements extérieurs — santé, famille, deuil — influencent la façon dont on se présente au travail. Si c'est une partie de ce que vous vivez, dites-nous ce que vous êtes à l'aise de partager. Nous offrons un programme d'aide aux employés et à la famille confidentiel, et nous pouvons souvent ajuster le plan ou offrir d'autres accommodements. Demander de l'aide n'est jamais retenu contre qui que ce soit ici." },

      { type: "h2", text: "8. Accusé de réception" },
      { type: "p", text: "Votre signature confirme que vous avez reçu copie du présent PAR et qu'il en a été discuté avec vous. Cela ne signifie pas que vous êtes d'accord avec chaque point — si vous êtes en désaccord avec un élément, dites-le, et vous pouvez soumettre une réponse écrite qui sera conservée avec le plan à votre dossier." },

      { type: "spacer" },
      { type: "sig", leftLabel: "GESTIONNAIRE", rightLabel: "SALARIÉ(E) — REÇU ET DISCUTÉ" },
    ],

    legalNotesEN: [
      {
        heading: "1. Non-culpable vs. culpable performance — McKinley standard",
        body: "McKinley v. BC Tel, 2001 SCC 38: the contextual just-cause analysis distinguishes between culpable conduct (intentional misconduct, deliberate poor performance) and non-culpable conduct (incapacity, inability despite genuine effort). For non-culpable performance issues, an employer cannot simply terminate for cause after a failed PIP — the employer must establish that: (a) the employee was warned of the performance deficiency; (b) given a reasonable opportunity to improve; (c) actually failed to improve despite those opportunities; and (d) the employment relationship is no longer viable. A failed PIP is evidence of steps (a) and (b), but the employer must still meet steps (c) and (d) at the time of termination. Courts apply this rigorous standard across all Canadian jurisdictions.",
      },
      {
        heading: "2. Accommodation duty during PIP — Meiorin standard applies in all provinces",
        body: "Meiorin standard (British Columbia (PSERC) v. BCGSEU, [1999] 3 S.C.R. 3) is binding law across all Canadian jurisdictions: if any part of the performance concern relates to a disability, medical condition, family status, or other protected ground, the employer's obligation to accommodate must be addressed BEFORE or DURING the PIP process — not after. Proceeding with a PIP and subsequent termination without exploring accommodation (or without proving accommodation would cause undue hardship) can give rise to a human rights complaint and significant damages even if the performance deficiency is genuine. **Action:** At the start of the PIP, ask in writing: 'Do you have any disability, medical condition, family status, or other ground protected by human rights legislation that may be relevant to the performance concerns identified?' Document the response and any accommodations offered in detail.",
      },
      {
        heading: "3. Good faith in PIP — Bhasin / C.M. Callow standard",
        body: "Bhasin v. Hrynew, 2014 SCC 71; C.M. Callow Inc. v. Zollinger, 2020 SCC 45: the duty of honest contractual performance applies to the PIP process itself. The employer must not issue a PIP as a pretextual step toward a pre-determined termination decision. If the employer has already decided to terminate the employee, issuing a PIP as a 'paper trail' exercise (without genuine intent to allow the employee to succeed) can constitute breach of the duty of good faith and give rise to additional damages beyond wrongful dismissal damages. **Action:** Ensure the manager completing the PIP genuinely believes the employee has a reasonable opportunity to meet the expectations. If the employer has already decided to terminate, that decision must not be hidden behind a sham PIP.",
      },
      {
        heading: "4. Manner of dismissal — Honda Canada standard",
        body: "Honda Canada Inc. v. Keays, 2008 SCC 39: where a termination follows a failed PIP, the manner of dismissal remains subject to good faith requirements. This means: (a) the stated reasons for termination must be accurate and not designed to humiliate the employee; (b) the investigation or assessment process (including the PIP itself) must have been conducted fairly; (c) the employer must not make false allegations to justify the termination. Damages for bad faith in the manner of dismissal are separate from wrongful dismissal damages (often substantial). A failed PIP does not eliminate the need for good faith conduct in the final termination meeting.",
      },
      {
        heading: "5. Notice entitlements after failed PIP — Bardal factors not reduced",
        body: "If the employee is terminated after a failed PIP, the notice entitlement depends on: (a) whether the termination clause in the Employment Agreement is valid (post-Waksdale compliance); (b) if the clause is void or inapplicable, the Bardal factors at common law (age, length of service, position, availability of comparable work). Critically, the PIP does NOT reduce the notice entitlement — the employee's length of service and other Bardal factors determine the quantum. A 6-month PIP followed by termination does not justify a notice reduction. **Action:** Confirm the termination clause is Waksdale-compliant (Ontario) or otherwise enforceable before proceeding to termination after a failed PIP. If the clause is void, expect to owe common law notice based on Bardal factors.",
      },
      {
        heading: "6. Documentation and evidentiary standards for PIP",
        body: "A PIP is only useful as an evidentiary record if it is: (a) signed by the employee (or the employee's refusal to sign is documented); (b) accompanied by written notes of each check-in meeting (signed by the manager); (c) specific about the expectations and deficiencies (vague expectations 'do better' are easily challenged); (d) consistently applied (different standards for different employees doing similar work will undermine the employer's position); (e) kept confidential (shared only with those with a legitimate need to know). Retain all PIP records for at least 3 years after employment ends, and longer if litigation is threatened. Absent comprehensive documentation, a court may find the PIP was pretextual or inadequate.",
      },
    ],

    legalNotesFR: [
      {
        heading: "1. Rendement non coupable c. coupable — norme McKinley",
        body: "McKinley c. BC Tel, 2001 CSC 38 : l'analyse contextuelle de la cause juste distingue la conduite coupable (inconduite intentionnelle, mauvais rendement délibéré) de la conduite non coupable (incapacité, inaptitude malgré un effort sincère). Pour les problèmes de rendement non coupables, l'employeur ne peut pas simplement congédier pour cause après l'échec d'un PAR — il doit établir que : (a) la personne salariée a été avertie; (b) a eu une occasion raisonnable de s'améliorer; (c) n'a pas réussi à s'améliorer malgré ces occasions; (d) la relation d'emploi n'est plus viable. Un PAR échoué constitue une preuve des étapes (a) et (b), mais l'employeur doit toujours satisfaire aux étapes (c) et (d).",
      },
      {
        heading: "2. Obligation d'accommodement durant le PAR — norme Meiorin",
        body: "Norme Meiorin (C.-B. (PSERC) c. BCGSEU, [1999] 3 R.C.S. 3) : si une partie des problèmes de rendement est liée à un handicap, un état de santé, une situation familiale ou un autre motif protégé, l'obligation d'accommodement doit être traitée AVANT ou PENDANT le PAR — pas après. Procéder à un PAR et à une cessation d'emploi sans explorer l'accommodement peut donner lieu à une plainte en droits de la personne même si la lacune de rendement est réelle. **Action :** Au début du PAR, demander par écrit si la personne salariée a un handicap ou un autre motif protégé pertinent, et documenter la réponse.",
      },
      {
        heading: "3. Bonne foi dans le PAR — norme Bhasin / C.M. Callow",
        body: "Bhasin c. Hrynew, 2014 CSC 71; C.M. Callow Inc. c. Zollinger, 2020 CSC 45 : l'obligation d'exécution honnête s'applique au processus de PAR. L'employeur ne doit pas utiliser le PAR comme étape prétextuelle vers une décision de congédiement déjà prise. Si l'employeur a déjà décidé de congédier la personne salariée, l'utilisation du PAR comme simple « piste documentaire » (sans intention sincère de permettre la réussite) peut constituer une mauvaise foi donnant lieu à des dommages supplémentaires.",
      },
      {
        heading: "4. Mode de congédiement — norme Honda Canada",
        body: "Honda Canada Inc. c. Keays, 2008 CSC 39 : lorsqu'un congédiement fait suite à l'échec d'un PAR, le mode de congédiement reste soumis à l'exigence de bonne foi. Les motifs doivent être exacts et ne pas viser à humilier; le processus d'évaluation doit être équitable; l'employeur ne doit pas formuler de fausses allégations. Les dommages pour mauvaise foi dans le mode de congédiement sont distincts des dommages pour congédiement injustifié.",
      },
      {
        heading: "5. Quantum du préavis après échec du PAR — facteurs Bardal non réduits",
        body: "Si la personne salariée est congédiée après l'échec du PAR, le droit au préavis dépend de : (a) la validité de la clause de cessation; (b) si nulle, des facteurs Bardal (ancienneté, âge, nature du poste, disponibilité d'emplois comparables). Un PAR ne réduit pas le droit au préavis — l'ancienneté et les facteurs Bardal déterminent le quantum. **Action :** Confirmer que la clause de cessation est valide avant de procéder.",
      },
      {
        heading: "6. Documentation et normes de preuve du PAR",
        body: "Un PAR n'est utile que s'il est : (a) signé par la personne salariée (ou le refus documenté); (b) accompagné de notes écrites de chaque réunion de suivi; (c) précis quant aux attentes (les attentes vagues sont facilement contestables); (d) appliqué de façon uniforme; (e) confidentiel. Conserver tous les documents pendant au moins 3 ans après la fin de l'emploi. Absent une documentation complète, un tribunal peut conclure que le PAR était prétextuel.",
      },
    ],
  };
};
