# Docs page rules

- Use the matching page at `https://vercel.com/geist/` as the reference.
- Match the reference page's example sections and order.
- Copy most of the reference text verbatim, including the introduction and short descriptions. Do not rewrite it only to make it shorter.
- Keep copy to a minimum. Do not add setup notes, API explanations, keyboard guides, or extra examples that are absent from the reference.
- Omit props tables.
- Omit the Best Practices section, even when the reference includes it.
- Use the local package components in working `Editor` examples.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
