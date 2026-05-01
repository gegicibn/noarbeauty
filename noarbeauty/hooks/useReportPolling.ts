"use client";
import { useEffect, useState, useRef } from "react";
import { createClient } from "@/lib/supabase/client";

type Status = "pending" | "processing" | "completed" | "failed";

export function useReportPolling(reportId: string, initialStatus: Status) {
  const [status, setStatus] = useState<Status>(initialStatus);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);
  const supabase = createClient();

  useEffect(() => {
    if (status === "completed" || status === "failed") return;

    async function poll() {
      const { data } = await supabase
        .from("reports")
        .select("status")
        .eq("id", reportId)
        .single();

      if (data?.status) {
        setStatus(data.status as Status);
        if (data.status === "completed" || data.status === "failed") {
          if (intervalRef.current) clearInterval(intervalRef.current);
          // Refresh stranice da prikaže rezultate
          if (data.status === "completed") window.location.reload();
        }
      }
    }

    intervalRef.current = setInterval(poll, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [reportId, status, supabase]);

  return status;
}
