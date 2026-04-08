# ACIF Implementation Guide

A step-by-step guide for schools and educational institutions adopting the AI-Generated Content Integrity Framework.

---

## Prerequisites

Before implementing ACIF, your institution should have:

- [ ] At least one staff member familiar with AI content generation tools (ChatGPT, Gemini, Claude, etc.)
- [ ] A basic understanding of the NERDC national curriculum for your school level
- [ ] Awareness of the Nigeria Data Protection Act 2023 (NDPA) requirements
- [ ] Administrative support from school leadership for the implementation

---

## Phase 1: Foundation (Month 1)

### Week 1–2: Establish Governance

1. **Appoint an AI Content Officer (ACO)**
   - This should be the ICT Coordinator, a senior teacher, or a designated academic lead
   - The ACO will champion the framework and chair the AI Content Integrity Committee

2. **Form the AI Content Integrity Committee (ACIC)**
   - AI Content Officer (Chair)
   - Curriculum Lead (Head of Department or Academic Director)
   - Data Protection Lead (can be the same as ACO in smaller schools)
   - Parent/Community Representative (from PTA)

3. **Announce the initiative**
   - Brief school leadership on the framework
   - Communicate to all teaching staff that ACIF is being adopted

### Week 3–4: Audit Current AI Usage

4. **Complete an AI Tool Inventory**
   - Survey all teachers: Which AI tools do you currently use?
   - Document: tool name, purpose, frequency of use, what data is entered
   - Use the [AI Tool Assessment Template](../templates/ai-tool-assessment.md) for each tool

5. **Assess NDPA compliance**
   - For each AI tool in the inventory, evaluate:
     - Does the tool process student personal data?
     - Where is data stored (Nigeria, outside Nigeria)?
     - Does the tool train on user-submitted data?
     - Is there a data processing agreement available?
   - Flag any tools that require action (consent collection, alternative tools, etc.)

6. **Baseline assessment**
   - Review a sample of AI-generated content currently in use
   - Apply the FACT method to 5–10 pieces of existing AI-generated content
   - Document any hallucinations or issues found — this establishes the baseline

---

## Phase 2: Pipeline Setup (Month 2)

### Week 5–6: Train Staff

7. **Conduct ACIF training for all content-creating educators**
   - Cover: Core Principles, Risk Tiers, Age Bands, FACT Method, Five-Gate Pipeline
   - Duration: 2-hour workshop (can be split into two 1-hour sessions)
   - Use the [Gate Checklist Template](../templates/gate-checklist.md) as a training handout

8. **Hands-on practice**
   - Each teacher generates a piece of AI content in their subject area
   - Apply the Risk Tier Classifier (use the web tool or manual classification)
   - Walk through all 5 gates as a group exercise
   - Log any hallucinations found during the exercise

### Week 7–8: Set Up Systems

9. **Deploy the ACIF Web Tool**
   - Open `web-tool/index.html` on school computers or a shared server
   - Enter the institution name in the Dashboard
   - Train designated staff on each module

10. **Set up the Hallucination Log**
    - Use the web tool's built-in Hallucination Log module, OR
    - Use the [Hallucination Log CSV Template](../templates/hallucination-log.csv) in a shared Google Sheet

11. **Set up the AI Content Registry**
    - Use the web tool's Content Registry module, OR
    - Use the [Content Registry CSV Template](../templates/content-registry.csv) in a shared Google Sheet

12. **Conduct trial runs**
    - Select 2–3 teachers to use the full pipeline for real content this week
    - The ACO reviews their experience and adjusts processes as needed

---

## Phase 3: Full Operation (Month 3)

### Week 9–10: Go Live

13. **Announce full ACIF implementation**
    - All AI-generated content entering the classroom now passes through the appropriate gates
    - Teachers must classify content by Risk Tier before generating it

14. **Prepare parental communication**
    - Use the [Parental Communication Template](../templates/parental-communication.md) to inform parents about:
      - The school's use of AI tools in curriculum development
      - The ACIF verification process that protects their children
      - Data protection measures in place
      - How parents can request information about AI tool usage

### Week 11–12: Monitor and Adjust

15. **First monthly review**
    - ACO reviews the Hallucination Log: How many hallucinations were found? In which subjects? With which tools?
    - Review the Content Registry: How many items have been processed? What is the average time from generation to approval?
    - Identify bottlenecks in the pipeline and adjust

16. **Schedule quarterly reviews**
    - Set calendar dates for quarterly ACIC meetings
    - Agenda: Hallucination Log analysis, framework effectiveness review, staff feedback, AI tool re-assessment

---

## Ongoing Maintenance

| Activity | Frequency | Responsible |
|---|---|---|
| Hallucination Log review | Monthly | AI Content Officer |
| Content Registry audit | Monthly | AI Content Officer |
| AI tool re-assessment | Every 6 months | Data Protection Lead |
| Staff training refresh | Every 6 months | AI Content Officer |
| Full framework review | Annually | Full ACIC |
| Age-band standards update | Annually | Curriculum Lead |
| Parental communication update | Annually | ACIC + Parent Rep |
| NDPA compliance audit | Annually | Data Protection Lead |

---

## Scaling Tips

### For Small Schools (1–10 teachers)
- The ACO can serve as both ACO and Data Protection Lead
- Gates 1–3 can be combined into a single review by the subject teacher
- Gate 4 can be reviewed by the Head Teacher
- Use the printable gate checklists rather than the web tool if computer access is limited

### For Large Schools (10+ teachers)
- Appoint departmental AI Content Champions to oversee Gates 1–3 within their department
- The ACO focuses on Gate 5 and overall compliance
- Use the web tool for centralised tracking and reporting
- Consider integrating ACIF into existing school management systems

### For School Groups / Networks
- Adopt a single ACIF instance with shared standards across all schools
- Centralise the Hallucination Log to identify trends across the network
- Appoint a Network AI Content Lead to coordinate implementation
- Share verified content across schools through a shared Content Registry

---

## Common Challenges and Solutions

| Challenge | Solution |
|---|---|
| Teachers resist the extra verification steps | Emphasise that Tier 1 content needs only 2 gates. Focus on building the habit with low-risk content first. |
| Not enough time for verification | Start with one subject per term. Build verification into existing lesson planning time rather than adding new tasks. |
| Limited internet access for AI tools | Focus ACIF on content that was generated when internet was available. The verification pipeline works offline. |
| No subject expert available for Gate 2 | Use the FACT method with textbooks and NERDC curriculum as primary verification sources. Flag content for later expert review. |
| Parents concerned about AI in education | Use the parental communication template. Emphasise that ACIF exists precisely to protect their children from AI risks. |

---

## Success Metrics

After 6 months of ACIF implementation, evaluate:

- **Hallucination detection rate**: Are teachers finding and correcting AI errors before they reach students?
- **Pipeline compliance**: What percentage of AI-generated content passes through all required gates?
- **Time efficiency**: Is the average gate-to-gate time decreasing as staff become more experienced?
- **Content quality**: Has the overall quality of AI-generated content improved (fewer Tier upgrades due to red flags)?
- **Staff confidence**: Do teachers feel more confident using AI tools responsibly?

---

*For support with ACIF implementation, contact Harmony Digital Consults Ltd or open an Issue on the GitHub repository.*
