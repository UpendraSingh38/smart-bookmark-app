# Smart Bookmark App

## Overview

Smart Bookmark App is a simple full-stack web application where users can sign in with Google, add personal bookmarks, view them in real time, and delete them securely.
The app is built using **Next.js (App Router)**, **Supabase (Auth, Database, Realtime)**, and **Tailwind CSS**, and is deployed on **Vercel**.

---

## Features

* Google OAuth login (no email/password)
* Private bookmarks per user
* Add and delete bookmarks
* Real-time bookmark updates across tabs
* Responsive dashboard UI
* Live deployment on Vercel

---

## Problems Faced & Solutions

### 1. Google login redirecting to localhost after deployment

**Problem:**
After signing in with Google on the deployed site, the app redirected to:

```
http://localhost:3000/auth/callback
```

**Cause:**
Supabase authentication URL configuration and OAuth redirect settings were still pointing to localhost.

**Solution:**

* Updated **Site URL** in Supabase to the deployed Vercel URL.
* Added the production callback URL:

```
https://your-vercel-domain/auth/callback
```

* Ensured the login code dynamically sets:

```js
redirectTo: `${window.location.origin}/auth/callback`
```

---

### 2. Supabase SSR cookie error (`createServerClient requires getAll and setAll`)

**Problem:**
Dashboard and auth callback routes crashed with cookie configuration errors.

**Cause:**
Incorrect usage of Supabase SSR client in Next.js App Router.

**Solution:**

* Implemented proper cookie handling using Next.js `cookies()` API.
* Passed required cookie methods when creating the server client.

---

### 3. Module not found / incorrect Supabase client export

**Problem:**
Errors like:

```
Module not found: Can't resolve '@/lib/supabaseClient'
```

**Cause:**
Wrong import/export structure in the Supabase client file.

**Solution:**

* Created a proper `createClient()` function.
* Updated all imports to use the correct path and export.

---

### 4. Middleware and authentication protection issues

**Problem:**
Protected routes were not redirecting correctly.

**Cause:**
Deprecated middleware usage and incorrect session checks.

**Solution:**

* Updated authentication logic to modern Next.js App Router patterns.
* Verified session inside dashboard server component and redirected if missing.

---

### 5. Real-time updates not reflecting across tabs

**Problem:**
Bookmarks added in one tab did not appear in another.

**Cause:**
Realtime subscription not configured correctly.

**Solution:**

* Enabled **Supabase Realtime** on the bookmarks table.
* Subscribed to database changes and refreshed UI instantly.

---

## What I Learned

* Proper OAuth redirect configuration is critical for production.
* Supabase SSR in Next.js App Router requires careful cookie handling.
* Real-time features are simple but require correct table permissions and subscriptions.
* Debugging deployment issues is very different from local development.

---

## Live Demo

Deployed on Vercel (https://smart-bookmark-app-three-lake.vercel.app/).

---

## Future Improvements

* Bookmark search and filtering
* Dark mode UI
* Edit bookmark feature
* Pagination for large bookmark lists
* Better mobile responsiveness

---

## Tech Stack

* **Frontend:** Next.js, Tailwind CSS
* **Backend:** Supabase Auth, Database, Realtime
* **Deployment:** Vercel

---

## Author

Upendra Singh
