-- Dutiva — Phase 4 migration: compliance alerts
--
-- Adds provenance columns to `documents` so the compliance-alerts engine can
-- detect stale contracts. Every new or regenerated document records:
--   - which jurisdiction it was written for (code, not the display name)
--   - which UI template name was used (so registry lookups line up)
--   - the jurisdiction_data version in force at generation time
--   - the timestamp of generation (distinct from created_at / updated_at
--     because saves and updates may happen without regeneration)

alter table public.documents
  add column if not exists jurisdiction_code text,
  add column if not exists template_key text,
  add column if not exists jurisdiction_data_version text,
  add column if not exists generated_at timestamptz;

-- Backfill: assume any pre-existing row was generated at its created_at under
-- the first shipped version. This is conservative — most of them will fire
-- the annual-review prompt, which is the desired behavior.
update public.documents
  set generated_at = coalesce(generated_at, created_at),
      jurisdiction_data_version = coalesce(jurisdiction_data_version, '0.0.0')
  where generated_at is null or jurisdiction_data_version is null;

-- Index to power the account-wide "X contracts need review" query.
create index if not exists documents_generated_at_idx
  on public.documents (user_id, generated_at);

-- RLS: the existing per-user policy on documents already covers reads/writes
-- of these new columns. No new policies needed.

comment on column public.documents.jurisdiction_code is
  'Engine code (ON/QC/BC/AB/FED) at generation time — used by complianceAlerts engine.';
comment on column public.documents.template_key is
  'UI template name at generation time, e.g. "Offer Letter".';
comment on column public.documents.jurisdiction_data_version is
  'Value of LAW_DATA_VERSION from src/lib/generator/jurisdiction_data.js when generated.';
comment on column public.documents.generated_at is
  'Wall-clock timestamp of the generation that produced the current content. Distinct from updated_at.';
