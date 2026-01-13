# Portfolio — Visual Storyteller

This is a minimal static portfolio template for videography, photography, visual design, and graphic design. It includes a gallery with a modal viewer.

How to use
- Open `index.html` in a browser (double-click or use a static server).
- Replace sample images in the `<img>` tags inside the `gallery` section with your own files in the `assets` folder.
- Edit the text content (bio, contact, project captions) in `index.html`.

GitHub Pages deployment (no Netlify/Vercel)
1. Create a Git repository (if you haven't already):

```bash
git init
git add .
git commit -m "Initial portfolio"
```

2. Push to GitHub (create a repo on GitHub, then):

```bash
git remote add origin https://github.com/<your-username>/<your-repo>.git
git branch -M main
git push -u origin main
```

3. On GitHub, enable Pages: go to Settings → Pages and set the source to the `main` branch (root). After a minute your site will be available at `https://<your-username>.github.io/<your-repo>/`.

4. Notes: replace placeholders (email, phone, social links, and video iframe src) in [index.html](index.html) with your real values before publishing.

Final polish & local preview
- I replaced external sample images with local placeholders in `assets/`:
  - `assets/showreel-placeholder.svg`
  - `assets/photo-placeholder.svg`
  - `assets/design-placeholder.svg`
- Accessibility improvements: focus outlines, ARIA on interactive controls, keyboard support for Kuro's Den.
- Micro interactions: subtle hover & focus animations for buttons and menu items.

Preview locally (two options):
```bash
# Option A: Python (already included earlier)
python -m http.server 8000
# Option B: using package.json script (if you want a uniform command)
npm run preview
```

Replace the placeholder images by placing your files in `assets/` and updating the `src` values in `index.html`. The Kuro's Den interactive card is ready — click "Welcome to the Kuro's Den" then "Categories ▾" to reveal the three categories.


Local server (optional)
```bash
# using Python 3
python -m http.server 8000
# then open http://localhost:8000 in your browser
```

Files
- [index.html](index.html) — main site
- [styles.css](styles.css) — styles
- [script.js](script.js) — gallery modal logic

Next steps
- Add your images to the `assets` folder and update `index.html` to point to them.
- Optionally integrate a lightweight build (Parcel/Vite) or deploy to Netlify/Vercel.
