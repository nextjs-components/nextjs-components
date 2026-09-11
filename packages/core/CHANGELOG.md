# nextjs-components

## 7.0.0-rc.2

### Patch Changes

- Generate component utilities with the application's Tailwind CSS 4 build. Remove the core CSS build, generated stylesheet, and utility prefix. Expose Geist theme names without replacing the application's Tailwind theme. Consumers must import the shared theme and register the package source with `@source`; the README and docs site show this setup.

## 7.0.0-rc.1

### Major Changes

- f6e3382: Require Tailwind CSS 4 or later as a peer dependency. Add a shared Tailwind build and theme for the component library, and migrate Calendar layout utilities to it. Ship compiled, prefixed CSS through the existing global stylesheet. Align shared gray and blue tokens and the font stack with Geist, removing Calendar-specific theme overrides.

### Patch Changes

- f6e3382: Use the shared animated Drawer for the mobile Calendar date picker. Match the preset drawer's slide transition and theme overlay, preserve swipe dismissal and focus restoration, and keep the trigger linked to its dialog.
- f6e3382: Use the shared Drawer for mobile Calendar presets, with search, compact option rows, a Done footer, theme-aware overlay, and focus management. Center the Compact preset button across sizes.

## 6.2.0-rc.0

### Minor Changes

- calendar component updates

## 6.1.0

### Minor Changes

- 783ce15: Remove babel generated output.

## 6.0.0

### Major Changes

- ead58ca: Add support for Next.js 15 and React 19, refresh the icon set, and make theme configuration available through ThemeProvider.

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
