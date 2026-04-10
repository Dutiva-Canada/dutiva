// G14 — Resignation Acceptance Letter (Jurisdiction-Aware)
module.exports = function(j) {
  return {
    id: "T14",
    slug: "Resignation_Acceptance",
    kind: "letter",
    titleEN: "Acknowledgement of Resignation",
    titleFR: "Accusé de réception de démission",

    bodyEN: [
      { type: "date" },
      { type: "address", lines: [
        "{{employee_name}}",
        "{{employee_address_line_1}}",
        "{{employee_address_line_2}}",
      ]},
      { type: "re", text: "Acknowledgement of your resignation" },
      { type: "p", text: "Dear {{employee_first_name}}," },

      { type: "p", text: "Thank you for letting us know about your decision to resign from your position as **{{position_title}}** at **{{employer_legal_name}}**. We received your notice on **{{resignation_notice_date}}**, and this letter confirms what we have agreed and what to expect over the next few weeks. We're sorry to see you go, and we want to make sure the transition is as smooth as possible for you." },

      { type: "h2", text: "1. Your last day of work" },
      { type: "p", text: "Your last day of active employment will be **{{last_day_of_work}}**. We have accepted this date as your effective resignation date. If something changes on your side, please let us know — we can often be flexible where it works for both of us." },

      { type: "h2", text: "2. Final pay and vacation" },
      { type: "p", text: "Your final pay, including any wages owing up to and including **{{last_day_of_work}}**, plus vacation pay accrued but not yet taken, will be deposited into your regular account " + j.finalPayEN + " (" + j.finalPayStat + "). This is consistent with the employment standards legislation that applies to your province. If you believe anything in your final pay is missing or incorrect, please reach out to **{{hr_contact_name}}** and we will look into it right away." },

      { type: "h2", text: "3. Benefits and group insurance" },
      { type: "p", text: "Your participation in the Company's group benefits plan will continue until **{{benefits_end_date}}**. After that date, you may be eligible to convert certain coverages to an individual policy without a medical exam — details are available from our benefits provider, and we'll send you the conversion package separately so you have it in time to decide." },

      { type: "h2", text: "4. Return of Company property" },
      { type: "p", text: "Please return any Company property in your possession on or before your last day — including your laptop, access card, phone, keys and any physical or electronic files containing confidential information. We'll send you a simple checklist and a pre-paid return label if you're remote. If anything is missing or damaged due to normal wear and tear, we are not going to make a fuss about it." },

      { type: "h2", text: "5. Ongoing obligations" },
      { type: "p", text: "Some of the commitments in your employment agreement continue to apply after your last day — in particular, confidentiality of the Company's confidential information and any intellectual property assignment. We trust you to honour these, and we're happy to answer any questions you have about what they cover." },

      { type: "h2", text: "6. Knowledge transfer" },
      { type: "p", text: "Between now and your last day, we'd appreciate your help with a handover of your active projects and responsibilities. Your manager, **{{manager_name}}**, will work with you on a simple plan — we don't want this to feel like a burden, so please flag anything that's unrealistic in the time available and we'll adjust together." },

      { type: "h2", text: "7. References and future contact" },
      { type: "p", text: "We're happy to provide a professional reference if that would help you in what comes next. Please direct reference requests to **{{reference_contact_name}}** at **{{reference_contact_email}}**. And if a future opportunity to work together ever arises, please know the door is open." },

      { type: "h2", text: "8. Thank you" },
      { type: "p", text: "Thank you for everything you've contributed during your time with us. We mean that. The work you've done has mattered, the care you've shown your colleagues has mattered, and we wish you nothing but the best in what comes next. If you have questions about anything in this letter — or about anything at all — please don't hesitate to reach out to **{{hr_contact_name}}** at **{{hr_contact_email}}**." },

      { type: "signoff", closing: "With appreciation," },
    ],

    bodyFR: [
      { type: "date" },
      { type: "address", lines: [
        "{{employee_name}}",
        "{{employee_address_line_1}}",
        "{{employee_address_line_2}}",
      ]},
      { type: "re", text: "Accusé de réception de votre démission" },
      { type: "p", text: "Bonjour {{employee_first_name}}," },

      { type: "p", text: "Merci de nous avoir informés de votre décision de démissionner de votre poste de **{{position_title}}** chez **{{employer_legal_name}}**. Nous avons reçu votre préavis le **{{resignation_notice_date}}**, et la présente lettre confirme ce qui a été convenu et ce à quoi vous attendre au cours des prochaines semaines. Nous sommes désolés de vous voir partir et nous voulons que cette transition se déroule le plus sereinement possible pour vous." },

      { type: "h2", text: "1. Votre dernier jour de travail" },
      { type: "p", text: "Votre dernier jour d'emploi actif sera le **{{last_day_of_work}}**. Nous avons accepté cette date comme date effective de votre démission. Si votre situation change, dites-le-nous — nous pouvons souvent être flexibles lorsque cela convient aux deux parties." },

      { type: "h2", text: "2. Paie finale et vacances" },
      { type: "p", text: "Votre paie finale, comprenant tout salaire dû jusqu'au **{{last_day_of_work}}** inclusivement, ainsi que l'indemnité de vacances accumulée et non prise, sera déposée dans votre compte habituel " + j.finalPayFR + " (" + j.finalPayStat + "). Cela est conforme à la législation applicable sur les normes du travail. Si vous croyez qu'un élément est manquant ou incorrect, communiquez avec **{{hr_contact_name}}** et nous vérifierons sans tarder." },

      { type: "h2", text: "3. Avantages sociaux et assurance collective" },
      { type: "p", text: "Votre participation au régime d'avantages sociaux collectifs de la Société se poursuivra jusqu'au **{{benefits_end_date}}**. Après cette date, vous pourriez être admissible à la conversion de certaines protections en police individuelle sans examen médical — les détails sont fournis par notre assureur, et nous vous transmettrons la trousse de conversion séparément afin que vous ayez le temps de décider." },

      { type: "h2", text: "4. Retour des biens de la Société" },
      { type: "p", text: "Veuillez retourner tout bien de la Société en votre possession au plus tard à votre dernier jour — notamment ordinateur portable, carte d'accès, téléphone, clés et tout fichier, physique ou électronique, contenant des renseignements confidentiels. Nous vous remettrons une courte liste de vérification et une étiquette de retour prépayée si vous êtes en télétravail. Si quelque chose manque ou présente de l'usure normale, nous n'en ferons pas tout un plat." },

      { type: "h2", text: "5. Obligations qui subsistent" },
      { type: "p", text: "Certains engagements prévus à votre contrat continuent de s'appliquer après votre dernier jour — notamment la confidentialité des renseignements confidentiels de la Société et la cession de propriété intellectuelle. Nous comptons sur vous pour les respecter, et nous restons disponibles si vous avez des questions sur leur portée." },

      { type: "h2", text: "6. Transfert de connaissances" },
      { type: "p", text: "D'ici votre dernier jour, nous aimerions votre aide pour assurer une transition de vos projets et responsabilités. Votre gestionnaire, **{{manager_name}}**, établira avec vous un plan simple — nous ne voulons pas que cela devienne un fardeau, alors signalez ce qui n'est pas réaliste dans le temps imparti et nous ajusterons ensemble." },

      { type: "h2", text: "7. Références et contacts futurs" },
      { type: "p", text: "Nous sommes heureux de fournir une référence professionnelle si cela peut vous aider dans la suite. Les demandes de références peuvent être adressées à **{{reference_contact_name}}** à **{{reference_contact_email}}**. Et si l'occasion de retravailler ensemble se présente un jour, sachez que la porte est ouverte." },

      { type: "h2", text: "8. Merci" },
      { type: "p", text: "Merci pour tout ce que vous avez apporté durant votre passage parmi nous. Sincèrement. Votre travail a compté, l'attention que vous avez portée à vos collègues a compté, et nous vous souhaitons le meilleur pour la suite. Si vous avez des questions — à propos de cette lettre ou de quoi que ce soit d'autre — n'hésitez pas à écrire à **{{hr_contact_name}}** à **{{hr_contact_email}}**." },

      { type: "signoff", closing: "Avec reconnaissance," },
    ],

    legalNotesEN: [
      {
        heading: "1. Constructive dismissal risk — pre-acceptance scrutiny",
        body: "If the employer, prior to the employee's resignation, made a unilateral change to the employee's role, compensation, or working conditions, the employee may argue they were constructively dismissed rather than having voluntarily resigned. Accepting the resignation without scrutiny can inadvertently waive the employer's ability to defend. **Action:** Before sending this letter, confirm the resignation was voluntary and not preceded by conduct that could constitute constructive dismissal (e.g., demotion, pay cut, harassment without remedy). If in doubt, obtain legal advice before accepting.",
      },
      {
        heading: "2. Final pay — statutory timing and calculation",
        body: "Final pay must include: (a) all wages earned but unpaid to the last day of work; (b) vacation pay accrued but not taken (calculated on statutory wages, including eligible bonuses and commissions — not just base salary). Timing varies by jurisdiction: Ontario ESA s. 11 (on the next regular pay date or within 7 days); Québec ARLS art. 82.1 (within 72 hours if employee gave notice; next regular pay day otherwise); BC ESA s. 18 (within 48 hours); AB ESC s. 12 (within 3 business days); Federal CLC s. 243 (within 30 days). **Action:** Confirm the payroll cut-off date and final pay calculation BEFORE communicating the final pay date to the employee.",
      },
      {
        heading: "3. Benefits continuation and conversion window",
        body: "Group benefits typically end on the last day of active employment or the last day of the month in which employment ends, depending on the insurance contract. The employee may be eligible to convert individual coverages (life, disability) without a medical exam within a specified window after termination (typically 31 days for most Canadian insurers). Confirm the conversion window with the insurer immediately and communicate it to the employee. Some provinces have statutory continuation rights (e.g., Ontario Health Insurance Plan continuation for a period). **Action:** Contact the insurer to confirm the termination date and conversion window; provide written notice to the employee BEFORE the final day.",
      },
      {
        heading: "4. Record of Employment — timely issuance",
        body: "A Record of Employment (ROE) must be issued within 5 calendar days of the first day of interruption of earnings under the Employment Insurance Regulations, SOR/96-332, s. 19(3). For a resignation, the ROE code is **Code E** (quit/voluntary resignation — but this affects EI eligibility). The ROE must accurately reflect all insurable earnings in Blocks 15A/B/C. An incorrect ROE (e.g., wrong code, missing insurable earnings) can affect the employee's EI eligibility and may result in penalties for the employer under the Employment Insurance Act. **Action:** Submit the ROE to Service Canada within 5 days of the last day of work; retain a copy in the employee's file.",
      },
      {
        heading: "5. Restrictive covenants — post-resignation enforcement risk",
        body: "Restrictive covenants in the Employment Agreement (non-solicitation, non-competition, and non-dealing) survive resignation. If the employer has reason to believe the employee is joining a competitor or soliciting clients, obtain immediate legal advice on seeking injunctive relief. The limitation period for bringing a restrictive covenant action begins when the employer has knowledge of the breach. **Action:** Review the Employment Agreement for post-employment restrictions; flag to legal counsel if the departing employee is going to a competitor or if they may solicit clients.",
      },
      {
        heading: "6. References — good faith duty and liability",
        body: "Employers have a duty to act in good faith when providing references (Bhasin v. Hrynew, 2014 SCC 71). Providing a misleadingly positive reference (one that omits material negative information about the employee's performance or conduct) can create liability to a future employer who relies on it. Conversely, a negative reference that is false or misleading can expose the employer to defamation liability. A 'neutral reference' (dates of employment, position held, attendance record) is the safest approach where the employer has concerns about performance or conduct. **Action:** Centralize reference provision to a single designated contact; train managers not to give unauthorized references; document the policy in the staff handbook.",
      },
    ],

    legalNotesFR: [
      {
        heading: "1. Congédiement déguisé — examen avant l'acceptation",
        body: "Si l'employeur a, avant la démission de la personne salariée, apporté une modification unilatérale à son rôle, sa rémunération ou ses conditions de travail, cette dernière pourrait plaider le congédiement déguisé plutôt qu'une démission volontaire. L'acceptation sans examen peut priver l'employeur de sa défense. **Action :** Avant d'envoyer cette lettre, confirmer que la démission est volontaire et n'a pas été précédée d'une conduite pouvant constituer un congédiement déguisé (p. ex., rétrogradation, réduction de salaire, harcèlement sans remède). En cas de doute, consulter un conseiller juridique avant d'accepter.",
      },
      {
        heading: "2. Paie finale — délai légal et calcul",
        body: "La paie finale doit inclure : (a) tous les salaires gagnés et non versés jusqu'au dernier jour de travail; (b) l'indemnité de vacances accumulée et non prise (calculée sur les salaires légaux, y compris les bonis et commissions admissibles). Les délais varient : Ontario LNE art. 11 (à la prochaine date de paie régulière ou dans les 7 jours); Québec LNT art. 82.1 (dans les 72 heures si avis donné; prochaine paie sinon); C.-B. ESA art. 18 (dans les 48 heures); Alberta ESC art. 12 (dans les 3 jours ouvrables); Fédéral CCT art. 243 (dans les 30 jours). **Action :** Confirmer la date de coupure de paie et le calcul AVANT de communiquer la date de paie finale à la personne salariée.",
      },
      {
        heading: "3. Maintien des avantages et délai de conversion",
        body: "Les avantages collectifs se terminent généralement le dernier jour d'emploi actif, selon le contrat d'assurance. La personne salariée pourrait être admissible à convertir certaines protections individuelles (vie, invalidité) sans examen médical dans un délai déterminé (généralement 31 jours). Confirmer le délai de conversion avec l'assureur immédiatement. **Action :** Communiquer avec l'assureur pour confirmer la date de cessation et le délai de conversion; aviser la personne salariée par écrit AVANT le dernier jour.",
      },
      {
        heading: "4. Relevé d'emploi — émission opportune",
        body: "Un relevé d'emploi (RE) doit être émis dans les 5 jours civils suivant le premier jour d'interruption de rémunération, en vertu du Règlement sur l'assurance-emploi (DORS/96-332, art. 19(3)). Pour une démission, le code RE est **Code E** (départ volontaire). Le RE doit refléter fidèlement tous les gains assurables dans les Blocs 15A/B/C. Un RE incorrect peut affecter l'admissibilité aux prestations et entraîner des pénalités pour l'employeur. **Action :** Soumettre le RE à Service Canada dans les 5 jours du dernier jour de travail; conserver une copie au dossier.",
      },
      {
        heading: "5. Clauses restrictives — risque d'application après la démission",
        body: "Les clauses restrictives du contrat de travail (non-sollicitation, non-concurrence) survivent à la démission. Si l'employeur soupçonne que la personne salariée rejoint un concurrent ou sollicite des clients, obtenir immédiatement des conseils juridiques sur la possibilité d'une injonction. **Action :** Examiner les restrictions post-emploi dans le contrat de travail; signaler à un conseiller juridique si la personne part chez un concurrent.",
      },
      {
        heading: "6. Références — obligation de bonne foi et responsabilité",
        body: "Les employeurs ont l'obligation d'agir de bonne foi lorsqu'ils fournissent des références (Bhasin c. Hrynew, 2014 CSC 71). Une référence trompeusement positive (omettant des renseignements négatifs importants) peut engager la responsabilité envers un futur employeur. Une « référence neutre » (dates d'emploi, poste occupé) est l'approche la plus sûre lorsque l'employeur a des préoccupations. **Action :** Centraliser la fourniture de références auprès d'un contact désigné; former les gestionnaires pour qu'ils ne donnent pas de références non autorisées.",
      },
    ],
  };
};
