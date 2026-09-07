# Docs site

## Development

Use Node.js 24. From the repository root:

```sh
npm ci
npm run docs
```

The app uses Next.js 16 and Turbopack. MDX plugins use string paths so Turbopack
can serialize their options. Run `npm run build --workspace=docs` to check the
production build.

## Deploying

In the Vercel project's Build and Deployment settings, select:

- Framework Preset: Next.js
- Root Directory: `packages/docs`
- Node.js Version: `24.x`
- Include source files outside of the Root Directory in the Build Step: enabled

The app's `vercel.json` sets `npm run build` explicitly. This overrides Vercel's
automatic `turbo run build` command when it detects the repository's Turbo config.
See [Vercel's buildCommand documentation](https://vercel.com/docs/project-configuration/vercel-json#buildcommand).

Run the CLI from the repository root, as required by
[Vercel's monorepo instructions](https://vercel.com/docs/monorepos#add-a-monorepo-through-vercel-cli).
Link the existing `nextjs-components` project if needed:

```sh
vercel link --project nextjs-components
```

Deploy a preview:

```sh
vercel deploy
```

Deploy to production:

```sh
vercel deploy --prod
```
