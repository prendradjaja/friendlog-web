## How to do a version bump

- Update `JOURNAL.md` (No changelog for now)
  - Be sure to include `PENDING_CHANGES.md`
  - Maybe also check `git log`
- Update `package.json`
- Commit
- `git tag vA.B.C`
- `git push`
- `git push --tags`

## Installation

- clone
- From git repo root: `npm install`
- From git repo root: `cd friendlog-web/ && npm install` (This is the
  "Angular project directory")

## Development

- From the Angular project directory (the nested `friendlog-web` directory),
  run `npx ng serve`

## Deployment

From the Angular project directory, run:
- Build: `npx ng build --prod --base-href "https://prendradjaja.github.io/friendlog-web/"`
- Then replace the contents of the `gh-pages` branch with the contents of the `dist/friendlog-web/` directory and push.
