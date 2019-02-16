## 2/16

Okay, with the "New Entry" link my super-minimal MVP (v0.1.0) is done.

----

. SeeTable -> Feed
  . Prefill "combine" with this URL
https://docs.google.com/forms/d/e/1FAIpQLSfrEoQFScVs_hleOQ9TU0-vev62_UK8mwYgEYOLC1sPwUK4dw/viewform?usp=pp_url&entry.891050226=Yes
View form URL https://docs.google.com/forms/d/e/1FAIpQLSfrEoQFScVs_hleOQ9TU0-vev62_UK8mwYgEYOLC1sPwUK4dw/viewform

I wonder if prefilled GForm URLs can be dynamically generated? (and/or GForm
API?)

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
- (todo) Is my API key authorized to edit the sheet? I don't think so, because I only
  enabled read permissions on link sharing. I should check though!

----

VSCode is nice!

(todo) Learn async/await?
