# Security Policy

## Scope

This security policy covers:
- The ACIF web-based verification tool (`web-tool/`)
- The framework documentation and templates
- The repository infrastructure

## Reporting a Vulnerability

If you discover a security vulnerability in the ACIF web tool or any component of this repository, please report it responsibly.

**Do NOT open a public Issue for security vulnerabilities.**

Instead, report vulnerabilities by:
1. Emailing Harmony Digital Consults Ltd directly with the subject line: `[ACIF Security] Brief description`
2. Include:
   - Description of the vulnerability
   - Steps to reproduce
   - Potential impact
   - Suggested fix (if any)

We will acknowledge your report within 48 hours and provide a timeline for resolution.

## Security Considerations for ACIF Implementations

### Web Tool Security

The ACIF web tool is a client-side application that stores data in browser localStorage. Institutions should be aware of:

- **localStorage is not encrypted** — Do not store student personal data, passwords, or sensitive information in the web tool
- **localStorage is browser-specific** — Data does not sync across devices or browsers
- **localStorage can be cleared** — Users clearing browser data will lose all stored records
- **No authentication** — The tool does not implement user authentication. For multi-user environments, institutions should deploy the tool behind their existing authentication systems

### Recommended Security Practices for Institutions

1. **Do not enter student personal data into AI tools** — This is both a framework requirement (Section 7.2) and a data protection obligation under the NDPA 2023
2. **Assess AI tool data handling** — Before institutional adoption, evaluate each AI tool's data retention, cross-border transfer, and training data policies
3. **Maintain audit trails** — Use the Content Registry to track all AI-generated content approvals
4. **Regular backups** — Export Hallucination Log and Content Registry data regularly using the CSV export feature
5. **Access control** — Limit who can approve content at Gate 5 (Final Approval) to designated personnel

## Supported Versions

| Version | Supported |
|---|---|
| 1.0.x | Yes |

## Responsible Disclosure

We follow responsible disclosure practices. If a vulnerability is reported:
1. We will confirm receipt within 48 hours
2. We will investigate and determine the impact
3. We will develop and test a fix
4. We will release the fix and credit the reporter (unless anonymity is requested)
5. We will publish a security advisory if the vulnerability affects deployed instances

---

*Harmony Digital Consults Ltd takes the security of educational tools seriously. Thank you for helping keep ACIF safe.*
