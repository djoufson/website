# Commission System V1 Specification for djoufson.com

## Overview

This document defines the first version of the artwork commission system for djoufson.com.

The goal is to allow visitors to request custom artwork commissions in a professional way while keeping implementation complexity and operating costs close to zero.

This version deliberately avoids:

* Databases
* Authentication
* User accounts
* Client dashboards
* Real-time chat
* Order tracking systems
* Automated invoicing
* Integrated payment gateways

The objective is to validate demand before investing in a more sophisticated platform.

---

# Product Vision

The commission system should feel:

* Professional
* Trustworthy
* Personal
* Low friction

The visitor should feel they are commissioning an independent digital artist rather than interacting with a generic e-commerce platform.

---

# User Journey

## Discovery

User browses:

```text
/art
```

and views artworks.

Throughout the gallery there should be clear CTAs:

```text
Request Similar Artwork
Commission Me
Get Your Own Illustration
```

---

## Commission Information

User lands on:

```text
/art/commissions
```

This page explains:

* Available commission types
* Pricing
* Process
* Delivery expectations
* Revision policy
* Payment policy

---

## Commission Request

User clicks:

```text
Request a Commission
```

and is redirected to:

```text
/art/request
```

The user fills a structured commission form.

The form is submitted to Formspree.

The artist receives an email notification.

Form submissions are stored by Formspree and can include file uploads. Formspree supports file uploads, stores submissions, and can send email notifications without requiring a custom backend. ([Formspree Docs][1])

---

## Manual Discussion

After submission:

1. Djoufson reviews the request
2. Djoufson replies by email
3. Requirements are clarified
4. Final quote is agreed upon

Communication occurs through email.

No in-app messaging is implemented in V1.

---

## Payment

After agreement:

1. Djoufson generates a payment link
2. Link is emailed to the client
3. Client pays deposit
4. Work begins

No payment functionality is implemented directly on the website in V1.

---

# Site Structure

## New Routes

```text
/art
/art/commissions
/art/request
```

---

# Commissions Page

## Hero Section

Title:

```text
Custom Digital Artwork
```

Subtitle:

```text
Commission original digital illustrations created specifically for you.
```

Primary CTA:

```text
Request a Commission
```

---

## Commission Types

### Portrait

Example:

```text
Starting from $40
```

Suitable for:

* Profile pictures
* Social media
* Personal branding

---

### Half Body

Example:

```text
Starting from $70
```

---

### Full Body

Example:

```text
Starting from $120
```

---

### Custom Project

For:

* Character design
* Fan art
* Posters
* Special requests

Pricing:

```text
Custom Quote
```

---

## Process Section

Visual timeline:

```text
1. Submit Request
2. Discuss Details
3. Approve Quote
4. Pay Deposit
5. Artwork Creation
6. Delivery
```

---

## FAQ

Examples:

### How long does it take?

```text
Usually between 1 and 4 weeks depending on complexity.
```

### Do you accept revisions?

```text
Yes, limited revisions are included.
```

### Do you start before payment?

```text
No.
```

---

# Commission Request Form

## Form Provider

Use:

[Formspree](https://formspree.io/?utm_source=chatgpt.com)

Reasons:

* No backend required
* Email notifications
* Submission storage
* File uploads
* Spam protection
* Easy integration with Next.js

Formspree supports notifications, submission storage, uploads, and workflow automation without requiring a custom server. ([Formspree][2])

---

## Fields

### Commission Type

Required.

Options:

```text
Portrait
Half Body
Full Body
Custom Project
```

---

### Full Name

Required.

---

### Email Address

Required.

Validation:

```text
email
```

---

### Country

Optional.

---

### Budget Range

Required.

Options:

```text
Under $50
$50 - $100
$100 - $250
$250+
```

---

### Intended Use

Required.

Options:

```text
Personal
Social Media
Commercial
Other
```

---

### Description

Required.

Multi-line textarea.

Prompt:

```text
Describe your project in as much detail as possible.
```

---

### Deadline

Optional.

---

### Reference Images

Optional.

Multiple uploads.

Accepted:

```text
jpg
jpeg
png
webp
```

Formspree supports multipart uploads and multiple file attachments. ([Formspree Docs][1])

---

## Spam Protection

Enable:

* Formspree spam filtering
* Honeypot field
* Cloudflare Turnstile (optional)

Formspree provides spam protection and supports additional CAPTCHA mechanisms. ([Formspree][2])

---

# Email Workflow

## Submission Email

When a submission is received:

Email subject:

```text
[Commission Request] {{CommissionType}} - {{Name}}
```

Example:

```text
[Commission Request] Portrait - John Smith
```

---

## Internal Tracking ID

Generate client-side:

```text
ART-2026-0001
ART-2026-0002
ART-2026-0003
```

Include in form submission.

Example subject:

```text
[ART-2026-0004] Portrait Commission
```

Purpose:

* Easier email management
* Easier searching
* Future migration path

---

# Payment Strategy

## V1 Goal

Do NOT integrate payment processing into the website.

No checkout.

No cart.

No payment page.

No payment database.

---

## Payment Flow

After commission approval:

```text
Client receives quote
↓
Client receives payment link
↓
Client pays deposit
↓
Work begins
```

---

## Supported Payment Methods

The payment provider should support:

* Visa
* Mastercard
* MTN Mobile Money
* Orange Money

The website itself should remain payment-provider agnostic.

The only requirement is the ability to send a payment URL to the client.

---

## Deposit Policy

Recommended:

```text
50% upfront
50% before final delivery
```

Alternative:

```text
100% upfront
```

for smaller commissions.

---

# What Must NOT Be Built

The following are explicitly out of scope:

## Authentication

Do not implement:

```text
Login
Register
Forgot Password
```

---

## Chat

Do not implement:

```text
In-app messaging
Chat threads
Notifications
```

---

## Order Tracking

Do not implement:

```text
Order status pages
Progress tracking
Customer dashboards
```

---

## Payment Processing

Do not implement:

```text
Checkout
Invoices
Subscriptions
Payment webhooks
Refund handling
```

---

# Future V2 Ideas

Only after commission demand is validated:

## Database

Store:

* Requests
* Clients
* Quotes
* Orders

---

## Client Portal

Allow clients to:

* View status
* Download files
* Review history

---

## Payment Integration

Direct payment links.

Possible features:

* Deposits
* Final payment requests
* Receipts

---

# Definition of Done

Feature is complete when:

* `/art/commissions` exists
* `/art/request` exists
* Formspree integration works
* File uploads work
* Email notifications work
* Spam protection is enabled
* Commission process is clearly explained
* Payment policy is documented
* No database exists
* No authentication exists
* No payment gateway exists
* No chat exists

Success is measured by receiving commission requests, not by technical sophistication.

[1]: https://help.formspree.io/articles/building-your-form/file-uploads?utm_source=chatgpt.com "File uploads - Formspree Docs"
[2]: https://formspree.io/?utm_source=chatgpt.com "Custom Forms with No Server Code | Formspree | Formspree"
