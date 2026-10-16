# Ho Jayega

Private life management for CXOs, business owners, professionals, families, NRIs, senior households, homeowners and relocating families in Guwahati, Assam.

## Run locally

This is a buildless static site. From the repository root:

```sh
python -m http.server 4173
```

Visit http://localhost:4173. Deploy the repository root to Vercel with Framework Preset **Other**, no build command and the root as the output directory.

## Consultation flow

Visitors request an invitation by selecting one or more of ten services, then entering Name, Number, Email, Company, Designation and City (prefilled with editable Guwahati). They open a prepared WhatsApp message containing the services and all six fields to **+91 97605 75646**, and must press Send in WhatsApp. Back navigation preserves selections and details. All service enquiry buttons use this same flow, with the relevant service preselected. The site does not store enquiries.

Contact links and the consultation destination are in `index.html` and `app.js`. Service definitions are in both files. Site styling is in `styles.css`.

## Photography

- `assets/home.jpg`: https://images.unsplash.com/photo-1600210492486-724fe5c67fb0 — illustrative interior.
- `assets/family.jpg`: https://www.pexels.com/photo/two-women-in-traditional-clothing-7685984/ — illustrative Indian family photograph by RDNE Stock project (Pexels).
- `assets/dining.jpg`: https://images.unsplash.com/photo-1414235077428-338989a2e8c0 — illustrative dining photograph.
- `assets/guwahati.jpg`: [Sunset from the bank of Brahmaputra](https://commons.wikimedia.org/wiki/File:Sunset_from_the_bank_of_Brahmaputra.jpg) by Srabanti.basak, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Resized/compressed; displayed with a responsive crop and reduced saturation. This photograph and its adaptations retain that license.

Stock imagery is not represented as HJ clients or HJ-managed properties. In-page photography credits describe provenance. Google Fonts supplies Plus Jakarta Sans and Manrope, with Arial and system sans-serif fallbacks.


## Website experience

- Shared typography tokens in `styles.css` use 16px body text, 15px controls, 14px supporting text and 18px lead paragraphs. Medium body weight and semibold or bold controls improve readability; decorative brand captions use their own scale.
- Every HJ mark uses `assets/hj-monogram.svg`, including the navigation, introduction, manager updates, message previews and footer. Responsive layouts reflow rather than shrinking body text.
- Six audience panels explain support for CXOs, business owners, professionals/families, NRIs, senior households and property owners/relocating families.
- Ten image-free service accordions can be filtered by home/property, family/household and personal/lifestyle.
- Four stages explain discovery, the dedicated manager, WhatsApp requests and closure.
- Six illustrative WhatsApp conversations show executive, home, parent, event, property and travel support.
- Tabs support arrow keys, Home and End. Scroll reveals and entry animations respect reduced-motion preferences; content stays visible without animation scripting.
- The consultation flow remains a request through WhatsApp, with manual confirmation.
