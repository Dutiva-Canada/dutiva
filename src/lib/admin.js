const ADMIN_EMAILS = [
  "martin.constantineau@dutiva.ca",
];

export function isInternalAdminEmail(email) {
  if (!email || typeof email !== "string") return false;
  return ADMIN_EMAILS.includes(email.trim().toLowerCase());
}

export function getAdminEmails() {
  return [...ADMIN_EMAILS];
}
