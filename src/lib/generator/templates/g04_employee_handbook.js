// G04 — Employee Handbook (policy compendium, no signature block)
export default function(j) {
  return {
    id: "T04",
    slug: "Employee_Handbook",
    kind: "policy",
    titleEN: "Employee Handbook",
    titleFR: "Guide de l'employé(e)",

    bodyEN: [
      { type: "h1", text: "{{employer_legal_name}} Employee Handbook", align: "center" },
      { type: "p", text: "**Version:** {{handbook_version}} — **Effective:** {{handbook_effective_date}}", align: "center" },

      { type: "h2", text: "A welcome, and what this handbook is (and isn't)" },
      { type: "p", text: "Welcome. We're genuinely glad you're here. This handbook is a plain-language guide to how we work together at **{{employer_legal_name}}** — our values, our expectations, and the everyday things you need to know as a member of this team. It's meant to make your work life easier, not harder." },
      { type: "p", text: "This handbook is not a contract. Your employment agreement and the law govern your legal rights and obligations. Where this handbook summarizes a law or a policy, the actual statute or the full policy controls if there is ever any inconsistency. We may update this handbook from time to time; we'll give you reasonable notice of material changes." },

      { type: "h2", text: "1. Who we are and what we stand for" },
      { type: "p", text: "Our mission is **{{company_mission}}**. The values that guide us are **{{company_values}}**. We hold ourselves accountable to these values in how we treat each other, our customers, and the communities we work in." },

      { type: "h2", text: "2. Respect, inclusion and dignity" },
      { type: "p", text: "Everyone at **{{employer_legal_name}}** has the right to work in a place that is free from discrimination, harassment and violence. That includes discrimination based on any ground protected by the **Canadian Human Rights Act**, R.S.C. 1985, c. H-6 or the provincial human rights statute that applies to your workplace (for example, " + j.hrStatEN + ")." },
      { type: "p", text: "We will reasonably accommodate needs related to these protected grounds up to the point of undue hardship, in accordance with the Meiorin test. If you need an accommodation, please reach out to **{{hr_contact_name}}** at **{{hr_contact_email}}** — we'll work it through together, confidentially." },

      { type: "h2", text: "3. How to raise a concern" },
      { type: "p", text: "If something feels wrong — a safety issue, a human-rights concern, a question about ethics, a concern about how you or a colleague are being treated — please speak up. You can talk to your manager, to HR, or to any leader you trust. You will not be retaliated against for raising a concern in good faith; retaliation itself is a policy violation and in many cases unlawful." },

      { type: "h2", text: "4. Working hours, pay and timekeeping" },
      { type: "p", text: "Our standard working week is **{{standard_hours_per_week}}** hours. You will be paid **{{pay_frequency}}** by direct deposit. Overtime, where applicable, is paid in accordance with the employment standards legislation that applies to your province. " + j.overtimeNoteEN + " Please record your hours accurately — we rely on your records to pay you correctly and meet our legal obligations." },

      { type: "h2", text: "5. Time off and statutory leaves" },
      { type: "p", text: "We want you to actually take your time off. You are entitled to all leaves of absence required by the employment standards legislation that applies to your province, including (without limitation) pregnancy, parental, family caregiver, family responsibility, sick, bereavement, domestic or sexual violence, and reservist leaves. Specific eligibility, duration and pay terms are set out in our Vacation and Leave Policy." },

      { type: "h2", text: "6. Flexibility and remote work" },
      { type: "p", text: "Where your role allows it, we support flexible and remote work arrangements. The details — including eligibility, equipment, right to disconnect and electronic monitoring — are covered in our Remote Work Policy. " + ( j.rightToDisconnect ? "In " + j.nameEN + ", our right to disconnect policy is provided in accordance with " + j.rtdStatEN + ", and our electronic monitoring policy under " + j.emStatEN + "." : "Your jurisdiction does not have a statutory right-to-disconnect or electronic monitoring requirement; our policies follow general best practices." ) },

      { type: "h2", text: "7. Health, safety and wellbeing" },
      { type: "p", text: "Your safety is non-negotiable. We comply with the applicable occupational health and safety statute in your jurisdiction (for example, " + j.nameEN + " is governed by the " + j.statuteEN + "). You have the right to know about hazards, to participate in health-and-safety decisions, and to refuse unsafe work." },
      { type: "p", text: "Rest and mental health are part of safety. We provide access to an Employee and Family Assistance Program and encourage you to take time away when you need it. Asking for help is a sign of strength." },

      { type: "h2", text: "8. Vacation entitlements" },
      { type: "p", text: "Your vacation entitlements are set by " + j.vacStatEN + " and your employment agreement. Minimum statutory entitlement for " + j.code + " is " + j.vacMinWeeks + " weeks per year. " + j.vacEnhancedEN + " You earn vacation on each anniversary of your hire date. We encourage you to take your vacation regularly — it's good for you and good for the team. Time off is approved by your manager based on operational needs and reasonable notice." },

      { type: "h2", text: "9. Paid sick leave" },
      { type: "p", text: "Your sick leave entitlements follow " + j.sickLeaveEN },

      { type: "h2", text: "10. Harassment, discrimination and violence prevention" },
      { type: "p", text: "We have a separate Workplace Harassment, Discrimination and Violence Prevention Policy that sets out how we prevent these behaviours, how to report them, how we investigate, and how we protect confidentiality and privacy. That policy complies with " + j.harassStatEN + ". Reports of harassment can be made to your manager, HR, or a designated third-party investigator. " + j.harassBodyEN + " oversees compliance. Violations can result in disciplinary action up to and including termination." },

      { type: "h2", text: "11. Confidentiality and information security" },
      { type: "p", text: "Keeping our customers' and colleagues' information safe is part of your job. Treat confidential information as confidential — including after you leave the Company. Don't share customer data in places it doesn't belong. If you think information has been lost or exposed, tell **{{hr_contact_name}}** or **{{it_security_contact}}** immediately. We will not punish you for reporting a good-faith concern." },

      { type: "h2", text: "12. Privacy of your personal information" },
      { type: "p", text: "We collect and use personal information about you only for legitimate employment purposes, in accordance with " + j.privacyStatEN + "." },
      { type: "p", text: "You have the right to access and correct your personal information. Contact **{{privacy_contact_name}}** at **{{privacy_contact_email}}** if you would like to do so." },

      { type: "h2", text: "13. Technology and responsible use" },
      { type: "p", text: "Use company technology — laptops, phones, email, collaboration tools — for legitimate work purposes. Reasonable, incidental personal use is fine, as long as it doesn't interfere with your work or our systems. Don't install unapproved software, don't share passwords, and don't try to bypass security controls. If you're not sure whether something is okay, ask — we'd rather have the conversation than the incident." },

      { type: "h2", text: "14. Conflicts of interest and outside activities" },
      { type: "p", text: "We trust you to act in the Company's best interests while you work here. Please tell us about anything that could reasonably look like a conflict of interest — a financial interest in a competitor, supplier, or customer; a side business in the same field; a close personal relationship that affects your role. Disclosure is almost always the answer; we'll figure out how to manage it together." },

      { type: "h2", text: "15. Performance, growth and feedback" },
      { type: "p", text: "We believe feedback should be frequent, specific and kind. You'll get regular feedback from your manager and a more structured performance conversation at least **{{review_frequency}}**. We're committed to helping you grow — if there's a skill you want to develop, tell us, and we'll do our best to create the opportunity. If there's a performance concern, we'll raise it early and clearly, and work with you on a plan. Serious concerns follow our Progressive Discipline Policy." },

      { type: "h2", text: "16. Ending the employment relationship" },
      { type: "p", text: "We hope you'll be here a long time. If things change, we commit to handling the ending with honesty and dignity." },
      { type: "p", text: "If you decide to move on, please give us the notice set out in your employment agreement or the minimum required by law, so we can plan for the transition. If we ever need to end your employment, we will comply with " + j.termStatEN + ", including any notice, pay in lieu, and statutory severance required, and — where applicable — the common-law reasonable notice test set out in Bardal v. Globe & Mail Ltd. Termination clauses in our employment agreements are drafted with applicable case law in mind." },

      { type: "h2", text: "17. Whistleblower protection" },
      { type: "p", text: "If you see something serious — fraud, a safety hazard, a regulatory breach, a violation of law — you are encouraged and protected to report it. You can report to your manager, HR, or **{{whistleblower_contact}}**. We will not retaliate against you for a good-faith report, and we will protect your identity to the extent permitted by law." },

      { type: "h2", text: "18. How this handbook is maintained" },
      { type: "p", text: "This handbook is reviewed at least annually. We may update policies to reflect changes in the law, our business, or lessons learned. We will tell you about material changes with reasonable notice. The most current version is always available at **{{handbook_url}}**." },

      { type: "h2", text: "19. Acknowledgement" },
      { type: "p", text: "By working at **{{employer_legal_name}}**, you acknowledge that you have received this handbook, that you have had the opportunity to read it, and that you will follow the policies in it and the spirit behind them. If you have questions — about anything — please ask." },

      { type: "h2", text: "20. A final word" },
      { type: "p", text: "A handbook can only go so far. Most of what makes this a good place to work is what you bring to it: curiosity, care, honesty, and your willingness to look out for each other. Thank you for being part of it." },
    ],

    bodyFR: [
      { type: "h1", text: "Guide de l'employé(e) de {{employer_legal_name}}", align: "center" },
      { type: "p", text: "**Version :** {{handbook_version}} — **Date d'entrée en vigueur :** {{handbook_effective_date}}", align: "center" },

      { type: "h2", text: "Bienvenue — et ce que ce guide est (et n'est pas)" },
      { type: "p", text: "Bienvenue. Nous sommes sincèrement heureux de vous accueillir. Le présent guide est un document en langage clair qui décrit notre manière de travailler ensemble chez **{{employer_legal_name}}** — nos valeurs, nos attentes et les repères quotidiens à connaître comme membre de l'équipe. Il est là pour vous simplifier la vie au travail, pas la compliquer." },
      { type: "p", text: "Ce guide n'est pas un contrat. Votre contrat de travail et la loi régissent vos droits et obligations. Lorsqu'un résumé d'une loi ou d'une politique figure ici, la loi ou la politique complète prévaut en cas d'incohérence. Nous pouvons mettre à jour ce guide périodiquement; nous vous aviserons raisonnablement de tout changement important." },

      { type: "h2", text: "1. Qui nous sommes et ce que nous défendons" },
      { type: "p", text: "Notre mission est **{{company_mission}}**. Nos valeurs sont **{{company_values}}**. Nous nous en tenons responsables dans nos rapports avec chacun, notre clientèle et les milieux où nous œuvrons." },

      { type: "h2", text: "2. Respect, inclusion et dignité" },
      { type: "p", text: "Chaque personne chez **{{employer_legal_name}}** a le droit de travailler dans un milieu exempt de discrimination, de harcèlement et de violence. Cela inclut la discrimination fondée sur un motif protégé par la **Loi canadienne sur les droits de la personne**, L.R.C. 1985, ch. H-6 ou par la loi provinciale applicable (par exemple, " + j.hrStatFR + ")." },
      { type: "p", text: "Nous accommoderons raisonnablement les besoins liés à ces motifs, jusqu'à la contrainte excessive, conformément au test Meiorin. Si vous avez besoin d'un accommodement, communiquez avec **{{hr_contact_name}}** à **{{hr_contact_email}}** — nous en discuterons ensemble, en toute confidentialité." },

      { type: "h2", text: "3. Comment soulever une préoccupation" },
      { type: "p", text: "Si quelque chose ne va pas — un enjeu de sécurité, une préoccupation en matière de droits de la personne, une question d'éthique, le traitement que vous ou un collègue recevez — parlez-en. Vous pouvez vous adresser à votre gestionnaire, aux RH ou à tout dirigeant en qui vous avez confiance. Aucune représaille ne sera exercée pour une préoccupation soulevée de bonne foi; la représaille est elle-même une violation de politique et, dans bien des cas, illégale." },

      { type: "h2", text: "4. Heures de travail, paie et pointage" },
      { type: "p", text: "Notre semaine de travail régulière est de **{{standard_hours_per_week}}** heures. Vous êtes payé(e) **{{pay_frequency}}** par dépôt direct. Les heures supplémentaires, le cas échéant, sont payées conformément à la législation applicable. " + j.overtimeNoteFR + " Veuillez inscrire vos heures avec exactitude — vos relevés permettent de vous payer correctement et de respecter nos obligations légales." },

      { type: "h2", text: "5. Congés et absences protégées" },
      { type: "p", text: "Nous souhaitons que vous preniez réellement vos congés. Vous avez droit à tous les congés prévus par la législation applicable, y compris (sans s'y limiter) les congés de maternité, de paternité, parentaux, de proche aidant, pour obligations familiales, de maladie, de deuil, pour violence conjugale ou sexuelle, et à titre de réserviste. L'admissibilité, la durée et les conditions de paiement figurent dans notre Politique de vacances et de congés." },

      { type: "h2", text: "6. Flexibilité et travail à distance" },
      { type: "p", text: "Lorsque le poste le permet, nous soutenons le travail flexible et à distance. Les détails — admissibilité, équipement, droit à la déconnexion et surveillance électronique — figurent dans notre Politique de travail à distance. " + ( j.rightToDisconnect ? "En " + j.nameFR + ", la politique de droit à la déconnexion est offerte conformément à " + j.rtdStatFR + ", et la politique de surveillance électronique, en vertu de " + j.emStatFR + "." : "Votre juridiction n'a pas d'exigence légale en matière de droit à la déconnexion ou de surveillance électronique; nos politiques suivent les meilleures pratiques générales." ) },

      { type: "h2", text: "7. Santé, sécurité et mieux-être" },
      { type: "p", text: "Votre sécurité n'est pas négociable. Nous respectons la loi applicable en matière de santé et sécurité au travail dans votre juridiction (par exemple, " + j.nameFR + " est régie par la " + j.statuteFR + "). Vous avez le droit d'être informé(e) des dangers, de participer aux décisions de santé et sécurité, et de refuser un travail dangereux." },
      { type: "p", text: "Le repos et la santé mentale font partie de la sécurité. Nous offrons un Programme d'aide aux employés et à la famille et nous vous encourageons à prendre du repos quand c'est nécessaire. Demander de l'aide est un signe de force." },

      { type: "h2", text: "8. Droits aux vacances" },
      { type: "p", text: "Vos droits aux vacances sont établis par " + j.vacStatFR + " et votre contrat de travail. Le droit minimal légal pour " + j.code + " est " + j.vacMinWeeks + " semaines par année. " + j.vacEnhancedFR + " Vous accumulez des vacances à chaque anniversaire d'embauche. Nous vous encourageons à prendre vos vacances régulièrement — c'est bon pour vous et pour l'équipe. Les congés sont approuvés par votre gestionnaire selon les besoins opérationnels et un délai raisonnable." },

      { type: "h2", text: "9. Congés de maladie payés" },
      { type: "p", text: "Vos droits au congé de maladie suivent : " + j.sickLeaveFR },

      { type: "h2", text: "10. Prévention du harcèlement, de la discrimination et de la violence" },
      { type: "p", text: "Nous avons une Politique distincte de prévention du harcèlement, de la discrimination et de la violence qui explique la prévention, le signalement, les enquêtes et la protection de la confidentialité. Cette politique respecte " + j.harassStatFR + ". Les signalements peuvent être adressés à votre gestionnaire, aux RH ou à un enquêteur tiers désigné. " + j.harassBodyFR + " supervise la conformité. Les violations peuvent entraîner des mesures disciplinaires, y compris le congédiement." },

      { type: "h2", text: "11. Confidentialité et sécurité de l'information" },
      { type: "p", text: "Préserver la sécurité des renseignements de notre clientèle et de vos collègues fait partie de votre travail. Traitez les renseignements confidentiels comme tels — y compris après votre départ. Ne partagez pas de données clients là où elles n'ont pas leur place. Si vous pensez qu'un renseignement a été perdu ou exposé, avisez immédiatement **{{hr_contact_name}}** ou **{{it_security_contact}}**. Nous ne sanctionnerons pas un signalement fait de bonne foi." },

      { type: "h2", text: "12. Protection de vos renseignements personnels" },
      { type: "p", text: "Nous recueillons et utilisons vos renseignements personnels uniquement à des fins d'emploi légitimes, conformément à " + j.privacyStatFR + "." },
      { type: "p", text: "Vous avez le droit d'accéder à vos renseignements personnels et de les faire corriger. Communiquez avec **{{privacy_contact_name}}** à **{{privacy_contact_email}}** pour ce faire." },

      { type: "h2", text: "13. Technologie et utilisation responsable" },
      { type: "p", text: "Utilisez les technologies de l'entreprise — ordinateurs, téléphones, courriels, outils collaboratifs — à des fins de travail légitimes. Un usage personnel raisonnable et accessoire est acceptable, s'il n'interfère pas avec votre travail ou nos systèmes. N'installez pas de logiciels non approuvés, ne partagez pas vos mots de passe et ne contournez pas les mesures de sécurité. En cas de doute, posez la question — mieux vaut la conversation que l'incident." },

      { type: "h2", text: "14. Conflits d'intérêts et activités parallèles" },
      { type: "p", text: "Nous vous faisons confiance pour agir dans le meilleur intérêt de l'entreprise. Signalez tout ce qui pourrait raisonnablement ressembler à un conflit d'intérêts — un intérêt financier dans un concurrent, fournisseur ou client; une activité secondaire dans le même secteur; une relation personnelle étroite qui influe sur votre rôle. La divulgation est presque toujours la solution; nous trouverons ensemble la bonne manière de gérer la situation." },

      { type: "h2", text: "15. Rendement, développement et rétroaction" },
      { type: "p", text: "Nous croyons à une rétroaction fréquente, précise et bienveillante. Vous recevrez une rétroaction régulière de votre gestionnaire ainsi qu'une conversation structurée au moins **{{review_frequency}}**. Nous voulons vous aider à grandir — si vous souhaitez développer une compétence, dites-le, nous ferons de notre mieux pour créer l'occasion. Toute préoccupation sera soulevée tôt et clairement, avec un plan de soutien. Les problèmes sérieux suivent notre politique de discipline progressive." },

      { type: "h2", text: "16. Fin de la relation d'emploi" },
      { type: "p", text: "Nous espérons que vous serez parmi nous longtemps. Si les choses changent, nous nous engageons à gérer la fin avec honnêteté et dignité." },
      { type: "p", text: "Si vous décidez de partir, veuillez donner le préavis prévu à votre contrat ou le minimum légal, afin que nous puissions planifier la transition. Si nous devions mettre fin à votre emploi, nous respecterions " + j.termStatFR + ", y compris tout préavis, indemnité en tenant lieu et indemnité de départ exigés, ainsi que — le cas échéant — le test de common law relatif au délai de congé raisonnable. Nos clauses de cessation sont rédigées à la lumière de la jurisprudence applicable." },

      { type: "h2", text: "17. Protection des dénonciateurs" },
      { type: "p", text: "Si vous êtes témoin d'un manquement sérieux — fraude, danger pour la sécurité, contravention réglementaire ou légale — vous êtes encouragé(e) et protégé(e) à le signaler. Vous pouvez vous adresser à votre gestionnaire, aux RH ou à **{{whistleblower_contact}}**. Aucune représaille ne sera exercée pour un signalement de bonne foi, et nous protégerons votre identité dans la mesure permise par la loi." },

      { type: "h2", text: "18. Comment ce guide est tenu à jour" },
      { type: "p", text: "Le guide est révisé au moins une fois par année. Nous pouvons mettre à jour les politiques pour tenir compte des changements législatifs, de notre entreprise ou des leçons apprises. Vous serez avisé(e) raisonnablement des changements importants. La version la plus récente est toujours disponible au **{{handbook_url}}**." },

      { type: "h2", text: "19. Accusé de réception" },
      { type: "p", text: "En travaillant chez **{{employer_legal_name}}**, vous reconnaissez avoir reçu le présent guide, avoir eu l'occasion de le lire et avoir l'intention d'en respecter les politiques et l'esprit. Si vous avez des questions — sur n'importe quel point — demandez." },

      { type: "h2", text: "20. Un dernier mot" },
      { type: "p", text: "Un guide ne peut tout dire. Ce qui fait de cet endroit un bon milieu de travail, c'est ce que vous y apportez : votre curiosité, votre attention aux autres, votre honnêteté et votre volonté de prendre soin les uns des autres. Merci d'en faire partie." },
    ],
    legalNotesEN: [
      {
        heading: "1. Handbook as contract — disclaimers",
        body: "An employee handbook can be incorporated as part of the employment contract if it uses mandatory language and is referenced in the employment agreement. To avoid unintended contractual obligations, the handbook includes a prominent disclaimer that it is a policy document and does not constitute an employment contract or guarantee of continued employment. Policies that conflict with the employment agreement should be reviewed before issuance.",
      },
      {
        heading: "2. Statutory leaves — multi-jurisdictional summary",
        body: "Minimum leave entitlements vary significantly by province. " + j.code + " follows: " + j.parentalStatEN + ". The handbook leave section references the applicable statute and directs employees to HR for jurisdiction-specific entitlements. Employer policies often exceed statutory minimums.",
      },
      {
        heading: "3. Right to disconnect — " + j.code,
        body: ( j.rightToDisconnect ? j.code + " employers with 25 or more employees must have a written right-to-disconnect policy under " + j.rtdStatEN + ". The handbook should incorporate this policy or cross-reference it. The policy must address the expectation that employees will not routinely be required to respond to work communications outside of their scheduled hours. Maximum fine for contravention: $100,000 (corporation)." : j.code + " does not have a statutory right-to-disconnect requirement; the handbook describes the employer's discretionary right-to-disconnect policy." ),
      },
      {
        heading: "4. Accommodation policy — Meiorin standard",
        body: "The handbook's accommodation and respect sections must be consistent with the employer's legal duty to accommodate under applicable Human Rights Codes to the point of undue hardship under the Meiorin standard. The handbook should describe the accommodation process (request, documentation, interactive process) rather than stating simply that accommodation 'will be provided.' An overly general accommodation statement creates an expectation that cannot always be met.",
      },
      {
        heading: "5. Workplace harassment — jurisdiction-specific compliance",
        body: "The handbook references the employer's Workplace Harassment, Discrimination and Violence Prevention Policy. " + j.code + " compliance follows: " + j.harassStatEN + ". The handbook should incorporate this program or cross-reference the standalone policy. Failure to maintain the program can result in orders from a regulatory inspector and fines.",
      },
      {
        heading: "6. Electronic monitoring policy — " + j.code,
        body: ( j.electronicMon ? j.code + " employers with 25 or more employees must have a written electronic monitoring policy under " + j.emStatEN + ". The policy must be provided to each employee within 30 days of hire and within 30 days of any update. The handbook should cross-reference this policy. The electronic monitoring policy describes what monitoring occurs — it does not authorize monitoring that would otherwise violate privacy legislation." : j.code + " does not have a statutory electronic monitoring policy requirement; employers should follow best practices and privacy legislation when implementing monitoring." ),
      },
      {
        heading: "7. Privacy — PIPEDA and provincial equivalents",
        body: "Privacy protection follows: " + j.privacyStatEN + ". The handbook's privacy section should be aligned with the applicable legislation and should describe how employee personal information is collected, used, and retained. Employees should be informed of their right to access and correct personal information.",
      },
      {
        heading: "8. Overtime and work-hour entitlements",
        body: "For " + j.code + ", statutory overtime rules are: " + j.overtimeNoteEN + " Employers should track hours carefully and ensure overtime rates comply with the applicable statute. Misclassification of employees as exempt from overtime can result in wage claims and administrative penalties.",
      },
      {
        heading: "9. Vacation and paid time off",
        body: "Vacation entitlements for " + j.code + " follow: " + j.vacStatEN + ". Minimum statutory vacation is " + j.vacMinPct + " per year (or " + j.vacMinWeeks + " weeks). " + j.vacEnhancedEN + " Employers must track accrual, allow employees to take vacation, and pay accrued vacation upon termination (or payout allowed by statute). Vacation buyback is generally not permitted unless the employment is terminated.",
      },
      {
        heading: "10. Sick leave and accommodation for illness",
        body: "For " + j.code + ", sick leave entitlements are: " + j.sickLeaveEN + " Employers must distinguish between sick leave (for the employee's own illness), family leave (for caring for a family member), and other protected leaves. Abuse of sick leave policies may be addressed through progressive discipline, but employees' statutory rights cannot be restricted.",
      },
    ],
    legalNotesFR: [
      {
        heading: "1. Manuel comme contrat — clauses de non-responsabilité",
        body: "Un manuel de l'employé peut être intégré au contrat de travail s'il emploie un langage impératif et est référencé dans le contrat de travail. Pour éviter des obligations contractuelles involontaires, le manuel doit contenir une mise en garde prominente indiquant qu'il s'agit d'un document de politique et non d'un contrat de travail ou d'une garantie de maintien en emploi.",
      },
      {
        heading: "2. Congés légaux — résumé multiprovincial",
        body: "Les droits minimaux aux congés varient selon la province. Pour " + j.code + " : " + j.parentalStatFR + ". La section sur les congés doit référencer le texte législatif applicable et diriger les salarié(e)s vers les RH pour les droits propres à la juridiction. Les politiques patronales dépassent souvent les minimums légaux.",
      },
      {
        heading: "3. Droit à la déconnexion — " + j.code,
        body: ( j.rightToDisconnect ? j.code + " : les employeurs de 25 salariés ou plus doivent avoir une politique écrite en vertu de " + j.rtdStatFR + ". Le manuel doit incorporer cette politique ou y faire renvoi. Amende maximale en cas de contravention : 100 000 $ (société)." : j.code + " n'a pas d'exigence légale en matière de droit à la déconnexion; le manuel décrit la politique discrétionnaire de l'employeur." ),
      },
      {
        heading: "4. Politique d'accommodement — norme Meiorin",
        body: "Les sections sur l'accommodement et le respect du manuel doivent être conformes à l'obligation légale d'accommoder en vertu des codes des droits de la personne applicables, jusqu'à la contrainte excessive selon la norme Meiorin. Le manuel doit décrire le processus d'accommodement (demande, documentation, démarche interactive) plutôt que de simplement affirmer que l'accommodement « sera fourni ».",
      },
      {
        heading: "5. Harcèlement en milieu de travail — conformité selon la juridiction",
        body: "Le manuel référence la Politique de prévention du harcèlement, de la discrimination et de la violence de l'employeur. Pour " + j.code + ", la conformité suit : " + j.harassStatFR + ". Le manuel doit incorporer ce programme ou renvoyer à la politique autonome.",
      },
      {
        heading: "6. Politique de surveillance électronique — " + j.code,
        body: ( j.electronicMon ? j.code + " : les employeurs de 25 salariés ou plus doivent avoir une politique écrite en vertu de " + j.emStatFR + ". La politique doit être remise dans les 30 jours suivant l'embauche. Le manuel doit y faire renvoi." : j.code + " n'a pas d'exigence légale en matière de politique de surveillance électronique; les employeurs doivent suivre les meilleures pratiques et la législation sur la protection des renseignements personnels." ),
      },
      {
        heading: "7. Protection des renseignements personnels — LPRPDE et équivalents provinciaux",
        body: "La protection des renseignements personnels suit : " + j.privacyStatFR + ". La section sur la protection des renseignements personnels du manuel doit être conforme à la législation applicable et décrire comment les renseignements personnels des salariés sont recueillis, utilisés et conservés.",
      },
      {
        heading: "8. Heures supplémentaires et droits liés aux heures de travail",
        body: "Pour " + j.code + ", les règles légales en matière de rémunération des heures supplémentaires sont : " + j.overtimeNoteFR + " Les employeurs doivent inscrire les heures avec soin et assurer la conformité avec la loi applicable.",
      },
      {
        heading: "9. Vacances et congés payés",
        body: "Les droits aux vacances pour " + j.code + " suivent : " + j.vacStatFR + ". Le droit minimum légal est " + j.vacMinPct + " par année (ou " + j.vacMinWeeks + " semaines). " + j.vacEnhancedFR + " Les employeurs doivent assurer le suivi, permettre aux salarié(e)s de prendre leurs vacances et payer les vacances accumulées à la cessation d'emploi.",
      },
      {
        heading: "10. Congé de maladie et accommodement pour maladie",
        body: "Pour " + j.code + ", les droits au congé de maladie sont : " + j.sickLeaveFR + " Les employeurs doivent distinguer entre congé de maladie (propre maladie), congé familial (soins à un proche) et autres congés protégés. Les abus des politiques de congé de maladie peuvent être traités par discipline progressive, mais les droits légaux des salarié(e)s ne peuvent pas être restreints.",
      },
    ],
  };
};
