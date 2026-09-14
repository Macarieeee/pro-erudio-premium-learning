import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM_EMAIL = process.env.RESEND_FROM_EMAIL || process.env.FROM_EMAIL;
const TEACHER_EMAIL = process.env.TEACHER_EMAIL || process.env.RESULTS_TEACHER_EMAIL || process.env.TEACHER_RESULTS_EMAIL;
const OFFICE_EMAIL = "office@proerudio.ro";

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

const baseLayout = (title: string, content: string) => `
  <div style="font-family:Arial,sans-serif;line-height:1.55;color:#111827;background:#f9fafb;padding:24px;">
    <div style="max-width:760px;margin:0 auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:14px;overflow:hidden;">
      <div style="background:#2094F3;color:#ffffff;padding:22px 26px;">
        <h1 style="margin:0;font-size:22px;">${escapeHtml(title)}</h1>
      </div>
      <div style="padding:24px 26px;">${content}</div>
    </div>
  </div>`;

const renderAnswers = (answers: any[] = []) => {
  if (!Array.isArray(answers) || !answers.length) return "<p>No answer details were provided.</p>";

  return `<table width="100%" cellpadding="6" cellspacing="0" style="border-collapse:collapse;font-size:13px;">
    <thead>
      <tr>
        <th align="left" style="border-bottom:1px solid #e5e7eb;">Question</th>
        <th align="left" style="border-bottom:1px solid #e5e7eb;">Student answer</th>
        <th align="left" style="border-bottom:1px solid #e5e7eb;">Correct answer</th>
        <th align="left" style="border-bottom:1px solid #e5e7eb;">Result</th>
      </tr>
    </thead>
    <tbody>
      ${answers.map((row) => `<tr>
        <td style="border-bottom:1px solid #f3f4f6;">${escapeHtml(row.questionId)}</td>
        <td style="border-bottom:1px solid #f3f4f6;">${escapeHtml(row.studentAnswer)}</td>
        <td style="border-bottom:1px solid #f3f4f6;">${escapeHtml(row.correctAnswer)}</td>
        <td style="border-bottom:1px solid #f3f4f6;">${escapeHtml(row.isCorrect ? "Correct" : "Incorrect")}</td>
      </tr>`).join("")}
    </tbody>
  </table>`;
};

export default async function handler(req: any, res: any) {
  Object.entries(corsHeaders).forEach(([key, value]) => res.setHeader(key, value));

  if (req.method === "OPTIONS") return res.status(200).end();
  if (req.method !== "POST") return res.status(405).json({ error: "Method not allowed." });

  try {
    if (!process.env.RESEND_API_KEY) throw new Error("Missing RESEND_API_KEY.");
    if (!FROM_EMAIL) throw new Error("Missing RESEND_FROM_EMAIL or FROM_EMAIL.");
    if (!TEACHER_EMAIL) throw new Error("Missing TEACHER_EMAIL / RESULTS_TEACHER_EMAIL.");

    const body = req.body || {};
    const firstName = String(body.firstName || "").trim();
    const lastName = String(body.lastName || "").trim();
    const studentEmail = String(body.email || "").trim();
    const age = Number(body.age ?? "");
    const testTitle = String(body.testTitle || "Test de plasare").trim();
    const testId = String(body.testId || "placement").trim();
    const answersCount = Number(body.answersCount ?? 0);
    const totalCount = Number(body.totalCount ?? 0);
    const score = Number(body.score ?? 0);
    const maxScore = Number(body.maxScore ?? totalCount);
    const percentage = Number(body.percentage ?? (maxScore ? Math.round((score / maxScore) * 100) : 0));
    const resultMessage = String(body.resultMessage || "The placement test has been recorded.").trim();
    const writing = String(body.writing || "").trim();
    const answers = Array.isArray(body.answers) ? body.answers : [];

    if (!firstName || !lastName) return res.status(400).json({ error: "Missing student name." });
    if (!studentEmail || !studentEmail.includes("@")) return res.status(400).json({ error: "Missing or invalid student email." });

    const studentName = `${firstName} ${lastName}`;

    const studentHtml = baseLayout(
      `${testTitle} received`,
      `
        <p>Hello ${escapeHtml(studentName)},</p>
        <p>Your placement test for <strong>${escapeHtml(testTitle)}</strong> was received successfully.</p>
        <div style="background:#f3f4f6;border-radius:12px;padding:16px;margin:18px 0;">
          <p style="margin:0;"><strong>Age:</strong> ${escapeHtml(age || "—")}</p>
          <p style="margin:6px 0 0;"><strong>Answers submitted:</strong> ${escapeHtml(answersCount)} / ${escapeHtml(totalCount)}</p>
          <p style="margin:6px 0 0;"><strong>Score:</strong> ${escapeHtml(score)} / ${escapeHtml(maxScore)}</p>
          <p style="margin:6px 0 0;"><strong>Percentage:</strong> ${escapeHtml(percentage)}%</p>
        </div>
        <p>${escapeHtml(resultMessage)}</p>
        <p>Our team will review your answers and contact you by email with the placement level.</p>
        ${writing ? `<p><strong>Writing task submitted:</strong><br/>${escapeHtml(writing)}</p>` : ""}
      `
    );

    const teacherHtml = baseLayout(
      `${testTitle} — teacher report`,
      `
        <p><strong>Student:</strong> ${escapeHtml(studentName)}<br/>
        <strong>Email:</strong> ${escapeHtml(studentEmail)}<br/>
        <strong>Age:</strong> ${escapeHtml(age || "—")}<br/>
        <strong>Test:</strong> ${escapeHtml(testTitle)} (${escapeHtml(testId)})<br/>
        <strong>Answers submitted:</strong> ${escapeHtml(answersCount)} / ${escapeHtml(totalCount)}<br/>
        <strong>Score:</strong> ${escapeHtml(score)} / ${escapeHtml(maxScore)}<br/>
        <strong>Percentage:</strong> ${escapeHtml(percentage)}%</p>

        <div style="background:#f3f4f6;border-radius:12px;padding:16px;margin:18px 0;">
          <p style="margin:0;"><strong>Result message:</strong> ${escapeHtml(resultMessage)}</p>
        </div>

        <h2 style="font-size:17px;margin-top:24px;">Answers</h2>
        ${renderAnswers(answers)}

        ${writing ? `<h2 style="font-size:17px;margin-top:24px;">Writing task</h2><div style="white-space:pre-wrap;">${escapeHtml(writing)}</div>` : ""}
      `
    );

    const teacherResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: TEACHER_EMAIL,
      subject: `${testTitle} | ${studentName} | Placement test`,
      html: teacherHtml,
    });

    if ((teacherResult as any).error) {
      throw new Error((teacherResult as any).error.message || "Teacher email failed.");
    }

    const officeResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: OFFICE_EMAIL,
      subject: `${testTitle} | ${studentName} | Placement test`,
      html: teacherHtml,
    });

    if ((officeResult as any).error) {
      console.warn("Office email failed:", (officeResult as any).error?.message || "Unknown office email error");
    }

    const studentResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: studentEmail,
      subject: `Your ${testTitle} submission`,
      html: studentHtml,
    });

    if ((studentResult as any).error) {
      return res.status(207).json({
        partial: true,
        message: "The teacher received the placement test, but the student confirmation email could not be sent.",
        studentError: (studentResult as any).error.message,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error?.message || "Placement email could not be sent." });
  }
}
