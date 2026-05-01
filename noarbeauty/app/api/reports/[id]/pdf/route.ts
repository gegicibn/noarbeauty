import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import type { ReportResults } from "@/lib/types/database.types";

export async function POST(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { data: report } = await supabase
    .from("reports")
    .select("*")
    .eq("id", id)
    .eq("user_id", user.id)
    .single();

  if (!report || !report.results) {
    return NextResponse.json({ error: "Izveštaj nije pronađen" }, { status: 404 });
  }

  // Ako PDF već postoji, vrati ga
  if (report.pdf_url) {
    return NextResponse.json({ url: report.pdf_url });
  }

  try {
    const { generatePDF } = await import("@/lib/pdf/generator");
    const pdfBuffer = await generatePDF(report.results as ReportResults, id);

    const fileName = `reports/${user.id}/${id}.pdf`;
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from("reports")
      .upload(fileName, pdfBuffer, {
        contentType: "application/pdf",
        upsert: true,
      });

    if (uploadError) throw uploadError;

    const { data: urlData } = supabase.storage
      .from("reports")
      .getPublicUrl(fileName);

    const pdfUrl = urlData.publicUrl;

    await supabase
      .from("reports")
      .update({ pdf_url: pdfUrl })
      .eq("id", id);

    return NextResponse.json({ url: pdfUrl });
  } catch (err) {
    console.error("PDF generation error:", err);
    return NextResponse.json({ error: "Greška pri generisanju PDF-a" }, { status: 500 });
  }
}
