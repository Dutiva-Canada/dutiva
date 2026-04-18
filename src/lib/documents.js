import { supabase } from "./supabase";

export async function saveDocument({ userId, title, template, content, formData }) {
  if (!supabase || !userId) {
    throw new Error("Saving is unavailable right now.");
  }

  const payload = {
    user_id: userId,
    title,
    template,
    content,
    form_data: formData,
  };

  const { data, error } = await supabase
    .from("documents")
    .insert([payload])
    .select()
    .single();

  if (error) throw error;
  return data;
}

export function exportDocumentAsText(title, content) {
  const blob = new Blob([content], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const safeName = (title || "dutiva-document")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  link.href = url;
  link.download = `${safeName || "dutiva-document"}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
