import { Resend } from "resend";

type SendEmailInput = {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
};

type ConsultationEmailInput = {
  name: string;
  email: string;
  budget: string;
  notes?: string | null;
  consultationId: string;
};

type PaymentEmailInput = {
  name: string;
  email: string;
  planLabel: string;
  amount: number;
  paymentId?: string | null;
  consultationId?: string | null;
};

export async function sendEmail({ to, subject, html, replyTo }: SendEmailInput) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM || "Watchwise India <onboarding@resend.dev>";

  if (!apiKey) {
    return { skipped: true, reason: "missing_resend_api_key" };
  }

  const resend = new Resend(apiKey);

  return resend.emails.send({
    from,
    to,
    subject,
    html,
    replyTo,
  });
}

export async function sendConsultationLeadEmails(input: ConsultationEmailInput) {
  const adminEmail = process.env.ADMIN_EMAIL;

  await sendEmail({
    to: input.email,
    subject: "We received your Watchwise consultation request",
    html: baseTemplate({
      title: "Your consultation request is in.",
      eyebrow: "Watchwise consultation",
      body: `
        <p>Hi ${escapeHtml(input.name)},</p>
        <p>We have received your watch consultation request. Your next step is to complete payment and book a call slot. Once payment is confirmed, we will prepare your shortlist with sizing and retailer notes.</p>
        <p><strong>Budget:</strong> ${escapeHtml(input.budget)}</p>
        <p><strong>Reference ID:</strong> ${escapeHtml(input.consultationId)}</p>
      `,
    }),
  });

  if (adminEmail) {
    await sendEmail({
      to: adminEmail,
      replyTo: input.email,
      subject: `New consultation lead: ${input.name}`,
      html: baseTemplate({
        title: "New consultation lead",
        eyebrow: "Admin alert",
        body: `
          <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
          <p><strong>Budget:</strong> ${escapeHtml(input.budget)}</p>
          <p><strong>Notes:</strong> ${escapeHtml(input.notes || "No notes provided")}</p>
          <p><strong>Consultation ID:</strong> ${escapeHtml(input.consultationId)}</p>
        `,
      }),
    });
  }
}

export async function sendPaymentCapturedEmails(input: PaymentEmailInput) {
  const adminEmail = process.env.ADMIN_EMAIL;
  const formattedAmount = formatPaise(input.amount);

  await sendEmail({
    to: input.email,
    subject: "Your Watchwise consultation payment is confirmed",
    html: baseTemplate({
      title: "Payment confirmed.",
      eyebrow: "Watchwise payment",
      body: `
        <p>Hi ${escapeHtml(input.name)},</p>
        <p>Your payment for <strong>${escapeHtml(input.planLabel)}</strong> has been confirmed.</p>
        <p><strong>Amount:</strong> ${formattedAmount}</p>
        <p><strong>Payment ID:</strong> ${escapeHtml(input.paymentId || "Pending from provider")}</p>
        <p>Book your call slot if you have not already. We will use your form details and wrist-size context to prepare the shortlist.</p>
      `,
    }),
  });

  if (adminEmail) {
    await sendEmail({
      to: adminEmail,
      replyTo: input.email,
      subject: `Paid consultation: ${input.name} / ${formattedAmount}`,
      html: baseTemplate({
        title: "Paid consultation received",
        eyebrow: "Revenue alert",
        body: `
          <p><strong>Name:</strong> ${escapeHtml(input.name)}</p>
          <p><strong>Email:</strong> ${escapeHtml(input.email)}</p>
          <p><strong>Plan:</strong> ${escapeHtml(input.planLabel)}</p>
          <p><strong>Amount:</strong> ${formattedAmount}</p>
          <p><strong>Payment ID:</strong> ${escapeHtml(input.paymentId || "Pending from provider")}</p>
          <p><strong>Consultation ID:</strong> ${escapeHtml(input.consultationId || "Not linked")}</p>
        `,
      }),
    });
  }
}

function baseTemplate({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body: string;
}) {
  return `
    <div style="margin:0;background:#0d0d0d;padding:32px;font-family:Inter,Arial,sans-serif;color:#f7f1e8">
      <div style="max-width:620px;margin:0 auto;border:1px solid rgba(255,255,255,.12);border-radius:10px;background:#141414;padding:32px">
        <p style="margin:0 0 16px;color:#d6b56d;font-size:12px;text-transform:uppercase;letter-spacing:.08em">${escapeHtml(eyebrow)}</p>
        <h1 style="margin:0 0 24px;font-family:Georgia,serif;font-weight:400;font-size:34px;line-height:1.05;color:#fff">${escapeHtml(title)}</h1>
        <div style="font-size:15px;line-height:1.7;color:#d6d0c7">${body}</div>
        <div style="margin-top:32px;padding-top:20px;border-top:1px solid rgba(255,255,255,.12);font-size:12px;color:#8f887e">
          Watchwise India · Editorial watch intelligence for Indian buyers
        </div>
      </div>
    </div>
  `;
}

function formatPaise(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(value / 100);
}

function escapeHtml(value: string) {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}
