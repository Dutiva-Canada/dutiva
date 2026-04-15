// IntakeWizard — step-by-step runner over the schema.
// Groups questions by their `group` key and paginates one group per step.
// Applies scenario defaults on mount, runs visibility + derived fields on
// every answer change, and hands the resulting form shape to onComplete.
import { useMemo, useState } from "react";
import {
  QUESTIONS,
  QUESTION_GROUPS,
  getVisibleQuestions,
  applyDerived,
  answersToForm,
} from "../../lib/generator/schema.js";
import QuestionField from "./QuestionField.jsx";

function buildStepsFromFlow(flowIds) {
  // Preserve scenario question order while grouping by `group`, so a scenario
  // that lists [jurisdiction, companyName, jobTitle] doesn't get reordered.
  const visible = getVisibleQuestions({}, flowIds);
  const groupOrder = [];
  const groups = new Map();
  for (const q of visible) {
    const g = q.group || "misc";
    if (!groups.has(g)) {
      groups.set(g, []);
      groupOrder.push(g);
    }
    groups.get(g).push(q);
  }
  return groupOrder.map((g) => ({
    id: g,
    label:
      (QUESTION_GROUPS.find((x) => x.id === g) || {}).label ||
      g.replace(/^./, (c) => c.toUpperCase()),
    questionIds: groups.get(g).map((q) => q.id),
  }));
}

export function IntakeWizard({ scenario, onComplete, onCancel }) {
  const [answers, setAnswers] = useState(() => ({
    ...(scenario?.defaultAnswers || {}),
  }));
  const [stepIndex, setStepIndex] = useState(0);

  const steps = useMemo(
    () => buildStepsFromFlow(scenario?.questionFlow || null),
    [scenario],
  );

  const visibleByFlow = useMemo(
    () => getVisibleQuestions(applyDerived(answers), scenario?.questionFlow || null),
    [answers, scenario],
  );

  const stepQuestions = useMemo(() => {
    if (!steps[stepIndex]) return [];
    const ids = new Set(steps[stepIndex].questionIds);
    return visibleByFlow.filter((q) => ids.has(q.id));
  }, [steps, stepIndex, visibleByFlow]);

  const missingRequired = useMemo(() => {
    return stepQuestions.filter((q) => {
      if (!q.required) return false;
      const v = answers[q.mapsTo || q.id];
      return v === undefined || v === "" || v === null;
    });
  }, [stepQuestions, answers]);

  const setAnswer = (questionId, value) => {
    const q = QUESTIONS.find((x) => x.id === questionId);
    const key = q?.mapsTo || questionId;
    setAnswers((prev) => ({ ...prev, [key]: value }));
  };

  const isLastStep = stepIndex >= steps.length - 1;

  const goNext = () => {
    if (missingRequired.length > 0) return;
    if (isLastStep) {
      onComplete({
        form: answersToForm(answers),
        template: scenario?.suggestedTemplate || "Offer Letter",
        scenarioId: scenario?.id || null,
      });
    } else {
      setStepIndex((i) => i + 1);
    }
  };

  const goBack = () => {
    if (stepIndex === 0) {
      onCancel?.();
      return;
    }
    setStepIndex((i) => i - 1);
  };

  return (
    <div
      className="rounded-[24px] border p-6"
      style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
    >
      {/* Header */}
      <div className="mb-5 flex items-start justify-between gap-4">
        <div>
          <div className="text-xs uppercase tracking-wider" style={{ color: "var(--text-2)" }}>
            {scenario?.name || "Custom intake"}
          </div>
          <div className="text-lg font-semibold" style={{ color: "var(--text)" }}>
            {steps[stepIndex]?.label || "Review"}
          </div>
        </div>
        <div className="text-sm" style={{ color: "var(--text-2)" }}>
          Step {Math.min(stepIndex + 1, steps.length)} of {steps.length}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-6 h-1.5 w-full overflow-hidden rounded-full" style={{ background: "var(--border)" }}>
        <div
          className="h-full transition-all"
          style={{
            width: `${((stepIndex + 1) / Math.max(steps.length, 1)) * 100}%`,
            background: "rgb(251, 191, 36)",
          }}
        />
      </div>

      {/* Questions */}
      <div className="grid gap-4 md:grid-cols-2">
        {stepQuestions.map((q) => (
          <QuestionField
            key={q.id}
            question={q}
            value={answers[q.mapsTo || q.id]}
            onChange={(v) => setAnswer(q.id, v)}
          />
        ))}
      </div>

      {/* Missing-required reminder */}
      {missingRequired.length > 0 && (
        <div
          className="mt-5 rounded-xl border px-3 py-2 text-xs"
          style={{ borderColor: "rgba(251, 191, 36, 0.4)", color: "var(--text-2)", background: "rgba(251, 191, 36, 0.08)" }}
        >
          Required: {missingRequired.map((q) => q.label).join(", ")}
        </div>
      )}

      {/* Nav */}
      <div className="mt-6 flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={goBack}
          className="rounded-xl border px-4 py-2 text-sm"
          style={{ color: "var(--text-2)", borderColor: "var(--border)" }}
        >
          {stepIndex === 0 ? "Back to scenarios" : "Back"}
        </button>
        <button
          type="button"
          onClick={goNext}
          disabled={missingRequired.length > 0}
          className="rounded-xl px-4 py-2 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-40"
          style={{ background: "rgb(251, 191, 36)" }}
        >
          {isLastStep ? "Generate preview →" : "Next →"}
        </button>
      </div>
    </div>
  );
}

export default IntakeWizard;
