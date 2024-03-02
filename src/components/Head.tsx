import { FC } from "hono/jsx";
import { Style } from "hono/css";

export const Head: FC = (props) => {
  return (
    <head>
      <title>{props.metadata.title}</title>
      <Style />
      <link rel="icon" type="image/svg+xml" href="/favicon.ico" />
      <link rel="sitemap" href="/sitemap.xml" />
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width,initial-scale=1" />
      <meta name="title" content={props.metadata.title} />
      <meta name="description" content={props.metadata.description} />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={props.metadata.url} />
      <meta property="og:title" content={props.metadata.title} />
      <meta property="og:description" content={props.metadata.description} />
      <meta property="og:image" content={props.metadata.ogImage} />
      {/* Twitter Card */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={props.metadata.url} />
      <meta property="twitter:title" content={props.metadata.title} />
      <meta
        property="twitter:description"
        content={props.metadata.description}
      />
      <meta property="twitter:image" content={props.metadata.ogImage} />
    </head>
  );
};
