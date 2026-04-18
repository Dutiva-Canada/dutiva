export const MOST_USED_TEMPLATES = [
  "Offer Letter",
  "Employment Agreement",
  "Termination Letter",
  "Independent Contractor Agreement",
];

export const QUICK_ACTION_TEMPLATES = [
  "Performance Improvement Plan (PIP)",
  "Written Warning",
  "Confidentiality Agreement",
];

export const TEMPLATE_CATEGORIES = {
  Hiring: [
    "Offer Letter",
    "Employment Agreement",
    "Independent Contractor Agreement",
  ],
  Policy: [
    "Confidentiality Agreement",
    "Anti-Harassment Policy",
    "Code of Conduct",
    "Vacation & Leave Policy",
    "Remote Work Policy",
    "Sick Days & Medical Leave Policy",
  ],
  Discipline: [
    "Performance Improvement Plan (PIP)",
    "Written Warning",
  ],
  Termination: [
    "Termination Letter",
  ],
};

export const CATEGORY_ORDER = [
  "All Templates",
  "Hiring",
  "Policy",
  "Discipline",
  "Termination",
];

export const ALL_TEMPLATES = Object.values(TEMPLATE_CATEGORIES).flat();

export const TEMPLATE_META = {
  "Offer Letter": { category: "Hiring", hint: "Hire someone", fields: ["companyName", "employeeName", "jobTitle", "salary", "startDate", "manager", "notes"] },
  "Employment Agreement": { category: "Hiring", hint: "Formal employment contract", fields: ["companyName", "employeeName", "jobTitle", "salary", "startDate", "manager", "notes"] },
  "Independent Contractor Agreement": { category: "Hiring", hint: "Contractor engagement", fields: ["companyName", "employeeName", "jobTitle", "contractRate", "scopeOfWork", "manager", "notes"] },
  "Termination Letter": { category: "Termination", hint: "End employment properly", fields: ["companyName", "employeeName", "jobTitle", "startDate", "manager", "notes"] },
  "Performance Improvement Plan (PIP)": { category: "Discipline", hint: "Set expectations and follow-up", fields: ["companyName", "employeeName", "jobTitle", "manager", "performanceGoals", "reviewDate", "notes"] },
  "Written Warning": { category: "Discipline", hint: "Document a conduct or performance issue", fields: ["companyName", "employeeName", "jobTitle", "manager", "notes"] },
  "Confidentiality Agreement": { category: "Policy", hint: "Protect confidential information", fields: ["companyName", "employeeName", "jobTitle", "manager", "notes"] },
  "Anti-Harassment Policy": { category: "Policy", hint: "Core workplace compliance", fields: ["companyName", "manager", "notes"] },
  "Code of Conduct": { category: "Policy", hint: "Set workplace expectations", fields: ["companyName", "manager", "notes"] },
  "Vacation & Leave Policy": { category: "Policy", hint: "Time off and leave rules", fields: ["companyName", "manager", "notes"] },
  "Remote Work Policy": { category: "Policy", hint: "Remote work expectations", fields: ["companyName", "manager", "notes"] },
  "Sick Days & Medical Leave Policy": { category: "Policy", hint: "Medical leave and absences", fields: ["companyName", "manager", "notes"] },
};

export function getTemplatesForCategory(category, query = "") {
  const base = category === "All Templates" ? ALL_TEMPLATES : TEMPLATE_CATEGORIES[category] || [];
  if (!query) return base;
  return base.filter((template) => template.toLowerCase().includes(query.toLowerCase()));
}
