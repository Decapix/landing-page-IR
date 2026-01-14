# Setup - Book a Demo Form (n8n Webhook)

## Overview

The "Book a Demo" form sends data to an n8n webhook for processing demo requests from the landing page.

## Environment Variables

Add these variables to your `.env.local` file:

```env
N8N_WEBHOOK_URL=https://your-n8n-instance.com/webhook/book-demo
N8N_WEBHOOK_USER=83RsIe8bxrPm
N8N_WEBHOOK_PASS=rv6mxGj82MoG7fS6yKm2mrOE
```

| Variable | Description |
|----------|-------------|
| `N8N_WEBHOOK_URL` | The full URL of your n8n webhook endpoint |
| `N8N_WEBHOOK_USER` | Username for Basic Auth |
| `N8N_WEBHOOK_PASS` | Password for Basic Auth |

## n8n Webhook Setup

### 1. Create a new Workflow in n8n

1. Open your n8n instance
2. Create a new workflow
3. Add a **Webhook** node as the trigger

### 2. Configure the Webhook Node

- **HTTP Method**: POST
- **Path**: `book-demo` (or your preferred path)
- **Authentication**: Basic Auth
  - **User**: `83RsIe8bxrPm`
  - **Password**: `rv6mxGj82MoG7fS6yKm2mrOE`
- **Response Mode**: When Last Node Finishes (recommended)

### 3. Get the Webhook URL

After configuring the webhook:
1. Click on the webhook node
2. Copy the **Production URL** (not the test URL)
3. Update `N8N_WEBHOOK_URL` in your `.env.local`

Example URL format:
```
https://your-n8n-instance.com/webhook/book-demo
```

## Data Payload

The form sends the following JSON payload to n8n:

```json
{
  "userType": "stylist | press_office | brand",
  "firstName": "John",
  "lastName": "Doe",
  "email": "john@example.com",
  "phone": "+33 6 12 34 56 78",
  "country": "France",
  "socialMedia": "@johndoe",
  "role": "Art Director",
  "language": "fr | en",
  "submittedAt": "2024-01-15T10:30:00.000Z"
}
```

### Field Descriptions

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `userType` | string | Yes | One of: `stylist`, `press_office`, `brand` |
| `firstName` | string | Yes | User's first name |
| `lastName` | string | Yes | User's last name |
| `email` | string | Yes | User's email address |
| `phone` | string | Yes | Phone number |
| `country` | string | Yes | Country |
| `socialMedia` | string | No | Social media handle/link |
| `role` | string | Yes | Job function/role |
| `language` | string | Yes | Form language (`fr` or `en`) |
| `submittedAt` | string | Yes | ISO timestamp of submission |

## Example n8n Workflow

After the webhook, you can add nodes to:

1. **Send Email Notification** - Notify your team of new demo requests
2. **Add to Google Sheets** - Log submissions to a spreadsheet
3. **Create CRM Entry** - Add lead to your CRM (HubSpot, Salesforce, etc.)
4. **Send Slack Message** - Notify a Slack channel

### Example: Email Notification

Add an **Email Send** node after the webhook:

```
To: sales@inside-runway.com
Subject: New Demo Request from {{ $json.firstName }} {{ $json.lastName }}
Body:
  New demo booking request:
  
  Type: {{ $json.userType }}
  Name: {{ $json.firstName }} {{ $json.lastName }}
  Email: {{ $json.email }}
  Phone: {{ $json.phone }}
  Country: {{ $json.country }}
  Role: {{ $json.role }}
  Social Media: {{ $json.socialMedia }}
  Language: {{ $json.language }}
  Submitted: {{ $json.submittedAt }}
```

## Testing

### Local Testing

1. Start your dev server: `npm run dev`
2. Navigate to `/book-demo`
3. Fill out the form and submit
4. Check your n8n workflow execution history

### Verifying the Webhook

You can test the webhook directly with curl:

```bash
curl -X POST https://your-n8n-instance.com/webhook/book-demo \
  -u "83RsIe8bxrPm:rv6mxGj82MoG7fS6yKm2mrOE" \
  -H "Content-Type: application/json" \
  -d '{
    "userType": "stylist",
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "phone": "+33 6 00 00 00 00",
    "country": "France",
    "socialMedia": "@test",
    "role": "Tester",
    "language": "en",
    "submittedAt": "2024-01-15T10:00:00.000Z"
  }'
```

## Troubleshooting

### Form submission fails

1. Check that `N8N_WEBHOOK_URL` is correctly set in `.env.local`
2. Verify the n8n workflow is active (not in draft mode)
3. Check n8n execution logs for errors

### Authentication errors (401)

1. Verify Basic Auth credentials match between `.env.local` and n8n webhook config
2. Ensure n8n webhook has Basic Auth enabled

### n8n not receiving data

1. Check if the workflow is active
2. Verify the webhook URL path matches
3. Check n8n's execution history for incoming requests

## Production Deployment

When deploying to production:

1. Set environment variables in your hosting platform (Vercel, etc.)
2. Use the production webhook URL (not test URL)
3. Ensure n8n workflow is activated
4. Test the form after deployment
