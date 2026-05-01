import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const FROM = "NoarBeauty AI <noreply@noarbeauty.ai>";

export async function sendReportReady(to: string, reportId: string, overallScore: number) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: `Tvoj izveštaj je spreman — ocena: ${overallScore}/100`,
    html: `
      <!DOCTYPE html>
      <html lang="sr">
      <head><meta charset="UTF-8" /><meta name="viewport" content="width=device-width" /></head>
      <body style="margin:0;background:#0a0a0a;font-family:sans-serif;color:#e8e8e8;">
        <div style="max-width:520px;margin:0 auto;padding:48px 24px;">
          <div style="font-size:20px;font-weight:700;margin-bottom:32px;">
            noar<span style="color:#c9a96e">beauty</span>.ai
          </div>
          <div style="background:#111;border:1px solid #222;border-radius:16px;padding:32px;margin-bottom:24px;">
            <h1 style="font-size:22px;font-weight:700;margin:0 0 12px;">
              Tvoja analiza je gotova! 🎉
            </h1>
            <p style="color:#888;font-size:15px;margin:0 0 24px;line-height:1.6;">
              Kompletna cefalometrijska analiza lica je završena.
            </p>
            <div style="text-align:center;margin-bottom:28px;">
              <div style="font-size:72px;font-weight:900;background:linear-gradient(135deg,#c9a96e,#e8c98a);-webkit-background-clip:text;-webkit-text-fill-color:transparent;">
                ${overallScore}
              </div>
              <div style="color:#666;font-size:14px;">ukupna ocena / 100</div>
            </div>
            <a
              href="${process.env.NEXT_PUBLIC_APP_URL}/reports/${reportId}"
              style="display:block;text-align:center;background:linear-gradient(135deg,#c9a96e,#e8c98a);color:#000;font-weight:700;font-size:15px;padding:14px;border-radius:100px;text-decoration:none;"
            >
              Pogledaj kompletan izveštaj →
            </a>
          </div>
          <p style="font-size:12px;color:#444;text-align:center;line-height:1.6;">
            NoarBeauty AI · Analiza je informativna i ne predstavlja medicinsku dijagnozu.
          </p>
        </div>
      </body>
      </html>
    `,
  });
}

export async function sendWelcome(to: string, name: string) {
  return resend.emails.send({
    from: FROM,
    to,
    subject: "Dobrodošao na NoarBeauty AI",
    html: `
      <!DOCTYPE html>
      <html lang="sr">
      <body style="margin:0;background:#0a0a0a;font-family:sans-serif;color:#e8e8e8;">
        <div style="max-width:520px;margin:0 auto;padding:48px 24px;">
          <div style="font-size:20px;font-weight:700;margin-bottom:32px;">
            noar<span style="color:#c9a96e">beauty</span>.ai
          </div>
          <div style="background:#111;border:1px solid #222;border-radius:16px;padding:32px;">
            <h1 style="font-size:22px;font-weight:700;margin:0 0 12px;">Zdravo, ${name}! 👋</h1>
            <p style="color:#888;font-size:15px;margin:0 0 24px;line-height:1.6;">
              Imaš 2 besplatne analize. Počni sada — treba ti samo 3 fotografije.
            </p>
            <a
              href="${process.env.NEXT_PUBLIC_APP_URL}/upload"
              style="display:block;text-align:center;background:linear-gradient(135deg,#c9a96e,#e8c98a);color:#000;font-weight:700;font-size:15px;padding:14px;border-radius:100px;text-decoration:none;"
            >
              Počni prvu analizu →
            </a>
          </div>
        </div>
      </body>
      </html>
    `,
  });
}
