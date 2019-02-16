set -ex
pwd
. ./creds.sh
SPREADSHEET_ID=1_NXaTShS4WSieqo7CrJQJWjhuJZIkYzE9ZS3KSfj_-c
curl https://sheets.googleapis.com/v4/spreadsheets/$SPREADSHEET_ID/values/A1:D8?key=$API_KEY
