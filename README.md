# Automatic Line Code Generator

A web tool to generate barcode labels with JsBarcode.

## Features

- Select Brand, Sub Brand, and Product to generate unique barcodes
- Generate multiple barcodes at once
- Barcodes rendered using CODE128 format via JsBarcode
- Activity history with pagination
- LocalStorage persistence

## How to Use

1. Select a Brand from the dropdown.
2. Select a Sub Brand from the dropdown.
3. Select a Product from the dropdown.
4. Enter the number of barcodes to generate.
5. Click "Generate" to create barcodes.

## Hosting

This is a static website that can be hosted on any web server or static site host.

### GitHub Pages

To host on GitHub Pages:

1. Go to your repository settings.
2. Scroll down to "Pages".
3. Under "Source", select "Deploy from a branch".
4. Select the main branch and the root folder.
5. Save.

Your site will be available at `https://<username>.github.io/<repository-name>/`

### Local Development

To run locally, you can use a simple HTTP server.

If you have Python installed:
```
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

Or use Node.js with `http-server`:
```
npx http-server
```
