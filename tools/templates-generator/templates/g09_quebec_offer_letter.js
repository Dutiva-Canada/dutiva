// G09 — Québec Offer Letter (French-primary, Bill 96 / Charter s. 41 compliant)
// Québec-only template: exports function(j) => templateObject

module.exports = function(j) {
  return {
    id: "T09",
    slug: "Quebec_Offer_Letter",
    kind: "letter",
    titleEN: "Québec Offer of Employment (French-primary with English courtesy version)",
    titleFR: "Offre d'emploi (Québec)",

    // Per Charter of the French Language, CQLR c C-11, s. 41 (as amended by
    // Bill 96 / S.Q. 2022, c. 14), the working document is French. The English
    // body is included as a non-binding courtesy translation prefaced by a
    // notice that French prevails.
    bodyEN: [
      { type: "date" },
      { type: "address", lines: [
        "{{employee_name}}",
        "{{employee_address_line_1}}",
        "{{employee_address_line_2}}",
      ]},
      { type: "re", text: "Offer of employment — {{position_title}} (Québec)" },
      { type: "p", text: "Dear {{employee_first_name}}," },
      { type: "quote", text: "**Important notice about language.** Under the Charter of the French Language, CQLR c C-11, s. 41 (as amended by S.Q. 2022, c. 14, \"Bill 96\"), the French version of this offer is the binding version of the document. This English version is provided as a courtesy to help you read and understand the offer. If there is any inconsistency between the two, the French text prevails. You have received both versions at the same time and the same terms are offered to you in each language." },

      { type: "p", text: "We are delighted to offer you the position of **{{position_title}}** at **{{employer_legal_name}}** (the **Company**), based in the Province of Québec. This letter sets out the main terms of our offer. Please review it carefully and, if everything looks right, sign and return a copy by **{{offer_expiry_date}}**." },

      { type: "h2", text: "1. Your role and start date" },
      { type: "p", text: "You will report to **{{manager_name}}**, **{{manager_title}}**, and your primary duties are set out in the attached job description. Your first day will be **{{start_date}}**, and you will be based at **{{work_location}}**." },

      { type: "h2", text: "2. Compensation" },
      { type: "p", text: "Your starting base salary will be **{{annual_base_salary}}** per year, paid **{{pay_frequency}}** by direct deposit, less statutory deductions. You will also be eligible for **{{variable_comp_description}}**, subject to the terms of the applicable plan." },

      { type: "h2", text: "3. Vacation, holidays and leaves" },
      { type: "p", text: "You will receive **{{vacation_weeks}}** weeks of paid vacation per year, in addition to the statutory holidays prescribed by the **Act respecting Labour Standards**, CQLR c N-1.1 (the **ARLS**). After three years of service, you will be entitled to three weeks or 6% (ARLS art. 68). You are entitled to all leaves of absence prescribed by the ARLS (including parental under the Régime québécois d'assurance parentale, family obligations, sick and personal leave under ARLS art. 79.1, bereavement and domestic-violence leaves), without fear of retaliation." },

      { type: "h2", text: "4. Overtime and working hours" },
      { type: "p", text: "Your regular hours will be a maximum of **40 hours per week**. Overtime is payable at 1.5× for hours worked beyond 40 per week (ARLS art. 55). Québec also recognizes a right to refuse overtime in certain family-status situations (ARLS art. 59.0.1)." },

      { type: "h2", text: "5. Benefits and wellbeing" },
      { type: "p", text: "You will have access to the Company's **{{benefits_plan_name}}** group benefits plan (health, dental, life and disability coverage) starting **{{benefits_start_date}}**. You will also have access to our Employee and Family Assistance Program. We believe wellbeing isn't a perk — it's part of doing good work." },

      { type: "h2", text: "6. Probation" },
      { type: "p", text: "The first **{{probation_length}}** of your employment will be a probationary period. During this period, either party may end the employment on the minimum notice required by the ARLS." },

      { type: "h2", text: "7. Ending the employment" },
      { type: "p", text: "If employment ends, you will receive at least the notice (or indemnity in lieu) and any other amounts required by the ARLS, including: (a) notice under ARLS art. 82 based on your years of service (1–2 weeks per year for 1–2 years; 2 weeks per year for 3+ years); (b) where applicable, protection against dismissal without just and sufficient cause for employees with two or more years of service under ARLS art. 124; and (c) final wages within 72 hours as required by ARLS art. 82.1. You will be paid for accrued vacation in your final pay." },

      { type: "h2", text: "8. Confidentiality and intellectual property" },
      { type: "p", text: "As a condition of employment, you agree to keep the Company's confidential information confidential both during and after your employment, and that any work product created in the course of your role belongs to the Company. The full terms are in your employment agreement, which will be provided alongside this offer." },

      { type: "h2", text: "9. Pay equity and language obligations" },
      { type: "p", text: "The salary offered complies with the Company's pay equity plan under the Act respecting pay equity, CQLR c E-12.001. This offer is provided in French as the primary version in accordance with the Charter of the French Language, art. 41." },

      { type: "h2", text: "10. Conditions" },
      { type: "p", text: "This offer is conditional on: (a) your ability to legally work in Canada; (b) satisfactory completion of the background checks we have described to you; and (c) your signature of the employment agreement and related policies by **{{start_date}}**." },

      { type: "p", text: "If you would like to accept, please sign the French version of this letter and return it to **{{hr_contact_name}}** at **{{hr_contact_email}}** by **{{offer_expiry_date}}**. If you have any questions, please reach out — we are happy to walk through anything with you." },

      { type: "signoff", closing: "Warmly," },
    ],

    bodyFR: [
      { type: "date" },
      { type: "address", lines: [
        "{{employee_name}}",
        "{{employee_address_line_1}}",
        "{{employee_address_line_2}}",
      ]},
      { type: "re", text: "Offre d'emploi — {{position_title}} (Québec)" },
      { type: "p", text: "Bonjour {{employee_first_name}}," },
      { type: "quote", text: "**Avis important concernant la langue.** Conformément à la Charte de la langue française, RLRQ c C-11, art. 41 (telle que modifiée par la L.Q. 2022, chap. 14, « Loi 96 »), la version française de la présente offre est la version officielle et prévaut. La version anglaise, remise simultanément, n'est qu'une traduction de courtoisie destinée à faciliter votre compréhension. En cas de divergence, le texte français prévaut." },

      { type: "p", text: "Nous sommes ravis de vous offrir le poste de **{{position_title}}** chez **{{employer_legal_name}}** (la **Société**), basé au Québec. La présente lettre résume les principales conditions de notre offre. Veuillez la lire attentivement et, si tout vous convient, la signer et la retourner au plus tard le **{{offer_expiry_date}}**." },

      { type: "h2", text: "1. Votre rôle et votre date d'entrée en fonction" },
      { type: "p", text: "Vous relèverez de **{{manager_name}}**, **{{manager_title}}**, et vos principales tâches sont décrites dans la description de poste ci-jointe. Votre premier jour sera le **{{start_date}}**, et vous serez affecté(e) à **{{work_location}}**." },

      { type: "h2", text: "2. Rémunération" },
      { type: "p", text: "Votre salaire de base annuel de départ sera de **{{annual_base_salary}}**, versé **{{pay_frequency}}** par dépôt direct, moins les déductions légales. Vous serez également admissible à **{{variable_comp_description}}**, sous réserve des conditions du régime applicable." },

      { type: "h2", text: "3. Vacances, jours fériés et congés" },
      { type: "p", text: "Vous aurez droit à **{{vacation_weeks}}** semaines de vacances payées par année, en plus des jours fériés prévus par la **Loi sur les normes du travail**, RLRQ c N-1.1 (la **LNT**). Après trois ans de service, vous aurez droit à trois semaines ou 6 % (LNT art. 68). Vous avez droit à tous les congés prévus par la LNT (notamment les congés parentaux en vertu du Régime québécois d'assurance parentale, pour obligations familiales, de maladie et congés personnels en vertu de l'art. 79.1 de la LNT, de deuil et pour violence conjugale), sans crainte de représailles." },

      { type: "h2", text: "4. Heures supplémentaires et heures de travail" },
      { type: "p", text: "Vos heures régulières seront d'un maximum de **40 heures par semaine**. Les heures supplémentaires sont payées à 1,5 fois le taux ordinaire au-delà de 40 heures par semaine (LNT art. 55). Le Québec reconnaît également un droit de refus des heures supplémentaires dans certaines situations de statut familial (LNT art. 59.0.1)." },

      { type: "h2", text: "5. Avantages sociaux et mieux-être" },
      { type: "p", text: "Vous aurez accès au régime d'avantages sociaux collectifs **{{benefits_plan_name}}** (soins de santé, dentaires, assurance vie et invalidité) à compter du **{{benefits_start_date}}**. Vous aurez également accès au Programme d'aide aux employés et à la famille. Nous croyons que le mieux-être n'est pas un privilège — il fait partie du bon travail." },

      { type: "h2", text: "6. Période probatoire" },
      { type: "p", text: "Les **{{probation_length}}** premiers de votre emploi constituent une période probatoire. Pendant cette période, chaque partie peut mettre fin à l'emploi moyennant le préavis minimal prévu par la LNT." },

      { type: "h2", text: "7. Cessation d'emploi" },
      { type: "p", text: "En cas de cessation, vous recevrez au moins le préavis (ou l'indemnité en tenant lieu) et toute autre somme prévue par la LNT, notamment : (a) l'avis prévu à l'art. 82 selon votre ancienneté (1–2 semaines par année pour 1–2 ans; 2 semaines par année pour 3 ans ou plus); (b) le cas échéant, la protection contre le congédiement sans cause juste et suffisante prévue à l'art. 124 pour les salarié(e)s ayant deux ans ou plus de service continu; et (c) les salaires finals dans les 72 heures comme l'exige l'art. 82.1 de la LNT. Vous serez payé(e) pour les vacances accumulées dans votre dernière paie." },

      { type: "h2", text: "8. Confidentialité et propriété intellectuelle" },
      { type: "p", text: "Comme condition d'emploi, vous acceptez de préserver la confidentialité des renseignements confidentiels de la Société pendant et après votre emploi, et que tout travail réalisé dans l'exercice de vos fonctions appartient à la Société. Les modalités complètes figurent dans votre contrat de travail, qui vous sera remis en même temps que la présente offre." },

      { type: "h2", text: "9. Équité salariale et obligations linguistiques" },
      { type: "p", text: "Le salaire offert est conforme au plan d'équité salariale de la Société en vertu de la Loi sur l'équité salariale, RLRQ c E-12.001. La présente offre vous est remise en français comme version officielle, conformément à l'art. 41 de la Charte de la langue française." },

      { type: "h2", text: "10. Conditions" },
      { type: "p", text: "La présente offre est conditionnelle à : a) votre autorisation légale de travailler au Canada; b) la satisfaction des vérifications d'antécédents dont nous vous avons informé(e); et c) votre signature du contrat de travail et des politiques connexes au plus tard le **{{start_date}}**." },

      { type: "p", text: "Si vous souhaitez accepter, veuillez signer la version française de la présente lettre et la retourner à **{{hr_contact_name}}** à **{{hr_contact_email}}** au plus tard le **{{offer_expiry_date}}**. Si vous avez des questions, n'hésitez pas à nous écrire — nous serons heureux d'en discuter avec vous." },

      { type: "signoff", closing: "Cordialement," },
      { type: "spacer" },
      { type: "sig", leftLabel: "EMPLOYEUR — ACCEPTÉ ET CONVENU", rightLabel: "SALARIÉ(E) — ACCEPTÉ ET CONVENU" },
    ],

    legalNotesEN: [
      {
        heading: "1. Charter of the French Language — Bill 96 / s. 41",
        body: "**Charter of the French Language**, CQLR c C-11, s. 41 (as amended by *An Act respecting French, the official and common language of Québec*, S.Q. 2022, c. 14, 'Bill 96'): every employer in Québec must, upon request, provide employees with an employment offer in French. Since June 1, 2023, contracts of adhesion (standard-form contracts) in Québec must be in French; an English version may be provided simultaneously, but only the French version is binding. This template follows that structure. **Action:** Confirm this offer is in French-primary form; retain both language versions on file.",
      },
      {
        heading: "2. Québec Civil Code — employment contract (arts. 2085–2097)",
        body: "**Civil Code of Québec**, arts. 2085–2097: employment in Québec is governed by the Civil Code in addition to the ARLS. The Civil Code provides that an employment contract is a contract by which a person undertakes for a limited period to do work for another person under the latter's direction, in exchange for remuneration. Art. 2094: if the employer has motif sérieux (serious reason), the contract may be terminated without notice. The 'just and sufficient cause' standard under ARLS art. 124 is interpreted consistently with the Civil Code.",
      },
      {
        heading: "3. ARLS — termination notice and recourse (arts. 82–124)",
        body: "**Act respecting Labour Standards**, CQLR c N-1.1: notice of termination for employees with 3+ months of service is required. Formula: 1 week per year of service for 1–2 years; 2 weeks per year for 3+ years (ARLS art. 82). Employees with 2+ years of continuous service who are dismissed without just and sufficient cause may file a complaint under ARLS art. 124 (recours contre un congédiement sans cause juste et suffisante). This remedy is available to non-unionized employees and results in reinstatement or compensation. **Action:** Confirm the termination clause in this offer letter meets or exceeds ARLS minimums.",
      },
      {
        heading: "4. RQAP — parental and family benefits",
        body: "**Régime québécois d'assurance parentale** (RQAP): Québec employees are covered by the RQAP rather than federal EI parental benefits. RQAP provides maternity (18 weeks), paternity (5 weeks), parental (32 or 40 weeks depending on standard or enhanced plan), and adoption benefits. Premiums are deducted from employee wages; the employer's RQAP contribution rate is set annually by the Conseil de gestion de l'assurance parentale. **Action:** Confirm payroll deductions include RQAP (not just federal EI parental).",
      },
      {
        heading: "5. Law 25 — privacy and personal information (P-39.1)",
        body: "**Act respecting the protection of personal information in the private sector**, CQLR c P-39.1, as amended by Law 25 (S.Q. 2021, c. 25): since September 2023, employers in Québec must conduct Privacy Impact Assessments before implementing a new personal information collection or processing system, appoint a privacy officer, publish a privacy policy, and obtain explicit consent for sensitive personal information. Background checks and references conducted during hiring are subject to these requirements. **Action:** Confirm the hiring process has been assessed for Law 25 compliance; retain documentation of the PIA.",
      },
      {
        heading: "6. Pay equity — Act respecting pay equity (E-12.001)",
        body: "**Loi sur l'équité salariale**, CQLR c E-12.001: Québec employers with 10 or more employees must complete a pay equity exercise and post the results. The exercise must be reviewed every five years. The offered salary must be consistent with the current pay equity plan for the applicable job class. Non-compliance can result in retroactive pay adjustments payable to all employees in underpaid predominantly female job classes. **Action:** Confirm the salary complies with the current pay equity plan before issuing this offer.",
      },
      {
        heading: "7. Sick leave — ARLS art. 79.1",
        body: "**ARLS art. 79.1**: Québec provides 2 paid days per year after 3 months of service, plus up to 26 weeks of unpaid leave. An additional 24 hours per year may be used for personal reasons. Medical documentation may be requested, but employers are limited in their ability to demand doctor's notes. **Action:** Confirm the employment agreement specifies how sick leave is to be recorded and what documentation is required.",
      },
      {
        heading: "8. Duty to accommodate — Charter of Human Rights and Freedoms",
        body: "**Charter of Human Rights and Freedoms**, CQLR c C-12 (quasi-constitutional): applies to private-sector employers. Employers must accommodate employees with disabilities, religious observances, family status, and other protected characteristics to the point of undue hardship (**Meiorin** standard: *British Columbia (PSERC) v. BCGSEU*, [1999] 3 S.C.R. 3). ARLS art. 59.0.1 also grants the right to refuse overtime when related to family status. **Action:** Ensure the employment agreement includes language committing the Company to reasonable accommodation.",
      },
    ],

    legalNotesFR: [
      {
        heading: "1. Charte de la langue française — Loi 96 / art. 41",
        body: "**Charte de la langue française**, RLRQ c C-11, art. 41 (telle que modifiée par la *Loi sur la langue officielle et commune du Québec, le français*, L.Q. 2022, c. 14, « Loi 96 ») : tout employeur au Québec doit remettre en français les offres d'emploi. Depuis le 1er juin 2023, les contrats d'adhésion au Québec doivent être rédigés en français; une version anglaise peut être remise simultanément, mais seule la version française est contraignante. Ce modèle suit cette structure. **Action :** Confirmer que l'offre est en version française principale; conserver les deux versions au dossier.",
      },
      {
        heading: "2. Code civil du Québec — contrat de travail (art. 2085–2097)",
        body: "**Code civil du Québec**, art. 2085–2097: l'emploi au Québec est régi par le Code civil en plus de la LNT. Le Code civil prévoit que le contrat de travail est celui par lequel une personne s'oblige pour un temps limité à effectuer un travail, sous la direction de l'autre partie, moyennant rémunération. Art. 2094 : si l'employeur a un motif sérieux, le contrat peut être résilié sans préavis. La norme de « cause juste et suffisante » de l'art. 124 de la LNT est interprétée de manière cohérente avec le Code civil.",
      },
      {
        heading: "3. LNT — préavis de cessation et recours (art. 82–124)",
        body: "**Loi sur les normes du travail**, RLRQ c N-1.1: un préavis est requis pour les salarié(e)s ayant 3 mois ou plus de service. Formule : 1 semaine par année de service pour 1–2 ans; 2 semaines par année pour 3 ans ou plus (art. 82 de la LNT). Les salarié(e)s ayant 2 ans ou plus de service continu et congédiés sans cause juste et suffisante peuvent déposer une plainte en vertu de l'art. 124 de la LNT. Ce recours mène à la réintégration ou à une indemnisation. **Action :** Confirmer que la clause de cessation d'emploi respecte ou dépasse les minimums de la LNT.",
      },
      {
        heading: "4. RQAP — prestations parentales et familiales",
        body: "**Régime québécois d'assurance parentale** (RQAP): les salarié(e)s québécois(es) sont couvert(e)s par le RQAP plutôt que par les prestations parentales fédérales d'AE. Le RQAP offre des prestations de maternité (18 semaines), de paternité (5 semaines), parentales (32 ou 40 semaines selon le régime de base ou enrichi), et d'adoption. Les cotisations sont prélevées sur le salaire; le taux de cotisation patronale est établi annuellement par le Conseil de gestion de l'assurance parentale. **Action :** Confirmer que la paie inclut les cotisations au RQAP.",
      },
      {
        heading: "5. Loi 25 — protection des renseignements personnels (P-39.1)",
        body: "**Loi sur la protection des renseignements personnels dans le secteur privé**, RLRQ c P-39.1, telle que modifiée par la Loi 25 (L.Q. 2021, c. 25): depuis septembre 2023, les employeurs au Québec doivent mener une évaluation des facteurs relatifs à la vie privée avant de mettre en œuvre un nouveau système de traitement de renseignements personnels, désigner un responsable, publier une politique de confidentialité et obtenir un consentement explicite pour les renseignements sensibles. Les vérifications d'antécédents sont assujetties à ces exigences. **Action :** Confirmer la conformité du processus d'embauche à la Loi 25.",
      },
      {
        heading: "6. Équité salariale — Loi sur l'équité salariale (E-12.001)",
        body: "**Loi sur l'équité salariale**, RLRQ c E-12.001: les employeurs québécois de 10 personnes salariées ou plus doivent réaliser un exercice d'équité salariale et en afficher les résultats, à réviser tous les cinq ans. Le salaire offert doit être conforme au plan en vigueur. Le non-respect peut entraîner des ajustements de salaire rétroactifs. **Action :** Confirmer la conformité du salaire au plan d'équité salariale avant d'émettre l'offre.",
      },
      {
        heading: "7. Congés de maladie — LNT, art. 79.1",
        body: "**LNT, art. 79.1**: le Québec prévoit 2 jours payés par année après 3 mois de service, plus jusqu'à 26 semaines non payées. Des heures supplémentaires peuvent être utilisées à des fins personnelles. Les demandes de preuves médicales sont limitées. **Action :** Confirmer que le contrat de travail précise comment les congés de maladie sont enregistrés.",
      },
      {
        heading: "8. Obligation d'accommodement — Charte des droits et libertés de la personne",
        body: "**Charte des droits et libertés de la personne**, RLRQ c C-12 (quasi-constitutionnelle) : s'applique aux employeurs du secteur privé. Les employeurs doivent accommoder les salarié(e)s en situation de handicap, observances religieuses, statut familial et autres caractéristiques protégées jusqu'à la contrainte excessive (norme **Meiorin**: *C.-B. (PSERC) c. BCGSEU*, [1999] 3 R.C.S. 3). L'art. 59.0.1 de la LNT accorde aussi le droit de refuser les heures supplémentaires liées au statut familial. **Action :** S'assurer que le contrat de travail inclut un engagement d'accommodement raisonnable.",
      },
    ],
  };
};

// QC-only template
module.exports.onlyJurisdictions = ["QC"];
