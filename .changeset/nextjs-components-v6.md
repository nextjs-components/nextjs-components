---
"nextjs-components": major
---

Add support for Next.js 15 and React 19, refresh the icon set, and make theme configuration available through ThemeProvider.

### Breaking changes

- Require Next.js 15+ and React 19, including react-dom and react-is.
- Rename ThemeContextProvider to ThemeProvider.
- Remove the root Icons export and the src/icons index. Import icons directly from individual files.
- Rename or remove many icons, including search to magnifying-glass, folder to folder-closed, and info to information.
- Remove the shared src/icons/props module.
- Remove the Banner component, its hook, and its styles.

### Other changes

- Expand the icon set from 343 to 489 icons, with updated SVG artwork.
- Accept next-themes configuration props in ThemeProvider, with the system theme as the explicit default.
- Add .dark support alongside .dark-theme and update color variables.
- Update component icons and display Esc on input clear buttons.
- Update next-themes to ^0.4.4 and clsx to 2.1.1.
