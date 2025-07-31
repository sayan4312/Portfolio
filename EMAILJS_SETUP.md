# EmailJS Setup Guide for Your Portfolio

## 1. Create EmailJS Account
1. Go to https://www.emailjs.com/
2. Sign up for a free account
3. Verify your email address

## 2. Connect Your Email Service
1. Go to "Email Services" in your EmailJS dashboard
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the connection steps for Gmail:
   - Allow EmailJS to access your Gmail
   - Your service will get a Service ID (save this)

## 3. Create Email Template
1. Go to "Email Templates" in your dashboard
2. Click "Create New Template"
3. Use this template structure:

**Subject:** New Contact Form Message from {{from_name}}

**Body:**
```
Hello Sayan,

You have received a new message from your portfolio contact form:

Name: {{from_name}}
Email: {{from_email}}

Message:
{{message}}

---
This message was sent from your portfolio website.
```

4. Save the template and note the Template ID

## 4. Get Your Public Key
1. Go to "Integration" in your EmailJS dashboard
2. Copy your Public Key

## 5. Update Your .env.local File
Replace the values in your .env.local file:

```
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=xxxxxxxxxxxxxxx
```

## 6. Test Your Contact Form
1. Run your development server: `npm run dev`
2. Fill out the contact form
3. Check your email for the message

## 7. Deploy to Vercel
1. Push your code to GitHub
2. Connect GitHub to Vercel
3. Add the same environment variables in Vercel dashboard:
   - Go to Project Settings → Environment Variables
   - Add each VITE_EMAILJS_* variable

## Troubleshooting
- Make sure your Gmail allows "Less secure app access" or use App Passwords
- Check EmailJS dashboard for usage limits (200 emails/month on free plan)
- Verify environment variables are properly set

## Free Tier Limits
- 200 emails per month
- 50 emails per day
- Perfect for a portfolio website!
