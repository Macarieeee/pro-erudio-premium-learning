import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

type SubmittedWritingTask = {
  id: number;
  part: 1 | 2;
  title: string;
  instructionTop: string;
  mainPrompt: string;
  notes: string[];
  extraBoxLines: string[];
  styleHint: string;
  minWords: number;
  maxWords: number;
  answer: string;
  wordCount: number;
};

type WritingResultPayload = {
  studentName: string;
  studentEmail: string;
  submittedTasks: SubmittedWritingTask[];
};

const escapeHtml = (value: unknown) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const nl2br = (value: unknown) => escapeHtml(value).replace(/\n/g, "<br />");

const splitEmails = (value: string) =>
  value
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean);

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const wordStatus = (task: SubmittedWritingTask) => {
  if (task.wordCount < task.minWords) return "Below limit";
  if (task.wordCount > task.maxWords) return "Above limit";
  return "Within limit";
};

const buildStudentHtml = (data: WritingResultPayload) => `
  <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6; max-width: 720px; margin: 0 auto;">
    <div style="padding: 24px; border: 1px solid #e5e7eb; border-radius: 14px; background: #ffffff;">
      <h2 style="margin: 0 0 12px; color: #111827;">Your FCE Writing test was received</h2>

      <p style="margin: 0 0 12px;">Hello ${escapeHtml(data.studentName)},</p>

      <p style="margin: 0 0 12px;">
        Thank you for completing the FCE Writing test. Your answers have been sent to the teacher and will be checked carefully.
      </p>

      <p style="margin: 0 0 18px;">
        You will receive your feedback and result as soon as your writing has been reviewed.
      </p>

      <div style="padding: 16px; border-radius: 12px; background: #f9fafb; border: 1px solid #e5e7eb;">
        <p style="margin: 0;"><strong>Submitted tasks:</strong> ${escapeHtml(data.submittedTasks.length)}</p>
        ${data.submittedTasks
          .map(
            (task) => `
              <p style="margin: 8px 0 0;">
                <strong>${escapeHtml(task.title)}:</strong> ${escapeHtml(task.wordCount)} words
                <span style="color: #6b7280;">(${escapeHtml(wordStatus(task))})</span>
              </p>
            `
          )
          .join("")}
      </div>

      <p style="font-size: 13px; color: #6b7280; margin-top: 24px;">
        This email was generated automatically from the Pro Erudio FCE Writing test.
      </p>
    </div>
  </div>
`;

const buildTeacherHtml = (data: WritingResultPayload) => {
  const taskBlocks = data.submittedTasks
    .map(
      (task) => `
        <div style="margin-top: 24px; padding: 18px; border: 1px solid #e5e7eb; border-radius: 14px; background: #ffffff;">
          <h3 style="margin: 0 0 8px;">${escapeHtml(task.title)} — Part ${escapeHtml(task.part)}</h3>

          <table style="width: 100%; border-collapse: collapse; font-size: 14px; margin: 12px 0 18px;">
            <tbody>
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb; width: 180px;"><strong>Style</strong></td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">${escapeHtml(task.styleHint || "-")}</td>
              </tr>
              <tr>
                <td style="padding: 10px; border: 1px solid #e5e7eb;"><strong>Word count</strong></td>
                <td style="padding: 10px; border: 1px solid #e5e7eb;">
                  ${escapeHtml(task.wordCount)} words / target ${escapeHtml(task.minWords)}–${escapeHtml(task.maxWords)}
                  <span style="color: ${wordStatus(task) === "Within limit" ? "#047857" : "#b91c1c"}; font-weight: 700;">
                    (${escapeHtml(wordStatus(task))})
                  </span>
                </td>
              </tr>
            </tbody>
          </table>

          <div style="margin-bottom: 14px;">
            <p style="margin: 0 0 6px; font-weight: 700;">Instruction</p>
            <p style="margin: 0; color: #374151;">${escapeHtml(task.instructionTop)}</p>
          </div>

          <div style="margin-bottom: 14px;">
            <p style="margin: 0 0 6px; font-weight: 700;">Prompt</p>
            <p style="margin: 0; color: #374151;">${escapeHtml(task.mainPrompt)}</p>
          </div>

          ${
            task.notes?.length
              ? `
                <div style="margin-bottom: 14px;">
                  <p style="margin: 0 0 6px; font-weight: 700;">Notes</p>
                  <ul style="margin: 0; padding-left: 20px;">
                    ${task.notes.map((note) => `<li>${escapeHtml(note)}</li>`).join("")}
                  </ul>
                </div>
              `
              : ""
          }

          ${
            task.extraBoxLines?.length
              ? `
                <div style="margin-bottom: 14px;">
                  <p style="margin: 0 0 6px; font-weight: 700;">Extra task details</p>
                  <div style="padding: 12px; border: 1px solid #e5e7eb; border-radius: 10px; background: #f9fafb;">
                    ${task.extraBoxLines.map((line) => (line ? `<div>${escapeHtml(line)}</div>` : `<div style="height: 8px;"></div>`)).join("")}
                  </div>
                </div>
              `
              : ""
          }

          <div>
            <p style="margin: 0 0 8px; font-weight: 700;">Student answer</p>
            <div style="white-space: normal; padding: 16px; border: 1px solid #d1d5db; border-radius: 12px; background: #f9fafb; color: #111827;">
              ${nl2br(task.answer)}
            </div>
          </div>
        </div>
      `
    )
    .join("");

  return `
    <div style="font-family: Arial, sans-serif; color: #111827; line-height: 1.6; max-width: 1000px; margin: 0 auto;">
      <h2 style="margin-bottom: 8px;">Teacher Report — FCE Writing</h2>
      <p style="margin-top: 0; color: #4b5563;">Full writing submission for manual review and grading.</p>

      <div style="padding: 16px; border: 1px solid #e5e7eb; border-radius: 14px; background: #f9fafb; margin: 20px 0;">
        <p style="margin: 0;"><strong>Student:</strong> ${escapeHtml(data.studentName)}</p>
        <p style="margin: 4px 0 0;"><strong>Email:</strong> ${escapeHtml(data.studentEmail)}</p>
        <p style="margin: 4px 0 0;"><strong>Submitted tasks:</strong> ${escapeHtml(data.submittedTasks.length)}</p>
      </div>

      ${taskBlocks}

      <p style="font-size: 13px; color: #6b7280; margin-top: 24px;">
        This email was generated automatically from the Pro Erudio FCE Writing test.
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

  res.setHeader("Vary", "Origin");
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed." });
  }

  try {
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

    const payload = req.body as WritingResultPayload;

    if (!payload.studentName || !payload.studentEmail) {
      return res.status(400).json({ error: "Student name and student email are required." });
    }

    if (!isValidEmail(payload.studentEmail)) {
      return res.status(400).json({ error: "Invalid student email." });
    }

    if (!Array.isArray(payload.submittedTasks) || payload.submittedTasks.length === 0) {
      return res.status(400).json({ error: "Submitted writing tasks are required." });
    }

    const teacherHtml = buildTeacherHtml(payload);
    const studentHtml = buildStudentHtml(payload);

    const teacherEmailResult = await resend.emails.send({
      from: fromEmail,
      to: splitEmails(schoolEmail),
      subject: `Teacher Report - FCE Writing - ${payload.studentName}`,
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
      subject: "Your FCE Writing test was received",
      html: studentHtml,
    });

    if (studentEmailResult.error) {
      console.error("Resend student email error:", studentEmailResult.error);

      return res.status(207).json({
        success: true,
        partial: true,
        message: "Teacher email was sent, but student confirmation email could not be sent.",
        details: studentEmailResult.error,
      });
    }

    return res.status(200).json({ success: true, partial: false });
  } catch (error) {
    console.error("Writing email error:", error);
    return res.status(500).json({ error: "Something went wrong while sending the writing test." });
  }
}
