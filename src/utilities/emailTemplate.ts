/**
 * Branded HTML email wrapper for form-builder plugin.
 * Used by the `beforeEmail` hook in plugins/index.ts.
 */

const SITE_URL = 'https://chinyieggs.com'

export function wrapEmailHtml(html: string, subject: string, logoUrl?: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#F5F3EE;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;color:#1A1A1A;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#F5F3EE;padding:40px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;background:#FFFFFF;border:1px solid #E5E2DB;">
          <!-- Header -->
          <tr>
            <td style="padding:32px 40px 24px;text-align:center;border-bottom:1px solid #E5E2DB;">
              <a href="${SITE_URL}" style="text-decoration:none;">
                ${logoUrl ? `<img src="${logoUrl}" alt="Chinyi Eggs Technology" width="36" height="44" style="display:inline-block;vertical-align:middle;margin-right:12px;" />` : ''}
                <span style="font-size:16px;letter-spacing:0.2em;color:#1A1A1A;vertical-align:middle;font-weight:400;">CHINYI EGGS</span>
              </a>
            </td>
          </tr>
          <!-- Subject Banner -->
          <tr>
            <td style="padding:28px 40px 20px;text-align:center;">
              <h1 style="margin:0;font-size:20px;font-weight:600;color:#1A1A1A;letter-spacing:0.04em;">${subject}</h1>
              <div style="width:40px;height:2px;background:#E8380D;margin:16px auto 0;"></div>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="padding:8px 40px 32px;font-size:15px;line-height:1.8;color:#333;">
              ${html}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px;background:#FAFAF8;border-top:1px solid #E5E2DB;text-align:center;font-size:12px;color:#999;line-height:1.6;">
              <p style="margin:0 0 4px;">Chinyi Eggs Technology Co., Ltd.</p>
              <p style="margin:0 0 4px;">No. 37, Xinmin Road, Chiayi City 600, Taiwan</p>
              <p style="margin:0 0 12px;">Tel: +886-5-235-4049</p>
              <a href="${SITE_URL}" style="color:#E8380D;text-decoration:none;font-size:11px;letter-spacing:0.1em;text-transform:uppercase;">Visit Our Website</a>
            </td>
          </tr>
        </table>
        <!-- Below-card note -->
        <p style="margin:20px 0 0;font-size:11px;color:#AAA;text-align:center;">
          This is an automated message from Chinyi Eggs Technology. Please do not reply directly to this email.
        </p>
      </td>
    </tr>
  </table>
</body>
</html>`
}
