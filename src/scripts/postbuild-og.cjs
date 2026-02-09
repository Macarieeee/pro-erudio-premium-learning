/* scripts/postbuild-og.cjs */
const fs = require("fs");
const path = require("path");

const SITE_URL = "https://tabere.proerudio.ro";
const distDir = path.resolve(__dirname, "..", "dist");
const indexPath = path.join(distDir, "index.html");

// IMPORTANT: aici îți trebuie SEO data într-un JSON simplu.
const seoJsonPath = path.resolve(__dirname, "..", "src", "data", "campsSeo.json");
const campsSeo = JSON.parse(fs.readFileSync(seoJsonPath, "utf8"));

const baseHtml = fs.readFileSync(indexPath, "utf8");

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function injectHead(html, { title, description, image, url }) {
  // scoate title/og/twitter existente
  let out = html
    .replace(/<title>.*?<\/title>/g, "")
    .replace(/<meta[^>]+property="og:[^"]+"[^>]*>/g, "")
    .replace(/<meta[^>]+name="twitter:[^"]+"[^>]*>/g, "");

  const t = escapeHtml(title);
  const d = escapeHtml(description);

  const img = image.startsWith("http") ? image : SITE_URL + (image.startsWith("/") ? image : "/" + image);

  const tags = `
<title>${t}</title>
<meta property="og:type" content="website" />
<meta property="og:title" content="${t}" />
<meta property="og:description" content="${d}" />
<meta property="og:image" content="${img}" />
<meta property="og:url" content="${url}" />

<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${t}" />
<meta name="twitter:description" content="${d}" />
<meta name="twitter:image" content="${img}" />
`;

  // inject înainte de </head>
  out = out.replace("</head>", `${tags}\n</head>`);
  return out;
}

for (const c of campsSeo) {
  const slug = String(c.slug).replace(/^\/+/, "");
  const url = `${SITE_URL}/${slug}`;

  const pageHtml = injectHead(baseHtml, {
    title: c.title,
    description: c.description,
    image: c.image,
    url,
  });

  const folder = path.join(distDir, slug);
  fs.mkdirSync(folder, { recursive: true });
  fs.writeFileSync(path.join(folder, "index.html"), pageHtml, "utf8");
}

console.log(`[postbuild-og] Generated ${campsSeo.length} camp pages with OG meta.`);
