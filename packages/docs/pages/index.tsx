import Head from "next/head";
import Link from "next/link";
import { Badge } from "nextjs-components/src/components/Badge";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nextjs components</title>
        <meta name="description" content="Nextjs components" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Link href="/design/button">
        <a>
          <Badge>Go to Docs</Badge>
        </a>
      </Link>
    </div>
  );
}
