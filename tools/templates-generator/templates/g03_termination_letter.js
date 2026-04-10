// G03 — Termination Letter (without cause, plain-language, humane)
module.exports = function(j) {
  return {
    id: "T03",
    slug: "Termination_Letter",
    kind: "letter",
    titleEN: "Termination of Employment",
    titleFR: "Cessation d'emploi",

    bodyEN: [
      { type: "date" },
      { type: "address", lines: [
        "{{employee_name}}",
        "{{employee_address_line_1}}",
        "{{employee_address_line_2}}",
      ]},
      { type: "re", text: "End of your employment with {{employer_legal_name}}" },
      { type: "p", text: "Dear {{employee_first_name}}," },
      { type: "p", text: "This letter confirms our conversation today. We have decided to end your employment with **{{employer_legal_name}}** (the **Company**) on a without-cause basis, effective **{{termination_effective_date}}**. We know this is difficult news. We want to make the transition as respectful, clear and practical as we can — and this letter sets out what you can expect from us." },

      { type: "h2", text: "1. Why we're making this decision" },
      { type: "p", text: "The reason for ending your employment is **{{termination_reason}}**. This is not a decision about your character or your effort. Where appropriate, we will provide a neutral employment reference to prospective employers; please direct reference requests to **{{reference_contact_name}}** at **{{reference_contact_email}}**." },

      { type: "h2", text: "2. Your final day" },
      { type: "p", text: "Your last working day is **{{last_working_day}}**. After that date, you will be on a paid notice period through **{{notice_period_end_date}}**, during which you are not required to perform any duties unless we agree otherwise. Your employment formally ends on **{{termination_effective_date}}**." },

      { type: "h2", text: "3. Your separation package" },
      { type: "p", text: "In recognition of your service and in full satisfaction of the Company's obligations to you under your employment agreement and applicable employment standards legislation, the Company will provide the following:" },
      { type: "bullet", text: "**Notice of termination (or pay in lieu):** **{{notice_weeks}}** weeks, paid at your regular base salary, less statutory deductions. This meets or exceeds the minimum notice required by " + j.termStatEN + " (the " + j.statuteEN + " governs your employment)." },
      ...( j.hasSeverance ? [
        { type: "bullet", text: "**Statutory severance pay:** **{{severance_weeks}}** weeks, paid at your regular base salary, less statutory deductions, as required by " + j.severanceStat + ". " + j.severanceFormEN + "." }
      ] : [] ),
      { type: "bullet", text: "**Vacation pay:** All accrued and unused vacation up to **{{termination_effective_date}}**, less statutory deductions." },
      { type: "bullet", text: "**Benefits continuation:** Your group benefits (health, dental, life and disability) will continue until **{{benefits_end_date}}**, which covers at least the statutory notice period. We will send you information about continuation or conversion options before that date." },
      { type: "bullet", text: "**Outstanding business expenses:** Any approved expenses you submit by **{{expense_deadline}}** will be reimbursed in the normal way." },
      { type: "p", text: "The Company will pay your final wages, vacation pay and notice of termination " + j.finalPayEN + " or earlier if required by applicable law. Your Record of Employment will be issued within the timelines required by the Employment Insurance Regulations." },

      { type: "h2", text: "4. Enhanced offer — conditional on a release" },
      { type: "p", text: "In addition to what the Company is required to provide, and to support you while you look for your next role, the Company is offering you an enhanced severance package of **{{enhanced_severance_amount}}**, conditional on you signing the Full and Final Release attached to this letter. You are not required to accept this enhanced package — you will still receive everything in section 3 regardless. We encourage you to obtain independent legal advice before deciding." },
      { type: "p", text: "If you wish to accept, please sign and return the Release by **{{release_deadline}}**. We are genuinely happy to extend that deadline if you need more time — just ask **{{hr_contact_name}}**." },

      { type: "h2", text: "5. Things to return" },
      { type: "p", text: "By **{{return_property_date}}**, please return all Company property in your possession, including laptops, phones, access cards, keys, credit cards, and any physical or electronic documents containing Company information. We will make this easy — **{{hr_contact_name}}** will coordinate pickup or shipping with you." },

      { type: "h2", text: "6. Ongoing obligations" },
      { type: "p", text: "Your confidentiality and intellectual property obligations under your employment agreement continue after your last day and are not affected by this letter. These obligations do not limit your right to make a protected disclosure to a regulator, to participate in a human-rights or whistleblower complaint, or to discuss your wages and working conditions with others as permitted by law." },

      { type: "h2", text: "7. Support through the transition" },
      { type: "p", text: "We know this moment is hard and we want to help. The following supports are available to you at no cost:" },
      { type: "bullet", text: "**Career transition support** through **{{career_transition_provider}}**, for up to **{{career_transition_duration}}**." },
      { type: "bullet", text: "**Employee and Family Assistance Program** — confidential counselling for you and your family, available for **{{eap_continuation_period}}** after your last day." },
      { type: "bullet", text: "A conversation with **{{hr_contact_name}}** at **{{hr_contact_email}}** any time you have questions about this letter, the process, or anything else." },

      { type: "h2", text: "8. Your rights" },
      { type: "p", text: "This letter is provided in good faith and is intended to comply with — and in several respects exceed — the minimum requirements of the employment standards legislation that applies to your province, human rights legislation, and any other applicable law. If you believe any part of this letter is inconsistent with those minimums, please let us know and we will correct it. Nothing in this letter, including the Release, waives any right that cannot be waived under applicable law." },

      { type: "h2", text: "9. Closing" },
      { type: "p", text: "Thank you for everything you have contributed during your time with the Company. We wish you the very best in what comes next." },
      { type: "p", text: "If anything in this letter is unclear, please reach out — we are here to talk it through." },

      { type: "signoff", closing: "With respect and our best wishes," },
    ],

    bodyFR: [
      { type: "date" },
      { type: "address", lines: [
        "{{employee_name}}",
        "{{employee_address_line_1}}",
        "{{employee_address_line_2}}",
      ]},
      { type: "re", text: "Fin de votre emploi chez {{employer_legal_name}}" },
      { type: "p", text: "Bonjour {{employee_first_name}}," },
      { type: "p", text: "La présente confirme notre conversation d'aujourd'hui. Nous avons décidé de mettre fin à votre emploi chez **{{employer_legal_name}}** (la **Société**) sans cause juste et suffisante, à compter du **{{termination_effective_date}}**. Nous savons que la nouvelle est difficile. Nous voulons rendre la transition aussi respectueuse, claire et concrète que possible — cette lettre précise ce à quoi vous pouvez vous attendre de notre part." },

      { type: "h2", text: "1. Pourquoi cette décision" },
      { type: "p", text: "La raison de la cessation est **{{termination_reason}}**. Il ne s'agit pas d'un jugement sur votre personne ni sur vos efforts. Le cas échéant, nous fournirons une référence d'emploi neutre aux employeurs potentiels; les demandes de référence doivent être adressées à **{{reference_contact_name}}** à **{{reference_contact_email}}**." },

      { type: "h2", text: "2. Votre dernier jour" },
      { type: "p", text: "Votre dernière journée de travail est le **{{last_working_day}}**. Vous serez ensuite en préavis rémunéré jusqu'au **{{notice_period_end_date}}**, période pendant laquelle vous n'êtes pas tenu(e) d'exécuter de tâches sauf accord contraire. Votre emploi prend officiellement fin le **{{termination_effective_date}}**." },

      { type: "h2", text: "3. Votre indemnité de cessation" },
      { type: "p", text: "En reconnaissance de votre service et en exécution intégrale des obligations de la Société en vertu de votre contrat de travail et de la législation sur les normes du travail applicable, la Société vous versera :" },
      { type: "bullet", text: "**Préavis de cessation (ou indemnité en tenant lieu) :** **{{notice_weeks}}** semaines, payées au taux de votre salaire de base habituel, moins les déductions légales. Ce préavis respecte ou dépasse le minimum exigé par " + j.termStatFR + " (la " + j.statuteFR + " régit votre emploi)." },
      ...( j.hasSeverance ? [
        { type: "bullet", text: "**Indemnité de départ légale :** **{{severance_weeks}}** semaines, payées au taux de votre salaire de base habituel, moins les déductions légales, conformément à " + j.severanceStat + ". " + j.severanceFormFR + "." }
      ] : [] ),
      { type: "bullet", text: "**Paie de vacances :** Toutes les vacances accumulées et non prises jusqu'au **{{termination_effective_date}}**, moins les déductions légales." },
      { type: "bullet", text: "**Continuation des avantages sociaux :** Vos avantages sociaux collectifs (santé, dentaire, vie et invalidité) se poursuivront jusqu'au **{{benefits_end_date}}**, ce qui couvre au minimum le préavis légal. Nous vous ferez parvenir les options de continuation ou de conversion avant cette date." },
      { type: "bullet", text: "**Dépenses professionnelles impayées :** Toute dépense approuvée soumise au plus tard le **{{expense_deadline}}** sera remboursée normalement." },
      { type: "p", text: "La Société vous versera votre dernière paie, votre paie de vacances et votre préavis de cessation " + j.finalPayFR + " ou plus tôt si la loi applicable l'exige. Votre relevé d'emploi sera émis dans les délais prévus par le Règlement sur l'assurance-emploi." },

      { type: "h2", text: "4. Offre bonifiée — conditionnelle à une quittance" },
      { type: "p", text: "En plus de ce que la Société est tenue de fournir, et afin de vous soutenir dans votre recherche du prochain rôle, la Société vous offre une indemnité de cessation bonifiée de **{{enhanced_severance_amount}}**, conditionnelle à la signature de la Quittance complète et finale jointe à la présente. Vous n'êtes pas obligé(e) d'accepter cette offre bonifiée — tout ce qui figure à la section 3 vous sera versé de toute façon. Nous vous encourageons à obtenir un avis juridique indépendant avant de décider." },
      { type: "p", text: "Si vous souhaitez accepter, veuillez signer et retourner la Quittance au plus tard le **{{release_deadline}}**. Nous sommes parfaitement heureux de prolonger ce délai si vous avez besoin de temps — il suffit de le demander à **{{hr_contact_name}}**." },

      { type: "h2", text: "5. Biens à restituer" },
      { type: "p", text: "D'ici le **{{return_property_date}}**, veuillez retourner tous les biens de la Société en votre possession, y compris ordinateurs portables, téléphones, cartes d'accès, clés, cartes de crédit et documents physiques ou électroniques contenant des renseignements de la Société. Nous faciliterons le processus — **{{hr_contact_name}}** coordonnera la cueillette ou l'envoi avec vous." },

      { type: "h2", text: "6. Obligations continues" },
      { type: "p", text: "Vos obligations de confidentialité et de propriété intellectuelle prévues à votre contrat de travail se poursuivent après votre dernier jour et ne sont pas modifiées par la présente. Ces obligations ne restreignent pas votre droit de faire une divulgation protégée à un organisme de réglementation, de participer à une plainte en matière de droits de la personne ou de dénonciation, ou de discuter de votre rémunération et de vos conditions de travail, dans la mesure permise par la loi." },

      { type: "h2", text: "7. Accompagnement pendant la transition" },
      { type: "p", text: "Nous savons que ce moment est difficile et nous voulons vous soutenir. Les services suivants vous sont offerts sans frais :" },
      { type: "bullet", text: "**Soutien à la transition de carrière** par **{{career_transition_provider}}**, jusqu'à concurrence de **{{career_transition_duration}}**." },
      { type: "bullet", text: "**Programme d'aide aux employés et à la famille** — counselling confidentiel pour vous et votre famille, disponible pendant **{{eap_continuation_period}}** après votre dernier jour." },
      { type: "bullet", text: "Une conversation avec **{{hr_contact_name}}** à **{{hr_contact_email}}** en tout temps pour toute question sur cette lettre, le processus ou autre chose." },

      { type: "h2", text: "8. Vos droits" },
      { type: "p", text: "La présente lettre est fournie de bonne foi et vise à respecter — et, à plusieurs égards, à dépasser — les exigences minimales de la législation sur les normes du travail applicable, de la législation en matière de droits de la personne et de toute autre loi applicable. Si vous estimez qu'un élément est incompatible avec ces minimums, veuillez nous en informer et nous y remédierons. Rien dans cette lettre, y compris la Quittance, ne vise à écarter un droit qui ne peut être écarter selon la loi applicable." },

      { type: "h2", text: "9. Mot de la fin" },
      { type: "p", text: "Nous vous remercions pour tout ce que vous avez apporté pendant votre passage à la Société. Nous vous souhaitons le meilleur pour la suite." },
      { type: "p", text: "Si quelque chose dans cette lettre n'est pas clair, n'hésitez pas à nous écrire — nous sommes là pour en discuter." },

      { type: "signoff", closing: "Avec respect et nos meilleurs vœux," },
    ],
    legalNotesEN: [
      {
        heading: "1. Notice quantum — Bardal factors and statutory minimums",
        body: "Termination without cause requires the greater of: (a) statutory notice under " + j.termStatEN + "; and (b) the contractual notice in the employment agreement. If no valid contractual clause exists, common law reasonable notice under the Bardal factors applies. The letter should specify which calculation applies and confirm it equals or exceeds the statutory minimum. For " + j.code + ", notice follows " + j.noticeFormulaEN + ".",
      },
      {
        heading: "2. Waksdale — void termination clause risk",
        body: "Before issuing this letter, confirm the termination clause in the Employment Agreement or Offer Letter is valid post-Waksdale v. Swegon North America Inc., 2020 ONCA 391. If the clause is void, the package in this letter may be below the employee's entitlement. A void clause converts the entitlement to common law reasonable notice, which can be significantly higher than the statutory minimum. Action: Review the clause before setting the termination package.",
      },
      {
        heading: "3. Full and final releases — independent legal advice",
        body: "An enhanced termination package conditional on a release should be offered with time for the employee to consider it and obtain independent legal advice (ILA). Courts have set aside releases that were obtained under duress or without adequate ILA time, particularly where the employee was in a vulnerable position. Best practice: minimum 7 days to review; explicitly state ILA is encouraged; consider including a ILA allowance.",
      },
      {
        heading: "4. Manner of dismissal — Honda Canada",
        body: "Honda Canada Inc. v. Keays, 2008 SCC 39: damages for bad faith in the manner of dismissal are available separate from wrongful dismissal damages. Bad faith includes making false allegations of cause, failing to be candid about the reasons for termination, or providing a demeaning reference. All termination meetings should be conducted with dignity; consider HR and a witness being present.",
      },
      {
        heading: "5. Employment Insurance — Record of Employment",
        body: "The employer must issue a Record of Employment (ROE) within 5 calendar days of the first day of interruption of earnings, under the Employment Insurance Regulations. The ROE code is: Code E (dismissal), Code N (leave of absence), or Code M (dismissal/layoff). Failure to issue the ROE on time is an offence under the Employment Insurance Act.",
      },
      {
        heading: "6. Benefits continuation — group insurance",
        body: "In many provinces, group insurance coverage must continue during the statutory notice period even if the employee is paid in lieu of working notice. Confirm with the insurer whether the policy permits continuation during pay-in-lieu periods; if not, consider a cash equivalent.",
      },
      {
        heading: "7. Constructive dismissal — pre-termination conduct",
        body: "If the termination follows a unilateral change to the employee's role, compensation, or working conditions, the employee may argue constructive dismissal even if this letter is styled as a mutual departure or resignation. Document the basis for the termination carefully and confirm the employee was not offered or placed in a substantially different role prior to this letter.",
      },
      {
        heading: "8. Human rights considerations",
        body: "Ensure the termination is not, and cannot reasonably be characterized as, connected to a protected ground under the applicable Human Rights Code (e.g., disability, pregnancy, family status, age, gender). If the employee recently disclosed a disability or accommodation need, or recently returned from a protected leave, the timing must be scrutinized and documented. Human rights damages are not capped in most Canadian jurisdictions.",
      },
    ],
    legalNotesFR: [
      {
        heading: "1. Quantum du préavis — facteurs Bardal et minimums légaux",
        body: "La cessation sans motif exige le plus élevé de : (a) le préavis légal en vertu de " + j.termStatFR + "; et (b) le préavis contractuel dans le contrat de travail. En l'absence de clause contractuelle valide, le préavis raisonnable en common law selon les facteurs Bardal s'applique. La lettre doit préciser le calcul applicable et confirmer qu'il respecte le minimum légal. Pour " + j.code + ", le préavis suit : " + j.noticeFormulaFR + ".",
      },
      {
        heading: "2. Waksdale — risque de clause de cessation nulle",
        body: "Avant d'envoyer cette lettre, confirmer que la clause de cessation est valide après Waksdale c. Swegon North America Inc., 2020 ONCA 391. Si la clause est nulle, le montant indiqué pourrait être inférieur au droit de la personne salariée. Une clause nulle convertit le droit en préavis raisonnable en common law, qui peut dépasser nettement le minimum légal. Action : Réviser la clause avant de fixer le montant de l'indemnité.",
      },
      {
        heading: "3. Quittances complètes — conseil juridique indépendant",
        body: "Une indemnité bonifiée conditionnelle à une quittance doit être offerte avec le temps nécessaire pour réviser et obtenir un conseil juridique indépendant (CJI). Les tribunaux ont annulé des quittances obtenues sous contrainte ou sans délai suffisant, notamment lorsque la personne était vulnérable. Bonne pratique : minimum 7 jours; indiquer explicitement que le CJI est encouragé.",
      },
      {
        heading: "4. Mode de congédiement — Honda Canada",
        body: "Honda Canada Inc. c. Keays, 2008 CSC 39 : des dommages-intérêts pour mauvaise foi lors du congédiement sont disponibles indépendamment des dommages pour congédiement injustifié. Cela inclut les fausses allégations de cause, le manque de transparence quant aux motifs ou une référence dégradante. Toutes les rencontres doivent se dérouler dans la dignité; envisager la présence des RH et d'un témoin.",
      },
      {
        heading: "5. Assurance-emploi — relevé d'emploi",
        body: "L'employeur doit émettre un relevé d'emploi (RE) dans les 5 jours civils suivant le premier jour d'interruption de rémunération, en vertu du Règlement sur l'assurance-emploi. Le code RE est : E (congédiement), N (congé), ou M (mise à pied/congédiement). Le défaut d'émettre le RE dans les délais constitue une infraction à la Loi sur l'assurance-emploi.",
      },
      {
        heading: "6. Maintien des avantages — assurance collective",
        body: "Dans plusieurs provinces, la couverture d'assurance collective doit se maintenir pendant la période de préavis légal, même si la personne est rémunérée en tenant lieu de préavis. Confirmer avec l'assureur si la police permet la continuation; sinon, envisager un équivalent en argent.",
      },
      {
        heading: "7. Congédiement déguisé — conduite préalable",
        body: "Si la cessation fait suite à une modification unilatérale du rôle, de la rémunération ou des conditions de travail, la personne pourrait plaider le congédiement déguisé même si la lettre est présentée comme un départ mutuel. Documenter le motif avec soin et confirmer qu'elle n'a pas été placée dans un rôle substantiellement différent.",
      },
      {
        heading: "8. Droits de la personne",
        body: "S'assurer que la cessation n'est pas liée à un motif protégé en vertu du Code des droits de la personne applicable. Si la personne a récemment divulgué un handicap ou a récemment revenu d'un congé protégé, le moment doit être examiné et documenté. Les dommages ne sont pas plafonnés dans la plupart des provinces canadiennes.",
      },
    ],
  };
};
