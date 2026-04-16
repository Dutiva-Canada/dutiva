const ONBOARDING_KEY = "dutiva.onboarding.v1";

const defaultProgress = {
  companyConfigured: false,
  provinceConfigured: false,
  firstDocumentGenerated: false,
};

export function getOnboardingProgress() {
  try {
    const raw = localStorage.getItem(ONBOARDING_KEY);
    return raw ? { ...defaultProgress, ...JSON.parse(raw) } : defaultProgress;
  } catch {
    return defaultProgress;
  }
}

export function setOnboardingProgress(partial) {
  try {
    const current = getOnboardingProgress();
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify({ ...current, ...partial }));
  } catch {
    // ignore storage failures
  }
}

export function isOnboardingComplete() {
  const progress = getOnboardingProgress();
  return progress.companyConfigured && progress.provinceConfigured && progress.firstDocumentGenerated;
}
