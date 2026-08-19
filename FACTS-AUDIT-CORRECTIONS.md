# Fact Register Audit Corrections

## Status

This file records **operative corrections and qualifications** identified by an independent combinatorial audit of [`FACTS.md`](FACTS.md) against [`complete-record.md`](complete-record.md).

It does not replace the fact register. It exists so that no later analytical layer can rely on the affected entries without carrying the correction. These corrections should be folded into `FACTS.md` at the next full-file normalisation pass.

---

## AC-001 — Add 2019 Podiatry low-risk ticks as an adverse fact

### New fact to be normalised

**F-206.** The 2019 Podiatry re-referral records visible **Low Risk** ticks for `No deformity`, `No neuropathy`, and `No PAD`; no visible High Risk or Medium Risk tick is asserted on that 2019 referral page. The same referral separately records callus, gait abnormality, `clawing feet` and pain. **CLIN-003091–003107.**

### Reason

This is materially relevant adverse evidence. It qualifies any proposition that deformity or neuropathy was continuously and uniformly documented across the Podiatry record.

---

## AC-002 — Clarify F-173 temporal/document attribution

### Existing entry

F-173 states that the Podiatry SAR includes a visible `Medium Risk - Foot deformities` tick.

### Operative clarification

The `Medium Risk - Foot deformities` tick belongs to the **older layered referral document received/stamped 10 April 2017**, not to the later 2019 re-referral. The older form also leaves the visible `No neuropathy` low-risk box unticked. **CLIN-002989–003017.**

The later 2019 referral instead visibly records the low-risk ticks described in F-206. **CLIN-003083–003107.**

### Corrected form for future normalisation

**F-173 (clarified).** The older layered Podiatry referral document, received/stamped 10 April 2017, contains a visible `Medium Risk - Foot deformities` tick. This must not be conflated with the later 2019 re-referral, which records different risk-status selections. **CLIN-002989–003017; CLIN-003083–003107.**

---

## AC-003 — Clarify F-162 as retrospective management rationale

### Existing issue

F-162 juxtaposes the 2025 complaint-response statement that Lyrica was used in part to spare further Sinemet increase with the contemporaneous 2023 evidence that Lyrica was commenced by the GP.

### Operative clarification

The statement that Lyrica was used `in part to try to spare further Sinemet increase` is a **2025 retrospective management characterisation** by Neurology. It is not documentary proof that levodopa-sparing was the GP's original reason for commencing pregabalin in 2023.

### Corrected form for future normalisation

**F-162 (clarified).** The 2025 complaint response retrospectively characterised Lyrica as having been used in part to spare further Sinemet increase. The contemporaneous 2023 record separately states that Lyrica was commenced by the GP during severe foot pain. The later levodopa-sparing rationale must not be treated as proof of the GP's original prescribing purpose. **CLIN-002681–002684; CLIN-003263–003269.**

---

## Control rule

Until these changes are incorporated directly into `FACTS.md`:

1. any use of F-162 must carry AC-003;
2. any use of F-173 must carry AC-002;
3. F-206 is to be treated as part of the operative factual field;
4. no longitudinal claim about Podiatry deformity/neuropathy status may omit the internal 2017/2019 documentary tension.
