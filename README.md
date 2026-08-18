# Clinical Documentary Case

This repository is deliberately flat. It contains one evidential record, one chronology, one clinical argument, and one set of expert questions.

## Reading order

1. **[complete-record.md](complete-record.md)** — the documentary source of truth. Primary clinical material, contemporaneous correspondence, podiatry material, prescribing information, medication use/response, and stable `CLIN-` locators.
2. **[TIMELINE.md](TIMELINE.md)** — clinical chronology extracted from the record. Prescription events and actual medication-use/response events are kept distinct where the source permits.
3. **[CLINICAL-ARGUMENT.md](CLINICAL-ARGUMENT.md)** — the five-proposition documentary clinical argument. It must not outrun the record.
4. **[EXPERT-QUESTIONS.md](EXPERT-QUESTIONS.md)** — the questions for independent specialist opinion. They are derived from the argument rather than used to predetermine it.

## Control rule

> **Record → sequence → analysis → expert questions.**

`complete-record.md` governs every downstream document. The timeline is chronological, not argumentative. The clinical argument distinguishes documentary fact from inference. The expert questions remain open to answers in either direction.

## Scope

Clinical only. The repository runs from the presenting history and 2017 referral through longitudinal treatment, podiatry and medication evidence to the February 2026 genetic confirmation. Complaint-handling, GDPR and wider governance material are outside this repository except where a clinical document itself forms part of the evidential record.
