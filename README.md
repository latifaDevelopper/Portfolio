# Latifa Khairat — Portfolio upgrade

## Files
- `index.html` — page structure and all portfolio sections.
- `style.css` — responsive dark navy / purple-blue gradient design.
- `script.js` — mobile menu, typing text, project filters, reveal animations, active navigation, and contact form handling.

## Run locally
Keep the three files in the same folder and open `index.html` in your browser. An internet connection is needed for Google Fonts, Font Awesome, and Typed.js CDN assets.

## Important: configure the contact form
The form intentionally does not contain the access key from the old uploaded source. This avoids publishing the previous key again.

1. Create or open your Web3Forms account and generate an access key.
2. In `index.html`, find `<form class="contact-form reveal" id="contactForm">`.
3. Add your key as a `data-access-key` attribute, for example:
   `<form class="contact-form reveal" id="contactForm" data-access-key="YOUR_WEB3FORMS_ACCESS_KEY">`
4. Test the form using a message you can recognize.

If you do not configure the key, the form displays a clear setup message rather than pretending that a message was sent.

## Project links
The original eight project destinations have been preserved where supplied. The preview images are lightweight CSS illustrations, so no local screenshot files are required. Replace a project URL in `index.html` if a live link changes.

## CV
The old source referenced `Simple Professional CV Resume.pdf`, but that PDF was not included with the supplied files. Add your current CV PDF to this folder and add a link to it in the page if you want a download button.

## Notes
- Built with plain HTML, CSS and JavaScript; no React or build tools required.
- Skill labels are descriptive rather than unsupported percentage bars.
- Test the layout on desktop and mobile before publishing.
