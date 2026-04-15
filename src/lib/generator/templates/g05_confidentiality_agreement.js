// G05 — Confidentiality Agreement (NDA) — plain-language, mutual-friendly framing
// Each jurisdiction receives function(j) => template with jurisdiction-specific legal notes
export default function(j) {
  return {
    id: "T05",
    slug: "Confidentiality_Agreement",
    kind: "agreement",
    titleEN: "Confidentiality Agreement",
    titleFR: "Entente de confidentialité",

  bodyEN: [
    { type: "h1", text: "Confidentiality Agreement", align: "center" },
    { type: "p", text: "This Confidentiality Agreement (the **Agreement**) is made on **{{agreement_date}}**." },

    { type: "h2", text: "Between" },
    { type: "p", text: "**{{employer_legal_name}}**, with its principal office at **{{employer_address}}** (the **Company**)," },
    { type: "p", text: "— and —" },
    { type: "p", text: "**{{recipient_name}}**, of **{{recipient_address}}** (the **Recipient**)." },

    { type: "h2", text: "Why we're asking you to sign this" },
    { type: "p", text: "In the course of your relationship with us — as an employee, contractor, advisor or counterparty — you will learn things about our business, our people, our customers and our technology that aren't public. Those things are how we compete, how we serve our customers, and sometimes how we keep other people's information safe. This Agreement is about protecting all of that, and about being clear with you about what we're asking." },

    { type: "h2", text: "1. What counts as Confidential Information" },
    { type: "p", text: "**Confidential Information** means any non-public information, in any form (written, oral, electronic, visual or any other), that the Company discloses to the Recipient or that the Recipient learns from the Company, whether before or after the date of this Agreement, including:" },
    { type: "bullet", text: "Business plans, strategies, forecasts, pricing and financial information." },
    { type: "bullet", text: "Customer, supplier and partner information, contracts, and communications." },
    { type: "bullet", text: "Product designs, source code, algorithms, architectures, research and development." },
    { type: "bullet", text: "Personnel information, including compensation, performance and personal information protected under applicable privacy law." },
    { type: "bullet", text: "Any information the Company marks as confidential, or that a reasonable person would understand to be confidential in the circumstances." },
    { type: "p", text: "Confidential Information does not include information that: (a) was already lawfully in the Recipient's possession without a duty of confidentiality before disclosure; (b) is or becomes publicly available through no fault of the Recipient; (c) is independently developed by the Recipient without using the Confidential Information; or (d) is lawfully obtained from a third party who is free to disclose it." },

    { type: "h2", text: "2. How the Recipient must treat it" },
    { type: "p", text: "The Recipient will:" },
    { type: "bullet", text: "Use the Confidential Information only for the purpose described in section 3." },
    { type: "bullet", text: "Keep it secret — with at least the same care the Recipient uses for their own confidential information, and in any event no less than a reasonable standard of care." },
    { type: "bullet", text: "Not disclose it to any third party without the Company's prior written consent, except to the Recipient's legal, tax or financial advisors who are bound by equivalent confidentiality obligations." },
    { type: "bullet", text: "Not copy, reverse engineer, decompile or disassemble it, except as necessary for the Purpose." },
    { type: "bullet", text: "Protect Confidential Information with reasonable administrative, technical and physical safeguards." },

    { type: "h2", text: "3. Purpose" },
    { type: "p", text: "The Recipient may use Confidential Information only for **{{purpose_description}}** (the **Purpose**). Any other use requires the Company's prior written consent." },

    { type: "h2", text: "4. Required disclosures" },
    { type: "p", text: "If the Recipient is required by law, court order, or a regulator to disclose any Confidential Information, the Recipient will (where legally permitted) promptly notify the Company so that the Company may seek a protective order or other appropriate remedy, and will cooperate reasonably with any such effort. The Recipient will disclose only the portion of Confidential Information that is legally required." },
    { type: "p", text: "Nothing in this Agreement prevents the Recipient from making a protected disclosure to a regulator, law-enforcement agency or court, participating in a human-rights, whistleblower or similar complaint, or discussing wages or working conditions with coworkers as permitted by law." },

    { type: "h2", text: "5. Personal information and privacy" },
    { type: "p", text: "If Confidential Information includes personal information, the Recipient will handle it in accordance with **" + j.privacyStatEN + "**. The Recipient will promptly notify the Company of any privacy incident or suspected incident." },

    { type: "h2", text: "6. Term" },
    { type: "p", text: "The Recipient's obligations under this Agreement begin on the date above and continue for **{{confidentiality_term_years}}** years after the end of the Recipient's relationship with the Company, or indefinitely for information that is a trade secret. Obligations under privacy law continue for as long as that law requires." },

    { type: "h2", text: "7. Return or destruction" },
    { type: "p", text: "At the Company's request, and in any event within **{{return_period_days}}** days after the end of the Recipient's relationship with the Company, the Recipient will return or (at the Company's option) securely destroy all Confidential Information, including copies, notes and derivative works. The Recipient may retain one archival copy in encrypted form solely to comply with legal or regulatory retention obligations; that copy remains subject to this Agreement for as long as it is retained." },

    { type: "h2", text: "8. No ownership transfer" },
    { type: "p", text: "All Confidential Information remains the property of the Company. Nothing in this Agreement grants the Recipient any licence or other right to the Confidential Information, except the limited right to use it for the Purpose." },

    { type: "h2", text: "9. No warranty" },
    { type: "p", text: "The Company provides the Confidential Information \"as is\" and makes no representation or warranty about its accuracy or completeness, except as expressly set out in another written agreement between the Parties." },

    { type: "h2", text: "10. Remedies" },
    { type: "p", text: "The Parties acknowledge that money damages alone may not be enough to remedy a breach of this Agreement, and that the Company may seek injunctive relief in addition to any other legal or equitable remedy, without having to prove actual damages and without being required to post a bond (where permitted by law)." },

    { type: "h2", text: "11. General" },
    { type: "p", text: "This Agreement is governed by the laws of the Province of **" + j.govLawEN + "**. If any part of this Agreement is found unenforceable, the rest continues in full force. This Agreement is the entire agreement between the Parties concerning its subject matter, and may only be amended in writing signed by both Parties. The Recipient confirms that the Recipient has had the opportunity to obtain independent legal advice before signing." },

    { type: "p", text: "By signing below, the Parties confirm they have read and accept the terms of this Agreement." },
    { type: "spacer" },
    { type: "sig", leftLabel: "COMPANY", rightLabel: "RECIPIENT",
      rightName: "recipient_name", rightTitle: "recipient_title" },
  ],

  bodyFR: [
    { type: "h1", text: "Entente de confidentialité", align: "center" },
    { type: "p", text: "La présente entente de confidentialité (l'**Entente**) est conclue le **{{agreement_date}}**." },

    { type: "h2", text: "Entre" },
    { type: "p", text: "**{{employer_legal_name}}**, ayant son bureau principal au **{{employer_address}}** (la **Société**)," },
    { type: "p", text: "— et —" },
    { type: "p", text: "**{{recipient_name}}**, de **{{recipient_address}}** (le/la **Destinataire**)." },

    { type: "h2", text: "Pourquoi nous vous demandons de signer" },
    { type: "p", text: "Dans le cadre de votre relation avec nous — à titre de salarié(e), d'entrepreneur(e), de conseiller(ère) ou de contrepartie — vous apprendrez des choses sur notre entreprise, nos employés, notre clientèle et notre technologie qui ne sont pas publiques. Ces éléments sont notre façon de soutenir la concurrence, de servir notre clientèle et, parfois, de protéger les renseignements d'autres personnes. La présente Entente vise à protéger tout cela et à être transparents quant à nos attentes." },

    { type: "h2", text: "1. Ce qui constitue un renseignement confidentiel" },
    { type: "p", text: "Les **Renseignements confidentiels** désignent tous les renseignements non publics, sous quelque forme que ce soit (écrite, orale, électronique, visuelle ou autre), que la Société communique au/à la Destinataire ou que celui-ci/celle-ci apprend de la Société, avant ou après la date de l'Entente, notamment :" },
    { type: "bullet", text: "Plans d'affaires, stratégies, prévisions, prix et renseignements financiers." },
    { type: "bullet", text: "Renseignements sur la clientèle, les fournisseurs et les partenaires, contrats et communications." },
    { type: "bullet", text: "Conceptions de produits, code source, algorithmes, architectures, recherche et développement." },
    { type: "bullet", text: "Renseignements sur le personnel, y compris la rémunération, le rendement et les renseignements personnels protégés par la législation sur la protection de la vie privée." },
    { type: "bullet", text: "Tout renseignement désigné comme confidentiel par la Société ou qu'une personne raisonnable considérerait comme confidentiel dans les circonstances." },
    { type: "p", text: "Les Renseignements confidentiels ne comprennent pas les renseignements : a) que le/la Destinataire possédait légalement avant la divulgation, sans obligation de confidentialité; b) qui sont ou deviennent publics sans faute du/de la Destinataire; c) que le/la Destinataire développe de façon indépendante sans utiliser les Renseignements confidentiels; ou d) obtenus légalement d'un tiers libre de les divulguer." },

    { type: "h2", text: "2. Comment le/la Destinataire doit les traiter" },
    { type: "p", text: "Le/La Destinataire s'engage à :" },
    { type: "bullet", text: "N'utiliser les Renseignements confidentiels qu'aux fins décrites à l'article 3." },
    { type: "bullet", text: "Les garder secrets — au minimum avec le même soin qu'il/elle porte à ses propres renseignements confidentiels et, en tout état de cause, avec un degré raisonnable de diligence." },
    { type: "bullet", text: "Ne pas les divulguer à un tiers sans le consentement écrit préalable de la Société, sauf à ses conseillers juridiques, fiscaux ou financiers tenus à une obligation de confidentialité équivalente." },
    { type: "bullet", text: "Ne pas les copier, les rétroconcevoir, les décompiler ou les désassembler, sauf dans la mesure nécessaire à la Fin." },
    { type: "bullet", text: "Protéger les Renseignements confidentiels par des mesures de sécurité administratives, techniques et physiques raisonnables." },

    { type: "h2", text: "3. Fin" },
    { type: "p", text: "Le/La Destinataire ne peut utiliser les Renseignements confidentiels qu'à l'égard de **{{purpose_description}}** (la **Fin**). Tout autre usage nécessite le consentement écrit préalable de la Société." },

    { type: "h2", text: "4. Divulgations exigées" },
    { type: "p", text: "Si le/la Destinataire est tenu(e), par la loi, une ordonnance judiciaire ou un organisme de réglementation, de divulguer des Renseignements confidentiels, il/elle avisera (lorsque la loi le permet) rapidement la Société afin qu'elle puisse demander une ordonnance de protection ou un autre recours, et coopérera raisonnablement. Il/Elle ne divulguera que la portion légalement exigée." },
    { type: "p", text: "Rien dans l'Entente n'empêche le/la Destinataire de faire une divulgation protégée à un organisme de réglementation, à un organisme d'application de la loi ou à un tribunal, de participer à une plainte en matière de droits de la personne ou de dénonciation, ou de discuter de sa rémunération et de ses conditions de travail avec ses collègues, dans la mesure permise par la loi." },

    { type: "h2", text: "5. Renseignements personnels et vie privée" },
    { type: "p", text: "Si les Renseignements confidentiels comprennent des renseignements personnels, le/la Destinataire les traitera conformément à **" + j.privacyStatFR + "**. Il/Elle avisera promptement la Société de tout incident ou incident soupçonné de confidentialité." },

    { type: "h2", text: "6. Durée" },
    { type: "p", text: "Les obligations du/de la Destinataire commencent à la date ci-dessus et se poursuivent pendant **{{confidentiality_term_years}}** années après la fin de la relation avec la Société, ou indéfiniment pour les renseignements qui constituent un secret commercial. Les obligations découlant du droit à la vie privée se poursuivent aussi longtemps que la loi l'exige." },

    { type: "h2", text: "7. Restitution ou destruction" },
    { type: "p", text: "À la demande de la Société, et en tout état de cause dans les **{{return_period_days}}** jours suivant la fin de la relation, le/la Destinataire retournera ou (au choix de la Société) détruira de façon sécuritaire tous les Renseignements confidentiels, y compris les copies, notes et œuvres dérivées. Il/Elle peut conserver une copie d'archives sous forme chiffrée uniquement pour se conformer à des obligations légales ou réglementaires de conservation; cette copie demeure assujettie à l'Entente pendant toute la durée de sa conservation." },

    { type: "h2", text: "8. Aucun transfert de propriété" },
    { type: "p", text: "Tous les Renseignements confidentiels demeurent la propriété de la Société. Rien dans l'Entente n'accorde au/à la Destinataire une licence ou un autre droit sur les Renseignements confidentiels, sauf le droit limité de les utiliser à la Fin." },

    { type: "h2", text: "9. Absence de garantie" },
    { type: "p", text: "La Société fournit les Renseignements confidentiels « tels quels » et ne donne aucune déclaration ni garantie quant à leur exactitude ou exhaustivité, sauf disposition expresse dans une autre entente écrite entre les Parties." },

    { type: "h2", text: "10. Recours" },
    { type: "p", text: "Les Parties reconnaissent que des dommages-intérêts peuvent ne pas suffire à réparer un manquement à l'Entente et que la Société peut demander une injonction en plus de tout autre recours, sans avoir à prouver un dommage réel et sans être tenue de fournir un cautionnement (lorsque la loi le permet)." },

    { type: "h2", text: "11. Dispositions générales" },
    { type: "p", text: "L'Entente est régie par les lois de la province de **" + j.govLawFR + "**. Si une clause est jugée inapplicable, le reste demeure pleinement en vigueur. L'Entente constitue l'entente complète des Parties à son sujet et ne peut être modifiée que par écrit, signé par les deux Parties. Le/La Destinataire confirme avoir eu l'occasion d'obtenir un avis juridique indépendant avant de signer." },

    { type: "p", text: "En signant ci-dessous, les Parties confirment avoir lu et accepter les modalités de la présente Entente." },
    { type: "spacer" },
    { type: "sig", leftLabel: "SOCIÉTÉ", rightLabel: "DESTINATAIRE",
      rightName: "recipient_name", rightTitle: "recipient_title" },
  ],

  legalNotesEN: j.code === "ON" ? [
    {
      heading: "1. Definitional limits — Lac Minerals test",
      body: "**Lac Minerals Ltd. v. International Corona Resources Ltd.**, [1989] 2 SCR 574: confidential information must be actually secret, have commercial value, and be subject to reasonable protective measures. The definition in section 1 must be narrowly tailored. Information in the public domain or independently developed is not protected. **Action:** Exclude general skills from the definition; protect only identifiable business information and trade secrets.",
    },
    {
      heading: "2. PIPEDA — federal baseline for Ontario",
      body: "Ontario has no provincial private-sector privacy statute; **PIPEDA** (Personal Information Protection and Electronic Documents Act, S.C. 2000, c. 5) is the baseline. A confidentiality clause cannot prevent compliance with PIPEDA access, correction or deletion requests, or lawful regulatory orders. **Action:** Ensure section 4 (Required Disclosures) explicitly permits disclosure as required by PIPEDA and any applicable privacy law.",
    },
    {
      heading: "3. Criminal liability — Criminal Code ss. 322, 380, 342.1",
      body: "Theft of trade secrets or confidential information may constitute theft (s. 322), fraud (s. 380), or unauthorized use of a computer (s. 342.1) under the **Criminal Code**, R.S.C. 1985, c. C-46. Civil remedies for breach of confidence include damages, disgorgement of profits, and injunctions. Unlike the US, Canada does not have a dedicated federal Trade Secrets Act.",
    },
    {
      heading: "4. RJR-MacDonald injunction test",
      body: "To obtain an interlocutory (preliminary) injunction for breach of confidentiality under Ontario law, the employer must establish: (a) a serious question to be tried; (b) irreparable harm (harm that cannot be adequately remedied by damages); and (c) balance of convenience favouring the injunction (*RJR-MacDonald Inc. v. Canada*, [1994] 1 SCR 311). Courts find irreparable harm for genuine trade secrets; less readily for marginally confidential information.",
    },
    {
      heading: "5. Shafron — no blue-pencilling; entire clause fails if overbroad",
      body: "**Shafron v. KRG Insurance Brokers (Western) Inc.**, 2009 SCC 6 (applies in Ontario): courts will not modify or rewrite an overly broad confidentiality clause. If the temporal, territorial or subject-matter scope exceeds what is reasonable, the entire clause is void — not narrowed to fit. **Action:** Draft confidentiality obligations as narrowly as possible; avoid 'and/or' formulations that broaden scope.",
    },
    {
      heading: "6. Consideration and timing",
      body: "If the confidentiality agreement is signed after employment begins, fresh consideration beyond continued employment is required. Provide a clear benefit: signing bonus, promotion, expanded access to confidential data, or other documented value. If signed at the offer stage with the employment agreement, the offer of employment constitutes consideration. Lack of consideration is grounds for unenforceability.",
    },
  ] : j.code === "QC" ? [
    {
      heading: "1. ARLS art. 2088 — loyalty duty during employment",
      body: "Quebec's **Act Respecting Labour Standards**, CQLR c N-1.1, art. 2088 (and the **Civil Code**, art. 2088) imposes a duty of loyalty on employees during employment. This overlaps with confidentiality obligations. Confidential information learned during employment is subject to this duty, but courts limit post-employment restrictions to true trade secrets and identifiable business information. **Action:** Distinguish clearly between during-employment and post-employment obligations.",
    },
    {
      heading: "2. Law 25 — modernized personal information protection",
      body: "Québec's **An Act to modernize legislative provisions as regards the protection of personal information**, S.Q. 2021, c. 25 (Law 25) replaces the former PIPEDA-equivalent regime. Law 25 applies to personal information collection, use, and retention. A confidentiality clause cannot override compliance with Law 25 access, deletion, or correction requests. **Action:** Ensure section 5 references Law 25 explicitly and section 4 permits required disclosures.",
    },
    {
      heading: "3. Civil Code art. 2089 — general duty of good faith",
      body: "The Quebec **Civil Code**, art. 2089, imposes a general obligation of good faith in contract performance and interpretation. This applies to confidentiality agreements. Courts may void or narrow clauses they consider oppressive or unreasonable. Coupled with Shafron and the Charter of Human Rights and Freedoms (see below), this gives Quebec courts broad grounds to scrutinize overly broad covenants.",
    },
    {
      heading: "4. Charter of Human Rights and Freedoms — art. 46, liberty to work",
      body: "Quebec's **Charter of Human Rights and Freedoms**, art. 46, protects every person's right to engage in gainful occupation. Post-employment restrictions on confidentiality (and non-competition, if any) must not arbitrarily prevent the employee from working. Courts may strike down covenants that unreasonably restrict an employee's ability to earn a livelihood. **Action:** Limit post-employment confidentiality obligations to true trade secrets; provide a reasonable duration.",
    },
    {
      heading: "5. Shafron applies in Quebec — no blue-pencilling",
      body: "**Shafron v. KRG Insurance Brokers**, 2009 SCC 6 is binding in all Canadian courts including Quebec. Courts will not modify an overly broad clause; if unreasonable in scope, the entire clause fails. Combined with Quebec's approach to contract interpretation and Charter protection, overly broad confidentiality obligations are vulnerable. **Action:** Draft provisions narrowly; consider separate clauses for client information vs. trade secrets.",
    },
    {
      heading: "6. CNESST complaint avenue",
      body: "If an employee is terminated or disciplined for refusing to sign a confidentiality agreement with unreasonable terms, they may file a complaint with the **Commission des normes, de l'équité, de la santé et de la sécurité du travail** (CNESST) under ARLS art. 124 (wrongful dismissal — applies after 2+ years service). CNESST may find the termination unjustified and award damages. **Action:** Ensure confidentiality obligations are reasonable; counsel employees on their right to contest.",
    },
  ] : j.code === "BC" ? [
    {
      heading: "1. BC PIPA — substantially similar to PIPEDA",
      body: "British Columbia's **Personal Information Protection Act**, S.B.C. 2003, c. 63 (PIPA) applies to private-sector employers in BC. PIPA is substantially similar to PIPEDA and is the baseline privacy requirement. A confidentiality clause cannot prevent compliance with PIPA access, correction, or deletion requests, or lawful regulatory orders. **Action:** Ensure section 4 (Required Disclosures) and section 5 (Privacy) explicitly reference PIPA.",
    },
    {
      heading: "2. International Corona — trade secret definition (BC Court of Appeal approach)",
      body: "BC courts follow **Lac Minerals** and **International Corona Resources** (cited in Lac Minerals, [1989] 2 SCR 574) in defining trade secrets: the information must be actually secret, have commercial value, and be subject to reasonable protective measures. BC courts are strict in applying this definition. **Action:** Ensure section 1 clearly identifies what constitutes a trade secret; avoid vague classifications.",
    },
    {
      heading: "3. Shafron — no blue-pencilling in BC",
      body: "**Shafron v. KRG Insurance Brokers (Western) Inc.**, 2009 SCC 6: BC courts, like all Canadian courts, will not modify or rewrite an overly broad confidentiality clause. If temporal, territorial, or subject-matter scope is unreasonable, the clause is entirely void. **Action:** Draft confidentiality provisions narrowly; avoid 'and/or' language that expands scope beyond what is necessary.",
    },
    {
      heading: "4. RJR-MacDonald test for injunctions",
      body: "To obtain injunctive relief in BC for breach of confidentiality, apply the **RJR-MacDonald Inc. v. Canada**, [1994] 1 SCR 311 test: (a) serious question to be tried; (b) irreparable harm; (c) balance of convenience. BC courts recognize irreparable harm for genuine trade secrets and established customer relationships. **Action:** Ensure section 10 (Remedies) refers to injunctive relief and the RJR-MacDonald standard.",
    },
    {
      heading: "5. BC Human Rights Code — no protection for contract-based discrimination",
      body: "BC's **Human Rights Code**, R.S.B.C. 1996, c. 210, protects against discrimination in employment on protected grounds (race, gender, disability, etc.). A confidentiality requirement that is applied selectively or that discriminates on a protected ground may be unenforceable. **Action:** Apply confidentiality requirements uniformly and non-discriminatorily.",
    },
    {
      heading: "6. Consideration for post-commencement agreements",
      body: "If a confidentiality agreement is signed after employment begins, fresh consideration is required. Continued employment alone is generally insufficient. Provide: promotion, salary increase, signing bonus, or documented expanded access to confidential information. Without consideration, the agreement may be unenforceable. **Action:** Document consideration clearly if the agreement is signed post-commencement.",
    },
  ] : j.code === "AB" ? [
    {
      heading: "1. AB PIPA — substantially similar to PIPEDA",
      body: "Alberta's **Personal Information Protection Act**, S.A. 2003, c. P-6.5 (PIPA) is substantially similar to PIPEDA and applies to private-sector employers. A confidentiality clause cannot override PIPA requirements for access, correction, deletion, or lawful regulatory disclosure. **Action:** Ensure section 4 (Required Disclosures) and section 5 (Privacy) reference PIPA explicitly and permit lawful compliance.",
    },
    {
      heading: "2. Shafron — no blue-pencilling; entire clause void if overbroad",
      body: "**Shafron v. KRG Insurance Brokers (Western) Inc.**, 2009 SCC 6: Alberta courts, like all Canadian courts, will not modify an unreasonably broad confidentiality clause. If the clause extends beyond what is reasonable in duration, territory, or scope, it is entirely void — not narrowed to fit. **Action:** Draft provisions narrowly; avoid overly broad 'catch-all' definitions.",
    },
    {
      heading: "3. Common law trade secrets — no provincial statute",
      body: "Alberta has no dedicated provincial statute protecting trade secrets (unlike PIPA's personal information coverage). Trade secret protection relies on common law: the information must be actually secret, have commercial value, and be subject to reasonable protective measures. Courts apply the *Lac Minerals* standard. **Action:** Ensure confidential information is clearly identifiable and genuinely secret.",
    },
    {
      heading: "4. Alberta Human Rights Act — protected grounds",
      body: "Alberta's **Human Rights Act**, R.S.A. 2000, c. A-25.5, prohibits discrimination in employment on protected grounds (race, gender, disability, sexual orientation, etc.). A confidentiality requirement must not be applied discriminatorily or in a manner that violates human rights protections. **Action:** Apply confidentiality obligations uniformly and non-discriminatorily.",
    },
    {
      heading: "5. Consideration for post-commencement execution",
      body: "If the confidentiality agreement is signed after employment commences, fresh consideration beyond continued employment is required. Provide: promotion, salary increase, signing bonus, or documented enhanced access to confidential information. Lack of consideration renders the agreement unenforceable. **Action:** Document consideration if the agreement is signed post-hire.",
    },
    {
      heading: "6. Elsley reasonableness — scope, duration, territory",
      body: "Alberta courts apply the **Elsley** reasonableness standard (J.G. Collins Insurance Agencies Ltd. v. Elsley, [1978] 2 SCR 916): restrictive covenants must be reasonable as between the parties and not contrary to the public interest. Duration, territory, and business scope must be proportionate to the legitimate interest being protected. **Action:** Ensure post-employment confidentiality obligations are strictly limited to true trade secrets.",
    },
  ] : j.code === "FED" ? [
    {
      heading: "1. PIPEDA — federal baseline for all Canada",
      body: "**Personal Information Protection and Electronic Documents Act**, S.C. 2000, c. 5 (PIPEDA), is the federal baseline for private-sector personal information protection. A confidentiality clause cannot prevent compliance with PIPEDA access, correction, deletion, or lawful regulatory disclosure. Federally regulated employers must comply with PIPEDA unless in a 'substantially similar' province (BC, AB, QC exempt from PIPEDA for their own statutes).",
    },
    {
      heading: "2. CLC Part II duty of loyalty",
      body: "The **Canada Labour Code**, R.S.C. 1985, c. L-2, Part II (federally regulated private-sector employment) imposes a general duty of loyalty on employees. This overlaps with confidentiality obligations. Courts recognize that reasonable confidentiality obligations are consistent with this duty, but will not enforce unreasonably broad restrictions. **Action:** Ensure confidentiality obligations are reasonable in scope and duration.",
    },
    {
      heading: "3. No federal statute on trade secrets",
      body: "Canada does not have a dedicated federal statutory trade secrets regime equivalent to the US Defend Trade Secrets Act. Trade secret protection is common law only, based on the *Lac Minerals* test: the information must be actually secret, have commercial value, and be subject to reasonable protective measures. Criminal protection is available under **Criminal Code** ss. 322 (theft), 380 (fraud), 342.1 (unauthorized computer use).",
    },
    {
      heading: "4. Shafron — no blue-pencilling in federal law",
      body: "**Shafron v. KRG Insurance Brokers (Western) Inc.**, 2009 SCC 6: all Canadian courts, including Federal Court, will not modify an overly broad confidentiality clause. If unreasonable in scope, the clause is entirely void. **Action:** Draft provisions narrowly; do not use 'and/or' language that expands scope.",
    },
    {
      heading: "5. Injunctive relief — RJR-MacDonald standard",
      body: "To obtain an interlocutory injunction for breach of confidentiality under federal jurisdiction, establish: (a) serious question to be tried; (b) irreparable harm; (c) balance of convenience (*RJR-MacDonald Inc. v. Canada*, [1994] 1 SCR 311). Federal courts recognize irreparable harm for genuine trade secrets and established customer relationships. **Action:** Section 10 (Remedies) should reference injunctive relief and the RJR-MacDonald standard.",
    },
    {
      heading: "6. Consideration for post-commencement agreements",
      body: "If a confidentiality agreement is signed after federal employment commences, fresh consideration beyond continued employment is required. Provide: promotion, salary increase, signing bonus, or documented expanded access to confidential information. Lack of consideration renders the agreement potentially unenforceable. **Action:** Document and identify consideration clearly.",
    },
  ] : [
    {
      heading: "1. Definitional limits — Lac Minerals test",
      body: "**Lac Minerals Ltd. v. International Corona Resources Ltd.**, [1989] 2 SCR 574: confidential information must be actually secret, have commercial value, and be subject to reasonable protective measures. Define narrowly in section 1; exclude general skills, publicly available information, and independently developed information.",
    },
    {
      heading: "2. Post-employment enforceability",
      body: "Confidentiality obligations extending indefinitely post-employment are enforceable for genuine trade secrets but challengeable if they extend to skills and knowledge acquired in employment. **Shafron v. KRG Insurance Brokers**, 2009 SCC 6: courts will not rewrite overbroad clauses; if unreasonable, the entire clause fails. Limit post-employment obligations to true trade secrets.",
    },
    {
      heading: "3. Privacy law compliance — PIPEDA and provincial variations",
      body: "Confidentiality obligations cannot override statutory obligations under applicable privacy law. PIPEDA applies federally and in provinces without 'substantially similar' private-sector statutes. BC, AB, QC have their own privacy legislation. Ensure section 4 permits required disclosures and section 5 references the applicable law.",
    },
    {
      heading: "4. Shafron — no blue-pencilling",
      body: "**Shafron v. KRG Insurance Brokers (Western) Inc.**, 2009 SCC 6: Canadian courts will not modify an unreasonably broad confidentiality clause. If the scope is excessive, the clause is entirely void. Draft narrowly; avoid 'and/or' language that broadens scope.",
    },
    {
      heading: "5. RJR-MacDonald injunction test",
      body: "To obtain an interlocutory injunction for breach of confidentiality, establish: (a) serious question to be tried; (b) irreparable harm (harm not adequately compensable by damages); (c) balance of convenience (*RJR-MacDonald Inc. v. Canada*, [1994] 1 SCR 311). Courts find irreparable harm for genuine trade secrets.",
    },
    {
      heading: "6. Consideration for post-commencement execution",
      body: "If the agreement is signed after employment commences, fresh consideration is required. Provide: promotion, salary increase, signing bonus, or expanded access to confidential information. Without meaningful consideration, the agreement may be unenforceable. Document clearly.",
    },
  ],
  legalNotesFR: j.code === "ON" ? [
    {
      heading: "1. Limites définitionnelles — test Lac Minerals",
      body: "**Lac Minerals Ltd. c. International Corona Resources Ltd.**, [1989] 2 RCS 574 : l'information confidentielle doit être réellement secrète, avoir une valeur commerciale et faire l'objet de mesures de protection raisonnables. La définition de l'article 1 doit être étroite. Les renseignements du domaine public ou développés indépendamment ne sont pas protégés. **Action :** Exclure les compétences générales; protéger uniquement les renseignements commerciaux identifiables et les secrets commerciaux.",
    },
    {
      heading: "2. LPRPDE — norme fédérale pour l'Ontario",
      body: "L'Ontario n'a pas de loi provinciale sur la protection des renseignements personnels dans le secteur privé; la **Loi sur la protection des renseignements personnels et les documents électroniques** (LPRPDE), L.C. 2000, ch. 5, est la norme fédérale. Une clause de confidentialité ne peut pas empêcher la conformité avec les demandes d'accès, de rectification ou de suppression en vertu de la LPRPDE. **Action :** S'assurer que l'article 4 (Divulgations requises) permet expressément la divulgation conformément à la LPRPDE.",
    },
    {
      heading: "3. Responsabilité pénale — Code criminel art. 322, 380, 342.1",
      body: "Le vol de secrets commerciaux ou de renseignements confidentiels peut constituer un vol (art. 322), une fraude (art. 380) ou l'utilisation non autorisée d'un ordinateur (art. 342.1) en vertu du **Code criminel**, L.R.C. 1985, ch. C-46. Les recours civils pour abus de confiance comprennent les dommages-intérêts et les injonctions. Contrairement aux États-Unis, le Canada n'a pas de loi fédérale autonome sur les secrets commerciaux.",
    },
    {
      heading: "4. Test RJR-MacDonald pour les injonctions",
      body: "Pour obtenir une injonction interlocutoire en Ontario pour violation de confidentialité, l'employeur doit établir : (a) une question sérieuse à trancher; (b) un préjudice irréparable (c.-à-d. un préjudice ne pouvant pas être adéquatement compensé en dommages); (c) que la prépondérance des inconvénients favorise l'injonction (*RJR-MacDonald Inc. c. Canada*, [1994] 1 RCS 311). Les tribunaux reconnaissent le préjudice irréparable pour les véritables secrets commerciaux.",
    },
    {
      heading: "5. Shafron — pas de dissection judiciaire; clause entière annulée si excessive",
      body: "**Shafron c. KRG Insurance Brokers (Western) Inc.**, 2009 CSC 6 (s'applique en Ontario) : les tribunaux ne modifient pas une clause excessive. Si la portée dépasse ce qui est raisonnable, la clause entière est annulée. **Action :** Rédiger les obligations de confidentialité aussi étroitement que possible; éviter les formulations « et/ou » qui élargissent la portée.",
    },
    {
      heading: "6. Contrepartie et moment de signature",
      body: "Si la clause de confidentialité est signée après le début de l'emploi, une contrepartie réelle au-delà du maintien en emploi est requise. Prévoir une prime de signature, une promotion, un accès élargi ou une autre valeur documentée. Si signée au moment de l'offre avec le contrat de travail, l'offre d'emploi constitue une contrepartie. L'absence de contrepartie rend la clause inapplicable.",
    },
  ] : j.code === "QC" ? [
    {
      heading: "1. LNT art. 2088 — devoir de loyauté pendant l'emploi",
      body: "La **Loi sur les normes du travail**, RLRQ c N-1.1, art. 2088 (et le **Code civil**, art. 2088) impose un devoir de loyauté pendant l'emploi. Cela se chevauche avec les obligations de confidentialité. Les renseignements confidentiels appris pendant l'emploi y sont assujettis, mais les tribunaux limitent les restrictions post-emploi aux véritables secrets commerciaux. **Action :** Distinguer clairement les obligations pendant l'emploi de celles après l'emploi.",
    },
    {
      heading: "2. Loi 25 — protection modernisée des renseignements personnels",
      body: "La **Loi modernisant des dispositions législatives en matière de protection des renseignements personnels**, L.Q. 2021, ch. 25 (Loi 25) du Québec remplace l'ancien régime équivalent à la LPRPDE. La Loi 25 s'applique à la collecte, à l'utilisation et à la conservation des renseignements personnels. Une clause de confidentialité ne peut pas l'emporter sur la conformité aux demandes d'accès, suppression ou rectification. **Action :** S'assurer que l'article 5 renvoie expressément à la Loi 25.",
    },
    {
      heading: "3. Code civil art. 2089 — obligation générale de bonne foi",
      body: "Le **Code civil** du Québec, art. 2089, impose une obligation générale de bonne foi dans l'exécution et l'interprétation des contrats. Cela s'applique aux clauses de confidentialité. Les tribunaux peuvent annuler ou restreindre les clauses jugées oppressives. Combinée avec Shafron et la Charte, cela donne aux tribunaux québécois de larges motifs pour contester les clauses excessives.",
    },
    {
      heading: "4. Charte des droits et libertés — art. 46, droit de travailler",
      body: "La **Charte des droits et libertés de la personne** du Québec, art. 46, protège le droit de chacun d'exercer une activité lucrative. Les restrictions post-emploi à la confidentialité ne doivent pas arbitrairement empêcher de travailler. Les tribunaux peuvent annuler les clauses qui restreignent déraisonnablement la capacité de gagner sa vie. **Action :** Limiter les obligations post-emploi aux véritables secrets commerciaux.",
    },
    {
      heading: "5. Shafron s'applique au Québec — pas de dissection judiciaire",
      body: "**Shafron c. KRG Insurance Brokers**, 2009 CSC 6 lie tous les tribunaux canadiens, y compris ceux du Québec. Les tribunaux ne modifient pas une clause excessive; si déraisonnable, elle est entièrement annulée. **Action :** Rédiger étroitement; envisager des clauses distinctes pour les renseignements sur la clientèle par rapport aux secrets commerciaux.",
    },
    {
      heading: "6. Recours à la CNESST",
      body: "Si une personne salariée est congédiée ou disciplinée pour refuser de signer une clause de confidentialité déraisonnable, elle peut déposer une plainte à la **Commission des normes, de l'équité, de la santé et de la sécurité du travail** (CNESST) en vertu de l'art. 124 de la LNT (congédiement injustifié — s'applique après 2 ans de service). **Action :** S'assurer que les obligations sont raisonnables.",
    },
  ] : j.code === "BC" ? [
    {
      heading: "1. PIPA C.-B. — essentiellement similaire à la LPRPDE",
      body: "La **Personal Information Protection Act**, S.B.C. 2003, ch. 63 (PIPA) de la Colombie-Britannique s'applique aux employeurs du secteur privé. La PIPA est essentiellement similaire à la LPRPDE et constitue la norme minimale. Une clause de confidentialité ne peut pas empêcher la conformité aux demandes d'accès, de rectification ou de suppression. **Action :** S'assurer que les articles 4 et 5 renvoient expressément à la PIPA.",
    },
    {
      heading: "2. International Corona — définition du secret commercial selon les tribunaux de C.-B.",
      body: "Les tribunaux de C.-B. suivent la définition de **Lac Minerals** : le secret commercial doit être réellement secret, avoir une valeur commerciale et faire l'objet de mesures de protection raisonnables. Les tribunaux de C.-B. sont stricts. **Action :** S'assurer que l'article 1 identifie clairement ce qui constitue un secret commercial; éviter les classifications vagues.",
    },
    {
      heading: "3. Shafron — pas de dissection judiciaire en C.-B.",
      body: "**Shafron c. KRG Insurance Brokers (Western) Inc.**, 2009 CSC 6 : les tribunaux de C.-B., comme tous les tribunaux canadiens, ne modifient pas une clause excessive. Si déraisonnable, elle est entièrement annulée. **Action :** Rédiger étroitement; éviter le langage « et/ou » qui élargit la portée.",
    },
    {
      heading: "4. Test RJR-MacDonald pour les injonctions",
      body: "Pour obtenir une injonction en C.-B. pour violation de confidentialité, établir : (a) une question sérieuse à trancher; (b) un préjudice irréparable; (c) balance des inconvénients. Les tribunaux reconnaissent le préjudice irréparable pour les secrets commerciaux véritables. **Action :** S'assurer que l'article 10 (Recours) renvoie aux injonctions et au test RJR-MacDonald.",
    },
    {
      heading: "5. Code des droits de la personne de la C.-B. — pas de protection contractuelle",
      body: "Le **Human Rights Code**, R.S.B.C. 1996, ch. 210, protège contre la discrimination en emploi. Une exigence de confidentialité appliquée sélectivement ou de manière discriminatoire peut être inapplicable. **Action :** Appliquer les exigences uniformément et sans discrimination.",
    },
    {
      heading: "6. Contrepartie pour les accords post-embauche",
      body: "Si la clause est signée après le début de l'emploi, une contrepartie réelle au-delà du maintien en emploi est requise. Prévoir une promotion, une augmentation, une prime ou un accès documenté. Sans contrepartie, l'accord peut être inapplicable. **Action :** Documenter clairement la contrepartie.",
    },
  ] : j.code === "AB" ? [
    {
      heading: "1. PIPA de l'Alberta — essentiellement similaire à la LPRPDE",
      body: "La **Personal Information Protection Act**, S.A. 2003, ch. P-6.5 (PIPA) de l'Alberta est essentiellement similaire à la LPRPDE et s'applique aux employeurs du secteur privé. Une clause de confidentialité ne peut pas l'emporter sur la conformité à la PIPA. **Action :** S'assurer que les articles 4 et 5 renvoient expressément à la PIPA.",
    },
    {
      heading: "2. Shafron — pas de dissection judiciaire; clause entière annulée si excessive",
      body: "**Shafron c. KRG Insurance Brokers (Western) Inc.**, 2009 CSC 6 : les tribunaux de l'Alberta ne modifient pas une clause déraisonnable. Si la portée est excessive, elle est entièrement annulée. **Action :** Rédiger étroitement; éviter les formulations trop larges.",
    },
    {
      heading: "3. Secrets commerciaux en common law — pas de loi provinciale",
      body: "L'Alberta n'a pas de loi provinciale autonome protégeant les secrets commerciaux. La protection repose sur la common law : l'information doit être réellement secrète, avoir une valeur commerciale et faire l'objet de mesures raisonnables. **Action :** S'assurer que l'information confidentielle est clairement identifiable et véritablement secrète.",
    },
    {
      heading: "4. Alberta Human Rights Act — motifs protégés",
      body: "L'**Alberta Human Rights Act**, R.S.A. 2000, ch. A-25.5, interdit la discrimination en emploi fondée sur des motifs protégés. Une exigence de confidentialité ne doit pas être appliquée de manière discriminatoire. **Action :** Appliquer les obligations uniformément et sans discrimination.",
    },
    {
      heading: "5. Contrepartie pour l'exécution post-embauche",
      body: "Si la clause est signée après le début de l'emploi, une contrepartie réelle au-delà du maintien en emploi est requise. Prévoir une promotion, une augmentation, une prime ou un accès documenté. L'absence de contrepartie rend la clause inapplicable. **Action :** Documenter la contrepartie.",
    },
    {
      heading: "6. Norme Elsley — portée, durée, territoire",
      body: "Les tribunaux de l'Alberta appliquent la norme de raisonnabilité **Elsley** : les clauses restrictives doivent être raisonnables entre les parties. La durée, le territoire et la portée commerciale doivent être proportionnés à l'intérêt protégé. **Action :** S'assurer que les obligations post-emploi sont strictement limitées aux véritables secrets commerciaux.",
    },
  ] : j.code === "FED" ? [
    {
      heading: "1. LPRPDE — norme fédérale pour tout le Canada",
      body: "La **Loi sur la protection des renseignements personnels et les documents électroniques**, L.C. 2000, ch. 5 (LPRPDE), est la norme fédérale pour la protection des renseignements personnels dans le secteur privé. Une clause de confidentialité ne peut pas empêcher la conformité à la LPRPDE. Les employeurs de compétence fédérale doivent se conformer, sauf dans les provinces « essentiellement similaires ».",
    },
    {
      heading: "2. CCT Partie II — devoir de loyauté fédéral",
      body: "Le **Code canadien du travail**, L.R.C. 1985, ch. L-2, Partie II (emploi du secteur privé de compétence fédérale) impose un devoir de loyauté. Les obligations de confidentialité raisonnables sont compatibles avec ce devoir, mais les tribunaux n'appliqueront pas les restrictions excessives. **Action :** S'assurer que les obligations sont raisonnables.",
    },
    {
      heading: "3. Pas de loi fédérale autonome sur les secrets commerciaux",
      body: "Le Canada n'a pas de régime statutaire autonome équivalent à la loi américaine. La protection repose sur la common law : le secret doit être réellement secret, avoir une valeur commerciale et faire l'objet de mesures raisonnables. La protection pénale est disponible en vertu du Code criminel art. 322, 380, 342.1.",
    },
    {
      heading: "4. Shafron — pas de dissection judiciaire en droit fédéral",
      body: "**Shafron c. KRG Insurance Brokers (Western) Inc.**, 2009 CSC 6 : tous les tribunaux canadiens, y compris la Cour fédérale, ne modifient pas une clause excessive. Si déraisonnable, elle est entièrement annulée. **Action :** Rédiger étroitement.",
    },
    {
      heading: "5. Injonction — norme RJR-MacDonald",
      body: "Pour obtenir une injonction interlocutoire de compétence fédérale pour violation de confidentialité, établir : (a) une question sérieuse à trancher; (b) un préjudice irréparable; (c) balance des inconvénients. Les tribunaux fédéraux reconnaissent le préjudice irréparable pour les secrets commerciaux véritables. **Action :** L'article 10 doit renvoyer à l'injonction et au test RJR-MacDonald.",
    },
    {
      heading: "6. Contrepartie pour l'exécution post-embauche",
      body: "Si la clause est signée après le début de l'emploi fédéral, une contrepartie réelle au-delà du maintien en emploi est requise. Prévoir une promotion, une augmentation, une prime ou un accès documenté. L'absence peut rendre la clause inapplicable. **Action :** Documenter la contrepartie clairement.",
    },
  ] : [
    {
      heading: "1. Limites définitionnelles — test Lac Minerals",
      body: "**Lac Minerals Ltd. c. International Corona Resources Ltd.**, [1989] 2 RCS 574 : les renseignements confidentiels doivent être réellement secrets, avoir une valeur commerciale et faire l'objet de mesures de protection raisonnables. Définir étroitement à l'article 1; exclure les compétences générales et les renseignements publics.",
    },
    {
      heading: "2. Applicabilité post-emploi",
      body: "Les obligations de confidentialité indéfinies post-emploi sont applicables pour les véritables secrets commerciaux, mais contestables si elles s'étendent aux compétences acquises. **Shafron c. KRG Insurance Brokers**, 2009 CSC 6 : les tribunaux ne réécrivent pas les clauses excessives; si déraisonnable, elle est annulée. Limiter aux véritables secrets commerciaux.",
    },
    {
      heading: "3. Conformité à la loi sur la protection des renseignements personnels",
      body: "Les obligations de confidentialité ne peuvent pas l'emporter sur les exigences légales en matière de confidentialité. La LPRPDE s'applique fédéralement; les provinces ont leurs propres lois. S'assurer que l'article 4 permet les divulgations requises et l'article 5 renvoie à la loi applicable.",
    },
    {
      heading: "4. Shafron — pas de dissection judiciaire",
      body: "**Shafron c. KRG Insurance Brokers (Western) Inc.**, 2009 CSC 6 : les tribunaux canadiens ne modifient pas une clause excessive. Rédiger étroitement; éviter les formulations élargies.",
    },
    {
      heading: "5. Test RJR-MacDonald pour l'injonction",
      body: "Pour obtenir une injonction interlocutoire pour violation de confidentialité, établir : (a) une question sérieuse à trancher; (b) un préjudice irréparable; (c) balance des inconvénients. Les tribunaux reconnaissent le préjudice irréparable pour les secrets commerciaux véritables.",
    },
    {
      heading: "6. Contrepartie pour l'exécution post-embauche",
      body: "Si la clause est signée après le début de l'emploi, une contrepartie réelle au-delà du maintien est requise. Prévoir une promotion, une augmentation ou une prime documentée. L'absence peut rendre la clause inapplicable. Documenter clairement.",
    },
  ],
  };
};
