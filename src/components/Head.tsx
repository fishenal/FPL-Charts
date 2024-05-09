import Head from "next/head";

export const CommonHead = ({
  title = "FPL-Charts",
  desc = "Analytics tool of Fantasy Premier League(FPL), History of FPL",
  pageName = "",
}: {
  title?: string;
  desc?: string;
  pageName?: string;
}) => {
  const siteUrl = "https://fpl-charts.com";
  return (
    <Head>
      <title>
        {title} | {pageName}
      </title>
      <meta name="description" content={desc} />
      <meta charSet="utf-8" />
      <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      <meta name="generator" content="Next.js" />
      <meta
        name="keywords"
        content="fpl charts, fpl analytics, fpl pridict, fpl tools, charts, fpl,fpl game history, premierleague,fantasy game,football fantasy game,analytics tool,fantasy game analytics tool"
      />
      <meta name="referrer" content="origin" />
      <meta name="robots" content="index, follow" />
      <link rel="icon" href={`${siteUrl}/icon.png`} />
      <link rel="manifest" href={`${siteUrl}/site.webmanifest`} />
      <link rel="apple-touch-icon" href={`${siteUrl}/icon.png`} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:site_name" content={title} />
      <meta property="og:title" content={`${title} | ${pageName}`} />
      <meta property="og:description" content={desc} />
      <meta property="og:image" content={`${siteUrl}/icon.png`} />
      <meta name="abstract" content={desc} />
    </Head>
  );
};
