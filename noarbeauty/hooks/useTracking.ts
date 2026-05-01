"use client";
import { usePostHog } from "posthog-js/react";
import { useCallback } from "react";

export function useTracking() {
  const posthog = usePostHog();

  const track = useCallback((event: string, props?: Record<string, unknown>) => {
    try {
      posthog?.capture(event, props);
    } catch {
      // PostHog je opcija — ne blokira
    }
  }, [posthog]);

  return {
    trackUploadStarted:    ()                        => track("upload_started"),
    trackAnalysisStarted:  (language: string)        => track("analysis_started", { language }),
    trackAnalysisCompleted:(overall: number)         => track("analysis_completed", { overall }),
    trackReportViewed:     (reportId: string)        => track("report_viewed", { report_id: reportId }),
    trackPDFGenerated:     ()                        => track("pdf_generated"),
    trackUpgradeClicked:   (plan: string)            => track("upgrade_clicked", { plan }),
    trackSignUp:           (method: string)          => track("sign_up", { method }),
    trackSignIn:           (method: string)          => track("sign_in", { method }),
  };
}
