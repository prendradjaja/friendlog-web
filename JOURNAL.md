## 2/16

Okay, with the "New Entry" link my super-minimal MVP (v0.1.0) is done.

----

Event, EventGroup -- these are both data types and UI elements. How should I go about naming them?

Huh, Angular (yep, that's why it's not AngularJS) adds stuff to CSS (does it
add to bare CSS or is this just bc I'm using Sass? p sure it adds to bare CSS).
Scoped styles, `:host`... stuff to learn about.

Don't do too much stuff that's just bc of restrictions of your temporary spreadsheet DB. e.g. don't create too much infrastructure for handling "combine with PREVIOUS BY .TIMESTAMP" -- later it may become "combine with ID" or "combine with previous by .when"

I wonder if prefilled GForm URLs can be dynamically generated? (and/or GForm
API?)

----

Cards/feed view (v0.1.1) exists! I think I need to fix something subtle with sorting, but it works!! Whoo.

Next:

- [ ] Group events by "combine"
- [ ] Group events by date

## 2/15

Let's build the simplest possible useful thing:

- (See) See most recent entries
- (Create) Create a new entry

API token: https://console.developers.google.com/apis/dashboard

I can GET spreadsheet data! Awesome. ([Code](./JOURNAL/hello-world-get.sh))

How does this API token work? I know very little so far:

- I think there's another mechanism (not API token) that I really should be
  using. I forget what, but it's in the [Google Sheets API
  documentation](https://developers.google.com/sheets/api/guides/concepts).
- I had to turn on link sharing on my sheet in order to be able to access it
  with my API key.
- [ ] Is my API key authorized to edit the sheet? I don't think so, because I only
  enabled read permissions on link sharing. I should check though!

----

VSCode is nice!

- [ ] Learn async/await?
