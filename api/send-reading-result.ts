import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || process.env.FROM_EMAIL;
const TEACHER_EMAIL = process.env.TEACHER_EMAIL || process.env.RESULTS_TEACHER_EMAIL || process.env.TEACHER_RESULTS_EMAIL;

const corsHeaders = {
  "Access-Control-Allow-Origin": process.env.ALLOWED_ORIGIN || "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

const formatPercent = (value: unknown) => {
  const n = Number(value);
  return Number.isFinite(n) ? `${n}%` : "—";
};

const getExamMeta = (body: any) => {
  const examTitle = body.examTitle || body.exam || body.examName || "B2 First (FCE)";
  const examLevel = body.examLevel || "";
  const paper = body.paper || "Reading & Use of English";
  const examName = body.examName || `${examTitle} — ${paper}`;

  return { examTitle, examLevel, paper, examName };
};

const renderBreakdown = (breakdown: Record<string, unknown> = {}) => {
  const entries = Object.entries(breakdown);
  if (!entries.length) return "<p>No part breakdown was provided.</p>";

  return `
    <table width="100%" cellpadding="8" cellspacing="0" style="border-collapse:collapse;margin-top:10px;">
      <thead>
        <tr>
          <th align="left" style="border-bottom:1px solid #e5e7eb;">Part</th>
          <th align="left" style="border-bottom:1px solid #e5e7eb;">Score</th>
        </tr>
      </thead>
      <tbody>
        ${entries
          .map(([key, value]) => {
            const label = key.startsWith("p") ? `Part ${key.slice(1)}` : key;
            return `
              <tr>
                <td style="border-bottom:1px solid #f3f4f6;">${escapeHtml(label)}</td>
                <td style="border-bottom:1px solid #f3f4f6;"><strong>${escapeHtml(value)}</strong></td>
              </tr>`;
          })
          .join("")}
      </tbody>
    </table>`;
};

const renderDetailedAnswers = (answers: any[] = []) => {
  if (!Array.isArray(answers) || !answers.length) return "<p>No detailed answers were provided.</p>";

  return `
    <table width="100%" cellpadding="7" cellspacing="0" style="border-collapse:collapse;margin-top:10px;font-size:13px;">
      <thead>
        <tr>
          <th align="left" style="border-bottom:1px solid #e5e7eb;">Q</th>
          <th align="left" style="border-bottom:1px solid #e5e7eb;">Part</th>
          <th align="left" style="border-bottom:1px solid #e5e7eb;">Student answer</th>
          <th align="left" style="border-bottom:1px solid #e5e7eb;">Correct answer</th>
          <th align="left" style="border-bottom:1px solid #e5e7eb;">Points</th>
        </tr>
      </thead>
      <tbody>
        ${answers
          .map((row) => `
            <tr>
              <td style="border-bottom:1px solid #f3f4f6;">${escapeHtml(row.questionId)}</td>
              <td style="border-bottom:1px solid #f3f4f6;">${escapeHtml(row.part)}</td>
              <td style="border-bottom:1px solid #f3f4f6;">${escapeHtml(row.studentAnswer)}</td>
              <td style="border-bottom:1px solid #f3f4f6;">${escapeHtml(row.correctAnswer)}</td>
              <td style="border-bottom:1px solid #f3f4f6;">${escapeHtml(row.points)}/${escapeHtml(row.maxPoints)}</td>
            </tr>`)
          .join("")}
      </tbody>
    </table>`;
};

const baseLayout = (title: string, content: string) => `
  <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111827;background:#f9fafb;padding:24px;">
    <div style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
      <div style="background:#2094F3;color:#ffffff;padding:22px 26px;">
        <h1 style="margin:0;font-size:22px;">${escapeHtml(title)}</h1>
      </div>
      <div style="padding:24px 26px;">${content}</div>
    </div>
  </div>`;

export default async function handler(req: any, res: any) {
  Object.entries(corsHeaders).forEach(([key, value]) => res.setHeader(key, value));

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  try {
    if (!process.env.RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY.");
    if (!FROM_EMAIL) throw new Error("Missing RESEND_FROM_EMAIL or FROM_EMAIL.");
    if (!TEACHER_EMAIL) throw new Error("Missing TEACHER_EMAIL / RESULTS_TEACHER_EMAIL.");

    const body = req.body || {};
    const { examTitle, examLevel, paper, examName } = getExamMeta(body);

    const studentName = String(body.studentName || "").trim();
    const studentEmail = String(body.studentEmail || "").trim();

    if (!studentName) return res.status(400).json({ error: "Missing student name." });
    if (!studentEmail) return res.status(400).json({ error: "Missing student email." });

    const totalScore = body.totalScore ?? "—";
    const maxScore = body.maxScore ?? "—";
    const percentage = formatPercent(body.percentage);
    const resultMessage = body.resultMessage || "The result has been recorded.";
    const timeSpent = body.timeSpentFormatted || body.timeSpent?.timeSpentFormatted || "—";

    const studentHtml = baseLayout(
      `${examName} result`,
      `
        <p>Hello ${escapeHtml(studentName)},</p>
        <p>Your <strong>${escapeHtml(examName)}</strong> result has been recorded.</p>
        <div style="background:#f3f4f6;border-radius:12px;padding:16px;margin:18px 0;">
          <p style="margin:0;"><strong>Score:</strong> ${escapeHtml(totalScore)} / ${escapeHtml(maxScore)}</p>
          <p style="margin:6px 0 0;"><strong>Percentage:</strong> ${escapeHtml(percentage)}</p>
          <p style="margin:6px 0 0;"><strong>Time spent:</strong> ${escapeHtml(timeSpent)}</p>
        </div>
        <p>${escapeHtml(resultMessage)}</p>
        <p>The full report will be reviewed by your teacher.</p>
      `
    );

    const teacherHtml = baseLayout(
      `${examName} — teacher report`,
      `
        <p><strong>Student:</strong> ${escapeHtml(studentName)}<br/>
        <strong>Email:</strong> ${escapeHtml(studentEmail)}<br/>
        <strong>Exam:</strong> ${escapeHtml(examTitle)} ${examLevel ? `(${escapeHtml(examLevel)})` : ""}<br/>
        <strong>Paper:</strong> ${escapeHtml(paper)}<br/>
        <strong>Time spent:</strong> ${escapeHtml(timeSpent)}</p>

        <div style="background:#f3f4f6;border-radius:12px;padding:16px;margin:18px 0;">
          <p style="margin:0;"><strong>Final score:</strong> ${escapeHtml(totalScore)} / ${escapeHtml(maxScore)} (${escapeHtml(percentage)})</p>
          <p style="margin:6px 0 0;"><strong>Result message:</strong> ${escapeHtml(resultMessage)}</p>
        </div>

        <h2 style="font-size:17px;margin-top:24px;">Breakdown</h2>
        ${renderBreakdown(body.breakdown)}

        <h2 style="font-size:17px;margin-top:24px;">Detailed answers</h2>
        ${renderDetailedAnswers(body.detailedAnswers)}
      `
    );

    const teacherResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: TEACHER_EMAIL,
      subject: `${examName} | ${studentName} | ${totalScore}/${maxScore}`,
      html: teacherHtml,
    });

    if ((teacherResult as any).error) {
      throw new Error((teacherResult as any).error.message || "Teacher email failed.");
    }

    const studentResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: studentEmail,
      subject: `Your ${examName} result`,
      html: studentHtml,
    });

    if ((studentResult as any).error) {
      return res.status(207).json({
        partial: true,
        message: "Teacher email was sent, but student email could not be sent.",
        studentError: (studentResult as any).error.message,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error?.message || "Email could not be sent." });
  }
}
