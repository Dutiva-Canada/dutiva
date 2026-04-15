-- Phase 3 — Employer profiles + offer workflow state machine
--
-- employer_profiles:
--   Saved defaults per employer (legal name, default jurisdiction, benefits,
--   probation length, covenant stance, language preference, combined-doc
--   default, approval_required toggle). Enables the "80% pre-filled on
--   repeat hire" UX and is the single place where combined-doc policy lives
--   (per Phase 1 decision: combined doc is a per-employer profile setting).
--
-- offer_workflow_states:
--   Audit log + current stage for each generated offer. Used when a profile
--   has approval_required = true. Reuses the existing documents table as the
--   source of truth for the rendered content.

begin;

-- ────────────────────────────────────────────────────────────────────────────
-- employer_profiles
-- ────────────────────────────────────────────────────────────────────────────
create table if not exists public.employer_profiles (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references auth.users (id) on delete cascade,

  -- Identity
  legal_name text not null,
  trade_name text,

  -- Document defaults
  default_jurisdiction text not null default 'Ontario'
    check (default_jurisdiction in (
      'Ontario', 'Quebec', 'British Columbia', 'Alberta', 'Federal'
    )),
  default_language text not null default 'EN'
    check (default_language in ('EN', 'FR', 'BOTH')),
  combined_offer_default boolean not null default true,

  -- Clause defaults
  default_probation_length text default 'three (3) months',
  default_vacation_weeks integer default 2,
  default_benefits_plan_name text,
  default_pay_frequency text default 'bi-weekly'
    check (default_pay_frequency in ('bi-weekly', 'semi-monthly', 'monthly')),

  -- Covenant stance — used by guardrails + intake defaults
  covenant_stance text not null default 'standard'
    check (covenant_stance in ('none', 'standard', 'strict')),

  -- Employer context — feeds guardrails (RTD, VRSP, electronic monitoring)
  employee_count_tier text default '1-4'
    check (employee_count_tier in ('1-4', '5-24', '25-49', '50+')),

  -- Approval workflow
  approval_required boolean not null default false,
  approval_notes text,

  -- Contacts
  default_hr_contact_name text,
  default_hr_contact_email text,

  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists employer_profiles_owner_idx
  on public.employer_profiles (owner_id, legal_name);

alter table public.employer_profiles enable row level security;
grant select, insert, update, delete on public.employer_profiles to authenticated;

drop policy if exists "Users can view their own employer profiles" on public.employer_profiles;
create policy "Users can view their own employer profiles"
  on public.employer_profiles
  for select
  to authenticated
  using (owner_id = auth.uid());

drop policy if exists "Users can insert their own employer profiles" on public.employer_profiles;
create policy "Users can insert their own employer profiles"
  on public.employer_profiles
  for insert
  to authenticated
  with check (owner_id = auth.uid());

drop policy if exists "Users can update their own employer profiles" on public.employer_profiles;
create policy "Users can update their own employer profiles"
  on public.employer_profiles
  for update
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

drop policy if exists "Users can delete their own employer profiles" on public.employer_profiles;
create policy "Users can delete their own employer profiles"
  on public.employer_profiles
  for delete
  to authenticated
  using (owner_id = auth.uid());

-- Keep updated_at fresh
create or replace function public.touch_employer_profiles_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := timezone('utc', now());
  return new;
end
$$;

drop trigger if exists trg_employer_profiles_touch on public.employer_profiles;
create trigger trg_employer_profiles_touch
  before update on public.employer_profiles
  for each row execute function public.touch_employer_profiles_updated_at();

-- ────────────────────────────────────────────────────────────────────────────
-- offer_workflow_states
-- ────────────────────────────────────────────────────────────────────────────
-- Stages:
--   draft        — just created, not ready for review
--   in_review    — submitted for approval
--   approved     — approved, ready to send
--   sent         — delivered to candidate
--   signed       — candidate signed (tie to signatures table where possible)
--   rejected     — reviewer rejected; must return to draft
--   cancelled    — explicitly cancelled
create table if not exists public.offer_workflow_states (
  id uuid primary key default gen_random_uuid(),
  document_id uuid not null references public.documents (id) on delete cascade,
  employer_profile_id uuid references public.employer_profiles (id) on delete set null,
  owner_id uuid not null references auth.users (id) on delete cascade,
  stage text not null default 'draft'
    check (stage in ('draft', 'in_review', 'approved', 'sent', 'signed', 'rejected', 'cancelled')),
  assigned_to_email text,
  note text,
  created_at timestamptz not null default timezone('utc', now()),
  updated_at timestamptz not null default timezone('utc', now())
);

create index if not exists offer_workflow_states_document_idx
  on public.offer_workflow_states (document_id, created_at desc);

create index if not exists offer_workflow_states_owner_stage_idx
  on public.offer_workflow_states (owner_id, stage);

alter table public.offer_workflow_states enable row level security;
grant select, insert, update, delete on public.offer_workflow_states to authenticated;

drop policy if exists "Users can view their own workflow states" on public.offer_workflow_states;
create policy "Users can view their own workflow states"
  on public.offer_workflow_states
  for select
  to authenticated
  using (owner_id = auth.uid());

drop policy if exists "Users can insert their own workflow states" on public.offer_workflow_states;
create policy "Users can insert their own workflow states"
  on public.offer_workflow_states
  for insert
  to authenticated
  with check (owner_id = auth.uid());

drop policy if exists "Users can update their own workflow states" on public.offer_workflow_states;
create policy "Users can update their own workflow states"
  on public.offer_workflow_states
  for update
  to authenticated
  using (owner_id = auth.uid())
  with check (owner_id = auth.uid());

drop policy if exists "Users can delete their own workflow states" on public.offer_workflow_states;
create policy "Users can delete their own workflow states"
  on public.offer_workflow_states
  for delete
  to authenticated
  using (owner_id = auth.uid());

create or replace function public.touch_offer_workflow_states_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at := timezone('utc', now());
  return new;
end
$$;

drop trigger if exists trg_offer_workflow_states_touch on public.offer_workflow_states;
create trigger trg_offer_workflow_states_touch
  before update on public.offer_workflow_states
  for each row execute function public.touch_offer_workflow_states_updated_at();

commit;
