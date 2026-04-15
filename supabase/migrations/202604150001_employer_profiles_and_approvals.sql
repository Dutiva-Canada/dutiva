-- Phase 3 — Employer profiles and approval workflow
--
-- Adds:
--   * employer_profiles: per-employer defaults (legal name, jurisdiction,
--     benefits, probation length, language, combined-doc setting, approval
--     toggle). One HR user can maintain multiple employer profiles.
--   * documents.workflow_state, workflow_assigned_to, employer_profile_id:
--     minimal per-document workflow state attached to existing documents.
--   * document_workflow_events: append-only audit log of state transitions
--     and assignment changes. Drives the approval history UI.
--
-- RLS policy: owner-scoped throughout. Approval "reviewers" must be granted
-- access via a separate invite flow (out of scope for Phase 3 — deferred
-- until the team-inviting workflow is designed).

create extension if not exists pgcrypto;

-- ───────────────────────── employer_profiles ─────────────────────────────

create table if not exists public.employer_profiles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,

  -- Identity
  legal_name text not null,
  display_name text,

  -- Defaults fed into the offer-letter intake
  default_jurisdiction text not null default 'Ontario',
  default_benefits_plan_name text not null default 'group',
  default_benefits_start text not null default 'the first of the month following your start date',
  default_probation_length text not null default 'three (3) months',
  default_vacation_weeks integer not null default 2,
  default_employee_notice text not null default 'two (2) weeks',
  default_employer_notice text not null default 'the minimum notice required by the applicable employment standards legislation',
  default_pay_frequency text not null default 'bi-weekly',
  default_scheduled_hours integer not null default 40,

  -- Jurisdictional posture
  default_language text not null default 'EN',     -- 'EN' | 'FR' | 'BOTH'
  covenant_stance text not null default 'non-solicit-only', -- 'non-solicit-only' | 'non-compete-execs' | 'none'

  -- Document-level preferences (per your earlier request)
  combined_document boolean not null default true,     -- single offer + agreement vs. two-step
  approval_required boolean not null default false,    -- enables workflow on new offers
  default_approver_email text,                         -- sent to this email on state change (Phase 4 hookup)

  -- Contact block
  hr_contact_name text,
  hr_contact_email text,
  signer_name text,
  signer_title text,

  -- Employee count drives jurisdiction-specific obligations (right-to-disconnect,
  -- VRSP, electronic monitoring policy)
  employee_count text not null default '5-24',

  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now()),

  constraint employer_profiles_jurisdiction_check
    check (default_jurisdiction in ('Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Federal')),
  constraint employer_profiles_language_check
    check (default_language in ('EN', 'FR', 'BOTH')),
  constraint employer_profiles_covenant_check
    check (covenant_stance in ('non-solicit-only', 'non-compete-execs', 'none')),
  constraint employer_profiles_employee_count_check
    check (employee_count in ('1-4', '5-24', '25-49', '50+'))
);

create index if not exists employer_profiles_user_id_idx
  on public.employer_profiles (user_id, created_at desc);

drop trigger if exists set_employer_profiles_updated_at on public.employer_profiles;
create trigger set_employer_profiles_updated_at
  before update on public.employer_profiles
  for each row execute function public.set_updated_at();

alter table public.employer_profiles enable row level security;

drop policy if exists "employer_profiles_select_own" on public.employer_profiles;
create policy "employer_profiles_select_own" on public.employer_profiles
  for select using (auth.uid() = user_id);

drop policy if exists "employer_profiles_insert_own" on public.employer_profiles;
create policy "employer_profiles_insert_own" on public.employer_profiles
  for insert with check (auth.uid() = user_id);

drop policy if exists "employer_profiles_update_own" on public.employer_profiles;
create policy "employer_profiles_update_own" on public.employer_profiles
  for update using (auth.uid() = user_id);

drop policy if exists "employer_profiles_delete_own" on public.employer_profiles;
create policy "employer_profiles_delete_own" on public.employer_profiles
  for delete using (auth.uid() = user_id);

-- ───────────────────── documents: workflow columns ───────────────────────

alter table public.documents
  add column if not exists workflow_state text not null default 'draft'
    check (workflow_state in ('draft', 'review', 'approved', 'sent', 'signed', 'declined', 'archived'));

alter table public.documents
  add column if not exists workflow_assigned_to text;

alter table public.documents
  add column if not exists employer_profile_id uuid
    references public.employer_profiles (id) on delete set null;

create index if not exists documents_workflow_state_idx
  on public.documents (user_id, workflow_state);

create index if not exists documents_employer_profile_idx
  on public.documents (employer_profile_id);

-- ────────────────── document_workflow_events (audit log) ─────────────────

create table if not exists public.document_workflow_events (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents (id) on delete cascade,
  user_id uuid not null references auth.users (id) on delete cascade,
  from_state text,
  to_state text not null,
  actor_email text,
  note text,
  created_at timestamptz not null default timezone('utc', now())
);

create index if not exists workflow_events_doc_idx
  on public.document_workflow_events (document_id, created_at desc);

create index if not exists workflow_events_user_idx
  on public.document_workflow_events (user_id, created_at desc);

alter table public.document_workflow_events enable row level security;

drop policy if exists "workflow_events_select_own" on public.document_workflow_events;
create policy "workflow_events_select_own" on public.document_workflow_events
  for select using (auth.uid() = user_id);

drop policy if exists "workflow_events_insert_own" on public.document_workflow_events;
create policy "workflow_events_insert_own" on public.document_workflow_events
  for insert with check (auth.uid() = user_id);
