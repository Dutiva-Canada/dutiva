// G11 — Vacation & Leave Policy
// Multi-jurisdiction: exports function(j) => templateObject

export default function(j) {
  return {
    id: "T11",
    slug: "Vacation_Leave_Policy",
    kind: "policy",
    titleEN: "Vacation and Leave Policy",
    titleFR: "Politique de vacances et de congés",

    bodyEN: [
      { type: "h1", text: "Vacation and Leave Policy", align: "center" },
      { type: "p", text: "**Effective:** {{policy_effective_date}} — **Jurisdiction:** " + j.nameEN, align: "center" },

      { type: "h2", text: "Our philosophy" },
      { type: "p", text: "Time away isn't a reward for working hard — it's part of working well. We want everyone here to rest, take care of their health, be present for their families, and come back renewed. This policy sets out how vacation and leaves work at **{{employer_legal_name}}**, and what the law guarantees you in " + j.nameEN + ". Where the law requires more than this policy provides, the law controls." },

      { type: "h2", text: "1. Vacation entitlement" },
      { type: "p", text: "All regular employees receive **{{vacation_weeks}}** weeks of paid vacation per year. This meets or exceeds the minimum required by " + j.vacStatEN + ". " + (j.vacEnhancedEN ? "After the applicable threshold, you will receive " + j.vacEnhancedEN + ". " : "") + "Vacation pay is paid at the minimum rate required by law, or, if higher, at your regular base salary rate for the vacation period. Vacation pay must be calculated on all wages (including overtime and certain bonuses), not just base salary." },

      { type: "h2", text: "2. Accrual and timing" },
      { type: "p", text: "Vacation accrues from your first day of employment. You may take vacation as it accrues, subject to your manager's approval and the team's operational needs. We want people to take their vacation, not save it indefinitely — managers are expected to support and encourage time off." },

      { type: "h2", text: "3. Requesting vacation" },
      { type: "p", text: "Please request vacation at least **{{vacation_request_notice}}** in advance through **{{vacation_request_tool}}**. Your manager will approve requests reasonably and consistently, giving priority to first-come requests and balancing team needs." },

      { type: "h2", text: "4. Carryover and payout on separation" },
      { type: "p", text: "Carryover of unused vacation is permitted up to **{{carryover_limit}}**; beyond that, unused vacation will, at the Company's discretion, either be scheduled or paid out, in accordance with applicable law. On separation from employment, any accrued and unused vacation pay will be paid out in your final wages, as required by " + j.vacStatEN + "." },

      { type: "h2", text: "5. Statutory public holidays" },
      { type: "p", text: "You will be paid for all statutory public holidays recognized in " + j.nameEN + ", at the minimum rate required by law, or more if the Company so determines. A list of the recognized holidays for the current year is posted at **{{holiday_list_url}}**." },

      { type: "h2", text: "6. Sick leave" },
      { type: "p", text: "Your wellbeing matters more than perfect attendance. You are entitled to all sick leave required by law in " + j.nameEN + ". " + j.sickLeaveEN + " On top of statutory minimums, the Company offers **{{additional_sick_days}}** paid sick days per year for short-term illness and wellbeing. If you are sick, please stay home and rest. Medical documentation may be requested only as permitted by law, and only when reasonably necessary." },

      { type: "h2", text: "7. Pregnancy, parental, adoption and caregiver leaves" },
      { type: "p", text: "You are entitled to all pregnancy, parental, adoption, family caregiver, and critical illness leaves prescribed by " + j.parentalStatEN + ". We will not retaliate against you for taking these leaves, and we will make your return to work as smooth as we can." },

      { type: "h2", text: "8. Bereavement, domestic violence, and other protected leaves" },
      { type: "p", text: "Loss and crisis aren't scheduled. You are entitled to all bereavement, domestic or sexual violence, family responsibility, reservist, organ donor, court attendance and other statutory leaves provided by the employment standards legislation that applies to " + j.nameEN + ". Please reach out to **{{hr_contact_name}}** as soon as you reasonably can, and we will walk through what applies and what support is available." },

      { type: "h2", text: "9. Religious accommodation" },
      { type: "p", text: "We will reasonably accommodate religious observance requests up to the point of undue hardship, in accordance with applicable human rights legislation (" + j.hrStatEN + ") and the *Meiorin* standard (*British Columbia (PSERC) v. BCGSEU*, [1999] 3 S.C.R. 3). You are not required to use vacation days for a religious observance that is a mandatory accommodation." },

      { type: "h2", text: "10. Communication during time off" },
      { type: "p", text: "When you are on vacation or leave, we do not expect you to check email, take calls, or respond to messages. This is consistent with our commitment to work-life balance and, where applicable, statutory right-to-disconnect requirements. If you choose to check in voluntarily, that is up to you — but no one should feel pressured to, and managers should not create that pressure." },
    ],

    bodyFR: [
      { type: "h1", text: "Politique de vacances et de congés", align: "center" },
      { type: "p", text: "**Date d'entrée en vigueur :** {{policy_effective_date}} — **Juridiction :** " + j.nameFR, align: "center" },

      { type: "h2", text: "Notre philosophie" },
      { type: "p", text: "Le temps libre n'est pas une récompense pour avoir travaillé fort — il fait partie du bon travail. Nous voulons que chacun ici se repose, prenne soin de sa santé, soit présent pour sa famille et revienne renouvelé. La présente politique explique le fonctionnement des vacances et des congés chez **{{employer_legal_name}}** et ce que la loi vous garantit en " + j.nameFR + ". Lorsque la loi prévoit davantage, la loi prévaut." },

      { type: "h2", text: "1. Droit aux vacances" },
      { type: "p", text: "Tous les employé(e)s réguliers ont droit à **{{vacation_weeks}}** semaines de vacances payées par année. Cela respecte ou dépasse le minimum prévu par " + j.vacStatFR + ". " + (j.vacEnhancedFR ? "Après le seuil applicable, vous aurez droit à " + j.vacEnhancedFR + ". " : "") + "L'indemnité de vacances est versée au taux minimum prévu par la loi ou, s'il est supérieur, au taux du salaire de base habituel. L'indemnité doit être calculée sur tous les salaires (y compris les heures supplémentaires et certaines primes), non seulement le salaire de base." },

      { type: "h2", text: "2. Accumulation et prise" },
      { type: "p", text: "Les vacances s'accumulent à compter du premier jour d'emploi. Vous pouvez les prendre au fur et à mesure, sous réserve de l'approbation de votre gestionnaire et des besoins opérationnels. Nous voulons que les gens prennent réellement leurs vacances, pas qu'ils les accumulent indéfiniment — les gestionnaires sont tenus d'encourager le repos." },

      { type: "h2", text: "3. Demande de vacances" },
      { type: "p", text: "Veuillez soumettre les demandes de vacances au moins **{{vacation_request_notice}}** à l'avance via **{{vacation_request_tool}}**. Votre gestionnaire traitera les demandes de façon raisonnable et équitable, en tenant compte des demandes reçues en premier et des besoins de l'équipe." },

      { type: "h2", text: "4. Report et paiement à la cessation" },
      { type: "p", text: "Le report des vacances non prises est permis jusqu'à concurrence de **{{carryover_limit}}**; au-delà, les vacances non prises seront, à la discrétion de la Société, soit planifiées, soit payées, conformément à la loi applicable. À la cessation d'emploi, toute paie de vacances accumulée et non prise sera versée avec votre dernière paie, comme l'exige " + j.vacStatFR + "." },

      { type: "h2", text: "5. Jours fériés légaux" },
      { type: "p", text: "Vous serez rémunéré(e) pour tous les jours fériés légaux reconnus en " + j.nameFR + ", au taux minimal prévu par la loi, ou plus si la Société le décide. La liste des jours fériés reconnus pour l'année en cours est publiée à **{{holiday_list_url}}**." },

      { type: "h2", text: "6. Congés de maladie" },
      { type: "p", text: "Votre mieux-être compte plus qu'une présence parfaite. Vous avez droit à tous les congés de maladie prévus par la loi en " + j.nameFR + ". " + j.sickLeaveFR + " En plus des minimums légaux, la Société offre **{{additional_sick_days}}** journées de maladie payées par année pour les courtes maladies et le mieux-être. Si vous êtes malade, restez à la maison et reposez-vous. Des pièces justificatives médicales ne peuvent être demandées que dans la mesure permise par la loi, et uniquement lorsque raisonnablement nécessaire." },

      { type: "h2", text: "7. Congés de maternité, de paternité, parentaux, d'adoption et de proche aidant" },
      { type: "p", text: "Vous avez droit à tous les congés de maternité, de paternité, parentaux, d'adoption, de proche aidant et pour maladie grave prévus par " + j.parentalStatFR + ". Aucune représaille ne sera exercée pour la prise de ces congés, et nous ferons en sorte que votre retour au travail soit aussi harmonieux que possible." },

      { type: "h2", text: "8. Congés de deuil, pour violence conjugale et autres congés protégés" },
      { type: "p", text: "La perte et la crise ne se planifient pas. Vous avez droit à tous les congés de deuil, pour violence conjugale ou sexuelle, pour obligations familiales, à titre de réserviste, de donneur d'organes, pour comparution devant un tribunal et autres congés prévus par la législation applicable en " + j.nameFR + ". Communiquez avec **{{hr_contact_name}}** dès que vous le pouvez raisonnablement, et nous verrons ce qui s'applique et quel soutien est disponible." },

      { type: "h2", text: "9. Accommodement religieux" },
      { type: "p", text: "Nous accommoderons raisonnablement les demandes d'observance religieuse, jusqu'à la contrainte excessive, conformément à la législation applicable en matière de droits de la personne (" + j.hrStatFR + ") et à la norme *Meiorin* (*C.-B. (PSERC) c. BCGSEU*, [1999] 3 R.C.S. 3). Vous ne serez pas tenu(e) d'utiliser vos jours de vacances pour une observance religieuse constituant un accommodement obligatoire." },

      { type: "h2", text: "10. Communications pendant les congés" },
      { type: "p", text: "Lorsque vous êtes en vacances ou en congé, nous ne nous attendons pas à ce que vous consultiez vos courriels, répondiez aux appels ou aux messages. Cela est conforme à notre engagement envers l'équilibre travail-vie personnelle et, le cas échéant, aux exigences légales en matière de droit à la déconnexion. Si vous choisissez de donner des nouvelles volontairement, c'est à vous — mais personne ne doit se sentir obligé, et les gestionnaires ne doivent pas créer cette pression." },
    ],

    legalNotesEN: [
      {
        heading: "1. Vacation entitlements — multi-jurisdictional minimums",
        body: "Vacation minimums vary by province per " + j.vacStatEN + ": **Ontario** ESA ss. 33–34: 2 weeks after 1 year; 3 weeks after 5 years; 4% accrual. **Québec** ARLS art. 68: 1% per week of service (minimum 1 week after 1 year, 2 weeks after 3 years, 3 weeks after 5 years). **BC** ESA s. 57: 2 weeks after 1 year, 3 weeks after 5 years (banking and accrual rules apply). **Alberta** Employment Standards Code ss. 29–43: 2 weeks after 1 year, 3 weeks after 5 years; accrual on 'all regular wages.' **Federal** CLC ss. 183–196: 2 weeks after 1 year, 3 weeks after 5 years, 4 weeks after 10 years (8% accrual); vacation accrues on 'wages' broadly. Vacation pay must be on all wages (including overtime, shift premiums, commissions) — not just base salary. **Action:** Confirm the policy meets minimums for the jurisdiction.",
      },
      {
        heading: "2. Vacation pay calculation — common error",
        body: "Vacation pay must be calculated on 'wages' as defined in the applicable statute, which includes most forms of remuneration paid in respect of employment (including commissions, shift premiums, and in some cases bonuses), not just base salary. Underpayment of vacation pay is one of the most common ESA violations and may trigger retroactive liability and significant arrears. **Action:** Audit the payroll system to ensure vacation pay includes all forms of compensation subject to vacation pay calculations under the applicable statute.",
      },
      {
        heading: "3. Statutory sick leave — jurisdiction summary",
        body: "Paid sick leave minimums: **Ontario** ESA s. 50.0.1 (April 2022+): 3 paid days per year (illness, injury, medical emergency) after 2 weeks of employment. **Québec** ARLS art. 79.1 (Jan 2019+): 2 paid days per year after 3 months; up to 26 weeks unpaid leave available. **BC** ESA s. 49.1 (Jan 2022+): 5 paid sick days per year; additional unpaid illness/injury leave. **Alberta** ESC Part 2, Division 7: no paid sick days (unpaid family illness leave only). **Federal** CLC s. 206.6: 10 personal leave days per year (3 paid after 3 months of employment). **Action:** The policy's sick leave provisions must meet these minimums in each applicable jurisdiction; note Alberta's lack of statutory paid leave.",
      },
      {
        heading: "4. Parental and family leaves — CLC and provincial",
        body: "**Ontario** ESA ss. 46–49.1: pregnancy leave (17 weeks), parental leave (up to 61 weeks combined), family caregiver leave (8 weeks), critical illness leave (37 weeks), domestic or sexual violence leave (10 days). **Québec** ARLS arts. 81.4–81.17 + RQAP: maternity (18 weeks RQAP), paternity (5 weeks RQAP), parental (32 or 40 weeks RQAP), family obligations leave (10 days/year, 2 paid). **BC** ESA ss. 50–54: maternity (17 weeks), parental (62 weeks), family responsibility (5 days/year), critical illness (37 weeks). **Alberta** ESC ss. 45.2–48: maternity (16 weeks), parental (62 weeks), family responsibility (10 days/year). **Federal** CLC Part III Div. VII: pregnancy (17 weeks), parental (63 weeks), family violence leave. **Action:** Reference the applicable statute and direct employees to HR for eligibility questions.",
      },
      {
        heading: "5. Religious and cultural accommodation",
        body: "The duty to accommodate under applicable Human Rights Codes (Ontario Human Rights Code, Québec Charter, BC Human Rights Code, Alberta Human Rights Act, Canadian Human Rights Act) requires employers to accommodate employees' religious observances and cultural practices — including scheduling time off for religious holidays not on the statutory holiday list. The accommodation must be provided to the point of undue hardship (**Meiorin** standard). An employee cannot be required to use vacation days for a religious observance that constitutes a mandatory accommodation. **Action:** Include a process for requesting religious/cultural accommodation that does not require the employee to use vacation entitlement; document all accommodation requests and decisions.",
      },
      {
        heading: "6. Vacation carryover — forfeiture policies",
        body: "Several provinces limit or prohibit vacation forfeiture. **Ontario** ESA ss. 33–42: vacation must be taken within the vacation entitlement year or paid out; 10-month carryover rule applies. **Québec** ARLS art. 70: unused vacation may be carried over with mutual agreement; forfeiture is permitted but only if vacation was offered and refused. **BC** ESA s. 57: carryover permitted with written agreement; if not taken, must be paid out. **Alberta** ESC s. 35: vacation must be paid out if not taken. **Federal** CLC s. 189: vacation must be taken or paid within 2 years of when it was earned. 'Use it or lose it' policies that result in automatic forfeiture of earned vacation are generally void under provincial employment standards legislation. **Action:** Confirm carryover/forfeiture provisions are consistent with applicable statute; avoid automatic forfeiture.",
      },
    ],

    legalNotesFR: [
      {
        heading: "1. Droits aux vacances — minimums multiprovince",
        body: "Les minimums de vacances varient par province selon " + j.vacStatFR + " : **Ontario** LNE, art. 33–34 : 2 semaines après 1 an; 3 semaines après 5 ans; 4 % d'accumulation. **Québec** LNT, art. 68 : 1 % par semaine de service (minimum 1 semaine après 1 an, 2 semaines après 3 ans, 3 semaines après 5 ans). **C.-B.** ESA, art. 57 : 2 semaines après 1 an, 3 semaines après 5 ans. **Alberta** Employment Standards Code : 2 semaines après 1 an, 3 semaines après 5 ans. **Fédéral** CCT, art. 183–196 : 2 semaines après 1 an, 3 semaines après 5 ans, 4 semaines après 10 ans. L'indemnité de vacances doit être calculée sur tous les salaires (y compris heures supplémentaires, primes, commissions), non seulement le salaire de base. **Action :** Confirmer que la politique respecte les minimums dans chaque province.",
      },
      {
        heading: "2. Calcul de l'indemnité de vacances — erreur fréquente",
        body: "L'indemnité de vacances doit être calculée sur les « salaires » au sens de la loi applicable, ce qui comprend la plupart des formes de rémunération (commissions, primes de poste, et dans certains cas les bonis), et non seulement le salaire de base. Le calcul insuffisant de l'indemnité de vacances est l'une des violations les plus fréquentes des normes du travail et peut entraîner une responsabilité rétroactive. **Action :** Vérifier que le système de paie calcule l'indemnité de vacances sur la base salariale complète.",
      },
      {
        heading: "3. Congés de maladie payés — résumé par province",
        body: "Minimums de congés de maladie payés : **Ontario** LNE, art. 50.0.1 (avril 2022+) : 3 jours payés par année après 2 semaines d'emploi. **Québec** LNT, art. 79.1 (janvier 2019+) : 2 jours payés par année après 3 mois; jusqu'à 26 semaines non payées. **C.-B.** ESA, art. 49.1 (janvier 2022+) : 5 jours de maladie payés par année. **Alberta** ESC : aucun jour de congé de maladie payé (congés non payés seulement). **Fédéral** CCT, art. 206.6 : 10 jours de congé personnel par année (3 payés après 3 mois). **Action :** Les dispositions de la politique doivent respecter ces minimums dans chaque province applicable.",
      },
      {
        heading: "4. Congés parentaux et familiaux — CCT et provinces",
        body: "**Ontario** LNE : congé de maternité (17 semaines), congé parental (jusqu'à 61 semaines combinées), congé de responsabilités familiales (8 semaines), congé pour maladie grave (37 semaines), congé pour violence (10 jours). **Québec** LNT + RQAP : maternité (18 semaines RQAP), paternité (5 semaines RQAP), parental (32 ou 40 semaines RQAP), obligations familiales (10 jours/an, 2 payés). **C.-B.** ESA : maternité (17 semaines), parental (62 semaines), responsabilités familiales (5 jours/an). **Alberta** ESC : maternité (16 semaines), parental (62 semaines), responsabilités familiales (10 jours/an). **Fédéral** CCT : maternité (17 semaines), parental (63 semaines), violence. **Action :** Référencer la loi applicable et diriger les salarié(e)s vers les RH.",
      },
      {
        heading: "5. Accommodement religieux et culturel",
        body: "L'obligation d'accommodement en vertu des codes des droits de la personne applicables exige que les employeurs accommodent les pratiques et observances religieuses des salarié(e)s — y compris l'octroi de congés pour des jours fériés religieux non inclus dans la liste légale. L'accommodement doit être accordé jusqu'à la contrainte excessive (norme **Meiorin**). Un(e) salarié(e) ne peut pas être obligé(e) d'utiliser ses jours de vacances pour une observance constituant un accommodement obligatoire. **Action :** Inclure un processus de demande d'accommodement qui ne requiert pas l'utilisation des jours de vacances; documenter les demandes et décisions.",
      },
      {
        heading: "6. Report des vacances — politiques de déchéance",
        body: "Plusieurs provinces limitent ou interdisent la déchéance des vacances. **Ontario** LNE : les vacances doivent être prises dans l'année d'accumulation ou payées; règle de 10 mois de report. **Québec** LNT, art. 70 : les vacances non prises peuvent être reportées d'un commun accord. **C.-B.** ESA : report possible sur accord écrit; sinon paiement. **Alberta** ESC : paiement obligatoire. **Fédéral** CCT : paiement obligatoire dans les 2 ans. Les politiques « use it or lose it » qui entraînent la perte automatique de vacances acquises sont généralement nulles. **Action :** Confirmer que les dispositions de report/déchéance respectent la loi; éviter la déchéance automatique.",
      },
    ],
  };
};
