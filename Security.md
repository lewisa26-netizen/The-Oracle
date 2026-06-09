# SECURITY.md

Security Policy for The Oracle

Overview  
The Oracle is an interactive guessing game powered by Groq LLMs. This document outlines security expectations, safe handling requirements, and the vulnerability reporting process for contributors and users.

API Keys and Secret Management  
- Never expose the Groq API key in client side code such as index.html or browser JavaScript.  
- All LLM requests must be routed through a server side proxy.  
- Store secrets using environment variables such as GROQ_API_KEY.  
- Do not commit .env files or secret values to Git.  
- Rotate keys immediately if exposure is suspected.  
- Remove leaked keys from Git history using secure rewriting tools.

User Input Safety and Prompt Injection Mitigation  
- Treat all user input as untrusted.  
- Escape or sanitize any text that is rendered back into the DOM.  
- Avoid using innerHTML with user provided content.  
- When sending user input to Groq:  
  - Wrap it in structured JSON fields.  
  - Avoid raw string concatenation in prompts.  
  - Use system prompts that restrict model behavior.

Rate Limiting and Abuse Prevention  
- Apply rate limiting to all backend endpoints that call Groq.  
- Recommended baseline: 5–20 requests per minute per IP.  
- Validate request payloads:  
  - Enforce max length  
  - Enforce expected schema  
  - Reject malformed or oversized requests  
- Do not allow direct client to Groq calls.

Web Application Security  
- Serve all production deployments over HTTPS.  
- Use a strict Content Security Policy (CSP).  
- Disable inline scripts unless using nonces.  
- Avoid storing or logging sensitive user content.  
- Do not log full Groq prompts or responses in production.

Dependency and Server Hardening  
- Keep all dependencies updated.  
- Avoid deprecated or unmaintained libraries.  
- Ensure server errors do not expose stack traces or internal details.  
- Never include API keys or secrets in logs or error messages.

Vulnerability Reporting  
If you discover a security issue in The Oracle, please report it responsibly:  
- Open a GitHub Security Advisory, or  
- Contact the maintainer via a GitHub Issue labeled Security  

Response targets:  
- Acknowledgement within 72 hours  
- Critical issues addressed as soon as reasonably possible

Responsible Disclosure  
We request that all researchers follow responsible disclosure practices and avoid publicly posting vulnerabilities until a fix is available.
