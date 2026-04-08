import { useCallback, useEffect, useRef, useState } from "react";
import { PenLine, Type } from "lucide-react";

const FONTS = [
  { label: "Cursive", value: "cursive", css: "italic 26px Georgia, 'Times New Roman', serif" },
  { label: "Script", value: "script", css: "italic 24px 'Palatino Linotype', Palatino, serif" },
  { label: "Print", value: "print", css: "20px 'Segoe UI', Arial, sans-serif" },
];

function renderTypedToCanvas(canvas, text, fontCss) {
  const ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  if (!text.trim()) return;
  ctx.font = fontCss;
  ctx.fillStyle = "#C49355";
  ctx.textBaseline = "middle";
  ctx.fillText(text, 20, canvas.height / 2);
}

export default function SignaturePad({ onSignatureChange }) {
  const canvasRef = useRef(null);
  const drawing = useRef(false);
  const [mode, setMode] = useState("draw"); // "draw" | "type"
  const [isEmpty, setIsEmpty] = useState(true);
  const [typedName, setTypedName] = useState("");
  const [selectedFont, setSelectedFont] = useState(FONTS[0]);

  // ── Canvas sizing ───────────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const dpr = window.devicePixelRatio || 1;
    canvas.width = canvas.offsetWidth * dpr;
    canvas.height = canvas.offsetHeight * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
  }, []);

  // ── Re-render typed signature when font/name changes ────────────────────────
  useEffect(() => {
    if (mode !== "type") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    // Convert to logical dimensions for rendering
    const logicalCanvas = { width: canvas.offsetWidth, height: canvas.offsetHeight };
    const ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    if (!typedName.trim()) {
      setIsEmpty(true);
      onSignatureChange(null);
      return;
    }
    const dpr = window.devicePixelRatio || 1;
    ctx.font = selectedFont.css;
    ctx.fillStyle = "#C49355";
    ctx.textBaseline = "middle";
    ctx.fillText(typedName, 20 * dpr, (logicalCanvas.height / 2) * dpr);
    setIsEmpty(false);
    onSignatureChange(canvas.toDataURL("image/png"), "typed");
  }, [typedName, selectedFont, mode, onSignatureChange]);

  // ── Draw handlers ───────────────────────────────────────────────────────────
  const getPos = (e, canvas) => {
    const rect = canvas.getBoundingClientRect();
    const dpr = window.devicePixelRatio || 1;
    const scaleX = (canvas.width / dpr) / rect.width;
    const scaleY = (canvas.height / dpr) / rect.height;
    if (e.touches) {
      return { x: (e.touches[0].clientX - rect.left) * scaleX, y: (e.touches[0].clientY - rect.top) * scaleY };
    }
    return { x: (e.clientX - rect.left) * scaleX, y: (e.clientY - rect.top) * scaleY };
  };

  const startDraw = useCallback((e) => {
    if (mode !== "draw") return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { x, y } = getPos(e, canvas);
    ctx.beginPath();
    ctx.moveTo(x, y);
    drawing.current = true;
  }, [mode]);

  const draw = useCallback((e) => {
    if (mode !== "draw" || !drawing.current) return;
    e.preventDefault();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const { x, y } = getPos(e, canvas);
    ctx.lineTo(x, y);
    ctx.strokeStyle = "#C49355";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.stroke();
    setIsEmpty(false);
    onSignatureChange(canvas.toDataURL("image/png"), "drawn");
  }, [mode, onSignatureChange]);

  const stopDraw = useCallback(() => { drawing.current = false; }, []);

  // ── Clear ───────────────────────────────────────────────────────────────────
  const clear = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    setIsEmpty(true);
    setTypedName("");
    onSignatureChange(null);
  }, [onSignatureChange]);

  // ── Switch mode ─────────────────────────────────────────────────────────────
  const switchMode = (newMode) => {
    clear();
    setMode(newMode);
  };

  return (
    <div className="space-y-4">
      {/* Mode tabs */}
      <div className="flex gap-2">
        {[{ id: "draw", icon: PenLine, label: "Draw" }, { id: "type", icon: Type, label: "Type" }].map(({ id, icon: Icon, label }) => (
          <button key={id} type="button" onClick={() => switchMode(id)}
            className={[
              "inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm font-medium transition",
              mode === id
                ? "border-amber-400/25 bg-amber-400/10 text-amber-300"
                : "border-white/8 bg-white/[0.02] text-zinc-400 hover:text-zinc-200",
            ].join(" ")}>
            <Icon className="h-3.5 w-3.5" />
            {label} signature
          </button>
        ))}
      </div>

      {/* Type mode: input + font picker */}
      {mode === "type" && (
        <div className="space-y-3">
          <input
            type="text"
            placeholder="Type your full legal name..."
            value={typedName}
            onChange={(e) => setTypedName(e.target.value)}
            className="w-full rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 outline-none placeholder:text-zinc-500 focus:border-amber-400/20"
          />
          <div className="flex gap-2">
            {FONTS.map((f) => (
              <button key={f.value} type="button" onClick={() => setSelectedFont(f)}
                className={[
                  "rounded-xl border px-3 py-1.5 text-sm transition",
                  selectedFont.value === f.value
                    ? "border-amber-400/25 bg-amber-400/10 text-amber-300"
                    : "border-white/8 bg-white/[0.02] text-zinc-400",
                  f.value === "script" ? "italic" : "",
                ].join(" ")}>
                {f.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Canvas (draw area or typed preview) */}
      <div className="relative overflow-hidden rounded-[18px] border border-white/8 bg-[#0E1218]">
        {/* Baseline guide */}
        <div className="pointer-events-none absolute bottom-[38%] left-5 right-5 border-b border-white/10" />
        <canvas
          ref={canvasRef}
          className="w-full"
          style={{ height: 140, touchAction: "none", cursor: mode === "draw" ? "crosshair" : "default" }}
          onMouseDown={startDraw}
          onMouseMove={draw}
          onMouseUp={stopDraw}
          onMouseLeave={stopDraw}
          onTouchStart={startDraw}
          onTouchMove={draw}
          onTouchEnd={stopDraw}
        />
        {isEmpty && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center text-sm text-zinc-500">
            {mode === "draw" ? "Draw your signature here" : "Type your name above to preview"}
          </div>
        )}
      </div>

      {/* Clear + legal note */}
      <div className="flex items-center justify-between gap-3">
        <button type="button" onClick={clear} className="ghost-button px-4 py-2 text-sm">
          Clear
        </button>
        <p className="text-xs text-zinc-500">
          {mode === "type" ? "Typed name" : "Handwritten"} signatures are legally binding under provincial <em>Electronic Transactions Acts</em> and PIPEDA.
        </p>
      </div>
    </div>
  );
}
