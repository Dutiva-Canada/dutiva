// G15 — Group Termination Notice (Jurisdiction-Aware)
export default function(j) {
  return {
    id: "T15",
    slug: "Group_Termination_Notice",
    kind: "notice",
    titleEN: "Group Termination of Employment — Notice",
    titleFR: "Licenciement collectif — Avis",

    bodyEN: [
      { type: "h1", text: "Notice of Group Termination of Employment", align: "center" },
      { type: "p", text: "**Issued by:** {{employer_legal_name}}   •   **Date:** {{notice_date}}", align: "center" },

      { type: "p", text: "This notice is provided to employees affected by a group termination of employment, to the Minister of Labour (or equivalent authority in the applicable jurisdiction), and — where required — to the employees' bargaining agent. We are issuing it because " + j.groupTriggerFR + ", and we want affected employees to have clear information about why, what to expect, and what support we are providing." },

      { type: "h2", text: "1. Why this is happening" },
      { type: "p", text: "**{{employer_legal_name}}** has made the difficult decision to eliminate approximately **{{affected_headcount}}** positions at **{{affected_location}}**, effective **{{effective_date}}**, for the following reason: **{{reason_for_group_termination}}**. This decision was not made lightly. We know the impact on the people affected, and on their families, is real — and we are committed to treating everyone with dignity and providing the notice, entitlements and support the law requires, and in many cases more than the law requires." },

      { type: "h2", text: "2. Legal framework" },
      { type: "p", text: "Group terminations in Canada are subject to enhanced notice rules, which vary by jurisdiction. The key statutes that apply to this group termination include:" },
      { type: "bullet", text: "**" + j.nameEN + "** — " + j.groupTermStatEN + "." },
      { type: "p", text: "The detailed entitlements for each affected employee are set out in the individual notice they will also receive. This group notice does not reduce any individual's entitlements under their contract, the common law, or any collective agreement." },

      { type: "h2", text: "3. Notice period and last day of work" },
      { type: "p", text: "Affected employees will receive working notice beginning on **{{notice_date}}**, with a last day of work on **{{effective_date}}**. Where the Company elects to provide pay in lieu of working notice in whole or in part, this will be stated in each individual notice. The statutory notice period applicable to this group termination is **{{statutory_notice_weeks}}** weeks, based on the headcount of affected employees." },

      { type: "h2", text: "4. Severance, termination pay and individual entitlements" },
      { type: "p", text: "In addition to statutory notice, affected employees may be entitled to statutory severance pay where the applicable legislation provides for it. The Company will honour these statutory minimums in full, and will in many cases provide an enhanced package above the statutory floor, conditional on signature of a full and final release. The details are in each individual's termination letter." },

      { type: "h2", text: "5. Continuation of benefits" },
      { type: "p", text: "Group benefits coverage will continue through the statutory notice period at minimum, and in many cases beyond. Specific end dates for each affected employee are set out in their individual notice." },

      { type: "h2", text: "6. Employment Insurance and Record of Employment" },
      { type: "p", text: "Records of Employment will be issued promptly in accordance with the **Employment Insurance Regulations**, SOR/96-332, s. 19(3). We encourage affected employees to apply for Employment Insurance benefits as soon as their employment ends. Information about applying is available at canada.ca/ei." },

      { type: "h2", text: "7. Career transition support" },
      { type: "p", text: "The Company is providing the following career transition support to affected employees: **{{career_transition_support}}**. This is in addition to statutory entitlements and is offered because we believe people deserve real help finding their next role, not just a form letter." },

      { type: "h2", text: "8. Union and bargaining agent notification" },
      { type: "p", text: "Where affected employees are represented by a union or other bargaining agent, that organization has been or is being notified at the same time as this notice, in accordance with the applicable collective agreement and legislation." },

      { type: "h2", text: "9. Questions and contact" },
      { type: "p", text: "We know this raises a lot of questions, and we want to answer them. Please reach out to **{{hr_contact_name}}** at **{{hr_contact_email}}** or **{{hr_contact_phone}}**. We'll also hold information sessions on **{{info_session_dates}}** for any affected employee who would like to attend. Please come — we'd rather hear the questions and answer them directly than have anyone wondering in silence." },

      { type: "p", text: "---" },
    ],

    bodyFR: [
      { type: "h1", text: "Avis de licenciement collectif", align: "center" },
      { type: "p", text: "**Émis par :** {{employer_legal_name}}   •   **Date :** {{notice_date}}", align: "center" },

      { type: "p", text: "Le présent avis est remis aux personnes salariées visées par un licenciement collectif, au ministre du Travail (ou à l'autorité équivalente dans la juridiction applicable), et — lorsque requis — à l'agent négociateur des salarié(e)s. Nous le transmettons parce que " + j.groupTriggerFR + ", et nous voulons que les personnes concernées disposent d'une information claire sur les raisons, les conséquences et le soutien offert." },

      { type: "h2", text: "1. Pourquoi cette décision" },
      { type: "p", text: "**{{employer_legal_name}}** a pris la décision difficile d'abolir environ **{{affected_headcount}}** postes à **{{affected_location}}**, à compter du **{{effective_date}}**, pour la raison suivante : **{{reason_for_group_termination}}**. Cette décision n'a pas été prise à la légère. Nous mesurons l'impact sur les personnes concernées et sur leurs familles — et nous nous engageons à traiter chacune d'elles avec dignité et à fournir le préavis, les droits et le soutien prévus par la loi, et dans bien des cas davantage." },

      { type: "h2", text: "2. Cadre légal" },
      { type: "p", text: "Les licenciements collectifs au Canada sont soumis à des règles de préavis bonifiées, variables selon la juridiction. Les principales lois applicables sont :" },
      { type: "bullet", text: "**" + j.nameFR + "** — " + j.groupTermStatFR + "." },
      { type: "p", text: "Les droits particuliers de chaque personne visée figurent dans l'avis individuel qui lui sera également remis. Le présent avis de groupe ne réduit aucun droit prévu par contrat, par la common law ou par une convention collective applicable." },

      { type: "h2", text: "3. Période de préavis et dernier jour de travail" },
      { type: "p", text: "Les personnes visées recevront un préavis travaillé à compter du **{{notice_date}}**, avec un dernier jour de travail le **{{effective_date}}**. Si la Société choisit de verser une indemnité en tenant lieu de préavis, en tout ou en partie, cela sera indiqué dans l'avis individuel. La période de préavis légale applicable au présent licenciement collectif est de **{{statutory_notice_weeks}}** semaines, en fonction de l'effectif des personnes visées." },

      { type: "h2", text: "4. Indemnités, cessation d'emploi et droits individuels" },
      { type: "p", text: "En plus du préavis légal, les personnes visées peuvent avoir droit à une indemnité de cessation d'emploi lorsque la législation applicable le prévoit. La Société respectera intégralement ces minimums légaux, et offrira dans bien des cas un montant bonifié au-delà du seuil légal, conditionnellement à la signature d'une quittance complète et définitive. Les détails figurent dans la lettre individuelle." },

      { type: "h2", text: "5. Maintien des avantages sociaux" },
      { type: "p", text: "La protection d'avantages collectifs se poursuivra au moins pendant la période de préavis légal, et dans bien des cas au-delà. Les dates précises pour chaque personne figurent dans son avis individuel." },

      { type: "h2", text: "6. Assurance-emploi et relevé d'emploi" },
      { type: "p", text: "Les relevés d'emploi seront émis sans délai conformément au **Règlement sur l'assurance-emploi**, DORS/96-332, art. 19(3). Nous encourageons les personnes visées à présenter une demande d'assurance-emploi dès la fin de leur emploi. Les renseignements sont disponibles à canada.ca/ae." },

      { type: "h2", text: "7. Soutien à la transition de carrière" },
      { type: "p", text: "La Société offre le soutien de transition de carrière suivant aux personnes visées : **{{career_transition_support}}**. Cela s'ajoute aux droits légaux et est offert parce que nous croyons que les gens méritent une aide réelle pour trouver leur prochain poste, et non une simple lettre-formulaire." },

      { type: "h2", text: "8. Notification au syndicat ou à l'agent négociateur" },
      { type: "p", text: "Lorsque les personnes visées sont représentées par un syndicat ou un autre agent négociateur, cette organisation a été ou est actuellement notifiée en même temps que le présent avis, conformément à la convention collective et à la législation applicables." },

      { type: "h2", text: "9. Questions et personne-ressource" },
      { type: "p", text: "Nous savons que cela soulève beaucoup de questions, et nous voulons y répondre. Communiquez avec **{{hr_contact_name}}** à **{{hr_contact_email}}** ou au **{{hr_contact_phone}}**. Nous tiendrons aussi des séances d'information le **{{info_session_dates}}** pour toute personne visée qui souhaiterait y assister. Venez — nous préférons entendre et répondre directement aux questions plutôt que de laisser qui que ce soit dans l'incertitude." },

      { type: "p", text: "---" },
    ],

    legalNotesEN: [
      {
        heading: "1. Ontario ESA s. 58 — group termination notice and O. Reg. 288/01",
        body: "Employment Standards Act, 2000, s. 58: where an employer terminates 50 or more employees at an establishment within a 4-week period, the employer must: (a) give written notice to each affected employee (8 weeks if 50–199 employees; 12 weeks if 200–499; 16 weeks if 500+); (b) give a copy of the notice to the Director of Employment Standards using Form 1 (O. Reg. 288/01); (c) if applicable, give notice to the bargaining agent. Working notice, pay in lieu, or a combination may be used. The notice period runs from the date of notice to the last day of work. **Action:** File Form 1 with the Director on the same day notice is given to employees; retain a copy for records.",
      },
      {
        heading: "2. Québec ARLS arts. 84.0.1–84.0.13 — collective dismissal and comité de reclassement",
        body: "Act Respecting Labour Standards, CQLR c N-1.1: a collective dismissal occurs where an employer terminates 10 or more employees in the same establishment within any 2-month period. Employer must: (a) give written notice to each affected employee (8, 12 or 16 weeks depending on headcount: 8 weeks for 10–49, 12 weeks for 50–99, 16 weeks for 100+); (b) give simultaneous written notice to the Minister of Employment; (c) establish a joint comité de reclassement (job retraining/placement committee) within 20 days of notice. The notice period cannot be waived by pay in lieu without the employee's written consent (art. 84.0.4). An employer who fails to give the required notice is liable to pay wages equivalent to the notice period (art. 84.0.13). Personal liability attaches to officers who contravene. **Action:** File notice with the Minister; establish the comité de reclassement within 20 days.",
      },
      {
        heading: "3. Federal CLC ss. 212–214 — large-scale termination and joint planning committee",
        body: "Canada Labour Code, Part III, ss. 212–213: where a federal employer proposes to terminate 50 or more employees at a single industrial establishment within any 4-week period, it must give 16 weeks' written notice to the Minister of Labour. **CLC s. 214**: the employer must establish a joint planning committee with employee representatives within the notice period to develop adjustment measures (retraining, placement assistance, wage subsidies for lower-paid work). Failure to establish the committee or to give notice is an offence. If the employer is then able to place affected employees in comparable work, the notice period may be shortened. **Action:** File notice with the Minister; establish the joint planning committee on or before the deadline.",
      },
      {
        heading: "4. BC ESA s. 64 — group termination notice",
        body: "Employment Standards Act, R.S.B.C. 1996, c. 113, s. 64: where an employer terminates 50 or more employees at a single location within any 2-month period, enhanced notice is required: 8 weeks (50–99 employees), 12 weeks (100–299), 16 weeks (300+). Notice must be given to each affected employee and to the Director of Employment Standards simultaneously. Unlike Ontario, BC does not provide for pay in lieu of the group termination notice period without the employee's consent — working notice is the norm. **Action:** Provide written notice to each employee and to the Director on the same date.",
      },
      {
        heading: "5. Individual severance pay obligations — concurrent with group notice",
        body: "Even in a group termination context, employees who individually meet severance criteria must receive statutory severance in addition to group termination notice. Ontario ESA s. 64 (employer payroll ≥$2.5M and 5+ years service: 1 week per year, max 26 weeks); Federal CLC s. 235 (12+ months service: 2 days per year, min 5 days). **Action:** Identify all employees who meet the individual severance threshold before finalizing the termination package; calculate severance pay independently for each.",
      },
      {
        heading: "6. Record of Employment — mass issuance and timely ROE Web submission",
        body: "ROEs must be issued for each affected employee within 5 calendar days of the first day of interruption of earnings under Employment Insurance Regulations, SOR/96-332, s. 19(3). In a large group termination, coordinate with payroll to ensure ROEs are issued on time. Service Canada provides bulk ROE submission through ROE Web for employers terminating 50+ employees. Failure to issue timely ROEs can delay employees' access to EI benefits and may result in employer penalties under the Employment Insurance Act. **Action:** Prepare ROE codes in advance (Code E for dismissal); submit to Service Canada on time.",
      },
      {
        heading: "7. Systemic discrimination risk in RIF decisions — protected group analysis",
        body: "Where the employee selection for a reduction-in-force (RIF) disproportionately affects a protected group (older workers, women, persons with disabilities, racialized employees, Indigenous employees, employees on parental leave), the affected employees may bring a systemic discrimination complaint under the applicable Human Rights Code or Canadian Human Rights Act. Courts will scrutinize the selection criteria and apply disparate impact analysis. **Action:** Conduct a disparate-impact analysis of the proposed RIF population before finalizing decisions; document selection criteria (objective, non-discriminatory); apply them consistently; retain all analysis for potential litigation.",
      },
    ],

    legalNotesFR: [
      {
        heading: "1. LNE Ontario, art. 58 — avis de licenciement collectif et Règl. O. 288/01",
        body: "Loi de 2000 sur les normes d'emploi, art. 58 : lorsqu'un employeur licencie 50 personnes salariées ou plus dans un même établissement sur une période de 4 semaines, il doit : (a) donner un avis écrit à chaque salarié(e) visé(e) (8 semaines pour 50–199, 12 pour 200–499, 16 pour 500+); (b) transmettre une copie au directeur des normes d'emploi à l'aide de la Formule 1; (c) le cas échéant, aviser l'agent négociateur. L'avis travaillé, l'indemnité en tenant lieu ou une combinaison peuvent être utilisés. **Action :** Déposer la Formule 1 auprès du directeur le même jour que l'avis aux employé(e)s.",
      },
      {
        heading: "2. LNT Québec, art. 84.0.1–84.0.13 — licenciement collectif et comité de reclassement",
        body: "Loi sur les normes du travail, RLRQ c N-1.1 : un licenciement collectif survient lorsqu'un employeur licencie 10 personnes salariées ou plus dans le même établissement sur une période de 2 mois. L'employeur doit : (a) donner un avis écrit à chaque salarié(e) (8, 12 ou 16 semaines selon l'effectif); (b) aviser simultanément le ministre de l'Emploi; (c) former un comité de reclassement dans les 20 jours. L'art. 84.0.4 interdit de remplacer l'avis par une indemnité sans le consentement écrit de la personne salariée. L'art. 84.0.13 prévoit une responsabilité égale aux salaires en cas de défaut. **Action :** Aviser le ministre; établir le comité de reclassement dans les 20 jours.",
      },
      {
        heading: "3. CCT fédéral, art. 212–214 — cessation collective et comité mixte de planification",
        body: "Code canadien du travail, Partie III, art. 212–213 : un employeur fédéral qui entend licencier 50 personnes salariées ou plus dans un même établissement industriel sur une période de 4 semaines doit donner un avis de 16 semaines au ministre du Travail. **Art. 214** : l'employeur doit former un comité mixte de planification avec les représentants des salarié(e)s pour élaborer des mesures d'adaptation. Le défaut constitue une infraction. **Action :** Aviser le ministre; établir le comité mixte.",
      },
      {
        heading: "4. ESA C.-B., art. 64 — licenciement collectif",
        body: "Employment Standards Act de la C.-B. (R.S.B.C. 1996, ch. 113, art. 64) : lorsqu'un employeur licencie 50+ salarié(e)s à un seul endroit sur une période de 2 mois, un avis bonifié est requis : 8 semaines (50–99), 12 semaines (100–299), 16 semaines (300+). L'avis doit être remis simultanément à chaque salarié(e) et au directeur des normes d'emploi. **Action :** Fournir l'avis écrit à chaque employé(e) et au directeur à la même date.",
      },
      {
        heading: "5. Indemnité de départ individuelle — concurrente avec l'avis collectif",
        body: "Même dans un licenciement collectif, les salarié(e)s qui satisfont individuellement aux critères doivent recevoir l'indemnité. LNE Ontario art. 64 (5+ ans et masse salariale ≥2,5 M$); CCT fédéral art. 235 (12+ mois de service). **Action :** Identifier tous les salarié(e)s avant de finaliser l'offre; calculer l'indemnité individuellement.",
      },
      {
        heading: "6. Relevés d'emploi — émission en masse et soumission à RE Web",
        body: "Des relevés d'emploi doivent être émis pour chaque salarié(e) dans les 5 jours civils du premier jour d'interruption, en vertu du Règlement sur l'AE (DORS/96-332, art. 19(3)). Coordonner avec la paie pour assurer l'émission à temps. Service Canada offre la soumission en masse via RE Web. **Action :** Préparer les codes de RE à l'avance (Code E); soumettre à Service Canada à temps.",
      },
      {
        heading: "7. Risque de discrimination systémique dans les décisions de mise à pied",
        body: "Si la sélection des personnes visées touche de façon disproportionnée un groupe protégé (travailleurs plus âgés, femmes, personnes handicapées, salarié(e)s racialisé(e)s), les personnes concernées peuvent déposer une plainte de discrimination systémique. **Action :** Effectuer une analyse d'impact disparate sur la population sélectionnée; documenter les critères objectifs et non discriminatoires; appliquer de façon uniforme.",
      },
    ],
  };
};
