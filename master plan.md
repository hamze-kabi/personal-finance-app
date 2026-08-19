[DONE] **Phase 0: Project Setup & Foundation**

[DONE]- **0.1. Install and configure core stack**
[DONE] - 0.1.1. `nextjs` 14+ (with App Router)
[DONE] - 0.1.2. `typescript`
[DONE] - 0.1.3. `tailwindcss`
[DONE] - 0.1.4. `zustand`
[DONE] - 0.1.5. `zod`
[DONE] - 0.1.6. `next-i18next`

[DONE]- **0.2. Create project structure (folders)**

[DONE]- **0.3. Initialize Supabase project**

[DONE]- **0.4. Store API keys in `.env.local`**

---

[] **Phase 1: Backend & Data Layer**

[DONE]- **1.1. Design and create database tables**
[DONE] - 1.1.1. `users`
[DONE] - 1.1.2. `transactions`
[DONE] - 1.1.3. `budgets`
[DONE] - 1.1.4. `pots`
[DONE] - 1.1.5. `recurring_bills`

[DONE]- **1.2. Enable Row Level Security (RLS)**

[DONE]- **1.3. Seed database with initial data (delete `data.json`)**

[DONE]- **1.4. Set up Supabase client**
[DONE] - 1.4.1. `lib/supabase/client.ts`
[DONE] - 1.4.2. `lib/supabase/server.ts`
[] - RLS of tables are disabled, let it be disabled till we are in development phase. re enable it when we want to implement authentication

[DONE]- **1.5. Define TypeScript types and Zod schemas**
[DONE] - 1.5.1. `types/index.ts`
[DONE] - 1.5.2. `schemas/index.ts`

[DONE]- **1.6. Write Server Actions**
[DONE] - 1.6.1. `actions/createTransaction.ts`
[DONE] - 1.6.2. `actions/getTransactions.ts`
[DONE] - 1.6.3. `actions/updateBudget.ts`
[DONE] - 1.6.4. `actions/deletePot.ts`

[DONE]- **1.7. Test Server Actions**

---

[] **Phase 2: Foundation & Layout**

[DONE]- **2.1. Build the main layout**
[DONE] - 2.1.1. Create the sidebar (bottom bar on mobile/tablet)
[DONE] - 2.1.2. Implement sidebar open/close functionality
[DONE] - 2.1.3. Make the layout responsive (Mobile First)

[DONE]- **2.2. Create page skeletons**
[DONE] - 2.2.1. Overview page
[DONE] - 2.2.2. Transactions page
[DONE] - 2.2.3. Budgets page
[DONE] - 2.2.4. Pots page
[DONE] - 2.2.5. Recurring Bills page

[DONE]- **2.3. Set up Zustand store**

---

[DONE] **Phase 3: Connect Data & Logic**

[DONE]- **3.1. Hydrate components with real data**

[]- **3.2. Implement core features**
[DONE] - 3.2.1. Overview (Balance, income, expense, summaries)
[DONE] - 3.2.2. Transactions (Paginated list, search, sort, filter)
[DONE] - 3.2.3. Budgets (CRUD)
[] - 3.2.4. Pots (Add/Withdraw money)
[] - 3.2.5. Recurring Bills

[]- **3.3. Add loading and error states**

[]- **3.4. Add form validation**

[]- **3.5. Add "See Details" links**

[]- **3.6. Test every feature**

---

[] **Phase 4: Authentication & Security**

[]- **4.1. Set up Supabase Auth**

[]- **4.2. Create sign-up and sign-in pages**

[]- **4.3. Protect routes (middleware)**

[]- **4.4. Update Server Actions**

[]- **4.5. Update data fetching**

---

[] **Phase 5: Styling & Polish**

[]- **5.1. Install fonts**

[]- **5.2. Add assets (logos, icons, images)**

[]- **5.3. Apply colors**

[]- **5.4. Apply sizing and positioning**

[]- **5.5. Add animations and effects**
[] - 5.5.1. Add hover and focus states to all interactive elements
[] - 5.5.2. Add smooth transitions (e.g., for sidebar open/close)

[]- **5.6. Add i18n translations (Farsi & English)**
[] - 5.6.1. Create `fa.json` and `en.json` translation files
[] - 5.6.2. Replace all hardcoded text with `t('key')` function
[] - 5.6.3. Add a language switcher (e.g., a toggle button)

[]- **5.7. Final testing**

---

[] **Phase 6: Deployment & Handover**

[]- **6.1. Push your code to a GitHub repository**

[]- **6.2. Connect your GitHub repo to Vercel**

[]- **6.3. Set up environment variables on Vercel**

[]- **6.4. Deploy to Vercel**

[]- **6.5. Test in production**

[]- **6.6. Prepare your portfolio**

[]- **6.7. Prepare a demo script**
