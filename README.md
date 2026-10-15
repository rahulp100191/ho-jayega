# Ho Jayega

Private home, family and lifestyle concierge website for Guwahati, Assam.

## Run locally

This is a buildless static site. From the repository root:

```sh
python -m http.server 4173
```

Visit http://localhost:4173. Deploy the repository root to Vercel with Framework Preset **Other**, no build command and the root as the output directory.

## Consultation flow

Visitors select one or more of ten services, enter contact details and a preferred date/time with time zone, review the request, consent, and open a prepared WhatsApp message to **+91 97605 75646**. They must send the message in WhatsApp. The team manually confirms availability and call details; the site does not reserve calendar slots or store enquiries.

Contact links and the consultation destination are in `index.html` and `app.js`. Service definitions are in both files. Site styling is in `styles.css`.

## Photography

- `assets/home.jpg`: https://images.unsplash.com/photo-1600210492486-724fe5c67fb0 — illustrative interior.
- `assets/family.jpg`: https://www.pexels.com/photo/two-women-in-traditional-clothing-7685984/ — illustrative Indian family photograph by RDNE Stock project (Pexels).
- `assets/dining.jpg`: https://images.unsplash.com/photo-1414235077428-338989a2e8c0 — illustrative dining photograph.
- `assets/guwahati.jpg`: [Sunset from the bank of Brahmaputra](https://commons.wikimedia.org/wiki/File:Sunset_from_the_bank_of_Brahmaputra.jpg) by Srabanti.basak, [CC BY-SA 4.0](https://creativecommons.org/licenses/by-sa/4.0/). Resized/compressed; displayed with a responsive crop and reduced saturation. This photograph and its adaptations retain that license.

Stock imagery is not represented as HJ clients or HJ-managed properties. In-page photography credits describe provenance. Google Fonts supplies Manrope, with Arial and system sans-serif fallbacks.
