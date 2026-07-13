# STANDARD · UX, Accessibility & Copy — make it genuinely usable for anyone

> **Consult during Build (every screen) and Verify.** "Usable for anyone" — the founder's exact goal — is not just "it doesn't crash." It's that a real person, often on a phone, often non-technical, can understand and complete what they came to do without confusion. This standard covers the experience layer the founder cares about: clarity, accessibility, and human copy.
>
> Tier key: 🔴 must-have · 🟠 strongly expected · 🟡 polish.

---

## 1. The usability bar

- 🔴 A first-time user can complete the **core action** without instructions. If they can't, the design has failed — fix the flow, not the user.
- 🔴 Every screen makes its **primary action obvious** (one clear main button, not five equal ones).
- 🟠 The product works the way users expect (familiar patterns), not a clever-but-confusing reinvention.
- 🟠 Nothing dead-ends: every screen offers a next step or a way back.
- 🟡 Delight where it's cheap (smooth transitions, friendly empties) — but never at the cost of clarity or speed.

## 2. Mobile-first (the founder's users are usually on phones)

- 🔴 Every screen works on a **phone-sized viewport** — no horizontal scrolling, no tiny tap targets, no overflow.
- 🔴 Tap targets are **finger-sized** (comfortably tappable, adequately spaced).
- 🟠 Forms are mobile-friendly: correct keyboard types (numeric for numbers, email for email), minimal typing, sensible autofill.
- 🟠 Test on an actual phone (or accurate device emulation), not just a desktop browser window.
- 🟡 Works in one hand where the product implies on-the-go use.

## 3. The four states on every screen (ties to reliability)

Every screen and data view must visibly handle (see also `standards/reliability-and-edge-cases.md` §3):
- 🔴 **Loading** — a skeleton/spinner; never a frozen blank or a layout flash.
- 🔴 **Empty** — a helpful "nothing here yet" + the next action; never a broken-looking void.
- 🔴 **Error** — a human message + a clear way to retry/recover; never a raw error or white screen.
- 🟠 **Success/confirmation** — the user clearly knows their action worked (e.g. "Order placed ✓").

## 4. Forms (where users get stuck and frustrated)

- 🔴 Every field has a **visible label** (not just placeholder text that vanishes on typing).
- 🔴 **Inline, specific validation messages** ("Enter a 10-digit phone number"), shown near the field, at the right time — not a vague "error" or a wall of red.
- 🟠 Don't lose the user's input on an error — preserve what they typed.
- 🟠 Disable the submit button while submitting (prevents double-submit); show progress.
- 🟠 Ask for the **minimum** — every extra field loses users.
- 🟡 Smart defaults, autofocus the first field, sensible field order.

## 5. Feedback & responsiveness (perceived speed)

- 🔴 Every action gives **immediate feedback** — a tap visibly does something within a moment (highlight, spinner), even if the result takes longer.
- 🟠 Long operations show progress and, where possible, let the user keep using the app.
- 🟠 Optimistic UI where safe (show the likely result instantly, reconcile when the server confirms) — but never fake a success that might fail silently.

## 6. Copy & tone (in the product's voice)

- 🔴 **Error messages are human and actionable** — say what happened and what to do, in plain words. "Payment didn't go through — your card was declined. Try another card or UPI." NOT "Error 402."
- 🟠 Copy matches the product's **persona** (e.g. calm and warm for a spiritual app; crisp and trustworthy for a store). Consistent voice throughout.
- 🟠 No jargon aimed at end users; no blame ("you entered it wrong" → "that doesn't look like a valid number").
- 🟠 Microcopy guides: button labels say what they do ("Place order", not "Submit"); empty states encourage the next step.
- 🟡 Localize/translate where the audience needs it (e.g. Hindi/Hinglish for the founder's users) — confirm with the founder.

## 7. Accessibility (don't exclude people)

- 🟠 **Keyboard usable** — every interactive element reachable and operable by keyboard; visible focus states.
- 🟠 **Sufficient color contrast** between text and background (readable for low-vision users and in sunlight).
- 🟠 **Alt text** on meaningful images; decorative images marked as such.
- 🟠 **Labels and roles** so screen readers can describe controls; don't convey meaning by color alone.
- 🟠 **Respect reduced-motion** preferences; avoid flashing content.
- 🟡 Readable type sizes; logical heading structure; ARIA only where needed and correct.

## 8. Performance as UX (slow is a usability failure)

- 🟠 Pages and the core action feel fast (see `standards/performance-and-cost.md`); a slow app is an unusable app to many users.
- 🟠 Images sized/compressed; don't ship huge bundles that make a phone on a slow connection wait.
- 🟡 Skeletons and progressive loading so the app feels alive while data arrives.

## 9. The usability check (run in Verify)

- [ ] A new user can complete the core action with no instructions (you tried it fresh).
- [ ] Every screen works on a phone; tap targets are finger-sized.
- [ ] Loading / empty / error / success states present and clear on every screen.
- [ ] Forms have labels, inline specific validation, preserved input, disabled-while-submitting.
- [ ] Every action gives immediate feedback.
- [ ] Error messages are human and tell the user what to do.
- [ ] Copy is in the product's voice; no end-user jargon.
- [ ] Keyboard usable; sufficient contrast; alt text on meaningful images.
- [ ] It feels fast on a phone on a normal connection.

## 10. Anti-patterns

- **Placeholder-only "labels"** → vanish on typing; users forget what a field is. Use real labels.
- **Vague errors** ("Something went wrong", "Error 500") → users are stuck and blame themselves. Say what and what-next.
- **Losing typed input on error** → infuriating; users abandon. Preserve it.
- **Tiny tap targets / desktop-only layouts** → unusable on the phones your users actually have. Mobile-first.
- **No feedback on tap** → users tap repeatedly, unsure it worked (and double-submit). Give immediate feedback.
- **Color-only meaning, low contrast, no keyboard support** → excludes real users. Meet the accessibility basics.
- **Clever-but-unfamiliar flows** → confusion. Use patterns users already know.
