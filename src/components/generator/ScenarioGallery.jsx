// Dutiva — Entry point for the intake wizard.
// Renders scenario cards + the "Start from scratch" card. Clicking a card
// calls `onPick(scenarioId)` and the parent hands control to IntakeWizard.

import { ALL_SCENARIOS } from "../../lib/generator/scenarios.js";

export default function ScenarioGallery({ onPick, onSkip }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-semibold" style={{ color: "var(--text)" }}>
          Start a new offer
        </h2>
        <p className="mt-1 text-sm" style={{ color: "var(--text-2)" }}>
          Pick a scenario close to your hire, or start from scratch. Each
          scenario pre-loads the jurisdiction, defaults, and compliance
          triggers specific to that situation.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-2 xl:grid-cols-3">
        {ALL_SCENARIOS.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onPick(s.id)}
            className="group rounded-2xl border p-5 text-left transition hover:border-amber-400/50 hover:bg-amber-400/5"
            style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
          >
            <div className="flex items-center gap-3">
              <div className="text-2xl">{s.emoji}</div>
              <div className="text-base font-semibold" style={{ color: "var(--text)" }}>
                {s.name}
              </div>
            </div>
            <p className="mt-3 text-sm" style={{ color: "var(--text-2)" }}>
              {s.description}
            </p>
            {s.tags && s.tags.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {s.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border px-2 py-0.5 text-[11px]"
                    style={{ borderColor: "var(--border)", color: "var(--text-2)" }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            )}
          </button>
        ))}
      </div>

      {onSkip && (
        <div className="pt-2">
          <button
            type="button"
            onClick={onSkip}
            className="text-sm underline"
            style={{ color: "var(--text-2)" }}
          >
            Skip — go straight to the flat form (power-user mode)
          </button>
        </div>
      )}
    </div>
  );
}
