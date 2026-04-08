# Changelog

All notable changes to the AI-Generated Content Integrity Framework (ACIF) will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

---

## [1.0.0] — 2026-04-08

### Added

#### Framework Document
- Complete 41-page ACIF Framework PDF with Harmony Digital Consults branding
- Full Markdown version of the framework for easy reference and version control
- 10 framework sections covering scope, principles, risk classification, age bands, hallucination detection, verification pipeline, data privacy, governance, standards alignment, and implementation
- 3 appendices: Quick Reference Checklists, AI Content Registry Template, Glossary of Key Terms
- References section with clickable source URLs

#### Core Framework Components
- **4 Risk Tiers** (Low, Medium, High, Critical) with defined gate requirements for each
- **6 Age Bands** with vocabulary, theme, and complexity specifications per band
- **Five-Gate Verification Pipeline**: Pre-Delivery Screening, Factual Verification, Age-Appropriateness Review, Curriculum Alignment Check, Final Approval and Labelling
- **FACT Hallucination Detection Method**: Find, Assess, Cross-reference, Tag
- **Hallucination Log** specification for institutional tracking of AI errors
- **AI Content Registry** specification for approved content audit trails
- **Governance structure**: AI Content Integrity Committee (ACIC) with defined roles and responsibilities
- **Escalation procedure** for unresolvable verification issues

#### Standards Alignment
- NERDC 9-Year Basic Education Curriculum alignment matrix
- Nigeria Data Protection Act 2023 (NDPA) compliance mapping
- ISO/IEC 42001:2023 (AI Management Systems) clause mapping
- UNESCO Generative AI in Education (2023) principle alignment

#### Web Verification Tool
- **Dashboard** with institution stats, pipeline visualisation, and quick actions
- **Risk Tier Classifier** — interactive 5-question questionnaire
- **Five-Gate Verification Pipeline** — sequential checklists with gate locking and reviewer sign-off
- **Age-Appropriateness Checker** — band selector with allowed/prohibited theme lists
- **Hallucination Log** — form, searchable table, summary analytics, CSV export
- **Content Registry** — filterable table with expandable detail view and CSV export
- localStorage persistence for all data
- Mobile-responsive design
- Harmony Digital Consults teal branding (#01696F)

#### Documentation
- Comprehensive README with quick-start guides for schools and developers
- Implementation Guide (3-month rollout plan)
- FAQ for common adoption questions
- Glossary of key terms
- Contributing guidelines
- Code of Conduct (Contributor Covenant v2.1)
- Security policy
- GitHub Issue templates (bug report, feature request, framework feedback)

#### Templates
- Hallucination Log CSV template
- Content Registry CSV template
- AI Tool Assessment checklist (Markdown)
- Five-Gate Verification checklist (printable Markdown)
- Parental Communication letter template

---

## [Unreleased]

### Planned for v1.1
- Igbo language translation of the framework
- Integration API specification for EdTech platforms
- Automated readability scoring in the web tool
- Print-friendly stylesheets for the web tool
- Additional age-band guidelines for Special Education Needs (SEN)

---

[1.0.0]: https://github.com/Chukwuemerie-ezieke/acif-framework/releases/tag/v1.0.0
[Unreleased]: https://github.com/Chukwuemerie-ezieke/acif-framework/compare/v1.0.0...HEAD
