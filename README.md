# LUBIT Digital — 3D creative studio website

A responsive Next.js website starter with an abstract 3D hero, colourful project cards, animated typography and mobile navigation.

## Requirements

- Node.js 20.9 or newer
- npm

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Production build

```bash
npm run build
npm start
```

## Before publishing

1. Replace `example.com` in `app/layout.tsx` with the real domain.
2. Verify that the LUBIT Digital name and domain are available before committing to them.
3. Replace the placeholder email `hello@lubitdigital.com` with an address you control.
4. Replace concept projects with genuine work as it is completed. Keep concepts labelled honestly.
5. Connect a real enquiry form endpoint. The current contact CTA uses email and is not a database-backed form.
6. Add privacy and terms pages if collecting personal information.
7. Test on real Android devices and current desktop browsers.
8. Run `npm run build` before deployment.

## Deployment

Import this repository into Vercel and use the default Next.js build settings. Add your domain after name/domain checks.

## Performance notes

- The WebGL hero is dynamically imported and does not block server rendering.
- The canvas uses a capped device-pixel ratio and low-power GPU preference.
- CSS provides the visual fallback while the 3D scene loads.
- `prefers-reduced-motion` disables continuous CSS animations.
- For production, test WebGL behaviour on target mobile devices and consider adding a dedicated low-power static fallback if the device cannot create a WebGL context.

## Project structure

```text
app/
  globals.css
  layout.tsx
  page.tsx
components/
  Scene.tsx
  Site.tsx
```
