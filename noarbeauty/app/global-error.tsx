"use client";
import * as Sentry from "@sentry/nextjs";
import { useEffect } from "react";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
      Sentry.captureException(error);
    }
  }, [error]);

  return (
    <html lang="sr">
      <body style={{ background: "#0a0a0a", color: "#e8e8e8", display: "flex", alignItems: "center", justifyContent: "center", minHeight: "100vh", fontFamily: "sans-serif", textAlign: "center" }}>
        <div>
          <div style={{ fontSize: 48, marginBottom: 16 }}>⚠️</div>
          <h2 style={{ fontSize: 20, marginBottom: 8 }}>Nešto je pošlo naopako</h2>
          <p style={{ color: "#666", marginBottom: 24, fontSize: 14 }}>Naš tim je obavešten. Pokušaj ponovo.</p>
          <button
            onClick={reset}
            style={{ background: "linear-gradient(135deg,#c9a96e,#e8c98a)", color: "#000", border: "none", padding: "12px 28px", borderRadius: 100, fontWeight: 700, cursor: "pointer" }}
          >
            Pokušaj ponovo
          </button>
        </div>
      </body>
    </html>
  );
}
