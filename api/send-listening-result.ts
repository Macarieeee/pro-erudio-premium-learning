import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type Breakdown = {
  p1: number;
  p2: number;
  p3: number;
  p4: number;
};

type DetailedAnswer = {
  part: string;
  questionId: number;
  questionText: string;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  points: number;
  maxPoints: number;
};

type ListeningResultPayload = {
  studentName: string;
  studentEmail: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  resultMessage: string;
  breakdown: Breakdown;
  detailedAnswers: DetailedAnswer[];
};

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const splitEmails = (value: string) =>
  value
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

const scoreCard = (label: string, value: string) => `
  <td style="padding: 12px; border: 1px solid #e5e7eb; border-radius: 10px; background: #f9fafb;">
    <div style="font-size: 12px; color: #6b7280; font-weight: 700;">${escapeHtml(label)}</div>
    <div style="font-size: 22px; color: #111827; font-weight: 800; margin-top: 4px;">${escapeHtml(value)}</div>
  </td>
`;

const buildStudentHtml = (data: ListeningResultPayload) => `
  <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6; max-width: 720px; margin: 0 auto;">
    <h2 style="margin-bottom: 8px;">FCE Listening Result</h2>
    <p style="margin-top: 0; color: #4b5563;">Hello ${escapeHtml(data.studentName)}, here is your Listening test result.</p>

    <div style="padding: 18px; border: 1px solid #e5e7eb; border-radius: 14px; background: #f9fafb; margin: 20px 0;">
      <div style="font-size: 13px; color: #6b7280; font-weight: 700;">Final score</div>
      <div style="font-size: 32px; font-weight: 800; color: #111827; margin-top: 4px;">
        ${escapeHtml(data.totalScore)} / ${escapeHtml(data.maxScore)} (${escapeHtml(data.percentage)}%)
      </div>
      <p style="margin-bottom: 0; color: #4b5563;">${escapeHtml(data.resultMessage)}</p>
    </div>

    <table style="width: 100%; border-spacing: 8px; margin: 0 -8px;">
      <tr>
        ${scoreCard("Part 1", `${data.breakdown.p1}/8`)}
        ${scoreCard("Part 2", `${data.breakdown.p2}/10`)}
      </tr>
      <tr>
        ${scoreCard("Part 3", `${data.breakdown.p3}/5`)}
        ${scoreCard("Part 4", `${data.breakdown.p4}/7`)}
      </tr>
    </table>

    <p style="font-size: 13px; color: #6b7280; margin-top: 24px;">
      This email was generated automatically from the Pro Erudio FCE Listening test.
    </p>
  </div>
`;

const buildTeacherHtml = (data: ListeningResultPayload) => {
  const rows = data.detailedAnswers
    .map(
      (item) => `
        <tr>
          <td style="border: 1px solid #e5e7eb; padding: 8px; vertical-align: top;">${escapeHtml(item.part)}</td>
          <td style="border: 1px solid #e5e7eb; padding: 8px; vertical-align: top;">${escapeHtml(item.questionId)}</td>
          <td style="border: 1px solid #e5e7eb; padding: 8px; vertical-align: top;">${escapeHtml(item.questionText)}</td>
          <td style="border: 1px solid #e5e7eb; padding: 8px; vertical-align: top;">${escapeHtml(item.studentAnswer)}</td>
          <td style="border: 1px solid #e5e7eb; padding: 8px; vertical-align: top;">${escapeHtml(item.correctAnswer)}</td>
          <td style="border: 1px solid #e5e7eb; padding: 8px; vertical-align: top; font-weight: 700; color: ${item.isCorrect ? "#047857" : "#b91c1c"};">
            ${item.isCorrect ? "Correct" : "Wrong"}
          </td>
          <td style="border: 1px solid #e5e7eb; padding: 8px; vertical-align: top;">${escapeHtml(item.points)} / ${escapeHtml(item.maxPoints)}</td>
        </tr>
      `
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6; max-width: 1100px; margin: 0 auto;">
      <h2 style="margin-bottom: 8px;">Teacher Report — FCE Listening</h2>
      <p style="margin-top: 0; color: #4b5563;">Full Listening report with student details, score breakdown and answer review.</p>

      <div style="padding: 16px; border: 1px solid #e5e7eb; border-radius: 14px; background: #f9fafb; margin: 20px 0;">
        <p style="margin: 0;"><strong>Student:</strong> ${escapeHtml(data.studentName)}</p>
        <p style="margin: 4px 0 0;"><strong>Email:</strong> ${escapeHtml(data.studentEmail)}</p>
        <p style="margin: 12px 0 0; font-size: 20px;"><strong>Final score:</strong> ${escapeHtml(data.totalScore)} / ${escapeHtml(data.maxScore)} (${escapeHtml(data.percentage)}%)</p>
      </div>

      <table style="width: 100%; border-spacing: 8px; margin: 0 -8px 20px;">
        <tr>
          ${scoreCard("Part 1", `${data.breakdown.p1}/8`)}
          ${scoreCard("Part 2", `${data.breakdown.p2}/10`)}
          ${scoreCard("Part 3", `${data.breakdown.p3}/5`)}
          ${scoreCard("Part 4", `${data.breakdown.p4}/7`)}
        </tr>
      </table>

      <h3 style="margin-top: 28px;">Answer review</h3>
      <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
        <thead>
          <tr style="background: #f3f4f6;">
            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: left;">Part</th>
            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: left;">Q</th>
            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: left;">Question</th>
            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: left;">Student answer</th>
            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: left;">Correct answer</th>
            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: left;">Status</th>
            <th style="border: 1px solid #e5e7eb; padding: 8px; text-align: left;">Points</th>
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>

      <p style="font-size: 13px; color: #6b7280; margin-top: 24px;">
        This email was generated automatically from the Pro Erudio FCE Listening test.
      </p>
    </div>
  `;
};

export default async function handler(req: any, res: any) {
  const allowedOrigins = [
    "http://localhost:5173",
    "http://localhost:8080",
    "https://tabere.proerudio.ro",
    "https://macarieeee.github.io",
    "https://macarieeee.github.io/pro-erudio-premium-learning",
    process.env.FRONTEND_URL,
  ].filter(Boolean) as string[];

  const origin = req.headers.origin;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const payload = req.body as ListeningResultPayload;

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: "Missing RESEND_API_KEY environment variable." });
    }

    const fromEmail = process.env.RESEND_FROM_EMAIL;
    const schoolEmail = process.env.SCHOOL_RESULTS_EMAIL;

    if (!fromEmail) {
      return res.status(500).json({ error: "Missing RESEND_FROM_EMAIL environment variable." });
    }

    if (!schoolEmail) {
      return res.status(500).json({ error: "Missing SCHOOL_RESULTS_EMAIL environment variable." });
    }

    if (!payload.studentName || !payload.studentEmail) {
      return res.status(400).json({ error: "Student name and student email are required." });
    }

    if (!Array.isArray(payload.detailedAnswers)) {
      return res.status(400).json({ error: "Detailed answers are required." });
    }

    const safeStudentName = escapeHtml(payload.studentName);
    const studentHtml = buildStudentHtml(payload);
    const teacherHtml = buildTeacherHtml(payload);

    const teacherEmailResult = await resend.emails.send({
      from: fromEmail,
      to: splitEmails(schoolEmail),
      subject: `Teacher Report - FCE Listening - ${payload.studentName}`,
      html: teacherHtml,
    });

    if (teacherEmailResult.error) {
      console.error("Resend teacher email error:", teacherEmailResult.error);
      return res.status(500).json({
        error: "Resend could not send the teacher email.",
        details: teacherEmailResult.error,
      });
    }

    const studentEmailResult = await resend.emails.send({
      from: fromEmail,
      to: [payload.studentEmail],
      subject: `FCE Listening Result - ${safeStudentName}`,
      html: studentHtml,
    });

    if (studentEmailResult.error) {
      console.error("Resend student email error:", studentEmailResult.error);

      return res.status(207).json({
        success: true,
        partial: true,
        message: "Teacher email was sent, but student email could not be sent.",
        details: studentEmailResult.error,
      });
    }

    return res.status(200).json({ success: true, partial: false });
  } catch (error) {
    console.error("Listening email error:", error);
    return res.status(500).json({ error: "Something went wrong while sending the listening result." });
  }
}
