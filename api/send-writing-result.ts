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

const getExamMeta = (body: any) => {
  const examTitle = body.examTitle || body.exam || body.examName || "B2 First (FCE)";
  const examLevel = body.examLevel || "";
  const paper = body.paper || "Writing";
  const examName = body.examName || `${examTitle} — ${paper}`;

  return { examTitle, examLevel, paper, examName };
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

const renderSubmittedTasks = (tasks: any[] = []) => {
  if (!Array.isArray(tasks) || !tasks.length) return "<p>No writing tasks were submitted.</p>";

  return tasks
    .map((task) => `
      <div style="border:1px solid #e5e7eb;border-radius:12px;padding:16px;margin:16px 0;">
        <h2 style="font-size:18px;margin:0 0 8px;">Part ${escapeHtml(task.part)} — ${escapeHtml(task.title)}</h2>
        <p style="margin:0 0 8px;color:#4b5563;"><strong>Word count:</strong> ${escapeHtml(task.wordCount)} / recommended ${escapeHtml(task.minWords)}–${escapeHtml(task.maxWords)}</p>
        ${task.styleHint ? `<p style="margin:0 0 8px;color:#4b5563;"><strong>Style hint:</strong> ${escapeHtml(task.styleHint)}</p>` : ""}
        ${task.instructionTop ? `<p style="margin:0 0 8px;"><strong>Instruction:</strong> ${escapeHtml(task.instructionTop)}</p>` : ""}
        ${task.mainPrompt ? `<p style="margin:0 0 8px;"><strong>Prompt:</strong> ${escapeHtml(task.mainPrompt)}</p>` : ""}
        ${
          Array.isArray(task.notes) && task.notes.length
            ? `<p style="margin:0 0 8px;"><strong>Notes:</strong> ${task.notes.map(escapeHtml).join(" / ")}</p>`
            : ""
        }
        ${
          Array.isArray(task.extraBoxLines) && task.extraBoxLines.length
            ? `<p style="margin:0 0 8px;"><strong>Extra input:</strong> ${task.extraBoxLines.map(escapeHtml).join(" / ")}</p>`
            : ""
        }
        <div style="margin-top:12px;padding:14px;border-radius:10px;background:#f9fafb;white-space:pre-wrap;">${escapeHtml(task.answer)}</div>
      </div>
    `)
    .join("");
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
    const { examTitle, examLevel, paper, examName } = getExamMeta(body);

    const studentName = String(body.studentName || "").trim();
    const studentEmail = String(body.studentEmail || "").trim();
    const submittedTasks = Array.isArray(body.submittedTasks) ? body.submittedTasks : [];
    const timeSpent = body.timeSpentFormatted || body.timeSpent?.timeSpentFormatted || "—";

    if (!studentName) return res.status(400).json({ error: "Missing student name." });
    if (!studentEmail) return res.status(400).json({ error: "Missing student email." });
    if (!submittedTasks.length) return res.status(400).json({ error: "No submitted writing tasks found." });

    const studentHtml = baseLayout(
      `${examName} submitted`,
      `
        <p>Hello ${escapeHtml(studentName)},</p>
        <p>Your <strong>${escapeHtml(examName)}</strong> answers were submitted successfully.</p>
        <div style="background:#f3f4f6;border-radius:12px;padding:16px;margin:18px 0;">
          <p style="margin:0;"><strong>Time spent:</strong> ${escapeHtml(timeSpent)}</p>
          <p style="margin:6px 0 0;"><strong>Submitted tasks:</strong> ${escapeHtml(submittedTasks.length)}</p>
        </div>
        <p>Your teacher will review the writing answers and provide feedback.</p>
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

        <h2 style="font-size:17px;margin-top:24px;">Submitted writing answers</h2>
        ${renderSubmittedTasks(submittedTasks)}
      `
    );

    const teacherResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: TEACHER_EMAIL,
      subject: `${examName} | ${studentName} | Writing submission`,
      html: teacherHtml,
    });

    if ((teacherResult as any).error) {
      throw new Error((teacherResult as any).error.message || "Teacher email failed.");
    }

    const studentResult = await resend.emails.send({
      from: FROM_EMAIL,
      to: studentEmail,
      subject: `Your ${examName} submission`,
      html: studentHtml,
    });

    if ((studentResult as any).error) {
      return res.status(207).json({
        partial: true,
        message: "The teacher received the writing test, but the student confirmation email could not be sent.",
        studentError: (studentResult as any).error.message,
      });
    }

    return res.status(200).json({ ok: true });
  } catch (error: any) {
    console.error(error);
    return res.status(500).json({ error: error?.message || "Writing email could not be sent." });
  }
}
