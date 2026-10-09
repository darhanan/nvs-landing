# Midterm Report — Bootstrap Optimization of the NVS Landing Page

**Course:** WEB Technologies 1 (Front End)
**Assignment:** Using Bootstrap for Optimizing Your Website
**Repository:** [github.com/darhanan/nvs-landing](https://github.com/darhanan/nvs-landing)

---

## 1. Grade structure

| Part | Weight |
|---|---|
| Practical assignment (Bootstrap implementation) | 70% |
| Theory: 3 questions asked during the defense | 30% |

Practical breakdown: Grid 20% · Spacing 20% · Navbar 15% · Buttons 15% · Carousel 10% · Cards 10% · Accessibility 10%.

---

## 2. How to run the project

The page renders with React + Babel in the browser. Babel loads the `.jsx` files over the network, and browsers usually block that when `index.html` is opened directly from disk (`file://`). Use a local server:

```bash
cd nvs-landing
python3 -m http.server 8000
# open http://localhost:8000
```

You need an internet connection, because Bootstrap 5.3.3, React and Babel load from CDNs.

---

## 3. Requirements checklist

| # | Requirement | Status | Where it is |
|---|---|---|---|
| 1 | **Grid layout**: 2-column section (`col-lg-6`) | ✅ | Products: `col-sm-12 col-md-6 col-lg-6` ([sections.jsx:163](sections.jsx#L163)) |
| 1 | **Grid layout**: 3-column section (`col-lg-4`) | ✅ | Case Studies: `col-sm-12 col-md-6 col-lg-4` ([sections.jsx:626](sections.jsx#L626)) |
| 1 | `container` / `container-fluid` | ✅ | Every `<section>` uses `.container` |
| 1 | `col-sm` / `col-md` / `col-lg` used appropriately | ✅ | Also in How We Work, Social Proof, Careers and the footer |
| 2 | **Spacing utilities** (`m-`, `p-`) | ⚠️ Partial | Used throughout the markup, but `styles.css` still contains custom margin/padding |
| 2 | Responsive spacing (`mt-lg-4`, `px-sm-2` style) | ✅ | `mt-2 mt-md-0 pb-2 pb-md-0` ([:41](sections.jsx#L41)), `p-4 p-sm-5` ([:164](sections.jsx#L164)), `ms-md-4` ([:48](sections.jsx#L48)) |
| 3 | **Navbar** with ≥3 links | ✅ | 4 links: Products, Company, Careers, Contact ([sections.jsx:36-61](sections.jsx#L36-L61)) |
| 3 | Background and link styles via Bootstrap classes | ✅ | `bg-dark`, `data-bs-theme="dark"`, `nav-link` |
| 3 | Collapses to a hamburger (`navbar-toggler`) | ✅ | `navbar-expand-md` + `navbar-toggler` + `collapse navbar-collapse` |
| 4 | **Bootstrap buttons** | ✅ | `btn-primary`, `btn-outline-secondary`, `btn-light` |
| 4 | Sizes/states (`btn-outline`, `btn-lg`, `btn-sm`) | ✅ | Hero (`btn-lg`), navbar (`btn-sm`), team controls (disabled state) |
| 4 | `btn-group` (optional) | ✅ | Team carousel controls ([sections.jsx:731](sections.jsx#L731)) |
| 5 | **Carousel** with ≥3 images | ✅ | 2 carousels × 3 screenshots ([sections.jsx:206-258](sections.jsx#L206-L258)) |
| 5 | Indicators and controls | ✅ ⚠️ | Present, but the arrows are invisible until hover ([styles.css:484-492](styles.css#L484-L492)) |
| 6 | **Cards**: ≥3 with image, title, text | ✅ | Team cards: `card-img` + `card-img-overlay` + `card-title` + `card-text` ([sections.jsx:710-723](sections.jsx#L710-L723)) |
| 6 | `card-deck` / `card-group` | ⚠️ | Not used; the cards sit in a `.row` grid (`card-deck` was removed in Bootstrap 5) |
| 7 | Responsive form (optional) | ❌ | No form on the page |
| 8 | Semantic HTML | ✅ | `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`, `<button>` |
| 8 | Accessibility attributes | ✅ | `aria-label`, `aria-controls`, `aria-expanded`, `alt` on all images, `visually-hidden`, skip link ([index.html:26](index.html#L26)) |
| 8 | Contrast | ✅ | Light text on dark backgrounds; focus rings use the brand colour |
| — | Bootstrap files linked correctly | ✅ | CSS + JS bundle from jsDelivr with `integrity` hashes; custom CSS loads **after** Bootstrap ([index.html:12-16](index.html#L12-L16)) |

---

## 4. Issues to fix before the defense

Ordered by how many points each one risks.

### 4.1 Custom spacing in CSS (Spacing, 20%)
The assignment says to "replace **all** custom margins and paddings." These rules still set them by hand:

| Rule | Location | Suggested Bootstrap replacement |
|---|---|---|
| `.container { padding: 0 32px }` | [styles.css:163-167](styles.css#L163-L167) | Remove; Bootstrap `.container` already has gutters, add `px-3 px-lg-4` if needed |
| `.section { padding: var(--section-y) }` | [styles.css:168-171](styles.css#L168-L171) | `py-5` (or `py-5 my-lg-4`) |
| `.panel { padding: 64px }` | [styles.css:174-182](styles.css#L174-L182) | `p-4 p-lg-5` |
| `.hero-eyebrow-row`, `.hero-sub`, `.hero-ctas` margins | [styles.css:344-350](styles.css#L344-L350) | `mb-5`, `mb-4` |
| `.section-head { margin-bottom: 56px }` | [styles.css:409-412](styles.css#L409-L412) | `mb-5` |
| `.how-cell { padding: 40px }` | [styles.css:543-549](styles.css#L543-L549) | `p-4 p-lg-5` |
| `.metrics` margin/padding | [styles.css:567-572](styles.css#L567-L572) | `py-5 mb-5` |
| `.case-card { padding: 36px }` | [styles.css:603-607](styles.css#L603-L607) | `p-4 p-lg-5` |
| Footer paddings | [styles.css:853-879](styles.css#L853-L879) | `pt-5 pb-4 px-3`, `mb-5`, `pt-4` |

### 4.2 Carousel controls hidden (Carousel, 10%)
The prev/next arrows have `opacity: 0` and only appear on hover. Make them always visible, or hover over the carousel during the demo.

### 4.3 Card layout (Cards, 10%)
Choose one:
- Wrap one card set (for example the Case Studies cards) in `<div class="card-group">`, **or**
- Be ready to explain that `card-deck` was removed in Bootstrap 5 and the official replacement is the grid (`.row` + `.col-*` or `row-cols-*`).

The Case Studies cards also have no image. Adding a `card-img-top` to each makes them fully match "image, title, and text."

### 4.4 Unused code ("clean and organized")
`JobescapeVis`, `GenescapeVis`, `FlowVis`, `SignalVis`, `OpsVis` and `PulseVis` ([sections.jsx:260-492](sections.jsx#L260-L492)) are never rendered. Delete them. (`useClock` is still used by `PortraitVis`, so keep it.)

### 4.5 Optional bonus: contact form
Add a form to the "Let's talk" section ([sections.jsx:848-875](sections.jsx#L848-L875)) using `form-label`, `form-control`, `form-check`, `input-group` and a `btn btn-primary` submit, laid out with `row g-3` / `col-md-6`.

---

## 5. Demo plan (what to show, in order)

1. **`index.html`.** Bootstrap CSS loads before `styles.css` so custom styles can override it. The JS bundle (which includes Popper) is needed for the collapse and the carousel.
2. **Navbar.** Shrink the window below 768px, show the hamburger, open and close it. Explain `navbar-expand-md`.
3. **Grid.** Resize the window: Products go 2 → 1 columns, Case Studies go 3 → 2 → 1. Point at the `col-*` classes.
4. **Spacing.** In DevTools, show `p-4 p-sm-5` and `mt-2 mt-md-0` changing at the breakpoints.
5. **Buttons.** Primary vs outline, `btn-lg` vs `btn-sm`, the `btn-group` team controls with their disabled state at the start and end of the list.
6. **Carousel.** Click the indicators and arrows; it auto-plays every 5 seconds.
7. **Cards.** `card`, `card-title`, `card-text`, `card-footer`, `card-img-overlay`.
8. **Accessibility.** Press Tab from the top of the page: the skip link appears, and focus rings are visible on every control. Show the `aria-label`s and `alt` text.

---

## 6. Likely theory questions with answers

### Grid
- **How many columns does the grid have?** 12.
- **What are the breakpoints?** xs < 576px · sm ≥ 576 · md ≥ 768 · lg ≥ 992 · xl ≥ 1200 · xxl ≥ 1400.
- **What does mobile-first mean?** A class like `col-md-6` applies at md **and above**. Below md the column takes full width and the columns stack.
- **`container` vs `container-fluid`?** `container` has a fixed max-width at each breakpoint and is centred. `container-fluid` is always 100% wide.
- **Why is `.row` needed?** It is a flex container with negative margins that balance the column padding (the gutters). `g-0` to `g-5` set the gutter size.
- **What does the grid use under the hood?** Flexbox.

### Spacing utilities
- **What is the naming format?** `{property}{sides}-{breakpoint}-{size}`
  - property: `m` (margin), `p` (padding)
  - sides: `t` top, `b` bottom, `s` start, `e` end, `x` left+right, `y` top+bottom, none = all sides
  - size: `0` = 0, `1` = .25rem, `2` = .5rem, `3` = 1rem, `4` = 1.5rem, `5` = 3rem, `auto`
- **What does `mt-lg-4` mean?** Top margin of 1.5rem from 992px and up.
- **What does `px-sm-2` mean?** Left and right padding of .5rem from 576px and up.
- **Margin vs padding?** Margin is space outside the border; padding is space inside it, between the border and the content (the CSS box model).
- **Why use utilities instead of custom CSS?** One consistent spacing scale, responsive variants built in, and less CSS to maintain.

### Navbar
- **What makes it collapse?** `navbar-expand-{bp}` on the `<nav>`; a `navbar-toggler` button with `data-bs-toggle="collapse"` and `data-bs-target="#id"`; a `.collapse.navbar-collapse` element with that id. It requires Bootstrap's JavaScript.
- **Why `aria-controls` and `aria-expanded`?** They tell screen readers which element the button controls and whether the menu is open.

### Buttons
- **`btn-primary` vs `btn-outline-primary`?** Filled background vs transparent with a coloured border.
- **Sizes?** `btn-lg`, `btn-sm`.
- **What does `btn-group` do?** It joins related buttons into one group; give it `role="group"` and an `aria-label`.
- **Why `<button>` and not `<div>`?** A button can be focused with the keyboard and activated with Enter/Space, and screen readers announce it as a button.

### Carousel
- **What is the structure?** `.carousel.slide` → `.carousel-indicators` → `.carousel-inner` → `.carousel-item` (exactly one `.active`) → `.carousel-control-prev` / `-next`.
- **Which attributes make it work?** `data-bs-ride="carousel"` (autoplay), `data-bs-interval` (delay), `data-bs-slide="prev|next"`, `data-bs-slide-to="n"`.

### Cards
- **What parts does a card have?** `card`, `card-body`, `card-img-top`, `card-title`, `card-text`, `card-footer`, `card-img-overlay`.
- **What happened to `card-deck`?** It was removed in Bootstrap 5. Use grid columns or `row-cols-*`, or `card-group` for cards joined together with no gaps.

### Accessibility
- **What is semantic HTML?** Elements that describe their meaning: `<nav>`, `<main>`, `<header>`, `<footer>`, `<section>`, `<article>`, `<button>`.
- **What contrast does WCAG require?** At least 4.5:1 for normal text and 3:1 for large text.
- **What is `visually-hidden` for?** Text that screen readers announce but that is not shown on screen, such as the carousel's "Previous" and "Next" labels.
- **Why `alt` text?** Screen readers read it aloud, and it is shown if the image fails to load.

### General Bootstrap
- **Bootstrap 4 vs 5?** BS5 dropped jQuery, uses `data-bs-*` attributes, renamed `ml`/`mr` to `ms`/`me`, removed `card-deck`, added the `xxl` breakpoint and CSS variables.
- **How do you customize Bootstrap?** Load your CSS after Bootstrap and override its `--bs-*` CSS variables. This project does that for `.btn`, `.card` and `.navbar` ([styles.css:185-249](styles.css#L185-L249)).
- **What does `<meta name="viewport">` do?** It makes mobile browsers use the real device width, so responsive breakpoints work.
- **CDN vs local files?** A CDN is fast and may already be cached, but needs internet. Local files work offline. The `integrity` attribute (SRI) is a hash check, so a tampered file is not executed.

---

## 7. Questions about this project specifically

- **"The task says HTML and CSS. Why React?"**
  React only splits the page into reusable components. All layout, spacing and components come from Bootstrap classes in the markup (`className` in JSX is the same as `class` in HTML).
- **"Why call `bootstrap.Carousel.getOrCreateInstance` in `useEffect`?"** ([sections.jsx:211](sections.jsx#L211))
  Bootstrap scans the page for `data-bs-ride` when the page loads, but React renders the page after that scan. The carousels have to be started by hand once React has mounted them.
- **"Why close the menu in JavaScript after clicking a link?"** ([sections.jsx:27-32](sections.jsx#L27-L32))
  Links jump to sections on the same page without reloading it, so on mobile the menu would stay open without this.
- **"Why is there still custom CSS?"**
  It holds brand styling (fonts, colours, radii) through Bootstrap's CSS variables. Layout and spacing come from Bootstrap.

---

## 8. Questions to ask the teacher

1. Is React/JSX acceptable, or should the page be plain HTML?
2. Does "replace all custom spacing" mean **no** margin or padding in my own CSS at all, or just the main layout?
3. Is a `row`/`col` grid of cards acceptable instead of `card-group`, since `card-deck` does not exist in Bootstrap 5?
4. Is linking Bootstrap from a CDN fine, or must the Bootstrap files be included locally? (The PDF says "submit … any necessary Bootstrap files.")
5. Does the optional form give bonus points?
6. How should the project be submitted: a zip, GitHub, or a hosted link?
