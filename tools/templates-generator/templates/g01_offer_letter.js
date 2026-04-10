// G01 — Offer of Employment (jurisdiction-parameterized)
// Exports a function(j) that returns template object with jurisdiction-specific content
// 14 sections EN + FR, Waksdale-clean, variable comp disclaimer,
// Probation language, entire-agreement, governing law, ILA note.
// Legal notes customized per jurisdiction (ON/QC/BC/AB/FED).

"use strict";

module.exports = function(j) {
  // j is the jurisdiction object from jurisdiction_data.js
  // Contains fields like j.shortEN, j.statuteEN, j.overtimeHours, etc.

  const rightToDisconnectSection = j.rightToDisconnect === true
    ? {
        type: "p",
        text: `If you work in ${j.nameEN} and the Company employs 25 or more employees, you will receive a copy of the Company's written **Right to Disconnect Policy** (as required by the *${j.statuteEN}*, ${j.rtdStatEN}). This policy describes your right to disengage from work communications outside of scheduled hours. A copy will be provided on or before your start date.${j.electronicMon === true ? ` You will also receive the Company's **Electronic Monitoring Policy** (${j.emStatEN}), which describes how the Company may monitor electronic devices or systems.` : ""}`
      }
    : {
        type: "p",
        text: `${j.nameEN} does not have a statutory right-to-disconnect requirement. However, the Company is committed to respecting work-life balance and ensuring that employees are not expected to remain available outside scheduled hours without reasonable cause. The Company maintains a clear policy on electronic monitoring: any monitoring is conducted transparently, only for legitimate business purposes, and in compliance with applicable privacy legislation (${j.privacyStatEN}). Employees will be informed in writing of any electronic monitoring that may occur.`
      };

  return {
    id: "T01",
    slug: "Offer_Letter",
    kind: "letter",
    titleEN: "Offer of Employment",
    titleFR: "Offre d'emploi",

    bodyEN: [
      { type: "date" },
      { type: "address", lines: [
        "{{employee_name}}",
        "{{employee_address_line_1}}",
        "{{employee_address_line_2}}",
      ]},
      { type: "re", text: "Offer of Employment — {{position_title}}" },
      { type: "p", text: "Dear {{employee_first_name}}," },
      { type: "p", text: "We're delighted to offer you the position of **{{position_title}}** at **{{employer_legal_name}}** (the **Company**). Our team was genuinely impressed by what you bring, and we'd be thrilled to have you join us. This letter sets out the main terms of your employment. Please read it carefully — and if you have any questions before signing, please reach out. We want you to feel confident about what you're agreeing to." },

      { type: "h2", text: "1. Role, start date and reporting" },
      { type: "p", text: "Your position is **{{position_title}}**, reporting to **{{manager_name}}**, **{{manager_title}}**. Your employment will begin on **{{start_date}}**, and your primary place of work will be **{{work_location}}**. A description of your key responsibilities is attached as Schedule A. Your role may reasonably evolve over time, and the Company may assign you related duties consistent with your position and skill set." },

      { type: "h2", text: "2. Employment type and hours" },
      { type: "p", text: `This is a **{{employment_type}}** position. Your regular scheduled hours are **{{scheduled_hours_per_week}}** hours per week, generally **{{regular_hours}}**. Overtime hours beyond ${j.overtimeHours} per week are subject to the overtime rules under the ${j.shortEN}: ${j.overtimeNoteEN} Nothing in this offer entitles you to work overtime, or requires the Company to assign it.` },

      { type: "h2", text: "3. Base salary" },
      { type: "p", text: "Your base salary is **{{annual_base_salary}}** per year, paid **{{pay_frequency}}** by direct deposit, less all required statutory deductions. Your compensation will be reviewed annually as part of the Company's regular performance and compensation cycle. A review does not guarantee an increase." },

      { type: "h2", text: "4. Variable compensation" },
      { type: "p", text: "You will be eligible to participate in **{{variable_comp_plan_name}}** (the **Plan**), with a target of **{{variable_comp_target}}**, subject to the terms of the Plan as amended from time to time. **The Plan is entirely discretionary.** Eligibility in one period does not create an entitlement in any other. Unless the Plan expressly provides otherwise, a bonus or incentive award is not earned or payable until the payment date, and is not payable to employees who have resigned or been notified of termination prior to that date. The Company reserves the right to amend or discontinue the Plan at any time on reasonable notice." },

      { type: "h2", text: "5. Benefits and wellness" },
      { type: "p", text: "You will be enrolled in the Company's **{{benefits_plan_name}}** group benefits plan (health, dental, life and long-term disability insurance) effective **{{benefits_start_date}}**, subject to the insurer's eligibility requirements. Benefits are governed by the applicable insurance contracts, which prevail over any summary. We also provide access to our Employee and Family Assistance Program — confidential counselling, mental health support and practical life assistance — available to you and your immediate family from day one. Rest and wellbeing are not luxuries; they're part of doing your best work." },

      { type: "h2", text: "6. Vacation" },
      { type: "p", text: `You will receive **{{vacation_weeks}}** weeks of paid vacation per year, which meets or exceeds the minimum entitlement under the ${j.shortEN} (${j.vacStatEN}). ${j.vacEnhancedEN ? `After ${j.code === "QC" ? "3" : "5"} years of continuous service, you will be entitled to ${j.vacEnhancedEN}.` : ""} Vacation accrues from your first day, is subject to reasonable scheduling with your manager, and carries over only as permitted under Company policy and applicable law.` },

      { type: "h2", text: "7. Leaves of absence" },
      { type: "p", text: `You are entitled to all statutory leaves of absence available under the ${j.shortEN} and ${j.civilLawStatEN ? `${j.civilLawStatEN}` : "employment standards legislation that applies to your province"} — including, as applicable, parental leave (${j.parentalStatEN}), family responsibility leave, ${j.paidSickDays > 0 ? `${j.paidSickDays} paid sick leave days per year (${j.sickLeaveEN})` : `sick leave (${j.sickLeaveEN})`}, bereavement leave and domestic or sexual violence leave. The Company's leave policies align with or exceed statutory minimums. We are committed to ensuring leaves are taken, not pressured away from.` },

      rightToDisconnectSection,

      { type: "h2", text: "9. Probationary period" },
      { type: "p", text: `The first **{{probation_length}}** of your employment is a probationary period. This is a mutual assessment — a chance for us to confirm the fit and for you to decide whether the role is right for you. The statutory probationary period under the ${j.shortEN} is ${j.probationMonths} months. During this statutory period, the minimum notice of termination under the ${j.shortEN} does not apply. After the ${j.probationMonths}-month statutory probationary period has elapsed, even if the contractual probationary period continues, statutory minimums under the ${j.shortEN} apply. If your employment is terminated during the probationary period, you will receive at least the minimum notice (or pay in lieu) to which you are entitled by law.` },

      { type: "h2", text: "10. Confidentiality and intellectual property" },
      { type: "p", text: "As a condition of your employment, you agree to hold the Company's confidential information in strict confidence — during your employment and after it ends. Any work product, inventions, developments or improvements you create in the scope of your employment, or using Company resources, are the exclusive property of the Company. The full terms of these obligations are set out in the Employment Agreement." },

      { type: "h2", text: "11. Ending the employment" },
      { type: "p", text: `We genuinely hope this will be a long and rewarding relationship. If that changes. Under the ${j.shortEN} (${j.termStatEN}):` },
      { type: "bullet", text: "**By you (resignation):** You agree to provide **{{employee_notice_period}}** written notice of resignation. The Company may waive all or part of this notice and pay out the remainder, at its discretion." },
      { type: "bullet", text: `**By the Company, without cause:** The Company may terminate your employment without cause by providing you with written notice, or pay in lieu of notice (or a combination), in an amount equal to **{{employer_without_cause_notice}}**, which the parties agree is no less than the minimum entitlement under the ${j.shortEN}. ${j.hasSeverance ? `If you have worked for the Company for 5 or more years and the Company's payroll is $2.5 million or more, you may also be entitled to severance pay under the ${j.severanceStat} (${j.severanceFormEN}).` : `${j.code === "BC" ? "Note: British Columbia does not provide separate statutory severance pay — only notice or pay in lieu." : `${j.code === "AB" ? "Note: Alberta does not provide separate statutory severance pay — only notice or pay in lieu." : ""}`}`} This clause, read together with the Employment Agreement, constitutes the entirety of your entitlement upon a without-cause termination, in lieu of any common law or other notice entitlement.` },
      { type: "bullet", text: `**By the Company, for cause:** The Company may terminate your employment for just cause under the ${j.shortEN}, without notice or pay in lieu, to the extent permitted by law. Just cause means conduct that constitutes a material breach of the employment relationship and cannot reasonably be remedied.` },
      { type: "p", text: `For greater certainty, nothing in this section displaces your statutory minimum entitlements — including notice of termination and severance pay — under the ${j.shortEN}. Those entitlements will always be honoured.` },

      { type: "h2", text: "12. Conditions of this offer" },
      { type: "p", text: "This offer is conditional on:" },
      { type: "bullet", text: "Your legal authorization to work in Canada for the duration of your employment;" },
      { type: "bullet", text: "Satisfactory completion of the background and reference checks described to you during the hiring process, conducted in accordance with applicable privacy legislation;" },
      { type: "bullet", text: "Your execution of the Employment Agreement, Confidentiality Agreement and any other onboarding documents on or before your start date;" },
      { type: "bullet", text: "Your confirmation, as a representation, that accepting this offer does not breach any contractual obligation — including any non-compete, non-solicit or confidentiality obligation — owed to a current or former employer." },

      { type: "h2", text: "13. Governing law and entire agreement" },
      { type: "p", text: `This offer letter, together with the Employment Agreement and any schedules, constitutes the entire agreement between you and the Company with respect to the terms of your employment, and supersedes all prior discussions, representations or understandings — written or oral. It is governed by the laws of the ${j.govLawEN} and the laws of Canada applicable therein. The ${j.shortEN} (${j.statuteCiteEN}) is the primary employment statute that governs your minimum statutory entitlements. No amendment to this letter is effective unless made in writing and signed by both parties.` },

      { type: "h2", text: "14. How to accept" },
      { type: "p", text: "If you'd like to accept, please sign and return a copy to **{{hr_contact_name}}** at **{{hr_contact_email}}** by **{{offer_expiry_date}}**. We encourage you to take the time you need to review it, and to seek independent legal advice if you wish — that is entirely your right. If you have questions about anything at all, please reach out." },
      { type: "p", text: "We're looking forward to working with you." },

      { type: "signoff", closing: "Warmly," },
      { type: "spacer" },
      { type: "sig" },
    ],

    bodyFR: [
      { type: "date" },
      { type: "address", lines: [
        "{{employee_name}}",
        "{{employee_address_line_1}}",
        "{{employee_address_line_2}}",
      ]},
      { type: "re", text: "Offre d'emploi — {{position_title}}" },
      { type: "p", text: "Bonjour {{employee_first_name}}," },
      { type: "p", text: "Nous sommes ravis de vous offrir le poste de **{{position_title}}** chez **{{employer_legal_name}}** (la **Société**). Notre équipe a été sincèrement impressionnée par ce que vous apportez, et nous serions ravis de vous accueillir. La présente lettre expose les principales conditions de votre emploi. Lisez-la attentivement — et si vous avez des questions avant de signer, n'hésitez pas à nous écrire. Nous voulons que vous vous sentiez à l'aise avec ce à quoi vous consentez." },

      { type: "h2", text: "1. Poste, date d'entrée en fonction et lien hiérarchique" },
      { type: "p", text: "Votre poste est **{{position_title}}**, sous la responsabilité de **{{manager_name}}**, **{{manager_title}}**. Votre emploi commencera le **{{start_date}}**, et votre lieu de travail principal sera **{{work_location}}**. Une description de vos principales responsabilités est jointe à titre d'Annexe A. Votre rôle pourra évoluer raisonnablement au fil du temps, et la Société pourra vous confier des tâches connexes compatibles avec votre poste et vos compétences." },

      { type: "h2", text: "2. Type d'emploi et horaire" },
      { type: "p", text: `Il s'agit d'un poste **{{employment_type}}**. Votre horaire régulier est de **{{scheduled_hours_per_week}}** heures par semaine, généralement **{{regular_hours}}**. Les heures supplémentaires au-delà de ${j.overtimeHours} heures par semaine sont assujetties aux règles relatives aux heures supplémentaires en vertu du ${j.shortFR} : ${j.overtimeNoteFR} Rien dans la présente offre ne vous confère le droit d'effectuer des heures supplémentaires ni n'oblige la Société à vous en attribuer.` },

      { type: "h2", text: "3. Salaire de base" },
      { type: "p", text: "Votre salaire de base est de **{{annual_base_salary}}** par année, versé **{{pay_frequency}}** par dépôt direct, sous réserve de toutes les retenues à la source obligatoires. Votre rémunération sera révisée annuellement dans le cadre du cycle régulier de rendement et de rémunération de la Société. Une révision ne garantit pas une augmentation." },

      { type: "h2", text: "4. Rémunération variable" },
      { type: "p", text: "Vous serez admissible au **{{variable_comp_plan_name}}** (le **Régime**), avec une cible de **{{variable_comp_target}}**, sous réserve des modalités du Régime, lesquelles peuvent être modifiées à l'occasion. **Le Régime est entièrement discrétionnaire.** L'admissibilité au cours d'une période ne crée aucun droit pour une période ultérieure. Sauf disposition contraire expresse du Régime, une prime n'est ni gagnée ni payable avant la date de versement, et n'est pas payable aux personnes salariées qui ont démissionné ou qui ont reçu un avis de cessation d'emploi avant cette date. La Société se réserve le droit de modifier ou d'abolir le Régime à tout moment moyennant un préavis raisonnable." },

      { type: "h2", text: "5. Avantages sociaux et bien-être" },
      { type: "p", text: "Vous serez inscrit au régime collectif d'avantages sociaux **{{benefits_plan_name}}** de la Société (assurance maladie, soins dentaires, assurance-vie et assurance-invalidité longue durée), à compter de **{{benefits_start_date}}**, sous réserve des exigences d'admissibilité de l'assureur. Les avantages sociaux sont régis par les contrats d'assurance applicables, qui prévalent sur toute description. Vous avez également accès au Programme d'aide aux employés et à leur famille — services de counseling confidentiel, soutien en santé mentale et assistance pratique — accessible à vous et à votre famille immédiate dès le premier jour. Le repos et le bien-être ne sont pas des luxes; ils font partie intégrante du travail efficace." },

      { type: "h2", text: "6. Congés de vacances" },
      { type: "p", text: `Vous aurez droit à **{{vacation_weeks}}** semaines de congés payés par année, ce qui rencontre ou dépasse l'entitlement minimum en vertu du ${j.shortFR} (${j.vacStatFR}). ${j.vacEnhancedFR ? `Après ${j.code === "QC" ? "3" : "5"} ans de service continu, vous aurez droit à ${j.vacEnhancedFR}.` : ""} Les congés s'accumulent dès votre premier jour, sont assujettis à une planification raisonnable avec votre gestionnaire, et peuvent être reportés uniquement tel que le permet la politique de la Société et la loi applicable.` },

      { type: "h2", text: "7. Congés et absences" },
      { type: "p", text: `Vous avez droit à tous les congés obligatoires prévus par le ${j.shortFR}${j.civilLawStatFR ? ` et le ${j.civilLawStatFR}` : ""} — notamment le congé parental (${j.parentalStatFR}), le congé pour responsabilités familiales, ${j.paidSickDays > 0 ? `${j.paidSickDays} journées de congé de maladie payées par année (${j.sickLeaveFR})` : `le congé de maladie (${j.sickLeaveFR})`}, le congé de deuil et le congé liée à la violence familiale ou sexuelle. Les politiques de congé de la Société respectent ou dépassent les minimums légaux. Nous nous engageons à faire en sorte que les congés soient pris, et non découragés.` },

      j.rightToDisconnect === true
        ? {
            type: "p",
            text: `Si vous travaillez au ${j.nameFR} et la Société emploie 25 salariés ou plus, vous recevrez une copie de la politique écrite **Droit à la déconnexion** de la Société (tel que requis par la *${j.statuteFR}*, ${j.rtdStatFR}). Cette politique décrit votre droit de vous désengager des communications liées au travail en dehors des heures régulières. Une copie vous sera remise au plus tard à votre date de début.${j.electronicMon === true ? ` Vous recevrez également la politique **Surveillance électronique** de la Société (${j.emStatFR}), qui décrit comment la Société peut surveiller les appareils ou systèmes électroniques.` : ""}`
          }
        : {
            type: "p",
            text: `Le ${j.nameFR} n'a pas d'obligation légale relative au droit à la déconnexion. Cependant, la Société s'engage à respecter l'équilibre travail-vie personnelle et à s'assurer que les salariés ne sont pas tenus de rester disponibles en dehors des heures régulières sans motif raisonnable. La Société maintient une politique claire concernant la surveillance électronique : toute surveillance est effectuée de manière transparente, uniquement aux fins commerciales légitimes, et en conformité avec la loi applicable sur la protection des renseignements personnels (${j.privacyStatFR}). Les salariés seront informés par écrit de toute surveillance électronique qui pourrait avoir lieu.`
          },

      { type: "h2", text: "9. Période de probation" },
      { type: "p", text: `Le premier **{{probation_length}}** de votre emploi constitue une période de probation. C'est une évaluation mutuelle — une occasion pour nous de confirmer l'adéquation du poste et pour vous de déterminer si le rôle vous convient. La période de probation légale en vertu du ${j.shortFR} est de ${j.probationMonths} mois. Pendant cette période légale, le préavis minimum de cessation d'emploi en vertu du ${j.shortFR} ne s'applique pas. Une fois que cette période de ${j.probationMonths} mois s'est écoulée, même si la période de probation contractuelle se poursuit, les minimums légaux en vertu du ${j.shortFR} s'appliquent. Si votre emploi est résilié au cours de la période de probation, vous recevrez au minimum le préavis (ou l'indemnité compensatrice) auquel vous avez droit par la loi.` },

      { type: "h2", text: "10. Confidentialité et propriété intellectuelle" },
      { type: "p", text: "Vous vous engagez à tenir les renseignements confidentiels de la Société dans le plus strict secret — pendant et après votre emploi. Tout travail, invention, création, développement ou amélioration que vous créez dans le cadre de vos fonctions ou en utilisant les ressources de la Société sont la propriété exclusive de la Société. L'intégralité des obligations à cet égard sont énoncées dans le Contrat de travail." },

      { type: "h2", text: "11. Cessation d'emploi" },
      { type: "p", text: `Nous espérons sincèrement que ce sera une relation longue et enrichissante. Si les choses changent, en vertu du ${j.shortFR} (${j.termStatFR}) :` },
      { type: "bullet", text: "**Par vous (démission) :** Vous acceptez de donner **{{employee_notice_period}}** avis écrit de démission. La Société peut renoncer à une partie ou à la totalité de cet avis et payer le reste, à sa discrétion." },
      { type: "bullet", text: `**Par la Société, sans motif :** La Société peut résilier votre emploi sans motif en vous donnant un avis écrit, ou une indemnité en tenant lieu (ou une combinaison), pour un montant égal à **{{employer_without_cause_notice}}**, ce que les parties reconnaissent comme étant au minimum l'indemnité requise par le ${j.shortFR}. ${j.hasSeverance ? `Si vous avez travaillé pour la Société pendant 5 ans ou plus et la masse salariale de la Société est de 2,5 millions de dollars ou plus, vous pouvez également avoir droit à une indemnité de départ en vertu du ${j.severanceStat} (${j.severanceFormFR}).` : `${j.code === "QC" ? "En vertu de la Loi, un délai-congé ou une indemnité compensatrice est la principale protection; voir aussi l'art. 124 pour le congédiement injustifié après 2 ans de service." : ""}`} Cette clause, lue conjointement avec le Contrat de travail, constitue la totalité de votre entitlement lors d'une cessation sans motif, en lieu et place de tout droit en vertu de la common law ou autre.` },
      { type: "bullet", text: `**Par la Société, pour motif valable :** La Société peut résilier votre emploi pour motif valable en vertu du ${j.shortFR}, sans avis ni indemnité compensatrice, dans la mesure permise par la loi. Le motif valable signifie une conduite qui constitue une violation matérielle de la relation d'emploi et ne peut raisonnablement être corrigée.` },
      { type: "p", text: `Pour éviter toute confusion, rien dans cette section ne limite vos droits minimums aux termes du ${j.shortFR} — notamment le préavis de cessation d'emploi et l'indemnité de départ. Ces droits seront toujours respectés.` },

      { type: "h2", text: "12. Conditions de l'offre" },
      { type: "p", text: "Cette offre est assujettie aux conditions suivantes :" },
      { type: "bullet", text: "Votre autorisation légale de travailler au Canada pour la durée de votre emploi;" },
      { type: "bullet", text: "L'accomplissement satisfaisant des vérifications d'antécédents et de références décrites lors du processus d'embauche, effectuées conformément à la loi applicable sur la protection des renseignements personnels;" },
      { type: "bullet", text: "Votre signature du Contrat de travail, l'Accord de confidentialité et tout autre document d'intégration au plus tard à votre date de début;" },
      { type: "bullet", text: "Votre confirmation, à titre de déclaration, que l'acceptation de cette offre ne viole aucune obligation contractuelle — y compris toute obligation de non-concurrence, de non-sollicitation ou de confidentialité — envers un employeur actuel ou antérieur." },

      { type: "h2", text: "13. Loi applicable et accord intégral" },
      { type: "p", text: `La présente lettre d'offre, conjointement avec le Contrat de travail et tout document annexe, constitue l'accord intégral entre vous et la Société concernant les conditions de votre emploi, et remplace toutes les discussions, représentations ou ententes antérieures — écrites ou verbales. Elle est régie par les lois de la ${j.govLawFR} et les lois du Canada qui s'y appliquent. Le ${j.shortFR} (${j.statuteCiteFR}) est la loi principale sur l'emploi qui régit vos droits minimums aux termes du régime légal. Aucune modification à cette lettre ne prend effet à moins d'être faite par écrit et signée par les deux parties.` },

      { type: "h2", text: "14. Comment accepter" },
      { type: "p", text: "Si vous souhaitez accepter, veuillez signer et retourner une copie à **{{hr_contact_name}}** à **{{hr_contact_email}}** avant le **{{offer_expiry_date}}**. Nous vous encourageons à prendre le temps dont vous avez besoin pour l'examiner, et à obtenir des conseils juridiques indépendants si vous le souhaitez — c'est entièrement votre droit. Si vous avez des questions, n'hésitez pas à nous contacter." },
      { type: "p", text: "Nous sommes heureux de vous accueillir dans notre équipe." },

      { type: "signoff", closing: "Cordialement," },
      { type: "spacer" },
      { type: "sig" },
    ],

    // ========================================================================
    // LEGAL NOTES — Jurisdiction-specific
    // ========================================================================
    legalNotesEN: j.code === "ON" ? [
      {
        heading: "1. Waksdale risk: termination for cause clause scope",
        body: "Waksdale v. Swegon North America Inc., 2020 ONCA 391: if the for-cause clause invokes a standard broader than the ESA (which requires 'wilful disobedience, deliberate disregard, or conduct amounting to wilful or gross negligence'), the entire termination section is void and the employee is entitled to common-law reasonable notice. Dufault v. The Corporation of the Township of Ignace, 2024 ONSC 1029 extended this: language like 'active employment' or overly broad cause triggers can void the provision. **Action:** The cause clause must track ESA ss. 57–60 precisely; use only statutory language.",
      },
      {
        heading: "2. Common-law reasonable notice (Bardal factors)",
        body: "If the termination clause is struck down, the employee is owed common-law notice, determined by Bardal v. Globe & Mail Ltd., (1960) 24 DLR (2d) 140 (Ont. HC): age, length of service, nature of position, and availability of comparable employment. Senior executives may be entitled to 18–24 months' notice. The without-cause clause in §11 aims to displace this, but only if itself valid.",
      },
      {
        heading: "3. Variable compensation: risk of contractual integration",
        body: "Kieran v. Ingram Micro Inc., 2004 ONCA 168; Paquette v. TeraGo Networks Inc., 2016 ONCA 618: variable compensation may be implicitly integrated into the contract if paid consistently without a clear disclaimer. The discretionary language and 'payment date' requirement in §4 mitigate this, but only if the Plan document itself contains identical restrictions. **Action:** Verify Plan is expressly incorporated by reference and contains matching disclaimers.",
      },
      {
        heading: "4. Probation period: statutory vs. contractual",
        body: "ESA s. 54(1)(b) exempts the employer from providing notice only during the first three months. A longer contractual probation does not extend this exemption. After month 3, statutory notice applies. **Action:** Do not suggest the employee can be fired without notice during an extended contractual probation — this is legally inaccurate after month 3.",
      },
      {
        heading: "5. Right to disconnect and electronic monitoring (25+ employees)",
        body: "ESA s. 21.1.2 (Working for Workers Act, 2021, S.O. 2021, c. 34): employers with 25+ employees as of January 1 must have a written right-to-disconnect policy by March 1 and must deliver it within 30 days of hire. ESA s. 41.1.1: same threshold; written electronic monitoring policy required; delivered within 30 days of hire. Maximum penalty for violation: $50,000 (individual), $100,000 (corporation). **Action:** Confirm headcount; use Template T10 (Right to Disconnect and Electronic Monitoring Policy) if applicable.",
      },
      {
        heading: "6. Vacation entitlement and carryover",
        body: "ESA ss. 33–42: minimum 2 weeks after 12 months continuous service; 4% vacation pay alternative. After 5 years, minimum 3 weeks or 6% (s. 35.2). Vacation must be taken within 12 months or, if the employer requests, within 24 months. Employers may cap carryover, but the cap must be written and the first year's vacation must be taken. Unused vacation is payable on termination (s. 11). **Action:** Review and update the Vacation Policy to ensure carryover terms are legally compliant.",
      },
      {
        heading: "7. Sick leave (3 unpaid days/year, ESA s. 50.0.1)",
        body: "Ontario provides 3 unpaid sick days per year, effective January 1, 2018. Many employers provide paid sick leave by policy, which exceeds the statutory floor. If the company offers paid sick days, the offer letter and handbook must clearly state the entitlement (e.g., 5 paid sick days, or 'up to X days per year'). The company's policy overrides the statutory minimum if more generous. **Action:** Confirm the sick leave entitlement in the benefits summary and sync with the handbook.",
      },
      {
        heading: "8. Severance pay (ESA s. 64) — narrow eligibility",
        body: "ESA s. 64: severance (1 week per year of service, max 26 weeks) is owed only if the employer has a payroll of $2.5M+ and the employee has 5+ continuous years of service. Severance is distinct from notice. Most small to mid-sized employers do not trigger this threshold. **Action:** Confirm payroll before offering severance; if triggered, ensure the termination clause explicitly states the severance formula.",
      },
      {
        heading: "9. Pay equity (Pay Equity Act, R.S.O. 1990, c. P.7)",
        body: "Mandatory for employers with 10+ employees. The employer must maintain a pay-equity plan ensuring employees in substantially the same role (job-to-job method) or proportional-value work (proportional method) receive equal pay for equal or substantially equal work. The salary offered must be compliant. **Action:** Before issuing the offer, verify the proposed salary against the company's pay-equity plan or request a compliance review from HR.",
      },
      {
        heading: "10. Independent legal advice (ILA) and unconscionability",
        body: "This offer does not require ILA as a condition of validity. However, ILA reduces the risk of the employee later challenging the termination clause as unconscionable or lacking consideration. Best practice: provide 48–72 hours to review (this offer does in §14). For C-suite hires (SVP and above), consider expressly encouraging ILA in the covering email and documenting it in the file. The absence of ILA is not fatal if the employee has ample time to review and opportunity to obtain advice.",
      },
    ] : j.code === "QC" ? [
      {
        heading: "1. Waksdale and Civil Code art. 2092 — termination clause invalidity",
        body: "Waksdale v. Swegon North America Inc., 2020 ONCA 391 is an Ontario decision, but Québec courts apply the Civil Code of Québec art. 2092, which grants an absolute right to reasonable notice. Any contractual term that derogates from this right is without effect (ARLS art. 93). An overly broad cause clause may render the entire termination section unenforceable. The burden is on the employer to prove that the restriction does not exceed what is necessary. **Action:** The cause clause must strictly adhere to ARLS criteria for 'just cause'; avoid common-law language.",
      },
      {
        heading: "2. Wrongful dismissal remedy (ARLS art. 124)",
        body: "Art. 124: after 2 years continuous service, an employee can file a complaint with the Commission des relations du travail (now Tribunal administratif du travail, or TAT) for wrongful dismissal without just cause. The TAT may order reinstatement, back pay (up to one year), moral damages, and compensatory damages. This is a statutory recourse distinct from notice/indemnity under art. 82. **Action:** Ensure the offer and employment agreement acknowledge this recourse and do not purport to waive it.",
      },
      {
        heading: "3. Termination notice and indemnity (ARLS art. 82)",
        body: "Art. 82: the employer must give written notice according to a graduated scale: 1 week per year of service for the first two years; 2 weeks per year for 3+ years. Alternatively, the employer may pay an indemnity in lieu. The indemnity formula must be applied in writing at or before termination. The notice period begins the day the employee is notified. **Action:** The offer should specify which method the company will use (notice vs. indemnity in lieu) or confirm it will follow art. 82 at termination.",
      },
      {
        heading: "4. Probation period and statutory minimum (3 months)",
        body: "ARLS does not explicitly define probation, but Québec jurisprudence recognizes a probationary period of up to 3 months during which notice is not required. After 3 months, art. 82 notice applies. A contractual probation longer than 3 months does not extend the notice exemption. **Action:** Clearly state the probationary period (typically 3 months) and confirm that statutory notice applies after that period.",
      },
      {
        heading: "5. Vacation entitlement and carryover (ARLS arts. 66–77)",
        body: "Art. 68: minimum 2 weeks' vacation (4%) per year, plus 1 additional day after 5 years, then increasing to 6% (art. 77). Vacation must be taken within 12 months of accrual; employers may impose a carryover limit only for the first 12 months. Unused vacation is payable on termination (art. 77). **Action:** Review carryover rules; ensure the handbook does not impose an indefinite limit or forfeit clause.",
      },
      {
        heading: "6. Sick leave and personal days (ARLS art. 79.1)",
        body: "Art. 79.1: employees are entitled to 2 days of paid leave per year for personal or family illness, plus up to 24 unpaid hours annually for other reasons (medical appointments, family crisis, etc.). Many employers provide more generous policies. The company's policy overrides the minimum if more generous. **Action:** Confirm the sick leave entitlement in the benefits summary and sync with the handbook.",
      },
      {
        heading: "7. Overtime rules (ARLS art. 55, right to refuse)",
        body: "Art. 55: overtime is payable at 1.5× for hours beyond 40 per week. Art. 59.0.1: an employee may refuse overtime if the refusal is based on family-status grounds (e.g., responsibilities for children, elderly parents). This right cannot be waived. **Action:** Ensure the offer and handbook acknowledge the right to refuse overtime in family situations.",
      },
      {
        heading: "8. Language of contract (Bill 96, Charter of the French Language)",
        body: "Bill 96 (Act to Amend the Charter of the French Language, S.Q. 2022, c. 14), s. 41: employment agreements must be provided in French. An employee may request an English version, but the French version prevails in case of conflict. All mandatory documentation (offer letter, employment agreement, handbook) must be available in French. **Action:** Ensure all templates are translated into French and provided to Québec employees from day one.",
      },
      {
        heading: "9. Pay equity (Loi sur l'équité salariale, RLRQ c E-12.001)",
        body: "Mandatory for employers with 10+ employees. Exercises must be conducted and updated every 5 years. The salary offered must comply with the company's pay-equity evaluation. Non-compliance can result in back-pay adjustments and fines imposed by the CNESST. **Action:** Before issuing the offer, verify the proposed salary against the company's pay-equity exercise.",
      },
      {
        heading: "10. Régime québécois d'assurance parentale (RQAP)",
        body: "Québec administers its own parental benefits regime (RQAP), not federal EI. Employees contribute to RQAP and receive benefits through the Conseil de gestion de l'assurance parentale. Parental leave under ARLS arts. 81.4–81.17 is coordinated with RQAP, which provides more generous benefits than federal EI (up to 69 weeks combined parental + maternity, vs. federal 18 months total). **Action:** Direct Québec employees to Service Canada and the RQAP website for parental benefit information.",
      },
    ] : j.code === "BC" ? [
      {
        heading: "1. Termination clause enforceability (BC ESA s. 4)",
        body: "BC ESA s. 4: any term in an agreement that purports to exclude or limit the rights of an employee under the Act is void. Waksdale v. Swegon North America Inc., 2020 ONCA 391 is an Ontario decision, but BC courts have not yet definitively adopted the same approach. However, BC common law requires that termination clauses not derogate below statutory minimums (BC ESA ss. 63–64). **Action:** Ensure the clause does not attempt to contract out of or limit statutory notice or severance rights.",
      },
      {
        heading: "2. Notice of termination (BC ESA s. 63, s. 64)",
        body: "s. 63: notice must be given at least 2 weeks (or 8 weeks for group terminations of 50+). If notice is not given, the employer must pay wages in lieu. There is no statutory severance separate from notice in BC, unlike Ontario ESA s. 64 or the CLC. **Action:** The offer must state that the company will provide notice or pay in lieu as required by s. 63.",
      },
      {
        heading: "3. Final pay and wage deductions (BC ESA s. 18)",
        body: "s. 18(1): all wages must be paid within 48 hours of termination. s. 18(2): if the employee provides notice of resignation, final payment must be made within 6 days of the last day of work. Deductions from pay are permitted only for statutory obligations (tax, EI, CPP, child support) or with written authorization (union dues, benefits, pension). **Action:** Ensure payroll is instructed to pay all wages owing within the 48-hour window.",
      },
      {
        heading: "4. Vacation entitlement (BC ESA ss. 57–61)",
        body: "s. 58: minimum 2 weeks (4%) per year; 3 weeks (6%) after 5 years continuous service. Vacation must be taken within 12 months of accrual. Employers may defer carryover only by written agreement and only to the following calendar year. Unused vacation is payable on termination (pro-rated). **Action:** Verify the vacation policy complies with carryover and payout rules.",
      },
      {
        heading: "5. Paid sick days (BC ESA s. 49.1, effective 2022)",
        body: "s. 49.1 (effective January 1, 2022): employees are entitled to 5 paid sick days per year. Additionally, s. 49 provides unpaid illness or injury leave (unlimited). The 5-day entitlement is non-negotiable and cannot be rolled into vacation or other leave. **Action:** Confirm the benefits summary clearly states 5 paid sick days per year.",
      },
      {
        heading: "6. Probation and notice exemption (BC ESA ss. 63–64)",
        body: "The BC ESA does not explicitly exempt employees within a probation period from notice. All employees are entitled to the notice in s. 63 (2 weeks minimum) regardless of probation status. A contractual probation may exist, but it does not affect statutory notice rights. **Action:** Do not suggest that probationary employees can be terminated without notice — they cannot.",
      },
      {
        heading: "7. Non-compete agreements (Shafron principle, 'no blue-pencilling')",
        body: "Shafron v. KRG Insurance Brokers (Western) Inc., 2009 SCC 6: BC courts will not rewrite (blue-pencil) an overly broad restrictive covenant. If a non-compete is unreasonably broad in duration, geography, or scope of activity, the entire covenant is void. **Action:** Any non-compete must be carefully tailored to legitimate protectable interests (trade secrets, customer relationships) and reasonable temporal/geographic limits.",
      },
      {
        heading: "8. Privacy protection (PIPA, S.B.C. 2003, c. 63)",
        body: "BC is a 'substantially similar' province under federal PIPEDA rules, so provincial employers are subject to PIPA instead of PIPEDA. PIPA sets out principles for collection, use, and disclosure of personal information. Background checks must be conducted with consent and for legitimate business purposes. **Action:** Ensure background check procedures comply with PIPA requirements and include explicit consent.",
      },
      {
        heading: "9. Human Rights Code and accommodation (BC HRC, R.S.B.C. 1996, c. 210)",
        body: "BC Human Rights Code protects employees from discrimination on grounds including disability, family status, gender identity, and religion. The Meiorin test (British Columbia (Public Service Employee Relations Commission) v. BCGSEU, [1999] 3 S.C.R. 3) applies: any employment requirement must be (a) rationally related to the job, (b) adopted in good faith, (c) reasonably necessary. Employers must accommodate to the point of undue hardship. **Action:** Ensure all job requirements are job-related and documented; document any accommodation requests.",
      },
      {
        heading: "10. No mandatory pay equity in BC (as of 2026)",
        body: "Unlike Ontario, Québec, and Alberta, BC has no mandatory pay equity legislation as of 2026. Federal Pay Equity Act applies only to federally regulated employers. Voluntary guidance is available from the Province. Non-unionized BC employers have no statutory obligation to conduct pay-equity analyses. **Action:** Salary-setting is discretionary, but best practice is to conduct an informal equity review to avoid discrimination claims under the Human Rights Code.",
      },
    ] : j.code === "AB" ? [
      {
        heading: "1. Termination clause scope and validity (AB ESC s. 56)",
        body: "AB ESC s. 56: an employer may not deprive an employee of statutory rights through a contract. Any term that purports to limit notice or severance below statutory minimums is void. AB courts have not yet adopted a Waksdale-style rule, but the principle that termination clauses cannot contract out of statutory minimums is established. **Action:** The clause must not attempt to reduce notice below the AB ESC formula.",
      },
      {
        heading: "2. Notice of termination (AB ESC ss. 56–57)",
        body: "s. 56: notice is calculated as 1 week per completed year of service (minimum 1 week, maximum 8 weeks). There is no separate statutory severance in Alberta like Ontario ESA s. 64. Notice is the primary remedy for termination without cause. **Action:** The offer should calculate and disclose the expected notice period based on tenure.",
      },
      {
        heading: "3. Final pay (AB ESC s. 77)",
        body: "s. 77: all wages (including notice pay or pay in lieu) must be paid within 10 days of termination, or by the next regular pay date if that is sooner. **Action:** Ensure payroll is instructed to process final pay within the statutory window.",
      },
      {
        heading: "4. Vacation entitlement (AB ESC ss. 55–56)",
        body: "s. 55: minimum 2 weeks (4%) per year. There is no enhanced entitlement (like BC's 6% after 5 years or QC's 3 weeks after 3 years). Vacation is typically paid as a percentage of gross wages (not a fixed amount). Carryover is limited; employers may impose a 'use it or lose it' rule if written notice is given at least 30 days in advance. Unused vacation is payable on termination. **Action:** Verify the vacation policy specifies the percentage (4% minimum) and carryover rules.",
      },
      {
        heading: "5. Sick leave and other leaves (AB ESC s. 46)",
        body: "AB ESC does not provide paid sick leave; instead, s. 46 provides unpaid family responsibility leave (up to 5 days per year, unpaid). Employers typically offer paid sick days by policy, which exceeds statutory minimums. Parental leave is available under federal EI (18 months combined); Alberta has no supplementary provincial parental benefit. **Action:** If the company offers paid sick days, specify the entitlement in the benefits summary.",
      },
      {
        heading: "6. Probation period (no explicit statutory protection)",
        body: "AB ESC does not explicitly address probation. Common-law principles apply: a probationary period may be agreed upon, but it must be clearly communicated. It may shorten the notice requirement if a lower 'trigger' notice is established. Typically, probation does not exceed 3–6 months. **Action:** State the probation period and clarify that, unless written notice is given of a shorter probation, statutory notice applies.",
      },
      {
        heading: "7. Just cause for termination (common law)",
        body: "AB courts apply common-law just cause standards (McKinley v. BC Tel, 2001 SCC 38): the cause must be serious, unrelated to performance, and incurable (or cure must be impossible). Just cause is a high bar; employers must have clear, documented cause before relying on this ground. **Action:** Ensure all performance issues are documented; consult counsel before terminating for cause.",
      },
      {
        heading: "8. Non-compete enforceability",
        body: "AB courts generally enforce reasonable non-compete agreements if they are necessary to protect legitimate business interests (trade secrets, customer relationships, confidential information) and are reasonable in time, geography, and scope. Unlike BC's strict 'no blue-pencilling' rule, AB courts may reform an unreasonable clause. **Action:** Any non-compete should clearly identify the protectable interest and include reasonable temporal/geographic limits.",
      },
      {
        heading: "9. Pay equity and human rights (Alberta Human Rights Act, R.S.A. 2000, c. A-14.5)",
        body: "Alberta has no mandatory pay equity legislation. However, the Human Rights Act prohibits discrimination in pay based on protected grounds (gender, race, disability, etc.). If the salary is materially lower than that of comparably situated employees, a discrimination complaint could result. **Action:** Conduct an informal equity review; ensure salary decisions are documented and non-discriminatory.",
      },
      {
        heading: "10. PIPEDA and privacy (federal baseline for AB private sector)",
        body: "Alberta has no provincial privacy legislation (PIPA), so federal PIPEDA applies to provincially regulated private-sector employers. Background checks must be conducted with consent, for legitimate purposes, and in compliance with PIPEDA's principles (minimization, consent, transparency). **Action:** Ensure background check procedures include explicit written consent and a clear statement of purpose.",
      },
    ] : j.code === "FED" ? [
      {
        heading: "1. CLC Part II and termination without cause (s. 230)",
        body: "Canada Labour Code Part II s. 230: unjust dismissal complaint can be filed if the employee has 12 continuous months service and was not dismissed for just cause. The burden is on the employer to prove just cause 'in a summary manner.' Common-law notice is not awarded; instead, the Canada Industrial Relations Board (CIRB) may order compensation, reinstatement, or other remedies. Unlike common-law wrongful dismissal claims (which can take years), CLC complaints are expedited. **Action:** Ensure the offer and agreement acknowledge this statutory recourse.",
      },
      {
        heading: "2. Notice of termination (no statutory minimum under CLC)",
        body: "The CLC does not prescribe a statutory notice period for termination without cause. Instead, common-law reasonable notice applies, determined by Bardal factors (age, length of service, position, availability of comparable employment). The CIRB may award compensation in lieu of notice. Some collective agreements specify notice periods. **Action:** The offer should state the company will follow common-law reasonable notice or specify a contractual notice period.",
      },
      {
        heading: "3. Severance pay (CLC s. 230(1))",
        body: "The CLC does not provide statutory severance separate from notice, unlike Ontario ESA s. 64. Instead, the CIRB may award compensation for loss of seniority, benefits continuation, or failure to provide adequate notice. The CIRB has discretion to award compensation that is 'just and equitable' (s. 230). **Action:** Do not promise statutory severance; clarify that compensation will be determined in accordance with CLC principles.",
      },
      {
        heading: "4. Vacation entitlement (CLC s. 206)",
        body: "s. 206: minimum 2 weeks (4%) vacation per year. Enhanced entitlement (3 weeks) applies after 15 years service. Vacation must be taken within 12 months of accrual; employers may impose carryover limits with written agreement. Unused vacation is payable on termination (pro-rated). **Action:** Verify the vacation policy aligns with s. 206; ensure carryover terms are documented.",
      },
      {
        heading: "5. Sick leave (CLC s. 206.1 and related provisions)",
        body: "CLC does not provide explicit paid sick leave like some provinces. However, employees are entitled to unpaid illness leave and short-term disability benefits are typically provided by employer policy. Federal public servants have specific sick leave provisions (Directive on Attendance Management). **Action:** Clarify in the benefits summary whether paid sick days are provided by company policy and the amount.",
      },
      {
        heading: "6. Probation period (common law, no CLC exemption)",
        body: "The CLC does not provide a statutory probation exemption. Common-law probation may be agreed upon, but it does not eliminate the requirement for reasonable notice or just cause. Typically, a probation period of 3–6 months is recognized, after which full statutory/common-law protections apply. **Action:** Clearly state the probation period and confirm that it does not waive notice or just-cause protections.",
      },
      {
        heading: "7. Parental leave (CLC s. 206.2)",
        body: "CLC s. 206.2: pregnancy leave up to 17 weeks; parental leave up to 61 weeks (for either parent). Additional parental leave may be unpaid. Federal EI parental benefits run concurrently. **Action:** Employees should be directed to Service Canada for EI parental benefit details; the company must protect job during statutory leave.",
      },
      {
        heading: "8. Just cause and misconduct standards",
        body: "CLC s. 230: just cause is determined on a balance of probabilities. Federal courts have applied the McKinley test (2001 SCC 38): the misconduct must be serious, unrelated to performance management, and incurable. Simple poor performance does not constitute just cause; the employer must follow progressive discipline. **Action:** All disciplinary action must be documented; consult counsel before terminating for cause.",
      },
      {
        heading: "9. Non-compete agreements (federal common law)",
        body: "Federal courts generally enforce non-compete agreements if they protect legitimate business interests (trade secrets, customer relationships) and are reasonable in time, duration, and scope. Overly broad clauses may be struck down or reformed. The burden is on the employer to justify the restriction. **Action:** Any non-compete must be tailored to genuine protectable interests; consider geographic and temporal limits carefully.",
      },
      {
        heading: "10. Privacy (PIPEDA, S.C. 2000, c. 5)",
        body: "Federal PIPEDA applies to federally regulated private-sector employers. Background checks must be conducted with written consent, for legitimate purposes, and in compliance with PIPEDA's 10 principles (purpose, consent, accuracy, use limitation, openness, accuracy, individual access, accuracy correction, security, accuracy). Employers must notify applicants if a background check is conducted. **Action:** Ensure background check procedures include explicit written consent and a clear statement of purpose.",
      },
    ] : [
      {
        heading: "1. Statutory employment standards",
        body: `Employment in this jurisdiction is governed by the ${j.statuteEN} (${j.statuteCiteEN}). The offer is subject to all minimum statutory entitlements including notice of termination, vacation, and other statutory protections.`,
      },
      {
        heading: "2. Waksdale and termination for cause",
        body: "Any termination for cause must comply with the statutory definition of 'just cause' under the applicable employment standards legislation. Overly broad contractual cause clauses may be unenforceable.",
      },
      {
        heading: "3. Notice and severance entitlements",
        body: `Under the ${j.shortEN}, the employee is entitled to notice of termination or pay in lieu as follows: ${j.noticeFormulaEN}. ${j.hasSeverance ? `Severance may also be payable under ${j.severanceStat}.` : ""}`,
      },
      {
        heading: "4. Vacation entitlement",
        body: `Minimum vacation entitlement is ${j.vacMinWeeks} weeks per year (${j.vacMinPct}), governed by ${j.vacStatEN}.`,
      },
      {
        heading: "5. Sick leave",
        body: `Sick leave is governed by ${j.sickLeaveEN}.`,
      },
      {
        heading: "6. Overtime compensation",
        body: `Overtime is compensated in accordance with ${j.overtimeNoteEN}`,
      },
      {
        heading: "7. Human rights and accommodation",
        body: `Employment is subject to the applicable human rights legislation in this jurisdiction (${j.hrStatEN}). Accommodation is required to the point of undue hardship.`,
      },
      {
        heading: "8. Probation period",
        body: `The statutory probation period in this jurisdiction is ${j.probationMonths} months, during which statutory notice may not apply. After this period, statutory notice requirements apply regardless of any contractual probation extension.`,
      },
      {
        heading: "9. Privacy and background checks",
        body: `Background checks and privacy matters are governed by applicable privacy legislation (${j.privacyStatEN}). All checks must be conducted with consent and for legitimate business purposes.`,
      },
      {
        heading: "10. Entire agreement and jurisdiction",
        body: `This offer is governed by the laws of the ${j.govLawEN} and is subject to the ${j.shortEN}.`,
      },
    ],

    legalNotesFR: j.code === "ON" ? [
      {
        heading: "1. Risque Waksdale : portée de la clause pour motif valable",
        body: "Waksdale c. Swegon North America Inc., 2020 ONCA 391 : si la clause pour motif valable invoque un critère plus large que celui de la LNE (qui exige « la désobéissance délibérée, le mépris délibéré ou la conduite s'assimilant à la négligence délibérée ou grave »), la section entière de cessation est nulle et l'employé a droit à un préavis raisonnable en common law. Dufault c. Corporation of the Township of Ignace, 2024 ONSC 1029 a étendu cette règle : le libellé comme « emploi actif » ou d'autres critères trop larges peuvent annuler la disposition. **Action :** La clause pour motif valable doit suivre précisément les critères de la LNE aux articles 57 à 60; utiliser uniquement le libellé légal.",
      },
      {
        heading: "2. Préavis raisonnable en common law (facteurs Bardal)",
        body: "Si la clause de cessation est annulée, l'employé a droit à un préavis raisonnable en common law, déterminé par Bardal c. Globe & Mail Ltd., (1960) 24 DLR (2d) 140 (Ont. HC) : âge, ancienneté, nature du poste et disponibilité d'emplois comparables. Les cadres supérieurs peuvent avoir droit à 18 à 24 mois de préavis. La clause sans motif à l'art. 11 vise à écarter ce droit, mais seulement si elle-même est valide.",
      },
      {
        heading: "3. Rémunération variable : risque d'intégration au contrat",
        body: "Kieran c. Ingram Micro Inc., 2004 ONCA 168; Paquette c. TeraGo Networks Inc., 2016 ONCA 618 : la rémunération variable peut être implicitement intégrée au contrat si elle est versée régulièrement sans clause de non-droit claire. Le libellé discrétionnaire et l'exigence de la « date de versement » à l'art. 4 réduisent ce risque, mais seulement si le document du Régime lui-même contient des restrictions identiques. **Action :** Vérifier que le Régime est expressément incorporé par renvoi et contient des clauses de non-droit correspondantes.",
      },
      {
        heading: "4. Période de probation : légale c. contractuelle",
        body: "LNE art. 54(1)(b) : l'exemption du préavis s'applique seulement pendant les trois premiers mois. Une probation contractuelle plus longue ne prolonge pas cette exemption. Après le mois 3, le préavis légal s'applique. **Action :** Ne pas laisser entendre que l'employé peut être congédié sans préavis pendant une probation contractuelle prolongée — c'est juridiquement inexact après le mois 3.",
      },
      {
        heading: "5. Droit à la déconnexion et surveillance électronique (25 salariés ou plus)",
        body: "LNE art. 21.1.2 (Loi de 2021 visant à œuvrer pour les travailleurs, L.O. 2021, chap. 34) : les employeurs de 25 salariés ou plus au 1er janvier doivent avoir une politique écrite sur le droit à la déconnexion au plus tard le 1er mars et la remettre dans les 30 jours. LNE art. 41.1.1 : même seuil; politique de surveillance électronique écrite requise; remise dans les 30 jours. Amende maximale : 50 000 $ (particulier), 100 000 $ (société). **Action :** Confirmer l'effectif; utiliser le modèle T10 s'il y a lieu.",
      },
      {
        heading: "6. Entitlement aux congés et report des congés",
        body: "LNE arts. 33 à 42 : minimum 2 semaines après 12 mois de service continu; option de 4 % de salaire de vacances. Après 5 ans, minimum 3 semaines ou 6 % (art. 35.2). Les congés doivent être pris dans 12 mois ou, si l'employeur le demande, dans 24 mois. Les employeurs peuvent plafonner le report, mais seulement si cela est écrit et les premiers congés doivent être pris. Les congés non pris sont payables à la cessation (art. 11). **Action :** Revoir et mettre à jour la Politique de congés pour assurer la conformité légale.",
      },
      {
        heading: "7. Congé de maladie (3 jours non payés par année, LNE art. 50.0.1)",
        body: "La LNE prévoit 3 jours de congé de maladie non payés par année à partir du 1er janvier 2018. De nombreux employeurs offrent des congés de maladie payés par politique, ce qui dépasse le minimum légal. Si la société offre des jours de maladie payés, la lettre d'offre et le manuel doivent clairement indiquer l'entitlement. **Action :** Confirmer l'entitlement aux congés de maladie dans le résumé des avantages et synchroniser avec le manuel.",
      },
      {
        heading: "8. Indemnité de départ (LNE art. 64) — éligibilité restreinte",
        body: "LNE art. 64 : l'indemnité de départ (1 semaine par année de service, max 26 semaines) est due seulement si l'employeur a une masse salariale de 2,5 M$ ou plus et l'employé a 5 ans ou plus de service continu. L'indemnité de départ est distincte du préavis. La plupart des petits et moyens employeurs ne déclenchent pas ce seuil. **Action :** Confirmer la masse salariale avant d'offrir une indemnité de départ; si applicable, s'assurer que la clause de cessation énonce explicitement la formule.",
      },
      {
        heading: "9. Équité salariale (Loi sur l'équité salariale, L.R.O. 1990, chap. P.7)",
        body: "Obligatoire pour les employeurs de 10 salariés ou plus. L'employeur doit maintenir un plan d'équité salariale assurant que les salariés dans des rôles substantiellement identiques reçoivent une rémunération égale pour un travail égal ou essentiellement équivalent. Le salaire offert doit être conforme. **Action :** Avant de mettre la lettre d'offre, vérifier que le salaire proposé est conforme au plan d'équité salariale de la société.",
      },
      {
        heading: "10. Conseil juridique indépendant et caractère abusif",
        body: "La présente lettre d'offre n'exige pas de conseil juridique indépendant comme condition de validité. Cependant, le CJI réduit le risque que l'employé conteste ultérieurement la clause de cessation pour caractère abusif ou absence de contrepartie. Bonne pratique : accorder 48 à 72 heures pour examen (cette lettre le fait à l'art. 14). Pour les embauches au niveau VP et au-dessus, envisager d'encourager expressément le CJI. L'absence de CJI n'est pas fatale si l'employé a suffisamment de temps pour examiner.",
      },
    ] : j.code === "QC" ? [
      {
        heading: "1. Waksdale et Code civil art. 2092 — nullité de la clause de cessation",
        body: "Waksdale c. Swegon North America Inc., 2020 ONCA 391 est une décision ontarienne, mais les tribunaux québécois appliquent l'article 2092 du Code civil du Québec, qui accorde un droit absolu à un préavis raisonnable. Toute stipulation contractuelle qui déroge à ce droit est sans effet (LNT art. 93). Une clause pour motif valable trop large peut rendre la section entière inapplicable. Le fardeau incombe à l'employeur de prouver que la restriction ne dépasse pas ce qui est nécessaire. **Action :** La clause pour motif valable doit respecter strictement les critères de la LNT; éviter le libellé de la common law.",
      },
      {
        heading: "2. Recours en congédiement injustifié (LNT art. 124)",
        body: "Art. 124 : après 2 ans de service continu, un employé peut déposer une plainte auprès du Tribunal administratif du travail (anciennement Commission des relations du travail) pour congédiement sans motif juste. Le TAT peut ordonner la réintégration, les salaires rétroactifs (jusqu'à 1 an), les dommages moraux et les dommages compensatoires. C'est un recours légal distinct du préavis/indemnité aux termes de l'art. 82. **Action :** S'assurer que la lettre et l'accord de travail reconnaissent ce recours et ne tentent pas de le renoncer.",
      },
      {
        heading: "3. Préavis de cessation et indemnité (LNT art. 82)",
        body: "Art. 82 : l'employeur doit donner un préavis écrit selon une échelle graduée : 1 semaine par année de service pour les deux premières années; 2 semaines par année à partir de la 3e année. L'employeur peut également payer une indemnité en tenant lieu. L'indemnité doit être calculée et versée par écrit à la cessation. Le délai-congé commence le jour de la notification. **Action :** La lettre d'offre doit préciser quelle méthode la société utilisera (préavis ou indemnité compensatrice) ou confirmer qu'elle suivra l'art. 82.",
      },
      {
        heading: "4. Période de probation et minimum légal (3 mois)",
        body: "La LNT n'énonce pas explicitement les conditions de la probation, mais la jurisprudence québécoise reconnaît une période de probation de jusqu'à 3 mois durant laquelle le préavis n'est pas requis. Après 3 mois, l'art. 82 s'applique. Une probation contractuelle plus longue ne prolonge pas l'exemption. **Action :** Énoncer clairement la période de probation (généralement 3 mois) et confirmer que le préavis légal s'applique après cette période.",
      },
      {
        heading: "5. Entitlement aux congés et report (LNT arts. 66 à 77)",
        body: "Art. 68 : minimum 2 semaines de congés (4 %) par année, plus 1 jour supplémentaire après 5 ans, puis passant à 6 % (art. 77). Les congés doivent être pris dans 12 mois; les employeurs peuvent imposer un plafond de report seulement pour les 12 premiers mois. Les congés non pris sont payables à la cessation. **Action :** Revoir les règles de report; s'assurer que le manuel ne prévoit pas de limite indéfinie ou de clause de forfeiture.",
      },
      {
        heading: "6. Congé de maladie et congé personnel (LNT art. 79.1)",
        body: "Art. 79.1 : les employés ont droit à 2 journées de congé payé par année pour maladie ou responsabilités familiales, plus jusqu'à 24 heures non payées annuellement pour d'autres raisons. De nombreux employeurs offrent des politiques plus généreuses. **Action :** Confirmer l'entitlement aux congés de maladie dans le résumé des avantages et synchroniser avec le manuel.",
      },
      {
        heading: "7. Heures supplémentaires et droit de refus (LNT art. 55, droit de refus)",
        body: "Art. 55 : les heures supplémentaires sont payées à 1,5 fois au-delà de 40 heures par semaine. Art. 59.0.1 : un employé peut refuser les heures supplémentaires si le refus est fondé sur des motifs liés au statut familial (ex. responsabilités envers enfants ou parents âgés). Ce droit ne peut pas être renoncer. **Action :** S'assurer que la lettre et le manuel reconnaissent le droit de refus des heures supplémentaires dans les situations familiales.",
      },
      {
        heading: "8. Langue du contrat (Loi 96, Charte de la langue française)",
        body: "Loi 96 (Loi modifiant la Charte de la langue française, L.Q. 2022, c. 14), art. 41 : les contrats de travail doivent être rédigés en français. Un employé peut demander une version anglaise, mais la version française prévaut en cas de conflit. Tous les documents obligatoires doivent être en français. **Action :** S'assurer que tous les modèles sont traduits en français et fournis aux employés québécois dès le départ.",
      },
      {
        heading: "9. Équité salariale (Loi sur l'équité salariale, RLRQ c E-12.001)",
        body: "Obligatoire pour les employeurs de 10 salariés ou plus. Les exercices d'équité salariale doivent être menés et mis à jour tous les 5 ans. Le salaire offert doit être conforme à l'évaluation d'équité salariale de la société. La non-conformité peut entraîner des ajustements rétroactifs et des amendes imposées par la CNESST. **Action :** Avant de mettre la lettre, vérifier que le salaire proposé est conforme à l'exercice d'équité salariale de la société.",
      },
      {
        heading: "10. Régime québécois d'assurance parentale (RQAP)",
        body: "Le Québec administre son propre régime d'assurance parentale (RQAP), non l'AE fédérale. Les employés cotisent au RQAP et reçoivent les prestations par le Conseil de gestion de l'assurance parentale. Le congé parental en vertu de la LNT est coordonné avec le RQAP, qui offre des prestations plus généreuses que l'AE fédérale (jusqu'à 69 semaines parentales + maternité combinées). **Action :** Diriger les employés québécois vers Service Canada et le site du RQAP pour les renseignements sur les prestations parentales.",
      },
    ] : j.code === "BC" ? [
      {
        heading: "1. Applicabilité de la clause de cessation (ESA C.-B. art. 4)",
        body: "Art. 4 : toute stipulation qui vise à exclure ou limiter les droits d'un employé en vertu de la Loi est nulle. Waksdale c. Swegon North America Inc., 2020 ONCA 391 est une décision ontarienne, mais les tribunaux de C.-B. n'ont pas encore adopté définitivement la même approche. Cependant, la common law de la C.-B. exige que les clauses de cessation ne dérogent pas aux minimums légaux. **Action :** S'assurer que la clause ne tente pas de contracter en dehors ou de limiter les droits de préavis ou d'indemnité.",
      },
      {
        heading: "2. Préavis de cessation (ESA C.-B. arts. 63 et 64)",
        body: "Art. 63 : le préavis doit être donné au moins 2 semaines à l'avance (ou 8 semaines pour les licenciements collectifs de 50 ou plus). S'il n'est pas donné, l'employeur doit payer les salaires en tenant lieu. Il n'y a pas d'indemnité de départ légale distincte en C.-B., contrairement à la LNE ontarienne art. 64. **Action :** La lettre doit énoncer que la société donnerait avis ou paierait en tenant lieu tel que l'exige l'art. 63.",
      },
      {
        heading: "3. Salaire final et retenues salariales (ESA C.-B. art. 18)",
        body: "Art. 18(1) : tous les salaires doivent être payés dans les 48 heures suivant la cessation. Art. 18(2) : si l'employé donne avis de démission, le paiement final doit être effectué dans les 6 jours suivant le dernier jour de travail. Les retenues ne sont permises que pour les obligations légales ou avec autorisation écrite. **Action :** S'assurer que la paie est instruite de payer tous les salaires dus dans le délai de 48 heures.",
      },
      {
        heading: "4. Entitlement aux congés (ESA C.-B. arts. 57 à 61)",
        body: "Art. 58 : minimum 2 semaines (4 %) par année; 3 semaines (6 %) après 5 ans de service continu. Les congés doivent être pris dans 12 mois d'accumulation. Les employeurs peuvent reporter le report seulement par accord écrit et seulement à l'année civile suivante. Les congés non pris sont payables à la cessation (au pro-rata). **Action :** Vérifier que la politique des congés est conforme aux règles de report et de paiement.",
      },
      {
        heading: "5. Journées de maladie payées (ESA C.-B. art. 49.1, en vigueur depuis 2022)",
        body: "Art. 49.1 (en vigueur depuis le 1er janvier 2022) : les employés ont droit à 5 jours de maladie payés par année. De plus, l'art. 49 prévoit un congé non payé pour maladie ou blessure (illimité). Le droit à 5 jours ne peut pas être négocié et ne peut pas être regroupé dans les congés ou autres types de congé. **Action :** Confirmer que le résumé des avantages énonce clairement 5 jours de maladie payés par année.",
      },
      {
        heading: "6. Probation et exemption de préavis (ESA C.-B. arts. 63 à 64)",
        body: "L'ESA C.-B. n'exempte pas explicitement les employés probationnaires du préavis. Tous les employés ont droit au préavis à l'art. 63 (2 semaines minimum) indépendamment de l'état de probation. Une probation contractuelle peut exister, mais elle n'affecte pas les droits de préavis légal. **Action :** Ne pas laisser entendre que les employés probationnaires peuvent être congédiés sans préavis — ils ne peuvent pas.",
      },
      {
        heading: "7. Clauses de non-concurrence (principe Shafron, pas de blue-pencilling)",
        body: "Shafron c. KRG Insurance Brokers (Western) Inc., 2009 CSC 6 : les tribunaux de C.-B. ne modifieront pas une clause restrictive excessivement large. Si une clause de non-concurrence est déraisonnablement large en durée, géographie ou portée, la clause entière est nulle. **Action :** Toute non-concurrence doit être soigneusement adaptée aux intérêts légitimes et aux limites raisonnables.",
      },
      {
        heading: "8. Protection de la vie privée (LPRP, S.B.C. 2003, ch. 63)",
        body: "La C.-B. est une province « essentiellement similaire » en vertu de la LPRPDE fédérale, donc la LPRP provinciale s'applique à la place de la LPRPDE. Les vérifications d'antécédents doivent être menées avec consentement et à des fins commerciales légitimes. **Action :** S'assurer que les procédures de vérification d'antécédents sont conformes à la LPRP et incluent le consentement explicite.",
      },
      {
        heading: "9. Code des droits de la personne et accommodement (Code des droits de la personne, R.S.B.C. 1996, ch. 210)",
        body: "Le Code protège les employés contre la discrimination fondée sur le handicap, la situation de famille, l'identité de genre et la religion. Le test Meiorin s'applique : toute exigence d'emploi doit être (a) rationnellement liée au poste, (b) adoptée de bonne foi, (c) raisonnablement nécessaire. Les employeurs doivent accommoder jusqu'au point où il y aurait contrainte excessive. **Action :** S'assurer que toutes les exigences d'emploi sont liées au poste et documentées; documenter toute demande d'accommodement.",
      },
      {
        heading: "10. Aucune équité salariale obligatoire en C.-B. (à partir de 2026)",
        body: "Contrairement à l'Ontario et au Québec, la C.-B. n'a pas de législation obligatoire sur l'équité salariale à partir de 2026. La Loi fédérale sur l'équité salariale s'applique seulement aux employeurs de compétence fédérale. Les conseils volontaires sont disponibles de la Province. Les employeurs non syndiqués n'ont aucune obligation légale de mener des analyses d'équité salariale. **Action :** La fixation des salaires est discrétionnaire, mais la bonne pratique consiste à effectuer un examen informel de l'équité.",
      },
    ] : j.code === "AB" ? [
      {
        heading: "1. Portée et validité de la clause de cessation (ESC Alb. art. 56)",
        body: "Art. 56 : un employeur ne peut pas priver un employé de droits légaux par un contrat. Toute stipulation qui vise à réduire le préavis ou l'indemnité en deçà des minimums légaux est nulle. Les tribunaux albertain n'ont pas encore adopté une règle de type Waksdale, mais le principe selon lequel les clauses de cessation ne peuvent pas déroger aux minimums légaux est établi. **Action :** La clause ne doit pas tenter de réduire le préavis en deçà de la formule de l'ESC.",
      },
      {
        heading: "2. Préavis de cessation (ESC Alb. arts. 56 à 57)",
        body: "Art. 56 : le préavis est calculé comme 1 semaine par année de service accompli (min. 1 semaine, max. 8 semaines). Il n'y a pas d'indemnité de départ légale distincte en Alberta comme en Ontario. Le préavis est le principal recours pour cessation sans motif. **Action :** La lettre doit calculer et divulguer la période de préavis prévue en fonction de l'ancienneté.",
      },
      {
        heading: "3. Salaire final (ESC Alb. art. 77)",
        body: "Art. 77 : tous les salaires (y compris le salaire de préavis ou l'indemnité compensatrice) doivent être payés dans les 10 jours suivant la cessation, ou à la prochaine date de paie si celle-ci est plus tôt. **Action :** S'assurer que la paie est instruite de traiter le paiement final dans le délai légal.",
      },
      {
        heading: "4. Entitlement aux congés (ESC Alb. arts. 55 à 56)",
        body: "Art. 55 : minimum 2 semaines (4 %) par année. Il n'y a pas d'entitlement supérieur (comme les 6 % de la C.-B. après 5 ans). Les congés sont généralement payés comme pourcentage du salaire brut. Le report est limité; les employeurs peuvent imposer une règle « congés ou zéro » si avis écrit est donné au moins 30 jours à l'avance. Les congés non pris sont payables à la cessation. **Action :** Vérifier que la politique des congés énonce le pourcentage (4 % minimum) et les règles de report.",
      },
      {
        heading: "5. Congé de maladie et autres congés (ESC Alb. art. 46)",
        body: "L'ESC ne prévoit pas de congé de maladie payé; plutôt, l'art. 46 prévoit un congé de responsabilités familiales non payé (jusqu'à 5 jours par année). Les employeurs offrent généralement des jours de maladie payés par politique, ce qui dépasse les minimums légaux. Le congé parental est disponible en vertu de l'AE fédérale (18 mois combinés); l'Alberta n'a pas de prestations parentales provinciales supplémentaires. **Action :** Si l'entreprise offre des jours de maladie payés, préciser l'entitlement dans le résumé des avantages.",
      },
      {
        heading: "6. Période de probation (aucune protection légale explicite)",
        body: "L'ESC n'aborde pas explicitement la probation. Les principes de common law s'appliquent : une période de probation peut être convenue, mais elle doit être clairement communiquée. Elle peut réduire le préavis requis si un préavis « déclencheur » plus court est établi. Généralement, la probation ne dépasse pas 3 à 6 mois. **Action :** Énoncer la période de probation et clarifier que, à moins qu'avis écrit d'une probation plus courte soit donné, le préavis légal s'applique.",
      },
      {
        heading: "7. Motif juste de cessation (common law)",
        body: "Les tribunaux albertains appliquent les normes de common law pour le motif juste (McKinley c. BC Tel, 2001 CSC 38) : le motif doit être grave, sans rapport avec la gestion du rendement, et soit irrémédiable soit impossible à corriger. Le motif juste est un seuil élevé; les employeurs doivent avoir un motif clair et documenté. **Action :** Tous les problèmes de rendement doivent être documentés; consulter un avocat avant de résilier pour motif.",
      },
      {
        heading: "8. Applicabilité des clauses de non-concurrence",
        body: "Les tribunaux albertains appliquent généralement les accords de non-concurrence raisonnables s'ils sont nécessaires pour protéger les intérêts commerciaux légitimes (secrets commerciaux, relations client, renseignements confidentiels) et sont raisonnables en temps, géographie et portée. Contrairement à la règle stricte de C.-B. (pas de blue-pencilling), les tribunaux albertains peuvent reformer une clause déraisonnable. **Action :** Toute non-concurrence doit clairement identifier l'intérêt protégeable et inclure des limites temporelles et géographiques raisonnables.",
      },
      {
        heading: "9. Équité salariale et droits de la personne (Loi sur les droits de la personne de l'Alberta, L.R.A. 2000, ch. A-14.5)",
        body: "L'Alberta n'a pas de loi obligatoire sur l'équité salariale. Cependant, la Loi sur les droits de la personne interdit la discrimination en matière de rémunération fondée sur des motifs protégés (genre, race, handicap, etc.). Si le salaire est considérablement inférieur à celui des employés dans des situations comparables, une plainte en discrimination pourrait en résulter. **Action :** Conduire un examen informel de l'équité; s'assurer que les décisions salariales sont documentées et non-discriminatoires.",
      },
      {
        heading: "10. LPRPDE et protection des renseignements personnels (norme fédérale pour Alberta)",
        body: "L'Alberta n'a pas de loi provinciale sur la protection des renseignements personnels (PIPA), donc la LPRPDE fédérale s'applique aux employeurs du secteur privé de compétence provinciale. Les vérifications d'antécédents doivent être menées avec consentement, à des fins légitimes, et conformément aux principes de la LPRPDE. **Action :** S'assurer que les procédures de vérification d'antécédents incluent le consentement écrit explicite et une déclaration claire de la finalité.",
      },
    ] : j.code === "FED" ? [
      {
        heading: "1. CCT Partie II et congédiement injustifié (art. 230)",
        body: "CCT Partie II art. 230 : une plainte pour congédiement injustifié peut être déposée si l'employé a 12 mois de service continu et n'a pas été congédié pour motif valable. Le fardeau incombe à l'employeur de prouver le motif valable « de manière sommaire ». La common law ne prévoit pas de délai-congé; plutôt, le Conseil canadien des relations industrielles (CCRI) peut ordonner une indemnisation, une réintégration ou d'autres recours. Contrairement aux réclamations en congédiement injustifié en common law (qui peuvent prendre des années), les plaintes en vertu du CCT sont accélérées. **Action :** S'assurer que la lettre et l'accord reconnaissent ce recours légal.",
      },
      {
        heading: "2. Préavis de cessation (aucun minimum légal en vertu du CCT)",
        body: "Le CCT ne prescrit pas de délai de préavis légal pour cessation sans motif. Plutôt, le préavis raisonnable en common law s'applique, déterminé par les facteurs Bardal (âge, ancienneté, poste, disponibilité d'emplois comparables). Le CCRI peut ordonner une indemnisation en tenant lieu de préavis. Certaines conventions collectives précisent les délais de préavis. **Action :** La lettre doit énoncer que la société suivra le préavis raisonnable en common law ou préciser un délai contractuel.",
      },
      {
        heading: "3. Indemnité de départ (CCT art. 230(1))",
        body: "Le CCT ne prévoit pas d'indemnité de départ distincte du préavis, contrairement à la LNE de l'Ontario. Plutôt, le CCRI peut ordonner une indemnisation pour perte d'ancienneté, continuation des avantages, ou défaut de fournir un préavis adéquat. Le CCRI a le pouvoir discrétionnaire d'ordonner une indemnisation « juste et équitable ». **Action :** Ne pas promettre d'indemnité de départ légale; clarifier que l'indemnisation sera déterminée selon les principes du CCT.",
      },
      {
        heading: "4. Entitlement aux congés (CCT art. 206)",
        body: "Art. 206 : minimum 2 semaines (4 %) de congés par année. Un entitlement supérieur (3 semaines) s'applique après 15 ans de service. Les congés doivent être pris dans 12 mois d'accumulation; les employeurs peuvent imposer des limites de report avec accord écrit. Les congés non pris sont payables à la cessation (au pro-rata). **Action :** Vérifier que la politique des congés est conforme à l'art. 206; s'assurer que les conditions de report sont documentées.",
      },
      {
        heading: "5. Congé de maladie (CCT art. 206.1 et dispositions connexes)",
        body: "Le CCT ne prévoit pas de congé de maladie payé explicite comme certaines provinces. Cependant, les employés ont droit à un congé de maladie non payé et les prestations d'assurance-invalidité de courte durée sont généralement offertes par la politique de l'employeur. **Action :** Clarifier dans le résumé des avantages si des jours de maladie payés sont offerts par la politique de l'entreprise et le montant.",
      },
      {
        heading: "6. Période de probation (common law, aucune exemption du CCT)",
        body: "Le CCT ne prévoit pas d'exemption de probation. La probation en common law peut être convenue, mais elle n'élimine pas l'exigence du préavis raisonnable ou du motif valable. Généralement, une période de probation de 3 à 6 mois est reconnue, après laquelle les protections statutaires/de common law complètes s'appliquent. **Action :** Énoncer clairement la période de probation et confirmer qu'elle ne supprime pas le préavis ou les protections pour motif valable.",
      },
      {
        heading: "7. Congé parental (CCT art. 206.2)",
        body: "CCT art. 206.2 : congé de maternité jusqu'à 17 semaines; congé parental jusqu'à 61 semaines (pour l'un ou l'autre parent). Un congé parental supplémentaire peut être non payé. Les prestations parentales de l'AE fédérale s'exécutent concurremment. **Action :** Les employés doivent être dirigés vers Service Canada pour les renseignements sur les prestations parentales de l'AE fédérale; la société doit protéger l'emploi pendant le congé légal.",
      },
      {
        heading: "8. Motif valable et normes d'inconduite",
        body: "CCT art. 230 : le motif valable est déterminé selon la prépondérance des probabilités. Les tribunaux fédéraux ont appliqué le test McKinley (2001 CSC 38) : l'inconduite doit être grave, sans rapport avec la gestion du rendement, et irrémédiable. Un rendement médiocre simple ne constitue pas un motif valable; l'employeur doit suivre la discipline progressive. **Action :** Toute mesure disciplinaire doit être documentée; consulter un avocat avant de résilier pour motif valable.",
      },
      {
        heading: "9. Clauses de non-concurrence (common law fédérale)",
        body: "Les tribunaux fédéraux appliquent généralement les accords de non-concurrence s'ils protègent les intérêts commerciaux légitimes (secrets commerciaux, relations client) et sont raisonnables en temps, durée et portée. Les clauses excessivement larges peuvent être annulées ou reformées. Le fardeau incombe à l'employeur de justifier la restriction. **Action :** Toute non-concurrence doit être adaptée aux intérêts protégeables légitimes; envisager soigneusement les limites géographiques et temporelles.",
      },
      {
        heading: "10. Protection des renseignements personnels (LPRPDE, L.C. 2000, ch. 5)",
        body: "La LPRPDE fédérale s'applique aux employeurs du secteur privé de compétence fédérale. Les vérifications d'antécédents doivent être menées avec consentement écrit, à des fins légitimes, et conformément aux 10 principes de la LPRPDE (finalité, consentement, exactitude, limitation de l'utilisation, transparence, exactitude, accès des particuliers, correction d'exactitude, sécurité, inexactitude). Les employeurs doivent notifier les demandeurs si une vérification est menée. **Action :** S'assurer que les procédures de vérification d'antécédents incluent le consentement écrit explicite et une déclaration claire de la finalité.",
      },
    ] : [
      {
        heading: "1. Normes d'emploi selon le droit applicable",
        body: `L'emploi dans cette juridiction est régi par le ${j.statuteEN} (${j.statuteCiteEN}). L'offre est assujettie à tous les minimums légaux, y compris le préavis de cessation et les autres protections légales.`,
      },
      {
        heading: "2. Clause pour motif valable",
        body: "Tout congédiement pour motif valable doit être conforme à la définition légale du « motif valable » en vertu de la législation applicable sur les normes d'emploi. Les clauses contractuelles trop larges peuvent être inapplicables.",
      },
      {
        heading: "3. Préavis et indemnité de départ",
        body: `En vertu du ${j.shortEN}, l'employé a droit au préavis ou à l'indemnité compensatrice selon la formule suivante : ${j.noticeFormulaEN}. ${j.hasSeverance ? `Une indemnité de départ peut également être due en vertu du ${j.severanceStat}.` : ""}`,
      },
      {
        heading: "4. Entitlement aux congés",
        body: `L'entitlement minimum aux congés est ${j.vacMinWeeks} semaines par année (${j.vacMinPct}), tel que prévu par le ${j.vacStatEN}.`,
      },
      {
        heading: "5. Congé de maladie",
        body: `Le congé de maladie est régi par le ${j.sickLeaveEN}.`,
      },
      {
        heading: "6. Heures supplémentaires",
        body: `Les heures supplémentaires sont compensées conformément aux dispositions suivantes : ${j.overtimeNoteEN}`,
      },
      {
        heading: "7. Droits de la personne et accommodement",
        body: `L'emploi est assujetti à la législation applicable sur les droits de la personne dans cette juridiction (${j.hrStatEN}). L'accommodement est obligatoire jusqu'au point de la contrainte excessive.`,
      },
      {
        heading: "8. Période de probation",
        body: `La période de probation légale dans cette juridiction est ${j.probationMonths} mois, pendant laquelle le préavis légal peut ne pas s'appliquer. Après cette période, les exigences de préavis légal s'appliquent indépendamment de tout prolongement de probation contractuelle.`,
      },
      {
        heading: "9. Protection des renseignements personnels",
        body: `Les vérifications d'antécédents et les questions relatives à la protection des renseignements personnels sont régies par la loi applicable sur la protection des renseignements personnels (${j.privacyStatEN}). Toutes les vérifications doivent être menées avec consentement et à des fins commerciales légitimes.`,
      },
      {
        heading: "10. Accord intégral et juridiction",
        body: `Cette offre est régie par les lois du ${j.govLawEN} et est assujettie au ${j.shortEN}.`,
      },
    ],
  };
};
