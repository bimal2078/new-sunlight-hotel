# New Sunlight Hotel & Party Palace website

React + Vite + Tailwind CSS. Single page with anchor navigation.

## Run
    npm install
    npm run dev      # development
    npm run build    # production files in /dist

## Before going live
1. Open `src/data/siteData.js` and set `contact.formEndpoint` (e.g. a Formspree URL). Until then the form shows that sending is not connected and sends nothing.
2. Add confirmed phone / WhatsApp / email, the exact Google Maps listing link, real room details and prices.
3. Put verified photos in `public/images/` and reference them in `siteData.js` (rooms, gallery) and `Hero` in `src/components/Sections.jsx`.
4. Add parking as a feature only after the hotel confirms it.
