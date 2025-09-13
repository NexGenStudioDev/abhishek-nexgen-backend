import React from 'react';
import ReactDOMServer from 'react-dom/server';
import { execSync } from 'child_process';
import juice from 'juice';

export function renderEmail(component: React.ReactElement): string {
  return ReactDOMServer.renderToStaticMarkup(component);
}

export function applyTailwindAndInline(html: string): string {
  // Optionally, you can pass this HTML through tailwind CLI or postcss
  // Example: write HTML to file, run tailwind build, read file
  const inlined = juice(html); // juice inlines CSS
  return inlined;
}
