import Head from "next/head";
import { Badge } from "nextjs-components/src/components/Badge";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nextjs components</title>
        <meta name="description" content="Nextjs components" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Badge>asdas</Badge>
    </div>
  );
}
