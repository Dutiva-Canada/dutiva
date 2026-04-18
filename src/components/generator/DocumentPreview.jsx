export default function DocumentPreview({ template, data }) {
  if (!template) return null;

  return (
    <div className="premium-card p-5 space-y-3">
      <div className="text-xs text-emerald-300">
        Preview (simulated)
      </div>

      <div className="text-sm text-zinc-400">
        {template}
      </div>

      <div className="text-xs text-zinc-500">
        This is a basic preview. Full rendering will be added next.
      </div>

      <pre className="text-xs bg-black/30 p-3 rounded overflow-auto">
        {JSON.stringify(data, null, 2)}
      </pre>
    </div>
  );
}
