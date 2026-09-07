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

- set `nextjs-components` to an exact version in `package.json`
- remove `../core` from `next-transpile-modules`
- run `vercel`
