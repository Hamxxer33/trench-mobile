import { ScrollViewStyleReset } from 'expo-router/html';
import type { ReactNode } from 'react';

/** Dark-only shell (Figma lock) — ignore prefers-color-scheme light. */
export default function Root({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="color-scheme" content="dark only" />
        <ScrollViewStyleReset />
        <style dangerouslySetInnerHTML={{ __html: darkOnlyBackground }} />
      </head>
      <body>{children}</body>
    </html>
  );
}

const darkOnlyBackground = `
body {
  background-color: #0A0B0D;
}
`;
