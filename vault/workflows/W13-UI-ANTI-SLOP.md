# W13 — UI Creation Without AI Slop

Trigger: building any screen, page, or app UI. Companion to W11 (mechanics) and
C09 (taste). This doc exists because model-generated UI regresses to a recognizable
median — "AI slop" — unless actively steered away.

## The slop signature (banned by default — each needs explicit justification to use)
1. Purple-to-blue gradient heroes; gradient text on headings.
2. Glassmorphism cards / frosted panels / floating blur blobs in the background.
3. Emoji as icons (🚀✨💡) and sparkle motifs anywhere in a business app.
4. Three-feature-cards-with-icons row; testimonial carousel with invented personas.
5. `rounded-2xl` + heavy drop shadow on every element; shadow as decoration.
6. Vague hero copy: "Empower your business", "Seamless experience", "Get Started"
   buttons that don't say what starts.
7. Default Inter/Poppins with no typographic decision made.
8. Dark dashboard with neon accents when nobody asked for dark mode.
9. Landing-page aesthetics applied to WORK TOOLS (cards + whitespace where an
   operator needs a dense table).
10. Skeleton screens/spinners added as vibes while real states (W11's four) are missing.

## Why slop happens (know the mechanism to resist it)
Slop is the median of training data — what you produce when the prompt doesn't
constrain you and you design from priors instead of from the content. The fix is
never "try harder"; it's adding constraints BEFORE generating.

## The anti-slop procedure (before writing any markup)
1. **Content first:** obtain or write the REAL content (real product names, real
   numbers, real field labels, realistic data lengths). Design around lorem ipsum =
   layout that breaks on contact with reality, and generic looks are guaranteed.
2. **Name the app's genre and density:** operator tool (dense, tabular, keyboard-fast) /
   consumer commerce (trust, imagery, few choices) / field PWA (huge targets, works in
   sunlight, one hand). His portfolio: admin panels are OPERATOR tools — tables beat
   cards; advisor app is FIELD PWA; TIP website is CONSUMER.
3. **Pick one reference** — a real product in the same genre (e.g., a broker back
   office for admin panels, a top D2C brand for the website) and take its density,
   nav pattern, and restraint. Referencing one specific product prevents regression
   to the median of all products.
4. **Fix tokens before components:** ONE accent (from the brand — TIP = warm
   gold/saffron family), one neutral scale, one font pair chosen on purpose, the
   4/8/12/16/24/32/48 spacing scale, ONE corner radius, shadows at most 2 levels.
   Write them down; every component uses only these.
5. **Microcopy is specific:** buttons name the action's object ("Generate payment
   link", "Mark EMI collected") — never "Submit", "Get Started", "Learn More".
6. Build with the tokens; decorate NOTHING that lacks function.

## The two acceptance tests
- **Squint test (C09):** hierarchy survives blur.
- **The anonymity test:** screenshot it and ask "could this belong to any random
  startup?" If yes — the brand, content, or density hasn't shaped it; return to
  steps 1–4. A good UI is recognizably THIS product's UI.

## Failure this prevents
Interchangeable purple-gradient screens, admin panels that look like landing pages,
layouts that shatter on real data, UI that signals "AI-generated" to every visitor.

## Linked
[[C09-TASTE]] · [[W11-UI-COMPONENT]]
