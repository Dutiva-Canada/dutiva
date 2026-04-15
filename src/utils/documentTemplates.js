// documentTemplates.js
//
// ⚠️ DEPRECATED as the primary template source.
//
// As of the Phase 1 consolidation, the canonical template engine lives in
// src/lib/generator/ (ported from tools/templates-generator/). GeneratorPage
// now calls renderTemplate() first and only falls through to this file when
// a UI template name has no engine counterpart.
//
// Still used for:
//   - Accommodation Request Form
//   - Accommodation Plan Template
//   - Leave Request Form
//   - Sick Day Policy
//   - Return-to-Work Plan (Mental Health)
//   - Respectful Workplace Policy
//   - Wellness Action Plan
//
// DO NOT add new legal language here. Port the template into
// src/lib/generator/templates/ (as a function(j) -> { bodyEN, bodyFR }) and
// register it in src/lib/generator/index.js.

const ACT_REF = {
  Ontario: 'Employment Standards Act, 2000, S.O. 2000, c. 41 ("ESA")',
  "British Columbia": 'Employment Standards Act, R.S.B.C. 1996, c. 113 ("ESA")',
  Alberta: 'Employment Standards Code, R.S.A. 2000, c. E-9 ("ESC")',
  Quebec: 'Act Respecting Labour Standards, CQLR c N-1.1 ("ARLS")',
  Manitoba: 'Employment Standards Code, C.C.S.M. c. E110 ("ESC")',
  Saskatchewan: 'Saskatchewan Employment Act, SS 2013, c S-15.1 ("SEA")',
  "Nova Scotia": 'Labour Standards Code, R.S.N.S. 1989, c. 246 ("LSC")',
  "New Brunswick": 'Employment Standards Act, SNB 1982, c E-7.2 ("ESA")',
  Federal: 'Canada Labour Code, R.S.C., 1985, c. L-2 ("CLC")',
  "Newfoundland and Labrador": 'Labour Standards Act, R.S.N.L. 1990, c. L-2 ("LSA")',
  "Prince Edward Island": 'Employment Standards Act, R.S.P.E.I. 1988, c. E-6.2 ("ESA")',
  "Northwest Territories": 'Employment Standards Act, S.N.W.T. 2007, c. 13 ("ESA")',
  Nunavut: 'Labour Standards Act, R.S.N.W.T. 1988, c. L-1 ("LSA")',
  Yukon: 'Employment Standards Act, R.S.Y. 2002, c. 72 ("ESA")',
};

function today() {
  return new Date().toLocaleDateString("en-CA", { year: "numeric", month: "long", day: "numeric" });
}

function act(jurisdiction) {
  return ACT_REF[jurisdiction] || ACT_REF["Ontario"];
}

function actName(jurisdiction) {
  return act(jurisdiction).split(' ("')[0];
}

function buildHeader(template, form) {
  return [
    template,
    "",
    `Employer: ${form.companyName}`,
    `Jurisdiction: ${form.jurisdiction}`,
    `Employee: ${form.employeeName}`,
    `Role: ${form.jobTitle}`,
    `Compensation: ${form.salary}`,
    `Start date: ${form.startDate}`,
    `Manager: ${form.manager}`,
    "",
    "Notes:",
    form.notes,
  ].join("\n");
}

// ─── Template generators ──────────────────────────────────────────────────────

function genOfferLetter(form) {
  return `${today()}

Dear ${form.employeeName},

${form.companyName} (the "Company") is pleased to extend this conditional offer of employment. We believe your background makes you an excellent addition to our team.

POSITION
Job title:        ${form.jobTitle}
Reports to:       ${form.manager}
Location:         ${form.companyName} — ${form.jurisdiction}
Start date:       ${form.startDate}
Employment type:  Full-time, permanent

COMPENSATION
Base salary:      ${form.salary} per year, paid bi-weekly
Benefits:         Company group benefits plan (eligible after 3 months of continuous service)
Vacation:         Two (2) weeks per year, accrued from date of hire, in accordance with the ${actName(form.jurisdiction)}

PROBATIONARY PERIOD
This offer is subject to a three (3) month probationary period. During this period, either party may end employment with one (1) week's written notice, subject to the minimum entitlements under the ${actName(form.jurisdiction)}.

CONDITIONS OF EMPLOYMENT
This offer is contingent upon:
  • Satisfactory verification of your eligibility to work in Canada
  • Successful completion of a reference check (if applicable)
  • Execution of the Company's Confidentiality and Intellectual Property Agreement

GOVERNING STANDARDS
This offer is governed by the ${act(form.jurisdiction)}. Nothing in this letter reduces your minimum entitlements under applicable employment standards legislation.

Please confirm your acceptance by signing and returning one copy of this letter to ${form.manager} within five (5) business days.

Yours sincerely,

_______________________________
${form.manager}
${form.companyName}
Date: ________________________


─────────────────────────────────────────────────────────────
ACCEPTANCE OF OFFER

I, ${form.employeeName}, accept the offer of employment as ${form.jobTitle} at ${form.companyName} on the terms and conditions set out in this letter.

Signature: ____________________    Date: ________________________
Printed name: ${form.employeeName}`;
}

function genEmploymentAgreement(form) {
  return `EMPLOYMENT AGREEMENT

This Employment Agreement (the "Agreement") is entered into as of ${form.startDate}, between:

  ${form.companyName} (the "Employer")
  — and —
  ${form.employeeName} (the "Employee")

1. POSITION AND DUTIES
The Employer agrees to employ the Employee as ${form.jobTitle}, reporting to ${form.manager}. The Employee agrees to perform all associated duties faithfully and to follow the lawful policies and reasonable directives of the Employer.

2. COMMENCEMENT
Employment commences on ${form.startDate}. This Agreement supersedes all prior discussions or agreements between the Parties regarding employment.

3. COMPENSATION
3.1 Base Salary. The Employer shall pay the Employee ${form.salary} per year, paid bi-weekly.
3.2 Review. Compensation may be reviewed annually at the Employer's discretion. A review does not create an obligation to increase compensation.
3.3 Deductions. The Employer shall make all deductions required by law (CPP, EI, income tax).

4. HOURS OF WORK
Standard hours are 37.5–40 per week. The Employee may be required to work additional hours to fulfil their responsibilities. Overtime will be compensated in accordance with the ${actName(form.jurisdiction)}.

5. BENEFITS AND VACATION
5.1 Benefits. The Employee is eligible for the Company's group benefits plan after three (3) months of continuous service.
5.2 Vacation. The Employee is entitled to a minimum of two (2) weeks of paid vacation per year, accruing from the date of hire, in compliance with the ${act(form.jurisdiction)}.

6. CONFIDENTIALITY AND INTELLECTUAL PROPERTY
During and after employment, the Employee shall maintain in strict confidence all proprietary, business, and technical information of the Employer. All work product, inventions, and intellectual property created in the course of employment are assigned to and owned by the Employer.

7. CONFLICT OF INTEREST
The Employee shall not engage in any activity that conflicts with the Employer's business interests without prior written consent.

8. TERMINATION
8.1 By the Employer — For Cause. The Employer may terminate this Agreement immediately and without notice or pay for just cause.
8.2 By the Employer — Without Cause. The Employer may terminate this Agreement without cause upon providing the greater of: (i) working notice or pay in lieu as agreed; or (ii) the statutory minimum notice and severance required under the ${actName(form.jurisdiction)}.
8.3 By the Employee. The Employee may resign by providing the Employer with written notice in accordance with the ${actName(form.jurisdiction)}.
8.4 Pay in Lieu. The Employer may elect to provide pay in lieu of working notice, in which case the last day of active employment shall be the date specified by the Employer.

9. POST-EMPLOYMENT OBLIGATIONS
For twelve (12) months following termination, the Employee shall not solicit the Employer's clients or employees with whom they had material contact during employment.

10. GOVERNING LAW
This Agreement is governed by the laws of ${form.jurisdiction}. The courts of ${form.jurisdiction} shall have exclusive jurisdiction over any dispute arising under this Agreement.

11. ENTIRE AGREEMENT
This Agreement constitutes the entire agreement between the Parties regarding employment and supersedes all prior negotiations, representations, and agreements.

─────────────────────────────────────────────────────────────
IN WITNESS WHEREOF, the Parties have executed this Agreement.

EMPLOYER — ${form.companyName}

Signature: ____________________    Date: ________________________
Printed name: _________________
Title: ________________________

EMPLOYEE

Signature: ____________________    Date: ________________________
Printed name: ${form.employeeName}`;
}

function genTerminationLetter(form) {
  return `${today()}

PRIVATE AND CONFIDENTIAL

Dear ${form.employeeName},

This letter confirms the termination of your employment with ${form.companyName}.

1. EFFECTIVE DATE
Your employment is terminated effective [insert termination date].

2. REASON FOR TERMINATION
  ☐ Without cause — This termination is not a reflection of your conduct or performance.
  ☐ With cause — This termination results from [describe conduct, with specifics].

3. NOTICE OR PAY IN LIEU
Your employment is terminated:
  ☐ Immediately, with pay in lieu of the notice period set out below.
  ☐ With working notice, your last active day being [last working day].

In accordance with the ${act(form.jurisdiction)}, your statutory entitlements are:
  • Length of service:              [X years/months]
  • Statutory notice period:        [X week(s)]
  • Severance pay (if applicable):  [X week(s) × weekly wages]
  • Total pay in lieu:              $____________

4. FINAL PAY
Your final pay will include:
  • All wages earned to your last day of employment
  • Accrued, unused vacation pay (minimum as required under the ${actName(form.jurisdiction)})
  • Pay in lieu of notice (if applicable)
  • Severance pay (if applicable)

Your Record of Employment (ROE) will be filed with Service Canada within the timeframe required by law.

5. BENEFITS
Group benefits coverage will cease on [last day of employment / end of the notice period]. You may have conversion rights — contact [HR / benefits administrator] for details.

6. COMPANY PROPERTY
Please return all Company property by [date], including access cards, equipment, keys, and confidential documents. System access will be deactivated on [date].

7. ONGOING OBLIGATIONS
Your obligations of confidentiality and non-solicitation under your Employment Agreement and Company policies continue following the termination of your employment.

8. SEPARATION AGREEMENT (if applicable)
In exchange for an enhanced separation payment of $____________ above your statutory minimums, you will receive the attached Separation Agreement and Release. You are encouraged to seek independent legal advice. You have [21] days to review this offer.

We wish you every success in your future endeavours.

Yours sincerely,

_______________________________
${form.manager}
${form.companyName}
Date: ${today()}


─────────────────────────────────────────────────────────────
ACKNOWLEDGEMENT OF RECEIPT

I, ${form.employeeName}, acknowledge receipt of this termination letter.

Signature: ____________________    Date: ________________________`;
}

function genWrittenWarning(form) {
  return `WRITTEN WARNING

Employee:      ${form.employeeName}
Job title:     ${form.jobTitle}
Manager:       ${form.manager}
Date issued:   ${today()}
Warning level: ☐ First written warning   ☐ Second written warning   ☐ Final written warning

1. DESCRIPTION OF INCIDENT / PERFORMANCE ISSUE
On or about [date(s)], the following incident(s) or performance concern(s) were identified:

[Describe the specific conduct, performance gap, or policy violation. Be specific: include dates, times, witnesses, and reference any supporting documentation.]

2. PRIOR CORRECTIVE ACTIONS
  ☐ Verbal warning on: _______________
  ☐ Prior written warning dated: _______________
  ☐ Coaching or mentoring sessions

3. POLICY OR STANDARD VIOLATED
The conduct described above contravenes the following Company policy/standard:
  [ ] [Policy name and section reference]

4. EXPECTED STANDARD
The Company requires all employees to meet the following standard:
[State the expected standard clearly and objectively.]

5. CORRECTIVE ACTION REQUIRED
The Employee is required to take the following corrective steps immediately:
  a) [Specific action — e.g. complete training by (date)]
  b) [Measurable improvement — e.g. achieve X outcome by Y date]
  c) [Any other specific requirement]

6. CONSEQUENCES OF NON-COMPLIANCE
Failure to meet the standards set out in this warning may result in further disciplinary action, up to and including termination of employment with or without cause, in accordance with the ${actName(form.jurisdiction)}.

7. EMPLOYEE'S RIGHT TO RESPOND
The Employee may respond to this warning in writing within five (5) business days. Their response will be placed in their personnel file alongside this warning.

─────────────────────────────────────────────────────────────
Signatures

_____________________________ Date: ___________
${form.manager}, Manager / Supervisor

_____________________________ Date: ___________
${form.employeeName}, Employee
(Signature acknowledges receipt only — not necessarily agreement)

_____________________________ Date: ___________
HR Representative / Witness`;
}

function genConfidentialityAgreement(form) {
  return `CONFIDENTIALITY AND NON-DISCLOSURE AGREEMENT

This Agreement is entered into as of ${form.startDate}, between:

  ${form.companyName} (the "Company")
  — and —
  ${form.employeeName} (the "Employee")

1. DEFINITION OF CONFIDENTIAL INFORMATION
"Confidential Information" means all non-public information disclosed to or acquired by the Employee in the course of employment, including but not limited to: business plans, financial data, client and customer lists, pricing, trade secrets, software, product formulas, research, marketing strategies, and personnel information.

2. OBLIGATIONS OF CONFIDENTIALITY
The Employee agrees to:
  a) Hold all Confidential Information in strict confidence;
  b) Use Confidential Information solely for the purposes of performing their employment duties;
  c) Not disclose Confidential Information to any third party without prior written consent from the Company;
  d) Promptly notify the Company upon discovering any unauthorized use or disclosure of Confidential Information.

3. EXCLUSIONS
This Agreement does not apply to information that:
  a) Was publicly known at the time of disclosure through no breach by the Employee;
  b) Becomes publicly known after disclosure through no act or omission of the Employee;
  c) Was already known to the Employee prior to disclosure and not subject to any obligation of confidentiality; or
  d) Is required to be disclosed by law, court order, or regulatory authority — provided the Employee gives the Company reasonable prior written notice.

4. INTELLECTUAL PROPERTY
All work product, inventions, discoveries, software, and creative works produced by the Employee within the scope of their employment are the exclusive property of the Company. The Employee assigns to the Company all intellectual property rights in such work, effective upon creation.

5. RETURN OF MATERIALS
Upon termination of employment for any reason, the Employee shall promptly return all Confidential Information and Company property, including all copies in any medium.

6. DURATION
Obligations under this Agreement survive termination of employment for:
  • Trade secrets: indefinitely (or until public disclosure through no fault of the Employee)
  • All other Confidential Information: three (3) years following termination

7. GOVERNING LAW
This Agreement is governed by the laws of ${form.jurisdiction}.

─────────────────────────────────────────────────────────────
IN WITNESS WHEREOF, the Parties have signed this Agreement.

COMPANY — ${form.companyName}

Signature: ____________________    Date: ________________________
Printed name: _________________
Title: ________________________

EMPLOYEE

Signature: ____________________    Date: ________________________
Printed name: ${form.employeeName}`;
}

function genContractorAgreement(form) {
  return `INDEPENDENT CONTRACTOR AGREEMENT

This Independent Contractor Agreement (the "Agreement") is entered into as of ${form.startDate}, between:

  ${form.companyName} (the "Client")
  — and —
  ${form.employeeName} (the "Contractor")

1. NATURE OF RELATIONSHIP
The Contractor is retained as an independent contractor and is not an employee, agent, or partner of the Client. Nothing in this Agreement creates an employment relationship. The Contractor is not entitled to employee benefits, statutory vacation pay, or protections under the ${act(form.jurisdiction)}.

2. SERVICES
The Contractor shall provide the following services:
  Function / role:  ${form.jobTitle}
  Scope of work:    ${form.scopeOfWork || "[Describe specific deliverables, milestones, and any exclusions]"}

3. COMPENSATION
  Rate:             ${form.contractRate || "[Insert rate — e.g. $X per hour / $X per project milestone]"}
  Invoicing:        The Contractor shall submit invoices [bi-weekly / monthly / upon milestone completion].
  Payment terms:    Net 30 days from receipt of a valid invoice.
  Tax remittance:   The Contractor is solely responsible for remitting all applicable income taxes, CPP contributions, and HST/GST. The Client will pay HST/GST on valid invoices where the Contractor is registered.

4. TERM AND TERMINATION
  Start date:    ${form.startDate}
  End date:      [Insert end date, or "Month-to-month until terminated in writing"]
  Termination:   Either party may terminate this Agreement with thirty (30) days' written notice. The Client may terminate immediately for material breach.

5. CONTRACTOR OBLIGATIONS
The Contractor is responsible for:
  a) All applicable taxes, source deductions, and government remittances;
  b) Maintaining their own tools, equipment, and workspace unless otherwise agreed in writing;
  c) Carrying adequate liability insurance (minimum $[X] per occurrence) — certificate available on request;
  d) Compliance with all applicable laws in the performance of the Services.

6. CONFIDENTIALITY
The Contractor shall keep confidential all proprietary and business information of the Client and its clients, during and indefinitely after the term of this Agreement.

7. INTELLECTUAL PROPERTY
All deliverables, work product, and intellectual property created by the Contractor under this Agreement are assigned to and owned by the Client upon creation, without further compensation.

8. NON-SOLICITATION
During the term of this Agreement and for twelve (12) months following termination, the Contractor shall not directly or indirectly solicit the Client's employees, clients, or prospects.

9. GOVERNING LAW
This Agreement is governed by the laws of ${form.jurisdiction}.

─────────────────────────────────────────────────────────────
IN WITNESS WHEREOF, the Parties have signed this Agreement.

CLIENT — ${form.companyName}

Signature: ____________________    Date: ________________________
Printed name: _________________
Title: ________________________

CONTRACTOR

Signature: ____________________    Date: ________________________
Printed name: ${form.employeeName}`;
}

function genNonCompete(form) {
  const isQC = form.jurisdiction === "Quebec";
  return `NON-COMPETITION AND NON-SOLICITATION AGREEMENT

This Agreement is entered into as of ${form.startDate}, between:

  ${form.companyName} (the "Company")
  — and —
  ${form.employeeName} (the "Employee")

RECITALS
The Employee holds the position of ${form.jobTitle} and will have access to confidential business information, client relationships, and trade secrets of the Company. This Agreement is intended to protect the Company's legitimate business interests.

1. NON-COMPETITION
During employment and for [6] months following termination (for any reason), the Employee shall not:
  a) Directly or indirectly engage in, own, manage, or participate in any business that materially competes with the Company's core business in [geographic area — e.g. the Province of ${form.jurisdiction} / Canada]; or
  b) Accept employment or a consulting engagement with a direct Competitor (as defined below).

"Competitor" means any business that provides [describe the Company's services/products] substantially similar to those of the Company.

${isQC ? `NOTE — QUEBEC LAW: Non-competition clauses in Quebec must comply with art. 2089 of the Civil Code of Québec. The clause must be limited in time, place, and type of employment. The Company bears the burden of proving the clause is valid. Legal review is strongly recommended before enforcing this provision.` : ""}

2. NON-SOLICITATION OF CLIENTS
During employment and for twelve (12) months following termination, the Employee shall not directly or indirectly solicit, approach, or accept business from any client or prospective client of the Company with whom the Employee had material contact during the twelve (12) months preceding termination.

3. NON-SOLICITATION OF EMPLOYEES
During employment and for twelve (12) months following termination, the Employee shall not directly or indirectly recruit, solicit, or encourage any Company employee to leave their employment.

4. REASONABLENESS
The Employee acknowledges that the restrictions in this Agreement are reasonable and necessary to protect legitimate business interests, having regard to the Employee's access to Confidential Information and client relationships.

5. REMEDIES
The Employee acknowledges that breach of this Agreement would cause irreparable harm not adequately compensated by damages, and the Company shall be entitled to seek injunctive relief, in addition to all other remedies at law or in equity.

6. SEVERABILITY
If any provision of this Agreement is held unenforceable, it shall be modified to the minimum extent necessary to make it enforceable. A court may "read down" an overbroad clause rather than void it entirely.

7. GOVERNING LAW
This Agreement is governed by the laws of ${form.jurisdiction}.

─────────────────────────────────────────────────────────────
Signatures

COMPANY — ${form.companyName}

Signature: ____________________    Date: ________________________
Printed name: _________________
Title: ________________________

EMPLOYEE

Signature: ____________________    Date: ________________________
Printed name: ${form.employeeName}`;
}

function genOfferLetterFrench(form) {
  return `${today()}

OFFRE D'EMPLOI — LETTRE D'OFFRE

Chère / Cher ${form.employeeName},

C'est avec grand plaisir que ${form.companyName} (l'« Employeur ») vous présente cette offre d'emploi conditionnelle aux conditions suivantes.

POSTE
Titre du poste :      ${form.jobTitle}
Supérieur immédiat :  ${form.manager}
Lieu de travail :     ${form.companyName} — ${form.jurisdiction}
Date d'entrée :       ${form.startDate}
Type d'emploi :       Temps plein, poste permanent

RÉMUNÉRATION
Salaire de base :     ${form.salary} par année, versé aux deux semaines
Avantages sociaux :   Régimes collectifs de l'Employeur (admissibilité après 3 mois de service continu)
Vacances :            Deux (2) semaines par année, accumulées dès la date d'embauche, conformément à la Loi sur les normes du travail, RLRQ c N-1.1 (la « LNT »)

PÉRIODE DE PROBATION
La présente offre est assortie d'une période de probation de trois (3) mois. Durant cette période, l'une ou l'autre des parties peut mettre fin à l'emploi moyennant un préavis écrit d'une (1) semaine, sous réserve des droits minimaux prévus par la LNT.

CONDITIONS SUPPLÉMENTAIRES
La présente offre est conditionnelle à :
  • La vérification de votre admissibilité à travailler au Canada
  • La signature de l'Accord de confidentialité et de propriété intellectuelle de l'Employeur
  • La réussite d'une vérification des références (le cas échéant)

LANGUE DE TRAVAIL
Conformément à la Charte de la langue française, RLRQ, c. C-11, l'Employeur reconnaît votre droit de travailler en français. Tous les documents liés à votre emploi vous seront remis en français sur demande.

NORMES APPLICABLES
La présente offre est régie par la Loi sur les normes du travail, RLRQ c N-1.1. Aucune disposition de cette lettre ne peut réduire vos droits minimaux en vertu de la LNT.

Veuillez confirmer votre acceptation en signant et en retournant une copie de cette lettre à ${form.manager} dans les cinq (5) jours ouvrables suivant la date des présentes.

Cordialement,

_______________________________
${form.manager}
${form.companyName}
Date : ________________________


─────────────────────────────────────────────────────────────
ACCEPTATION DE L'OFFRE

Je soussigné(e), ${form.employeeName}, accepte l'offre d'emploi à titre de ${form.jobTitle} au sein de ${form.companyName} aux conditions énoncées dans la présente lettre.

Signature : ___________________    Date : ________________________
Nom en lettres moulées : ${form.employeeName}`;
}

function genRemoteWorkPolicy(form) {
  return `REMOTE WORK POLICY

Organization:   ${form.companyName}
Jurisdiction:   ${form.jurisdiction}
Effective date: ${form.startDate || today()}
Approved by:    ${form.manager}

1. PURPOSE
This policy establishes expectations and requirements for remote work arrangements at ${form.companyName}. It applies to all employees who work from a location other than the designated Company office, whether on a full-time, part-time, or occasional basis.

2. ELIGIBILITY
Remote work may be available to employees whose role and performance permit it, at the discretion of their manager and subject to operational requirements. Remote work is not a universal entitlement and does not alter the terms of the Employee's Employment Agreement.

3. WORKSPACE AND HEALTH & SAFETY
Employees working remotely are responsible for:
  a) Maintaining a safe, ergonomic, and distraction-minimized workspace;
  b) Ensuring their home workspace meets the requirements of applicable occupational health and safety legislation in ${form.jurisdiction};
  c) Reporting any work-related injuries occurring in the home workspace to the Company immediately. Such injuries may be covered by WSIB/WCB where applicable.

4. EQUIPMENT AND TECHNOLOGY
  a) The Company will provide [list equipment — e.g. laptop, required software licences].
  b) Employees are responsible for a reliable internet connection. The Company will reimburse up to $[X]/month upon receipt submission.
  c) Company equipment must be used for business purposes only and returned in good condition upon termination.

5. HOURS OF WORK AND AVAILABILITY
  a) Remote employees must be reachable and responsive during their standard working hours.
  b) Hours of work remain subject to the ${actName(form.jurisdiction)}. Overtime requires prior written manager approval.
  c) Attendance at scheduled meetings (in-person or virtual) is required.

6. DATA SECURITY
  a) Employees must use the Company's VPN and approved cloud services for all work-related data.
  b) Confidential information must not be stored on personal devices or accessed via unsecured networks.
  c) Any suspected data security incident must be reported to IT immediately.

7. EXPENSES
Pre-approved, reasonable business expenses incurred while working remotely will be reimbursed per the Company's Expense Policy.

8. MODIFICATION OR CANCELLATION
The Company may modify, suspend, or cancel remote work arrangements at any time, with reasonable notice, based on business requirements.

─────────────────────────────────────────────────────────────
EMPLOYEE ACKNOWLEDGEMENT

By signing below, the Employee confirms they have read, understood, and agree to comply with this Remote Work Policy.

Employee: ${form.employeeName}    Title: ${form.jobTitle}
Signature: ____________________    Date: ________________________`;
}

function genVacationLeavePolicy(form) {
  const isON = form.jurisdiction === "Ontario";
  const isQC = form.jurisdiction === "Quebec";
  return `VACATION AND LEAVE POLICY

Organization:   ${form.companyName}
Jurisdiction:   ${form.jurisdiction}
Effective date: ${form.startDate || today()}
Policy owner:   ${form.manager}

1. ANNUAL VACATION ENTITLEMENT
Employees accrue paid vacation based on length of service, at minimum as required by the ${actName(form.jurisdiction)}:

  Less than 1 year of service:   Pro-rata accrual (min. 4% vacation pay on gross wages)
  1–4 years of service:          2 weeks per year (4% of gross wages)
  5+ years of service:           3 weeks per year (6% of gross wages)
${isON ? "  8+ years of service (Ontario): Refer to ESA, 2000, ss. 33–35.2 for entitlements\n" : ""}
Company policy may exceed these statutory minimums. Refer to your Employment Agreement for your specific entitlement.

2. VACATION SCHEDULING
  a) Vacation requests of one (1) week or more require at least two (2) weeks' advance notice.
  b) The Company will make reasonable efforts to accommodate preferences, subject to operational requirements.
  c) Carry-over of unused vacation is permitted up to a maximum of [X] days per calendar year, unless otherwise prohibited by the ${actName(form.jurisdiction)}.
  d) The Employer may direct an Employee to take vacation at a specified time in accordance with the ${actName(form.jurisdiction)}.

3. VACATION PAY
  a) Vacation pay is calculated as a percentage of gross wages earned during the relevant period.
  b) Vacation pay is paid during the vacation period in the same manner as regular wages.
  c) Upon termination for any reason, accrued and unpaid vacation pay shall be included in the Employee's final pay as required by the ${actName(form.jurisdiction)}.

4. SICK LEAVE AND PERSONAL EMERGENCY LEAVE
${isON ? "  Ontario: Employees are entitled to 3 paid sick leave days and up to 10 personal emergency leave days per calendar year under the ESA, 2000, Part XIV." : isQC ? "  Quebec: Under the Act Respecting Labour Standards, employees are entitled to 2 paid sick days after 3 months of service, increasing to 3 paid days and additional unpaid leave thereafter." : `  ${form.jurisdiction}: Refer to the ${actName(form.jurisdiction)} for current statutory sick and personal leave entitlements.`}
  The Company may request reasonable documentation of illness for absences exceeding three (3) consecutive days.

5. STATUTORY HOLIDAYS
Employees are entitled to all public statutory holidays in ${form.jurisdiction} with pay, in accordance with the ${actName(form.jurisdiction)}. Employees required to work on a statutory holiday receive premium pay or a substitute day off, as permitted by applicable law.

6. OTHER STATUTORY LEAVES
The following leaves are available without loss of seniority, as required by the ${actName(form.jurisdiction)}:
  • Pregnancy and parental leave
  • Family medical leave
  • Bereavement leave
  • Jury duty
  • Domestic violence leave${isON ? "\n  • Critical illness leave\n  • Child death leave" : ""}
  • Reservist leave (where applicable)

7. UNPAID PERSONAL LEAVE
Employees may apply for unpaid personal leave with written approval from their manager and HR. Approval is at the Company's discretion and subject to operational requirements.

─────────────────────────────────────────────────────────────
EMPLOYEE ACKNOWLEDGEMENT

Employee: ${form.employeeName}    Title: ${form.jobTitle}
Signature: ____________________    Date: ________________________`;
}

function genCodeOfConduct(form) {
  return `CODE OF CONDUCT

Organization: ${form.companyName}
Jurisdiction:  ${form.jurisdiction}
Effective date: ${form.startDate || today()}
Approved by:   ${form.manager}

1. PURPOSE
${form.companyName} is committed to maintaining a professional, respectful, and ethical workplace. This Code of Conduct sets the minimum standards of behaviour expected of all employees, contractors, and representatives of the Company.

2. PROFESSIONAL CONDUCT
All employees are expected to:
  a) Act with integrity, honesty, and professionalism in all dealings with colleagues, clients, and the public;
  b) Treat every person with dignity and respect, free from discrimination and harassment;
  c) Represent the Company's interests faithfully and disclose any conflict of interest;
  d) Comply with all applicable laws and regulations at all times.

3. CONFLICTS OF INTEREST
Employees must disclose any actual or potential conflict of interest to their manager or HR in writing. A conflict of interest arises when a personal, financial, or professional relationship could impair the Employee's judgment or ability to act in the Company's best interests.

4. PROTECTION OF COMPANY ASSETS
  a) Company property, systems, and information must be used for legitimate business purposes only.
  b) Theft, misuse, or unauthorized disclosure of Company assets constitutes grounds for immediate termination for cause.
  c) Confidential information about the Company, clients, and employees must not be shared outside the organization.

5. USE OF TECHNOLOGY
  a) Company-issued devices and networks are primarily for business use. Reasonable incidental personal use is permitted, provided it does not interfere with work.
  b) Employees must not use Company systems to access, share, or store offensive, illegal, or inappropriate content.
  c) Employees must comply with the Company's information security and data handling policies at all times.

6. SOCIAL MEDIA AND PUBLIC STATEMENTS
Employees must not make public statements, posts, or comments — including on personal social media — that could reasonably harm the reputation of ${form.companyName}, its clients, or fellow employees.

7. PRIVACY
Employees must handle all personal information in accordance with the Personal Information Protection and Electronic Documents Act (PIPEDA) and any applicable provincial privacy legislation.

8. REPORTING VIOLATIONS
Employees are encouraged to report suspected violations of this Code to their manager, HR, or through the Company's confidential reporting channel. Retaliation against any person who reports a concern in good faith is strictly prohibited.

9. DISCIPLINARY ACTION
Violations of this Code may result in disciplinary action up to and including termination for cause, without notice or pay in lieu.

─────────────────────────────────────────────────────────────
EMPLOYEE ACKNOWLEDGEMENT

By signing below, the Employee confirms they have read, understood, and agree to comply with this Code of Conduct.

Employee: ${form.employeeName}    Title: ${form.jobTitle}
Signature: ____________________    Date: ________________________`;
}

function genAntiHarassment(form) {
  const isON = form.jurisdiction === "Ontario";
  return `WORKPLACE ANTI-HARASSMENT AND ANTI-DISCRIMINATION POLICY

Organization: ${form.companyName}
Jurisdiction:  ${form.jurisdiction}
Effective date: ${form.startDate || today()}
Policy owner:  ${form.manager}

1. PURPOSE AND SCOPE
${form.companyName} is committed to providing a safe, inclusive, and respectful workplace free from harassment, discrimination, and workplace violence. This policy applies to all employees, managers, contractors, clients, and visitors in any Company workplace or work-related setting, including virtual environments.

2. LEGAL FRAMEWORK
This policy is established in compliance with:
  • The ${act(form.jurisdiction)} (workplace harassment/violence provisions)
  • The Canadian Human Rights Act, R.S.C. 1985, c. H-6 (for federally regulated workplaces)
${isON ? "  • The Ontario Human Rights Code, R.S.O. 1990, c. H.19\n  • Ontario ESA, 2000: Workplace Violence and Harassment provisions (ss. 32.0.1–32.0.8)" : `  • The ${form.jurisdiction} Human Rights legislation`}

3. PROHIBITED CONDUCT
The following conduct is strictly prohibited:
  a) Workplace harassment — any vexatious comment or conduct that is known or reasonably ought to be known to be unwelcome.
  b) Sexual harassment — unwelcome conduct of a sexual nature, including sexual advances, requests for favours, or gender-based harassment.
  c) Discrimination — adverse treatment based on any ground protected by human rights legislation, including race, ancestry, colour, place of origin, ethnic origin, citizenship, creed, sex, sexual orientation, gender identity or expression, age, marital status, family status, or disability.
  d) Workplace violence — exercise of, or threat of, physical force against a worker.

4. RESPONSIBILITIES
  a) All employees: Conduct themselves in accordance with this policy; report incidents they experience or witness.
  b) Managers and supervisors: Respond to complaints promptly; maintain confidentiality; do not retaliate against complainants.
  c) The Company: Investigate all complaints thoroughly, fairly, and impartially.

5. REPORTING PROCEDURE
Step 1: If safe to do so, inform the person that their conduct is unwelcome and ask them to stop.
Step 2: Report the incident in writing to your manager, HR, or [designated confidential contact].
Step 3: Preserve any documentation (emails, messages, notes with dates and witnesses).

All reports will be treated with the highest degree of confidentiality possible.

6. INVESTIGATION PROCESS
  a) The Company will conduct a prompt, impartial, and thorough investigation.
  b) Both the complainant and the respondent will have the opportunity to present their account.
  c) Investigations will be completed within 30–45 business days where reasonably practicable.
  d) The outcome will be communicated to both parties, subject to confidentiality obligations.

7. CONSEQUENCES
If a complaint is substantiated, disciplinary measures may include: verbal or written warning, suspension, mandatory training, or termination for cause.

8. NON-RETALIATION
Retaliation against any person who, in good faith, reports harassment, participates in an investigation, or exercises rights under this policy is strictly prohibited and constitutes a separate violation.

─────────────────────────────────────────────────────────────
EMPLOYEE ACKNOWLEDGEMENT

Employee: ${form.employeeName}    Title: ${form.jobTitle}
Signature: ____________________    Date: ________________________`;
}

function genResignationAcceptance(form) {
  return `${today()}

Dear ${form.employeeName},

On behalf of ${form.companyName}, I am writing to formally acknowledge and accept your resignation from the position of ${form.jobTitle}, effective [last day of employment].

1. LAST DAY OF EMPLOYMENT
Your last day of active employment with ${form.companyName} will be [insert last working day]. [In accordance with your Employment Agreement / applicable notice provisions, your [notice period is being worked / notice period is being waived].]

2. TRANSITION
We ask that you work with your manager, ${form.manager}, during your remaining time to ensure an orderly handover, including:
  • Documenting the status of current projects
  • Transferring files, credentials, and client contact information to your designated successor
  • Completing any outstanding deliverables as agreed with ${form.manager}

3. FINAL PAY
Your final pay will be processed on [date / next regular pay cycle] and will include:
  • All wages earned to your last day of active employment
  • Accrued and unused vacation pay, calculated in accordance with the ${actName(form.jurisdiction)}
  • Any outstanding approved expense reimbursements

Your Record of Employment (ROE) will be submitted to Service Canada within the timeframe required by law.

4. BENEFITS
Group benefits coverage will cease on [last day of employment / end of the month of termination]. You may have conversion rights — contact [HR / benefits administrator] for details before your last day.

5. COMPANY PROPERTY
Please return all Company property by [date], including:
  • Laptop, peripherals, and equipment
  • Access cards, keys, and security badges
  • Any confidential files, documents, or materials in your possession
  System access will be deactivated on your last working day.

6. ONGOING OBLIGATIONS
Your obligations of confidentiality and non-solicitation under your Employment Agreement and Company policies remain in full force and effect following your resignation.

7. REFERENCE
${form.companyName} is pleased to provide you with a reference confirming your dates of employment and position title. Please direct reference requests to [HR contact].

We sincerely thank you for your contributions to ${form.companyName} and wish you every success in your next chapter.

Yours sincerely,

_______________________________
${form.manager}
${form.companyName}
Date: ${today()}`;
}

function genLayoffNotice(form) {
  const isON = form.jurisdiction === "Ontario";
  return `${today()}

NOTICE OF LAYOFF / GROUP TERMINATION

PRIVATE AND CONFIDENTIAL

Dear ${form.employeeName},

${form.companyName} (the "Company") regrets to inform you that your position of ${form.jobTitle} is being eliminated due to [economic conditions / business restructuring / reduction in force]. This decision was not made lightly and is not a reflection of your individual performance.

1. EFFECTIVE DATE
Your employment will be terminated effective [termination date].
  ☐ This constitutes a permanent termination of employment.
  ☐ This constitutes a temporary layoff (subject to recall within the period permitted by the ${actName(form.jurisdiction)}).

2. STATUTORY NOTICE / PAY IN LIEU
In accordance with the ${act(form.jurisdiction)}, your entitlements are:
  Length of service:          [X years/months]
  Statutory notice period:    [X week(s)]
  Notice delivery method:
    ☐ Working notice (last active day: [date])
    ☐ Pay in lieu of notice: $____________
    ☐ Combination: [X weeks working] + [Y weeks pay in lieu]

3. SEVERANCE PAY (if applicable)
${isON ? `Under the ESA, 2000 (ss. 64–65), severance pay applies if the payroll of the Company is $2.5M+ and the Employee has 5+ years of service, OR this layoff is a mass termination affecting 50+ employees.
  Severance calculation: [X completed years of service] × [weekly wages] = $____________` : `Refer to the ${actName(form.jurisdiction)} for severance pay requirements applicable to this termination.`}

4. GROUP TERMINATION (if applicable)
${isON ? `This layoff affects [number] employees within a [4]-week period. The Company has notified / will notify the Director of Employment Standards as required by Part XV of the ESA, 2000, s. 58.` : `This layoff may trigger group termination notice requirements under the ${actName(form.jurisdiction)}. The Company will comply with all applicable obligations.`}

5. FINAL PAY
Your final payment will include:
  • All wages earned to the last day of active employment
  • Accrued, unpaid vacation pay (minimum ${form.jurisdiction === "Quebec" ? "4% of gross wages" : "as required by the " + actName(form.jurisdiction)})
  • Pay in lieu of notice (if applicable): $____________
  • Severance pay (if applicable): $____________
  • Less all required statutory deductions (income tax, CPP, EI)

6. BENEFITS
Group benefits coverage will cease on [last day of employment / end of the notice period]. You may have conversion rights — contact [HR / benefits administrator] for information before your last day.

7. RECORD OF EMPLOYMENT
Your ROE will be submitted to Service Canada within five (5) calendar days of your last day of employment.

8. SEPARATION AGREEMENT
In exchange for an enhanced separation payment of $____________ above your statutory entitlements, the Company is offering the attached Separation Agreement and Release. You are strongly encouraged to seek independent legal advice before signing. You have [21] days to review this offer, which remains open until [date].

9. OUTPLACEMENT ASSISTANCE
The Company [will / will not] provide outplacement support. [If applicable: Details will be communicated separately.]

We regret the impact this decision has on you and are committed to treating you with respect and dignity throughout this process.

Yours sincerely,

_______________________________
${form.manager}
${form.companyName}
Date: ${today()}

─────────────────────────────────────────────────────────────
ACKNOWLEDGEMENT OF RECEIPT

I, ${form.employeeName}, acknowledge receipt of this Notice of Layoff on:

Signature: ____________________    Date: ________________________`;
}

function genPIP(form) {
  return `PERFORMANCE IMPROVEMENT PLAN (PIP)

Employee:          ${form.employeeName}
Job title:         ${form.jobTitle}
Manager:           ${form.manager}
PIP start date:    ${form.startDate || today()}
PIP review date:   ${form.reviewDate || "[Insert 30 / 60 / 90-day review date]"}
HR representative: [Name / Title]

1. PURPOSE
This Performance Improvement Plan ("PIP") is intended to help ${form.employeeName} meet the performance standards expected of the ${form.jobTitle} role at ${form.companyName}. The Company's goal is to support the Employee in achieving sustainable improvement. This PIP is not a guarantee of continued employment. Failure to meet the objectives set out below may result in further disciplinary action, up to and including termination in accordance with the ${actName(form.jurisdiction)}.

2. IDENTIFIED PERFORMANCE CONCERNS
The following performance gaps have been identified:

  Issue A: [Describe specific concern #1 — factual, objective, with examples]
    • Evidence: [Dates, incidents, output reviewed]
    • Required standard: [What is expected in this role]
    • Gap: [How current performance falls short]

  Issue B: [Describe specific concern #2]
    • Evidence: [Dates, incidents, output reviewed]
    • Required standard: [What is expected in this role]
    • Gap: [How current performance falls short]

3. PERFORMANCE OBJECTIVES
The Employee is required to achieve the following measurable outcomes by the review date of ${form.reviewDate || "[review date]"}:

${form.performanceGoals ||
`  Objective 1: [Specific, measurable goal]
    Success metric: [How it will be assessed — e.g. manager review, KPI, output quality]
    Target date: [Date]

  Objective 2: [Specific, measurable goal]
    Success metric: [How it will be assessed]
    Target date: [Date]

  Objective 3: [Specific, measurable goal]
    Success metric: [How it will be assessed]
    Target date: [Date]`}

4. SUPPORT PROVIDED
The Company will provide the following support during the PIP period:
  • Weekly one-on-one check-ins with ${form.manager}
  • [Additional training, coaching, tools, or resources as applicable]
  • Access to the Company's Employee Assistance Program (EAP)
  • Clear, timely feedback at each check-in

5. CHECK-IN SCHEDULE
  Week 1:          Kick-off meeting — confirm objectives and support plan
  Week 2:          Progress check-in
  Week 4:          Formal mid-point review — document status in writing
  Final review:    ${form.reviewDate || "[Review date]"} — formal PIP conclusion meeting with HR present

6. POSSIBLE OUTCOMES
At the conclusion of the PIP review period, one of the following outcomes will apply:
  ☐ Objectives fully met — Employee is removed from PIP. Performance will continue to be monitored.
  ☐ Meaningful progress — PIP extended by [X weeks] with revised or additional objectives.
  ☐ Objectives not met — Further disciplinary action, which may include termination of employment in accordance with the ${actName(form.jurisdiction)}.

7. RIGHT TO RESPOND
The Employee has five (5) business days from the date of this PIP to provide a written response. That response will be placed on file alongside this document.

─────────────────────────────────────────────────────────────
ACKNOWLEDGEMENTS

I acknowledge that I have received, read, and understand this Performance Improvement Plan. My signature does not necessarily indicate agreement with its contents. I understand my right to respond in writing.

Employee (${form.employeeName}): ____________________    Date: ________________________
Manager (${form.manager}): ____________________    Date: ________________________
HR Representative: ____________________    Date: ________________________`;
}

function genEmployeeHandbook(form) {
  return `EMPLOYEE HANDBOOK

${form.companyName}
${form.jurisdiction} | Effective: ${form.startDate || today()}

─────────────────────────────────────────────────────────────
WELCOME

Welcome to ${form.companyName}. This handbook outlines the policies, standards, and expectations that guide our workplace. Please read it carefully and keep a copy for reference. Questions may be directed to ${form.manager} or HR at any time.

─────────────────────────────────────────────────────────────
SECTION 1 — EMPLOYMENT POLICIES

1.1 Equal Opportunity
${form.companyName} is an equal opportunity employer. We do not discriminate on the basis of race, ancestry, colour, place of origin, ethnic origin, citizenship, creed, sex, sexual orientation, gender identity or expression, age, marital status, family status, disability, or any other protected ground under applicable human rights legislation.

1.2 Employment Standards
All employment at ${form.companyName} meets or exceeds the minimum standards of the ${act(form.jurisdiction)}.

1.3 Probationary Period
New employees complete a three (3) month probationary period. During probation, either party may end employment with one (1) week's written notice.

─────────────────────────────────────────────────────────────
SECTION 2 — HOURS OF WORK AND COMPENSATION

2.1 Standard Hours
Standard hours are 37.5–40 hours per week, Monday to Friday. Overtime must be pre-approved and will be compensated in accordance with the ${actName(form.jurisdiction)}.

2.2 Pay Schedule
Employees are paid bi-weekly by direct deposit.

2.3 Statutory Holidays
Employees are entitled to all statutory public holidays in ${form.jurisdiction} with pay.

─────────────────────────────────────────────────────────────
SECTION 3 — VACATION AND LEAVES OF ABSENCE

3.1 Vacation
Employees accrue paid vacation at a minimum of 4% of gross wages. Refer to the Vacation and Leave Policy for full details.

3.2 Sick and Emergency Leave
Refer to the Vacation and Leave Policy and the ${actName(form.jurisdiction)} for current statutory entitlements.

3.3 Pregnancy, Parental, and Family Leaves
All leaves required by the ${actName(form.jurisdiction)} are available without loss of seniority.

─────────────────────────────────────────────────────────────
SECTION 4 — WORKPLACE CONDUCT

4.1 Code of Conduct
All employees must act with integrity, professionalism, and respect. See the Code of Conduct for full requirements.

4.2 Harassment and Discrimination
${form.companyName} maintains a zero-tolerance policy for harassment and discrimination. See the Anti-Harassment Policy.

4.3 Conflict of Interest
Employees must disclose any conflicts of interest to their manager or HR in writing.

─────────────────────────────────────────────────────────────
SECTION 5 — TECHNOLOGY AND PRIVACY

5.1 Acceptable Use
Company technology is provided for business use. Employees have no expectation of privacy on Company systems.

5.2 Data Privacy
The Company handles personal information in compliance with PIPEDA and applicable provincial privacy legislation.

─────────────────────────────────────────────────────────────
SECTION 6 — HEALTH AND SAFETY

${form.companyName} is committed to a safe and healthy workplace in compliance with all applicable occupational health and safety legislation in ${form.jurisdiction}. All employees must report hazards, near-misses, and injuries immediately.

─────────────────────────────────────────────────────────────
SECTION 7 — DISCIPLINE AND TERMINATION

7.1 Progressive Discipline
The Company generally follows progressive discipline: verbal warning → written warning → final written warning → termination. The Company reserves the right to terminate for cause without notice in appropriate circumstances.

7.2 Termination
Employment may be terminated with statutory notice as required by the ${actName(form.jurisdiction)}, or immediately for cause where permitted.

─────────────────────────────────────────────────────────────
EMPLOYEE ACKNOWLEDGEMENT

By signing below, I confirm that I have received, read, and understood this Employee Handbook and agree to comply with its provisions.

Employee: ${form.employeeName}    Title: ${form.jobTitle}
Signature: ____________________    Date: ________________________`;
}

// ─── Wellness / Ring 2 template generators ───────────────────────────────────

function genAccommodationRequestForm(form) {
  return `${today()}

ACCOMMODATION REQUEST FORM
${form.companyName}
${form.jurisdiction}

─────────────────────────────────────────────────────────────
PART A — EMPLOYEE INFORMATION

Employee name:          ${form.employeeName}
Job title:              ${form.jobTitle}
Department / Manager:   ${form.manager}
Date of request:        ${today()}
Preferred contact:      ___________________________________

─────────────────────────────────────────────────────────────
PART B — NATURE OF ACCOMMODATION REQUEST

Protected ground disclosed (check all that apply):
  □ Disability (physical)            □ Disability (mental health)
  □ Family status                    □ Religion / Creed
  □ Pregnancy / Parental status      □ Other: _______________

Description of limitation or barrier requiring accommodation:
________________________________________________________________________
________________________________________________________________________
________________________________________________________________________

Specific accommodation requested by employee:
________________________________________________________________________
________________________________________________________________________

Requested start date:   ___________________________________
Expected duration:      □ Temporary (approx. __________)
                        □ Permanent
                        □ Unknown / to be determined

─────────────────────────────────────────────────────────────
PART C — SUPPORTING DOCUMENTATION

  □ Medical documentation (functional limitations report) received
  □ Supporting statement or letter received
  □ Documentation requested — pending receipt (deadline: _______________)
  □ Employee declines to provide documentation (see notes)
  □ Documentation not required for this accommodation type

Name of healthcare provider / authorizing professional:
___________________________________

Documentation reviewed by: ___________________________________
Date reviewed:             ___________________________________

─────────────────────────────────────────────────────────────
PART D — INTERIM MEASURES

Pending full review of this request, the following interim measures
are in place effective ${today()}:
________________________________________________________________________
________________________________________________________________________

─────────────────────────────────────────────────────────────
PART E — EMPLOYER RESPONSE

  □ Accommodation approved as requested (see Accommodation Plan)
  □ Modified / alternative accommodation offered (see Accommodation Plan)
  □ Further information required (specify below)
  □ Request under review — legal or medical consultation in progress
  □ Request declined — undue hardship assessment completed (see attached)

Notes and rationale:
________________________________________________________________________
________________________________________________________________________

─────────────────────────────────────────────────────────────
PART F — NEXT STEPS AND REVIEW

Review date scheduled:              ___________________________________
HR / Legal counsel consulted:       □ Yes  □ No
Accommodation Plan to be completed: □ Yes  □ No  Target date: __________

─────────────────────────────────────────────────────────────
SIGNATURES

This form has been completed in accordance with the ${act(form.jurisdiction)}
and applicable human rights legislation.

Employee signature: ______________________  Date: ________________
Printed name: ${form.employeeName}

HR / Manager signature: __________________  Date: ________________
Printed name: ${form.manager}
Title: ___________________________________

─────────────────────────────────────────────────────────────
CONFIDENTIALITY NOTICE
This form and any attachments contain personal and potentially sensitive
health information. Store securely and share only with individuals who
have a legitimate need to know. Retain per your records management policy.`;
}

function genAccommodationPlan(form) {
  return `${today()}

WORKPLACE ACCOMMODATION PLAN
${form.companyName}
${form.jurisdiction}

This Accommodation Plan documents the measures agreed upon between
${form.companyName} (the "Employer") and ${form.employeeName} (the "Employee")
in accordance with the ${act(form.jurisdiction)} and applicable human rights
legislation.

─────────────────────────────────────────────────────────────
EMPLOYEE INFORMATION

Employee name:          ${form.employeeName}
Job title:              ${form.jobTitle}
Department / Manager:   ${form.manager}
Plan effective date:    ${today()}
Plan review date:       ___________________________________

─────────────────────────────────────────────────────────────
ACCOMMODATION MEASURES

The following accommodation measures have been agreed upon:

1. ________________________________________________________________________
   Implementation details: ________________________________________________

2. ________________________________________________________________________
   Implementation details: ________________________________________________

3. ________________________________________________________________________
   Implementation details: ________________________________________________

Additional measures (if any):
________________________________________________________________________

─────────────────────────────────────────────────────────────
EMPLOYER RESPONSIBILITIES

The Employer agrees to:
  □ Implement the accommodation measures listed above
  □ Maintain confidentiality of the Employee's medical / personal information
  □ Conduct a review of this plan on the date specified above
  □ Provide necessary equipment, technology, or workspace modifications
  □ Notify the Employee promptly if any measure cannot be maintained
  □ Other: ______________________________________________________________

─────────────────────────────────────────────────────────────
EMPLOYEE RESPONSIBILITIES

The Employee agrees to:
  □ Cooperate in the accommodation process and provide updates on limitations
  □ Provide updated medical / supporting documentation when requested
  □ Advise the Employer if the accommodation is no longer working or needed
  □ Attend scheduled review meetings
  □ Other: ______________________________________________________________

─────────────────────────────────────────────────────────────
REVIEW AND MODIFICATION

This plan will be reviewed on: ___________________________________

Either party may request a review sooner if circumstances change. Any
modification to this plan must be agreed upon in writing and signed by
both parties.

─────────────────────────────────────────────────────────────
ESCALATION

If a dispute arises regarding this plan, the parties agree to:
  □ Escalate to HR / senior management
  □ Request mediation through the applicable human rights commission
  □ Seek legal advice

─────────────────────────────────────────────────────────────
SIGNATURES

Both parties confirm this Accommodation Plan accurately reflects
the agreed measures and their understanding of their respective
obligations.

Employee: ${form.employeeName}
Signature: ______________________  Date: ________________

HR / Manager: ${form.manager}
Signature: ______________________  Date: ________________

Senior management (if required):
Signature: ______________________  Date: ________________

─────────────────────────────────────────────────────────────
CONFIDENTIALITY NOTICE
This plan is confidential. File in the employee's accommodation record,
separate from the general personnel file.`;
}

function genLeaveRequestForm(form) {
  return `${today()}

LEAVE OF ABSENCE REQUEST FORM
${form.companyName}
${form.jurisdiction}

─────────────────────────────────────────────────────────────
EMPLOYEE INFORMATION

Employee name:     ${form.employeeName}
Job title:         ${form.jobTitle}
Manager:           ${form.manager}
Date of request:   ${today()}

─────────────────────────────────────────────────────────────
TYPE OF LEAVE REQUESTED

  □ Medical / disability leave
  □ Maternity leave
  □ Parental leave (birth, adoption, or foster placement)
  □ Bereavement leave
  □ Family responsibility / caregiver leave
  □ Personal leave (unpaid)
  □ Jury duty / court appearance
  □ Reservist leave (Canadian Forces)
  □ Other: ___________________________________________________

─────────────────────────────────────────────────────────────
LEAVE DETAILS

Requested leave start date:   ___________________________________
Expected return-to-work date: ___________________________________
Total duration requested:     ___________________________________
Reason for leave (brief):     ___________________________________
  (Note: For medical leave, a functional limitations report is required.
   A diagnosis is not required and need not be disclosed.)

─────────────────────────────────────────────────────────────
PAY AND BENEFITS DURING LEAVE

  □ I understand this leave is unpaid / partially paid per company policy
  □ I intend to apply for Employment Insurance (EI) benefits
  □ I intend to apply for Quebec Parental Insurance Plan (QPIP) benefits
  □ My employment agreement provides for top-up pay (attached)
  □ I wish to continue group benefits during leave — contribution: _________

─────────────────────────────────────────────────────────────
SUPPORTING DOCUMENTATION

  □ Medical / functional limitations documentation attached
  □ Birth / adoption certificate (parental leave)
  □ Death certificate / obituary (bereavement)
  □ Legal / court documentation
  □ No documentation required for this leave type

─────────────────────────────────────────────────────────────
RETURN TO WORK

I understand I am required to provide reasonable advance notice of my
return-to-work date to ${form.manager} or HR.

In accordance with the ${actName(form.jurisdiction)}, I understand I am
entitled to return to the same or a comparable position upon expiry of
this leave, subject to applicable legislation.

─────────────────────────────────────────────────────────────
SIGNATURES

Employee: ${form.employeeName}
Signature: ______________________  Date: ________________

Manager / HR: ${form.manager}
Signature: ______________________  Date: ________________

Leave approved: □ Yes  □ No  □ Further information required

Notes: ________________________________________________________________________

─────────────────────────────────────────────────────────────
EMPLOYER NOTE
Applicable leave standards: ${act(form.jurisdiction)}.
This form does not limit any greater entitlement under applicable
employment standards or human rights legislation.`;
}

function genSickDayPolicy(form) {
  return `${today()}

SICK DAY AND MEDICAL LEAVE POLICY
${form.companyName}
${form.jurisdiction}

─────────────────────────────────────────────────────────────
1. PURPOSE

This policy establishes ${form.companyName}'s approach to sick days and
short-term medical leave, in compliance with the ${act(form.jurisdiction)}
and applicable human rights legislation.

─────────────────────────────────────────────────────────────
2. SCOPE

This policy applies to all employees of ${form.companyName} in
${form.jurisdiction}.

─────────────────────────────────────────────────────────────
3. STATUTORY MINIMUM ENTITLEMENTS

Employees are entitled to the following statutory minimum leave:

${form.jurisdiction === "Ontario"
  ? `Under the Employment Standards Act, 2000 (Ontario):
  • 3 days of unpaid sick leave per calendar year
  • Available after 2 weeks of employment
  • No medical certificate required for the first 3 days
  • Longer medical or personal emergency leave may apply under Part XIV of the ESA`
  : form.jurisdiction === "Quebec"
  ? `Under the Act Respecting Labour Standards (Quebec):
  • 2 days of paid sick leave per year (after 3 months of continuous service)
  • Up to 26 additional weeks of unpaid leave for serious illness
  • 10 days per year for family-related obligations (2 paid after 3 months)
  • Medical certificate may be required for absences of 3+ consecutive days`
  : form.jurisdiction === "Federal"
  ? `Under the Canada Labour Code:
  • 10 days of personal leave per calendar year
  • 3 days are paid after 3 months of continuous employment
  • Medical certificate may be required after 5+ consecutive days
  • Up to 17 weeks of unpaid medical leave may apply`
  : `Under applicable federal / provincial legislation:
  • Minimum sick leave entitlements vary by jurisdiction
  • Consult the applicable employment standards legislation for specific minimums
  • This policy provides at minimum the statutory entitlement`}

─────────────────────────────────────────────────────────────
4. COMPANY SICK DAY ENTITLEMENT

In addition to statutory minimums, ${form.companyName} provides:

  • ___ paid sick days per calendar year
  • Available after ___ months of continuous employment
  • Unused sick days:  □ Carry over  □ Do not carry over  □ Paid out
  • Sick days are not intended for mental health days, vacation, or personal
    leave (separate policies apply)

─────────────────────────────────────────────────────────────
5. REPORTING REQUIREMENTS

  a) Employees must notify their manager (${form.manager} or designate) as
     early as possible — no later than ___ hour(s) before their scheduled
     start time.
  b) Notification method: □ Phone  □ Email  □ HR system  □ Any method
  c) For absences of ___ or more consecutive days, a medical / functional
     limitations note from a healthcare provider may be requested.
  d) ${form.companyName} will not request a diagnosis. Documentation should
     confirm inability to work and expected return date.

─────────────────────────────────────────────────────────────
6. PAY DURING SICK LEAVE

  • Paid sick days are paid at the employee's regular rate of pay
  • For absences beyond the paid entitlement, leave is unpaid unless:
    — The employee has short-term disability (STD) coverage
    — Employment Insurance sickness benefits apply (up to 15 weeks)
    — A top-up arrangement is in place under the employment agreement
  • Employees are encouraged to apply for EI sickness benefits during
    extended unpaid medical leave. ${form.companyName} will issue a Record
    of Employment promptly upon request.

─────────────────────────────────────────────────────────────
7. ATTENDANCE MANAGEMENT

${form.companyName} will manage attendance patterns in a non-discriminatory
manner that respects the duty to accommodate under human rights legislation.

  • Attendance concerns will be addressed through dialogue, not discipline,
    where absences are related to a protected ground (e.g., disability)
  • Progressive attendance management may apply to non-protected absences
    after consistent patterns are documented
  • Any adverse employment action related to illness requires legal review

─────────────────────────────────────────────────────────────
8. RETURN TO WORK

  • Employees returning after 5+ consecutive days may be required to provide
    clearance from a healthcare provider confirming fitness to return
  • For employees returning from extended medical leave, ${form.companyName}
    will assess accommodation needs prior to the return date
  • Gradual return-to-work arrangements may be offered subject to
    operational requirements and the duty to accommodate

─────────────────────────────────────────────────────────────
9. CONFIDENTIALITY

All medical information collected in connection with this policy is
confidential. It will be stored separately from the general personnel
file and accessed only by individuals with a legitimate need to know.

─────────────────────────────────────────────────────────────
10. GOVERNING LEGISLATION

This policy is governed by and subject to the ${act(form.jurisdiction)},
applicable human rights legislation, and the employee's employment agreement.
Where this policy provides a lesser entitlement than applicable legislation,
the legislation prevails.

─────────────────────────────────────────────────────────────
ACKNOWLEDGEMENT

Employee: ${form.employeeName}     Title: ${form.jobTitle}
Signature: ____________________    Date: ________________________`;
}

// ─── Wellness / Ring 2 — additional template generators ──────────────────────

function genReturnToWorkPlanMentalHealth(form) {
  return `${today()}

RETURN-TO-WORK PLAN — MENTAL HEALTH LEAVE
${form.companyName}
${form.jurisdiction}

CONFIDENTIAL — Mental health accommodation document.
Store separately from the general personnel file.

─────────────────────────────────────────────────────────────
EMPLOYEE INFORMATION

Employee name:        ${form.employeeName}
Job title:            ${form.jobTitle}
Department:           ___________________________________
Manager:              ${form.manager}
Leave start date:     ___________________________________
Anticipated RTW date: ___________________________________
Plan prepared by:     ___________________________________
Plan date:            ${today()}

─────────────────────────────────────────────────────────────
PART A — MEDICAL RESTRICTIONS AND FUNCTIONAL LIMITATIONS

The following functional limitations and restrictions have been
documented by the employee's treating healthcare provider:

  Limitations:  ___________________________________________
  Restrictions: ___________________________________________
  Expected duration: □ Temporary (approx. _______)  □ Ongoing

Note: A diagnosis is not required and must not be recorded here.
This section reflects only functional limitations relevant to
the employee's ability to perform their duties.

─────────────────────────────────────────────────────────────
PART B — MODIFIED DUTIES

During the return-to-work period, ${form.employeeName}'s duties
will be modified as follows:

Week 1–2:
  □ Reduced hours: _______ hours/day   □ Full hours
  Duties: _______________________________________________

Week 3–4:
  □ Reduced hours: _______ hours/day   □ Full hours
  Duties: _______________________________________________

Week 5+:
  □ Full duties and hours resumed
  □ Continued modified arrangement — specify: _______________

─────────────────────────────────────────────────────────────
PART C — SCHEDULE AND WORKING ARRANGEMENTS

Work location:    □ Office    □ Remote    □ Hybrid
Working hours:    ___________________________________________
Days of work:     ___________________________________________
Start/end times:  ___________________________________________

Special arrangements (e.g., quiet workspace, reduced meetings):
___________________________________________________________

─────────────────────────────────────────────────────────────
PART D — SUPPORT RESOURCES

EAP access confirmed:       □ Yes — Access #: _______________
Occupational health:        □ Referred    □ Not required
Healthcare provider has approved this plan:  □ Yes   □ No

Additional supports in place:
___________________________________________________________

─────────────────────────────────────────────────────────────
PART E — MANAGER CHECK-IN CADENCE

  Week 1:    Date: _____________  Format: □ In-person  □ Virtual
  Week 2:    Date: _____________  Format: □ In-person  □ Virtual
  Week 4:    Date: _____________  Format: □ In-person  □ Virtual
  Monthly thereafter until full duties resumed.

Check-ins must focus on well-being and plan progress, not
performance. Performance discussions resume after stabilization.

─────────────────────────────────────────────────────────────
PART F — REVIEW DATE AND EXIT CRITERIA

Plan review date:  ___________________________________

This plan will be considered complete when:
  □ Employee has returned to full duties and hours
  □ Employee and manager agree the plan is no longer needed
  □ Healthcare provider has cleared full return to work

─────────────────────────────────────────────────────────────
APPLICABLE LEGISLATION

This plan is established in accordance with the ${act(form.jurisdiction)}
and applicable human rights legislation, including the employer's
duty to accommodate mental health disability to the point of
undue hardship.

─────────────────────────────────────────────────────────────
SIGNATURES

Employee (${form.employeeName}):
Signature: ______________________  Date: ________________

Manager (${form.manager}):
Signature: ______________________  Date: ________________

HR Representative:
Signature: ______________________  Date: ________________

─────────────────────────────────────────────────────────────
CONFIDENTIALITY NOTICE
This document is strictly confidential. File in the employee's
accommodation record, separate from the general personnel file.
Share only with individuals who have a legitimate need to know.`;
}

function genRespectfulWorkplacePolicy(form) {
  const isON = form.jurisdiction === "Ontario";
  const isQC = form.jurisdiction === "Quebec";
  return `${today()}

RESPECTFUL WORKPLACE POLICY
${form.companyName}
${form.jurisdiction}
Effective date: ${form.startDate || today()}
Policy owner:   ${form.manager}

─────────────────────────────────────────────────────────────
1. PURPOSE

${form.companyName} is committed to fostering a respectful,
inclusive, and psychologically safe workplace for all employees,
contractors, clients, and visitors. This policy establishes the
standards of conduct expected and the processes for addressing
violations.

─────────────────────────────────────────────────────────────
2. SCOPE

This policy applies to all persons who work for or represent
${form.companyName}, in all workplaces and work-related settings,
including virtual and off-site environments.

─────────────────────────────────────────────────────────────
3. LEGAL FRAMEWORK

This policy is established in compliance with:
  • ${act(form.jurisdiction)}
${isON
? `  • Ontario Human Rights Code, R.S.O. 1990, c. H.19
  • Occupational Health and Safety Act (OHSA), R.S.O. 1990, c. O.1
    ss. 32.0.1–32.0.8 (Workplace Harassment and Violence Prevention)`
: isQC
? `  • Charter of Human Rights and Freedoms, CQLR c C-12
  • Act Respecting Labour Standards (ARLS), CQLR c N-1.1
    ss. 81.18–81.20 (Psychological Harassment)`
: `  • Canadian Human Rights Act, R.S.C. 1985, c. H-6
  • Canada Labour Code, Part II — Workplace Health and Safety
  • Work Place Harassment and Violence Prevention Regulations,
    SOR/2020-130`}

─────────────────────────────────────────────────────────────
4. PROHIBITED CONDUCT

The following conduct is strictly prohibited:

4.1 Harassment
Any vexatious comment or conduct directed at a worker that is
known or ought reasonably to be known to be unwelcome, including:
  • Personal attacks, ridicule, or humiliation
  • Persistent criticism unrelated to legitimate work feedback
  • Exclusion or isolation from workplace activities
  • Spreading malicious rumours or misinformation

4.2 Sexual Harassment
Unwelcome conduct of a sexual nature, including:
  • Unwanted touching, advances, or comments of a sexual nature
  • Requests for sexual favours, with or without implied benefit
  • Gender-based taunting, jokes, or demeaning remarks

4.3 Discrimination
Treating a person adversely on the basis of a protected ground
under applicable human rights legislation, including race,
ancestry, colour, place of origin, ethnic origin, citizenship,
creed, sex, sexual orientation, gender identity or expression,
age, marital status, family status, disability, or any other
protected characteristic.

4.4 Workplace Violence
  • The exercise of, or threat to exercise, physical force
  • Verbal threats causing reasonable belief of physical harm
  • Conduct a reasonable person would interpret as a risk of
    physical injury

4.5 Psychological Harassment
${isQC
? `As defined under the ARLS: any vexatious behaviour in the form
of repeated and hostile or unwanted conduct, verbal comments,
actions, or gestures, that affect an employee's dignity or
psychological integrity and that result in a harmful work
environment.`
: `Any repeated, hostile, or unwanted conduct that harms the
psychological health of another person, including bullying,
intimidation, and persistent demeaning treatment.`}

─────────────────────────────────────────────────────────────
5. RESPONSIBILITIES

5.1 All employees
  • Conduct themselves in accordance with this policy
  • Report incidents they experience or witness
  • Cooperate in any investigation

5.2 Managers and supervisors
  • Model respectful workplace behaviour at all times
  • Address policy violations promptly, regardless of seniority
  • Maintain confidentiality and avoid retaliation

5.3 The Employer
  • Investigate all formal complaints thoroughly and impartially
  • Maintain a confidential reporting channel
  • Take appropriate corrective action promptly

─────────────────────────────────────────────────────────────
6. REPORTING PROCEDURE

Step 1 — Informal resolution (if safe to do so)
If the conduct is not serious or is a single incident, the
affected person may advise the other party directly that their
conduct is unwelcome.

Step 2 — Formal report
Submit a written report to HR or ${form.manager} (or to the
designated confidential contact if the manager is the respondent).
Include: description of conduct, date(s), location, witnesses.

Step 3 — Preserve evidence
Retain copies of relevant written communications (emails,
messages, notes) in a secure personal location.

Reports may be made anonymously to the extent possible.
Anonymous reports may limit the scope of investigation.

─────────────────────────────────────────────────────────────
7. INVESTIGATION PROCESS

  a) The Company will acknowledge receipt within 5 business days.
  b) An impartial investigator (internal or external) will be
     assigned.
  c) Both parties will be interviewed and given the opportunity
     to present their account and relevant information.
  d) Investigation will be completed within 45 business days
     where reasonably practicable.
  e) Findings will be communicated to both parties, subject to
     confidentiality obligations.
  f) If the complaint is substantiated, corrective action will
     be implemented promptly.

─────────────────────────────────────────────────────────────
8. CONFIDENTIALITY

All participants in a complaint or investigation must maintain
confidentiality to the extent possible. Information may be
shared only as required to conduct a thorough investigation
or comply with legal obligations.

─────────────────────────────────────────────────────────────
9. CONSEQUENCES

If a complaint is substantiated, disciplinary action may include:
  • Written warning
  • Mandatory training or coaching
  • Suspension with or without pay
  • Termination of employment for cause
  • Referral to applicable regulatory authority

─────────────────────────────────────────────────────────────
10. NON-RETALIATION

Retaliation against any person who, in good faith, reports
harassment, participates in an investigation, or exercises
rights under this policy is strictly prohibited and constitutes
a separate, serious violation.

─────────────────────────────────────────────────────────────
11. REVIEW

This policy will be reviewed annually and updated as required
to reflect changes in applicable legislation or organizational
needs.

─────────────────────────────────────────────────────────────
EMPLOYEE ACKNOWLEDGEMENT

Employee: ${form.employeeName}    Title: ${form.jobTitle}
Signature: ____________________    Date: ________________________`;
}

function genWellnessActionPlan(form) {
  return `${today()}

INDIVIDUAL WELLNESS ACTION PLAN
${form.companyName}
${form.jurisdiction}

This Wellness Action Plan is developed collaboratively between
the employee and their manager. It is a voluntary, confidential
document. Employees are not required to disclose medical
information or diagnoses.

─────────────────────────────────────────────────────────────
EMPLOYEE INFORMATION

Employee name:   ${form.employeeName}
Job title:       ${form.jobTitle}
Manager:         ${form.manager}
Plan date:       ${today()}
Review date:     ___________________________________

─────────────────────────────────────────────────────────────
PART A — CURRENT STATE ASSESSMENT

In my own words, how I would describe my current wellness:
___________________________________________________________
___________________________________________________________

What is going well at work right now:
___________________________________________________________

What is most challenging at work right now:
___________________________________________________________

Signs that may indicate I am not doing well (for manager
reference only, shared voluntarily by the employee):
___________________________________________________________
(e.g., increased absence, withdrawing from team, reduced output)

─────────────────────────────────────────────────────────────
PART B — WELLNESS GOALS

Physical Wellness
Goal:        _______________________________________________
Measures:    _______________________________________________
Target date: _______________________________________________

Mental and Emotional Wellness
Goal:        _______________________________________________
Measures:    _______________________________________________
Target date: _______________________________________________

Work-Life Balance
Goal:        _______________________________________________
Measures:    _______________________________________________
Target date: _______________________________________________

─────────────────────────────────────────────────────────────
PART C — ACTION STEPS

The following specific steps will support the goals above:

  1. Action:    ________________________________________________
     By when:   _______________   Support needed: ______________

  2. Action:    ________________________________________________
     By when:   _______________   Support needed: ______________

  3. Action:    ________________________________________________
     By when:   _______________   Support needed: ______________

─────────────────────────────────────────────────────────────
PART D — SUPPORT RESOURCES

EAP access confirmed:   □ Yes — Access #: ___________________
Workplace supports:     ___________________________________
External supports:      ___________________________________

What helps me manage stress at work:
___________________________________________________________

What my manager can do to support me:
___________________________________________________________

What I will do to support myself:
___________________________________________________________

─────────────────────────────────────────────────────────────
PART E — MANAGER COMMITMENTS

${form.manager} agrees to:
  □ Check in with ${form.employeeName} on the agreed schedule
  □ Maintain confidentiality of this plan
  □ Provide the workspace / schedule supports noted above
  □ Not use information in this plan in performance management
     without the employee's explicit written consent
  □ Other: _________________________________________________

─────────────────────────────────────────────────────────────
PART F — REVIEW SCHEDULE

  First review:   Date: _______________   □ Completed
  Second review:  Date: _______________   □ Completed
  Final review:   Date: _______________   □ Completed

─────────────────────────────────────────────────────────────
CONFIDENTIALITY NOTICE

This plan is strictly confidential. It is not part of the
employee's personnel file and will not be shared without
the employee's written consent, except as required by law.

This plan is not an accommodation plan under human rights
legislation. If a formal accommodation is needed, use the
Accommodation Request Form process.

─────────────────────────────────────────────────────────────
SIGNATURES

Employee (${form.employeeName}):
Signature: ______________________  Date: ________________

Manager (${form.manager}):
Signature: ______________________  Date: ________________`;
}

// ─── Main export ─────────────────────────────────────────────────────────────

export function formatDocBody(template, form) {
  const header = buildHeader(template, form);

  let body;
  switch (template) {
    case "Offer Letter":
      body = genOfferLetter(form);
      break;
    case "Employment Agreement":
      body = genEmploymentAgreement(form);
      break;
    case "Termination Letter":
      body = genTerminationLetter(form);
      break;
    case "Written Warning":
      body = genWrittenWarning(form);
      break;
    case "Confidentiality Agreement":
      body = genConfidentialityAgreement(form);
      break;
    case "Independent Contractor Agreement":
      body = genContractorAgreement(form);
      break;
    case "Non-Compete Agreement":
      body = genNonCompete(form);
      break;
    case "Offer Letter (French/Quebec)":
      body = genOfferLetterFrench(form);
      break;
    case "Remote Work Policy":
      body = genRemoteWorkPolicy(form);
      break;
    case "Vacation & Leave Policy":
      body = genVacationLeavePolicy(form);
      break;
    case "Code of Conduct":
      body = genCodeOfConduct(form);
      break;
    case "Anti-Harassment Policy":
      body = genAntiHarassment(form);
      break;
    case "Resignation Acceptance Letter":
      body = genResignationAcceptance(form);
      break;
    case "Layoff / WARN Notice":
      body = genLayoffNotice(form);
      break;
    case "Performance Improvement Plan (PIP)":
      body = genPIP(form);
      break;
    case "Employee Handbook":
      body = genEmployeeHandbook(form);
      break;
    case "Accommodation Request Form":
      body = genAccommodationRequestForm(form);
      break;
    case "Accommodation Plan Template":
      body = genAccommodationPlan(form);
      break;
    case "Leave Request Form":
      body = genLeaveRequestForm(form);
      break;
    case "Sick Day Policy":
      body = genSickDayPolicy(form);
      break;
    case "Return-to-Work Plan (Mental Health)":
      body = genReturnToWorkPlanMentalHealth(form);
      break;
    case "Respectful Workplace Policy":
      body = genRespectfulWorkplacePolicy(form);
      break;
    case "Wellness Action Plan":
      body = genWellnessActionPlan(form);
      break;
    default:
      body = `This document has been prepared by ${form.companyName} in accordance with the laws of ${form.jurisdiction}.\n\n${form.notes || ""}`.trim();
  }

  return `${header}\n\n---\n\n${body}`.trim();
}
