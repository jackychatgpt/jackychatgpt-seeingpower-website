Hero/banner integration and image optimization

Files added in this branch:
- assets/hero/hero.html  -> Fragment with the <section> snippet to drop into your page
- assets/hero/hero.css   -> Styles for the hero

How to integrate into your site
1) Put the <section> from assets/hero/hero.html near the top of your <body> (place it before your site header if you want "clear before banner anything").
2) Import or copy the CSS rules from assets/hero/hero.css into your main stylesheet, or link it in the page head:
   <link rel="stylesheet" href="/assets/hero/hero.css">
3) Add your banner images under /assets/images/ (recommended filenames):
   - banner-1200.jpg  (mobile)
   - banner-1600.jpg  (tablet)
   - banner-2560.jpg  (desktop)
   And WebP versions: banner-1200.webp, banner-1600.webp, banner-2560.webp

Image optimization commands (ImageMagick + cwebp)
- Resize and strip metadata:
  convert input.jpg -strip -interlace Plane -quality 86 -resize 2560x output-2560.jpg
  convert input.jpg -strip -interlace Plane -quality 86 -resize 1600x output-1600.jpg
  convert input.jpg -strip -interlace Plane -quality 86 -resize 1200x output-1200.jpg
- Convert to WebP (Google cwebp):
  cwebp -q 80 output-2560.jpg -o banner-2560.webp
  cwebp -q 80 output-1600.jpg -o banner-1600.webp
  cwebp -q 80 output-1200.jpg -o banner-1200.webp

Accessibility & SEO
- Use an informative alt attribute on the <img> (current alt text is a good starting point).
- If the image is decorative only, set alt="" and aria-hidden="true" on the picture.

Next steps I can take for you (reply with one):
- "upload images": I will add the original image you provided into /assets/images/ and (optionally) generate the resized WebP/JPEG files and push them here. (Note: adding large binaries increases PR size.)
- "open PR": I will open a pull request on behalf of the branch (if you want me to open it via the UI I can provide the PR body; otherwise, open it yourself from the branch page).
- "integrate into layout": Provide a link to the page file (e.g., index.html) and I will modify it to include the hero and link the CSS.

Legal reminder: Ensure you have the right/licence to publish the provided photo on an official website.
