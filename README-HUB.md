# Renoweet Hub v2.3

This package adds a root `index.html` dashboard so the GitHub Pages repository URL opens normally instead of returning 404.

The dashboard links to:
- Renoweet OS v2.2
- Renoweet Bookkeeping v2.2
- Renoweet BOD v2.2

It is also a Progressive Web App (PWA): `manifest.webmanifest`, `service-worker.js`, icons and an Install button are included.

## GitHub Pages
Upload the **contents of this folder** to the root of the GitHub repository. Keep `index.html` in the repository root. Pages should be configured to deploy from `main` / `(root)`.

The repository root URL will then open the Renoweet Hub automatically.

## Important
The hub does not store Renoweet business data. OS and Bookkeeping continue to use the existing Google Drive v2.2 storage layer. BOD remains read-only.
