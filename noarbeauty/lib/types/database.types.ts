export type Json = string | number | boolean | null | { [key: string]: Json } | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          plan: "free" | "pro" | "elite";
          analyses_used: number;
          stripe_customer_id: string | null;
          stripe_subscription_id: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["profiles"]["Row"], "created_at" | "updated_at">;
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
      };
      reports: {
        Row: {
          id: string;
          user_id: string;
          status: "pending" | "processing" | "completed" | "failed";
          language: "sr" | "bs" | "en";
          front_photo_url: string | null;
          left_photo_url: string | null;
          right_photo_url: string | null;
          results: Json | null;
          pdf_url: string | null;
          created_at: string;
          completed_at: string | null;
        };
        Insert: Omit<Database["public"]["Tables"]["reports"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["reports"]["Insert"]>;
      };
      payments: {
        Row: {
          id: string;
          user_id: string;
          stripe_payment_intent_id: string;
          amount: number;
          currency: string;
          status: string;
          created_at: string;
        };
        Insert: Omit<Database["public"]["Tables"]["payments"]["Row"], "created_at">;
        Update: Partial<Database["public"]["Tables"]["payments"]["Insert"]>;
      };
    };
    Views: {};
    Functions: {};
    Enums: {
      plan_type: "free" | "pro" | "elite";
      report_status: "pending" | "processing" | "completed" | "failed";
      language_code: "sr" | "bs" | "en";
    };
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
export type Report = Database["public"]["Tables"]["reports"]["Row"];
export type ReportResults = {
  overall: number;
  face_shape: string;
  jaw_class: string;
  scores: {
    symmetry: number;
    golden_ratio: number;
    jawline: number;
    canthal_tilt: number;
    nasofrontal_angle: number;
    nasolabial_angle: number;
    facial_thirds: number;
    eye_spacing: number;
    nose_width_ratio: number;
    lip_ratio: number;
    harmony: number;
    farkas_index: number;
  };
  measurements: Record<string, number>;
  skin?: {
    texture_score: number;
    pore_score: number;
    hyperpigmentation: number;
    hydration: number;
    acne_score: number;
  };
  ai_report: string;
  morph_url?: string;
};
