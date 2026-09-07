# Releases

Changesets manages versions and changelogs for `nextjs-components`.
The root package and docs application are private.

## Setup

Use Node.js 24 (`nvm use`) and npm 11.5.1, the version used in CI.
Install from the repository root:

```sh
npm install --global npm@11.5.1 --ignore-scripts --no-audit --no-fund
npm ci --ignore-scripts
```

The root `package-lock.json` is the only lockfile. `.npmrc` enables
`legacy-peer-deps` because some existing workspace tools require React 18 peers.
This setting applies to repository development; it does not change the library's
React 19 peer requirements.

## Describe a change

For a library change, run:

```sh
npm run changeset
```

Select `nextjs-components`, choose `patch`, `minor`, or `major`, and write a
user-facing summary. Commit the generated `.changeset/*.md` with the change.
Use `major` for breaking changes, `minor` for new features, and `patch` for fixes.
Docs and CI-only changes do not need a package release. For changes inside the
library that need no release, such as test changes, use `npm run changeset -- --empty`.

PR checks validate the Changesets configuration and pending release plan,
run unit tests, build the library and declarations, and check the package contents.
Library PRs require a changeset, including an empty changeset when no release is
needed. Generated release PRs skip this presence check because versioning has
already consumed their changesets; their tests, build, and package checks still run.

## Release

1. Merge changes into `main`.
2. The Release workflow creates or updates `chore: release packages` on
   `changeset-release/main`. This PR contains package versions, changelogs,
   the updated root lockfile, and removal of consumed changesets.
3. Review the release PR and its checks, then merge it.
4. The Release workflow validates the merged code, publishes unpublished package
   versions to npm, and creates Git tags and GitHub releases from the changelog.

Do not create a GitHub release or run `npm version` to start a release.
GitHub releases are now outputs of publishing.

Changesets uses npm workspace tags such as `nextjs-components@6.0.0`.
Existing `v*` tags and releases remain historical records.

The initial major changeset prepares **6.0.0** from the tracked **5.2.0** version.
The published `6.0.0-rc.*` versions do not require Changesets prerelease mode
for this stable release. Future release candidates must use Changesets
[prerelease mode](https://changesets.dev/guide/prereleases) and a separate npm
dist-tag, rather than publishing prereleases as `latest`.

## Credentials

The workflow reuses these repository secrets:

- `ELEVATED_GITHUB_TOKEN`: access to repository contents and pull requests.
  Using this token lets release PRs trigger the normal PR checks.
- `NPM_TOKEN`: npm publish access for `nextjs-components`, with the required
  noninteractive publish permissions. Keep the token valid and rotate it before expiry.

The npm token is supplied only to the release action. PR checks have read-only
repository access and receive no release secrets.

## Retry and local checks

Use **Actions > Release > Run workflow**, selecting `main`, after a transient
failure or credential repair. Changesets checks npm before publishing and skips
versions already present. A partial publish may need manual Git tag or GitHub
release repair; inspect npm and the failed run before retrying.

```sh
npm run changeset -- status
npm test
npm run build:core-babel
npm run prune-dist --workspace=nextjs-components
npm pack --workspace=nextjs-components --dry-run --ignore-scripts
```

To inspect generated versions locally, run `npm run version-packages` in a
temporary checkout. It consumes changesets and changes package files.
`npm run release` publishes to npm and is intended for CI.
The library's `prepublishOnly` hook builds declarations and removes test files
from `dist` before npm publishes it.

See the [Changesets automation guide](https://changesets.dev/guide/automating).
