"use server";
import { createClient } from "@/lib/supabase/server";
import { sendReportReady } from "@/lib/email/resend";

export async function triggerReportEmail(reportId: string, overallScore: number) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user?.email) return;
    await sendReportReady(user.email, reportId, overallScore);
  } catch {
    // Email je opcija, ne blokira tok
  }
}
