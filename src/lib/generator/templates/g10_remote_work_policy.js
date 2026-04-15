// G10 — Remote Work Policy (includes right to disconnect & electronic monitoring)
// Multi-jurisdiction: exports function(j) => templateObject

export default function(j) {
  return {
    id: "T10",
    slug: "Remote_Work_Policy",
    kind: "policy",
    titleEN: "Remote Work Policy",
    titleFR: "Politique de travail à distance",

    bodyEN: [
      { type: "h1", text: "Remote Work Policy", align: "center" },
      { type: "p", text: "**Effective:** {{policy_effective_date}} — **Applies to:** {{policy_scope}} — **Jurisdiction:** " + j.nameEN, align: "center" },

      { type: "h2", text: "Why we have this policy" },
      { type: "p", text: "Where your role allows it, we support working remotely or in a hybrid way. Remote work can bring real benefits — better focus, less commuting, more flexibility for the rest of your life — but it only works when everyone is clear about how it's supposed to work. This policy sets out that shared understanding, and captures the legal requirements that apply to remote work in " + j.nameEN + "." },

      { type: "h2", text: "1. Who is eligible" },
      { type: "p", text: "Remote work is available where the nature of your role, the security of information, and the needs of your team allow it. Your manager, with HR, decides what arrangement is right for your role. If your role is not currently eligible and you would like it to be, please raise it with your manager — we are happy to have the conversation." },

      { type: "h2", text: "2. Types of arrangement" },
      { type: "p", text: "We support three arrangement types, each documented with your manager:" },
      { type: "bullet", text: "**Onsite** — regularly at a Company workplace." },
      { type: "bullet", text: "**Hybrid** — a mix of onsite and remote, on an agreed schedule." },
      { type: "bullet", text: "**Fully remote** — working from an approved home office or other approved location, with occasional onsite time as needed." },

      { type: "h2", text: "3. Your remote workspace" },
      { type: "p", text: "Your remote workspace should be a quiet, safe and confidential place where you can do focused work. You are responsible for: a reliable internet connection, a safe physical setup (ergonomics, trip hazards, etc.), and keeping Company information confidential from household members and visitors. The Company will provide the equipment listed in **{{remote_equipment_list}}**; reasonable accommodations for disability-related needs are available on request under the *Meiorin* standard (*British Columbia (PSERC) v. BCGSEU*, [1999] 3 S.C.R. 3)." },

      { type: "h2", text: "4. Health and safety at home" },
      { type: "p", text: "The Company's health and safety obligations under " + j.harassStatEN + " extend to remote workspaces. You agree to: follow our remote ergonomics guidance, report any incident or injury that happens while working, and let us conduct reasonable virtual or in-person safety check-ins if requested. Workers' compensation coverage continues while you are working — report incidents promptly to **{{hs_contact_name}}**." },

      { type: "h2", text: "5. Working hours and right to disconnect" },
      { type: "p", text: "Your regular hours of work are the same as they would be onsite. You are expected to be available during core hours of **{{core_hours}}**, local time. Outside of those hours and during your time off, you have the right to not be routinely expected to engage in work-related communications." },
      
      // Conditional RTD section - only render for ON or general non-statutory version
      (j.rightToDisconnect === true ? 
        { type: "p", text: "For employees working in " + j.nameEN + ", this right to disconnect policy is provided in accordance with " + j.rtdStatEN + ". This means you are not expected to engage in work-related communications, including reading or responding to emails, telephone calls, video calls, or messages, except in genuine emergencies or where required for specific, pre-agreed on-call duties. If you feel pressure to work outside your hours, please raise it with your manager or HR — we will take it seriously." } :
        { type: "p", text: "While " + j.nameEN + " does not have a statutory right-to-disconnect requirement, best practice requires us to respect boundaries between work and personal time. Outside core hours and during time off, you are not expected to check or respond to work communications except in genuine emergencies or as part of specific, pre-agreed on-call duties. This policy supports the wellbeing of all team members." }
      ),

      { type: "h2", text: "6. Overtime and accurate timekeeping" },
      { type: "p", text: "Overtime rules apply to remote work the same as onsite. The overtime threshold in " + j.nameEN + " is **" + j.overtimeHours + " hours per week**. " + (j.overtimeNoteEN || "") + " Pre-approval is required before working beyond your regular hours. Record your hours honestly and accurately — not doing so isn't a shortcut, it's a problem for you, your team and the Company." },

      { type: "h2", text: "7. Electronic monitoring" },
      { type: "p", text: "We use the following electronic monitoring practices to protect information security, manage systems, and support business operations: **{{electronic_monitoring_description}}**. We do not use this data for day-to-day surveillance of what you are doing minute by minute. Access to monitoring data is limited to people with a legitimate need and handled in accordance with our privacy obligations." },
      
      // Conditional EM section - only render for ON or general non-statutory version
      (j.electronicMon === true ? 
        { type: "p", text: "For employees working in " + j.nameEN + ", this disclosure is provided in accordance with " + j.emStatEN + ". Employees in all jurisdictions can ask **{{privacy_contact_name}}** for details about what data is collected and how it is used." } :
        { type: "p", text: "For employees in all jurisdictions, any electronic monitoring is conducted in accordance with " + j.privacyStatEN + " and applicable privacy law. You can ask **{{privacy_contact_name}}** for details about what data is collected and how it is used." }
      ),

      { type: "h2", text: "8. Information security" },
      { type: "p", text: "When working remotely, you will: only use Company-approved devices and networks for Company information; not share your login credentials; not store Company data on personal devices or personal cloud storage; lock your screen when you step away; and report any suspected security incident to **{{it_security_contact}}** immediately. If you handle personal information about customers or colleagues, handle it in accordance with our Privacy Policy and applicable privacy law — including the " + j.privacyStatEN + "." },

      { type: "h2", text: "9. Expenses and equipment" },
      { type: "p", text: "The Company will reimburse reasonable expenses that are reasonably necessary for remote work, subject to pre-approval as set out in our Expense Policy. For tax purposes, employees in Ontario, British Columbia, Alberta and federally regulated industries should complete **Form T2200** (Declaration of Conditions of Employment) or **T2200S** (simplified) to claim home office expenses on their personal tax return. For employees in Québec, the equivalent form is **TP-64.3-V**. Company-owned equipment remains Company property and must be returned in good condition (reasonable wear and tear excepted) at the end of your employment, or when otherwise requested." },

      { type: "h2", text: "10. Right to modify the arrangement" },
      { type: "p", text: "Remote work is not a right — it is an arrangement based on role, performance, and business needs. The Company may change or end a remote arrangement on reasonable notice if the role, the team's needs, or performance expectations require it. We will talk with you first and be transparent about the reasons." },

      { type: "h2", text: "11. Questions and concerns" },
      { type: "p", text: "If any part of this policy is unclear, or if remote work isn't working well for you, please talk to your manager or **{{hr_contact_name}}**. We'd rather have the conversation early and work it out than find out later that something wasn't working." },
    ],

    bodyFR: [
      { type: "h1", text: "Politique de travail à distance", align: "center" },
      { type: "p", text: "**Date d'entrée en vigueur :** {{policy_effective_date}} — **Portée :** {{policy_scope}} — **Juridiction :** " + j.nameFR, align: "center" },

      { type: "h2", text: "Pourquoi cette politique" },
      { type: "p", text: "Lorsque votre poste le permet, nous soutenons le travail à distance ou hybride. Le travail à distance peut apporter de réels avantages — plus de concentration, moins de trajets, plus de flexibilité pour le reste de votre vie — mais cela ne fonctionne que si chacun comprend clairement comment cela doit fonctionner. La présente politique énonce cette compréhension commune et consigne les exigences légales applicables au travail à distance en " + j.nameFR + "." },

      { type: "h2", text: "1. Admissibilité" },
      { type: "p", text: "Le travail à distance est offert lorsque la nature du poste, la sécurité de l'information et les besoins de l'équipe le permettent. Votre gestionnaire, avec les RH, détermine l'arrangement qui convient. Si votre poste n'est pas admissible actuellement et que vous aimeriez qu'il le soit, parlez-en à votre gestionnaire — nous serons heureux d'en discuter." },

      { type: "h2", text: "2. Types d'arrangements" },
      { type: "p", text: "Nous offrons trois types d'arrangements, documentés avec votre gestionnaire :" },
      { type: "bullet", text: "**Sur site** — régulièrement dans un lieu de travail de la Société." },
      { type: "bullet", text: "**Hybride** — combinaison de présence sur site et de travail à distance, selon un horaire convenu." },
      { type: "bullet", text: "**Entièrement à distance** — à partir d'un bureau à domicile ou d'un autre lieu approuvé, avec une présence occasionnelle sur site au besoin." },

      { type: "h2", text: "3. Votre espace de travail à distance" },
      { type: "p", text: "Votre espace de travail devrait être un lieu calme, sécuritaire et confidentiel où vous pouvez effectuer un travail concentré. Vous êtes responsable : d'une connexion Internet fiable, d'un aménagement physique sécuritaire (ergonomie, obstacles, etc.) et de préserver la confidentialité des renseignements de la Société à l'égard des membres du ménage et des visiteurs. La Société fournit l'équipement énuméré à **{{remote_equipment_list}}**; des accommodements raisonnables liés à un handicap sont offerts sur demande, selon la norme *Meiorin* (*C.-B. (PSERC) c. BCGSEU*, [1999] 3 R.C.S. 3)." },

      { type: "h2", text: "4. Santé et sécurité à domicile" },
      { type: "p", text: "Les obligations de santé et sécurité prévues au " + j.harassStatFR + " s'étendent aux espaces de travail à distance. Vous acceptez de : suivre les conseils ergonomiques pour le télétravail, signaler tout incident ou blessure survenu pendant le travail, et permettre, si demandé, des vérifications virtuelles ou en personne raisonnables. La couverture en matière d'indemnisation des travailleurs se poursuit pendant le travail — signalez promptement les incidents à **{{hs_contact_name}}**." },

      { type: "h2", text: "5. Heures de travail et droit à la déconnexion" },
      { type: "p", text: "Vos heures régulières de travail sont les mêmes qu'en mode sur site. Vous êtes attendu(e) disponible durant les heures centrales de **{{core_hours}}**, heure locale. En dehors de ces heures et pendant vos congés, vous n'êtes pas habituellement attendu(e) de vous engager dans des communications liées au travail." },
      
      (j.rightToDisconnect === true ? 
        { type: "p", text: "Pour les personnes salariées en " + j.nameFR + ", cette politique de droit à la déconnexion est fournie conformément à " + j.rtdStatFR + ". Vous ne serez pas tenu(e) de communications liées au travail, y compris la lecture ou la réponse à des courriels, appels, visioconférences ou messages, sauf urgence réelle ou tâche de garde convenue d'avance. Si vous ressentez une pression à travailler en dehors de vos heures, parlez-en à votre gestionnaire ou aux RH — nous prendrons la question au sérieux." } :
        { type: "p", text: "Bien que la " + j.nameFR + " ne dispose pas d'une exigence légale de droit à la déconnexion, la bonne pratique exige le respect des limites entre le travail et la vie personnelle. En dehors des heures centrales et pendant les congés, vous ne serez pas attendu(e) de vérifier ou répondre aux communications de travail sauf en cas d'urgence réelle ou dans le cadre de tâches de garde convenues d'avance. Cette politique soutient le bien-être de tous les membres de l'équipe." }
      ),

      { type: "h2", text: "6. Heures supplémentaires et pointage exact" },
      { type: "p", text: "Les règles relatives aux heures supplémentaires s'appliquent de la même manière au travail à distance. Le seuil d'heures supplémentaires en " + j.nameFR + " est de **" + j.overtimeHours + " heures par semaine**. " + (j.overtimeNoteFR || "") + " Une approbation préalable est requise avant de travailler au-delà de vos heures régulières. Consignez vos heures honnêtement et avec exactitude — autrement, ce n'est pas un raccourci, c'est un problème pour vous, votre équipe et la Société." },

      { type: "h2", text: "7. Surveillance électronique" },
      { type: "p", text: "Nous utilisons les pratiques de surveillance électronique suivantes afin de protéger la sécurité de l'information, de gérer les systèmes et de soutenir l'exploitation : **{{electronic_monitoring_description}}**. Ces données ne sont pas utilisées pour une surveillance minute par minute de votre travail. L'accès aux données de surveillance est limité aux personnes ayant un besoin légitime et se fait conformément à nos obligations en matière de vie privée." },
      
      (j.electronicMon === true ? 
        { type: "p", text: "Pour les personnes salariées en " + j.nameFR + ", la présente divulgation est fournie conformément à " + j.emStatFR + ". Les employé(e)s de toute juridiction peuvent demander à **{{privacy_contact_name}}** des précisions sur les données recueillies et leur utilisation." } :
        { type: "p", text: "Pour les employé(e)s de toute juridiction, toute surveillance électronique se fait conformément à " + j.privacyStatFR + " et à la législation applicable en matière de confidentialité. Vous pouvez demander à **{{privacy_contact_name}}** des précisions sur les données recueillies et leur utilisation." }
      ),

      { type: "h2", text: "8. Sécurité de l'information" },
      { type: "p", text: "En travaillant à distance, vous : n'utiliserez que des appareils et réseaux approuvés pour les renseignements de la Société; ne partagerez pas vos identifiants; n'enregistrerez pas de données de la Société sur des appareils ou stockages infonuagiques personnels; verrouillerez votre écran lorsque vous vous absentez; et signalerez immédiatement tout incident soupçonné de sécurité à **{{it_security_contact}}**. Si vous manipulez des renseignements personnels concernant la clientèle ou des collègues, traitez-les conformément à notre politique de confidentialité et à la législation applicable — notamment la " + j.privacyStatFR + "." },

      { type: "h2", text: "9. Dépenses et équipement" },
      { type: "p", text: "La Société remboursera les dépenses raisonnables et raisonnablement nécessaires au travail à distance, sous réserve d'une approbation préalable conformément à notre politique sur les dépenses. Aux fins de l'impôt, les personnes salariées en Ontario, en Colombie-Britannique, en Alberta et dans les secteurs assujettis à la réglementation fédérale doivent remplir le **Formulaire T2200** (Déclaration des conditions d'emploi) ou le **T2200S** (version simplifiée) pour déduire les frais de bureau à domicile dans leur déclaration de revenus personnelle. Pour les salarié(e)s au Québec, le formulaire équivalent est le **TP-64.3-V**. L'équipement de la Société demeure sa propriété et doit être retourné en bon état (usure normale exceptée) à la fin de l'emploi ou sur demande." },

      { type: "h2", text: "10. Droit de modifier l'arrangement" },
      { type: "p", text: "Le travail à distance n'est pas un droit — c'est un arrangement fondé sur le poste, le rendement et les besoins opérationnels. La Société peut modifier ou mettre fin à un arrangement moyennant un préavis raisonnable si le rôle, les besoins de l'équipe ou les attentes en matière de rendement l'exigent. Nous vous en parlerons d'abord et serons transparents quant aux motifs." },

      { type: "h2", text: "11. Questions et préoccupations" },
      { type: "p", text: "Si un élément de la politique n'est pas clair, ou si le travail à distance ne vous convient pas, parlez-en à votre gestionnaire ou à **{{hr_contact_name}}**. Mieux vaut en discuter tôt et trouver une solution que s'en rendre compte plus tard." },
    ],

    legalNotesEN: [
      {
        heading: "1. Right to disconnect — Ontario ESA s. 21.1.2",
        body: "**ESA s. 21.1.2** (*Working for Workers Act, 2021*, S.O. 2021, c. 34): applies only to Ontario employers with 25 or more employees as of January 1 of a year; policy must be in place by March 1. Policy must be provided to each employee within 30 days and to new employees within 30 days of hire. Must address that employees are not routinely required to check or respond to work-related emails, calls, or messages outside scheduled hours. **Non-Ontario jurisdictions:** no statutory right-to-disconnect requirement; best practice is to adopt a policy regardless. Employers in all provinces should document their after-hours communication expectations.",
      },
      {
        heading: "2. Electronic monitoring — Ontario ESA s. 41.1.1",
        body: "**ESA s. 41.1.1**: applies only to Ontario employers with 25 or more employees; policy must describe: (a) whether the employer electronically monitors employees; (b) if so, how and in what circumstances; (c) purposes for which information may be used. Policy must be provided to employees within 30 days. **Non-Ontario:** employers must comply with privacy legislation applicable in each jurisdiction (PIPEDA federal, PIPA BC/AB, Law 25 QC). Electronic monitoring is permissible if disclosed and limited to purposes consistent with privacy law.",
      },
      {
        heading: "3. Overtime — provincial variations",
        body: "Overtime thresholds vary by province: **Ontario** ESA — 44 hours/week; **Québec** ARLS — 40 hours/week; **BC** ESA — DUAL trigger (8 hours/day OR 40 hours/week); **Alberta** ESC — 44 hours/week; **Federal** CLC — 40 hours/week. Overtime banking (time off in lieu) is permitted in AB with written agreement. Remote workers must be tracked by actual hours worked, not 'availability.' Informal expectations of after-hours availability can give rise to overtime claims.",
      },
      {
        heading: "4. Home workspace health and safety",
        body: "**Ontario** OHSA (R.S.O. 1990, c. O.1): employer obligations extend to remote workers. **Québec** LSST (art. 51): employer OHS obligations extend to home workplace; art. 59.0.1 provides right to refuse overtime related to family status. **BC** WorkSafeBC OHS Regulation Part 4.27: employer must assess and address home workplace hazards. **Alberta** OHS Act: employer must ensure safety standards at home workplaces. **Federal** CLC Part II: employer health and safety obligations extend to home workers; WPHVPR SOR/2020-130 requires hazard assessment. **Action:** Conduct or request home workspace assessments and document them.",
      },
      {
        heading: "5. Multi-jurisdictional employment — province of work",
        body: "An employee working remotely from a province different from the employer's location is subject to the employment standards legislation of the province where work is actually performed, not where the employer is registered. If an employee relocates to Québec while working remotely, ARLS and the Civil Code apply; if to Ontario, the ESA applies. Payroll deductions and statutory benefits (vacation, sick leave, parental) must follow the province of work. **Action:** Confirm the employment agreement and payroll processing reflect the employee's actual province of work, not the employer's home province.",
      },
      {
        heading: "6. Income tax — T2200, T2200S, and TP-64.3-V",
        body: "Remote workers who incur employment expenses at home may be eligible to claim home office expenses on their personal tax return. **Ontario, BC, AB, Federal:** Form T2200 (Declaration of Conditions of Employment) or T2200S (simplified, for remote arrangements). Employer must certify conditions on T2200; missing or incorrect T2200 can result in penalties and loss of expense deductions. **Québec:** Form TP-64.3-V is the Québec equivalent. **Action:** Confirm the remote work policy specifies whether the employer will complete T2200/T2200S/TP-64.3-V for eligible employees and whether the Company expects employees to claim home office expenses.",
      },
      {
        heading: "7. Harassment and violence prevention — interprovincial",
        body: "**Ontario** OHSA ss. 32.0.1–32.0.8: employer must have a violence and harassment prevention policy. **Québec** ARLS arts. 81.18–81.20 and CNESST: psychological harassment protections; employer must investigate complaints. **BC** Workers Comp Act Part 3 and OHS Regulation Part 4.27: workplace bullying and harassment prevention. **Alberta** OHS Act: employer must investigate harassment complaints. **Federal** CLC Part II and WPHVPR: annual harassment and violence prevention report required. Remote workers in all jurisdictions must have access to harassment reporting channels and be included in H&S programs.",
      },
    ],

    legalNotesFR: [
      {
        heading: "1. Droit à la déconnexion — Ontario LNE, art. 21.1.2",
        body: "**LNE, art. 21.1.2** (*Loi de 2021 visant à œuvrer pour les travailleurs*, L.O. 2021, c. 34): s'applique uniquement aux employeurs ontariens de 25 personnes salariées ou plus au 1er janvier; la politique doit être en place au plus tard le 1er mars. La politique doit être remise dans les 30 jours à chaque salarié(e) et aux nouveaux employés dans les 30 jours suivant l'embauche. Elle doit indiquer que les salarié(e)s ne seront pas habituellement tenus de vérifier ou répondre aux communications professionnelles en dehors de leurs heures prévues. **Autres juridictions :** aucune exigence légale; bonne pratique d'adopter une politique dans tous les cas. Les employeurs de toutes les provinces devraient documenter les attentes en matière de communications après les heures.",
      },
      {
        heading: "2. Surveillance électronique — Ontario LNE, art. 41.1.1",
        body: "**LNE, art. 41.1.1**: s'applique uniquement aux employeurs ontariens de 25 personnes salariées ou plus; la politique doit décrire : (a) si l'employeur surveille électroniquement les salarié(e)s; (b) si oui, comment et dans quelles circonstances; (c) les fins pour lesquelles les renseignements peuvent être utilisés. La politique doit être remise dans les 30 jours. **Non-Ontario :** les employeurs doivent se conformer à la législation applicable (LPRPDE fédérale, PIPA C.-B./Alb., Loi 25 QC). La surveillance est permise si divulguée et limitée aux fins compatibles avec la loi sur la protection des données.",
      },
      {
        heading: "3. Heures supplémentaires — variations provinciales",
        body: "Les seuils d'heures supplémentaires varient : **Ontario** LNE — 44 heures/semaine; **Québec** LNT — 40 heures/semaine; **C.-B.** ESA — DOUBLE déclenchement (8 heures/jour OU 40 heures/semaine); **Alberta** ESC — 44 heures/semaine; **Fédéral** CCT — 40 heures/semaine. Les banques d'heures supplémentaires (congés compensatoires) sont permises en Alberta sur accord écrit. Les télétravailleurs doivent être suiis selon les heures de travail réelles, non la disponibilité. Les attentes informelles de disponibilité en dehors des heures peuvent donner lieu à des réclamations.",
      },
      {
        heading: "4. Santé et sécurité au domicile",
        body: "**Ontario** LSST (L.R.O. 1990, c. O.1) : les obligations s'étendent aux télétravailleurs. **Québec** LSST (art. 51) : les obligations s'étendent au domicile; l'art. 59.0.1 offre le droit de refuser les heures supplémentaires liées au statut familial. **C.-B.** Règlement OHS de WorkSafeBC, Partie 4.27 : l'employeur doit évaluer et traiter les risques. **Alberta** OHS Act : les normes de sécurité au domicile. **Fédéral** CCT Partie II : obligations d'employeur au domicile; RPHVLT DORS/2020-130 exige une évaluation. **Action :** Effectuer des évaluations et les documenter.",
      },
      {
        heading: "5. Emploi multiprovincial — province de travail",
        body: "Un(e) salarié(e) qui travaille à distance depuis une province différente est assujetti(e) à la législation sur les normes du travail de la province où il/elle effectue le travail, non celle de l'enregistrement de l'employeur. Si un(e) salarié(e) déménage au Québec, la LNT et le Code civil s'appliquent. En Ontario, la LNE s'applique. Les retenues et avantages (vacances, congés de maladie) doivent suivre la province de travail. **Action :** Confirmer que le contrat et la paie reflètent la province de travail réelle.",
      },
      {
        heading: "6. Impôt sur le revenu — T2200, T2200S et TP-64.3-V",
        body: "Les télétravailleurs qui engagent des dépenses d'emploi peuvent déduire les frais de bureau à domicile. **Ontario, C.-B., Alb., Fédéral :** Formulaires T2200 ou T2200S. L'employeur doit certifier les conditions; un T2200 manquant ou incorrect peut entraîner des pénalités. **Québec :** Formulaire TP-64.3-V. **Action :** Confirmer si l'employeur remplira les formulaires pour les salarié(e)s admissibles.",
      },
      {
        heading: "7. Prévention du harcèlement — interprovincial",
        body: "**Ontario** LSST, art. 32.0.1–32.0.8 : politique obligatoire. **Québec** LNT, art. 81.18–81.20 et CNESST : protections contre le harcèlement psychologique. **C.-B.** Loi sur l'indemnisation et Règlement, Partie 4.27. **Alberta** OHS Act. **Fédéral** CCT Partie II et RPHVLT : rapport annuel obligatoire. Les télétravailleurs doivent avoir accès aux canaux de signalement et être inclus dans les programmes de SST.",
      },
    ],
  };
};
