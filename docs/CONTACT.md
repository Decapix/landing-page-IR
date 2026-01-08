# Contact form and SMTP setup (Hostinger)

This document explains how the contact form works, environment variables, and how to test locally and on Scaleway Serverless.

## What was implemented ✅
- A serverless-safe API route at `app/api/contact/route.ts` (Node runtime) that sends emails via Hostinger SMTP using `nodemailer`.
- Client form in `src/components/sections/contact-section.tsx` with:
  - client-side validation (required fields + email format)
  - honeypot anti-spam (`company` field, hidden)
  - loading / success / error states
- Secrets are kept server-side only (`SMTP_USER`, `SMTP_PASS`) — **no** `NEXT_PUBLIC_` vars for secrets.
- All form submissions are sent via email to **adonis.pesic@gmail.com** (hardcoded in the API route).

## Environment variables
Local (`.env.local` in project root)
```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_USER=tonmail@tondomaine.com
SMTP_PASS=ton_mot_de_passe
MAIL_FROM="Ton Site <tonmail@tondomaine.com>"
```
- `SMTP_USER` is the email used to authenticate with the SMTP server.
- `SMTP_PASS` is the SMTP password (from Hostinger credentials or generated SMTP password).
- `MAIL_FROM` is the sender email address (optional, defaults to `SMTP_USER`).
- `SMTP_HOST` is the SMTP server hostname (default: `smtp.hostinger.com`).
- `SMTP_PORT` is the SMTP port (default: `465`).
- **Note:** The recipient email is hardcoded to `adonis.pesic@gmail.com` in the API route.

**Do not** commit `.env.local` to git.

## Scaleway Serverless setup
- In the Scaleway console (or CLI), set container environment variables:
  - `SMTP_USER` → your SMTP username
  - `SMTP_PASS` → your SMTP password
  - `SMTP_HOST` → smtp.hostinger.com (optional, has default)
  - `SMTP_PORT` → 465 (optional, has default)
  - `MAIL_FROM` → your sender email (optional)
- Ensure outbound network access to `smtp.hostinger.com:465` is allowed by the platform.

## Security notes
- Honeypot implemented to reduce spam; the server silently accepts submissions with the honeypot filled.
- All validation is performed server-side.
- No secret is exposed client-side.
- The recipient email is hardcoded server-side for security and simplicity.
- Consider additional measures for production (rate-limiting via Redis or third-party service, reCAPTCHA, DKIM/SPF records for deliverability).

## Local testing
1. Install deps: `pnpm install` (or `npm install`) — `nodemailer` is already included.
2. Add `.env.local` with required vars (example below) or use MailHog for local testing (recommended):

### Option A — MailHog (recommended for local dev)
- Start MailHog in Docker:
```bash
docker run -p 8025:8025 -p 1025:1025 mailhog/mailhog
```
- Use these environment variables in `.env.local`:
```
SMTP_HOST=127.0.0.1
SMTP_PORT=1025
SMTP_SECURE=false
SMTP_USER=
SMTP_PASS=
```
- Run the app: `pnpm dev` and open your site. Submit the contact form and open MailHog UI: `http://localhost:8025` to view messages.

### Option B — Real Hostinger SMTP
Add your Hostinger credentials in `.env.local`:
```
SMTP_HOST=smtp.hostinger.com
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=tonmail@tondomaine.com
SMTP_PASS=ton_mot_de_passe
MAIL_FROM="Ton Site <tonmail@tondomaine.com>"
```
Then run `pnpm dev` and submit the form — emails will be sent to `adonis.pesic@gmail.com`.

### Quick curl test (local)
You can POST directly to the API endpoint to test without UI:
```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"firstName":"John","lastName":"Doe","email":"john@example.com","position":"stylist","message":"Hello from local test","language":"en"}'
```
Expected JSON success: `{ "success": true, "message": "Message sent" }` (200) or a validation error (400).


## Production testing (Scaleway)
1. Deploy container to Scaleway Serverless Containers (steps below).
2. Set `SMTP_USER` and `SMTP_PASS` (and optional `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `MAIL_FROM`) as environment variables for the service.
3. Confirm outbound access to `smtp.hostinger.com:465` (or your SMTP port) is allowed.
4. Hit the production site and submit the form.
5. Verify email delivery in `adonis.pesic@gmail.com` mailbox and inspect container logs if anything fails.

### Deploying to Scaleway Serverless Containers (step-by-step)
1. Build the Docker image locally and test it:
   ```bash
   # Build
   docker build -t landing-page:1.0 .

   # Run locally (optional, with MailHog vars or real credentials)
   docker run -e SMTP_HOST=127.0.0.1 -e SMTP_PORT=1025 -e SMTP_SECURE=false -p 3000:3000 landing-page:1.0
   # Then visit http://localhost:3000 and test
   ```

2. Tag the image for your Scaleway registry (replace <namespace> and <repo> accordingly):
   ```bash
   docker tag landing-page:1.0 rg.fr-par.scw.cloud/<namespace>/<repo>:1.0
   ```

3. Authenticate to Scaleway Registry (create a registry credential / robot in the Scaleway console if you haven't already):
   ```bash
   docker login rg.fr-par.scw.cloud
   # Use the registry username and token/password provided by Scaleway
   ```
   - If you get `push access denied` / `insufficient_scope`, check that the credential has **write** permission for that registry/namespace and that the namespace exists.

4. Push the image:
   ```bash
   docker push rg.fr-par.scw.cloud/<namespace>/<repo>:1.0
   ```

5. Create a Serverless Container service in the Scaleway Console and configure:
   - Image: `rg.fr-par.scw.cloud/<namespace>/<repo>:1.0`
   - Container port: `3000` (or use the `PORT` env var in the container)
   - Environment variables:
     - `SMTP_USER`, `SMTP_PASS` (required for Hostinger)
     - `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE` (optional override)
     - `MAIL_FROM` (optional sender override)
   - Health check path: `/api/health` (HTTP 200 expected)
   - Scaling / CPU / Memory per your needs

6. Deploy and verify:
   - Health endpoint: `https://<your-service-domain>/api/health` → 200
   - Contact endpoint: POST to `https://<your-service-domain>/api/contact` or submit the site form
   - Check container logs in the Scaleway Console for nodemailer / auth errors

### Troubleshooting push `insufficient_scope`
- Ensure you logged in with a token that has **write** permissions.
- Verify the `<namespace>` in the image tag is the same namespace the credential can access.
- If needed, create a dedicated robot/credential in Scaleway with explicit write access to the registry.


## Troubleshooting
- `Mailer not configured`: your env vars are missing.
- `Invalid email`: email failed regex check.
- If email is not received: check spam folder, verify your Hostinger SMTP credentials, confirm SPF/DKIM, and ensure Scaleway allows outbound port 465.
- Emails are always sent to `adonis.pesic@gmail.com` - if you need to change the recipient, update the `MAIL_TO` constant in `app/api/contact/route.ts`.

## Notes for maintainers
- The API route uses `runtime = 'nodejs'` to allow use of SMTP sockets. Edge runtime would not work for nodemailer SMTP sockets.
- The recipient email is hardcoded to `adonis.pesic@gmail.com` in the API route for security. To change it, edit line 57 in `app/api/contact/route.ts`.
- For production scale, replace in-memory measures with a persistent rate limiter (Redis) and consider a transactional email provider (SMTP relay / SendGrid) for higher deliverability / observability.
- No database is used - all form submissions are sent directly via email.
