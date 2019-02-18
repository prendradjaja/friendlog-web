#!/usr/bin/env bash
set -ex

DIR_FRIENDLOG=~/personal/friendlog-web
DIR_FRIENDLOG_ANGULAR=~/personal/friendlog-web/friendlog-web
DIR_FRIENDLOG_DIST=~/personal/friendlog-web/friendlog-web/dist/friendlog-web
DIR_FRIENDLOG_GHPAGES=~/personal/friendlog-web.gh-pages

cd $DIR_FRIENDLOG_ANGULAR
npx ng build --prod --base-href "https://prendradjaja.github.io/friendlog-web/"

rm -f $DIR_FRIENDLOG_GHPAGES/*
cp $DIR_FRIENDLOG_DIST/* $DIR_FRIENDLOG_GHPAGES

set +x

echo
echo Done. Now:
echo - cd to $DIR_FRIENDLOG_GHPAGES
echo - commit and push
