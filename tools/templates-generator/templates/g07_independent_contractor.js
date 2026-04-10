// G07 — Independent Contractor Agreement (structured to avoid misclassification)
module.exports = function(j) {
  return {
    id: "T07",
    slug: "Independent_Contractor_Agreement",
    kind: "agreement",
    titleEN: "Independent Contractor Agreement",
    titleFR: "Contrat d'entrepreneur indépendant",

  bodyEN: [
    { type: "h1", text: "Independent Contractor Agreement", align: "center" },
    { type: "p", text: "This Independent Contractor Agreement (the **Agreement**) is made on **{{agreement_date}}**." },

    { type: "h2", text: "Between" },
    { type: "p", text: "**{{employer_legal_name}}**, with its principal office at **{{employer_address}}** (the **Client**)," },
    { type: "p", text: "— and —" },
    { type: "p", text: "**{{contractor_legal_name}}**, of **{{contractor_address}}** (the **Contractor**)." },

    { type: "h2", text: "Framing" },
    { type: "p", text: "This Agreement sets out the terms under which the Contractor will provide services to the Client. We want to be upfront about one important thing: this is a business-to-business relationship, not employment. We have drafted it that way intentionally, and we expect both Parties to behave consistently with that. If how we actually work together ever starts to look more like employment — because of direction, control, integration, or any of the factors in *671122 Ontario Ltd. v. Sagaz Industries Canada Inc.*, 2001 SCC 59 — we will have a conversation and, if necessary, restructure the relationship rather than leave it misclassified." },

    { type: "h2", text: "1. Services" },
    { type: "p", text: "The Contractor will provide the services described in Schedule A — Statement of Work (the **Services**). The Contractor decides, within reason, how and where to perform the Services, subject only to any schedule, deliverables, quality standards or security requirements set out in Schedule A." },

    { type: "h2", text: "2. Independent status" },
    { type: "p", text: "The Contractor is an independent business, not an employee, partner, agent or joint venturer of the Client. The Contractor:" },
    { type: "bullet", text: "is free to accept work from other clients, subject only to the confidentiality and conflict-of-interest provisions in this Agreement;" },
    { type: "bullet", text: "provides its own tools, equipment and workspace, except any items the Client specifically agrees to supply in Schedule A;" },
    { type: "bullet", text: "is responsible for its own taxes, CPP/QPP, EI (if applicable), HST/GST/QST registration and remittance, and its own insurance (including commercial general liability and, where applicable, professional liability);" },
    { type: "bullet", text: "may subcontract the Services only with the Client's prior written consent, and remains fully responsible for its subcontractors;" },
    { type: "bullet", text: "is not entitled to employee benefits, vacation pay, overtime, statutory holiday pay, or termination or severance entitlements under the employment standards legislation that applies to the Client." },
    { type: "p", text: "Nothing in this Agreement makes the Contractor a \"dependent contractor\" under the line of authority that includes *McKee v. Reid's Heritage Homes Ltd.*, 2009 ONCA 916. The Parties have structured the relationship deliberately to avoid that classification." },

    { type: "h2", text: "3. Fees and expenses" },
    { type: "p", text: "The Client will pay the Contractor **{{contractor_fee_description}}**, plus applicable HST/GST/QST, against valid invoices submitted **{{invoice_frequency}}** to **{{ap_contact_email}}**. Undisputed invoices are payable within **{{payment_terms_days}}** days. Reasonable, pre-approved expenses are reimbursable upon production of receipts." },

    { type: "h2", text: "4. Term and termination" },
    { type: "p", text: "This Agreement begins on **{{services_start_date}}** and continues until **{{services_end_date}}**, unless ended earlier in accordance with this section. Either Party may end this Agreement on **{{contractor_notice_days}}** days' written notice, with or without reason. Either Party may end this Agreement immediately on written notice if the other Party materially breaches the Agreement and fails to cure the breach within **{{cure_period_days}}** days, or becomes insolvent. On termination, the Client will pay for Services satisfactorily completed up to the termination date." },

    { type: "h2", text: "5. Confidentiality" },
    { type: "p", text: "The Contractor will keep the Client's Confidential Information confidential during and after the term of this Agreement, on the terms of our standard Confidentiality Agreement, which is incorporated by reference. Confidential Information is broadly defined and includes client, personnel, technology and business information. This obligation survives the end of this Agreement." },

    { type: "h2", text: "6. Intellectual property" },
    { type: "p", text: "All deliverables created by the Contractor specifically for the Client under this Agreement (the **Deliverables**) are a work made for hire to the fullest extent permitted by law, and otherwise are assigned to the Client upon creation, including copyright and all other IP rights. The Contractor waives all moral rights in the Deliverables to the extent permitted by law. The Contractor retains ownership of any pre-existing materials, tools and know-how used to create the Deliverables, and grants the Client a perpetual, worldwide, royalty-free licence to use those embedded materials as part of the Deliverables." },

    { type: "h2", text: "7. Privacy and data" },
    { type: "p", text: "If the Services involve personal information, the Contractor will handle it in accordance with the **Personal Information Protection and Electronic Documents Act**, S.C. 2000, c. 5 and any applicable provincial privacy law (including Québec's Law 25 — **An Act to modernize legislative provisions as regards the protection of personal information**, S.Q. 2021, c. 25), use it only for the Services, protect it with reasonable safeguards, and return or destroy it at the end of the Agreement. The Contractor will promptly report any privacy incident to the Client." },

    { type: "h2", text: "8. Representations and warranties" },
    { type: "p", text: "The Contractor represents and warrants that: (a) it has the right and authority to enter into this Agreement; (b) it will perform the Services in a professional, workmanlike manner consistent with industry standards; (c) the Deliverables will not infringe any third-party IP rights; and (d) the Contractor will comply with all applicable laws, including health and safety, anti-bribery, anti-spam and human rights laws." },

    { type: "h2", text: "9. Indemnity and limitation of liability" },
    { type: "p", text: "Each Party will indemnify the other for damages arising from the indemnifying Party's breach of this Agreement, gross negligence or wilful misconduct. Neither Party is liable to the other for indirect, consequential, special or punitive damages, and each Party's total liability for direct damages under this Agreement is capped at the fees paid or payable under this Agreement in the **{{liability_cap_period}}** preceding the event giving rise to the claim. This cap does not apply to the Contractor's confidentiality, IP assignment, privacy, or indemnity obligations, or to a Party's gross negligence or wilful misconduct." },

    { type: "h2", text: "10. General" },
    { type: "p", text: "This Agreement is governed by the laws of the Province of **" + j.govLawEN + "**. It is the entire agreement between the Parties about its subject matter and replaces any earlier agreement. It may only be amended in writing signed by both Parties. If any part is found unenforceable, the rest continues in full force. Neither Party may assign this Agreement without the other's prior written consent, except to a successor of all or substantially all of its business. The Contractor confirms that it has had the opportunity to obtain independent legal and tax advice before signing." },

    { type: "p", text: "By signing below, the Parties confirm they have read and accept the terms of this Agreement." },
    { type: "spacer" },
    { type: "sig", leftLabel: "CLIENT", rightLabel: "CONTRACTOR",
      rightName: "contractor_legal_name", rightTitle: "contractor_signer_title" },
  ],

  bodyFR: [
    { type: "h1", text: "Contrat d'entrepreneur indépendant", align: "center" },
    { type: "p", text: "Le présent contrat d'entrepreneur indépendant (le **Contrat**) est conclu le **{{agreement_date}}**." },

    { type: "h2", text: "Entre" },
    { type: "p", text: "**{{employer_legal_name}}**, ayant son bureau principal au **{{employer_address}}** (le **Client**)," },
    { type: "p", text: "— et —" },
    { type: "p", text: "**{{contractor_legal_name}}**, de **{{contractor_address}}** (l'**Entrepreneur**)." },

    { type: "h2", text: "Cadre" },
    { type: "p", text: "Le présent Contrat énonce les modalités selon lesquelles l'Entrepreneur fournira des services au Client. Une chose doit être claire : il s'agit d'une relation d'affaires entre entreprises, pas d'un lien d'emploi. Nous l'avons rédigé ainsi volontairement, et nous nous attendons à ce que les deux Parties se comportent en cohérence. Si la manière dont nous travaillons en réalité commence à ressembler à un lien d'emploi — en raison de la direction, du contrôle, de l'intégration ou de l'un des facteurs énoncés dans *671122 Ontario Ltd. c. Sagaz Industries Canada Inc.*, 2001 CSC 59 — nous en discuterons et, au besoin, restructurerons la relation plutôt que de la laisser mal classée." },

    { type: "h2", text: "1. Services" },
    { type: "p", text: "L'Entrepreneur fournira les services décrits à l'annexe A — Énoncé des travaux (les **Services**). L'Entrepreneur décide, dans une mesure raisonnable, de la manière et du lieu où il exécute les Services, sous réserve des échéances, livrables, normes de qualité ou exigences de sécurité prévus à l'annexe A." },

    { type: "h2", text: "2. Statut indépendant" },
    { type: "p", text: "L'Entrepreneur est une entreprise indépendante, non un(e) salarié(e), associé(e), mandataire ou coentrepreneur(e) du Client. L'Entrepreneur :" },
    { type: "bullet", text: "est libre d'accepter des mandats d'autres clients, sous réserve des clauses de confidentialité et de conflit d'intérêts;" },
    { type: "bullet", text: "fournit ses propres outils, équipements et espace de travail, sauf éléments que le Client convient de fournir à l'annexe A;" },
    { type: "bullet", text: "est responsable de ses propres taxes, RPC/RRQ, AE (le cas échéant), inscription et remise de TPS/TVQ/TVH, et de ses propres assurances (responsabilité civile générale et, le cas échéant, responsabilité professionnelle);" },
    { type: "bullet", text: "ne peut sous-traiter les Services qu'avec l'accord écrit préalable du Client et demeure pleinement responsable de ses sous-traitants;" },
    { type: "bullet", text: "n'a pas droit aux avantages sociaux, à la paie de vacances, aux heures supplémentaires, à l'indemnité des jours fériés, ni au préavis ou à l'indemnité de départ prévus par la législation sur les normes du travail applicable au Client." },
    { type: "p", text: "Rien dans le présent Contrat ne confère à l'Entrepreneur le statut d'« entrepreneur dépendant » au sens de la jurisprudence comprenant *McKee c. Reid's Heritage Homes Ltd.*, 2009 ONCA 916. Les Parties ont structuré délibérément la relation pour éviter cette qualification." },

    { type: "h2", text: "3. Honoraires et dépenses" },
    { type: "p", text: "Le Client paiera à l'Entrepreneur **{{contractor_fee_description}}**, plus les taxes applicables, sur présentation de factures valides envoyées **{{invoice_frequency}}** à **{{ap_contact_email}}**. Les factures non contestées sont payables dans un délai de **{{payment_terms_days}}** jours. Les dépenses raisonnables préapprouvées sont remboursables sur présentation de pièces justificatives." },

    { type: "h2", text: "4. Durée et résiliation" },
    { type: "p", text: "Le Contrat commence le **{{services_start_date}}** et se poursuit jusqu'au **{{services_end_date}}**, à moins d'être résilié conformément au présent article. Chaque Partie peut résilier moyennant un préavis écrit de **{{contractor_notice_days}}** jours, avec ou sans motif. Chaque Partie peut résilier immédiatement, par avis écrit, si l'autre Partie manque de manière importante à ses obligations et ne corrige pas le manquement dans les **{{cure_period_days}}** jours, ou devient insolvable. À la résiliation, le Client paiera les Services exécutés de manière satisfaisante jusqu'à la date de résiliation." },

    { type: "h2", text: "5. Confidentialité" },
    { type: "p", text: "L'Entrepreneur préservera la confidentialité des renseignements confidentiels du Client pendant et après la durée du Contrat, selon notre entente de confidentialité standard, intégrée par renvoi. Les renseignements confidentiels sont définis de façon large et comprennent les renseignements sur la clientèle, le personnel, la technologie et les affaires. Cette obligation survit à la fin du Contrat." },

    { type: "h2", text: "6. Propriété intellectuelle" },
    { type: "p", text: "Tous les livrables créés par l'Entrepreneur spécifiquement pour le Client en vertu du Contrat (les **Livrables**) constituent une œuvre réalisée sur commande dans toute la mesure permise par la loi, et sont autrement cédés au Client dès leur création, y compris le droit d'auteur et tous autres droits de PI. L'Entrepreneur renonce à ses droits moraux sur les Livrables dans la mesure permise par la loi. L'Entrepreneur conserve la propriété des éléments préexistants, outils et savoir-faire utilisés pour créer les Livrables, et accorde au Client une licence perpétuelle, mondiale et libre de redevances pour les utiliser en tant qu'éléments des Livrables." },

    { type: "h2", text: "7. Vie privée et données" },
    { type: "p", text: "Si les Services impliquent des renseignements personnels, l'Entrepreneur les traitera conformément à la **Loi sur la protection des renseignements personnels et les documents électroniques**, L.C. 2000, ch. 5, et à toute loi provinciale applicable (dont la **Loi modernisant des dispositions législatives en matière de protection des renseignements personnels**, L.Q. 2021, ch. 25 (« Loi 25 »), au Québec), ne les utilisera qu'aux fins des Services, les protégera par des mesures raisonnables, et les retournera ou les détruira à la fin du Contrat. Il signalera promptement tout incident de confidentialité au Client." },

    { type: "h2", text: "8. Déclarations et garanties" },
    { type: "p", text: "L'Entrepreneur déclare et garantit que : a) il a le droit et le pouvoir de conclure le Contrat; b) il exécutera les Services de manière professionnelle et compétente, selon les normes de l'industrie; c) les Livrables ne porteront atteinte à aucun droit de PI de tiers; et d) il se conformera à toutes les lois applicables, notamment celles en matière de santé et sécurité, de lutte contre la corruption, de pourriel et de droits de la personne." },

    { type: "h2", text: "9. Indemnisation et limitation de responsabilité" },
    { type: "p", text: "Chaque Partie indemnisera l'autre pour les dommages découlant de son manquement, de sa négligence grave ou de sa faute intentionnelle. Aucune Partie n'est responsable envers l'autre des dommages indirects, consécutifs, spéciaux ou punitifs, et la responsabilité totale de chaque Partie pour les dommages directs est plafonnée aux honoraires payés ou exigibles au cours des **{{liability_cap_period}}** précédant l'événement à l'origine de la réclamation. Ce plafond ne s'applique pas aux obligations de confidentialité, de PI, de vie privée ou d'indemnisation de l'Entrepreneur, ni à la négligence grave ou à la faute intentionnelle d'une Partie." },

    { type: "h2", text: "10. Dispositions générales" },
    { type: "p", text: "Le présent Contrat est régi par les lois de la province de **" + j.govLawFR + "**. Il constitue l'entente complète des Parties et remplace toute entente antérieure. Il ne peut être modifié que par écrit, signé par les deux Parties. Si une clause est jugée inapplicable, le reste demeure en vigueur. Aucune Partie ne peut céder le Contrat sans l'accord écrit préalable de l'autre, sauf à un successeur de la totalité ou de la quasi-totalité de son entreprise. L'Entrepreneur confirme avoir eu l'occasion d'obtenir un avis juridique et fiscal indépendant avant de signer." },

    { type: "p", text: "En signant ci-dessous, les Parties confirment avoir lu et accepter les modalités du présent Contrat." },
    { type: "spacer" },
    { type: "sig", leftLabel: "CLIENT", rightLabel: "ENTREPRENEUR",
      rightName: "contractor_legal_name", rightTitle: "contractor_signer_title" },
  ],

  legalNotesEN: j.code === "ON" ? [
    {
      heading: "1. Sagaz / McKee — misclassification factors (ON-specific)",
      body: "**671122 Ontario Ltd. v. Sagaz Industries Canada Inc.**, 2001 SCC 59: central question is whether the contractor operates as a business on their own account. Factors: control over work, tool ownership, profit/loss risk, business integration. **McKee v. Reid's Heritage Homes Ltd.**, 2009 ONCA 916: the 'independent contractor' label is not determinative; courts examine economic reality. **Action:** Annually audit the working relationship against Sagaz/McKee factors to confirm independent status.",
    },
    {
      heading: "2. CRA RC4110 ruling — CPP/EI and T4 slip exposure",
      body: "If CRA reclassifies a contractor as an employee, the employer is liable for: (a) employee CPP/EI contributions (typically not collected); (b) employer CPP/EI contributions; (c) interest and penalties at 50%+ annually; (d) failure to remit payroll taxes. CRA reassessment period is 3 years (longer for fraud or intentional misrepresentation). **Action:** For long-term or high-value relationships, request a CRA worker status ruling (RC4110 form) before or during the engagement.",
    },
    {
      heading: "3. EI Regulations s. 5(1)(d) — deemed insurable employment",
      body: "The **Employment Insurance Act**, S.C. 1996, c. 23, and **Employment Insurance Regulations**, SOR/96-332, deem certain arrangements 'insurable employment' regardless of contract label. This includes: (a) where worker and employer are not at arm's length; or (b) where employment conditions are substantially similar to employee conditions. CRA may retroactively assess EI premiums.",
    },
    {
      heading: "4. Ontario LRA s. 1(1) — dependent contractor risk",
      body: "The **Labour Relations Act, 1995** (Ontario), s. 1(1), defines 'employee' to include a dependent contractor — a person economically dependent on one client, performing duties more like an employee than an independent business operator. Dependent contractors have union organizing and collective bargaining rights under the LRA. If the contractor earns >80% of income from the Client, dependent status may apply.",
    },
    {
      heading: "5. Excise Tax Act s. 166 — GST/HST registration threshold",
      body: "Any person earning >$30,000 in taxable supplies in a calendar quarter or in 4 consecutive quarters must register for GST/HST under the **Excise Tax Act**, R.S.C. 1985, c. E-15, s. 166. If the contractor is not registered but the Client pays GST/HST on their behalf, this is an indicator of employee status to CRA. **Action:** Specify GST/HST treatment (inclusive/exclusive) in the agreement; confirm contractor registration status annually.",
    },
    {
      heading: "6. Ontario ESA s. 67.2 — non-compete applies to employees, not IC",
      body: "Ontario **ESA s. 67.2** prohibits non-competes for non-executive employees (as of Oct. 25, 2021), but applies only to employees, not independent contractors. If the contractor is reclassified as an employee or dependent contractor post-dispute, any non-compete may become void under s. 67.2. Restrictive covenants in IC agreements are governed by Elsley/Shafron reasonableness, not s. 67.2.",
    },
  ] : j.code === "QC" ? [
    {
      heading: "1. Sagaz / McKee apply in Quebec — economic reality governs",
      body: "**671122 Ontario Ltd. v. Sagaz Industries Canada Inc.**, 2001 SCC 59, applies in Quebec, including the Sagaz multi-factor test. **McKee v. Reid's Heritage Homes Ltd.**, 2009 ONCA 916, is persuasive. The label 'independent contractor' is not binding; courts examine control, tool ownership, profit/loss, integration. **Action:** Structurally ensure the contractor operates as a true business on their own account.",
    },
    {
      heading: "2. ARLS art. 1 — 'salarié' definition (determinative in QC)",
      body: "Quebec's **Act Respecting Labour Standards**, CQLR c N-1.1, art. 1, defines 'salarié' (employee) broadly. The CNESST applies ARLS broadly in practice. Even if labeled a contractor, if the working reality resembles employment (control, integration, economic dependence), the CNESST may reclassify and award back wages, vacation, severance under ARLS. **Action:** Clearly document independent business operation to avoid CNESST reclassification.",
    },
    {
      heading: "3. Civil Code art. 2085 — employment vs. service contract distinction",
      body: "The Quebec **Civil Code**, art. 2085, distinguishes employment (salariat) from a service contract (contrat de service). An employment contract involves subordination and direction by the employer; a service contract does not. CNESST and Quebec courts apply this distinction. If the relationship shows subordination (work schedule, direction, control), it may be reclassified as employment. **Action:** Structure the relationship to minimize direction and control; allow independent scheduling.",
    },
    {
      heading: "4. CNESST and RQAP — misclassification penalties",
      body: "If the CNESST reclassifies a contractor as an employee, the Client is liable for: (a) back wages under ARLS minimums; (b) unpaid vacation; (c) employer CPP/QPP (RPC/RRQ) contributions retroactively; (d) RQAP (Québec Parental Insurance Plan) contributions. The **Régime québécois d'assurance parentale** (RQAP) is a statutory obligation, and misclassification exposes the employer to retroactive premiums and interest.",
    },
    {
      heading: "5. GST/HST and TVQ thresholds — federal and Quebec",
      body: "For GST/HST, the threshold is $30,000 in taxable supplies per **Excise Tax Act** s. 166. For TVQ (Quebec sales tax), the threshold is $30,000 per the **Act respecting the Quebec Sales Tax**. If the contractor is not registered but the Client remits on their behalf, this is an employee-like indicator. **Action:** Confirm contractor registration; document GST/HST/TVQ treatment (inclusive/exclusive).",
    },
    {
      heading: "6. Quebec restrictive covenants — Civil Code art. 2089, Charter art. 46",
      body: "Restrictive covenants in Quebec (including non-competes in IC agreements) are subject to **Civil Code** art. 2089 (good faith) and Quebec's **Charter of Human Rights and Freedoms**, art. 46 (right to gainful work). Even for contractors, overly broad non-competes may be unenforceable. Combined with Shafron (no blue-pencilling), covenants must be narrow or risk being entirely void.",
    },
  ] : j.code === "BC" ? [
    {
      heading: "1. Sagaz / McKee — BC courts apply the multi-factor test",
      body: "**671122 Ontario Ltd. v. Sagaz Industries Canada Inc.**, 2001 SCC 59, is binding in BC. **McKee v. Reid's Heritage Homes Ltd.**, 2009 ONCA 916, is persuasive. BC courts examine: control, tool ownership, profit/loss opportunity, business integration, and right to subcontract. The contractor label is not determinative; economic reality governs. **Action:** Audit the relationship regularly against Sagaz/McKee factors.",
    },
    {
      heading: "2. BC LRA — dependent contractor definition",
      body: "The BC **Labour Relations Act**, R.S.B.C. 1996, c. 244, defines 'employee' to include dependent contractors in certain contexts. If a contractor is economically dependent on one client (>80% income threshold), they may have organizing rights. **Action:** Diversify the contractor's client base or document independent business operations to avoid dependent contractor classification.",
    },
    {
      heading: "3. WorkSafeBC — contractor coverage for misclassified workers",
      body: "Under the **Workers Compensation Act**, R.S.B.C. 2019, c. 1, if a 'contractor' is actually misclassified and subject to WorkSafeBC coverage, the employer is liable for premiums retroactively. WorkSafeBC may find that a misclassified worker is a 'worker' under the Act despite the contractor label. **Action:** Ensure the contractor maintains their own independent WorkSafeBC or equivalent coverage.",
    },
    {
      heading: "4. BC PIPA — contractor privacy obligations",
      body: "If the contractor handles personal information, BC's **Personal Information Protection Act**, S.B.C. 2003, c. 63 (PIPA), applies. The contractor agreement should explicitly require PIPA compliance. A contractor found to be an employee post-hoc may have different privacy obligations under employment law. **Action:** Ensure section 7 (Privacy) clearly references PIPA.",
    },
    {
      heading: "5. GST/HST threshold — $30,000 per Excise Tax Act s. 166",
      body: "The **Excise Tax Act** s. 166 threshold ($30,000) applies in BC. If the contractor is not registered for GST/HST but the Client remits on their behalf, this is an employee-status indicator to CRA. **Action:** Confirm contractor GST/HST registration; specify treatment in the agreement (inclusive/exclusive).",
    },
    {
      heading: "6. Shafron and Elsley — restrictive covenants in BC IC agreements",
      body: "**Shafron v. KRG Insurance Brokers (Western) Inc.**, 2009 SCC 6, applies in BC: courts will not blue-pencil an overly broad covenant; the entire clause fails if unreasonable. Restrictive covenants in IC agreements are subject to the same Elsley reasonableness test as in employment agreements. **Action:** Draft covenants narrowly; avoid 'and/or' language that broadens scope.",
    },
  ] : j.code === "AB" ? [
    {
      heading: "1. Sagaz / McKee — Alberta courts apply the test",
      body: "**671122 Ontario Ltd. v. Sagaz Industries Canada Inc.**, 2001 SCC 59, is binding in Alberta. **McKee v. Reid's Heritage Homes Ltd.**, 2009 ONCA 916, is persuasive. Alberta courts examine the multi-factor test: control, tool ownership, profit/loss, integration, right to subcontract. The contractor label is not determinative. **Action:** Annually audit the relationship against Sagaz/McKee factors to ensure independent status is maintained.",
    },
    {
      heading: "2. WCB Alberta — contractor coverage and misclassification risk",
      body: "The **Workers Compensation Act** (Alberta) applies broadly to workers, even if labeled contractors. If WCB audits and finds a 'contractor' is actually operating like an employee, the employer is liable for retroactive premiums and penalties. **Action:** Ensure the contractor maintains independent WCB coverage (contractor permit) or is clearly operating a separate business.",
    },
    {
      heading: "3. Alberta ESC — definition of employee and employer",
      body: "The **Employment Standards Code**, R.S.A. 2000, c. E-9, defines 'employee' and 'employer' broadly. While no specific 'dependent contractor' statute exists in Alberta, the ESC may be applied to misclassified workers. If a contractor is found to be an employee, they may be owed minimum wage, vacation, and severance under ESC minimums. **Action:** Maintain clear business-to-business relationship characteristics.",
    },
    {
      heading: "4. PIPA — Alberta's substantially similar private-sector law",
      body: "Alberta's **Personal Information Protection Act**, S.A. 2003, c. P-6.5, applies to private-sector employers and contractors. If the contractor handles personal information, section 7 should require PIPA compliance. A contractor reclassified as an employee may have different privacy obligations. **Action:** Require explicit PIPA compliance in section 7 (Privacy and Data).",
    },
    {
      heading: "5. GST/HST registration threshold — $30,000 (Excise Tax Act s. 166)",
      body: "The **Excise Tax Act** s. 166 threshold ($30,000 in taxable supplies) applies in Alberta. If the contractor is not registered but the Client remits GST/HST on their behalf, this is an employee-status indicator to CRA. **Action:** Confirm contractor GST/HST registration; specify treatment in the agreement.",
    },
    {
      heading: "6. Elsley / Shafron — restrictive covenants in Alberta IC agreements",
      body: "**Elsley v. J.G. Collins Insurance Agencies Ltd.**, [1978] 2 SCR 916, and **Shafron v. KRG Insurance Brokers (Western) Inc.**, 2009 SCC 6, apply in Alberta. Alberta courts are somewhat more willing to enforce restrictive covenants if reasonably scoped, but will not blue-pencil an overbroad clause. **Action:** Draft covenants narrowly; avoid overly broad language.",
    },
  ] : j.code === "FED" ? [
    {
      heading: "1. Sagaz / McKee — federal courts apply the test",
      body: "**671122 Ontario Ltd. v. Sagaz Industries Canada Inc.**, 2001 SCC 59, and **McKee v. Reid's Heritage Homes Ltd.**, 2009 ONCA 916, apply in federal jurisdiction. The multi-factor Sagaz test (control, tools, profit/loss, integration) determines status. The contractor label is not determinative; economic reality governs. **Action:** Annually audit the relationship against Sagaz/McKee factors.",
    },
    {
      heading: "2. Canada Labour Code s. 3 — dependent contractor definition",
      body: "The **Canada Labour Code**, R.S.C. 1985, c. L-2, Part I, s. 3, explicitly defines 'dependent contractor' and 'employee'. A dependent contractor is a person in a position of economic dependence who performs duties more like an employee than an independent contractor. If this definition applies, the worker has statutory entitlements under the CLC. **Action:** Ensure the contractor is structurally and economically independent.",
    },
    {
      heading: "3. CLC Part II s. 240 — unjust dismissal (12+ months service)",
      body: "**Canada Labour Code**, Part II, s. 240: employees with 12+ months continuous service can challenge a dismissal to an adjudicator. If a contractor is reclassified as an employee, this right applies retroactively. If the Client terminates the contractor agreement, the contractor can claim unjust dismissal and seek reinstatement or damages. **Action:** Ensure the contractor is truly independent to avoid this exposure.",
    },
    {
      heading: "4. CRA RC4110 — federal worker status ruling",
      body: "For federally regulated employers, CRA provides RC4110 (Worker Status) rulings. If CRA reclassifies a contractor as an employee, the employer is liable for: (a) employee CPP contributions; (b) employer CPP contributions; (c) interest and penalties; (d) potential EI premiums. **Action:** Request RC4110 ruling for long-term or high-value engagements.",
    },
    {
      heading: "5. Excise Tax Act s. 166 — GST/HST threshold ($30,000)",
      body: "The **Excise Tax Act**, R.S.C. 1985, c. E-15, s. 166, threshold ($30,000 in taxable supplies) applies federally. If the contractor is not registered but the Client remits on their behalf, CRA views this as an employee-like relationship indicator. **Action:** Confirm contractor GST/HST registration; document treatment.",
    },
    {
      heading: "6. Shafron and Elsley — restrictive covenants in federal IC agreements",
      body: "**Shafron v. KRG Insurance Brokers (Western) Inc.**, 2009 SCC 6, and **Elsley v. J.G. Collins Insurance Agencies Ltd.**, [1978] 2 SCR 916, apply federally. Restrictive covenants in IC agreements must be reasonable or the clause is entirely void; no blue-pencilling. **Action:** Draft covenants narrowly; limit duration, territory, and activity scope.",
    },
  ] : [
    {
      heading: "1. Sagaz / McKee — misclassification test applies nationally",
      body: "**671122 Ontario Ltd. v. Sagaz Industries Canada Inc.**, 2001 SCC 59, and **McKee v. Reid's Heritage Homes Ltd.**, 2009 ONCA 916, are binding across Canada. Courts examine: control, tool ownership, profit/loss opportunity, integration, and right to subcontract. The 'independent contractor' label is not determinative; economic reality governs.",
    },
    {
      heading: "2. CRA worker classification — CPP/EI and tax exposure",
      body: "If CRA reclassifies a contractor as an employee, the employer is liable for: (a) employee CPP contributions (typically not collected); (b) employer CPP contributions; (c) interest and penalties; (d) payroll taxes. Reassessment period is 3 years. Request RC4110 (worker status ruling) for long-term or high-value relationships.",
    },
    {
      heading: "3. GST/HST registration threshold — $30,000",
      body: "Under the **Excise Tax Act** s. 166, any person earning >$30,000 in taxable supplies must register for GST/HST. If the contractor is not registered but the Client remits on their behalf, this is an employee-status indicator to CRA. **Action:** Confirm contractor registration; specify GST/HST treatment (inclusive/exclusive) in the agreement.",
    },
    {
      heading: "4. Deemed insurable employment — EI Regulations",
      body: "The **Employment Insurance Regulations**, SOR/96-332, deem certain arrangements 'insurable employment' regardless of contract label, including where the worker and employer are not at arm's length or where employment conditions are substantially similar to employee conditions. This can trigger unexpected EI obligations.",
    },
    {
      heading: "5. Dependent contractor risk — jurisdiction-specific",
      body: "Some provincial and federal legislation (Ontario LRA, CLC Part I s. 3) recognize 'dependent contractors' — workers economically dependent on one client who may have organizing or statutory rights. Structure the relationship to ensure the contractor is truly independent and operates for multiple clients.",
    },
    {
      heading: "6. Restrictive covenants — Shafron and Elsley apply",
      body: "**Shafron v. KRG Insurance Brokers (Western) Inc.**, 2009 SCC 6, and **Elsley v. J.G. Collins Insurance Agencies Ltd.**, [1978] 2 SCR 916, govern restrictive covenants in IC agreements. Courts will not blue-pencil an overly broad clause; if unreasonable, the entire clause is void. Draft narrowly.",
    },
  ],
  legalNotesFR: j.code === "ON" ? [
    {
      heading: "1. Sagaz / McKee — facteurs de mauvaise classification (spécifique à ON)",
      body: "**671122 Ontario Ltd. c. Sagaz Industries Canada Inc.**, 2001 CSC 59 : la question centrale est de savoir si le sous-traitant exerce son activité à son propre compte. Facteurs : contrôle, propriété des outils, risque de profit/perte, intégration. **McKee c. Reid's Heritage Homes Ltd.**, 2009 ONCA 916 : l'étiquette « sous-traitant indépendant » n'est pas déterminante; les tribunaux examinent la réalité économique. **Action :** Évaluer annuellement la relation par rapport aux facteurs Sagaz/McKee.",
    },
    {
      heading: "2. Décision RC4110 de l'ARC — exposition au RPC/AE et feuille T4",
      body: "Si l'ARC reclassifie un sous-traitant comme salarié(e), l'employeur est responsable de : (a) les cotisations au RPC/AE du salarié (généralement non prélevées); (b) les cotisations de l'employeur au RPC/AE; (c) intérêts et pénalités (50%+ annuellement); (d) taxes de la paie. Le délai de nouvelle cotisation est 3 ans (plus long en cas de fraude). **Action :** Demander une décision RC4110 pour les engagements de longue durée ou de grande valeur.",
    },
    {
      heading: "3. Règlement sur l'AE art. 5(1)(d) — emploi présumé assurable",
      body: "La *Loi sur l'assurance-emploi* et le **Règlement sur l'assurance-emploi** (DORS/96-332) réputent certains arrangements « emplois assurables » indépendamment de l'étiquette contractuelle : (a) entre non-liés n'étant pas à distance de longueur de bras; (b) lorsque les conditions d'emploi sont substantiellement similaires à celles d'un salarié. L'ARC peut évaluer rétroactivement les primes d'AE.",
    },
    {
      heading: "4. Loi sur les relations de travail de l'Ontario art. 1(1) — entrepreneur dépendant",
      body: "La **Loi de 1995 sur les relations de travail** (Ontario), art. 1(1), définit l'« employé(e) » pour inclure l'entrepreneur dépendant — une personne économiquement dépendante d'un client, exécutant des tâches davantage semblables à l'emploi. Les entrepreneurs dépendants ont des droits d'organisation et de négociation collective. Si le sous-traitant tire >80 % de revenus du Client, le statut peut s'appliquer.",
    },
    {
      heading: "5. Loi sur la taxe d'accise art. 166 — seuil TPS/TVH de 30 000 $",
      body: "Toute personne gagnant >30 000 $ en fournitures taxables par trimestre doit s'inscrire à la TPS/TVH en vertu de la *Loi sur la taxe d'accise*, art. 166. Si le sous-traitant n'est pas inscrit mais le Client verse la taxe en son nom, c'est un indicateur de statut d'employé(e) à l'ARC. **Action :** Confirmer l'inscription du sous-traitant; spécifier le traitement TPS/TVH (inclusif/exclusif).",
    },
    {
      heading: "6. LNE art. 67.2 de l'Ontario — non-concurrence s'applique aux salariés, pas aux sous-traitants",
      body: "L'art. 67.2 de la **LNE** ontarienne interdit la non-concurrence pour les salariés non-cadres (depuis le 25 oct. 2021), mais s'applique seulement aux salariés, pas aux sous-traitants indépendants. Si le sous-traitant est reclassifié comme salarié ou entrepreneur dépendant après un différend, toute clause de non-concurrence peut devenir nulle en vertu de l'art. 67.2. Les clauses restrictives en IC sont régies par le test de raisonnabilité Elsley/Shafron.",
    },
  ] : j.code === "QC" ? [
    {
      heading: "1. Sagaz / McKee s'appliquent au Québec — la réalité économique prédomine",
      body: "**671122 Ontario Ltd. c. Sagaz Industries Canada Inc.**, 2001 CSC 59, s'applique au Québec, incluant le test multifactoriel Sagaz. **McKee c. Reid's Heritage Homes Ltd.**, 2009 ONCA 916, est persuasif. L'étiquette « entrepreneur indépendant » n'est pas contraignante; les tribunaux examinent contrôle, propriété d'outils, profit/perte, intégration. **Action :** Structurally ensure the contractor operates as a true business.",
    },
    {
      heading: "2. LNT art. 1 — définition de « salarié(e) » (déterminante au QC)",
      body: "La **Loi sur les normes du travail**, RLRQ c N-1.1, art. 1, définit largement le terme « salarié(e) ». La CNESST applique la LNT largement en pratique. Même si étiqueté sous-traitant, si la réalité ressemble à l'emploi (contrôle, intégration, dépendance économique), la CNESST peut reclassifier et ordonner dommages. **Action :** Documenter l'exploitation indépendante pour éviter la reclassification.",
    },
    {
      heading: "3. Code civil art. 2085 — distinction emploi / contrat de services",
      body: "Le **Code civil** du Québec, art. 2085, distingue l'emploi (salariat) du contrat de services. L'emploi implique la subordination et la direction par l'employeur; le contrat de services ne l'implique pas. Si la relation montre la subordination (horaire, direction, contrôle), elle peut être reclassifiée. **Action :** Structurer pour minimiser direction et contrôle; permettre l'ordonnancement indépendant.",
    },
    {
      heading: "4. CNESST et RQAP — conséquences de la mauvaise classification",
      body: "Si la CNESST reclassifie un sous-traitant comme salarié(e), le Client est responsable de : (a) salaires arrérés selon les minimums de la LNT; (b) vacances impayées; (c) cotisations patronales au RPC/RRQ rétroactivement; (d) contributions à la RQAP. Le **Régime québécois d'assurance parentale** (RQAP) est obligatoire, et la mauvaise classification expose l'employeur à des cotisations rétroactives et intérêts.",
    },
    {
      heading: "5. Seuils TPS/TVH et TVQ — fédéral et Québec",
      body: "Pour TPS/TVH, le seuil est 30 000 $ par la *Loi sur la taxe d'accise*, art. 166. Pour TVQ, le seuil est 30 000 $ selon la *Loi concernant la taxe de vente du Québec*. Si le sous-traitant n'est pas inscrit mais le Client remet en son nom, c'est un indicateur de statut d'employé(e). **Action :** Confirmer l'inscription du sous-traitant; documenter le traitement.",
    },
    {
      heading: "6. Clauses restrictives au Québec — Code civil art. 2089, Charte art. 46",
      body: "Les clauses restrictives au Québec (y compris les non-compétitions dans les contrats IC) sont assujetties au **Code civil**, art. 2089 (bonne foi) et à la **Charte des droits et libertés**, art. 46 (droit de travailler). Même pour les sous-traitants, les clauses de non-concurrence excessives peuvent être inapplicables. Combinées à Shafron, elles doivent être étroites ou être entièrement nulles.",
    },
  ] : j.code === "BC" ? [
    {
      heading: "1. Sagaz / McKee — les tribunaux de C.-B. appliquent le test multifactoriel",
      body: "**671122 Ontario Ltd. c. Sagaz Industries Canada Inc.**, 2001 CSC 59, lie la C.-B. **McKee c. Reid's Heritage Homes Ltd.**, 2009 ONCA 916, est persuasif. Les tribunaux de C.-B. examinent : contrôle, propriété d'outils, profit/perte, intégration dans l'entreprise, droit de sous-traiter. L'étiquette n'est pas déterminante; la réalité économique prédomine. **Action :** Évaluer annuellement la relation par rapport aux facteurs Sagaz/McKee.",
    },
    {
      heading: "2. Loi sur les relations de travail de la C.-B. — définition d'entrepreneur dépendant",
      body: "La **Loi sur les relations de travail**, R.S.B.C. 1996, ch. 244, définit « employé(e) » pour inclure les entrepreneurs dépendants dans certains contextes. Si un sous-traitant est économiquement dépendant d'un client (seuil >80 % des revenus), il peut avoir des droits d'organisation. **Action :** Diversifier la clientèle du sous-traitant ou documenter l'exploitation indépendante.",
    },
    {
      heading: "3. WorkSafeBC — couverture du travailleur pour les salariés mal classifiés",
      body: "En vertu de la **Workers Compensation Act**, R.S.B.C. 2019, ch. 1, si un « sous-traitant » est réellement mal classifié et assujetti à la couverture WorkSafeBC, l'employeur est responsable des cotisations rétroactivement. WorkSafeBC peut déterminer qu'un travailleur mal classifié est un « worker » malgré l'étiquette de sous-traitant. **Action :** S'assurer que le sous-traitant a sa propre couverture WorkSafeBC indépendante.",
    },
    {
      heading: "4. PIPA de la C.-B. — obligations de confidentialité du sous-traitant",
      body: "Si le sous-traitant traite des renseignements personnels, la **Personal Information Protection Act**, S.B.C. 2003, ch. 63 (PIPA), de la C.-B. s'applique. Le contrat doit exiger explicitement la conformité à la PIPA. Un sous-traitant reclassifié en salarié(e) post-hoc peut avoir des obligations différentes. **Action :** S'assurer que l'article 7 (Vie privée) renvoie clairement à la PIPA.",
    },
    {
      heading: "5. Seuil TPS/TVH — 30 000 $ selon la Loi sur la taxe d'accise art. 166",
      body: "Le seuil de la *Loi sur la taxe d'accise*, art. 166, (30 000 $ en fournitures taxables) s'applique en C.-B. Si le sous-traitant n'est pas inscrit mais le Client remet en son nom, l'ARC voit cela comme un indicateur de relation semblable à l'emploi. **Action :** Confirmer l'inscription du sous-traitant à la TPS/TVH; documenter le traitement.",
    },
    {
      heading: "6. Shafron et Elsley — clauses restrictives dans les contrats IC de la C.-B.",
      body: "**Shafron c. KRG Insurance Brokers (Western) Inc.**, 2009 CSC 6, s'applique en C.-B. : les tribunaux ne feront pas la dissection judiciaire d'une clause excessive; la clause entière échoue si déraisonnable. Les clauses restrictives dans les contrats IC sont assujetties au test de raisonnabilité Elsley. **Action :** Rédiger les clauses étroitement; éviter le langage « et/ou ».",
    },
  ] : j.code === "AB" ? [
    {
      heading: "1. Sagaz / McKee — les tribunaux de l'AB appliquent le test",
      body: "**671122 Ontario Ltd. c. Sagaz Industries Canada Inc.**, 2001 CSC 59, lie l'Alberta. **McKee c. Reid's Heritage Homes Ltd.**, 2009 ONCA 916, est persuasif. Les tribunaux examinent le test multifactoriel : contrôle, propriété d'outils, profit/perte, intégration, droit de sous-traiter. L'étiquette n'est pas déterminante. **Action :** Évaluer annuellement la relation par rapport aux facteurs Sagaz/McKee.",
    },
    {
      heading: "2. WCB Alberta — couverture du sous-traitant et risque de mauvaise classification",
      body: "La *Workers Compensation Act* (Alberta) s'applique largement aux travailleurs, même s'ils sont étiquetés sous-traitants. Si WCB fait un audit et découvre qu'un « sous-traitant » opère comme un salarié(e), l'employeur est responsable des cotisations rétroactives et pénalités. **Action :** S'assurer que le sous-traitant a un permis WCB indépendant ou exploite une entreprise distincte.",
    },
    {
      heading: "3. ESC de l'AB — définition d'employé et d'employeur",
      body: "Le **Employment Standards Code**, R.S.A. 2000, ch. E-9, définit largement « employé(e) » et « employeur ». Bien qu'il n'y ait pas de statut spécifique d'« entrepreneur dépendant » en Alberta, l'ESC peut s'appliquer aux travailleurs mal classifiés. Si un sous-traitant est trouvé être un salarié(e), il peut être dû un salaire minimum, des vacances, une indemnité de départ. **Action :** Maintenir des caractéristiques claires de relation d'affaires-à-affaires.",
    },
    {
      heading: "4. PIPA — loi provincial de l'AB essentiellement similaire",
      body: "La **Personal Information Protection Act**, S.A. 2003, ch. P-6.5, de l'Alberta, s'applique aux employeurs du secteur privé et aux sous-traitants. Si le sous-traitant traite des renseignements personnels, l'article 7 doit exiger la conformité à la PIPA. Un sous-traitant reclassifié en salarié(e) peut avoir des obligations différentes. **Action :** Exiger la conformité explicite à la PIPA à l'article 7.",
    },
    {
      heading: "5. Seuil d'inscription TPS/TVH — 30 000 $ (Loi sur la taxe d'accise art. 166)",
      body: "Le seuil de la *Loi sur la taxe d'accise*, art. 166, (30 000 $ en fournitures taxables) s'applique en Alberta. Si le sous-traitant n'est pas inscrit mais le Client remet la TPS/TVH en son nom, c'est un indicateur de statut d'employé(e) à l'ARC. **Action :** Confirmer l'inscription du sous-traitant; spécifier le traitement dans le contrat.",
    },
    {
      heading: "6. Elsley / Shafron — clauses restrictives dans les contrats IC de l'AB",
      body: "**Elsley c. J.G. Collins Insurance Agencies Ltd.**, [1978] 2 RCS 916, et **Shafron c. KRG Insurance Brokers (Western) Inc.**, 2009 CSC 6, s'appliquent en Alberta. Les tribunaux de l'AB sont quelque peu plus disposés à maintenir les clauses restrictives si raisonnablement rédigées, mais ne feront pas la dissection judiciaire d'une clause excessive. **Action :** Rédiger les clauses étroitement.",
    },
  ] : j.code === "FED" ? [
    {
      heading: "1. Sagaz / McKee — les tribunaux fédéraux appliquent le test",
      body: "**671122 Ontario Ltd. c. Sagaz Industries Canada Inc.**, 2001 CSC 59, et **McKee c. Reid's Heritage Homes Ltd.**, 2009 ONCA 916, s'appliquent à la compétence fédérale. Le test multifactoriel Sagaz (contrôle, outils, profit/perte, intégration) détermine le statut. L'étiquette n'est pas déterminante; la réalité économique prédomine. **Action :** Évaluer annuellement la relation par rapport aux facteurs.",
    },
    {
      heading: "2. CCT Partie I art. 3 — définition d'entrepreneur dépendant",
      body: "Le **Code canadien du travail**, L.R.C. 1985, ch. L-2, Partie I, art. 3, définit explicitement « entrepreneur dépendant » et « employé(e) ». Un entrepreneur dépendant est une personne en situation de dépendance économique exécutant des tâches davantage semblables à l'emploi. Si cette définition s'applique, le travailleur a des droits légaux en vertu du CCT. **Action :** S'assurer que le sous-traitant est structurellement et économiquement indépendant.",
    },
    {
      heading: "3. CCT Partie II art. 240 — congédiement injustifié (12+ mois de service)",
      body: "**Code canadien du travail**, Partie II, art. 240 : les salariés ayant 12+ mois de service continu peuvent contester un congédiement à un arbitre. Si un sous-traitant est reclassifié en salarié(e), ce droit s'applique rétroactivement. Si le Client résilie le contrat, le sous-traitant peut réclamer le congédiement injustifié et demander la réintégration ou des dommages. **Action :** S'assurer que le sous-traitant est véritablement indépendant.",
    },
    {
      heading: "4. ARC RC4110 — décision fédérale de statut de travailleur",
      body: "Pour les employeurs fédéralement réglementés, l'ARC fournit les décisions RC4110 (statut de travailleur). Si l'ARC reclassifie un sous-traitant comme salarié(e), l'employeur est responsable de : (a) cotisations au RPC du salarié; (b) cotisations de l'employeur au RPC; (c) intérêts et pénalités; (d) primes d'AE potentielles. **Action :** Demander une décision RC4110 pour les engagements de longue durée ou de grande valeur.",
    },
    {
      heading: "5. Loi sur la taxe d'accise art. 166 — seuil TPS/TVH (30 000 $)",
      body: "Le seuil de la *Loi sur la taxe d'accise*, art. 166, (30 000 $ en fournitures taxables) s'applique fédéralement. Si le sous-traitant n'est pas inscrit mais le Client remet en son nom, l'ARC voit cela comme un indicateur de relation semblable à l'emploi. **Action :** Confirmer l'inscription du sous-traitant; documenter le traitement.",
    },
    {
      heading: "6. Shafron et Elsley — clauses restrictives dans les contrats IC fédéraux",
      body: "**Shafron c. KRG Insurance Brokers (Western) Inc.**, 2009 CSC 6, et **Elsley c. J.G. Collins Insurance Agencies Ltd.**, [1978] 2 RCS 916, s'appliquent fédéralement. Les clauses restrictives dans les contrats IC doivent être raisonnables ou la clause est entièrement nulle; pas de dissection judiciaire. **Action :** Rédiger les clauses étroitement; limiter la durée, le territoire et la portée d'activité.",
    },
  ] : [
    {
      heading: "1. Sagaz / McKee — test de mauvaise classification applicable nationalement",
      body: "**671122 Ontario Ltd. c. Sagaz Industries Canada Inc.**, 2001 CSC 59, et **McKee c. Reid's Heritage Homes Ltd.**, 2009 ONCA 916, lient tout le Canada. Les tribunaux examinent : contrôle, propriété d'outils, profit/perte, intégration et droit de sous-traiter. L'étiquette n'est pas déterminante; la réalité économique prédomine.",
    },
    {
      heading: "2. Classification par l'ARC — exposition au RPC/AE et impôts",
      body: "Si l'ARC reclassifie un sous-traitant comme salarié(e), l'employeur est responsable de : (a) cotisations au RPC du salarié(e) (généralement non prélevées); (b) cotisations de l'employeur au RPC; (c) intérêts et pénalités; (d) taxes de la paie. Le délai de nouvelle cotisation est 3 ans. Demander RC4110 pour les engagements de longue durée ou de grande valeur.",
    },
    {
      heading: "3. Seuil TPS/TVH — 30 000 $",
      body: "En vertu de la *Loi sur la taxe d'accise*, art. 166, toute personne gagnant >30 000 $ en fournitures taxables doit s'inscrire à la TPS/TVH. Si le sous-traitant n'est pas inscrit mais le Client remet en son nom, c'est un indicateur de statut d'employé(e) à l'ARC. **Action :** Confirmer l'inscription; spécifier le traitement TPS/TVH (inclusif/exclusif).",
    },
    {
      heading: "4. Emploi présumé assurable — Règlement sur l'AE",
      body: "Le **Règlement sur l'assurance-emploi** réputent certains arrangements « emplois assurables » indépendamment de l'étiquette contractuelle, y compris où le travailleur et l'employeur ne traitent pas à distance de longueur de bras ou où les conditions d'emploi sont substantiellement similaires. Cela peut déclencher des obligations d'AE inattendues.",
    },
    {
      heading: "5. Risque d'entrepreneur dépendant — spécifique à la juridiction",
      body: "Certaines lois provinciales et fédérales (Loi sur les relations de travail de l'Ontario, CCT Partie I art. 3) reconnaissent les « entrepreneurs dépendants » — des travailleurs économiquement dépendants d'un client qui peuvent avoir des droits d'organisation ou légaux. Structurer la relation pour s'assurer que le sous-traitant est véritablement indépendant et opère pour plusieurs clients.",
    },
    {
      heading: "6. Clauses restrictives — Shafron et Elsley s'appliquent",
      body: "**Shafron c. KRG Insurance Brokers (Western) Inc.**, 2009 CSC 6, et **Elsley c. J.G. Collins Insurance Agencies Ltd.**, [1978] 2 RCS 916, régissent les clauses restrictives dans les contrats IC. Les tribunaux ne feront pas la dissection judiciaire d'une clause excessive; si déraisonnable, la clause entière est nulle. Rédiger étroitement.",
    },
  ],
  };
};
