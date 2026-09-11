---
"nextjs-components": patch
---

Generate component utilities with the application's Tailwind CSS 4 build. Remove the core CSS build, generated stylesheet, and utility prefix. Expose Geist theme names without replacing the application's Tailwind theme. Consumers must import the shared theme and register the package source with `@source`; the README and docs site show this setup.
