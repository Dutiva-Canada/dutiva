// G08 — Restrictive Covenants Agreement (non-solicit + non-dealing, ON s. 67.2 compliant)
export default function(j) {
  return {
    id: "T08",
    slug: "Restrictive_Covenants_Agreement",
    kind: "agreement",
    titleEN: "Restrictive Covenants Agreement",
    titleFR: "Entente relative aux clauses restrictives",

  bodyEN: [
    { type: "h1", text: "Restrictive Covenants Agreement", align: "center" },
    { type: "p", text: "This Restrictive Covenants Agreement (the **Agreement**) is made on **{{agreement_date}}** between **{{employer_legal_name}}** (the **Company**) and **{{employee_name}}** (the **Employee**)." },

    { type: "h2", text: "Why we're asking for this" },
    { type: "p", text: "Your role will put you in contact with our customers, our prospects, our confidential information, and the relationships that make our business work. This Agreement is about protecting those relationships and that information for a reasonable period after you leave — not about preventing you from working. We have drafted these restrictions to be as narrow as they can reasonably be, consistent with *J.G. Collins Insurance Agencies Ltd. v. Elsley*, [1978] 2 S.C.R. 916 and *Shafron v. KRG Insurance Brokers (Western) Inc.*, 2009 SCC 6." },

    { type: "h2", text: "1. Definitions" },
    { type: "p", text: "In this Agreement:" },
    { type: "bullet", text: "**Restricted Period** means the **{{restricted_period}}** period that begins when your employment with the Company ends, for any reason." },
    { type: "bullet", text: "**Restricted Territory** means **{{restricted_territory}}**." },
    { type: "bullet", text: "**Restricted Business** means the business of **{{restricted_business_description}}** as actually carried on by the Company at the time your employment ends." },
    { type: "bullet", text: "**Customer** means a person or entity that was a customer of the Company, or an active prospect the Company was actively pursuing, at any time in the **{{customer_lookback}}** months before your employment ends, and with whom you had material dealings or about whom you had access to Confidential Information during that period." },

    { type: "h2", text: "2. Non-solicitation of customers" },
    { type: "p", text: "During the Restricted Period, you will not, directly or indirectly, solicit any Customer for the purpose of providing products or services that compete with the Restricted Business. This clause is about solicitation — it does not prevent you from responding to a Customer who freely approaches you without any inducement from you." },

    { type: "h2", text: "3. Non-dealing (limited)" },
    { type: "p", text: "During the Restricted Period, you will not, directly or indirectly, accept the business of any Customer in connection with products or services that compete with the Restricted Business, to the extent that doing so would involve a material use of Confidential Information you learned at the Company. This restriction is limited to what is reasonably necessary to protect the Company's legitimate interests in Confidential Information and customer goodwill." },

    { type: "h2", text: "4. Non-solicitation of employees and contractors" },
    { type: "p", text: "During the Restricted Period, you will not, directly or indirectly, solicit or induce any employee or active contractor of the Company with whom you worked during the last **{{employee_lookback}}** months of your employment to leave the Company. Receiving an application from someone who responds to a general advertisement (not directed at Company personnel) is not a breach of this clause." },

    { type: "h2", text: "5. Non-competition (limited, executive/sale-of-business only)" },
    { type: "p", text: "**This section only applies in two specific situations:**" },
    { type: "bullet", text: "(a) **Executive carve-out (Ontario).** If you are an \"executive\" within the meaning of s. 67.2(4) of the **Employment Standards Act, 2000**, S.O. 2000, c. 41 (meaning any of: chief executive officer, president, chief administrative officer, chief operating officer, chief financial officer, chief information officer, chief legal officer, chief human resources officer, chief corporate development officer, or holds any other chief executive position) this Agreement includes the non-competition provisions set out in Schedule A, and you have been told so in writing at the time this Agreement was signed; or" },
    { type: "bullet", text: "(b) **Sale-of-business exception (Ontario).** If this Agreement is entered into in connection with the sale of a business or a part of a business within the meaning of s. 67.2(3) of the **Employment Standards Act, 2000**, and you are a seller or former owner of that business." },
    { type: "p", text: "**For every other employee in Ontario, this Agreement does not contain a non-compete.** Ontario's s. 67.2 prohibition on non-competes applies in full, and any attempted non-compete in this Agreement with respect to a non-executive, non-sale-of-business employee in Ontario is void." },
    { type: "p", text: "In provinces outside Ontario, a separate non-competition schedule may apply only if expressly attached and identified as applying to you, and only to the minimum extent reasonable to protect legitimate business interests (*Elsley*, *Shafron*)." },

    { type: "h2", text: "6. Confidentiality" },
    { type: "p", text: "Your confidentiality obligations, including those set out in your employment agreement and any separate confidentiality agreement, continue after your employment ends and are not limited by the Restricted Period. Confidentiality obligations do not prevent you from making a protected disclosure to a regulator or law-enforcement agency, participating in a human-rights or whistleblower complaint, or discussing your wages and working conditions with others as permitted by law." },

    { type: "h2", text: "7. Reasonableness and severability" },
    { type: "p", text: "You acknowledge that: (a) the Company has a legitimate proprietary interest in the Confidential Information, Customer relationships and goodwill that these covenants protect; (b) the Restricted Period, Restricted Territory and Restricted Business have been tailored to that interest and are reasonable; and (c) you have had the opportunity to obtain independent legal advice before signing. If a court finds any covenant to be broader than is reasonable, the Parties intend that the covenant be enforced to the maximum extent permitted by law. If that is not possible, the unenforceable covenant is severed and the rest of the Agreement continues in full force." },

    { type: "h2", text: "8. Remedies" },
    { type: "p", text: "You agree that money damages alone may not be sufficient to remedy a breach of this Agreement, and that the Company may seek injunctive relief in addition to any other legal or equitable remedy, without having to prove actual damages and without being required to post a bond (where permitted by law). Nothing in this section limits either Party's other rights and remedies." },

    { type: "h2", text: "9. Acknowledgement" },
    { type: "p", text: "You acknowledge that you have read and understood this Agreement, that you had the opportunity to obtain independent legal advice before signing, and that you enter into it freely and voluntarily as a condition of the employment, equity or other consideration identified above." },

    { type: "h2", text: "10. Governing law" },
    { type: "p", text: "This Agreement is governed by the laws of the Province of **" + j.govLawEN + "** and the laws of Canada that apply in that province." },

    { type: "p", text: "By signing below, the Parties confirm they have read and accept the terms of this Agreement." },
    { type: "spacer" },
    { type: "sig", leftLabel: "COMPANY", rightLabel: "EMPLOYEE" },
  ],

  bodyFR: [
    { type: "h1", text: "Entente relative aux clauses restrictives", align: "center" },
    { type: "p", text: "La présente entente relative aux clauses restrictives (l'**Entente**) est conclue le **{{agreement_date}}** entre **{{employer_legal_name}}** (la **Société**) et **{{employee_name}}** (le/la **Salarié(e)**)." },

    { type: "h2", text: "Pourquoi cela" },
    { type: "p", text: "Votre rôle vous mettra en contact avec notre clientèle, nos prospects, nos renseignements confidentiels et les relations qui font fonctionner notre entreprise. La présente Entente vise à protéger ces relations et ces renseignements pendant une période raisonnable après votre départ — pas à vous empêcher de travailler. Nous avons rédigé ces restrictions aussi étroites que raisonnablement possible, à la lumière de *J.G. Collins Insurance Agencies Ltd. c. Elsley*, [1978] 2 R.C.S. 916 et de *Shafron c. KRG Insurance Brokers (Western) Inc.*, 2009 CSC 6." },

    { type: "h2", text: "1. Définitions" },
    { type: "p", text: "Dans la présente Entente :" },
    { type: "bullet", text: "**Période restreinte** désigne la période de **{{restricted_period}}** commençant à la fin de votre emploi auprès de la Société, pour quelque motif que ce soit." },
    { type: "bullet", text: "**Territoire restreint** désigne **{{restricted_territory}}**." },
    { type: "bullet", text: "**Entreprise restreinte** désigne l'entreprise consistant à **{{restricted_business_description}}** telle qu'exercée par la Société à la fin de votre emploi." },
    { type: "bullet", text: "**Client(e)** désigne une personne ou entité qui était cliente de la Société, ou un prospect activement sollicité par la Société, à un moment durant les **{{customer_lookback}}** mois précédant la fin de votre emploi, et avec qui vous avez eu des rapports importants ou au sujet de qui vous avez eu accès à des renseignements confidentiels durant cette période." },

    { type: "h2", text: "2. Non-sollicitation de la clientèle" },
    { type: "p", text: "Pendant la Période restreinte, vous ne solliciterez, directement ou indirectement, aucun(e) Client(e) en vue de fournir des produits ou services concurrents à l'Entreprise restreinte. Cette clause porte sur la sollicitation — elle ne vous empêche pas de répondre à un(e) Client(e) qui vous approche librement, sans incitation de votre part." },

    { type: "h2", text: "3. Non-traitement (limité)" },
    { type: "p", text: "Pendant la Période restreinte, vous n'accepterez, directement ou indirectement, les affaires d'aucun(e) Client(e) en lien avec des produits ou services concurrents à l'Entreprise restreinte, dans la mesure où cela impliquerait une utilisation importante des renseignements confidentiels acquis auprès de la Société. Cette restriction est limitée à ce qui est raisonnablement nécessaire pour protéger les intérêts légitimes de la Société en matière de renseignements confidentiels et d'achalandage." },

    { type: "h2", text: "4. Non-sollicitation du personnel et des entrepreneurs" },
    { type: "p", text: "Pendant la Période restreinte, vous ne solliciterez ni n'inciterez, directement ou indirectement, aucun salarié ou entrepreneur actif de la Société avec qui vous avez travaillé au cours des **{{employee_lookback}}** derniers mois de votre emploi à quitter la Société. Recevoir la candidature de quelqu'un qui répond à une annonce générale (non ciblée sur le personnel de la Société) ne constitue pas un manquement." },

    { type: "h2", text: "5. Non-concurrence (limitée, cadres supérieurs / vente d'entreprise)" },
    { type: "p", text: "**Cet article ne s'applique que dans deux cas précis :**" },
    { type: "bullet", text: "a) **Exception pour cadres supérieurs (Ontario).** Si vous êtes un « cadre » (*executive*) au sens du par. 67.2(4) de la **Loi de 2000 sur les normes d'emploi**, L.O. 2000, chap. 41 (chef de la direction, président(e), chef de l'administration, chef de l'exploitation, chef des finances, chef de l'information, chef des affaires juridiques, chef des ressources humaines, chef du développement de l'entreprise ou tout autre poste de direction), la présente Entente inclut les dispositions de non-concurrence prévues à l'annexe A, et vous en avez été avisé(e) par écrit au moment de la signature; ou" },
    { type: "bullet", text: "b) **Exception pour vente d'entreprise (Ontario).** Si la présente Entente est conclue dans le cadre de la vente d'une entreprise ou d'une partie d'entreprise au sens du par. 67.2(3) de la Loi de 2000 sur les normes d'emploi, et si vous êtes un(e) vendeur(euse) ou ancien(ne) propriétaire de cette entreprise." },
    { type: "p", text: "**Pour tout autre salarié en Ontario, la présente Entente ne contient pas de clause de non-concurrence.** L'interdiction prévue à l'art. 67.2 de la LNE ontarienne s'applique intégralement, et toute tentative de non-concurrence à l'égard d'un salarié non cadre, hors contexte de vente d'entreprise, en Ontario, est nulle." },
    { type: "p", text: "Dans les provinces autres que l'Ontario, une annexe distincte de non-concurrence peut s'appliquer uniquement si elle est expressément jointe et désignée comme s'appliquant à vous, et uniquement dans la mesure minimale raisonnable pour protéger les intérêts légitimes (*Elsley*, *Shafron*)." },

    { type: "h2", text: "6. Confidentialité" },
    { type: "p", text: "Vos obligations de confidentialité, notamment celles prévues à votre contrat de travail et à toute entente de confidentialité distincte, se poursuivent après la fin de votre emploi et ne sont pas limitées par la Période restreinte. Les obligations de confidentialité n'empêchent pas la divulgation protégée à un organisme de réglementation ou d'application de la loi, la participation à une plainte en matière de droits de la personne ou de dénonciation, ni la discussion de la rémunération et des conditions de travail avec autrui dans la mesure permise par la loi." },

    { type: "h2", text: "7. Caractère raisonnable et divisibilité" },
    { type: "p", text: "Vous reconnaissez que : a) la Société a un intérêt exclusif légitime dans les renseignements confidentiels, les relations avec la clientèle et l'achalandage protégés par les présentes clauses; b) la Période restreinte, le Territoire restreint et l'Entreprise restreinte ont été adaptés à cet intérêt et sont raisonnables; c) vous avez eu l'occasion d'obtenir un avis juridique indépendant avant de signer. Si un tribunal juge une clause plus large que raisonnable, les Parties entendent qu'elle soit appliquée dans la mesure maximale permise par la loi. Si ce n'est pas possible, la clause non exécutoire est retranchée et le reste de l'Entente demeure pleinement en vigueur." },

    { type: "h2", text: "8. Recours" },
    { type: "p", text: "Vous convenez que des dommages-intérêts peuvent ne pas suffire à réparer un manquement à l'Entente et que la Société peut demander une injonction en plus de tout autre recours, sans avoir à prouver un dommage réel et sans être tenue de fournir un cautionnement (lorsque la loi le permet). Rien dans le présent article ne limite les autres droits et recours des Parties." },

    { type: "h2", text: "9. Accusé de lecture" },
    { type: "p", text: "Vous reconnaissez avoir lu et compris la présente Entente, avoir eu l'occasion d'obtenir un avis juridique indépendant avant de signer et la conclure librement et volontairement, en contrepartie de l'emploi, de la participation au capital ou d'une autre considération indiquée ci-dessus." },

    { type: "h2", text: "10. Loi applicable" },
    { type: "p", text: "La présente Entente est régie par les lois de la province de **" + j.govLawFR + "** et par les lois du Canada qui s'y appliquent." },

    { type: "p", text: "En signant ci-dessous, les Parties confirment avoir lu et accepter les modalités de la présente Entente." },
    { type: "spacer" },
    { type: "sig", leftLabel: "SOCIÉTÉ", rightLabel: "SALARIÉ(E)" },
  ],

  legalNotesEN: j.code === "ON" ? [
    {
      heading: "1. Ontario ESA s. 67.2 — non-compete prohibition + carve-outs",
      body: "**ESA s. 67.2(1)** (as amended by the *Working for Workers Act, 2021*): employers SHALL NOT enter into a non-compete with any employee. **Exceptions:** (a) the employee is an 'executive' (CEO, CFO, COO, President, CIO, CLO, CHRO, Chief Corporate Development Officer, or other C-suite) AND the non-compete does not exceed what is reasonable in the circumstances; (b) the non-compete is entered into in connection with the sale of a business and the employee is a seller/former owner. A non-compete outside these exceptions is **void**. **Action:** Confirm the employee role in writing before offering a non-compete; document reasonableness analysis for executives.",
    },
    {
      heading: "2. Reasonableness under Elsley and Shafron",
      body: "**Elsley v. J.G. Collins Insurance Agencies Ltd.**, [1978] 2 SCR 916: restrictive covenants must be reasonable as between parties and not contrary to the public interest. Consider temporal scope, geographic scope, business activities, and protected interests. **Shafron v. KRG Insurance Brokers (Western) Inc.**, 2009 SCC 6: Ontario courts will not blue-pencil (modify) an unreasonable clause; if any part is unreasonable, the entire clause is void. **Action:** Draft narrowly; use separate clauses for different interests (non-solicit clients, non-solicit employees, non-dealing).",
    },
    {
      heading: "3. No blue-pencilling — clause fails entirely if overbroad",
      body: "Unlike England, Canadian courts (including Ontario) will not rewrite or sever an unreasonable restrictive covenant. If the temporal, geographic, or business scope is too broad, the **entire clause is void** — not narrowed. A clause that attempts to restrict activities beyond what is necessary to protect legitimate interests will fail completely. **Action:** Use multiple, narrowly focused clauses instead of one broad all-encompassing clause.",
    },
    {
      heading: "4. Consideration — essential for post-commencement covenants",
      body: "Restrictive covenants signed after employment commences require fresh consideration beyond continued employment (which is generally insufficient). Provide: promotion, salary increase, signing bonus, expanded access to confidential information, or other documented value. This is the most common reason covenants are struck down. **Action:** Document the consideration clearly in the agreement; state it in the offer letter and/or preamble.",
    },
    {
      heading: "5. Non-solicit vs. non-compete distinction and enforceability",
      body: "Non-solicitation (prohibiting approach to specific customers or employees) is more enforceable than non-competition (prohibiting working for a competitor). Ontario ESA s. 67.2 prohibits non-competes for non-executive employees but does not affect non-solicitation. Ontario courts have upheld non-solicit clauses of 12–24 months for senior employees with material customer relationships, but struck down clauses prohibiting passive acceptance of business from former customers. **Action:** Use non-solicit as the primary restrictive tool; only include non-compete for eligible (executive/sale-of-business) situations.",
    },
    {
      heading: "6. Garden leave as alternative to post-employment non-compete",
      body: "Garden leave (paying the employee during a notice or restriction period while excluding them from clients/competitors) is more enforceable than an unpaid non-compete. Courts favour garden leave because the employee is compensated during the restriction. If offering garden leave, confirm the employment agreement grants the employer the right to require it. **Action:** Consider garden leave for key employees; document in the employment agreement that the employer may require it.",
    },
  ] : j.code === "QC" ? [
    {
      heading: "1. Civil Code art. 2089 — requirements for restrictive covenants",
      body: "Quebec's **Civil Code**, art. 2089, provides that non-competition obligations (and other restrictive covenants) in an employment contract are valid only if: (a) in writing; (b) limited in time, territory, and scope of activities; (c) necessary to protect the employer's legitimate interests (confidential information, customer relationships, trade secrets). The burden of proof is on the employer to show reasonableness. **Action:** Ensure written form, specify duration/territory/business scope, and document the legitimate interests being protected.",
    },
    {
      heading: "2. Jurisprudence — Quebec courts historically restrictive",
      body: "Quebec courts have been historically restrictive in enforcing non-competes and other covenants, viewing them as restraints on the right to work. **Civil Code**, art. 2089, requires all three elements (written, temporally/geographically/scoped limited, and protecting legitimate interests) AND proportionality. Courts will not uphold clauses broader than necessary. **Action:** Draft clauses narrowly; consider non-solicit and non-dealing as alternatives to non-compete.",
    },
    {
      heading: "3. Charter of Human Rights and Freedoms — art. 46, liberty to work",
      body: "Quebec's **Charter**, art. 46, protects every person's right to engage in gainful occupation. Restrictive covenants must not arbitrarily prevent an employee from earning a living. Covenants that are excessive in time, territory, or scope may violate the Charter. Courts may strike down or narrow covenants that unreasonably restrict employability. **Action:** Ensure covenants are no broader than necessary to protect legitimate interests; avoid restrictions that would make it impossible for the employee to work in their field.",
    },
    {
      heading: "4. Garden leave — recognized as legitimate alternative",
      body: "Quebec courts recognize garden leave (paid restriction period) as a legitimate and more enforceable alternative to a post-employment non-compete. Paying the employee during the restriction period makes the covenant less restrictive on the right to work. **Action:** Consider garden leave for senior/key employees as an alternative to an unpaid non-compete; document in the employment agreement.",
    },
    {
      heading: "5. Good faith and proportionality — Civil Code art. 6, 7, 2089",
      body: "Quebec's **Civil Code** imposes a general duty of good faith (art. 6) and proportionality in contract performance. Restrictive covenants must be exercised and interpreted in good faith. An excessively broad covenant may be found to violate good faith and proportionality principles. **Action:** Ensure the covenant is proportionate to the legitimate interest; avoid overreach.",
    },
    {
      heading: "6. CNESST complaint avenue for unjust termination",
      body: "If an employee is terminated or disciplined for refusing to sign an unreasonable restrictive covenant, they may file a complaint with the **CNESST** under ARLS art. 124 (wrongful dismissal, for employees with 2+ years service). If CNESST finds the covenant unreasonable and the termination unjust, the employee may be awarded damages or reinstatement. **Action:** Ensure covenants are reasonable; counsel HR on risks of aggressive covenant enforcement.",
    },
  ] : j.code === "BC" ? [
    {
      heading: "1. Shafron — no blue-pencilling; BC courts strictly enforce",
      body: "**Shafron v. KRG Insurance Brokers (Western) Inc.**, 2009 SCC 6, is binding in BC. BC courts will not modify an unreasonably broad restrictive covenant; the entire clause fails if unreasonable in temporal, geographic, or business scope. This strict rule applies to non-solicits, non-deals, and non-competes. **Action:** Draft covenants narrowly and separately (not as a combined, overly broad clause).",
    },
    {
      heading: "2. Elsley — reasonableness standard applies",
      body: "**Elsley v. J.G. Collins Insurance Agencies Ltd.**, [1978] 2 SCR 916, sets the reasonableness standard. A restrictive covenant is enforceable only if: (a) reasonable as between the parties (considering proportionality of scope, duration, territory); (b) not contrary to the public interest. BC courts apply this test strictly. **Action:** Tailor duration, territory, and scope to the minimum necessary to protect legitimate interests (confidential information, customer relationships).",
    },
    {
      heading: "3. BC courts will not enforce overbroad covenants",
      body: "BC courts, consistent with *Shafron*, do not narrowly interpret overbroad restrictive covenants to save them. A clause that attempts to restrict activity beyond what is reasonable is entirely void. **Action:** Use separate clauses for different protected interests (non-solicit customers, non-solicit employees, non-dealing); avoid one broad 'catch-all' covenant.",
    },
    {
      heading: "4. Garden leave as preferred alternative in BC",
      body: "BC courts are more willing to enforce garden leave (paid restriction period) than an unpaid post-employment non-compete, since the employee is compensated during the restriction. Garden leave respects the employee's ability to work while protecting the employer's legitimate interests. **Action:** Offer garden leave to senior/key employees as an alternative to post-employment non-compete; ensure it is documented in the employment agreement.",
    },
    {
      heading: "5. Consideration for post-commencement covenants",
      body: "If a restrictive covenant is signed after employment begins, fresh consideration beyond continued employment is required. Provide: promotion, salary increase, signing bonus, enhanced access to confidential information, or other documented benefit. **Action:** Document and identify consideration clearly; reference it in the offer letter and/or agreement preamble.",
    },
    {
      heading: "6. RJR-MacDonald injunction test for covenant breach",
      body: "To obtain an interlocutory injunction for breach of a restrictive covenant in BC, establish: (a) serious question to be tried; (b) irreparable harm; (c) balance of convenience (*RJR-MacDonald Inc. v. Canada*, [1994] 1 SCR 311). BC courts recognize irreparable harm for genuine customer relationships and trade secrets. **Action:** Ensure section 8 (Remedies) references injunctive relief and the RJR-MacDonald standard.",
    },
  ] : j.code === "AB" ? [
    {
      heading: "1. Elsley and Shafron — Alberta courts apply both standards",
      body: "**Elsley v. J.G. Collins Insurance Agencies Ltd.**, [1978] 2 SCR 916, and **Shafron v. KRG Insurance Brokers (Western) Inc.**, 2009 SCC 6, apply in Alberta. Alberta courts apply the Elsley reasonableness test and the Shafron no-blue-pencilling rule. If a covenant is unreasonably broad, the entire clause is void. **Action:** Draft covenants narrowly and reasonably; separate clauses for different interests.",
    },
    {
      heading: "2. Alberta courts somewhat more willing to enforce restrictive covenants",
      body: "While bound by Shafron, Alberta courts have been somewhat more willing than Ontario or BC courts to enforce restrictive covenants if the scope is reasonable. However, the no-blue-pencilling rule still applies. **Action:** Ensure covenants are tightly drafted and proportionate to protect specific legitimate interests.",
    },
    {
      heading: "3. Alberta Human Rights Act — protected grounds and liberty to work",
      body: "The **Alberta Human Rights Act**, R.S.A. 2000, c. A-25.5, protects against discrimination and, implicitly, protects freedom to work. A restrictive covenant that is discriminatory or that unreasonably restricts the ability to earn a living may violate the Act. **Action:** Ensure covenants are applied uniformly and are not discriminatory; ensure they are proportionate to protect legitimate interests.",
    },
    {
      heading: "4. Consideration for post-commencement covenants",
      body: "If a restrictive covenant is signed after employment commences, fresh consideration beyond continued employment is required. Provide: promotion, salary increase, signing bonus, enhanced access to confidential information, or other documented benefit. **Action:** Document and identify consideration; state it in the agreement preamble and/or offer letter.",
    },
    {
      heading: "5. Garden leave as legitimate alternative",
      body: "Garden leave (paid restriction period) is a more enforceable alternative to post-employment non-compete in Alberta, since the employee is compensated. Courts recognize garden leave as a legitimate way to balance employer interests with employee freedom to work. **Action:** Consider garden leave for key employees; document in the employment agreement.",
    },
    {
      heading: "6. OHS Act — if covenant relates to safety complaints",
      body: "If a covenant is enforced in a manner that restricts an employee's right to report occupational health and safety concerns under the **Occupational Health and Safety Act**, R.S.A. 2000, c. O-2, the covenant enforcement may violate the Act's anti-retaliation provisions. Employees have a protected right to report hazards without restriction. **Action:** Ensure the covenant is not applied to punish or restrict safety-related reports or participation.",
    },
  ] : j.code === "FED" ? [
    {
      heading: "1. Shafron and Elsley — federal courts apply both principles",
      body: "**Shafron v. KRG Insurance Brokers (Western) Inc.**, 2009 SCC 6, and **Elsley v. J.G. Collins Insurance Agencies Ltd.**, [1978] 2 SCR 916, apply in federal jurisdiction. Federal courts will not blue-pencil an overly broad covenant; if unreasonable, the entire clause is void. The Elsley reasonableness standard (temporal, geographic, business scope) governs. **Action:** Draft covenants narrowly and separately; tailor to protected interests.",
    },
    {
      heading: "2. No federal statutory restriction on non-competes",
      body: "Unlike Ontario (ESA s. 67.2), there is no federal statutory prohibition on non-competes. Non-competes are governed by common law reasonableness (Elsley/Shafron). However, the CLC Part II imposes a duty of loyalty; covenants must respect that duty and the right to work. **Action:** Ensure covenants are reasonable under Elsley; do not overreach.",
    },
    {
      heading: "3. RJR-MacDonald injunction standard applies",
      body: "To obtain an interlocutory injunction for breach of a restrictive covenant in federal court, establish: (a) serious question to be tried; (b) irreparable harm; (c) balance of convenience (*RJR-MacDonald Inc. v. Canada*, [1994] 1 SCR 311). Federal courts recognize irreparable harm for customer relationships and trade secrets. **Action:** Reference the RJR-MacDonald standard in section 8 (Remedies).",
    },
    {
      heading: "4. Consideration — essential for post-commencement covenants",
      body: "Restrictive covenants signed after commencement of federal employment require fresh consideration beyond continued employment. Provide: promotion, salary increase, signing bonus, enhanced access to confidential information, or other documented value. **Action:** Document consideration clearly; state in the agreement preamble.",
    },
    {
      heading: "5. CLC Part II duty of loyalty and good faith",
      body: "The **Canada Labour Code**, Part II, imposes a duty of loyalty on employees and good faith on employers. Restrictive covenants must be exercised in good faith and in proportion to legitimate interests. Excessive or oppressive covenants may violate the good faith duty. **Action:** Ensure covenants are proportionate and exercised fairly.",
    },
    {
      heading: "6. Garden leave as alternative in federal jurisdiction",
      body: "Garden leave (paid restriction period) is a more enforceable alternative to post-employment non-compete in federal jurisdiction, since the employee is compensated during the restriction. Federal labour adjudicators and courts prefer arrangements that balance employer interests with employee freedom to work. **Action:** Consider garden leave for key employees; document in the employment agreement.",
    },
  ] : [
    {
      heading: "1. Shafron — no blue-pencilling; clauses fail entirely if overbroad",
      body: "**Shafron v. KRG Insurance Brokers (Western) Inc.**, 2009 SCC 6: Canadian courts will not modify or sever an unreasonably broad restrictive covenant. If any part of the clause is unreasonable in temporal, geographic, or business scope, the entire clause is void. **Action:** Draft covenants narrowly and separately for different interests.",
    },
    {
      heading: "2. Elsley — reasonableness standard",
      body: "**Elsley v. J.G. Collins Insurance Agencies Ltd.**, [1978] 2 SCR 916: restrictive covenants must be reasonable as between parties and not contrary to the public interest. Consider proportionality of time, territory, and business activities to protected interests. **Action:** Tailor duration, scope, and territory to the minimum necessary to protect legitimate interests.",
    },
    {
      heading: "3. Separate clauses for different protected interests",
      body: "Use separate, narrowly drafted clauses for: (a) non-solicitation of customers; (b) non-dealing with customers (if involving confidential information); (c) non-solicitation of employees. Avoid one broad 'catch-all' clause that may be found unreasonable in scope. **Action:** Use multiple targeted clauses rather than a single expansive provision.",
    },
    {
      heading: "4. Consideration for post-commencement agreements",
      body: "If a restrictive covenant is signed after employment commences, fresh consideration beyond continued employment is required. Provide: promotion, salary increase, signing bonus, or other documented benefit. **Action:** Clearly document and identify consideration; state in the agreement and/or offer letter.",
    },
    {
      heading: "5. RJR-MacDonald injunction test for enforcement",
      body: "To obtain an injunction for breach of a restrictive covenant, establish: (a) serious question to be tried; (b) irreparable harm; (c) balance of convenience (*RJR-MacDonald Inc. v. Canada*, [1994] 1 SCR 311). Courts recognize irreparable harm for genuine customer relationships and trade secrets. **Action:** Reference the RJR-MacDonald standard in the Remedies section.",
    },
    {
      heading: "6. Garden leave as preferred alternative to non-compete",
      body: "Garden leave (paid restriction period) is more enforceable than post-employment non-compete, since the employee is compensated. Courts favour garden leave because it respects the employee's ability to work while protecting employer interests. **Action:** Consider garden leave for senior/key employees; ensure documented in the employment agreement that employer may require it.",
    },
  ],
  legalNotesFR: [
    {
      heading: "1. LNE de l'Ontario, art. 67.2 — interdiction de non-concurrence",
      body: "**LNE, art. 67.2(1)** (tel que modifié par la *Loi de 2021 visant à œuvrer pour les travailleurs*) : les employeurs ne peuvent pas conclure de convention de non-concurrence avec un(e) salarié(e). **Exceptions (art. 67.2(3) et (4)) :** (a) la personne salariée est un(e) « cadre de direction » (PDG, chef des finances, chef des opérations, président(e), chef du contentieux, etc.) et la clause ne dépasse pas ce qui est raisonnable; (b) la clause résulte d'une vente d'entreprise. Une clause de non-concurrence ne satisfaisant pas à ces exceptions est **nulle**. **Action :** Confirmer le niveau hiérarchique avant d'inclure une clause de non-concurrence; pour les cadres, documenter pourquoi la portée est raisonnable.",
    },
    {
      heading: "2. Norme de raisonnabilité — Elsley et Shafron",
      body: "**Elsley c. J.G. Collins Insurance Agencies Ltd.**, [1978] 2 RCS 916 : une clause restrictive n'est applicable que si elle est raisonnable entre les parties et non contraire à l'intérêt public — compte tenu de la portée temporelle, géographique et des activités visées. **Shafron c. KRG Insurance Brokers (Western) Inc.**, 2009 CSC 6 : les tribunaux canadiens ne procèdent pas à la dissection judiciaire d'une clause déraisonnable; si une partie est déraisonnable, toute la clause est annulée. **Action :** Rédiger les clauses restrictives aussi étroitement que possible.",
    },
    {
      heading: "3. Absence de dissection judiciaire au Canada",
      body: "Contrairement à l'Angleterre, les tribunaux canadiens ne modifient pas une clause restrictive déraisonnable pour la rendre applicable (*Shafron*). La clause doit être raisonnable telle que rédigée. Une clause trop large quant à la portée géographique, à la durée ou aux activités visées sera entièrement nulle. **Action :** Utiliser des clauses distinctes et étroitement rédigées pour chaque intérêt protégé (clients, salarié(e)s, activités).",
    },
    {
      heading: "4. Contrepartie",
      body: "Les clauses restrictives ajoutées après le début de l'emploi exigent une contrepartie réelle allant au-delà du maintien en emploi. Prévoir une promotion, une augmentation de salaire, une prime de signature, un accès à des renseignements confidentiels ou tout autre avantage concret. Documenter la contrepartie dans l'accord. L'absence de contrepartie est l'un des motifs les plus fréquents d'annulation de clauses restrictives.",
    },
    {
      heading: "5. Distinction non-sollicitation / non-concurrence",
      body: "Les clauses de non-sollicitation (interdisant de démarcher des clients ou salarié(e)s précis) sont généralement plus applicables que les clauses de non-concurrence. L'art. 67.2 de la LNE de l'Ontario interdit les clauses de non-concurrence pour les salarié(e)s non-cadres, mais n'affecte pas les clauses de non-sollicitation. Les tribunaux ont maintenu des clauses de non-sollicitation de 12 à 24 mois pour les salarié(e)s seniors ayant des relations significatives avec des clients, mais ont annulé les clauses interdisant l'acceptation passive d'affaires provenant d'anciens clients.",
    },
    {
      heading: "6. Congé-jardin",
      body: "Une disposition de congé-jardin (payer la personne salariée pendant la période de préavis en l'écartant des clients et des concurrents) peut être une alternative plus applicable à une clause de non-concurrence post-emploi, puisque la personne est toujours rémunérée pendant la période de restriction. Les tribunaux sont plus enclins à maintenir un congé-jardin qu'une restriction non rémunérée. Si un congé-jardin est envisagé, confirmer que le contrat de travail donne à l'employeur le droit de l'exiger.",
    },
  ],
  };
};

