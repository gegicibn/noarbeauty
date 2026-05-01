"use client";
import { useState } from "react";
import { toast } from "sonner";

interface Props {
  reportId: string;
  pdfUrl?: string | null;
  showDownload?: boolean;
}

export default function ReportActions({ reportId, pdfUrl, showDownload }: Props) {
  const [generatingPDF, setGeneratingPDF] = useState(false);

  async function handlePDF() {
    if (pdfUrl) {
      window.open(pdfUrl, "_blank");
      return;
    }
    setGeneratingPDF(true);
    try {
      const res = await fetch(`/api/reports/${reportId}/pdf`, { method: "POST" });
      if (!res.ok) throw new Error("Greška pri generisanju PDF-a");
      const { url } = await res.json();
      window.open(url, "_blank");
      toast.success("PDF je spreman!");
    } catch {
      toast.error("Greška pri generisanju PDF-a. Pokušaj ponovo.");
    } finally {
      setGeneratingPDF(false);
    }
  }

  async function handleShare() {
    const url = `${window.location.origin}/reports/${reportId}`;
    if (navigator.share) {
      await navigator.share({ title: "Moj NoarBeauty AI izveštaj", url });
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Link kopiran!");
    }
  }

  if (showDownload) {
    return (
      <button
        onClick={handlePDF}
        disabled={generatingPDF}
        className="btn-primary disabled:opacity-50"
      >
        {generatingPDF ? "Generišem..." : pdfUrl ? "Preuzmi PDF" : "Generiši PDF"}
      </button>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <button
        onClick={handleShare}
        className="btn-ghost text-xs px-3 py-2"
      >
        Podeli
      </button>
      <button
        onClick={handlePDF}
        disabled={generatingPDF}
        className="btn-outline text-xs px-3 py-2 disabled:opacity-50"
      >
        {generatingPDF ? "..." : "PDF"}
      </button>
    </div>
  );
}
