// G02 — Employment Agreement (jurisdiction-parameterized)
// Exports a function(j) that returns template object with jurisdiction-specific content
// Plain-language, legally binding employment contract.
// Legal notes customized per jurisdiction (ON/QC/BC/AB/FED).



export default function(j) {
  // j is the jurisdiction object from jurisdiction_data.js

  const nonCompeteLanguage = j.nonCompeteBan === true
    ? `**Non-compete agreements.** Any non-compete or non-solicitation agreement between the Employer and the Employee must be separately signed and must comply with ${j.ncStatEN}. ${j.code === "ON" ? "Non-compete agreements entered into after October 25, 2021 are generally void under ESA s. 67.2, except for executives and sale-of-business transactions." : ""}`
    : j.code === "QC"
    ? `**Non-compete agreements.** Any non-compete or non-solicitation agreement must be in writing, limited in duration, territory and scope of activity, and be enforceable only to the extent necessary to protect legitimate business interests (${j.ncStatEN}). The burden of proof that the restriction goes no further than necessary lies on the Employer.`
    : j.code === "BC"
    ? `**Non-compete agreements.** BC courts will not rewrite or 'blue-pencil' an overly broad non-compete. If a non-compete is unreasonably broad in duration, geography or scope of activity, the entire covenant is void (${j.ncStatEN}). Any non-compete must be carefully tailored to legitimate protectable interests.`
    : `**Non-compete agreements.** Any non-compete or non-solicitation agreement must comply with the common-law requirement that it be reasonable in duration, territory and scope, necessary to protect legitimate business interests, and clearly defined. Overly broad clauses may be unenforceable.`;

  return {
    id: "T02",
    slug: "Employment_Agreement",
    kind: "agreement",
    titleEN: "Employment Agreement",
    titleFR: "Contrat de travail",

    bodyEN: [
      { type: "h1", text: "Employment Agreement", align: "center" },
      { type: "p", text: "This Employment Agreement (the **Agreement**) is entered into on **{{agreement_date}}**." },

      { type: "h2", text: "Between" },
      { type: "p", text: "**{{employer_legal_name}}**, a corporation with its principal office at **{{employer_address}}** (the **Employer**)," },
      { type: "p", text: "— and —" },
      { type: "p", text: "**{{employee_name}}**, of **{{employee_address_line_1}}**, **{{employee_address_line_2}}** (the **Employee**)." },
      { type: "p", text: "The Employer and the Employee are each a **Party** and together the **Parties**." },

      { type: "h2", text: "Why we're writing this down" },
      { type: "p", text: "We believe good working relationships start with a clear, honest understanding of what each side expects from the other. This Agreement puts that understanding in writing so both of us know where we stand — now and if things ever change." },

      { type: "h2", text: "1. Position and duties" },
      { type: "p", text: "The Employer hires the Employee as **{{position_title}}**, reporting to **{{manager_name}}**, **{{manager_title}}**. The Employee agrees to perform the duties set out in the attached job description and any other reasonable duties the Employer assigns from time to time, consistent with the position. The Employee will act honestly, in good faith, and in the best interests of the Employer." },

      { type: "h2", text: "2. Start date and employment type" },
      { type: "p", text: "The Employee's employment begins on **{{start_date}}** on a **{{employment_type}}** basis. Employment will continue indefinitely unless ended in accordance with section 10." },

      { type: "h2", text: "3. Place of work and hours" },
      { type: "p", text: `The Employee's regular place of work is **{{work_location}}**. Regular hours of work are **{{scheduled_hours_per_week}}** hours per week, typically **{{regular_hours}}**. The Employer may reasonably vary work location and hours to meet operational needs. Overtime, where applicable, will be compensated in accordance with the ${j.shortEN}: ${j.overtimeNoteEN}` },

      { type: "h2", text: "4. Compensation" },
      { type: "p", text: "The Employer will pay the Employee a base salary of **{{annual_base_salary}}** per year, paid **{{pay_frequency}}** by direct deposit, less statutory deductions. The Employee may also be eligible for **{{variable_comp_description}}**, subject to the terms of the applicable plan in effect at the time." },
      { type: "p", text: "Base salary and variable compensation will be reviewed at least annually. No adjustment is guaranteed, but we commit to reviewing openly and fairly." },

      { type: "h2", text: "5. Vacation" },
      { type: "p", text: `The Employee is entitled to **{{vacation_weeks}}** weeks of paid vacation per year, which is at least the minimum required by the ${j.shortEN} (${j.vacStatEN}). ${j.vacEnhancedEN ? `After ${j.code === "QC" ? "3" : "5"} years of continuous service, the Employee is entitled to ${j.vacEnhancedEN}.` : ""} Vacation is in addition to statutory holidays observed in the Employee's province. Unused vacation is governed by the Employer's vacation policy and applicable law.` },

      { type: "h2", text: "6. Benefits and wellbeing" },
      { type: "p", text: "The Employee is eligible to participate in the Employer's group benefits plan (**{{benefits_plan_name}}**) in accordance with its terms, starting **{{benefits_start_date}}**. The Employee also has access to the Employer's Employee and Family Assistance Program for confidential counselling and support. We believe that wellbeing isn't a perk — it's part of doing the work well — and we will reasonably accommodate the Employee's needs, including those protected by human rights legislation." },

      { type: "h2", text: "7. Time away and leaves of absence" },
      { type: "p", text: `The Employee is entitled to all leaves of absence required by the ${j.shortEN}${j.code === "QC" ? ` and the Civil Code of Québec (${j.civilLawStatEN})` : ""} (including, without limitation, pregnancy, parental, family caregiver, family responsibility, sick, bereavement, domestic violence, and reservist leaves). The Employer will not retaliate against the Employee for exercising any right to a statutory leave.` },

      { type: "h2", text: "8. Confidentiality" },
      { type: "p", text: "During and after employment, the Employee will keep the Employer's Confidential Information confidential and will not use it for any purpose other than performing this role. **Confidential Information** means all non-public information about the Employer, its clients, its personnel, its finances, its products and services, its technology, and its business plans, whether in written, oral, electronic or any other form." },
      { type: "p", text: "This obligation does not limit the Employee's right to make a protected disclosure to a regulator, to participate in a whistleblower or human-rights complaint, or to discuss wages or working conditions with coworkers as permitted by law." },

      { type: "h2", text: "9. Intellectual property" },
      { type: "p", text: "Any invention, idea, work product, design, software, documentation, or other work of authorship that the Employee creates in the course of performing the Employee's duties, using the Employer's resources, or that relates to the Employer's business (**Work Product**), belongs to the Employer. The Employee assigns to the Employer all right, title and interest in the Work Product, including copyright, and waives all moral rights in it to the extent permitted by law." },
      { type: "p", text: "The Employer is not claiming any invention the Employee develops entirely on the Employee's own time, without using the Employer's equipment or Confidential Information, and that does not relate to the Employer's business or anticipated research and development." },

      { type: "h2", text: "10. Ending the employment" },
      { type: "p", text: `Employment may end in any of the following ways, and in each case the Employee will receive at least the minimum entitlements required by the ${j.shortEN}:` },
      { type: "bullet", text: "**Resignation by the Employee.** The Employee may resign on **{{employee_notice_weeks}}** weeks' written notice. The Employer may waive some or all of that notice period, in which case the Employee will still be paid for any unworked days in the statutory minimum notice period." },
      { type: "bullet", text: `**Termination by the Employer without cause.** The Employer may end the employment at any time, without cause, by providing the Employee with the greater of (a) the minimum notice of termination (or pay in lieu) and severance pay owing under the ${j.shortEN} (${j.noticeFormulaEN}${j.hasSeverance ? ` and ${j.severanceFormEN}` : ""}), or (b) **{{without_cause_notice}}**. All statutory minimums — including the continuation of benefits and vacation accrual during the statutory notice period — will be provided.` },
      { type: "bullet", text: `**Termination by the Employer for just cause.** The Employer may end the employment without notice or pay in lieu only for just cause under the ${j.shortEN} and common law, applied contextually (see *McKinley v. BC Tel*, 2001 SCC 38). Even in these circumstances, the Employee will receive any entitlements that cannot be forfeited under the ${j.shortEN}.` },
      { type: "p", text: `If any part of this section would provide the Employee with less than the minimum entitlements required by the ${j.shortEN} at the time the employment ends, that part is void and the Employee will receive the statutory minimum. The Parties acknowledge that this section has been drafted with *Waksdale v. Swegon North America Inc.*, 2020 ONCA 391 in mind.` },

      { type: "h2", text: "11. Non-compete and non-solicitation" },
      { type: "p", text: nonCompeteLanguage },

      { type: "h2", text: "12. Policies" },
      { type: "p", text: "The Employee agrees to comply with the Employer's policies as amended from time to time, including the Employee Handbook, Code of Business Conduct, and Workplace Harassment, Discrimination and Violence Prevention Policy. The Employer will make these policies reasonably available to the Employee and will give reasonable notice of material changes." },

      { type: "h2", text: "13. Human rights and dignity" },
      { type: "p", text: `The Employer is committed to a workplace free of discrimination and harassment. The Employee has the right to work in such an environment and to raise concerns without fear of retaliation. The Employer will reasonably accommodate the Employee's needs related to grounds protected by human rights legislation (${j.hrStatEN}), up to the point of undue hardship, in accordance with *British Columbia (Public Service Employee Relations Commission) v. BCGSEU*, [1999] 3 S.C.R. 3 (the *Meiorin* test).` },

      { type: "h2", text: "14. Entire agreement" },
      { type: "p", text: "This Agreement, together with the policies referenced above, is the entire agreement between the Parties concerning the Employee's employment. It replaces any earlier agreement, written or verbal, about the same subject matter. Any change to this Agreement must be in writing and signed by both Parties — except that the Employer may amend its policies from time to time with reasonable notice." },

      { type: "h2", text: "15. Severability" },
      { type: "p", text: "If any part of this Agreement is found to be unenforceable, the rest of the Agreement continues in full force. The Parties will treat the unenforceable part as modified to the minimum extent necessary to make it enforceable." },

      { type: "h2", text: "16. Governing law" },
      { type: "p", text: `This Agreement is governed by the laws of the ${j.govLawEN} and the laws of Canada that apply in that province. The primary employment statute is the ${j.shortEN} (${j.statuteCiteEN}).${j.code === "QC" ? ` For matters not addressed by employment standards legislation, the Civil Code of Québec (${j.civilLawStatFR}) applies.` : ""}` },

      { type: "h2", text: "17. Independent legal advice" },
      { type: "p", text: "The Employee confirms that the Employee has had the opportunity to obtain independent legal advice about this Agreement before signing. If the Employee has chosen not to obtain that advice, the Employee has done so freely and of the Employee's own decision." },

      { type: "p", text: "By signing below, the Parties confirm that they have read this Agreement, understand it, and accept its terms." },
      { type: "spacer" },
      { type: "sig", leftLabel: "EMPLOYER", rightLabel: "EMPLOYEE" },
    ],

    bodyFR: [
      { type: "h1", text: "Contrat de travail", align: "center" },
      { type: "p", text: "Le présent Contrat de travail (le **Contrat**) est conclu en date du **{{agreement_date}}**." },

      { type: "h2", text: "Entre" },
      { type: "p", text: "**{{employer_legal_name}}**, une société ayant son siège principal à **{{employer_address}}** (l'**Employeur**)," },
      { type: "p", text: "— et —" },
      { type: "p", text: "**{{employee_name}}**, demeurant au **{{employee_address_line_1}}**, **{{employee_address_line_2}}** (l'**Employé**)." },
      { type: "p", text: "L'Employeur et l'Employé sont chacun une **Partie** et ensemble les **Parties**." },

      { type: "h2", text: "Pourquoi mettre ceci par écrit" },
      { type: "p", text: "Nous croyons que les bonnes relations de travail commencent par une compréhension claire et honnête de ce que chaque partie attend de l'autre. Le présent Contrat met cette compréhension par écrit pour que nous sachions où nous en sommes — maintenant et si les choses changent." },

      { type: "h2", text: "1. Poste et fonctions" },
      { type: "p", text: "L'Employeur engage l'Employé au poste de **{{position_title}}**, relevant de **{{manager_name}}**, **{{manager_title}}**. L'Employé accepte de remplir les fonctions énoncées dans la description d'emploi jointe et toutes autres fonctions raisonnables que l'Employeur lui assigne de temps en temps, conformément au poste. L'Employé agira avec honnêteté, de bonne foi et dans le meilleur intérêt de l'Employeur." },

      { type: "h2", text: "2. Date d'entrée en fonction et type d'emploi" },
      { type: "p", text: "L'emploi de l'Employé commence le **{{start_date}}** sur une base **{{employment_type}}**. L'emploi continuera indéfiniment sauf s'il est résilié conformément à la section 10." },

      { type: "h2", text: "3. Lieu de travail et horaire" },
      { type: "p", text: `Le lieu de travail régulier de l'Employé est **{{work_location}}**. L'horaire régulier de travail est de **{{scheduled_hours_per_week}}** heures par semaine, généralement **{{regular_hours}}**. L'Employeur peut varier raisonnablement le lieu et l'horaire de travail selon les besoins opérationnels. Les heures supplémentaires, le cas échéant, seront rémunérées conformément au ${j.shortFR} : ${j.overtimeNoteFR}` },

      { type: "h2", text: "4. Rémunération" },
      { type: "p", text: "L'Employeur versera à l'Employé un salaire de base de **{{annual_base_salary}}** par année, versé **{{pay_frequency}}** par dépôt direct, moins les retenues légales. L'Employé pourra également être admissible au **{{variable_comp_description}}**, sous réserve des modalités du régime applicable en vigueur." },
      { type: "p", text: "Le salaire de base et la rémunération variable feront l'objet d'un examen au moins une fois par année. Aucune augmentation n'est garantie, mais nous nous engageons à examiner la rémunération de façon ouverte et équitable." },

      { type: "h2", text: "5. Congés de vacances" },
      { type: "p", text: `L'Employé a droit à **{{vacation_weeks}}** semaines de congés payés par année, ce qui correspond au minimum exigé par le ${j.shortFR} (${j.vacStatFR}). ${j.vacEnhancedFR ? `Après ${j.code === "QC" ? "3" : "5"} ans de service continu, l'Employé a droit à ${j.vacEnhancedFR}.` : ""} Les congés s'ajoutent aux jours fériés prévus par la loi. Les congés non pris sont régis par la politique de congés de l'Employeur et la loi applicable.` },

      { type: "h2", text: "6. Avantages sociaux et bien-être" },
      { type: "p", text: "L'Employé est admissible à la participation au régime collectif d'avantages sociaux (**{{benefits_plan_name}}**) de l'Employeur conformément à ses modalités, à compter de **{{benefits_start_date}}**. L'Employé a également accès au Programme d'aide aux employés et à leur famille de l'Employeur pour le counseling et le soutien confidentiel. Nous croyons que le bien-être n'est pas une faveur — c'est une partie intégrante du travail efficace — et nous accommoderons raisonnablement les besoins de l'Employé, y compris ceux protégés par la loi sur les droits de la personne." },

      { type: "h2", text: "7. Absences et congés" },
      { type: "p", text: `L'Employé a droit à tous les congés exigés par le ${j.shortFR}${j.code === "QC" ? ` et le Code civil du Québec (${j.civilLawStatFR})` : ""} (notamment les congés de maternité, parental, pour responsabilités familiales, de maladie, de deuil, liée à la violence familiale ou sexuelle, et de réserve). L'Employeur ne représaillera pas l'Employé pour l'exercice de son droit à un congé légal.` },

      { type: "h2", text: "8. Confidentialité" },
      { type: "p", text: "Durant et après l'emploi, l'Employé gardera les renseignements confidentiels de l'Employeur dans le plus strict secret et ne les utilisera pour aucune autre fin que l'exercice de ses fonctions. **Les renseignements confidentiels** désignent tous les renseignements non publics concernant l'Employeur, ses clients, son personnel, ses finances, ses produits et services, sa technologie et ses plans commerciaux, sous quelque forme que ce soit (écrite, orale, électronique, etc.)." },
      { type: "p", text: "Cette obligation ne limite pas le droit de l'Employé de divulguer un acte répréhensible à un organisme de réglementation, de participer à une plainte en matière de dénonciation ou de droits de la personne, ou de discuter des salaires ou conditions de travail avec des collègues tel que le permet la loi." },

      { type: "h2", text: "9. Propriété intellectuelle" },
      { type: "p", text: "Toute invention, idée, travail, design, logiciel, documentation ou autre création que l'Employé développe dans l'exercice de ses fonctions, en utilisant les ressources de l'Employeur, ou qui se rapporte aux activités de l'Employeur (**Travaux**), appartient à l'Employeur. L'Employé cède à l'Employeur la totalité des droits, titre et intérêt dans les Travaux, y compris les droits d'auteur, et renonce à tous les droits moraux dans la mesure permise par la loi." },
      { type: "p", text: "L'Employeur ne revendique aucune invention que l'Employé développe entièrement sur son temps personnel, sans utiliser l'équipement ou les renseignements confidentiels de l'Employeur, et qui ne se rapporte pas aux activités ou à la recherche et développement prévue par l'Employeur." },

      { type: "h2", text: "10. Fin de l'emploi" },
      { type: "p", text: `L'emploi peut prendre fin de l'une des façons suivantes, et dans chaque cas l'Employé reçoit au minimum les prestations exigées par le ${j.shortFR} :` },
      { type: "bullet", text: "**Démission de l'Employé.** L'Employé peut démissionner en donnant **{{employee_notice_weeks}}** semaines de préavis écrit. L'Employeur peut renoncer à une partie ou à la totalité de ce préavis, auquel cas l'Employé sera tout de même rémunéré pour les jours non travaillés du préavis minimum légal." },
      { type: "bullet", text: `**Cessation par l'Employeur, sans motif.** L'Employeur peut résilier l'emploi en tout temps, sans motif, en donnant à l'Employé le plus élevé de (a) le préavis minimum de cessation (ou l'indemnité compensatrice) et l'indemnité de départ due en vertu du ${j.shortFR} (${j.noticeFormulaFR}${j.hasSeverance ? ` et ${j.severanceFormFR}` : ""}), ou (b) **{{without_cause_notice}}**. Tous les minimums légaux — y compris la continuation des avantages et l'accumulation de congés durant le délai-congé légal — seront fournis.` },
      { type: "bullet", text: `**Cessation par l'Employeur, pour motif valable.** L'Employeur peut résilier l'emploi sans préavis ou indemnité compensatrice seulement pour motif valable en vertu du ${j.shortFR} et de la common law, appliquée contextuellement (voir *McKinley c. BC Tel*, 2001 CSC 38). Même dans ces circonstances, l'Employé reçoit toute prestation qui ne peut être forfeiture en vertu du ${j.shortFR}.` },
      { type: "p", text: `Si une partie de cette section fournirait à l'Employé moins que les prestations minimales exigées par le ${j.shortFR} au moment de la fin de l'emploi, cette partie est nulle et l'Employé reçoit le minimum légal. Les Parties reconnaissent que cette section a été rédigée en tenant compte de l'arrêt *Waksdale c. Swegon North America Inc.*, 2020 ONCA 391.` },

      { type: "h2", text: "11. Non-concurrence et non-sollicitation" },
      { type: "p", text: j.nonCompeteBan === true
        ? `**Clauses de non-concurrence.** Toute clause de non-concurrence ou de non-sollicitation entre l'Employeur et l'Employé doit être signée séparément et doit être conforme au ${j.ncStatFR}. ${j.code === "ON" ? "Les accords de non-concurrence conclus après le 25 octobre 2021 sont généralement nuls en vertu de l'art. 67.2 de la LNE, sauf pour les cadres supérieurs et les transactions de vente d'entreprise." : ""}`
        : j.code === "QC"
        ? `**Clauses de non-concurrence.** Toute clause de non-concurrence ou de non-sollicitation doit être écrite, limitée quant à la durée, au territoire et à la portée de l'activité, et applicable seulement dans la mesure nécessaire pour protéger les intérêts commerciaux légitimes (${j.ncStatFR}). Le fardeau de prouver que la restriction ne dépasse pas ce qui est nécessaire incombe à l'Employeur.`
        : j.code === "BC"
        ? `**Clauses de non-concurrence.** Les tribunaux de C.-B. ne modifieront pas une clause de non-concurrence excessivement large. Si une clause est déraisonnablement large quant à la durée, la géographie ou la portée de l'activité, la clause entière est nulle (${j.ncStatFR}). Toute non-concurrence doit être soigneusement adaptée aux intérêts commerciaux légitimes.`
        : `**Clauses de non-concurrence.** Toute clause de non-concurrence ou de non-sollicitation doit être conforme à la common law exigeant qu'elle soit raisonnable quant à la durée, au territoire et à la portée, nécessaire pour protéger les intérêts commerciaux légitimes, et clairement définie. Les clauses excessivement larges peuvent être inapplicables.` },

      { type: "h2", text: "12. Politiques" },
      { type: "p", text: "L'Employé accepte de se conformer aux politiques de l'Employeur, telles que modifiées de temps en temps, y compris le Manuel de l'employé, le Code de conduite commerciale et la Politique de prévention du harcèlement, de la discrimination et de la violence au travail. L'Employeur rendra ces politiques raisonnablement accessibles à l'Employé et donnera un préavis raisonnable de tout changement matériel." },

      { type: "h2", text: "13. Droits de la personne et dignité" },
      { type: "p", text: `L'Employeur s'engage à maintenir un milieu de travail sans discrimination ni harcèlement. L'Employé a le droit de travailler dans un tel environnement et de soulever des préoccupations sans crainte de représailles. L'Employeur accommodera raisonnablement les besoins de l'Employé liés aux motifs protégés par la loi sur les droits de la personne (${j.hrStatFR}), jusqu'au point de la contrainte excessive, conformément à l'arrêt *Colombie-Britannique (Public Service Employee Relations Commission) c. SCFP*, [1999] 3 R.C.S. 3 (le test *Meiorin*).` },

      { type: "h2", text: "14. Accord intégral" },
      { type: "p", text: "Le présent Contrat, conjointement avec les politiques mentionnées ci-dessus, constitue l'accord intégral entre les Parties concernant l'emploi de l'Employé. Il remplace tout accord antérieur, écrit ou verbal, sur le même sujet. Tout changement au présent Contrat doit être fait par écrit et signé par les deux Parties — sauf que l'Employeur peut modifier ses politiques de temps en temps avec un préavis raisonnable." },

      { type: "h2", text: "15. Disposition dérogatoire" },
      { type: "p", text: "Si une partie du présent Contrat est jugée inapplicable, le reste du Contrat continue en plein effet. Les Parties traiteront la partie inapplicable comme étant modifiée au minimum nécessaire pour la rendre applicable." },

      { type: "h2", text: "16. Loi applicable" },
      { type: "p", text: `Le présent Contrat est régi par les lois de la ${j.govLawFR} et les lois du Canada qui s'y appliquent. La loi principale sur l'emploi est le ${j.shortFR} (${j.statuteCiteFR}).${j.code === "QC" ? ` Pour les matières non couvertes par la loi sur les normes d'emploi, le Code civil du Québec (${j.civilLawStatFR}) s'applique.` : ""}` },

      { type: "h2", text: "17. Conseil juridique indépendant" },
      { type: "p", text: "L'Employé confirme qu'il a eu la possibilité d'obtenir des conseils juridiques indépendants au sujet du présent Contrat avant de le signer. Si l'Employé a choisi de ne pas obtenir ces conseils, il l'a fait librement et de sa propre initiative." },

      { type: "p", text: "En signant ci-dessous, les Parties confirment qu'elles ont lu le présent Contrat, le comprennent et acceptent ses modalités." },
      { type: "spacer" },
      { type: "sig", leftLabel: "EMPLOYEUR", rightLabel: "EMPLOYÉ" },
    ],

    // ========================================================================
    // LEGAL NOTES — Jurisdiction-specific
    // ========================================================================
    legalNotesEN: j.code === "ON" ? [
      {
        heading: "1. Non-compete voidness (ESA s. 67.2)",
        body: "Non-compete agreements entered into after October 25, 2021 are void under ESA s. 67.2, except for: (a) executives (defined as employees earning $2.50/hour or more above the provincial minimum wage), and (b) sale-of-business transactions. Any non-solicit clause must also comply with s. 67.2. A non-compete for a non-executive is an unenforceable restraint of trade. **Action:** Do not attempt to enforce a post-October 2021 non-compete against a non-executive; the entire clause will be void.",
      },
      {
        heading: "2. Waksdale and termination for cause: overbroad clauses",
        body: "Waksdale v. Swegon North America Inc., 2020 ONCA 391: if the for-cause clause invokes a standard broader than the ESA (which requires 'wilful disobedience, deliberate disregard, or conduct amounting to wilful or gross negligence'), the entire termination section is void, and the employee is entitled to common-law reasonable notice. Dufault v. The Corporation of the Township of Ignace, 2024 ONSC 1029 applied similar scrutiny: language like 'active employment' can void the clause. **Action:** Use statutory language only; track ESA ss. 57–60.",
      },
      {
        heading: "3. Common-law reasonable notice (Bardal factors)",
        body: "If the termination clause is struck down, the employee is owed common-law notice determined by Bardal v. Globe & Mail Ltd., (1960) 24 DLR (2d) 140 (Ont. HC): age, length of service, position, and availability of comparable employment. Executives may be entitled to 18–24 months. The clause at §10 attempts to displace this, but only if it is itself valid.",
      },
      {
        heading: "4. Confidence and procedural fairness in dismissal for cause",
        body: "Even if dismissal for cause is justified on the merits, the employer must provide procedural fairness: notice of the allegation, an opportunity to respond, and a fair investigation (if warranted). Procedural unfairness can convert a for-cause dismissal into a wrongful termination. **Action:** Document all disciplinary steps; consult counsel before terminating for cause.",
      },
      {
        heading: "5. Severance pay (ESA s. 64) — payroll threshold",
        body: "Severance (1 week per year, max 26 weeks) is owed only if: (a) payroll ≥ $2.5M, and (b) 5+ continuous years service. Most SMEs do not trigger this. If triggered, severance is distinct from notice and must be paid. **Action:** Confirm payroll; if applicable, the termination clause must expressly state the severance formula.",
      },
      {
        heading: "6. Probation and statutory notice exemption",
        body: "ESA s. 54(1)(b) exempts the employer from providing notice only during the first 3 months. A contractual probation longer than 3 months does not extend the exemption; statutory notice applies after month 3. **Action:** Do not suggest probationary employees can be fired without notice after month 3.",
      },
      {
        heading: "7. Variable compensation and integration",
        body: "Kieran v. Ingram Micro Inc., 2004 ONCA 168; Paquette v. TeraGo Networks Inc., 2016 ONCA 618: bonuses paid consistently may become an implied contractual term. The discretionary language in §4 mitigates this, but only if the Plan document itself disclaims entitlement. **Action:** Verify the Plan contains identical disclaimers; incorporate by reference.",
      },
      {
        heading: "8. Intellectual property and moral rights",
        body: "Copyright Act, R.S.C. 1985, c. C-42, s. 14.1: employees retain moral rights (right of paternity, integrity) in their creations unless they explicitly waive them in writing. A blanket work-for-hire clause is insufficient; the agreement must explicitly waive moral rights. **Action:** §9 includes a waiver; ensure it is clear that moral rights are waived to the extent permitted.",
      },
      {
        heading: "9. Accommodation and human rights",
        body: "Human Rights Code, R.S.O. 1990, c. H.19: the employer must accommodate to the point of undue hardship. Meiorin test (British Columbia (PSERC) v. BCGSEU, [1999] 3 S.C.R. 3): job requirements must be (a) rationally connected to the job, (b) adopted in good faith, (c) reasonably necessary. **Action:** Document all accommodation requests; consult HR and legal before denying.",
      },
      {
        heading: "10. Pay equity (Pay Equity Act, R.S.O. 1990, c. P.7)",
        body: "Mandatory for employers with 10+ employees. The salary offered must comply with the company's pay-equity plan (job-to-job or proportional method). Non-compliance can result in back-pay and fines. **Action:** Verify proposed salary against the pay-equity plan before offering.",
      },
    ] : j.code === "QC" ? [
      {
        heading: "1. Civil Code art. 2089 — non-compete and restraint of trade",
        body: "Civil Code of Québec art. 2089: any non-compete must be in writing, limited in duration, territory, and scope of activity, and enforceable only if necessary to protect legitimate business interests. The burden is on the employer to prove the restriction goes no further than necessary. An unreasonably broad clause is void. **Action:** Any non-compete must clearly identify the protectable interest and include reasonable limits.",
      },
      {
        heading: "2. Art. 2092 — absolute right to reasonable notice",
        body: "CCQ art. 2092: the employer must give reasonable notice. An employee who has worked 3 months or more has an absolute right to notice or indemnity. Any contractual term derogating from this right is without effect (ARLS art. 93). **Action:** Ensure the termination clause respects art. 2092; the 'cause' standard must comply with ARLS art. 124.",
      },
      {
        heading: "3. Wrongful dismissal complaint (ARLS art. 124)",
        body: "After 2 years continuous service, an employee can file a wrongful dismissal complaint with the TAT. The TAT may order reinstatement, back pay (up to 1 year), and moral + compensatory damages. This is a statutory recourse distinct from notice under art. 82. **Action:** Acknowledge this recourse in the agreement; do not attempt to waive it.",
      },
      {
        heading: "4. Termination formula (ARLS art. 82)",
        body: "Art. 82: notice must be given in writing: 1 week per year of service for 1–2 years; 2 weeks per year for 3+ years. Alternatively, indemnity in lieu. The notice period begins on the day of notification. **Action:** The agreement should specify notice or indemnity in lieu, or confirm it will follow art. 82.",
      },
      {
        heading: "5. Sick leave and personal days (ARLS art. 79.1)",
        body: "Art. 79.1: 2 days of paid leave per year for personal or family illness; plus up to 24 unpaid hours annually for other reasons. Many employers provide more generous policies. The company policy overrides the minimum if more generous. **Action:** Confirm entitlement in benefits summary and handbook.",
      },
      {
        heading: "6. Overtime and right to refuse (ARLS arts. 55, 59.0.1)",
        body: "Art. 55: overtime is 1.5× for hours beyond 40/week. Art. 59.0.1: an employee may refuse overtime on family-status grounds (children, elderly parents). This right cannot be waived. **Action:** Acknowledge in the handbook the right to refuse overtime in family situations.",
      },
      {
        heading: "7. Language of contract (Bill 96, Charter of the French Language)",
        body: "Charter of the French Language, art. 41 (as amended by Bill 96, S.Q. 2022, c. 14): employment agreements must be provided in French. An employee may request English, but French prevails in conflict. All mandatory documentation must be in French. **Action:** Provide this agreement in French to all Québec employees.",
      },
      {
        heading: "8. Civil Code (CCQ) vs. common law",
        body: "Québec uses a civil-law system based on the Civil Code, not common law. Art. 2085–2097 govern employment contracts. Where the ARLS is silent, the CCQ applies. Principles of good faith (art. 6–7) and prohibition of unconscionable terms (art. 1437) protect employees. **Action:** Consult a Québec employment lawyer for any contested interpretation.",
      },
      {
        heading: "9. Intellectual property and moral rights",
        body: "Copyright Act, R.S.C. 1985, c. C-42, s. 14.1: employees have moral rights unless waived in writing. §9 includes an explicit waiver; this is valid in Québec. However, CCQ art. 2093 restricts what an employer can require of an employee; any excessive restriction may be unenforceable as contra-public-policy. **Action:** Ensure the IP clause is narrowly tailored to work created in the scope of employment.",
      },
      {
        heading: "10. Pay equity (Loi sur l'équité salariale, RLRQ c E-12.001)",
        body: "Mandatory for employers with 10+ employees. Pay-equity exercises must be conducted every 5 years. The salary offered must comply with the company's most recent exercise. Non-compliance can result in back-pay and CNESST penalties. **Action:** Verify proposed salary against the pay-equity exercise before offering.",
      },
    ] : j.code === "BC" ? [
      {
        heading: "1. Termination clause enforceability (BC ESA s. 4)",
        body: "s. 4: any term purporting to exclude or limit rights under the Act is void. Waksdale v. Swegon North America Inc., 2020 ONCA 391 is an Ontario decision, but BC courts are likely to apply similar scrutiny. The clause at §10 must not attempt to contract out of statutory minimums. **Action:** Ensure the clause provides at least statutory notice (2 weeks) or pay in lieu.",
      },
      {
        heading: "2. Notice of termination (BC ESA s. 63)",
        body: "s. 63: notice must be given at least 2 weeks in advance (or, for group terminations of 50+, 8 weeks). If notice is not given, wages in lieu must be paid. There is no statutory severance separate from notice in BC. **Action:** The agreement must specify that notice or pay in lieu will be provided per s. 63.",
      },
      {
        heading: "3. Final pay (BC ESA s. 18)",
        body: "s. 18: all wages must be paid within 48 hours of termination (or within 6 days if the employee provided notice of resignation). **Action:** Ensure payroll processes final pay within the statutory window.",
      },
      {
        heading: "4. Vacation and carryover (BC ESA ss. 58–61)",
        body: "s. 58: minimum 2 weeks (4%) per year; 3 weeks (6%) after 5 years. Vacation must be taken within 12 months of accrual; employers may defer carryover only by written agreement and only to the following calendar year. Unused vacation is payable on termination. **Action:** Verify the vacation policy complies with carryover and payout rules.",
      },
      {
        heading: "5. Paid sick days (BC ESA s. 49.1, effective 2022)",
        body: "s. 49.1: employees are entitled to 5 paid sick days per year. Additionally, s. 49 provides unpaid illness/injury leave. The 5-day entitlement is non-negotiable and cannot be rolled into vacation. **Action:** Confirm 5 paid sick days per year in benefits summary.",
      },
      {
        heading: "6. Probation and notice (no exemption under BC ESA)",
        body: "The BC ESA does not exempt probationary employees from notice requirements. All employees are entitled to 2 weeks' notice (s. 63) regardless of probation status. A contractual probation may exist, but it does not affect statutory rights. **Action:** Do not suggest probationary employees can be terminated without notice.",
      },
      {
        heading: "7. Non-compete enforceability (Shafron: no blue-pencilling)",
        body: "Shafron v. KRG Insurance Brokers (Western) Inc., 2009 SCC 6: BC courts will not rewrite ('blue-pencil') an overly broad non-compete. If a clause is unreasonably broad, the entire covenant is void. **Action:** Any non-compete must be carefully tailored to legitimate protectable interests with reasonable geographic and temporal limits.",
      },
      {
        heading: "8. Privacy (PIPA, S.B.C. 2003, c. 63)",
        body: "BC is a 'substantially similar' province, so PIPA applies instead of federal PIPEDA to provincial employers. PIPA principles require: (a) legitimate purpose, (b) consent, (c) minimization, (d) accuracy, (e) transparency, (f) individual access, (g) correction, (h) security, (i) retention limits. Background checks must be justified and conducted with consent. **Action:** Ensure background check procedures include explicit written consent and clear statement of purpose.",
      },
      {
        heading: "9. Accommodation and human rights (BC HRC, R.S.B.C. 1996, c. 210)",
        body: "The BC Human Rights Code protects on grounds including disability, family status, gender identity, and religion. The Meiorin test applies: any requirement must be (a) rationally related to the job, (b) adopted in good faith, (c) reasonably necessary. Accommodation is required to the point of undue hardship. **Action:** Document all accommodation requests and decisions; consult legal before denying.",
      },
      {
        heading: "10. No mandatory pay equity in BC",
        body: "Unlike Ontario and Québec, BC has no mandatory pay equity legislation as of 2026. Salary-setting is discretionary, but discrimination claims under the Human Rights Code are possible if pay is materially lower than that of comparably situated employees. **Action:** Conduct an informal equity review to avoid discrimination claims.",
      },
    ] : j.code === "AB" ? [
      {
        heading: "1. Statutory rights protection (AB ESC s. 56)",
        body: "s. 56: no employer may deprive an employee of rights under the Act through a contract. Any term limiting notice or severance below statutory minimums is void. **Action:** The termination clause must not reduce notice below the AB ESC formula.",
      },
      {
        heading: "2. Notice of termination (AB ESC s. 56)",
        body: "s. 56: notice is 1 week per completed year of service (min. 1 week, max. 8 weeks). There is no statutory severance in Alberta, unlike Ontario. Notice is the primary remedy for termination without cause. **Action:** The agreement should disclose expected notice based on tenure.",
      },
      {
        heading: "3. Final pay (AB ESC s. 77)",
        body: "s. 77: all wages (including notice or pay in lieu) must be paid within 10 days of termination, or by the next regular pay date if sooner. **Action:** Ensure payroll processes final pay within the statutory window.",
      },
      {
        heading: "4. Vacation (AB ESC s. 55)",
        body: "s. 55: minimum 2 weeks (4%) per year. No enhanced entitlement like BC or QC. Vacation is paid as a percentage of gross wages. Carryover may be limited if 30 days' written notice is given. Unused vacation is payable on termination. **Action:** Verify vacation policy specifies 4% minimum and carryover rules.",
      },
      {
        heading: "5. Sick leave (AB ESC s. 46, unpaid)",
        body: "AB ESC does not provide paid sick leave. s. 46 provides unpaid family responsibility leave (5 days/year). Employers typically offer paid sick days by policy. **Action:** If company offers paid sick days, specify the entitlement in benefits summary.",
      },
      {
        heading: "6. Probation (no statutory exemption)",
        body: "AB ESC does not address probation. Common-law probation may be agreed, but it does not eliminate notice or just-cause protections. Typically 3–6 months. **Action:** State probation period clearly; confirm statutory notice applies after probation ends.",
      },
      {
        heading: "7. Just cause (common law, McKinley test)",
        body: "AB courts apply the McKinley test (2001 SCC 38): cause must be serious, unrelated to performance, and incurable. Poor performance alone is insufficient; progressive discipline is required. **Action:** Document all disciplinary steps; consult counsel before terminating for cause.",
      },
      {
        heading: "8. Non-compete enforceability (common law, reasonable restriction)",
        body: "AB courts enforce reasonable non-competes if they protect legitimate business interests (trade secrets, customer relationships) and are reasonable in time, territory, and scope. Unlike BC, AB courts may reform an unreasonable clause. **Action:** Any non-compete must be clearly tailored with reasonable limits.",
      },
      {
        heading: "9. Human rights and accommodation (Alberta Human Rights Act, R.S.A. 2000, c. A-14.5)",
        body: "The Human Rights Act prohibits discrimination on protected grounds (gender, race, disability, etc.). No mandatory pay equity legislation. However, pay discrimination on protected grounds is prohibited. The Meiorin test applies to all job requirements. **Action:** Conduct informal equity review; ensure salary decisions are documented and non-discriminatory.",
      },
      {
        heading: "10. Privacy (PIPEDA, federal baseline; no PIPA in AB)",
        body: "Alberta has no provincial privacy legislation, so federal PIPEDA applies to provincial private-sector employers. Background checks must be conducted with consent, for legitimate purposes, and in compliance with PIPEDA principles. **Action:** Ensure background check procedures include explicit written consent and clear statement of purpose.",
      },
    ] : j.code === "FED" ? [
      {
        heading: "1. Unjust dismissal (CLC s. 230)",
        body: "CLC Part II s. 230: after 12 months continuous service, an employee can file a complaint if dismissed without just cause. The CIRB may order reinstatement, back pay, or other compensation. This is a summary remedy, faster than common-law wrongful dismissal (which takes years in court). **Action:** Acknowledge this recourse; ensure the agreement does not waive it.",
      },
      {
        heading: "2. Notice (common law, no CLC minimum)",
        body: "The CLC does not prescribe statutory notice. Instead, common-law reasonable notice applies (Bardal factors). The CIRB may award compensation in lieu. The agreement should specify a contractual notice period or confirm it will follow common-law principles. **Action:** §10 references common law; this is appropriate.",
      },
      {
        heading: "3. Severance pay (none under CLC)",
        body: "The CLC provides no statutory severance separate from notice. The CIRB has discretion to award 'just and equitable' compensation. **Action:** Do not promise statutory severance; clarify compensation will be determined per CLC principles.",
      },
      {
        heading: "4. Vacation (CLC s. 206)",
        body: "s. 206: minimum 2 weeks (4%) per year; 3 weeks after 15 years service. Vacation must be taken within 12 months; carryover may be limited by written agreement. Unused vacation is payable on termination. **Action:** Verify vacation policy aligns with s. 206.",
      },
      {
        heading: "5. Parental leave (CLC s. 206.2)",
        body: "s. 206.2: pregnancy leave up to 17 weeks; parental leave up to 61 weeks (either parent). Federal EI parental benefits run concurrently. **Action:** Direct employees to Service Canada for EI parental benefits; company must protect job during statutory leave.",
      },
      {
        heading: "6. Just cause (common law, McKinley test)",
        body: "CLC s. 230: just cause is determined on a balance of probabilities. Federal courts apply the McKinley test (2001 SCC 38): misconduct must be serious, unrelated to performance, and incurable. Simple poor performance does not constitute just cause. **Action:** Document all disciplinary action; consult counsel before terminating for cause.",
      },
      {
        heading: "7. Intellectual property and moral rights",
        body: "Copyright Act, R.S.C. 1985, c. C-42, s. 14.1: employees have moral rights unless waived in writing. §9 includes an explicit waiver; this is valid. Ensure the clause is narrowly tailored to work created in scope of employment. **Action:** Review IP clause with legal counsel.",
      },
      {
        heading: "8. Non-compete enforceability (common law, reasonableness)",
        body: "Federal courts enforce reasonable non-competes if they protect legitimate business interests (trade secrets, customer relationships, confidential information) and are reasonable in time, territory, and scope. The burden is on the employer to justify. **Action:** Any non-compete must be clearly tailored with reasonable limits.",
      },
      {
        heading: "9. Canadian Human Rights Act (R.S.C. 1985, c. H-6) and accommodation",
        body: "The CHRA prohibits discrimination on protected grounds (disability, gender identity, race, etc.). The Meiorin test applies: any requirement must be (a) rationally related, (b) adopted in good faith, (c) reasonably necessary. Accommodation is required to the point of undue hardship. **Action:** Document accommodation requests and decisions; consult legal before denying.",
      },
      {
        heading: "10. Privacy (PIPEDA, S.C. 2000, c. 5)",
        body: "PIPEDA applies to federally regulated private-sector employers. Principles: legitimate purpose, consent, minimization, accuracy, openness, access, correction, security, retention limits. Background checks must be justified by position and conducted with consent. Applicants must be notified if a check is conducted. **Action:** Ensure background check procedures include explicit written consent and clear statement of purpose.",
      },
    ] : [
      {
        heading: "1. Statutory employment standards",
        body: `Employment is governed by the ${j.statuteEN} (${j.statuteCiteEN}). This agreement is subject to all statutory minimum entitlements.`,
      },
      {
        heading: "2. Termination for cause",
        body: `Any termination for cause must comply with the statutory definition of 'just cause' under the ${j.shortEN}.`,
      },
      {
        heading: "3. Notice of termination",
        body: `Minimum notice is: ${j.noticeFormulaEN}. The agreement acknowledges this statutory requirement.`,
      },
      {
        heading: "4. Vacation",
        body: `Minimum vacation entitlement: ${j.vacMinWeeks} weeks per year (${j.vacMinPct}), governed by ${j.vacStatEN}.`,
      },
      {
        heading: "5. Sick leave",
        body: `Sick leave is governed by: ${j.sickLeaveEN}.`,
      },
      {
        heading: "6. Overtime",
        body: `Overtime is compensated per: ${j.overtimeNoteEN}.`,
      },
      {
        heading: "7. Human rights and accommodation",
        body: `Employment is subject to human rights legislation (${j.hrStatEN}). Accommodation is required to the point of undue hardship.`,
      },
      {
        heading: "8. Intellectual property",
        body: "Work product created in the scope of employment belongs to the employer, subject to waiver of moral rights to the extent permitted by law.",
      },
      {
        heading: "9. Confidentiality",
        body: "Confidential information must be kept secret during and after employment. This does not limit whistleblower rights or the right to discuss wages/conditions with coworkers.",
      },
      {
        heading: "10. Entire agreement",
        body: `This agreement is governed by the ${j.govLawEN} and is subject to the ${j.shortEN}.`,
      },
    ],

    legalNotesFR: j.code === "ON" ? [
      {
        heading: "1. Nullité de la non-concurrence (LNE art. 67.2)",
        body: "Les accords de non-concurrence conclus après le 25 octobre 2021 sont nuls en vertu de l'art. 67.2 de la LNE, sauf pour : (a) les cadres supérieurs (définis comme les employés gagnant 2,50 $/h ou plus au-dessus du salaire minimum provincial), et (b) les transactions de vente d'entreprise. Toute clause de non-sollicitation doit également respecter l'art. 67.2. Une non-concurrence pour un non-cadre est une entrave au commerce inapplicable. **Action :** Ne pas tenter d'appliquer une non-concurrence post-octobre 2021 contre un non-cadre; la clause entière sera nulle.",
      },
      {
        heading: "2. Waksdale et cessation pour motif valable : clauses excessives",
        body: "Waksdale c. Swegon North America Inc., 2020 ONCA 391 : si la clause pour motif valable invoque un critère plus large que celui de la LNE (qui exige « la désobéissance délibérée, le mépris délibéré, ou la conduite s'assimilant à la négligence délibérée ou grave »), la section entière de cessation est nulle, et l'employé a droit à un préavis raisonnable en common law. Dufault c. Corporation of the Township of Ignace, 2024 ONSC 1029 a appliqué un contrôle similaire. **Action :** Utiliser seulement le libellé légal; respecter les articles 57 à 60 de la LNE.",
      },
      {
        heading: "3. Préavis raisonnable en common law (facteurs Bardal)",
        body: "Si la clause de cessation est annulée, l'employé a droit à un préavis raisonnable en common law déterminé par Bardal c. Globe & Mail Ltd., (1960) 24 DLR (2d) 140 (Ont. HC) : âge, ancienneté, poste, et disponibilité d'emplois comparables. Les cadres peuvent avoir droit à 18 à 24 mois. La clause à l'art. 10 tente d'écarter ce droit, mais seulement si elle-même est valide.",
      },
      {
        heading: "4. Équité procédurale en cas de congédiement pour motif valable",
        body: "Même si le congédiement pour motif valable est justifié au fond, l'employeur doit assurer l'équité procédurale : avis de l'allégation, droit de répondre, et enquête juste. L'inéquité procédurale peut convertir un congédiement pour motif en résiliation injustifiée. **Action :** Documenter toutes les mesures disciplinaires; consulter un avocat avant de résilier pour motif.",
      },
      {
        heading: "5. Indemnité de départ (LNE art. 64) — seuil de masse salariale",
        body: "L'indemnité de départ (1 semaine par année, max 26 semaines) est due seulement si : (a) masse salariale ≥ 2,5 M$, et (b) 5+ années de service continu. La plupart des PME ne déclenchent pas ce seuil. Si applicable, l'indemnité est distincte du préavis et doit être versée. **Action :** Confirmer la masse salariale; si applicable, la clause de cessation doit énoncer explicitement la formule.",
      },
      {
        heading: "6. Probation et exemption de préavis légal",
        body: "LNE art. 54(1)(b) : l'exemption du préavis s'applique seulement pendant les 3 premiers mois. Une probation contractuelle plus longue n'étend pas l'exemption; le préavis légal s'applique après le mois 3. **Action :** Ne pas laisser entendre que les employés probationnaires peuvent être congédiés sans préavis après le mois 3.",
      },
      {
        heading: "7. Rémunération variable et intégration",
        body: "Kieran c. Ingram Micro Inc., 2004 ONCA 168; Paquette c. TeraGo Networks Inc., 2016 ONCA 618 : les primes versées régulièrement peuvent devenir une condition implicite du contrat. Le libellé discrétionnaire atténue ce risque, mais seulement si le document du Régime lui-même inclut des clauses de non-droit. **Action :** Vérifier que le Régime contient des clauses de non-droit identiques; incorporer par renvoi.",
      },
      {
        heading: "8. Propriété intellectuelle et droits moraux",
        body: "Loi sur le droit d'auteur, L.R.C. 1985, chap. C-42, art. 14.1 : les employés conservent les droits moraux (droit de paternité, d'intégrité) sauf s'ils les renoncent explicitement par écrit. Une clause générale de propriété patronale est insuffisante; l'accord doit explicitement renoncer aux droits moraux. **Action :** L'art. 9 inclut une renonciation; s'assurer qu'elle est claire.",
      },
      {
        heading: "9. Accommodement et droits de la personne",
        body: "Code des droits de la personne, L.R.O. 1990, chap. H.19 : l'employeur doit accommoder jusqu'à la contrainte excessive. Test Meiorin : les exigences doivent être (a) rationnellement liées au poste, (b) adoptées de bonne foi, (c) raisonnablement nécessaires. **Action :** Documenter toute demande d'accommodement; consulter avant de refuser.",
      },
      {
        heading: "10. Équité salariale (Loi sur l'équité salariale, L.R.O. 1990, chap. P.7)",
        body: "Obligatoire pour les employeurs de 10 salariés ou plus. Le salaire offert doit être conforme au plan d'équité salariale de la société. La non-conformité peut entraîner des ajustements rétroactifs et des amendes. **Action :** Vérifier que le salaire proposé est conforme avant de l'offrir.",
      },
    ] : j.code === "QC" ? [
      {
        heading: "1. Code civil art. 2089 — non-concurrence et entrave au commerce",
        body: "Code civil du Québec art. 2089 : toute non-concurrence doit être écrite, limitée quant à la durée, au territoire et à la portée, et applicable seulement si nécessaire pour protéger les intérêts commerciaux légitimes. Le fardeau incombe à l'employeur de prouver que la restriction ne dépasse pas le nécessaire. Une clause excessivement large est nulle. **Action :** Toute non-concurrence doit clairement identifier l'intérêt protégeable et inclure des limites raisonnables.",
      },
      {
        heading: "2. Art. 2092 — droit absolu à un préavis raisonnable",
        body: "CCQ art. 2092 : l'employeur doit donner un préavis raisonnable. Un employé ayant travaillé 3 mois ou plus a un droit absolu à un préavis ou une indemnité. Toute stipulation contractuelle qui déroge à ce droit est sans effet (LNT art. 93). **Action :** S'assurer que la clause de cessation respecte l'art. 2092; le critère pour motif valable doit respecter l'art. 124 de la LNT.",
      },
      {
        heading: "3. Plainte en congédiement injustifié (LNT art. 124)",
        body: "Après 2 ans de service continu, un employé peut déposer une plainte en congédiement injustifié auprès du TAT. Le TAT peut ordonner la réintégration, les salaires rétroactifs (jusqu'à 1 an), et les dommages moraux et compensatoires. C'est un recours légal distinct du préavis selon l'art. 82. **Action :** Reconnaître ce recours dans l'accord; ne pas tenter de le renoncer.",
      },
      {
        heading: "4. Formule de cessation (LNT art. 82)",
        body: "Art. 82 : le préavis doit être donné par écrit : 1 semaine par année de service pour 1 à 2 ans; 2 semaines par année pour 3 ans ou plus. Sinon, une indemnité en tenant lieu. Le délai-congé commence le jour de la notification. **Action :** L'accord devrait préciser si c'est préavis ou indemnité, ou confirmer qu'il suivra l'art. 82.",
      },
      {
        heading: "5. Congé de maladie et congé personnel (LNT art. 79.1)",
        body: "Art. 79.1 : 2 jours de congé payé par année pour maladie ou responsabilités familiales; plus jusqu'à 24 heures non payées annuellement pour d'autres raisons. De nombreux employeurs offrent des politiques plus généreuses. La politique de l'entreprise dépasse le minimum si plus généreuse. **Action :** Confirmer l'entitlement dans le résumé des avantages et le manuel.",
      },
      {
        heading: "6. Heures supplémentaires et droit de refus (LNT arts. 55, 59.0.1)",
        body: "Art. 55 : les heures supplémentaires sont 1,5 fois au-delà de 40h/semaine. Art. 59.0.1 : un employé peut refuser les heures supplémentaires pour motifs de statut familial (enfants, parents âgés). Ce droit ne peut pas être renoncer. **Action :** Reconnaître dans le manuel le droit de refuser les heures supplémentaires.",
      },
      {
        heading: "7. Langue du contrat (Loi 96, Charte de la langue française)",
        body: "Charte de la langue française, art. 41 (modifiée par Loi 96, L.Q. 2022, c. 14) : les contrats de travail doivent être rédigés en français. Un employé peut demander l'anglais, mais le français prévaut en cas de conflit. Tous les documents obligatoires doivent être en français. **Action :** Fournir cet accord en français à tous les employés québécois.",
      },
      {
        heading: "8. Code civil (CCQ) c. common law",
        body: "Le Québec utilise un système civil fondé sur le Code civil, pas la common law. Les arts. 2085 à 2097 régissent les contrats de travail. Où la LNT est silencieuse, le CCQ s'applique. Les principes de bonne foi (arts. 6 à 7) et d'interdiction de clauses déraisonnables (art. 1437) protègent les employés. **Action :** Consulter un avocat du travail québécois en cas de doute.",
      },
      {
        heading: "9. Propriété intellectuelle et droits moraux",
        body: "Loi sur le droit d'auteur, L.R.C. 1985, chap. C-42, art. 14.1 : les employés ont des droits moraux sauf s'ils les renoncent par écrit. L'art. 9 inclut une renonciation explicite; elle est valide au Québec. Cependant, l'art. 2093 du CCQ restreint ce qu'un employeur peut exiger; toute restriction excessive peut être inapplicable comme contraire à l'ordre public. **Action :** S'assurer que la clause de PI est limitée au travail effectué dans le cadre de l'emploi.",
      },
      {
        heading: "10. Équité salariale (Loi sur l'équité salariale, RLRQ c E-12.001)",
        body: "Obligatoire pour les employeurs de 10 salariés ou plus. Les exercices d'équité doivent être menés tous les 5 ans. Le salaire offert doit être conforme à l'exercice le plus récent de la société. La non-conformité peut entraîner des ajustements rétroactifs et des pénalités. **Action :** Vérifier que le salaire proposé est conforme avant de l'offrir.",
      },
    ] : j.code === "BC" ? [
      {
        heading: "1. Applicabilité de la clause de cessation (ESA C.-B. art. 4)",
        body: "Art. 4 : toute stipulation visant à exclure ou limiter les droits en vertu de la Loi est nulle. Waksdale c. Swegon North America Inc., 2020 ONCA 391 est une décision ontarienne, mais les tribunaux de C.-B. appliqueront probablement un contrôle similaire. La clause à l'art. 10 ne doit pas tenter de contracter en dehors des minimums légaux. **Action :** S'assurer que la clause prévoit au minimum le préavis légal (2 semaines) ou l'indemnité compensatrice.",
      },
      {
        heading: "2. Préavis de cessation (ESA C.-B. art. 63)",
        body: "Art. 63 : le préavis doit être donné au moins 2 semaines à l'avance (ou pour les licenciements collectifs de 50+, 8 semaines). Si le préavis n'est pas donné, l'indemnité de salaire en tenant lieu doit être versée. Il n'y a pas d'indemnité de départ légale distincte en C.-B. **Action :** L'accord doit préciser que le préavis ou l'indemnité en tenant lieu sera fourni selon l'art. 63.",
      },
      {
        heading: "3. Salaire final (ESA C.-B. art. 18)",
        body: "Art. 18 : tous les salaires doivent être payés dans les 48 heures suivant la cessation (ou dans les 6 jours si l'employé a donné avis de démission). **Action :** S'assurer que la paie traite le salaire final dans le délai légal.",
      },
      {
        heading: "4. Congés et report (ESA C.-B. arts. 58 à 61)",
        body: "Art. 58 : minimum 2 semaines (4 %) par année; 3 semaines (6 %) après 5 ans. Les congés doivent être pris dans 12 mois; le report peut être différé seulement par accord écrit et seulement à l'année civile suivante. Les congés non pris sont payables à la cessation. **Action :** Vérifier que la politique des congés est conforme aux règles de report et de paiement.",
      },
      {
        heading: "5. Jours de maladie payés (ESA C.-B. art. 49.1, en vigueur depuis 2022)",
        body: "Art. 49.1 : les employés ont droit à 5 jours de maladie payés par année. De plus, l'art. 49 prévoit un congé non payé pour maladie/blessure. Le droit à 5 jours est non-négociable et ne peut pas être regroupé dans les congés. **Action :** Confirmer 5 jours de maladie payés par année dans le résumé des avantages.",
      },
      {
        heading: "6. Probation et préavis (aucune exemption)",
        body: "L'ESA C.-B. n'exempte pas les employés probationnaires du préavis. Tous les employés ont droit au préavis (art. 63) indépendamment du statut de probation. Une probation contractuelle peut exister, mais elle n'affecte pas les droits légal. **Action :** Ne pas laisser entendre que les employés probationnaires peuvent être congédiés sans préavis.",
      },
      {
        heading: "7. Applicabilité de la non-concurrence (Shafron : pas de modification)",
        body: "Shafron c. KRG Insurance Brokers (Western) Inc., 2009 CSC 6 : les tribunaux de C.-B. ne modifieront pas une clause de non-concurrence excessivement large. Si la clause est déraisonnablement large, la clause entière est nulle. **Action :** Toute non-concurrence doit être soigneusement adaptée aux intérêts légitimes avec des limites raisonnables.",
      },
      {
        heading: "8. Protection des renseignements personnels (LPRP, S.B.C. 2003, ch. 63)",
        body: "La C.-B. est une province « essentiellement similaire », donc la LPRP s'applique à la place de la LPRPDE aux employeurs provinciaux. Les principes de la LPRP exigent : (a) finalité légitime, (b) consentement, (c) minimisation, (d) exactitude, (e) transparence, (f) accès, (g) correction, (h) sécurité, (i) limites de conservation. Les vérifications d'antécédents doivent être justifiées et effectuées avec consentement. **Action :** S'assurer que les procédures de vérification incluent le consentement écrit explicite.",
      },
      {
        heading: "9. Accommodement et droits de la personne (Code des droits de la personne, R.S.B.C. 1996, ch. 210)",
        body: "Le Code protège sur les motifs incluant le handicap, le statut familial, l'identité de genre et la religion. Le test Meiorin s'applique : toute exigence doit être (a) rationnellement liée au poste, (b) adoptée de bonne foi, (c) raisonnablement nécessaire. L'accommodement est requis jusqu'à la contrainte excessive. **Action :** Documenter toute demande d'accommodement et décision; consulter avant de refuser.",
      },
      {
        heading: "10. Aucune équité salariale obligatoire en C.-B.",
        body: "Contrairement à l'Ontario et au Québec, la C.-B. n'a pas de loi obligatoire sur l'équité salariale à partir de 2026. La fixation des salaires est discrétionnaire, mais les réclamations en discrimination sous le Code des droits de la personne sont possibles si le salaire est considérablement inférieur à celui d'employés comparables. **Action :** Conduire un examen informel de l'équité pour éviter les réclamations en discrimination.",
      },
    ] : j.code === "AB" ? [
      {
        heading: "1. Protection des droits légaux (ESC Alb. art. 56)",
        body: "Art. 56 : aucun employeur ne peut priver un employé des droits prévus par la Loi par contrat. Toute stipulation limitant le préavis ou l'indemnité en deçà des minimums légaux est nulle. **Action :** La clause de cessation ne doit pas réduire le préavis en deçà de la formule légale.",
      },
      {
        heading: "2. Préavis de cessation (ESC Alb. art. 56)",
        body: "Art. 56 : le préavis est 1 semaine par année de service accompli (min. 1 semaine, max. 8 semaines). Il n'y a pas d'indemnité de départ légale en Alberta, contrairement à l'Ontario. Le préavis est le principal recours pour cessation sans motif. **Action :** L'accord devrait divulguer le préavis prévu en fonction de l'ancienneté.",
      },
      {
        heading: "3. Salaire final (ESC Alb. art. 77)",
        body: "Art. 77 : tous les salaires (y compris le préavis ou l'indemnité compensatrice) doivent être payés dans les 10 jours suivant la cessation ou à la prochaine date de paie si antérieure. **Action :** S'assurer que la paie traite le salaire final dans le délai légal.",
      },
      {
        heading: "4. Congés (ESC Alb. art. 55)",
        body: "Art. 55 : minimum 2 semaines (4 %) par année. Aucun entitlement supérieur comme en C.-B. ou au Québec. Les congés sont versés en pourcentage du salaire brut. Le report est limité; les employeurs peuvent imposer une règle « ou zéro » si avis écrit est donné 30 jours à l'avance. Les congés non pris sont payables à la cessation. **Action :** Vérifier que la politique des congés énonce le pourcentage (4 % minimum) et les règles de report.",
      },
      {
        heading: "5. Congé de maladie (ESC Alb. art. 46, non payé)",
        body: "L'ESC ne prévoit pas de congé de maladie payé. L'art. 46 prévoit un congé de responsabilités familiales non payé (5 jours/année). Les employeurs offrent généralement des jours de maladie payés par politique. **Action :** Si l'entreprise offre des jours de maladie payés, préciser l'entitlement dans le résumé des avantages.",
      },
      {
        heading: "6. Probation (aucune exemption légale)",
        body: "L'ESC n'aborde pas la probation. La common law peut reconnaître une probation, mais elle n'élimine pas les protections de préavis ou de motif valable. Généralement 3 à 6 mois. **Action :** Énoncer clairement la période de probation; confirmer que le préavis légal s'applique après la probation.",
      },
      {
        heading: "7. Motif juste (common law, test McKinley)",
        body: "Les tribunaux albertains appliquent le test McKinley (2001 CSC 38) : le motif doit être grave, sans rapport avec le rendement, et irrémédiable. Un rendement médiocre seul est insuffisant; la discipline progressive est requise. **Action :** Documenter toutes les mesures disciplinaires; consulter un avocat avant de résilier pour motif.",
      },
      {
        heading: "8. Applicabilité de la non-concurrence (common law, restriction raisonnable)",
        body: "Les tribunaux albertains appliquent généralement les non-competes raisonnables si elles protègent les intérêts commerciaux légitimes et sont raisonnables quant à la durée, le territoire et la portée. Contrairement à la C.-B., les tribunaux albertains peuvent reformer une clause déraisonnable. **Action :** Toute non-concurrence doit être clairement adaptée avec des limites raisonnables.",
      },
      {
        heading: "9. Droits de la personne et accommodement (Loi sur les droits de la personne, R.S.A. 2000, ch. A-14.5)",
        body: "La Loi interdit la discrimination sur les motifs protégés (genre, race, handicap, etc.). Aucune loi obligatoire sur l'équité salariale. Cependant, la discrimination en matière de rémunération fondée sur des motifs protégés est interdite. Le test Meiorin s'applique à toutes les exigences d'emploi. **Action :** Conduire un examen informel de l'équité; s'assurer que les décisions salariales sont documentées et non-discriminatoires.",
      },
      {
        heading: "10. Protection des renseignements personnels (LPRPDE, norme fédérale; pas de PIPA en Alberta)",
        body: "L'Alberta n'a pas de loi provinciale sur la protection des renseignements personnels, donc la LPRPDE fédérale s'applique aux employeurs du secteur privé de compétence provinciale. Les vérifications d'antécédents doivent être effectuées avec consentement, à des fins légitimes, et conformément aux principes de la LPRPDE. **Action :** S'assurer que les procédures de vérification incluent le consentement écrit explicite et une déclaration claire de la finalité.",
      },
    ] : j.code === "FED" ? [
      {
        heading: "1. Congédiement injustifié (CCT art. 230)",
        body: "CCT Partie II art. 230 : après 12 mois de service continu, un employé peut déposer une plainte pour congédiement injustifié. Le CCRI peut ordonner la réintégration, les salaires rétroactifs ou d'autres dommages. C'est un recours expédié, plus rapide que le congédiement injustifié en common law (qui prend des années en cour). **Action :** Reconnaître ce recours; s'assurer que l'accord ne tente pas de le renoncer.",
      },
      {
        heading: "2. Préavis (common law, aucun minimum du CCT)",
        body: "Le CCT ne prescrit pas de délai de préavis légal. Plutôt, le préavis raisonnable en common law s'applique (facteurs Bardal). Le CCRI peut ordonner une indemnisation en tenant lieu. L'accord devrait préciser un délai contractuel ou confirmer qu'il suivra la common law. **Action :** L'art. 10 fait référence à la common law; c'est approprié.",
      },
      {
        heading: "3. Indemnité de départ (aucune du CCT)",
        body: "Le CCT ne prévoit pas d'indemnité de départ distincte du préavis. Le CCRI a le pouvoir discrétionnaire d'ordonner une indemnisation « juste et équitable ». **Action :** Ne pas promettre d'indemnité de départ légale; clarifier que l'indemnisation sera déterminée selon les principes du CCT.",
      },
      {
        heading: "4. Congés (CCT art. 206)",
        body: "Art. 206 : minimum 2 semaines (4 %) par année; 3 semaines après 15 ans. Les congés doivent être pris dans 12 mois; le report peut être limité par accord écrit. Les congés non pris sont payables à la cessation. **Action :** Vérifier que la politique des congés est conforme à l'art. 206.",
      },
      {
        heading: "5. Congé parental (CCT art. 206.2)",
        body: "Art. 206.2 : congé de maternité jusqu'à 17 semaines; congé parental jusqu'à 61 semaines (l'un ou l'autre parent). Les prestations parentales de l'AE fédérale s'exécutent concurremment. **Action :** Diriger les employés vers Service Canada pour les prestations parentales; l'entreprise doit protéger l'emploi pendant le congé légal.",
      },
      {
        heading: "6. Motif juste (common law, test McKinley)",
        body: "CCT art. 230 : le motif valable est déterminé selon la prépondérance des probabilités. Les tribunaux fédéraux appliquent le test McKinley (2001 CSC 38) : l'inconduite doit être grave, sans rapport avec la gestion du rendement, et irrémédiable. Un rendement médiocre simple ne constitue pas un motif. **Action :** Documenter toute mesure disciplinaire; consulter avant de résilier pour motif.",
      },
      {
        heading: "7. Propriété intellectuelle et droits morals",
        body: "Loi sur le droit d'auteur, L.R.C. 1985, chap. C-42, art. 14.1 : les employés ont des droits moraux sauf s'ils les renoncent par écrit. L'art. 9 inclut une renonciation explicite; elle est valide. S'assurer que la clause est limitée au travail effectué dans le cadre de l'emploi. **Action :** Réviser la clause de PI avec un avocat.",
      },
      {
        heading: "8. Applicabilité de la non-concurrence (common law fédérale, raisonnabilité)",
        body: "Les tribunaux fédéraux appliquent généralement les non-competes raisonnables si elles protègent les intérêts commerciaux légitimes (secrets commerciaux, relations client, renseignements confidentiels) et sont raisonnables quant à la durée, le territoire et la portée. Le fardeau incombe à l'employeur de justifier. **Action :** Toute non-concurrence doit être clairement adaptée avec des limites raisonnables.",
      },
      {
        heading: "9. Loi canadienne sur les droits de la personne (L.R.C. 1985, chap. H-6) et accommodement",
        body: "La LCDHP interdit la discrimination sur les motifs protégés (handicap, identité de genre, race, etc.). Le test Meiorin s'applique : toute exigence doit être (a) rationnellement liée, (b) adoptée de bonne foi, (c) raisonnablement nécessaire. L'accommodement est requis jusqu'à la contrainte excessive. **Action :** Documenter les demandes d'accommodement et décisions; consulter avant de refuser.",
      },
      {
        heading: "10. Protection des renseignements personnels (LPRPDE, L.C. 2000, ch. 5)",
        body: "La LPRPDE s'applique aux employeurs du secteur privé de compétence fédérale. Principes : finalité légitime, consentement, minimisation, exactitude, transparence, accès, correction, sécurité, limites de conservation. Les vérifications d'antécédents doivent être justifiées par le poste et effectuées avec consentement. Les demandeurs doivent être avisés si une vérification est menée. **Action :** S'assurer que les procédures de vérification incluent le consentement écrit explicite et une déclaration claire.",
      },
    ] : [
      {
        heading: "1. Normes d'emploi selon le droit applicable",
        body: `L'emploi est régi par le ${j.statuteEN} (${j.statuteCiteEN}). Cet accord est assujetti à tous les minimums légaux.`,
      },
      {
        heading: "2. Cessation pour motif valable",
        body: `Toute cessation pour motif valable doit être conforme à la définition légale du « motif valable » en vertu du ${j.shortEN}.`,
      },
      {
        heading: "3. Préavis de cessation",
        body: `Le préavis minimum est : ${j.noticeFormulaEN}. L'accord reconnaît cette exigence légale.`,
      },
      {
        heading: "4. Congés",
        body: `Entitlement minimum aux congés : ${j.vacMinWeeks} semaines par année (${j.vacMinPct}), selon le ${j.vacStatEN}.`,
      },
      {
        heading: "5. Congé de maladie",
        body: `Le congé de maladie est régi par : ${j.sickLeaveEN}.`,
      },
      {
        heading: "6. Heures supplémentaires",
        body: `Les heures supplémentaires sont rémunérées selon : ${j.overtimeNoteEN}.`,
      },
      {
        heading: "7. Droits de la personne et accommodement",
        body: `L'emploi est assujetti à la législation sur les droits de la personne (${j.hrStatEN}). L'accommodement est requis jusqu'à la contrainte excessive.`,
      },
      {
        heading: "8. Propriété intellectuelle",
        body: "Le travail effectué dans le cadre de l'emploi appartient à l'employeur, sous réserve de la renonciation aux droits moraux dans la mesure permise par la loi.",
      },
      {
        heading: "9. Confidentialité",
        body: "Les renseignements confidentiels doivent être gardés secrets durant et après l'emploi. Cela ne limite pas les droits de dénonciation ou le droit de discuter des salaires/conditions avec les collègues.",
      },
      {
        heading: "10. Accord intégral",
        body: `Cet accord est régi par les lois de la ${j.govLawFR} et est assujetti au ${j.shortFR}.`,
      },
    ],
  };
};
