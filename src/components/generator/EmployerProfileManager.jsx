// EmployerProfileManager — CRUD panel for employer profiles.
// Mounted inside GeneratorPage. Lets the HR user save a company's defaults
// once and reuse them across every offer for that employer.

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  EMPTY_PROFILE,
  createEmployerProfile,
  deleteEmployerProfile,
  listEmployerProfiles,
  updateEmployerProfile,
} from "../../lib/employerProfiles";

const JURISDICTIONS = [
  "Ontario", "Quebec", "British Columbia", "Alberta", "Federal",
];
const LANGUAGES = [
  { value: "EN", label: "English" },
  { value: "FR", label: "French" },
  { value: "BOTH", label: "Bilingual (French-primary for Quebec)" },
];
const COVENANT_STANCES = [
  { value: "non-solicit-only", label: "Non-solicitation only (recommended)" },
  { value: "non-compete-execs", label: "Non-compete for executives only" },
  { value: "none", label: "No restrictive covenants" },
];
const EMPLOYEE_COUNTS = ["1-4", "5-24", "25-49", "50+"];

function Field({ label, help, children }) {
  return (
    <label className="block">
      <span className="text-sm font-medium" style={{ color: "var(--text)" }}>{label}</span>
      {children}
      {help && <span className="mt-1 block text-xs" style={{ color: "var(--text-2)" }}>{help}</span>}
    </label>
  );
}

function Input(props) {
  return (
    <input
      {...props}
      className={`mt-1 w-full rounded-xl border px-3 py-2 text-sm ${props.className || ""}`}
      style={{ background: "var(--bg-elevated)", borderColor: "var(--border)", color: "var(--text)" }}
    />
  );
}

function Select({ value, onChange, children }) {
  return (
    <select
      value={value}
      onChange={onChange}
      className="mt-1 w-full rounded-xl border px-3 py-2 text-sm"
      style={{ background: "var(--bg-elevated)", borderColor: "var(--border)", color: "var(--text)" }}
    >
      {children}
    </select>
  );
}

export default function EmployerProfileManager({ user, activeProfileId, onSelect, onClose }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // profile object or null
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const reload = useCallback(async () => {
    if (!user) { setLoading(false); return; }
    setLoading(true);
    const list = await listEmployerProfiles(user.id);
    setProfiles(list);
    setLoading(false);
  }, [user]);

  useEffect(() => { reload(); }, [reload]);

  const startNew = () => setEditing({ ...EMPTY_PROFILE });
  const startEdit = (p) => setEditing({ ...p });
  const cancel = () => { setEditing(null); setError(""); };

  const save = async () => {
    if (!editing || !user) return;
    if (!editing.legal_name?.trim()) { setError("Legal name is required."); return; }
    setSaving(true);
    setError("");
    const payload = { ...editing };
    let result;
    if (editing.id) {
      result = await updateEmployerProfile(editing.id, payload, user.id);
    } else {
      result = await createEmployerProfile(payload, user.id);
    }
    setSaving(false);
    if (result.error) { setError(result.error.message); return; }
    setEditing(null);
    await reload();
    if (result.data && onSelect) onSelect(result.data);
  };

  const del = async (p) => {
    if (!user) return;
    if (!window.confirm(`Delete employer profile "${p.legal_name}"? This does not delete any documents that reference it.`)) return;
    const { error: delError } = await deleteEmployerProfile(p.id, user.id);
    if (delError) { setError(delError.message); return; }
    await reload();
  };

  const profilesSorted = useMemo(
    () => [...profiles].sort((a, b) => a.legal_name.localeCompare(b.legal_name)),
    [profiles],
  );

  if (!user) {
    return (
      <div className="rounded-2xl border p-5" style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}>
        <div className="text-sm" style={{ color: "var(--text-2)" }}>Sign in to save employer profiles across sessions.</div>
      </div>
    );
  }

  return (
    <div className="rounded-2xl border p-5" style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <div className="text-base font-semibold" style={{ color: "var(--text)" }}>Employer profiles</div>
          <div className="text-sm" style={{ color: "var(--text-2)" }}>Save a company's defaults once. Reuse across every offer you write for them.</div>
        </div>
        <div className="flex gap-2">
          <button onClick={startNew} className="rounded-xl border px-3 py-1.5 text-sm" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
            New profile
          </button>
          {onClose && (
            <button onClick={onClose} className="rounded-xl border px-3 py-1.5 text-sm" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
              Close
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-4 rounded-xl border border-red-500/40 bg-red-500/10 p-3 text-sm text-red-300">{error}</div>
      )}

      {!editing && (
        <div className="space-y-2">
          {loading && <div className="text-sm" style={{ color: "var(--text-2)" }}>Loading…</div>}
          {!loading && profilesSorted.length === 0 && (
            <div className="text-sm" style={{ color: "var(--text-2)" }}>No profiles yet. Create one to speed up your next offer.</div>
          )}
          {profilesSorted.map((p) => (
            <div
              key={p.id}
              className={`flex items-start justify-between rounded-xl border p-3 ${activeProfileId === p.id ? "ring-2 ring-amber-400/60" : ""}`}
              style={{ borderColor: "var(--border)" }}
            >
              <div>
                <div className="font-medium" style={{ color: "var(--text)" }}>{p.legal_name}</div>
                <div className="text-xs" style={{ color: "var(--text-2)" }}>
                  {p.default_jurisdiction} · {p.employee_count} employees · {p.combined_document ? "Combined offer" : "Two-step offer"} · {p.approval_required ? "Approval on" : "Approval off"}
                </div>
              </div>
              <div className="flex gap-2">
                {onSelect && (
                  <button onClick={() => onSelect(p)} className="rounded-lg border px-2 py-1 text-xs" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                    Use
                  </button>
                )}
                <button onClick={() => startEdit(p)} className="rounded-lg border px-2 py-1 text-xs" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                  Edit
                </button>
                <button onClick={() => del(p)} className="rounded-lg border border-red-500/40 px-2 py-1 text-xs text-red-300">
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {editing && (
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Field label="Legal name" help="Exact corporate entity name.">
              <Input value={editing.legal_name || ""} onChange={(e) => setEditing({ ...editing, legal_name: e.target.value })} />
            </Field>
            <Field label="Display name" help="Shorter label shown in menus.">
              <Input value={editing.display_name || ""} onChange={(e) => setEditing({ ...editing, display_name: e.target.value })} />
            </Field>

            <Field label="Default jurisdiction">
              <Select value={editing.default_jurisdiction} onChange={(e) => setEditing({ ...editing, default_jurisdiction: e.target.value })}>
                {JURISDICTIONS.map((j) => <option key={j} value={j}>{j}</option>)}
              </Select>
            </Field>
            <Field label="Default language" help="Quebec requires French-first per Bill 96.">
              <Select value={editing.default_language} onChange={(e) => setEditing({ ...editing, default_language: e.target.value })}>
                {LANGUAGES.map((l) => <option key={l.value} value={l.value}>{l.label}</option>)}
              </Select>
            </Field>

            <Field label="Employees (total)" help="Drives right-to-disconnect (25+), VRSP (Quebec 5+), electronic monitoring policy.">
              <Select value={editing.employee_count} onChange={(e) => setEditing({ ...editing, employee_count: e.target.value })}>
                {EMPLOYEE_COUNTS.map((c) => <option key={c} value={c}>{c}</option>)}
              </Select>
            </Field>
            <Field label="Restrictive covenant stance">
              <Select value={editing.covenant_stance} onChange={(e) => setEditing({ ...editing, covenant_stance: e.target.value })}>
                {COVENANT_STANCES.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
              </Select>
            </Field>

            <Field label="Probation length">
              <Input value={editing.default_probation_length || ""} onChange={(e) => setEditing({ ...editing, default_probation_length: e.target.value })} />
            </Field>
            <Field label="Vacation weeks / year">
              <Input type="number" value={editing.default_vacation_weeks ?? 2} onChange={(e) => setEditing({ ...editing, default_vacation_weeks: parseInt(e.target.value || "0", 10) })} />
            </Field>

            <Field label="Employee resignation notice">
              <Input value={editing.default_employee_notice || ""} onChange={(e) => setEditing({ ...editing, default_employee_notice: e.target.value })} />
            </Field>
            <Field label="Employer without-cause notice">
              <Input value={editing.default_employer_notice || ""} onChange={(e) => setEditing({ ...editing, default_employer_notice: e.target.value })} />
            </Field>

            <Field label="HR contact name">
              <Input value={editing.hr_contact_name || ""} onChange={(e) => setEditing({ ...editing, hr_contact_name: e.target.value })} />
            </Field>
            <Field label="HR contact email">
              <Input type="email" value={editing.hr_contact_email || ""} onChange={(e) => setEditing({ ...editing, hr_contact_email: e.target.value })} />
            </Field>

            <Field label="Signer name">
              <Input value={editing.signer_name || ""} onChange={(e) => setEditing({ ...editing, signer_name: e.target.value })} />
            </Field>
            <Field label="Signer title">
              <Input value={editing.signer_title || ""} onChange={(e) => setEditing({ ...editing, signer_title: e.target.value })} />
            </Field>
          </div>

          <div className="flex flex-col gap-3 rounded-xl border p-4" style={{ borderColor: "var(--border)" }}>
            <label className="flex items-start gap-3">
              <input type="checkbox" checked={editing.combined_document === true} onChange={(e) => setEditing({ ...editing, combined_document: e.target.checked })} />
              <div>
                <div className="text-sm font-medium" style={{ color: "var(--text)" }}>Use combined offer + agreement (recommended)</div>
                <div className="text-xs" style={{ color: "var(--text-2)" }}>One document with all terms. Prevents the Adams v. Thinkific two-step trap.</div>
              </div>
            </label>

            <label className="flex items-start gap-3">
              <input type="checkbox" checked={editing.approval_required === true} onChange={(e) => setEditing({ ...editing, approval_required: e.target.checked })} />
              <div>
                <div className="text-sm font-medium" style={{ color: "var(--text)" }}>Require internal approval before sending</div>
                <div className="text-xs" style={{ color: "var(--text-2)" }}>Offers for this employer route through draft → review → approved before they can be sent.</div>
              </div>
            </label>

            {editing.approval_required && (
              <Field label="Default approver email" help="Notified when a new offer enters review (email hookup deferred).">
                <Input type="email" value={editing.default_approver_email || ""} onChange={(e) => setEditing({ ...editing, default_approver_email: e.target.value })} />
              </Field>
            )}
          </div>

          <div className="flex gap-2">
            <button onClick={save} disabled={saving} className="rounded-xl bg-amber-400/90 px-4 py-2 text-sm font-semibold text-black disabled:opacity-50">
              {saving ? "Saving…" : editing.id ? "Save changes" : "Create profile"}
            </button>
            <button onClick={cancel} className="rounded-xl border px-4 py-2 text-sm" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
