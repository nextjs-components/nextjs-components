"use client";

import Link from "next/link";
import {
  Button,
  Container,
  Description,
  Spacer,
  Stack,
  useTheme,
} from "nextjs-components";

import { ThemeSwitcher } from "@/app/theme-switcher";
import { Example } from "@/components/example";

import styles from "./index.module.css";

const Page = () => {
  const { resolvedTheme } = useTheme();
  return (
    <div>
      <section className={styles.gradient_bg}>
        <Container wrapper>
          <Container>
            <Spacer y={4} />
            <div className={styles.title}>
              <h1>Nextjs components</h1>
              <Spacer y={1} />
            </div>

            <div className={styles.subtitle}>
              <p>
                A collection of components, transcribed from Vercel’s design
                system.
              </p>
            </div>

            <Spacer y={1} />
            <div>
              <Link href="/design/introduction" className={styles.install}>
                Go to the docs →
              </Link>
            </div>
            <Spacer y={2} />

            <Stack gap={6}>
              <Example>
                <Stack gap={4} style={{ width: 300 }}>
                  <Description
                    title="Button"
                    tooltip="pressy clicky things"
                    content="Press me!"
                  />
                  <Button onClick={() => alert("hi")}>hi</Button>
                </Stack>
              </Example>

              <Example>
                <Stack gap={4} style={{ width: 300 }}>
                  <Description
                    title="Stack"
                    tooltip="Stacky stack"
                    content="Stack things either vertically or horizontally"
                  />
                  <Stack gap={4} direction="row" debug>
                    <Box />
                    <Box />
                    <Stack gap={8} direction="row" debug>
                      <Box />
                      <Box />
                    </Stack>
                  </Stack>
                </Stack>
              </Example>

              <Example>
                <Stack gap={4} style={{ width: 300 }}>
                  <Description
                    title="Theming"
                    tooltip="Themey theme"
                    content="Change the theme of the components"
                  />
                  <Stack align={"start"}>
                    <ThemeSwitcher />
                  </Stack>
                </Stack>
              </Example>
            </Stack>

            <Spacer y={4} />
          </Container>

          <Stack align={"center"}>
            <Link href="/design/introduction" className={styles.install}>
              Go to the docs →
            </Link>
          </Stack>
          <Spacer y={6} />
        </Container>
      </section>
    </div>
  );
};

export default Page;

const Box = () => {
  return (
    <div
      style={{
        background: "var(--geist-success)",
        width: 50,
        height: 50,
        borderRadius: 4,
      }}
    />
  );
};
