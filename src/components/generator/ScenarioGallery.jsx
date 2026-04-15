// Entry point for the new intake flow. Shows the 5 curated scenarios plus a
// "Custom intake" card for full control. Clicking a card hands control to
// IntakeWizard with the scenario's defaults pre-filled.
import { SCENARIOS, CUSTOM_SCENARIO } from "../../lib/generator/scenarios.js";

function ScenarioCard({ scenario, onSelect }) {
  return (
    <button
      type="button"
      onClick={() => onSelect(scenario)}
      className="group flex h-full flex-col rounded-[24px] border p-5 text-left transition hover:border-amber-400/60"
      style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
    >
      <div className="mb-3 flex items-center gap-3">
        <div
          className="grid h-11 w-11 place-items-center rounded-2xl text-lg"
          style={{ background: "rgba(251, 191, 36, 0.1)" }}
        >
          <span aria-hidden>{scenario.icon || "📄"}</span>
        </div>
        <div className="text-base font-semibold" style={{ color: "var(--text)" }}>
          {scenario.name}
        </div>
      </div>

      <div className="mb-3 text-sm" style={{ color: "var(--text-2)" }}>
        {scenario.summary}
      </div>

      {scenario.tags && (
        <div className="mb-3 flex flex-wrap gap-1.5">
          {scenario.tags.map((t) => (
            <span
              key={t}
              className="rounded-full border px-2 py-0.5 text-[11px]"
              style={{ color: "var(--text-2)", borderColor: "var(--border)" }}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {scenario.whyThis && (
        <div
          className="mt-auto rounded-xl border border-dashed p-2.5 text-xs"
          style={{ borderColor: "var(--border)", color: "var(--text-2)" }}
        >
          <span className="font-medium" style={{ color: "var(--text)" }}>
            Why this:
          </span>{" "}
          {scenario.whyThis}
        </div>
      )}
    </button>
  );
}

export function ScenarioGallery({ onSelect, onSkip }) {
  return (
    <div
      className="rounded-[24px] border p-6"
      style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
    >
      <div className="mb-5">
        <div className="text-lg font-semibold" style={{ color: "var(--text)" }}>
          Start with a scenario
        </div>
        <div className="mt-1 text-sm" style={{ color: "var(--text-2)" }}>
          Each scenario pre-fills jurisdiction defaults, hides irrelevant questions,
          and auto-applies the right legal guardrails. Pick the closest fit — you
          can always customize.
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {SCENARIOS.map((s) => (
          <ScenarioCard key={s.id} scenario={s} onSelect={onSelect} />
        ))}
        <ScenarioCard scenario={CUSTOM_SCENARIO} onSelect={onSelect} />
      </div>

      {onSkip && (
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={onSkip}
            className="text-xs underline"
            style={{ color: "var(--text-2)" }}
          >
            Skip — use the classic flat form
          </button>
        </div>
      )}
    </div>
  );
}

export default ScenarioGallery;
