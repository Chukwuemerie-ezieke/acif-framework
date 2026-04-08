# Contributing to ACIF

Thank you for your interest in contributing to the AI-Generated Content Integrity Framework. ACIF is an open framework designed to be adopted, adapted, and improved by educators, developers, policymakers, and anyone working at the intersection of AI and education.

## How You Can Contribute

### 1. Framework Content

The ACIF framework is a living document. We welcome contributions that:

- **Improve existing sections** — Clarify language, fix errors, add examples
- **Expand age-band guidelines** — Provide more detailed specifications for specific subjects or age groups
- **Add subject-specific guidance** — E.g., how to verify AI-generated content in Mathematics vs. History vs. Science
- **Propose new standards alignment** — Map ACIF to additional international or national standards
- **Translate the framework** — Make ACIF accessible in Igbo, Yoruba, Hausa, French, or other languages used in African education

**How to submit framework changes:**
1. Fork the repository
2. Edit the relevant Markdown files in `docs/`
3. Submit a Pull Request with a clear description of what you changed and why
4. Use the **Framework Feedback** issue template if you want to discuss a change before implementing it

### 2. Web Tool Development

The ACIF Verification Pipeline Tool is a static HTML/CSS/JS application. Contributions welcome:

- **Bug fixes** — Report bugs using the Bug Report issue template
- **New features** — E.g., print-friendly views, accessibility improvements, data export formats
- **UI/UX improvements** — Better mobile experience, dark mode, improved workflows
- **Integration examples** — Show how to integrate ACIF verification into other EdTech platforms

**Technical guidelines for web tool contributions:**
- The tool must remain a static site (no server-side dependencies)
- All data persistence uses localStorage
- No external CDN dependencies — all assets must be inline or bundled
- Mobile-responsive design is required
- Follow the existing code style and naming conventions
- Test on Chrome, Firefox, and Safari before submitting

### 3. Templates

We welcome additional templates that help schools implement ACIF:

- Training materials for teachers
- Audit report templates
- Compliance assessment forms
- Integration checklists for EdTech vendors

### 4. Translations

ACIF should be accessible in the languages used in Nigerian and African classrooms. Priority translations:

1. **Igbo** (highest priority)
2. **Yoruba**
3. **Hausa**
4. **French** (for Francophone African countries)
5. **Arabic** (for Northern Nigeria)

To contribute a translation:
1. Create a new folder: `docs/translations/{language-code}/`
2. Translate the framework Markdown file
3. Submit a Pull Request

## Contribution Process

### For Small Changes (typos, clarifications)
1. Fork the repository
2. Make your changes
3. Submit a Pull Request

### For Significant Changes (new sections, features)
1. Open an Issue first to discuss your proposal
2. Wait for feedback from maintainers
3. Fork the repository
4. Create a feature branch: `git checkout -b feature/your-feature-name`
5. Make your changes
6. Submit a Pull Request referencing the Issue

### Pull Request Guidelines
- Provide a clear title and description
- Reference any related Issues
- For framework changes: explain the pedagogical or compliance rationale
- For web tool changes: include screenshots of UI changes
- Ensure all existing functionality still works

## Code of Conduct

All contributors must follow our [Code of Conduct](CODE_OF_CONDUCT.md). We are committed to providing a welcoming and inclusive environment for everyone.

## Questions?

If you have questions about contributing, open a Discussion or Issue on the repository. We are happy to help you get started.

---

*Thank you for helping make AI-generated content safer for students across Africa.*
