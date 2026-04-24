import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type ScoreBreakdown = {
  p1: number;
  p2: number;
  p3: number;
  p4: number;
  p5: number;
  p6: number;
  p7: number;
};

type DetailedAnswer = {
  questionId: number;
  part: string;
  studentAnswer: string;
  correctAnswer: string;
  isCorrect: boolean;
  points: number;
  maxPoints: number;
};

type ReadingResultPayload = {
  studentName: string;
  studentEmail: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  resultMessage: string;
  breakdown: ScoreBreakdown;
  detailedAnswers?: DetailedAnswer[];
};

const allowedOrigins = [
  "http://localhost:5173",
  "http://localhost:8080",
  "https://tabere.proerudio.ro",
  "https://macarieeee.github.io",
  "https://macarieeee.github.io/pro-erudio-premium-learning",
  process.env.FRONTEND_URL,
].filter(Boolean) as string[];

function setCorsHeaders(req: any, res: any) {
  const origin = req.headers.origin as string | undefined;

  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

function escapeHtml(value: unknown) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function buildBreakdownRows(breakdown: ScoreBreakdown) {
  return `
    <tr><td style="padding:10px;border:1px solid #e5e7eb;">Part 1</td><td style="padding:10px;border:1px solid #e5e7eb;"><strong>${breakdown.p1}/8</strong></td></tr>
    <tr><td style="padding:10px;border:1px solid #e5e7eb;">Part 2</td><td style="padding:10px;border:1px solid #e5e7eb;"><strong>${breakdown.p2}/8</strong></td></tr>
    <tr><td style="padding:10px;border:1px solid #e5e7eb;">Part 3</td><td style="padding:10px;border:1px solid #e5e7eb;"><strong>${breakdown.p3}/8</strong></td></tr>
    <tr><td style="padding:10px;border:1px solid #e5e7eb;">Part 4</td><td style="padding:10px;border:1px solid #e5e7eb;"><strong>${breakdown.p4}/12</strong></td></tr>
    <tr><td style="padding:10px;border:1px solid #e5e7eb;">Part 5</td><td style="padding:10px;border:1px solid #e5e7eb;"><strong>${breakdown.p5}/12</strong></td></tr>
    <tr><td style="padding:10px;border:1px solid #e5e7eb;">Part 6</td><td style="padding:10px;border:1px solid #e5e7eb;"><strong>${breakdown.p6}/12</strong></td></tr>
    <tr><td style="padding:10px;border:1px solid #e5e7eb;">Part 7</td><td style="padding:10px;border:1px solid #e5e7eb;"><strong>${breakdown.p7}/10</strong></td></tr>
  `;
}

function buildStudentHtml(data: {
  safeStudentName: string;
  safeStudentEmail: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  safeResultMessage: string;
  breakdown: ScoreBreakdown;
}) {
  return `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6; max-width: 680px; margin: 0 auto;">
      <div style="padding: 24px; border: 1px solid #e5e7eb; border-radius: 14px; background: #ffffff;">
        <h2 style="margin: 0 0 16px; color: #111827;">FCE Reading & Use of English Result</h2>
        <p style="margin: 0 0 6px;"><strong>Student:</strong> ${data.safeStudentName}</p>
        <p style="margin: 0 0 18px;"><strong>Email:</strong> ${data.safeStudentEmail}</p>

        <div style="padding: 18px; border-radius: 12px; background: #f9fafb; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #6b7280;">Final score</p>
          <p style="margin: 6px 0 0; font-size: 28px; font-weight: 700; color: #111827;">
            ${data.totalScore} / ${data.maxScore} <span style="font-size: 18px; color: #4b5563;">(${data.percentage}%)</span>
          </p>
          <p style="margin: 10px 0 0;"><strong>Result:</strong> ${data.safeResultMessage}</p>
        </div>

        <h3 style="margin: 24px 0 12px;">Score breakdown</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tbody>${buildBreakdownRows(data.breakdown)}</tbody>
        </table>

        <p style="margin-top: 24px; font-size: 12px; color: #6b7280;">
          This email was generated automatically from the Pro Erudio FCE Reading test.
        </p>
      </div>
    </div>
  `;
}

function buildTeacherHtml(data: {
  safeStudentName: string;
  safeStudentEmail: string;
  totalScore: number;
  maxScore: number;
  percentage: number;
  safeResultMessage: string;
  breakdown: ScoreBreakdown;
  detailedAnswers: DetailedAnswer[];
}) {
  const answerRows = data.detailedAnswers
    .map((row) => {
      const isCorrect = Boolean(row.isCorrect);
      const status = isCorrect ? "Correct" : row.points > 0 ? "Partial" : "Wrong";
      const bg = isCorrect ? "#ecfdf5" : row.points > 0 ? "#fffbeb" : "#fef2f2";
      const color = isCorrect ? "#047857" : row.points > 0 ? "#92400e" : "#b91c1c";

      return `
        <tr>
          <td style="padding:8px;border:1px solid #e5e7eb;">${escapeHtml(row.part)}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;text-align:center;">${escapeHtml(row.questionId)}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;">${escapeHtml(row.studentAnswer || "—")}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;">${escapeHtml(row.correctAnswer || "—")}</td>
          <td style="padding:8px;border:1px solid #e5e7eb;text-align:center;"><strong>${escapeHtml(row.points)}/${escapeHtml(row.maxPoints)}</strong></td>
          <td style="padding:8px;border:1px solid #e5e7eb;background:${bg};color:${color};font-weight:700;text-align:center;">${status}</td>
        </tr>
      `;
    })
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6; max-width: 920px; margin: 0 auto;">
      <div style="padding: 24px; border: 1px solid #e5e7eb; border-radius: 14px; background: #ffffff;">
        <h2 style="margin: 0 0 16px; color: #111827;">Detailed FCE Reading Result — Teacher Report</h2>
        <p style="margin: 0 0 6px;"><strong>Student:</strong> ${data.safeStudentName}</p>
        <p style="margin: 0 0 18px;"><strong>Student email:</strong> ${data.safeStudentEmail}</p>

        <div style="padding: 18px; border-radius: 12px; background: #f9fafb; margin: 20px 0;">
          <p style="margin: 0; font-size: 14px; color: #6b7280;">Final score</p>
          <p style="margin: 6px 0 0; font-size: 28px; font-weight: 700; color: #111827;">
            ${data.totalScore} / ${data.maxScore} <span style="font-size: 18px; color: #4b5563;">(${data.percentage}%)</span>
          </p>
          <p style="margin: 10px 0 0;"><strong>Result:</strong> ${data.safeResultMessage}</p>
        </div>

        <h3 style="margin: 24px 0 12px;">Score breakdown</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tbody>${buildBreakdownRows(data.breakdown)}</tbody>
        </table>

        <h3 style="margin: 28px 0 12px;">Detailed answers</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 13px;">
          <thead>
            <tr style="background:#f3f4f6;">
              <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">Part</th>
              <th style="padding:8px;border:1px solid #e5e7eb;text-align:center;">Q</th>
              <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">Student answer</th>
              <th style="padding:8px;border:1px solid #e5e7eb;text-align:left;">Correct answer</th>
              <th style="padding:8px;border:1px solid #e5e7eb;text-align:center;">Points</th>
              <th style="padding:8px;border:1px solid #e5e7eb;text-align:center;">Status</th>
            </tr>
          </thead>
          <tbody>${answerRows}</tbody>
        </table>

        <p style="margin-top: 24px; font-size: 12px; color: #6b7280;">
          This teacher report was generated automatically from the Pro Erudio FCE Reading test.
        </p>
      </div>
    </div>
  `;
}

export default async function handler(req: any, res: any) {
  setCorsHeaders(req, res);

  if (req.method === "OPTIONS") {
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
    const {
      studentName,
      studentEmail,
      totalScore,
      maxScore,
      percentage,
      resultMessage,
      breakdown,
      detailedAnswers = [],
    } = req.body as ReadingResultPayload;

    if (!studentName || !studentEmail) {
      return res.status(400).json({ error: "Student name and email are required." });
    }

    if (!isValidEmail(studentEmail)) {
      return res.status(400).json({ error: "Invalid student email." });
    }

    if (!breakdown) {
      return res.status(400).json({ error: "Missing score breakdown." });
    }

    const schoolEmail = process.env.SCHOOL_RESULTS_EMAIL;
    const fromEmail = process.env.RESEND_FROM_EMAIL || "Pro Erudio <onboarding@resend.dev>";

    if (!process.env.RESEND_API_KEY) {
      return res.status(500).json({ error: "Missing RESEND_API_KEY." });
    }

    if (!schoolEmail) {
      return res.status(500).json({ error: "Missing SCHOOL_RESULTS_EMAIL." });
    }

    const safeStudentName = escapeHtml(studentName.trim());
    const safeStudentEmail = escapeHtml(studentEmail.trim());
    const safeResultMessage = escapeHtml(resultMessage || "");

    const studentHtml = buildStudentHtml({
      safeStudentName,
      safeStudentEmail,
      totalScore,
      maxScore,
      percentage,
      safeResultMessage,
      breakdown,
    });

    const teacherHtml = buildTeacherHtml({
      safeStudentName,
      safeStudentEmail,
      totalScore,
      maxScore,
      percentage,
      safeResultMessage,
      breakdown,
      detailedAnswers,
    });

    const studentEmailResult = await resend.emails.send({
      from: fromEmail,
      to: [studentEmail],
      subject: `FCE Reading Result - ${safeStudentName}`,
      html: studentHtml,
    });

    if (studentEmailResult.error) {
      console.error("Resend student email error:", studentEmailResult.error);
      return res.status(500).json({ error: "Resend could not send the student email." });
    }

    const teacherEmailResult = await resend.emails.send({
      from: fromEmail,
      to: [schoolEmail],
      subject: `Teacher Report - FCE Reading - ${safeStudentName}`,
      html: teacherHtml,
    });

    if (teacherEmailResult.error) {
      console.error("Resend teacher email error:", teacherEmailResult.error);
      return res.status(500).json({ error: "Resend could not send the teacher email." });
    }

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("API error:", error);
    return res.status(500).json({ error: "Something went wrong while sending the email." });
  }
}
