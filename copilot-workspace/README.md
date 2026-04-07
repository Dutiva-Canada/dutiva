# Copilot Workspace

This folder is dedicated to files created by GitHub Copilot agents during investigations, experiments, and task work.

## Structure

Each task or investigation should create its own sub-folder using a descriptive name, for example:

```
copilot-workspace/
  fix-blank-app-issue/      ← notes and artifacts from the blank app fix investigation
  feature-xyz/              ← notes for a specific feature
```

## Guidelines

- All temporary files, investigation notes, build artifacts, and experimental configs go here.
- Source code changes still go in the appropriate `src/` directories.
- Root-level config files (e.g. `vercel.json`, `.gitignore`) should only be added when confirmed with you first.
- This folder keeps the project root clean.
