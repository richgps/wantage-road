import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export const runtime = "nodejs";

export async function POST(req: Request) {
  try {
    const { name, email, subject, message } = await req.json();

    const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, BASE_URL } = process.env;

    if (!SMTP_HOST || !SMTP_PORT || !SMTP_USER || !SMTP_PASS) {
      console.error("Missing SMTP configuration");
      return NextResponse.json({ ok: false, error: "Email not configured" }, { status: 500 });
    }

    // Use BASE_URL for unsubscribe link or default
    const unsubscribeUrl = `${BASE_URL ?? "https://wantageroad.org.uk"}/unsubscribe`;

    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: Number(SMTP_PORT),
      auth: {
        user: SMTP_USER,
        pass: SMTP_PASS,
      },
    });

    // Build HTML with inline styling and preheader
    const htmlBody = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>New Contact Submission</title>
        <style>
          body { margin: 0; padding: 0; background: #f4f4f4; font-family: Arial, sans-serif; }
          .container { max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 8px; overflow: hidden; }
          .header { background: #d35b1c; color: #ffffff; padding: 10px; text-align: center; }
          .content { padding: 20px; color: #333333; line-height: 1.5; }
          .footer { font-size: 12px; color: #777777; padding: 10px 20px; background: #f0f0f0; text-align: center; }
          a.button { display: inline-block; padding: 10px 15px; background: #d35b1c; color: #ffffff !important; text-decoration: none; border-radius: 4px; }
        </style>
      </head>
      <body>
        <!-- Preheader -->
        <div style="display:none; max-height:0; overflow:hidden;">You’ve got a new enquiry via WantageRoad.org.uk.</div>
        <div class="container">
          <div class="header">
            <h2>New web enquiry</h2>
          </div>
          <div class="content">
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
            <p><strong>Subject:</strong> ${subject}</p>
            <hr />
            <p>${message}</p>
          </div>
          <div class="footer">
            <p>Wantage Road | <a href="https://wantageroad.org.uk" target="_blank">wantageroad.org.uk</a></p>
            <p>You’re receiving this because someone filled out the contact form at wantageroad.org.uk</p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Plain-text alternative
    const textBody = `
Name: ${name}
Email: ${email}
Subject: ${subject}

${message}

—
You’re receiving this because someone filled out the contact form at wantageroad.org.uk.
    `;

    await transporter.sendMail({
      from: 'Wantage Road <hello@wantageroad.org.uk>',
      to: 'hello@wantageroad.org.uk',
      replyTo: email,
      envelope: {
        from: 'hello@wantageroad.org.uk',
        to: 'hello@wantageroad.org.uk'
      },
      subject: `${subject}`,
      headers: {
        'List-Unsubscribe': `<${unsubscribeUrl}>`
      },
      text: textBody,
      html: htmlBody
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
