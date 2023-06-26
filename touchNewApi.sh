#!/bin/bash

# Check if a role is provided
if [ -z "$1" ]; then
  echo "Usage: $0 <role>"
  exit 1
fi

# Set the role
role="$1"

# Convert the role to title case (e.g., admin -> Admin)
to_title_case() {
  local word="$1"
  echo "${word^}"
}

# Touch files for the specified role
role_alias="$(to_title_case "$role")"
touch "routes/${role_alias}.js"
touch "util/${role_alias}Validator.js"
touch "middlewares/${role_alias}ValidatorMW.js"
touch "controllers/${role_alias}ControllerDB.js"
