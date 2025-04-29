# in the pipeline this uses the automatically generated "GH_TOKEN" as auth
gh api orgs/TsTs-Org/packages/npm/component-library-svelte/versions | jq -r '.[0].name'