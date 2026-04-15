// G06 — Written Warning (progressive discipline, humane, non-punitive framing)
export default function(j) {
  return {
    id: "T06",
    slug: "Written_Warning",
    kind: "letter",
    titleEN: "Written Warning — Progressive Discipline",
    titleFR: "Avertissement écrit — Discipline progressive",

  bodyEN: [
    { type: "date" },
    { type: "address", lines: [
      "{{employee_name}}",
      "{{employee_address_line_1}}",
      "{{employee_address_line_2}}",
    ]},
    { type: "re", text: "Written warning — {{warning_subject}}" },
    { type: "p", text: "Dear {{employee_first_name}}," },
    { type: "p", text: "The purpose of this letter is to formally document a concern we have discussed with you and to confirm the expectations going forward. A written warning is a serious step, but it is not the end of the road — it is an honest, early conversation so we can course-correct together." },

    { type: "h2", text: "1. Summary of the concern" },
    { type: "p", text: "On **{{incident_date}}**, the following occurred: **{{incident_description}}**. This was discussed with you on **{{verbal_warning_date}}** by **{{verbal_warning_by}}**. Despite that conversation, the concern has not been fully resolved." },

    { type: "h2", text: "2. Why this is a concern" },
    { type: "p", text: "The behaviour described above is inconsistent with **{{policy_or_expectation}}**. We are raising it because it matters to us, to your colleagues, and to our customers — and because we believe you can meet the expectation with the right support." },

    { type: "h2", text: "3. What we expect going forward" },
    { type: "p", text: "Effective immediately, we expect you to:" },
    { type: "bullet", text: "**{{expectation_1}}**" },
    { type: "bullet", text: "**{{expectation_2}}**" },
    { type: "bullet", text: "**{{expectation_3}}**" },
    { type: "p", text: "We will check in on **{{checkin_date}}** to discuss how things are going. In the meantime, your manager **{{manager_name}}** is available to support you — please reach out whenever you need to." },

    { type: "h2", text: "4. Support available to you" },
    { type: "p", text: "If anything outside of work is making it harder to meet these expectations — your health, a family situation, anything protected under human rights legislation — please tell us. You are entitled to reasonable accommodation up to the point of undue hardship, in accordance with the *Meiorin* test (*British Columbia (PSERC) v. BCGSEU*, [1999] 3 S.C.R. 3) and applicable human rights legislation. You can also access our Employee and Family Assistance Program at **{{eap_contact}}** for confidential counselling and support." },

    { type: "h2", text: "5. Consequences if the concern continues" },
    { type: "p", text: "If the concern is not resolved after this warning, further steps under our progressive discipline process may follow, up to and including termination of your employment for just cause. Any decision to move to termination for cause would be made contextually, as required by *McKinley v. BC Tel*, 2001 SCC 38, considering the nature and circumstances of the behaviour and giving you a fair opportunity to respond. Nothing in this letter limits your entitlements under the employment standards legislation that applies to your province (for example, the **" + j.statuteEN + "**, " + j.statuteCiteEN + " in " + j.nameEN + ")." },

    { type: "h2", text: "6. Your right to respond" },
    { type: "p", text: "You are welcome to provide a written response to this warning, and to include any context we may have missed. If you do, we will add your response to your employment file. You have the right to be treated fairly throughout this process and to have any concerns about this warning escalated to **{{hr_contact_name}}**." },

    { type: "h2", text: "7. How long this stays active" },
    { type: "p", text: "This warning will remain active on your file for **{{warning_active_period}}**. If the concern is resolved and does not recur during that period, the warning is no longer considered in future decisions, except to the extent relevant to a pattern." },

    { type: "p", text: "We want to be very clear: this letter is not a reflection of your value as a person or a teammate. It is an honest attempt to help us both move forward. We are here to support you." },

    { type: "signoff", closing: "With respect," },
    { type: "spacer" },
    { type: "p", text: "**Acknowledgement of receipt.** My signature below indicates that I have received and read this warning. It does not mean I agree with every detail — I may provide a written response. I understand I can contact **{{hr_contact_name}}** with any questions." },
    { type: "sig", leftLabel: "EMPLOYER", rightLabel: "EMPLOYEE — RECEIVED" },
  ],

  bodyFR: [
    { type: "date" },
    { type: "address", lines: [
      "{{employee_name}}",
      "{{employee_address_line_1}}",
      "{{employee_address_line_2}}",
    ]},
    { type: "re", text: "Avertissement écrit — {{warning_subject}}" },
    { type: "p", text: "Bonjour {{employee_first_name}}," },
    { type: "p", text: "La présente lettre a pour but de consigner formellement une préoccupation dont nous avons discuté avec vous et de confirmer les attentes pour la suite. Un avertissement écrit est une étape sérieuse, mais il ne met pas un terme à quoi que ce soit — c'est une conversation honnête, faite tôt, pour corriger le tir ensemble." },

    { type: "h2", text: "1. Résumé de la préoccupation" },
    { type: "p", text: "Le **{{incident_date}}**, ce qui suit s'est produit : **{{incident_description}}**. La question a été discutée avec vous le **{{verbal_warning_date}}** par **{{verbal_warning_by}}**. Malgré cette conversation, la préoccupation n'est pas entièrement résolue." },

    { type: "h2", text: "2. Pourquoi c'est préoccupant" },
    { type: "p", text: "Le comportement ci-dessus est incompatible avec **{{policy_or_expectation}}**. Nous en parlons parce que cela a de l'importance pour nous, pour vos collègues et pour notre clientèle — et parce que nous croyons que vous pouvez répondre à l'attente avec le bon soutien." },

    { type: "h2", text: "3. Ce que nous attendons pour la suite" },
    { type: "p", text: "À compter d'aujourd'hui, nous nous attendons à ce que vous :" },
    { type: "bullet", text: "**{{expectation_1}}**" },
    { type: "bullet", text: "**{{expectation_2}}**" },
    { type: "bullet", text: "**{{expectation_3}}**" },
    { type: "p", text: "Nous ferons un suivi le **{{checkin_date}}** pour voir où en sont les choses. Entre-temps, votre gestionnaire **{{manager_name}}** est là pour vous soutenir — n'hésitez pas à communiquer en tout temps." },

    { type: "h2", text: "4. Soutiens disponibles" },
    { type: "p", text: "Si quelque chose en dehors du travail rend les attentes plus difficiles à respecter — votre santé, une situation familiale, tout motif protégé par la législation en matière de droits de la personne — veuillez nous en informer. Vous avez droit à un accommodement raisonnable jusqu'à la contrainte excessive, conformément au test *Meiorin* (*C.-B. (PSERC) c. BCGSEU*, [1999] 3 R.C.S. 3) et à la législation applicable. Vous pouvez aussi accéder à notre Programme d'aide aux employés et à la famille à **{{eap_contact}}** pour un soutien et un counselling confidentiels." },

    { type: "h2", text: "5. Conséquences si la préoccupation persiste" },
    { type: "p", text: "Si la situation n'est pas résolue après cet avertissement, d'autres étapes du processus de discipline progressive pourraient suivre, pouvant aller jusqu'à la cessation d'emploi pour cause juste et suffisante. Toute décision de passer à la cessation pour cause serait prise de manière contextuelle, comme l'exige *McKinley c. BC Tel*, 2001 CSC 38, en tenant compte de la nature et des circonstances du comportement et en vous accordant une occasion équitable de répondre. Rien dans la présente ne limite vos droits en vertu de la législation applicable (par exemple, la **" + j.statuteFR + "**, " + j.statuteCiteFR + ", au " + j.nameFR + ")." },

    { type: "h2", text: "6. Votre droit de répondre" },
    { type: "p", text: "Vous pouvez fournir une réponse écrite à cet avertissement et y inclure tout contexte qui nous aurait échappé. Si vous le faites, votre réponse sera ajoutée à votre dossier d'emploi. Vous avez le droit d'être traité(e) équitablement tout au long du processus et de soumettre toute préoccupation à **{{hr_contact_name}}**." },

    { type: "h2", text: "7. Durée de validité" },
    { type: "p", text: "Cet avertissement demeurera actif dans votre dossier pendant **{{warning_active_period}}**. Si la préoccupation est résolue et ne se reproduit pas durant cette période, l'avertissement ne sera plus considéré dans les décisions futures, sauf dans la mesure où il contribuerait à démontrer un schéma." },

    { type: "p", text: "Soyons très clairs : cette lettre ne reflète en rien votre valeur comme personne ou comme coéquipier(ère). C'est un effort honnête pour avancer ensemble. Nous sommes là pour vous soutenir." },

    { type: "signoff", closing: "Avec respect," },
    { type: "spacer" },
    { type: "p", text: "**Accusé de réception.** Ma signature ci-dessous indique que j'ai reçu et lu le présent avertissement. Cela ne signifie pas que je suis d'accord avec chaque détail — je peux fournir une réponse écrite. Je comprends que je peux communiquer avec **{{hr_contact_name}}** pour toute question." },
    { type: "sig", leftLabel: "EMPLOYEUR", rightLabel: "SALARIÉ(E) — REÇU" },
  ],

  legalNotesEN: j.code === "ON" ? [
    {
      heading: "1. McKinley v. BC Tel — contextual just cause analysis (binding in ON)",
      body: "**McKinley v. BC Tel**, 2001 SCC 38: just cause requires a contextual, proportionate analysis considering the nature of the misconduct, the employee's length of service, disciplinary record, and any mitigating factors. Not all misconduct warrants dismissal. A written warning is part of the progressive discipline ladder (verbal → written → suspension → termination) that Ontario courts expect before termination for non-criminal conduct.",
    },
    {
      heading: "2. Progressive discipline — building the record for just cause",
      body: "Ontario courts require progressive discipline for non-criminal misconduct. The written warning must: (a) clearly identify the unacceptable conduct with specific dates and facts; (b) reference any prior verbal warnings; (c) state clear, measurable expectations going forward; (d) warn of consequences (up to and including termination for cause); (e) offer an opportunity to respond. This letter provides all five elements. A complete record of progressive steps is essential to support a subsequent for-cause termination.",
    },
    {
      heading: "3. Ontario Human Rights Code — accommodation before discipline",
      body: "The **Human Rights Code**, R.S.O. 1990, c. H.19, protects employees on grounds of disability, family status, medical condition, and other protected grounds. Before issuing discipline, confirm that the conduct is not rooted in an unaccommodated disability or protected ground. If a nexus exists, the employer must consider accommodation before discipline. Disciplining for conduct caused by an unaccommodated disability can trigger a human rights complaint.",
    },
    {
      heading: "4. Procedural fairness — right to respond",
      body: "While Ontario employment law does not require a formal hearing before discipline (unlike unionized grievance arbitration), procedural fairness is essential. Section 6 of this letter gives the employee an explicit right to respond. The employer must document the response and give it genuine consideration. Courts may find discipline unreasonable if the employee was not given an adequate opportunity to explain.",
    },
    {
      heading: "5. Condonation — prompt and consistent enforcement",
      body: "If the employer previously tolerated similar conduct, the employee may argue condonation — that the employer waived enforcement. To avoid condonation, address misconduct promptly and consistently. If there is a delay between the misconduct and the warning, document the reason (e.g., investigation period, discovery of the conduct). An unexplained delay may undermine the disciplinary record.",
    },
    {
      heading: "6. Waksdale — risk if for-cause clause is overbroad",
      body: "**Waksdale v. Swegon North America Inc.**, 2020 ONCA 391: if the termination clause in an employment agreement is overbroad (extending beyond statutory minimums), it may be void, and the employee is entitled to common law reasonable notice instead. This warning is part of building a just-cause record under McKinley. Ensure that any future for-cause termination letter complies with McKinley and does not extend beyond what is provable as just cause.",
    },
  ] : j.code === "QC" ? [
    {
      heading: "1. ARLS art. 124 — wrongful dismissal (applies after 2+ years)",
      body: "Quebec's **Act Respecting Labour Standards**, CQLR c N-1.1, art. 124, provides that after 2 years of service, an employee cannot be terminated without a valid reason — the employer bears the burden of proving just cause. A written warning begins to build the documentary record. The **Civil Code**, art. 2089, also imposes a duty of good faith in employment. Discipline must be proportionate and documented.",
    },
    {
      heading: "2. ARLS art. 82 — progressive discipline and context",
      body: "ARLS art. 82 allows for termination notice or indemnity in lieu, but in the context of art. 124 (wrongful dismissal), even where notice is given, if the termination is unjustified, the employee may claim damages. Quebec courts expect progressive discipline before termination for non-criminal misconduct. This written warning is the documented step before any later decision to terminate.",
    },
    {
      heading: "3. CNESST complaint process — escalation path",
      body: "If the employee believes the discipline is unjust or that an eventual termination lacks cause, they may file a complaint with the **Commission des normes, de l'équité, de la santé et de la sécurité du travail** (CNESST). CNESST may investigate and, for employees with 2+ years service, may find that termination is unjustified and order reinstatement or damages. The written warning should be carefully documented to justify future discipline.",
    },
    {
      heading: "4. Civil Code art. 2089 — good faith obligation",
      body: "The Quebec **Civil Code**, art. 2089, imposes a general duty of good faith in contract performance and interpretation. Discipline must be exercised in good faith, not arbitrarily or oppressively. Courts may void or reduce penalties that are disproportionate to the conduct. This warning should be proportionate to the misconduct and non-punitive in tone.",
    },
    {
      heading: "5. Charter of Human Rights and Freedoms — art. 46, liberty to work",
      body: "Quebec's **Charter**, art. 46, protects the right to engage in gainful work. Before issuing discipline that might lead to termination, ensure the conduct is not rooted in a protected ground (disability, family status, etc.). If a connection exists, consider accommodation before discipline. Discipline based on a protected ground may be void under the Charter.",
    },
    {
      heading: "6. Bhasin / Callow — good faith and fair dealing post-McKinley",
      body: "**Bhasin v. Hrynew**, 2014 SCC 71, and **Callow v. Zabs Drilling**, 2022 SCC 43 reinforce that contracts (including employment contracts) are subject to an implied duty of good faith and fair dealing. Discipline must be exercised fairly, not capriciouslly. The written warning should document the legitimate reason for discipline and the opportunity for improvement.",
    },
  ] : j.code === "BC" ? [
    {
      heading: "1. McKinley v. BC Tel — contextual just cause test (binding in BC)",
      body: "**McKinley v. BC Tel**, 2001 SCC 38: just cause in BC requires a contextual analysis. Courts consider the gravity of the misconduct, the employee's record, and any mitigating factors. Not all misconduct warrants dismissal. Progressive discipline (verbal → written → suspension → termination) is expected before termination for non-criminal conduct. This written warning is a documented step in that process.",
    },
    {
      heading: "2. Progressive discipline — building the disciplinary record",
      body: "BC courts expect employers to progressively escalate discipline before terminating. The written warning must: (a) clearly identify the unacceptable conduct; (b) reference prior warnings; (c) state clear expectations going forward; (d) warn of consequences (up to and including termination); (e) allow the employee to respond. This letter provides all five elements. A complete progressive discipline record is essential for a subsequent for-cause termination.",
    },
    {
      heading: "3. BC Human Rights Code — protected grounds and accommodation",
      body: "The **Human Rights Code**, R.S.B.C. 1996, c. 210, prohibits discrimination based on protected grounds (disability, gender, family status, etc.). Before issuing discipline, confirm that the conduct is not rooted in an unaccommodated disability or protected ground. If a nexus exists, the employer must consider accommodation. Disciplining for conduct caused by an unaccommodated disability can trigger a human rights complaint.",
    },
    {
      heading: "4. WorkSafeBC — harassment-related discipline overlay",
      body: "If the discipline relates to harassment allegations, **WorkSafeBC** regulations (Part 4.27 of the OHS Regulation) and the **Workers Compensation Act**, R.S.B.C. 2019, c. 1, require the employer to investigate and respond appropriately. Discipline for harassment must be consistent with WorkSafeBC expectations. The written warning should clearly document the harassment investigation and the disciplinary response.",
    },
    {
      heading: "5. BC ESA — complaint avenue after termination",
      body: "If the employee is later terminated (with or without cause), they may file a complaint with the **Employment Standards Branch** under the BC **Employment Standards Act**. If the termination is found to be contrary to ESA minimums, the employee may recover compensation. The written warning creates a documented record, but it must be consistent with progressive discipline principles.",
    },
    {
      heading: "6. Condonation and consistent enforcement",
      body: "If the employer has previously tolerated similar conduct, the employee may argue condonation. To avoid this defence, address misconduct promptly and consistently. If there is a delay between the misconduct and the warning, document the reason (e.g., investigation period). An unexplained delay may undermine the disciplinary record and invite a challenge.",
    },
  ] : j.code === "AB" ? [
    {
      heading: "1. McKinley v. BC Tel — contextual just cause (applies in AB)",
      body: "**McKinley v. BC Tel**, 2001 SCC 38: just cause in Alberta requires a contextual analysis. Courts weigh the severity of the misconduct, the employee's length of service, disciplinary history, and any mitigating circumstances. Not all misconduct warrants dismissal. Progressive discipline (verbal → written → suspension → termination) is expected for non-criminal misconduct. This written warning is a key documented step.",
    },
    {
      heading: "2. Progressive discipline — building the record",
      body: "Alberta courts expect employers to escalate discipline progressively. The written warning must: (a) clearly identify the unacceptable conduct with specific facts; (b) reference any prior warnings; (c) state clear expectations for improvement; (d) warn of consequences (up to and including termination); (e) allow the employee to respond. All five elements are in this letter. A complete progressive discipline record supports a subsequent for-cause termination.",
    },
    {
      heading: "3. Alberta Human Rights Act — protected grounds",
      body: "The **Alberta Human Rights Act**, R.S.A. 2000, c. A-25.5, prohibits discrimination in employment on protected grounds (disability, gender, family status, sexual orientation, etc.). Before issuing discipline, confirm that the conduct is not connected to a protected ground. If a nexus exists, accommodation obligations must be considered. Disciplining for conduct caused by an unaccommodated disability can trigger a human rights complaint.",
    },
    {
      heading: "4. AB OHS Act — if discipline relates to safety complaints",
      body: "If the discipline relates to a safety complaint or the employee's refusal to perform unsafe work under the **Occupational Health and Safety Act**, R.S.A. 2000, c. O-2, the discipline may violate the Act's anti-retaliation provisions. Employees have a protected right to refuse unsafe work and report hazards without discipline. Ensure the warning is not retaliation for a safety complaint.",
    },
    {
      heading: "5. AB ESC complaint avenue",
      body: "If the employee is later terminated, they may file a complaint with the **Alberta Employment Standards Tribunal** under the **Employment Standards Code**. If the termination is found unjustified, the employee may recover compensation. The written warning creates a documentary record, but it must be consistent with progressive discipline principles to withstand scrutiny.",
    },
    {
      heading: "6. Condonation and prompt, consistent enforcement",
      body: "If the employer previously tolerated similar conduct, the employee may argue condonation. To avoid this, address misconduct promptly and consistently. If there is a delay between the misconduct and the warning, document the reason (investigation period, delayed discovery, etc.). An unexplained gap may weaken the disciplinary record.",
    },
  ] : j.code === "FED" ? [
    {
      heading: "1. McKinley v. BC Tel — contextual just cause (applies federally)",
      body: "**McKinley v. BC Tel**, 2001 SCC 38: just cause in the federal jurisdiction requires a contextual analysis. Courts weigh severity of misconduct, employee's record, and mitigating factors. Not all misconduct warrants dismissal. Progressive discipline (verbal → written → suspension → termination) is expected. This written warning is the documented step that precedes any decision to terminate for cause.",
    },
    {
      heading: "2. CLC s. 240 — unjust dismissal (12+ months service)",
      body: "**Canada Labour Code**, R.S.C. 1985, c. L-2, s. 240: employees with 12+ months of continuous service have the right to appeal a dismissal to an adjudicator if the employer has not established just cause. The employer bears the burden of proving just cause. Progressive discipline is expected. This written warning is documented evidence in the progressive discipline record.",
    },
    {
      heading: "3. Progressive discipline and the record",
      body: "Federal labour adjudicators expect progressive discipline before termination for non-criminal misconduct. The written warning must: (a) clearly identify the unacceptable conduct; (b) reference any prior warnings; (c) state clear expectations going forward; (d) warn of consequences (up to and including termination); (e) allow the employee to respond. This letter provides all five. A complete progressive discipline record is essential.",
    },
    {
      heading: "4. CLC Part II — duty of loyalty and good faith",
      body: "The **Canada Labour Code**, Part II, imposes a general duty of loyalty on employees and an implied duty of good faith on employers. Discipline must be proportionate and exercised in good faith, not capriciously or oppressively. The written warning should be fair, documented, and non-discriminatory.",
    },
    {
      heading: "5. Canadian Human Rights Act — protected grounds",
      body: "The **Canadian Human Rights Act**, R.S.C. 1985, c. H-6, prohibits discrimination in employment on protected grounds (race, gender, disability, family status, etc.). Before issuing discipline, confirm that the conduct is not rooted in a protected ground. If a nexus exists, accommodation must be considered. Discipline based on a protected ground may be found discriminatory.",
    },
    {
      heading: "6. CLC Part II — safety complaints and retaliation",
      body: "If the discipline relates to a safety complaint or the employee's participation in occupational health and safety activities under **CLC Part II**, the discipline may violate the Act's anti-retaliation provisions. Employees have a protected right to report hazards and participate in OHS committees without retaliation. Ensure the warning is not retaliation for a safety-related report or complaint.",
    },
  ] : [
    {
      heading: "1. McKinley v. BC Tel — contextual just cause analysis",
      body: "**McKinley v. BC Tel**, 2001 SCC 38: just cause requires a contextual, proportionate analysis considering the nature of misconduct, the employee's record, and mitigating factors. Not all misconduct warrants dismissal. Progressive discipline (verbal → written → suspension → termination) is expected before termination for non-criminal conduct.",
    },
    {
      heading: "2. Progressive discipline — building the record",
      body: "Courts expect progressive escalation before termination. The written warning must: (a) clearly identify the unacceptable conduct; (b) reference prior warnings; (c) state clear expectations going forward; (d) warn of consequences (up to and including termination); (e) give the employee an opportunity to respond. All elements are in this letter. A complete progressive discipline record supports a subsequent for-cause termination.",
    },
    {
      heading: "3. Protected grounds — accommodation before discipline",
      body: "Before issuing discipline, confirm that the conduct is not rooted in a protected ground under the applicable Human Rights Code (disability, family status, medical condition, etc.). If a nexus exists, accommodation must be considered before discipline. Disciplining for conduct caused by an unaccommodated protected ground can trigger a human rights complaint.",
    },
    {
      heading: "4. Procedural fairness — right to respond",
      body: "While Canadian employment law does not require a formal hearing before discipline, procedural fairness is expected. The employee should have an opportunity to explain the conduct. This warning provides that opportunity in section 6. The employer must document the response and give it genuine consideration.",
    },
    {
      heading: "5. Condonation — prompt and consistent enforcement",
      body: "If the employer previously tolerated similar conduct, the employee may argue condonation. To avoid this, address misconduct promptly and consistently. If there is a delay between the misconduct and the warning, document the reason (investigation period, delayed discovery, etc.).",
    },
    {
      heading: "6. Documentation — essential for any subsequent termination",
      body: "This written warning creates a documented record of the disciplinary step. A complete record (including the employee's response and the follow-up check-in) is essential to support any subsequent decision to terminate. The documentation should be fair, specific, and non-discriminatory.",
    },
  ],
  legalNotesFR: j.code === "ON" ? [
    {
      heading: "1. McKinley c. BC Tel — analyse contextuelle de la cause juste (lie l'Ontario)",
      body: "**McKinley c. BC Tel**, 2001 CSC 38 : la cause juste en Ontario exige une analyse contextuelle tenant compte de la gravité de l'inconduite, du dossier du salarié et de tout facteur atténuant. Toute inconduite n'justifie pas un congédiement. Un avertissement écrit fait partie de l'escalade disciplinaire (verbal → écrit → suspension → congédiement) qu'attendent les tribunaux ontariens avant un congédiement pour cause.",
    },
    {
      heading: "2. Discipline progressive — établir le dossier pour la cause juste",
      body: "Les tribunaux ontariens exigent la discipline progressive avant un congédiement pour inconduite non criminelle. L'avertissement écrit doit : (a) identifier clairement la conduite inacceptable avec faits précis et dates; (b) renvoyer à tout avertissement verbal antérieur; (c) énoncer des attentes claires et mesurables; (d) avertir des conséquences (y compris congédiement pour cause); (e) offrir la possibilité de répondre. Cette lettre fournit les cinq éléments. Un dossier complet de discipline progressive est essentiel pour un congédiement ultérieur pour cause.",
    },
    {
      heading: "3. Code des droits de la personne de l'Ontario — accommodement avant discipline",
      body: "Le **Code des droits de la personne**, L.R.O. 1990, chap. H.19, protège les salariés sur la base du handicap, de la situation de famille, de l'état de santé et d'autres motifs protégés. Avant de discipliner, confirmer que la conduite n'est pas enracinée dans un handicap non accommodé ou un motif protégé. Si un lien existe, l'employeur doit envisager l'accommodement. Discipliner pour une conduite causée par un handicap non accommodé peut déclencher une plainte en droits de la personne.",
    },
    {
      heading: "4. Équité procédurale — droit de répondre",
      body: "Bien que le droit ontarien de l'emploi n'exige pas d'audience formelle avant la discipline (contrairement à l'arbitrage dans les milieux syndiqués), l'équité procédurale est essentielle. L'article 6 de cette lettre donne au salarié un droit explicite de répondre. L'employeur doit documenter la réponse et lui accorder une considération véritable. Les tribunaux peuvent juger la discipline déraisonnable si le salarié n'a pas eu l'occasion adequate d'expliquer.",
    },
    {
      heading: "5. Condonation — application prompte et uniforme",
      body: "Si l'employeur a antérieurement toléré une conduite similaire, le salarié peut plaider la condonation — que l'employeur a renoncé à l'application. Pour éviter cela, traiter l'inconduite promptement et uniformément. Si un délai sépare l'inconduite de l'avertissement, documenter la raison (p. ex., période d'enquête, découverte ultérieure). Un délai inexpliqué peut affaiblir le dossier disciplinaire.",
    },
    {
      heading: "6. Waksdale — risque si la clause pour cause est excessive",
      body: "**Waksdale c. Swegon North America Inc.**, 2020 ONCA 391 : si la clause de cessation du contrat de travail est excessive (s'étendant au-delà des minimums légaux), elle peut être nulle, et le salarié a droit au préavis raisonnable en common law. Cet avertissement contribue à établir un dossier de cause juste selon McKinley. S'assurer que tout congédiement ultérieur pour cause respecte McKinley et ne dépasse pas ce qui peut être prouvé.",
    },
  ] : j.code === "QC" ? [
    {
      heading: "1. LNT art. 124 — congédiement injustifié (s'applique après 2 ans)",
      body: "La **Loi sur les normes du travail**, RLRQ c N-1.1, art. 124 du Québec, prévoit qu'après 2 ans de service, un salarié ne peut être congédié sans motif juste — l'employeur porte le fardeau de preuve. Un avertissement écrit commence à établir le dossier documentaire. Le **Code civil**, art. 2089, impose aussi un devoir de bonne foi. La discipline doit être proportionnée et documentée.",
    },
    {
      heading: "2. LNT art. 82 — discipline progressive et contexte",
      body: "L'art. 82 de la LNT permet le congédiement avec préavis ou indemnité, mais dans le contexte de l'art. 124 (congédiement injustifié), même avec préavis, si le congédiement manque de cause, le salarié peut réclamer des dommages-intérêts. Les tribunaux québécois s'attendent à la discipline progressive avant un congédiement pour inconduite non criminelle. Cet avertissement écrit est l'étape documentée avant toute décision ultérieure de congédier.",
    },
    {
      heading: "3. Processus de plainte à la CNESST — voie d'escalade",
      body: "Si le salarié croit que la discipline est injuste ou qu'un congédiement ultérieur manque de cause, il peut déposer une plainte à la **Commission des normes, de l'équité, de la santé et de la sécurité du travail** (CNESST). La CNESST peut enquêter et, pour les salariés ayant 2+ ans de service, peut conclure au congédiement injustifié et ordonner la réintégration ou des dommages-intérêts. L'avertissement doit être soigneusement documenté.",
    },
    {
      heading: "4. Code civil art. 2089 — obligation de bonne foi",
      body: "Le **Code civil** du Québec, art. 2089, impose un devoir général de bonne foi dans l'exécution et l'interprétation des contrats. La discipline doit être exercée de bonne foi, non de manière arbitraire ou oppressive. Les tribunaux peuvent annuler ou réduire les pénalités disproportionnées. Cet avertissement doit être proportionné et d'un ton non punitif.",
    },
    {
      heading: "5. Charte des droits et libertés — art. 46, droit de travailler",
      body: "La **Charte des droits et libertés de la personne** du Québec, art. 46, protège le droit d'exercer une activité lucrative. Avant de discipliner d'une manière pouvant mener à un congédiement, s'assurer que la conduite n'est pas enracinée dans un motif protégé (handicap, situation de famille, etc.). Si un lien existe, envisager l'accommodement. Une discipline fondée sur un motif protégé peut être jugée nulle.",
    },
    {
      heading: "6. Bhasin / Callow — bonne foi et équité post-McKinley",
      body: "**Bhasin c. Hrynew**, 2014 CSC 71, et **Callow c. Zabs Drilling**, 2022 CSC 43 réaffirment que les contrats (y compris de travail) sont assujettis au devoir implicite de bonne foi et d'équité. La discipline doit être exercée équitablement. L'avertissement doit documenter le motif juste et l'opportunité d'amélioration.",
    },
  ] : j.code === "BC" ? [
    {
      heading: "1. McKinley c. BC Tel — test contextuel de cause juste (lie la C.-B.)",
      body: "**McKinley c. BC Tel**, 2001 CSC 38 : la cause juste en C.-B. exige une analyse contextuelle. Les tribunaux considèrent la gravité de l'inconduite, le dossier du salarié et les facteurs atténuants. Toute inconduite ne justifie pas le congédiement. La discipline progressive (verbal → écrit → suspension → congédiement) est attendue avant un congédiement pour inconduite non criminelle. Cet avertissement écrit est une étape documentée.",
    },
    {
      heading: "2. Discipline progressive — établir le dossier disciplinaire",
      body: "Les tribunaux de C.-B. s'attendent à l'escalade progressive avant un congédiement. L'avertissement écrit doit : (a) identifier clairement la conduite inacceptable; (b) renvoyer aux avertissements antérieurs; (c) énoncer des attentes claires; (d) avertir des conséquences (y compris congédiement); (e) permettre la réaction. Cette lettre fournit les cinq éléments. Un dossier complet de discipline progressive est essentiel pour un congédiement ultérieur pour cause.",
    },
    {
      heading: "3. Code des droits de la personne de la C.-B. — motifs protégés et accommodement",
      body: "Le **Human Rights Code**, R.S.B.C. 1996, ch. 210, interdit la discrimination en emploi fondée sur des motifs protégés (handicap, sexe, situation de famille, etc.). Avant la discipline, confirmer que la conduite n'est pas enracinée dans un motif protégé ou un handicap non accommodé. Si un lien existe, l'employeur doit envisager l'accommodement. Discipliner pour une conduite causée par un handicap non accommodé peut déclencher une plainte en droits de la personne.",
    },
    {
      heading: "4. WorkSafeBC — superposition si discipline liée au harcèlement",
      body: "Si la discipline concerne une allégation de harcèlement, le **Workers Compensation Act**, R.S.B.C. 2019, ch. 1, et la Partie 4.27 du Règlement OHS exigent une enquête et une réaction appropriée. La discipline pour harcèlement doit être conforme aux attentes de WorkSafeBC. L'avertissement doit documenter clairement l'enquête et la réaction disciplinaire.",
    },
    {
      heading: "5. ESA de la C.-B. — voie de plainte après congédiement",
      body: "Si le salarié est congédié ultérieurement, il peut déposer une plainte auprès de la **Direction des normes d'emploi** en vertu de la **Loi sur les normes d'emploi**. Si le congédiement est trouvé contraire aux minimums, le salarié peut obtenir compensation. L'avertissement crée un dossier, mais doit être conforme aux principes de discipline progressive.",
    },
    {
      heading: "6. Condonation et application uniforme",
      body: "Si l'employeur a antérieurement toléré une conduite similaire, le salarié peut plaider la condonation. Pour l'éviter, traiter l'inconduite promptement et uniformément. Si un délai sépare l'inconduite de l'avertissement, documenter la raison. Un délai inexpliqué peut affaiblir le dossier disciplinaire.",
    },
  ] : j.code === "AB" ? [
    {
      heading: "1. McKinley c. BC Tel — cause juste contextuelle (s'applique en AB)",
      body: "**McKinley c. BC Tel**, 2001 CSC 38 : la cause juste en Alberta exige une analyse contextuelle. Les tribunaux pèsent la gravité de l'inconduite, l'ancienneté du salarié, l'historique disciplinaire et les facteurs atténuants. Toute inconduite ne justifie pas le congédiement. La discipline progressive est attendue. Cet avertissement écrit est une étape clé et documentée.",
    },
    {
      heading: "2. Discipline progressive — établir le dossier",
      body: "Les tribunaux albertains s'attendent à l'escalade progressive. L'avertissement écrit doit : (a) identifier clairement la conduite inacceptable; (b) renvoyer aux avertissements antérieurs; (c) énoncer des attentes claires d'amélioration; (d) avertir des conséquences; (e) permettre la réaction. Les cinq éléments sont dans cette lettre. Un dossier complet soutient un congédiement ultérieur pour cause.",
    },
    {
      heading: "3. Alberta Human Rights Act — motifs protégés",
      body: "L'**Alberta Human Rights Act**, R.S.A. 2000, ch. A-25.5, interdit la discrimination en emploi. Avant de discipliner, confirmer que la conduite n'est pas liée à un motif protégé. Si un lien existe, les obligations d'accommodement doivent être envisagées. Discipliner pour une conduite causée par un handicap non accommodé peut déclencher une plainte.",
    },
    {
      heading: "4. Loi sur la santé et la sécurité au travail de l'AB — si discipline concerne une plainte de sécurité",
      body: "Si la discipline concerne une plainte de sécurité ou le refus du salarié d'exécuter un travail dangereux en vertu de la **Occupational Health and Safety Act**, R.S.A. 2000, ch. O-2, la discipline peut violer les dispositions anti-représailles. Les salariés ont un droit protégé de refuser un travail dangereux et de signaler les risques sans discipline. S'assurer que l'avertissement ne constitue pas une représaille.",
    },
    {
      heading: "5. Voie de plainte au ESC de l'AB",
      body: "Si le salarié est congédié ultérieurement, il peut déposer une plainte auprès du **Tribunal des normes d'emploi** en vertu du **Employment Standards Code**. Si le congédiement est trouvé injustifié, le salarié peut obtenir compensation. L'avertissement crée un dossier documentaire, mais doit respecter les principes de discipline progressive.",
    },
    {
      heading: "6. Condonation et application prompte et uniforme",
      body: "Si l'employeur a antérieurement toléré une conduite similaire, le salarié peut plaider la condonation. Pour l'éviter, traiter l'inconduite promptement et uniformément. Si un délai sépare l'inconduite de l'avertissement, documenter la raison. Un délai inexpliqué peut affaiblir le dossier.",
    },
  ] : j.code === "FED" ? [
    {
      heading: "1. McKinley c. BC Tel — cause juste contextuelle (s'applique aux échelons fédéral)",
      body: "**McKinley c. BC Tel**, 2001 CSC 38 : la cause juste à l'échelon fédéral exige une analyse contextuelle. Les tribunaux pèsent la gravité de l'inconduite, le dossier du salarié et les facteurs atténuants. Toute inconduite ne justifie pas le congédiement. La discipline progressive est attendue. Cet avertissement écrit est l'étape documentée qui précède toute décision de congédier pour cause.",
    },
    {
      heading: "2. CCT art. 240 — congédiement injustifié (12+ mois de service)",
      body: "Le **Code canadien du travail**, L.R.C. 1985, ch. L-2, art. 240 : les salariés ayant 12+ mois de service continu ont le droit de contester un congédiement devant un arbitre si l'employeur n'a pas établi une cause juste. L'employeur porte le fardeau de preuve. La discipline progressive est attendue. Cet avertissement est une preuve documentée dans le dossier de discipline progressive.",
    },
    {
      heading: "3. Discipline progressive et le dossier",
      body: "Les arbitres du travail fédéral s'attendent à la discipline progressive avant un congédiement pour inconduite non criminelle. L'avertissement écrit doit : (a) identifier clairement la conduite inacceptable; (b) renvoyer aux avertissements antérieurs; (c) énoncer des attentes claires; (d) avertir des conséquences; (e) permettre une réaction. Cette lettre fournit les cinq éléments. Un dossier complet de discipline progressive est essentiel.",
    },
    {
      heading: "4. CCT Partie II — devoir de loyauté et bonne foi",
      body: "Le **Code canadien du travail**, Partie II, impose un devoir de loyauté aux salariés et un devoir implicite de bonne foi aux employeurs. La discipline doit être proportionnée et exercée de bonne foi, non capricieusement ou oppressivement. L'avertissement écrit doit être juste, documenté et non discriminatoire.",
    },
    {
      heading: "5. Loi canadienne sur les droits de la personne — motifs protégés",
      body: "La **Loi canadienne sur les droits de la personne**, L.R.C. 1985, ch. H-6, interdit la discrimination en emploi. Avant de discipliner, confirmer que la conduite n'est pas enracinée dans un motif protégé. Si un lien existe, l'accommodement doit être envisagé. Une discipline fondée sur un motif protégé peut être trouvée discriminatoire.",
    },
    {
      heading: "6. CCT Partie II — plaintes de sécurité et représailles",
      body: "Si la discipline concerne une plainte de sécurité ou la participation du salarié aux activités SST en vertu de la **Partie II du CCT**, la discipline peut violer les dispositions anti-représailles. Les salariés ont un droit protégé de signaler des risques sans représailles. S'assurer que l'avertissement n'est pas une représaille pour une plainte liée à la sécurité.",
    },
  ] : [
    {
      heading: "1. McKinley c. BC Tel — analyse contextuelle de cause juste",
      body: "**McKinley c. BC Tel**, 2001 CSC 38 : la cause juste exige une analyse contextuelle et proportionnelle tenant compte de la nature de l'inconduite, du dossier du salarié et des facteurs atténuants. Toute inconduite ne justifie pas un congédiement. La discipline progressive est attendue avant un congédiement pour inconduite non criminelle.",
    },
    {
      heading: "2. Discipline progressive — établir le dossier",
      body: "Les tribunaux s'attendent à l'escalade progressive avant un congédiement. L'avertissement écrit doit : (a) identifier clairement la conduite inacceptable; (b) renvoyer aux avertissements antérieurs; (c) énoncer des attentes claires; (d) avertir des conséquences; (e) donner l'opportunité de répondre. Les cinq éléments sont dans cette lettre. Un dossier complet soutient un congédiement ultérieur.",
    },
    {
      heading: "3. Motifs protégés — accommodement avant discipline",
      body: "Avant de discipliner, confirmer que la conduite n'est pas enracinée dans un motif protégé en vertu du Code des droits de la personne applicable. Si un lien existe, l'accommodement doit être envisagé. Discipliner pour une conduite causée par un motif protégé non accommodé peut déclencher une plainte en droits de la personne.",
    },
    {
      heading: "4. Équité procédurale — droit de répondre",
      body: "Bien que le droit canadien de l'emploi n'exige pas d'audience formelle avant la discipline, l'équité procédurale est attendue. Le salarié doit avoir l'opportunité d'expliquer. Cette lettre fournit cette opportunité à l'article 6. L'employeur doit documenter et considérer sérieusement la réponse.",
    },
    {
      heading: "5. Condonation — application prompte et uniforme",
      body: "Si l'employeur a antérieurement toléré une conduite similaire, le salarié peut plaider la condonation. Pour l'éviter, traiter l'inconduite promptement et uniformément. Si un délai sépare l'inconduite de l'avertissement, documenter la raison (période d'enquête, découverte ultérieure, etc.).",
    },
    {
      heading: "6. Documentation — essentielle pour tout congédiement ultérieur",
      body: "Cet avertissement écrit crée un dossier documenté de l'étape disciplinaire. Un dossier complet (incluant la réaction du salarié et le suivi) est essentiel pour soutenir tout congédiement ultérieur. La documentation doit être juste, spécifique et non discriminatoire.",
    },
  ],
  };
};
