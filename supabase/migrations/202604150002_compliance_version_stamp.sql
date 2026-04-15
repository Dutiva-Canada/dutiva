-- Phase 4 — Version-stamp saved documents with the jurisdiction_data
-- version in force at save time. The client uses this to detect stale
-- contracts and surface changelog entries via ComplianceAlertBanner.

alter table public.documents
  add column if not exists jurisdiction_data_version text;

alter table public.documents
  add column if not exists jurisdiction text;

create index if not exists documents_jurisdiction_data_version_idx
  on public.documents (jurisdiction_data_version);
