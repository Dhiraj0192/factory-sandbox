# factory-sandbox

The first target repo for the Jarvis software factory. Small on purpose, real on purpose: a Vite + React + TypeScript app with the checks the factory must respect.

## Commands

```bash
npm ci          # install
npm run dev     # local dev server
npm run checks  # lint + typecheck + test + build
```

## Protected paths

`factory/protected.txt` lists the files the factory worker may not edit. They are the test file, the checks script, and CI. Changes to them need a separate approval path.

## Purpose

This repo exists to prove the pipeline end to end: an issue comes in, a sandboxed worker builds it, `checks.sh` proves it, an independent reviewer inspects the evidence, and a pull request comes back to Sir. Nothing here is production software.
