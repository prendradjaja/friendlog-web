## 2/15: Hello, world! (Table view)

Let's build the simplest possible useful thing:

- (See) See most recent entries
- (Create) Create a new entry

API token: https://console.developers.google.com/apis/dashboard

- [ ] [Don't store API token in
  localStorage](https://dev.to/rdegges/please-stop-using-local-storage-1i04)

I can GET spreadsheet data!

```
SPREADSHEET_ID=1_NXaTShS4WSieqo7CrJQJWjhuJZIkYzE9ZS3KSfj_-c
curl https://sheets.googleapis.com/v4/spreadsheets/$SPREADSHEET_ID/values/A1:D8?key=$API_KEY
```

Awesome.

How does this API token work? I know very little so far:

- I think there's another mechanism (not API token) that I really should be
  using. I forget what, but it's in the [Google Sheets API
  documentation](https://developers.google.com/sheets/api/guides/concepts).
- I had to turn on link sharing on my sheet in order to be able to access it
  with my API key.
- [ ] Is my API key authorized to edit the sheet? I don't think so, because I
  only enabled read permissions on link sharing. I should check though!

----

VSCode is nice!

- [ ] Learn async/await?



## 2/16: Feed view. Published on GitHub Pages. Filter by friend.

**v0.1.0:** Okay, with the "New Entry" link my super-minimal MVP is now done.

----

Event, EventGroup -- these are both data types and UI elements. How should I
go about naming them?

Huh, Angular (yep, that's why it's not AngularJS) adds stuff to CSS (does it
add to bare CSS or is this just bc I'm using Sass? p sure it adds to bare CSS).
Scoped styles, `:host`... stuff to learn about.

Don't do too much stuff that's just bc of restrictions of your temporary
spreadsheet DB. e.g. don't create too much infrastructure for handling
"combine with PREVIOUS BY .TIMESTAMP" -- later it may become "combine with ID"
or "combine with previous by .when"

I wonder if prefilled GForm URLs can be dynamically generated? (and/or GForm
API?)

----

**v0.1.1:** Cards/feed view exists! I think I need to fix something subtle with
sorting, but it works!! Whoo.

----

**v0.1.2:** Published on GitHub Pages! (I had to add a `window.prompt()` for API key in
order to make this usable on my phone.) (v0.1.2)

Once I do either of the following, I won't be able to use GH Pages anymore:

- Move API key out of localStorage (as I noted yesterday)
- [ ] Use a real database

----

Q: What happens if I edit the sheet that form responses get stored in?

A: From trying it out, it looks like Google Forms keeps track of what row it
should add the next result in. (Even if you delete everything!) You can delete
rows, though.

----

**v0.1.3:** Filter by friend by clicking their name!

----

**v0.1.4:** Style tweaks

----

I wonder if there's a way to have `ng new` create a new project in the current
directory (instead of creating a new directory. The problem I ran into
(causing me to have to do `npm install` twice) is that I don't want to install
`ng` globally, so I have to do:

```
npm init  # now there is a package.json
npm install @angular/cli
npx new someproj  # now there is a someproj/package.json
```

----

Next (features):

- [ ] Group events by "combine"
- [ ] Group events by date
- [ ] Handle line breaks
- [x] Filter by friend

Next (infra):

- [x] Unfuck my git repo / `npx ng` situation
- [x] Unfuck my deploy situation
