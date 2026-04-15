// EmployerProfileManager — List + create + edit + delete employer profiles.
// Profiles feed the intake wizard with 80%+ defaults per employer, own the
// combined-doc setting, and decide whether the approval workflow is used.

import { useCallback, useEffect, useState } from "react";
import { Briefcase, Plus, Save, Trash2, X } from "lucide-react";
import {
  createEmployerProfile,
  deleteEmployerProfile,
  listEmployerProfiles,
  updateEmployerProfile,
  validateProfile,
} from "../../lib/generator/employerProfiles.js";

const BLANK = {
  legal_name: "",
  trade_name: "",
  default_jurisdiction: "Ontario",
  default_language: "EN",
  combined_offer_default: true,
  default_probation_length: "three (3) months",
  default_vacation_weeks: 2,
  default_benefits_plan_name: "",
  default_pay_frequency: "bi-weekly",
  covenant_stance: "standard",
  employee_count_tier: "1-4",
  approval_required: false,
  approval_notes: "",
  default_hr_contact_name: "",
  default_hr_contact_email: "",
};

const FIELD = "w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-amber-400/40";
const FIELD_STYLE = { background: "var(--bg-elevated)", borderColor: "var(--border)", color: "var(--text)" };
const LABEL = "mb-1 block text-xs font-medium uppercase tracking-wide";
const LABEL_STYLE = { color: "var(--text-2)" };

export default function EmployerProfileManager({ userId, onApply, onClose }) {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(null); // null | "new" | profileId
  const [draft, setDraft] = useState(BLANK);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");

  const refresh = useCallback(async () => {
    if (!userId) {
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const list = await listEmployerProfiles(userId);
      setProfiles(list);
    } catch (e) {
      setMessage(e.message || "Failed to load profiles.");
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  const openNew = () => {
    setEditing("new");
    setDraft({ ...BLANK });
    setErrors({});
  };

  const openEdit = (profile) => {
    setEditing(profile.id);
    setDraft({ ...BLANK, ...profile });
    setErrors({});
  };

  const cancel = () => {
    setEditing(null);
    setDraft(BLANK);
    setErrors({});
  };

  const save = async () => {
    const { valid, errors: e } = validateProfile(draft);
    if (!valid) {
      setErrors(e);
      return;
    }
    try {
      if (editing === "new") {
        await createEmployerProfile(userId, draft);
        setMessage(`Saved profile: ${draft.legal_name}`);
      } else {
        await updateEmployerProfile(editing, draft);
        setMessage(`Updated profile: ${draft.legal_name}`);
      }
      cancel();
      refresh();
    } catch (err) {
      setMessage(err.message || "Save failed.");
    }
  };

  const remove = async (id) => {
    if (!window.confirm("Delete this employer profile? Offers already generated with it stay intact.")) return;
    try {
      await deleteEmployerProfile(id);
      refresh();
    } catch (err) {
      setMessage(err.message || "Delete failed.");
    }
  };

  const set = (k, v) => setDraft((d) => ({ ...d, [k]: v }));

  if (!userId) {
    return (
      <div className="rounded-2xl border p-5 text-sm" style={{ borderColor: "var(--border)", color: "var(--text-2)" }}>
        Sign in to save employer profiles.
      </div>
    );
  }

  return (
    <div className="rounded-2xl border p-5" style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}>
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-amber-400/10 text-amber-300">
            <Briefcase className="h-5 w-5" />
          </div>
          <div>
            <div className="text-base font-semibold" style={{ color: "var(--text)" }}>Employer profiles</div>
            <div className="text-xs" style={{ color: "var(--text-2)" }}>
              Save defaults per employer. Used to pre-fill the intake wizard.
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {editing === null && (
            <button onClick={openNew} className="flex items-center gap-1.5 rounded-lg bg-amber-400/90 px-3 py-1.5 text-xs font-medium text-black hover:bg-amber-400">
              <Plus className="h-3.5 w-3.5" /> New profile
            </button>
          )}
          {onClose && (
            <button onClick={onClose} className="rounded-lg border p-1.5 hover:bg-black/5" style={{ borderColor: "var(--border)" }}>
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {message && (
        <div className="mb-3 rounded-lg border px-3 py-2 text-xs" style={{ borderColor: "var(--border)", color: "var(--text-2)" }}>
          {message}
        </div>
      )}

      {editing !== null ? (
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
          <div>
            <label className={LABEL} style={LABEL_STYLE}>Legal name</label>
            <input className={FIELD} style={FIELD_STYLE} value={draft.legal_name} onChange={(e) => set("legal_name", e.target.value)} />
            {errors.legal_name && <div className="mt-1 text-xs text-red-400">{errors.legal_name}</div>}
          </div>
          <div>
            <label className={LABEL} style={LABEL_STYLE}>Trade name (optional)</label>
            <input className={FIELD} style={FIELD_STYLE} value={draft.trade_name || ""} onChange={(e) => set("trade_name", e.target.value)} />
          </div>
          <div>
            <label className={LABEL} style={LABEL_STYLE}>Default jurisdiction</label>
            <select className={FIELD} style={FIELD_STYLE} value={draft.default_jurisdiction} onChange={(e) => set("default_jurisdiction", e.target.value)}>
              <option>Ontario</option><option>Quebec</option><option>British Columbia</option><option>Alberta</option><option>Federal</option>
            </select>
          </div>
          <div>
            <label className={LABEL} style={LABEL_STYLE}>Default language</label>
            <select className={FIELD} style={FIELD_STYLE} value={draft.default_language} onChange={(e) => set("default_language", e.target.value)}>
              <option value="EN">English only</option>
              <option value="FR">French only</option>
              <option value="BOTH">Bilingual (French first — Bill 96)</option>
            </select>
          </div>
          <div>
            <label className={LABEL} style={LABEL_STYLE}>Default probation length</label>
            <input className={FIELD} style={FIELD_STYLE} value={draft.default_probation_length || ""} onChange={(e) => set("default_probation_length", e.target.value)} />
          </div>
          <div>
            <label className={LABEL} style={LABEL_STYLE}>Default vacation (weeks)</label>
            <input className={FIELD} style={FIELD_STYLE} type="number" min="0" max="52" value={draft.default_vacation_weeks ?? ""} onChange={(e) => set("default_vacation_weeks", e.target.value === "" ? null : Number(e.target.value))} />
            {errors.default_vacation_weeks && <div className="mt-1 text-xs text-red-400">{errors.default_vacation_weeks}</div>}
          </div>
          <div>
            <label className={LABEL} style={LABEL_STYLE}>Default pay frequency</label>
            <select className={FIELD} style={FIELD_STYLE} value={draft.default_pay_frequency} onChange={(e) => set("default_pay_frequency", e.target.value)}>
              <option value="bi-weekly">Bi-weekly</option><option value="semi-monthly">Semi-monthly</option><option value="monthly">Monthly</option>
            </select>
          </div>
          <div>
            <label className={LABEL} style={LABEL_STYLE}>Benefits plan name</label>
            <input className={FIELD} style={FIELD_STYLE} value={draft.default_benefits_plan_name || ""} onChange={(e) => set("default_benefits_plan_name", e.target.value)} />
          </div>
          <div>
            <label className={LABEL} style={LABEL_STYLE}>Restrictive covenant stance</label>
            <select className={FIELD} style={FIELD_STYLE} value={draft.covenant_stance} onChange={(e) => set("covenant_stance", e.target.value)}>
              <option value="none">None — no covenants</option>
              <option value="standard">Standard — non-solicit + confidentiality</option>
              <option value="strict">Strict — standard + IP assignment</option>
            </select>
          </div>
          <div>
            <label className={LABEL} style={LABEL_STYLE}>Employee count tier</label>
            <select className={FIELD} style={FIELD_STYLE} value={draft.employee_count_tier} onChange={(e) => set("employee_count_tier", e.target.value)}>
              <option value="1-4">1–4</option><option value="5-24">5–24</option><option value="25-49">25–49</option><option value="50+">50+</option>
            </select>
          </div>
          <div>
            <label className={LABEL} style={LABEL_STYLE}>Default HR contact name</label>
            <input className={FIELD} style={FIELD_STYLE} value={draft.default_hr_contact_name || ""} onChange={(e) => set("default_hr_contact_name", e.target.value)} />
          </div>
          <div>
            <label className={LABEL} style={LABEL_STYLE}>Default HR contact email</label>
            <input className={FIELD} style={FIELD_STYLE} type="email" value={draft.default_hr_contact_email || ""} onChange={(e) => set("default_hr_contact_email", e.target.value)} />
            {errors.default_hr_contact_email && <div className="mt-1 text-xs text-red-400">{errors.default_hr_contact_email}</div>}
          </div>

          <div className="md:col-span-2 flex flex-col gap-2 rounded-xl border p-3" style={{ borderColor: "var(--border)" }}>
            <label className="flex items-center gap-2 text-sm" style={{ color: "var(--text)" }}>
              <input type="checkbox" checked={draft.combined_offer_default} onChange={(e) => set("combined_offer_default", e.target.checked)} />
              <span>Combine offer letter + employment agreement into one document (recommended — avoids Adams v. Thinkific two-step trap)</span>
            </label>
            <label className="flex items-center gap-2 text-sm" style={{ color: "var(--text)" }}>
              <input type="checkbox" checked={draft.approval_required} onChange={(e) => set("approval_required", e.target.checked)} />
              <span>Require approval workflow before sending offers for this employer</span>
            </label>
            {draft.approval_required && (
              <textarea className={FIELD} style={FIELD_STYLE} rows={2} placeholder="Approval notes (who approves, SLA, etc.)" value={draft.approval_notes || ""} onChange={(e) => set("approval_notes", e.target.value)} />
            )}
          </div>

          <div className="md:col-span-2 flex justify-end gap-2">
            <button onClick={cancel} className="rounded-lg border px-3 py-2 text-sm" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
              Cancel
            </button>
            <button onClick={save} className="flex items-center gap-1.5 rounded-lg bg-amber-400/90 px-3 py-2 text-sm font-medium text-black hover:bg-amber-400">
              <Save className="h-4 w-4" /> {editing === "new" ? "Create profile" : "Save changes"}
            </button>
          </div>
        </div>
      ) : loading ? (
        <div className="text-sm" style={{ color: "var(--text-2)" }}>Loading profiles…</div>
      ) : profiles.length === 0 ? (
        <div className="rounded-xl border border-dashed p-4 text-sm" style={{ borderColor: "var(--border)", color: "var(--text-2)" }}>
          No employer profiles yet. Create one to pre-fill the intake wizard with company defaults.
        </div>
      ) : (
        <ul className="space-y-2">
          {profiles.map((p) => (
            <li key={p.id} className="flex items-center justify-between rounded-xl border p-3" style={{ borderColor: "var(--border)" }}>
              <div>
                <div className="text-sm font-medium" style={{ color: "var(--text)" }}>{p.legal_name}</div>
                <div className="text-xs" style={{ color: "var(--text-2)" }}>
                  {p.default_jurisdiction} · {p.default_language} · {p.covenant_stance} covenants · {p.combined_offer_default ? "Combined doc" : "Split doc"}{p.approval_required ? " · Approval required" : ""}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {onApply && (
                  <button onClick={() => onApply(p)} className="rounded-lg border px-3 py-1.5 text-xs" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                    Apply
                  </button>
                )}
                <button onClick={() => openEdit(p)} className="rounded-lg border px-3 py-1.5 text-xs" style={{ borderColor: "var(--border)", color: "var(--text)" }}>
                  Edit
                </button>
                <button onClick={() => remove(p.id)} className="rounded-lg border px-2 py-1.5 text-xs text-red-400" style={{ borderColor: "var(--border)" }}>
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
