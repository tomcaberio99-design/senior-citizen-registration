# Senior Citizen Registration

A simple `Next.js` app for senior citizen pre-registration that can be deployed on Vercel.

## Features

- Online registration form
- Automatic age computation
- Validation for applicants below 60 years old
- Simple API route for submission handling
- Responsive layout for mobile and desktop

## Run locally

```bash
npm install
npm run dev
```

## Deploy to Vercel

1. Push the `senior-citizen-registration` folder to GitHub.
2. Import the repository in Vercel.
3. Vercel will detect `Next.js` automatically.
4. Click Deploy.

## Notes

- The current version only validates and returns a reference number.
- If you want, the next step is connecting this to a real database like Supabase, Neon, or Firebase.
