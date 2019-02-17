## How to do a version bump

- Update `JOURNAL.md` (No changelog for now)
- Update `package.json`
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
