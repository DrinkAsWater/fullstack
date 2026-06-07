# CLAUDE.md

## Project

Spring Boot 3.4.0 / Java 17 / Maven — e-commerce backend (Wu).

---

## Core Rules

### Rule 1 — Think Before Coding

- State assumptions explicitly. If uncertain, ask rather than guess.
- Present multiple interpretations when ambiguity exists.
- Push back when a simpler approach exists.
- Stop when confused. Name what's unclear.

### Rule 2 — Simplicity First

- Minimum code that solves the problem. Nothing speculative.
- No features beyond what was asked. No abstractions for single-use code.
- Test: would a senior engineer say this is overcomplicated? If yes, simplify.

### Rule 3 — Surgical Changes

- Touch only what you must. Clean up only your own mess.
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor what isn't broken. Match existing style.

### Rule 4 — Goal-Driven Execution

- Define success criteria. Loop until verified.
- Don't follow steps blindly. Define success and iterate.
- Strong success criteria allow independent looping.

### Rule 5 — Use the Model Only for Judgment Calls

- Use for: classification, drafting, summarization, extraction.
- Do NOT use for: routing, retries, deterministic transforms.
- If code can answer, code answers.

### Rule 6 — Token Budgets Are Not Advisory

- Per-task: 4,000 tokens. Per-session: 30,000 tokens.
- If approaching budget, summarize and start fresh.
- Surface the breach. Do not silently overrun.

### Rule 7 — Surface Conflicts, Don't Average Them

- If requirements conflict, name the conflict and ask.
- Never silently blend contradictory constraints.
- Present the trade-off; let the user decide.


### Rule 8 — Read Before You Write
- Before adding code in a file, read the file's exports, the immediate caller, and any obvious shared utilities.
- If you don't understand why existing code is structured the way it is, ask before adding to it.
- "Looks orthogonal to me" is the most dangerous phrase in this codebase.

### Rule 9 — Tests Verify Intent, Not Just Behavior
- Every test must encode WHY the behavior matters, not just WHAT it does.
- A test like `expect(getUserName()).toBe('John')` is worthless if the function takes a hardcoded ID.
- If you can't write a test that would fail when business logic changes, the function is wrong.

### Rule 10 — Checkpoint After Every Significant Step
- After completing each step in a multi-step task: summarize what was done, what's verified, what's left.
- Don't continue from a state you can't describe back to the user.
- If you lose track, stop and restate.

### Rule 11 — Match the Codebase's Conventions, Even If You Disagree
- If the codebase uses snake_case and you'd prefer camelCase: snake_case.
- If the codebase uses class-based components and you'd prefer hooks: class-based.
- Disagreement is a separate conversation. Inside the codebase, conformance > taste.
- If you genuinely think the convention is harmful, surface it. Don't fork it silently.

### Rule 12 — Fail Loud
- If you can't be sure something worked, say so explicitly.
- "Migration completed" is wrong if 30 records were skipped silently.
- "Tests pass" is wrong if you skipped any.
- "Feature works" is wrong if you didn't verify the edge case asked about.
- Default to surfacing uncertainty, not hiding it.

---

## Defaults

- No comments unless the WHY is non-obvious.
- No trailing summaries ("I just did X") — user can read the diff.
- No emoji unless explicitly requested.
- No new files unless strictly necessary.
