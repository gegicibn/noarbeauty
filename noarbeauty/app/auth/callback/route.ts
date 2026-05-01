import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const next = url.searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { data } = await supabase.auth.exchangeCodeForSession(code);

    // New OAuth users (created_at ≈ now) go to onboarding
    if (data?.user) {
      const createdAt = new Date(data.user.created_at).getTime();
      const isNewUser = Date.now() - createdAt < 30_000; // within 30s of creation
      if (isNewUser && next === "/dashboard") {
        return NextResponse.redirect(new URL("/onboarding", request.url));
      }
    }
  }

  return NextResponse.redirect(new URL(next, request.url));
}
