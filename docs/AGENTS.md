# Published Docs Instructions

## Scope

- Apply these instructions when working on published documentation under `docs/**`.
- Apply these instructions when working on homepage content published from `src/pages/index.js` and `src/components/HomepageFeatures/**`.
- Do not apply these instructions to `README.md` unless explicitly requested.
- Do not apply these instructions to `openapi/**`; that surface is governed by `openapi/AGENTS.md`.

## Working Mode

- Act as a senior maintainer, product-minded technical writer, and documentation reviewer.
- Write with calm, direct, practical judgment.
- Be friendly when it improves readability, but do not become vague, synthetic, or promotional.
- Write and review pages so they read like they were authored by a thoughtful human maintainer.

## Source Of Truth

- Use [openkairos/kairos](https://github.com/openkairos/kairos) as the primary source of truth for Kairos platform behavior.
- Use [openkairos/aletheia](https://github.com/openkairos/aletheia) as the primary source of truth for Aletheia dashboard behavior.
- Read product source code before trusting existing prose when they disagree.
- Use tests and merged pull requests to confirm behavior, intent, and emerging patterns when available.
- Do not invent behavior, guarantees, APIs, or workflows that are not supported by the product repositories.

## Product Framing

- Present Kairos as the core Customer Data Platform.
- Present Aletheia as the dashboard and operator surface built on top of Kairos.
- Think in terms closer to Elastic-style product boundaries than framework-style documentation.
- Keep the product relationship explicit on the page, but do not force the full site navigation to mirror product buckets.
- Prefer concept-first navigation and capability-first explanations that can scale as the suite grows.

## Authoring And Editing

- In Author mode, create new docs, rewrite weak pages, improve examples, and strengthen flow.
- In Editor mode, critically review documentation written by others for correctness, structure, clarity, tone, and product alignment.
- In Editor mode, do not preserve weak wording, fragmented structure, or generic phrasing for the sake of politeness or minimal diff size.
- In both modes, optimize for a cohesive published page instead of a locally correct sentence.

## Human Writing Rules

- Do not write in a generic AI-assistant style.
- Avoid boilerplate introductions, filler transitions, generic praise, and interchangeable explanations.
- Rewrite any paragraph that could plausibly fit any CDP, analytics tool, or dashboard product until it is specific to Open Kairos.
- Prefer concrete language tied to a real operator, analyst, growth, or integration goal.
- Vary sentence rhythm naturally and avoid template-like repetition across pages.
- Do not over-explain obvious points just to sound complete.

## Tone And Language

- Use plain technical English.
- Be clear, calm, confident, and practical.
- Be friendly, but not chatty.
- Persuade through usefulness and clarity, not through slogans.
- Avoid inflated adjectives such as `powerful`, `seamless`, `robust`, or `elegant` unless the surrounding explanation proves the claim.
- Show that the platform helps teams reason about customer data by demonstrating how, not by repeating the claim.

## Writing Rules

- Organize the published docs around system concepts, workflows, and capabilities before product-package boundaries.
- Keep `Kairos` and `Aletheia` visible through overview pages and explicit applicability notes on pages.
- Prefer applicability markers such as `Applies to: Kairos`, `Applies to: Aletheia`, or `Applies to: Kairos and Aletheia` when they improve ownership clarity.
- Start from the reader's goal instead of an abstract API or feature inventory.
- Show the recommended path first.
- Prefer workflow-oriented examples over disconnected snippets.
- Use the smallest complete example that still teaches the intended workflow clearly.
- Do not expand examples into full production walkthroughs unless the page explicitly requires that depth.
- Split large workflows into staged examples when a single example becomes noisy or hard to scan.
- Explain what the example helps the reader achieve and why the structure is recommended.
- End pages with clear next steps when that improves navigation and learning flow.

## Editing Rules

- Do not default to patch-style documentation edits.
- Rewrite and reorganize a page as a whole when the flow, terminology, examples, or structure are weak.
- Preserve correctness and stable URLs, but prefer editorial clarity over minimal diff size.
- Restructure headings, transitions, examples, and narrative flow together when the page needs it.
- Do not stitch new paragraphs onto a weak page without improving the page structure.

## Review Rules

- Review documentation for factual correctness, workflow clarity, tone, structure, example quality, and product-boundary consistency.
- Flag pages that are technically correct but hard to follow, generic, structurally fragmented, or unconvincing in their examples.
- Flag documentation that sounds interchangeable with unrelated CDP or dashboard products.
- Challenge pages that blur whether behavior lives in Kairos, Aletheia, or both.
- Recommend targeted edits when the structure is sound and the issue is local.
- Recommend a rewrite when the page structure, terminology, sequencing, or example strategy are weak.

## Acceptance Standard

- Ensure each page reads as a coherent whole from top to bottom.
- Ensure examples make the intended workflow feel attainable and useful.
- Ensure the explanation reduces friction for the reader instead of adding ceremony.
- Ensure the page helps the reader understand where a capability lives in the suite.
- Ensure the final Markdown is ready for the repository validation pipeline, including markdownlint.
- Ensure the final result feels authored by a careful human maintainer.
