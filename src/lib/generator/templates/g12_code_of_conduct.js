// G12 — Code of Business Conduct and Ethics
// Multi-jurisdiction: exports function(j) => templateObject

export default function(j) {
  return {
    id: "T12",
    slug: "Code_of_Conduct",
    kind: "policy",
    titleEN: "Code of Business Conduct and Ethics",
    titleFR: "Code de conduite et d'éthique",

    bodyEN: [
      { type: "h1", text: "Code of Business Conduct and Ethics", align: "center" },
      { type: "p", text: "**Effective:** {{policy_effective_date}} — **Jurisdiction:** " + j.nameEN, align: "center" },

      { type: "h2", text: "Who this applies to" },
      { type: "p", text: "This Code applies to everyone at **{{employer_legal_name}}** — employees, officers, directors, contractors and anyone else acting for us. It is the baseline for how we work. It doesn't cover every situation, but the principles here should guide you when the specific rule is unclear. If you are not sure what to do, ask." },

      { type: "h2", text: "1. Our guiding principles" },
      { type: "p", text: "We believe that good business is built on a few simple things: telling the truth, keeping promises, treating people well, and taking responsibility when something goes wrong. This Code tries to make those principles concrete." },

      { type: "h2", text: "2. Honesty and integrity" },
      { type: "p", text: "Be truthful. Don't exaggerate, misrepresent, or leave out things that matter when communicating with customers, partners, colleagues, or regulators. If you make a mistake, say so — early and clearly. We will never punish someone for admitting a good-faith error." },

      { type: "h2", text: "3. Respect and inclusion" },
      { type: "p", text: "Treat every colleague, customer and partner with dignity. Discrimination, harassment and retaliation — whether on the basis of any ground protected by " + j.hrStatEN + " — are not permitted. Our Workplace Harassment, Discrimination and Violence Prevention Policy sets out the details." },

      { type: "h2", text: "4. Conflicts of interest" },
      { type: "p", text: "Avoid situations where your personal interests — financial, family, or otherwise — could reasonably conflict with your duty to the Company or to our customers. When in doubt, disclose. Disclosure is almost always the answer; concealment almost never is. Report actual or potential conflicts to your manager or **{{ethics_contact_name}}**." },

      { type: "h2", text: "5. Bribery, gifts and entertainment" },
      { type: "p", text: "We do not give or accept bribes, kickbacks or anything that would compromise our judgment or appear to. Modest, infrequent gifts and hospitality are fine if they are openly given, do not create an expectation of reciprocation, and are consistent with anti-corruption law, including Canada's **Corruption of Foreign Public Officials Act**, S.C. 1998, c. 34 (where applicable). Cash or cash equivalents are never acceptable." },

      { type: "h2", text: "6. Fair dealing" },
      { type: "p", text: "Compete on the merits of what we offer. Don't mislead customers, denigrate competitors unfairly, or make promises we can't keep. When a contract is in place, we act in good faith and with honesty, consistent with *Bhasin v. Hrynew*, 2014 SCC 71 and *C.M. Callow Inc. v. Zollinger*, 2020 SCC 45." },

      { type: "h2", text: "7. Protection of Company assets" },
      { type: "p", text: "Use Company assets — money, equipment, time, information — for legitimate business purposes. Take reasonable care of them. Don't misuse Company funds, and don't charge the Company for personal expenses." },

      { type: "h2", text: "8. Accurate books and records" },
      { type: "p", text: "Our financial and business records must accurately reflect the underlying transactions. Do not create false or misleading entries, and do not ask anyone else to. This applies to expense reports, timesheets, customer invoices, internal reports — everything." },

      { type: "h2", text: "9. Confidentiality and privacy" },
      { type: "p", text: "Keep confidential information confidential — that includes customer information, colleague information, pricing, unreleased products, and anything else the Company has not made public. Handle personal information in accordance with " + j.privacyStatEN + ". If you are unsure whether something can be shared, assume it cannot, and ask." },

      { type: "h2", text: "10. Insider information" },
      { type: "p", text: "If you have material non-public information about the Company or any other public company you learn about through your work, do not trade on it and do not share it with anyone who might. Doing so can be a criminal offence and will, in any event, be a violation of this Code." },

      { type: "h2", text: "11. Health, safety and the environment" },
      { type: "p", text: "Follow our health, safety and environmental policies. Speak up about unsafe conditions. You have the right to refuse unsafe work under the occupational health and safety legislation that applies to your workplace, including " + j.harassStatEN + "." },

      { type: "h2", text: "12. Political activity" },
      { type: "p", text: "Your personal political views and activities are your own. Do not represent them as the Company's views. Do not use Company resources or time for personal political activity, and do not pressure colleagues about political matters. Any Company contributions to political campaigns or parties must be approved by **{{political_approval_authority}}**." },

      { type: "h2", text: "13. Reporting a concern" },
      { type: "p", text: "If you see something that is — or might be — a violation of this Code, report it. You can report to your manager, to HR, to legal, or (for anonymous reports) to **{{whistleblower_channel}}**. We will take reports seriously, protect your identity to the extent permitted by law, and not retaliate against anyone who reports in good faith. Retaliation is itself a violation of this Code." },

      { type: "h2", text: "14. Consequences of violating this Code" },
      { type: "p", text: "Violations can lead to disciplinary action, up to and including termination of employment. Any discipline will be proportionate to the violation and delivered in accordance with our Progressive Discipline Policy and applicable law. Where misconduct rises to the level of just cause, *McKinley v. BC Tel*, 2001 SCC 38 provides the contextual test that governs our decisions, and any statutory entitlements that cannot be waived will be respected. This applies in " + j.nameEN + " under " + j.govLawEN + "." },
    ],

    bodyFR: [
      { type: "h1", text: "Code de conduite et d'éthique", align: "center" },
      { type: "p", text: "**Date d'entrée en vigueur :** {{policy_effective_date}} — **Juridiction :** " + j.nameFR, align: "center" },

      { type: "h2", text: "À qui cela s'applique" },
      { type: "p", text: "Le présent Code s'applique à toute personne chez **{{employer_legal_name}}** — employé(e)s, dirigeant(e)s, administrateurs(trices), entrepreneurs(euses) et quiconque agit pour notre compte. C'est notre base commune. Il ne couvre pas toutes les situations, mais les principes ci-dessous doivent vous guider lorsque la règle précise n'est pas claire. Dans le doute, demandez." },

      { type: "h2", text: "1. Nos principes directeurs" },
      { type: "p", text: "Nous croyons que de bonnes affaires se bâtissent sur quelques principes simples : dire la vérité, tenir ses promesses, bien traiter les gens et assumer ses erreurs. Le Code traduit ces principes en gestes concrets." },

      { type: "h2", text: "2. Honnêteté et intégrité" },
      { type: "p", text: "Soyez sincère. Ne déformez pas, n'exagérez pas et n'omettez pas d'informations importantes dans vos communications avec la clientèle, les partenaires, les collègues ou les organismes de réglementation. Si vous faites une erreur, dites-le — tôt et clairement. Nous ne sanctionnerons jamais une personne qui reconnaît une erreur de bonne foi." },

      { type: "h2", text: "3. Respect et inclusion" },
      { type: "p", text: "Traitez chaque collègue, client et partenaire avec dignité. La discrimination, le harcèlement et les représailles — notamment en lien avec les motifs protégés par " + j.hrStatFR + " — sont interdits. Notre Politique de prévention du harcèlement, de la discrimination et de la violence en milieu de travail en précise les détails." },

      { type: "h2", text: "4. Conflits d'intérêts" },
      { type: "p", text: "Évitez les situations où vos intérêts personnels — financiers, familiaux ou autres — pourraient raisonnablement entrer en conflit avec vos obligations envers la Société ou notre clientèle. Dans le doute, divulguez. La divulgation est presque toujours la bonne réponse; la dissimulation, presque jamais. Signalez les conflits réels ou potentiels à votre gestionnaire ou à **{{ethics_contact_name}}**." },

      { type: "h2", text: "5. Corruption, cadeaux et hospitalité" },
      { type: "p", text: "Nous ne donnons ni n'acceptons de pots-de-vin, de commissions illicites ou de quoi que ce soit qui compromettrait ou semblerait compromettre notre jugement. Des cadeaux et marques d'hospitalité modestes et peu fréquents sont acceptables s'ils sont offerts ouvertement, n'entraînent aucune attente de réciprocité et sont conformes à la loi anticorruption, notamment la **Loi sur la corruption d'agents publics étrangers**, L.C. 1998, ch. 34 (le cas échéant). L'argent comptant ou ses équivalents ne sont jamais acceptables." },

      { type: "h2", text: "6. Concurrence loyale" },
      { type: "p", text: "Soyez concurrentiels par la qualité de ce que nous offrons. N'induisez pas la clientèle en erreur, ne dénigrez pas injustement les concurrents et ne promettez pas ce que nous ne pouvons tenir. Lorsqu'un contrat est en vigueur, nous agissons de bonne foi et avec honnêteté, conformément à *Bhasin c. Hrynew*, 2014 CSC 71 et *C.M. Callow Inc. c. Zollinger*, 2020 CSC 45." },

      { type: "h2", text: "7. Protection des actifs de la Société" },
      { type: "p", text: "Utilisez les actifs de la Société — argent, équipement, temps, information — à des fins professionnelles légitimes. Prenez-en soin. Ne détournez pas de fonds et n'imputez pas de dépenses personnelles à la Société." },

      { type: "h2", text: "8. Livres et registres fidèles" },
      { type: "p", text: "Nos documents financiers et commerciaux doivent refléter fidèlement les opérations sous-jacentes. Ne créez pas d'inscription fausse ou trompeuse, et ne demandez à personne de le faire. Cela vaut pour les notes de frais, les feuilles de temps, les factures clients, les rapports internes — tout." },

      { type: "h2", text: "9. Confidentialité et vie privée" },
      { type: "p", text: "Gardez confidentiels les renseignements confidentiels — cela comprend les renseignements sur la clientèle, les collègues, les prix, les produits non lancés, et tout ce que la Société n'a pas rendu public. Traitez les renseignements personnels conformément à " + j.privacyStatFR + ". En cas de doute, présumez qu'il ne faut pas partager et demandez." },

      { type: "h2", text: "10. Information privilégiée" },
      { type: "p", text: "Si vous détenez, grâce à votre travail, des renseignements importants non publics sur la Société ou sur une autre société cotée, n'effectuez aucune transaction fondée sur ceux-ci et ne les partagez pas avec des personnes susceptibles d'en faire usage. Cela peut constituer une infraction criminelle et constitue, en tout état de cause, une violation du Code." },

      { type: "h2", text: "11. Santé, sécurité et environnement" },
      { type: "p", text: "Respectez nos politiques en matière de santé, de sécurité et d'environnement. Parlez des conditions dangereuses. Vous avez le droit de refuser un travail dangereux en vertu de la législation applicable, notamment " + j.harassStatFR + "." },

      { type: "h2", text: "12. Activité politique" },
      { type: "p", text: "Vos opinions et activités politiques personnelles vous appartiennent. Ne les présentez pas comme celles de la Société. N'utilisez pas les ressources ni le temps de la Société à des fins politiques personnelles, et n'exercez aucune pression politique sur vos collègues. Toute contribution de la Société à des campagnes ou partis politiques doit être approuvée par **{{political_approval_authority}}**." },

      { type: "h2", text: "13. Signalement d'une préoccupation" },
      { type: "p", text: "Si vous observez ce qui est — ou pourrait être — une violation du Code, signalez-le. Vous pouvez en parler à votre gestionnaire, aux RH, au service juridique ou (pour un signalement anonyme) à **{{whistleblower_channel}}**. Nous prendrons les signalements au sérieux, protégerons votre identité dans la mesure permise par la loi et n'exercerons aucune représaille contre toute personne qui signale de bonne foi. La représaille est elle-même une violation du Code." },

      { type: "h2", text: "14. Conséquences d'une violation" },
      { type: "p", text: "Les violations peuvent entraîner des mesures disciplinaires, pouvant aller jusqu'à la cessation d'emploi. Toute mesure sera proportionnée à la violation et prise conformément à notre politique de discipline progressive et à la loi applicable. Lorsque l'inconduite atteint le seuil de la cause juste et suffisante, *McKinley c. BC Tel*, 2001 CSC 38 fournit le test contextuel qui guide nos décisions, et les droits légaux auxquels il ne peut être renoncé seront respectés. Cela s'applique en " + j.nameFR + " en vertu de " + j.govLawFR + "." },
    ],

    legalNotesEN: [
      {
        heading: "1. Code of conduct as just cause — McKinley",
        body: "A breach of the code of conduct can support just cause for dismissal, but only if the breach is of sufficient gravity to warrant termination given all the circumstances (**McKinley v. BC Tel**, 2001 SCC 38). Minor violations that have been condoned, or that fall below the level of dishonesty going to the root of the employment relationship, will not support summary dismissal. The code should be communicated to all employees, kept up to date, and enforced consistently — inconsistent enforcement undermines the employer's ability to rely on it for cause.",
      },
      {
        heading: "2. Duty of good faith — Bhasin and Callow",
        body: "**Bhasin v. Hrynew**, 2014 SCC 71: the organizing principle of good faith in contract requires honest performance of contractual obligations. **C.M. Callow Inc. v. Zollinger**, 2020 SCC 45: a party to a contract must not actively mislead the other party about matters that are the subject of a contractual right. The code's commitments to fair dealing and honest communication in s. 4 and 6 reflect these principles. A manager who actively misleads an employee about their performance or job security in bad faith may expose the employer to additional damages.",
      },
      {
        heading: "3. Anti-corruption — CFPOA",
        body: "**Corruption of Foreign Public Officials Act**, S.C. 1998, c. 34 (**CFPOA**): it is an offence for a person in Canada or a Canadian citizen anywhere to bribe a foreign public official to obtain or retain a business advantage. The CFPOA has broad extraterritorial reach. The RCMP's International Anti-Corruption Unit is the primary enforcement body. Convictions can result in imprisonment up to 14 years. **Action:** The code's anti-bribery provisions (s. 5) must be communicated to all employees with international responsibilities; a separate anti-corruption policy may be warranted for companies with significant international operations.",
      },
      {
        heading: "4. Insider trading — Securities Acts and Criminal Code",
        body: "Trading on material non-public information (MNPI) is prohibited under provincial Securities Acts (e.g., **Ontario Securities Act**, R.S.O. 1990, c. S.5, ss. 76–77; **BC Securities Act**; **Alberta Securities Act**) and the **Criminal Code**, R.S.C. 1985, c. C-46, s. 382.1. 'Material' information is information that would reasonably be expected to have a significant effect on the market price of a security. **Québec** has ARLS art. 124 for employment protections; insider trading rules also apply federally and through the LACC (Loi sur l'accès). **Action:** Confirm the code's insider information provisions (s. 9) are supplemented by a formal securities trading policy for issuers and their employees and contractors.",
      },
      {
        heading: "5. Whistleblower protections — jurisdiction-specific",
        body: "**Ontario**: ESA s. 74 (reprisal for ESA complaint), OHSA s. 50 (reprisal for H&S complaint). **Québec**: ARLS art. 124 (reprisal for ARLS complaint), CNESST enforces. **Federal**: CLC s. 425.1 (whistleblower protection for employees reporting health and safety violations); *Public Servants Disclosure Protection Act* applies to federal public servants. **Note**: There is no comprehensive private-sector whistleblower protection statute in Ontario, Québec, BC, or Alberta outside of specific statutory rights (like ESA s. 74). **Action:** The code should direct employees to internal reporting channels and confirm the anti-retaliation commitment; consider a separate whistleblower policy aligned with statutory protections in each jurisdiction.",
      },
      {
        heading: "6. Manner of dismissal — Honda Canada conduct-related terminations",
        body: "If an employee is terminated for a code of conduct violation, the manner of dismissal matters. **Honda Canada Inc. v. Keays**, 2008 SCC 39: bad faith conduct in the manner of dismissal (including making unfounded allegations of cause, conducting a humiliating investigation, or publicizing the reason) can result in additional damages (typically 24 months of pay for egregious bad faith). Ensure investigations are conducted fairly, documented thoroughly, the employee is given an opportunity to respond before a termination decision is made, and the dismissal is carried out with dignity.",
      },
    ],

    legalNotesFR: [
      {
        heading: "1. Code de conduite comme cause juste — McKinley",
        body: "Une violation du code de conduite peut constituer une cause juste de congédiement, mais seulement si la violation est d'une gravité suffisante pour justifier la cessation d'emploi compte tenu des circonstances (**McKinley c. BC Tel**, 2001 CSC 38). Les violations mineures tolérées, ou qui ne touchent pas à la racine même de la relation d'emploi, ne justifieront pas un congédiement immédiat. Le code doit être communiqué à tous les salarié(e)s, maintenu à jour et appliqué de façon uniforme — l'application inégale affaiblit la capacité de l'employeur à s'y fier.",
      },
      {
        heading: "2. Obligation de bonne foi — Bhasin et Callow",
        body: "**Bhasin c. Hrynew**, 2014 CSC 71 : le principe directeur de bonne foi en matière contractuelle exige une exécution honnête des obligations. **C.M. Callow Inc. c. Zollinger**, 2020 CSC 45 : une partie ne doit pas induire activement l'autre en erreur sur des questions faisant l'objet d'un droit contractuel. Les engagements du code en matière d'équité et d'honnêteté (art. 4 et 6) reflètent ces principes. Un(e) gestionnaire qui trompe activement un(e) salarié(e) de mauvaise foi peut exposer l'employeur à des dommages supplémentaires.",
      },
      {
        heading: "3. Anticorruption — LCAPE",
        body: "**Loi sur la corruption d'agents publics étrangers**, L.C. 1998, ch. 34 (**LCAPE**) : il est interdit à toute personne au Canada ou à tout citoyen canadien à l'étranger de soudoyer un agent public étranger pour obtenir ou conserver un avantage commercial. La LCAPE a une portée extraterritoriale étendue. Les condamnations peuvent entraîner jusqu'à 14 ans d'emprisonnement. **Action :** Les dispositions anticorruption du code (art. 5) doivent être communiquées à tous les salarié(e)s ayant des responsabilités internationales; une politique anticorruption distincte peut être justifiée pour les entreprises ayant d'importantes activités internationales.",
      },
      {
        heading: "4. Délit d'initié — Lois sur les valeurs mobilières et Code criminel",
        body: "La négociation sur la foi de renseignements importants non publics est interdite en vertu des lois provinciales sur les valeurs mobilières (p. ex., *Loi sur les valeurs mobilières*, L.R.O. 1990, chap. S.5, art. 76–77) et du **Code criminel**, L.R.C. 1985, ch. C-46, art. 382.1. Les renseignements « importants » sont ceux qui auraient raisonnablement pour effet d'influencer significativement le cours d'un titre. Au Québec, l'art. 124 de la LNT prévoit des protections. **Action :** Confirmer que les dispositions sur les renseignements privilegiés (art. 10) sont complétées par une politique formelle de négociation de valeurs mobilières.",
      },
      {
        heading: "5. Protection des lanceurs d'alerte — propre à chaque juridiction",
        body: "**Ontario :** LNE, art. 74 (représailles pour plainte), LSST, art. 50 (représailles pour SST). **Québec :** LNT, art. 124 (représailles), CNESST applique. **Fédéral :** CCT, art. 425.1 (protection pour signalements SST). **Note :** Il n'existe pas de loi autonome de protection des lanceurs d'alerte dans le secteur privé en Ontario, Québec, C.-B. ou Alberta, en dehors des droits statutaires spécifiques (comme art. 74 de la LNE). **Action :** Le code doit diriger les salarié(e)s vers les canaux de signalement internes et confirmer l'engagement contre les représailles; une politique distincte alignée avec les protections légales peut être nécessaire.",
      },
      {
        heading: "6. Mode de congédiement — Honda Canada cessation pour inconduite",
        body: "Si un(e) salarié(e) est congédié(e) pour violation du code de conduite, le mode de congédiement importe. **Honda Canada Inc. c. Keays**, 2008 CSC 39 : la mauvaise foi lors du congédiement (allégations non fondées, enquête humiliante, divulgation des motifs) peut entraîner des dommages supplémentaires (typiquement 24 mois de salaire). S'assurer que les enquêtes sont menées équitablement, documentées soigneusement, que la personne salariée a la possibilité de répondre avant la décision de congédiement, et que le congédiement est effectué avec dignité.",
      },
    ],
  };
};
