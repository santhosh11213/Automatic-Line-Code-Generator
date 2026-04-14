# Automatic Line Code Generator

A simple web tool to generate numbered lines from input text.

## Features

- Input text in a textarea
- Generate numbered lines
- Display output in a preformatted block

## How to Use

1. Enter your text in the input area.
2. Click the "Generate Code" button.
3. View the numbered output below.

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