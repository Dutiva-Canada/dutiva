-- Add billing_period to profiles so we can surface "monthly" or "annual" in the UI
alter table public.profiles
  add column if not exists billing_period text not null default 'monthly',
  add constraint profiles_billing_period_check
    check (billing_period in ('monthly', 'annual'));
