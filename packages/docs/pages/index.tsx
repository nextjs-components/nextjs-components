import Head from "next/head";
import Link from "next/link";
import { Badge, Container } from "nextjs-components";

export default function Home() {
  return (
    <div>
      <Head>
        <title>Nextjs components</title>
        <meta name="description" content="Nextjs components" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container wrapper>
        <Container center>
          <Link href="/design/button">
            <a>
              <Badge>Go to Docs</Badge>
            </a>
          </Link>
        </Container>
      </Container>
    </div>
  );
}
