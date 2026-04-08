# Frequently Asked Questions (FAQ)

## General Questions

### What is ACIF?
ACIF (AI-Generated Content Integrity Framework) is a comprehensive set of standards and verification processes designed to ensure that AI-generated curriculum content is factually accurate, age-appropriate, culturally safe, and aligned with national curriculum standards before it reaches students in classrooms.

### Who developed ACIF?
ACIF was developed by Harmony Digital Consults Ltd, an EdTech company based in Anambra State, Nigeria, specialising in educational technology, school management systems, and digital compliance solutions.

### Who should use ACIF?
- Schools and educational institutions using AI tools to create or supplement curriculum content
- EdTech companies building AI-powered educational platforms
- Curriculum developers and content creators using AI assistants
- Education policymakers developing AI governance guidelines

### Is ACIF mandatory?
ACIF is a voluntary framework. However, as AI regulation evolves in Nigeria and globally, frameworks like ACIF will increasingly become expected practice. Schools using Harmony Digital Consults platforms (EduTrack Nigeria, Harmony School Suite) have ACIF embedded into their content workflows.

### Does ACIF apply only to Nigerian schools?
While ACIF is designed with the Nigerian educational context (NERDC curriculum, NDPA 2023), the framework principles and verification pipeline are universally applicable. Schools in other African countries can adopt ACIF and adapt the curriculum alignment section (Gate 4) to their national standards.

---

## Implementation Questions

### How long does it take to implement ACIF?
The recommended rollout is 3 months:
- Month 1: Governance setup and AI audit
- Month 2: Staff training and pipeline setup
- Month 3: Full operation

See the [Implementation Guide](IMPLEMENTATION_GUIDE.md) for the detailed timeline.

### Does ACIF require special software?
No. ACIF can be implemented with:
- The free web-based verification tool (included in this repository)
- Printable checklists (included in `templates/`)
- A shared spreadsheet for the Hallucination Log and Content Registry

No server, internet connection (after initial setup), or software purchases are required.

### How much time does verification add per lesson?
- **Tier 1 content** (low risk): 5–10 minutes
- **Tier 2 content** (medium risk): 15–30 minutes
- **Tier 3 content** (high risk): 30–60 minutes
- **Tier 4 content** (critical): 1–2 hours (includes multiple reviewers)

Most classroom AI-generated content falls into Tier 1 or 2. As staff become experienced, verification time decreases significantly.

### Can one person handle all five gates?
For Tier 1 content, one educator can handle Gates 1 and 5. For Tier 2 and above, the framework requires at least two different reviewers (content creator and subject expert/department head) to prevent single-point-of-failure in verification.

---

## Technical Questions

### What AI tools does ACIF apply to?
ACIF applies to any AI tool used to generate curriculum content, including but not limited to:
- Large Language Models: ChatGPT, Gemini, Claude, Perplexity, Llama
- AI writing assistants: Jasper, Copy.ai, Writesonic
- AI tutoring platforms that generate content
- AI image generators used for educational materials

### Does ACIF work with AI-generated images?
Yes. The Age-Appropriateness Framework (Section 4) includes guidelines for AI-generated images, such as requiring cartoon-style only for Early Childhood (Band 1) and prohibiting photorealistic depictions of people for young children.

### Does the web tool send data anywhere?
No. The ACIF web tool is entirely client-side. All data is stored in your browser's localStorage. No data is transmitted to any server. This means:
- Your data stays on your device
- You need to export (CSV) regularly as a backup
- Data does not sync across devices

---

## Data Protection Questions

### Does ACIF help with NDPA compliance?
Yes. Section 7 of the framework specifically addresses Nigeria Data Protection Act 2023 compliance, including:
- Consent requirements for processing children's data
- Prohibited data inputs (student names, grades, medical info must never go into AI tools)
- AI platform assessment criteria
- Data subject rights (transparency about AI tool usage)
- Guidance on Data Protection Impact Assessments for high-risk AI content processing

### Can teachers enter student names into ChatGPT for lesson planning?
No. Section 7.2 of ACIF explicitly prohibits entering student personal data (names, grades, medical info, addresses, photos) into AI generation tools without NDPA-compliant consent. Teachers should use anonymised or generic examples when prompting AI tools.

### Do we need to tell parents we use AI tools?
Yes. ACIF recommends proactive parental communication about:
- Which AI tools are used in curriculum development
- The verification process that protects students
- Data protection measures in place
- How parents can request information about AI tool usage

A template letter is included in `templates/parental-communication.md`.

---

## Framework Content Questions

### How were the age bands determined?
The six age bands are based on:
- Nigerian educational level structure (Nursery, Primary 1–3, Primary 4–6, JSS 1–3, SS 1–3, Pre-Tertiary)
- Developmental psychology research on cognitive, emotional, and social readiness
- Lexile reading level ranges for each age group
- UNESCO and UNICEF guidelines on age-appropriate digital content
- NERDC curriculum scope and theme expectations per level

### What is the FACT method based on?
The FACT method is based on established fact-checking methodologies used in journalism and academic publishing, adapted for the educational context. It draws on:
- Factored verification research (breaking summaries into individual claims for checking)
- Semantic entropy methods for detecting AI hallucinations (Oxford University research)
- Source triangulation principles (requiring 2+ independent sources)
- The specific risks of AI hallucination in educational content

### How often should the framework be updated?
The ACIF recommends:
- Quarterly reviews of the Hallucination Log to identify trends
- Annual review of age-band standards and curriculum alignment
- Annual full framework revision by the AI Content Integrity Committee
- Immediate review if a significant AI incident occurs or new regulations are enacted

---

## Licensing Questions

### Can I use ACIF in my school for free?
Yes. ACIF is licensed under Creative Commons Attribution-ShareAlike 4.0 (CC BY-SA 4.0). You can freely use, copy, and adapt the framework for your institution.

### Can I modify ACIF for my country's curriculum?
Yes. You are encouraged to adapt ACIF to your national context. Under the CC BY-SA 4.0 license, you must give credit to Harmony Digital Consults Ltd and share your adaptations under the same license.

### Can I use ACIF in a commercial product?
Yes, under CC BY-SA 4.0. You must give attribution and share any derivative works under the same license. For commercial licensing discussions beyond CC BY-SA 4.0 terms, contact Harmony Digital Consults Ltd.

---

*Have a question not answered here? Open an Issue on the GitHub repository.*
