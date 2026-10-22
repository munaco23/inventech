# Inventech UI/UX Design Rules

These rules define the design, UI/UX, and coding standards for the Inventech project. Every agent and developer must strictly adhere to these rules across all pages (`index.html`, `about.html`, services, etc.) and component files.

---

## 1. 🖼️ Images & Visual Stages
- **No Heavy Box Shadows:** Do NOT apply heavy drop shadows, multiple shadow layers, or glowing colored auras on images or their visual wrapper frames.
- **Clean Framing:** If a container is needed around an image, use a clean background with at most a subtle 1px border (`#e2e8f0` or `rgba(226, 232, 240, 0.8)`) and soft rounded corners.
- **Natural Look:** Images should sit cleanly and organically within the layout without looking artificially raised or bloated.

---

## 2. 🔘 Buttons & Call-to-Actions (CTAs)
- **Only Where Strictly Necessary:** Do NOT flood sections with multiple buttons. Only include buttons where there is a clear, essential user action (e.g., primary contact/inquiry CTA).
- **Single Primary Action:** Prefer 1 high-impact primary button over multiple redundant secondary buttons.
- **Background Color:** Must always use the **Inventech Brand Color** (`#0eb8a9` or `linear-gradient(135deg, #0eb8a9 0%, #2FD5C7 100%)`).
- **Text & Icon Color:** Must ALWAYS be **Pure White (`#ffffff !important`)**, both in default state AND in hover state.
- **Hover State:** On hover, slightly darken or enrich the background (`#088377` to `#0eb8a9`). The text and icon MUST remain `#ffffff !important` with high contrast and never disappear or blend into the background.

---

## 3. 🚫 No Unnecessary Pills, Badges, or Micro-Tags
- **Zero Rush & Clutter:** Do NOT create excessive micro-pills, fast-fact chips (e.g., "Est. 2021", "100% In-House"), floating image corner tags (e.g., "Inventech Studio"), or redundant breadcrumb tabs.
- **Direct & Confident Copy:** Present information through strong typography, clean paragraphs, and structured headings instead of scattering small pill boxes all over the screen.
- **Balanced Spacing:** Ensure direct vertical hierarchy: Badge (if essential) -> Heading -> Lead Paragraph -> Action Button without random pill grids in between.

---

## 4. 📐 Limited Shadows & Modern Minimal UI
- **Minimalist Depth:** Avoid heavy, dark, or multi-stop box shadows (`box-shadow: 0 20px 50px...`).
- **Crisp Borders:** Use thin, refined border lines (`border: 1px solid #e2e8f0` or `#edf2f7`) to separate or frame elements cleanly.
- **Generous Spacing:** Rely on balanced margins, clean line heights, and proper whitespace rather than loud visual effects to create hierarchy.

---

## 5. 🧹 Clean, Modular & Performant Code
- **Modular Component Structure:** Section styles belong in their respective component folders (e.g. `components/about/<section>/<section>.css`).
- **No Dead Code:** Remove unused selectors, obsolete breadcrumb styles, removed badge classes, and duplicate overrides.
- **Responsive by Default:** Ensure clean single-column collapsing on mobile screens (`max-width: 640px` and `max-width: 992px`) without horizontal overflow.
