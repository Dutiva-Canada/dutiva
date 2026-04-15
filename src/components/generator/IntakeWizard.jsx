// Dutiva — Step-by-step intake wizard.
// Drives the user through the scenario's ordered questionFlow, skipping any
// questions whose `visibleIf` doesn't pass at the moment they're reached.
// On completion, calls onComplete(formFields) where formFields is a flat
// object keyed by form field name, ready to merge into GeneratorPage state.

import { useMemo, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import QuestionField from "./QuestionField.jsx";
import {
  resolveVisibleQuestions,
  validateAnswer,
  answersToFormFields,
  QUESTIONS,
} from "../../lib/generator/schema.js";
import { getScenario } from "../../lib/generator/scenarios.js";

export default function IntakeWizard({ scenarioId, onComplete, onCancel }) {
  const scenario = useMemo(() => getScenario(scenarioId), [scenarioId]);

  // Initialize answers with scenario defaults + sensible blank-canvas values
  // for question types that need them.
  const initialAnswers = useMemo(() => {
    const base = {};
    for (const q of QUESTIONS) {
      if (q.defaultValue !== undefined) base[q.id] = q.defaultValue;
    }
    return { ...base, ...(scenario?.defaultAnswers || {}) };
  }, [scenario]);

  const [answers, setAnswers] = useState(initialAnswers);
  const [stepIndex, setStepIndex] = useState(0);
  const [errors, setErrors] = useState({});

  const visibleQuestions = useMemo(
    () => resolveVisibleQuestions(scenario?.questionFlow || [], answers),
    [scenario, answers],
  );

  const total = visibleQuestions.length;
  const current = visibleQuestions[stepIndex] || null;

  if (!scenario) {
    return (
      <div className="rounded-2xl border p-6" style={{ borderColor: "var(--border)" }}>
        <p style={{ color: "var(--text)" }}>Scenario not found.</p>
      </div>
    );
  }

  const setAnswer = (id, value) => {
    setAnswers((prev) => ({ ...prev, [id]: value }));
    // Clear the error for this field as the user edits
    setErrors((prev) => {
      if (!prev[id]) return prev;
      const next = { ...prev };
      delete next[id];
      return next;
    });
  };

  const handleNext = () => {
    if (!current) return;
    const err = validateAnswer(current, answers[current.id]);
    if (err) {
      setErrors((prev) => ({ ...prev, [current.id]: err }));
      return;
    }
    if (stepIndex >= total - 1) {
      // Done — compose form fields and hand off
      const formFields = answersToFormFields(answers);
      onComplete(formFields, { scenarioId: scenario.id, template: scenario.suggestedTemplate, answers });
      return;
    }
    setStepIndex((i) => i + 1);
  };

  const handleBack = () => {
    if (stepIndex === 0) {
      if (onCancel) onCancel();
      return;
    }
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const progress = total === 0 ? 100 : Math.round(((stepIndex + 1) / total) * 100);

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <div className="text-xs uppercase tracking-wide" style={{ color: "var(--text-2)" }}>
            {scenario.emoji} {scenario.name}
          </div>
          <div className="mt-1 text-lg font-semibold" style={{ color: "var(--text)" }}>
            {current ? current.section : "All set"}
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs" style={{ color: "var(--text-2)" }}>
            Question {Math.min(stepIndex + 1, total)} of {total}
          </div>
          <div className="mt-1 h-1.5 w-32 overflow-hidden rounded-full" style={{ background: "var(--border)" }}>
            <div
              className="h-full bg-amber-400 transition-all"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      </div>

      <div
        className="rounded-2xl border p-5"
        style={{ background: "var(--bg-elevated)", borderColor: "var(--border)" }}
      >
        {current ? (
          <QuestionField
            question={current}
            value={answers[current.id]}
            onChange={(v) => setAnswer(current.id, v)}
            error={errors[current.id]}
          />
        ) : (
          <div className="flex items-center gap-3 text-sm" style={{ color: "var(--text)" }}>
            <CheckCircle2 className="h-5 w-5 text-emerald-400" />
            All required questions answered. Click Finish to generate the preview.
          </div>
        )}
      </div>

      <div className="flex items-center justify-between">
        <button
          type="button"
          onClick={handleBack}
          className="inline-flex items-center gap-1 rounded-xl border px-4 py-2 text-sm"
          style={{ borderColor: "var(--border)", color: "var(--text)" }}
        >
          <ArrowLeft className="h-4 w-4" />
          {stepIndex === 0 ? "Cancel" : "Back"}
        </button>
        <button
          type="button"
          onClick={handleNext}
          className="inline-flex items-center gap-1 rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-black transition hover:bg-amber-300"
        >
          {stepIndex >= total - 1 ? "Finish" : "Next"}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
