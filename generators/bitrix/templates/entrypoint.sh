#!/usr/bin/env bash
set -e

# run migrations before server start
php migrator migrate

# server start
/run.sh
