// G13 — Workplace Harassment, Discrimination & Violence Prevention Policy (Jurisdiction-Aware)
export default function(j) {
  return {
    id: "T13",
    slug: "Harassment_Discrimination_Violence_Policy",
    kind: "policy",
    titleEN: "Workplace Harassment, Discrimination and Violence Prevention Policy",
    titleFR: "Politique de prévention du harcèlement, de la discrimination et de la violence en milieu de travail",

    bodyEN: [
      { type: "h1", text: "Workplace Harassment, Discrimination and Violence Prevention Policy", align: "center" },
      { type: "p", text: "**Effective:** {{policy_effective_date}}", align: "center" },

      { type: "h2", text: "Our commitment" },
      { type: "p", text: "Every person at **{{employer_legal_name}}** has the right to a workplace that is safe, respectful, and free from harassment, discrimination and violence. This is not just the law — it is how we want to work. This policy says what we mean by those words, how to report a concern, what we will do about it, and how we will protect you throughout the process." },

      { type: "h2", text: "1. Who this applies to" },
      { type: "p", text: "This policy applies to everyone who works for or with the Company — employees, officers, directors, contractors, interns, and visitors — in any location where Company business is conducted, including offices, remote workspaces, client sites, business travel, Company events, and Company-related digital spaces such as email, chat and video." },

      { type: "h2", text: "2. What we don't allow" },
      { type: "p", text: "The Company does not tolerate:" },
      { type: "bullet", text: "**Harassment** — " + j.harassBodyEN + ". This includes sexual harassment, workplace bullying, and any conduct based on a protected ground." },
      { type: "bullet", text: "**Sexual harassment** — unwelcome sexual advances, requests for sexual favours, or other verbal, visual or physical conduct of a sexual nature." },
      { type: "bullet", text: "**Discrimination** — treating a person unfairly because of any ground protected by human rights legislation, including race, colour, ancestry, place of origin, creed, religion, citizenship, ethnic origin, disability, sex, sexual orientation, gender identity, gender expression, family status, marital status, age, record of offences (as applicable), and any other protected ground." },
      { type: "bullet", text: "**Workplace violence** — the exercise or attempted exercise of physical force that could cause harm, or a threat of such force." },
      { type: "bullet", text: "**Retaliation** — any adverse action taken against someone for making a complaint in good faith, cooperating with an investigation, or exercising any right under this policy or applicable law." },

      { type: "h2", text: "3. Legal framework" },
      { type: "p", text: "This policy is designed to comply with " + j.harassStatEN + " and the applicable human rights statutes that govern our workplaces. The key legislation that applies includes:" },
      { type: "bullet", text: "**" + j.nameEN + "** — " + j.harassStatEN + "." },
      { type: "bullet", text: "**Human Rights** — " + j.hrStatEN + "." },
      { type: "bullet", text: "All other applicable federal, provincial, and territorial occupational health and safety and human rights legislation." },

      { type: "h2", text: "4. Expectations for everyone" },
      { type: "p", text: "We expect each person to: treat others with respect; speak up when something is wrong; participate in required training on respectful workplaces; and support colleagues who raise concerns. Leaders have the additional responsibility to model these behaviours, to act when they become aware of a concern, and to protect confidentiality." },

      { type: "h2", text: "5. How to report" },
      { type: "p", text: "If you experience or witness harassment, discrimination, violence or retaliation, you can:" },
      { type: "bullet", text: "Talk to your manager, if you feel safe doing so." },
      { type: "bullet", text: "Contact **{{hr_contact_name}}** at **{{hr_contact_email}}** or **{{hr_contact_phone}}**." },
      { type: "bullet", text: "Contact our confidential reporting channel at **{{confidential_reporting_channel}}**, which accepts anonymous reports." },
      { type: "bullet", text: "If you are in immediate danger, contact local emergency services first (911 in Canada)." },
      { type: "p", text: "You will not be retaliated against for making a good-faith report. We will protect your identity to the extent reasonably possible, and we will share information on a strict need-to-know basis." },

      { type: "h2", text: "6. How we investigate" },
      { type: "p", text: "When a concern is reported, the Company will:" },
      { type: "bullet", text: "Acknowledge receipt promptly (normally within **{{ack_period}}**)." },
      { type: "bullet", text: "Conduct a fair, impartial and timely investigation, appropriate to the circumstances. This may include interviewing the complainant, the respondent, and any witnesses, and reviewing relevant documents. External investigators may be used where appropriate." },
      { type: "bullet", text: "Give both the complainant and the respondent a fair opportunity to be heard and to respond to allegations." },
      { type: "bullet", text: "Maintain confidentiality to the greatest extent possible, sharing information only with those who need to know." },
      { type: "bullet", text: "Inform the complainant and the respondent, in writing, of the results and any corrective actions (to the extent legally permitted), normally within **{{results_period}}** of the conclusion of the investigation." },

      { type: "h2", text: "7. Corrective actions" },
      { type: "p", text: "If a complaint is substantiated, we will take corrective action that is proportionate to the conduct and consistent with applicable law. Actions may include an apology, coaching, training, reassignment, written warning, suspension, or termination of employment. Where misconduct may amount to just cause, we will apply a contextual analysis in accordance with *McKinley v. BC Tel*, 2001 SCC 38." },

      { type: "h2", text: "8. Domestic violence" },
      { type: "p", text: "We recognize that domestic violence can follow a person into the workplace. If you are experiencing domestic violence, we will take reasonable steps to keep you safe at work and help you access support, including statutory domestic-violence leave where applicable. Please reach out to **{{hr_contact_name}}** — confidentially — and we will work with you on a safety plan." },

      { type: "h2", text: "9. Training and prevention" },
      { type: "p", text: "All employees and managers will receive training on this policy at onboarding and annually thereafter, and managers will receive additional training on their responsibilities. We will assess workplace violence risks at least annually, and take reasonable steps to mitigate them." },

      { type: "h2", text: "10. Your statutory rights" },
      { type: "p", text: "Nothing in this policy limits your right to file a complaint with the human rights commission, the labour standards regulator, the OHS regulator, or to pursue any other remedy available to you under applicable law. We will cooperate with any such process and will not retaliate against you for pursuing it." },

      { type: "h2", text: "11. Program review" },
      { type: "p", text: "This policy and the related workplace harassment and violence prevention program will be reviewed at least annually, and updated to reflect changes in the law, lessons learned from investigations, and feedback from employees. The most current version is posted at **{{policy_url}}**." },

      { type: "h2", text: "12. Questions" },
      { type: "p", text: "If you have questions about this policy or are unsure whether a behaviour crosses a line, please ask. **{{hr_contact_name}}** is your first point of contact, and every manager should be prepared to listen and respond. We'd rather have the conversation early." },
    ],

    bodyFR: [
      { type: "h1", text: "Politique de prévention du harcèlement, de la discrimination et de la violence en milieu de travail", align: "center" },
      { type: "p", text: "**Date d'entrée en vigueur :** {{policy_effective_date}}", align: "center" },

      { type: "h2", text: "Notre engagement" },
      { type: "p", text: "Chaque personne chez **{{employer_legal_name}}** a droit à un milieu de travail sûr, respectueux et exempt de harcèlement, de discrimination et de violence. Ce n'est pas qu'une question de loi — c'est notre façon de vouloir travailler. La présente politique définit les termes, explique comment signaler une préoccupation, ce que nous ferons à son égard et comment nous vous protégerons tout au long du processus." },

      { type: "h2", text: "1. À qui cela s'applique" },
      { type: "p", text: "La politique s'applique à toute personne qui travaille pour ou avec la Société — employé(e)s, dirigeant(e)s, administrateurs(trices), entrepreneurs(euses), stagiaires et visiteurs(euses) — dans tout lieu où se déroulent les activités de la Société, y compris les bureaux, les espaces de travail à distance, les sites des clients, les déplacements, les événements et les espaces numériques liés à la Société (courriel, clavardage, vidéo)." },

      { type: "h2", text: "2. Ce que nous ne tolérons pas" },
      { type: "p", text: "La Société ne tolère pas :" },
      { type: "bullet", text: "**Le harcèlement** — " + j.harassBodyFR + ". Cela comprend le harcèlement sexuel, l'intimidation et toute conduite fondée sur un motif protégé." },
      { type: "bullet", text: "**Le harcèlement sexuel** — des avances, demandes de faveurs à caractère sexuel ou toute autre conduite verbale, visuelle ou physique non sollicitée à caractère sexuel." },
      { type: "bullet", text: "**La discrimination** — tout traitement inéquitable fondé sur un motif protégé par la législation en matière de droits de la personne, y compris la race, la couleur, l'ascendance, l'origine, la religion, la citoyenneté, l'origine ethnique, le handicap, le sexe, l'orientation sexuelle, l'identité de genre, l'expression de genre, la situation familiale, l'état civil, l'âge, les antécédents judiciaires (le cas échéant) et tout autre motif protégé." },
      { type: "bullet", text: "**La violence en milieu de travail** — l'exercice ou la tentative d'exercice d'une force physique susceptible de causer un préjudice, ou la menace d'une telle force." },
      { type: "bullet", text: "**Les représailles** — toute mesure défavorable prise contre une personne ayant déposé une plainte de bonne foi, ayant coopéré à une enquête ou ayant exercé un droit prévu par la politique ou par la loi applicable." },

      { type: "h2", text: "3. Cadre juridique" },
      { type: "p", text: "La politique est conçue pour respecter " + j.harassStatFR + " et les lois applicable en matière de droits de la personne qui régissent nos lieux de travail." },
      { type: "bullet", text: "**" + j.nameFR + "** — " + j.harassStatFR + "." },
      { type: "bullet", text: "**Droits de la personne** — " + j.hrStatFR + "." },
      { type: "bullet", text: "Toute autre législation fédérale, provinciale et territoriale applicable en matière de santé et sécurité au travail et de droits de la personne." },

      { type: "h2", text: "4. Attentes envers tous" },
      { type: "p", text: "Nous attendons de chaque personne qu'elle : traite les autres avec respect; parle lorsqu'il y a un problème; participe à la formation obligatoire sur le respect en milieu de travail; et soutienne les collègues qui soulèvent des préoccupations. Les dirigeants ont la responsabilité additionnelle d'incarner ces comportements, d'agir dès qu'ils sont informés d'une préoccupation et de protéger la confidentialité." },

      { type: "h2", text: "5. Comment signaler" },
      { type: "p", text: "Si vous êtes victime ou témoin de harcèlement, de discrimination, de violence ou de représailles, vous pouvez :" },
      { type: "bullet", text: "Parler à votre gestionnaire, si cela vous semble sécuritaire." },
      { type: "bullet", text: "Communiquer avec **{{hr_contact_name}}** à **{{hr_contact_email}}** ou au **{{hr_contact_phone}}**." },
      { type: "bullet", text: "Utiliser notre canal confidentiel à **{{confidential_reporting_channel}}**, qui accepte les signalements anonymes." },
      { type: "bullet", text: "En cas de danger immédiat, communiquer d'abord avec les services d'urgence locaux (911 au Canada)." },
      { type: "p", text: "Aucune représaille ne sera exercée pour un signalement de bonne foi. Nous protégerons votre identité dans la mesure raisonnablement possible et ne partagerons l'information qu'avec les personnes qui doivent en connaître." },

      { type: "h2", text: "6. Processus d'enquête" },
      { type: "p", text: "Lorsqu'une préoccupation est signalée, la Société :" },
      { type: "bullet", text: "Accusera réception rapidement (normalement dans un délai de **{{ack_period}}**)." },
      { type: "bullet", text: "Mènera une enquête équitable, impartiale et diligente, adaptée aux circonstances. Cela peut comprendre des entretiens avec la personne plaignante, la personne mise en cause et les témoins, ainsi que l'examen des documents pertinents. Des enquêteurs externes peuvent être mandatés au besoin." },
      { type: "bullet", text: "Accordera à la personne plaignante et à la personne mise en cause une occasion équitable d'être entendues et de répondre aux allégations." },
      { type: "bullet", text: "Maintiendra la confidentialité dans la plus grande mesure possible, en ne partageant l'information qu'avec les personnes qui doivent en connaître." },
      { type: "bullet", text: "Informera par écrit la personne plaignante et la personne mise en cause des résultats et des mesures correctives (dans la mesure permise par la loi), normalement dans un délai de **{{results_period}}** à la fin de l'enquête." },

      { type: "h2", text: "7. Mesures correctives" },
      { type: "p", text: "Si une plainte est fondée, nous prendrons des mesures correctives proportionnées à la conduite et conformes à la loi applicable. Les mesures peuvent comprendre des excuses, un coaching, une formation, une réaffectation, un avertissement écrit, une suspension ou la cessation d'emploi. Lorsque l'inconduite peut justifier une cause juste et suffisante, nous appliquerons une analyse contextuelle conforme à *McKinley c. BC Tel*, 2001 CSC 38." },

      { type: "h2", text: "8. Violence conjugale" },
      { type: "p", text: "Nous reconnaissons que la violence conjugale peut suivre une personne au travail. Si vous vivez de la violence conjugale, nous prendrons des mesures raisonnables pour assurer votre sécurité et vous aider à accéder à du soutien, y compris un congé statutaire pour violence conjugale le cas échéant. Communiquez avec **{{hr_contact_name}}** — en toute confidentialité — et nous établirons ensemble un plan de sécurité." },

      { type: "h2", text: "9. Formation et prévention" },
      { type: "p", text: "Tous les employé(e)s et gestionnaires recevront une formation sur la politique à l'accueil et annuellement, et les gestionnaires recevront une formation additionnelle sur leurs responsabilités. Nous évaluerons au moins une fois par année les risques de violence en milieu de travail et prendrons des mesures raisonnables pour les atténuer." },

      { type: "h2", text: "10. Vos droits légaux" },
      { type: "p", text: "Rien dans la politique ne limite votre droit de déposer une plainte auprès de la commission des droits de la personne, de l'autorité en matière de normes du travail, de l'autorité en santé et sécurité, ou d'exercer tout autre recours prévu par la loi. Nous coopérerons à tout processus et n'exercerons aucune représaille en raison de celui-ci." },

      { type: "h2", text: "11. Révision du programme" },
      { type: "p", text: "La présente politique et le programme de prévention connexe seront révisés au moins une fois par année et mis à jour en fonction des changements législatifs, des leçons tirées des enquêtes et des commentaires des employé(e)s. La version la plus récente est publiée à **{{policy_url}}**." },

      { type: "h2", text: "12. Questions" },
      { type: "p", text: "Si vous avez des questions ou si vous ne savez pas si un comportement franchit la ligne, demandez. **{{hr_contact_name}}** est votre premier point de contact, et chaque gestionnaire devrait être prêt à écouter et à répondre. Mieux vaut en parler tôt." },
    ],

    legalNotesEN: [
      {
        heading: "1. Ontario OHSA ss. 32.0.1–32.0.8 — written harassment and violence program",
        body: "Occupational Health and Safety Act, R.S.O. 1990, c. O.1, Part III.0.1: Ontario employers must develop and maintain a written workplace harassment and workplace violence policy reviewed at least annually, conduct a violence risk assessment, and provide information and instruction. Failure to implement the required program can result in inspector orders and fines up to $1.5M. **Action:** Ensure the policy is reviewed and dated annually; maintain documentation of violence risk assessments and all investigation reports for at least 3 years.",
      },
      {
        heading: "2. Québec ARLS arts. 81.18–81.20 — psychological harassment obligation",
        body: "Every employee in Québec has the right to work free from psychological harassment. The employer must take reasonable means to prevent it and, when aware of it, put a stop to it. An employee who has been subject to harassment may file a complaint with CNESST within 2 years of the last incidence. Remedy can include reinstatement, back wages, damages, and payment for psychotherapy. **Action:** Document all complaints and remedial steps; maintain proof of 'reasonable means' (policy, training, investigation).  Private settlement discussions should not be mistaken for abandonment of the claim.",
      },
      {
        heading: "3. Federal WPHVPR (SOR/2020-130) — comprehensive assessment and annual reporting",
        body: "Work Place Harassment and Violence Prevention Regulations, SOR/2020-130: federally regulated employers must conduct a workplace assessment to identify risk factors, develop a comprehensive harassment and violence prevention program, respond to all notices of occurrence, provide annual training, and submit an annual report to ESDC. Non-compliance can result in compliance orders and fines. **Action:** For federally regulated employers, ensure annual written assessments are completed, training is recorded, and the annual report is filed on time with ESDC.",
      },
      {
        heading: "4. Employer liability for negligent investigation — Correia standard",
        body: "Courts have held employers liable for inadequate investigations of harassment complaints (Correia v. Canac Kitchens, 2008 ONCA 506). A negligent investigation can independently constitute constructive dismissal of the complainant. Investigations must be: (a) prompt; (b) impartial (investigator with no conflict of interest); (c) thorough (all material witnesses interviewed; evidence documented); (d) procedurally fair to both complainant and respondent; (e) documented in a written report. Consider retaining an external investigator for senior employee or senior manager complaints to avoid bias. **Action:** For any complaint involving harassment, establish an investigation timeline before beginning interviews.",
      },
      {
        heading: "5. Harassment as discrimination — Human Rights Code liability",
        body: "Workplace harassment based on a protected ground (race, sex, disability, sexual orientation, gender identity, age, family status, etc.) is a form of discrimination under the applicable Human Rights Code. The employer's obligation is not merely to investigate after the fact — it includes proactive measures to prevent discriminatory harassment. Failure to address a complaint of discriminatory harassment, or to protect the complainant from retaliation, can result in significant damages under human rights legislation (often with no cap in common law provinces). **Action:** Review the investigation file to confirm the investigator considered whether the alleged conduct was motivated by or related to a protected ground.",
      },
      {
        heading: "6. Domestic violence — OHSA s. 32.0.4 and ARLS — employer's safety duty",
        body: "Ontario OHSA s. 32.0.4: if an employer becomes aware or ought reasonably to be aware that domestic violence that would likely expose a worker to physical injury may occur in the workplace, the employer must take every precaution reasonable in the circumstances for protection. This may include safety planning, temporary workplace adjustments, emergency contact protocols, or adjusted schedules. Québec ARLS arts. 81.19.1 et seq. provide specific provisions for domestic violence leave and workplace safety obligations. **Action:** Train HR and managers to recognize signs of domestic violence; document the employee's safety plan in a confidential file; coordinate with EAP for support resources.",
      },
    ],

    legalNotesFR: [
      {
        heading: "1. Ontario LSST art. 32.0.1–32.0.8 — programme écrit de prévention",
        body: "Loi sur la santé et la sécurité au travail, L.R.O. 1990, chap. O.1, Partie III.0.1 : les employeurs ontariens doivent élaborer et maintenir une politique écrite de prévention du harcèlement et de la violence au travail, révisée au moins annuellement, effectuer une évaluation des risques de violence et fournir information et instruction. Le non-respect peut entraîner des ordonnances d'inspecteur et des amendes jusqu'à 1,5 M$. **Action :** S'assurer que la politique est révisée et datée annuellement; conserver la documentation des évaluations des risques et tous les rapports d'enquête pendant au moins 3 ans.",
      },
      {
        heading: "2. Québec LNT art. 81.18–81.20 — obligation de prévention du harcèlement",
        body: "Tout salarié au Québec a droit à un milieu de travail exempt de harcèlement psychologique. L'employeur doit prendre les moyens raisonnables pour le prévenir et, s'il en est informé, y mettre fin. Un(e) salarié(e) victime peut déposer une plainte auprès de la CNESST dans les 2 ans du dernier incident. Le recours peut comprendre la réintégration, les salaires rétroactifs, des dommages-intérêts et le paiement de psychothérapie. **Action :** Documenter tous les signalements et les mesures prises; conserver la preuve des « moyens raisonnables » (politique, formation, enquête).",
      },
      {
        heading: "3. Fédéral RPTHVMT (DORS/2020-130) — évaluation et rapport annuel",
        body: "Règlement sur la prévention du harcèlement et de la violence dans le lieu de travail (DORS/2020-130) : les employeurs fédéraux doivent effectuer une évaluation du lieu de travail, élaborer un programme complet, répondre à tous les signalements, offrir une formation annuelle et déposer un rapport annuel à EDSC. **Action :** Pour les employeurs fédéraux, s'assurer que les évaluations écrites annuelles sont complétées, la formation est consignée et le rapport annuel est déposé à temps.",
      },
      {
        heading: "4. Responsabilité de l'employeur — enquête inadéquate",
        body: "Les tribunaux ont tenu des employeurs responsables d'enquêtes inadéquates sur les plaintes de harcèlement (Correia c. Canac Kitchens, 2008 ONCA 506). Une enquête inadéquate peut constituer un congédiement déguisé. Les enquêtes doivent être : (a) rapides; (b) impartiales (enquêteur sans conflit); (c) approfondies (tous les témoins entendus; preuves documentées); (d) équitables sur le plan procédural; (e) documentées par écrit. Envisager un enquêteur externe pour les plaintes impliquant des cadres supérieurs. **Action :** Pour toute plainte, établir un calendrier d'enquête avant le début des entretiens.",
      },
      {
        heading: "5. Harcèlement comme discrimination — responsabilité en droits de la personne",
        body: "Le harcèlement fondé sur un motif protégé (race, sexe, handicap, orientation sexuelle, identité de genre, âge, situation familiale, etc.) constitue une forme de discrimination. L'obligation de l'employeur comprend les mesures proactives pour prévenir le harcèlement discriminatoire. Le défaut de traiter une plainte ou de protéger la personne plaignante peut entraîner des dommages-intérêts importants (souvent sans plafond). **Action :** Examiner le dossier d'enquête pour confirmer que l'enquêteur a considéré si la conduite allégée était motivée par ou liée à un motif protégé.",
      },
      {
        heading: "6. Violence conjugale — obligation de sécurité de l'employeur",
        body: "LSST Ontario, art. 32.0.4 : si un employeur sait ou devrait savoir que la violence conjugale pourrait exposer un(e) travailleur(se) à des blessures, il doit prendre toutes les précautions raisonnables. Cela peut comprendre un plan de sécurité, des ajustements horaires, des protocoles d'urgence. LNT Québec, art. 81.19.1 et suiv. : dispositions spécifiques pour les congés et obligations de sécurité. **Action :** Former les RH et les gestionnaires à reconnaître les signes de violence conjugale; documenter le plan de sécurité dans un dossier confidentiel.",
      },
    ],
  };
};
