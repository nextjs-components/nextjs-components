import Link from "next/link";
import { Button } from "nextjs-components/src/components/Button";
import { Container } from "nextjs-components/src/components/Container";
import { Description } from "nextjs-components/src/components/Description";
import { Spacer } from "nextjs-components/src/components/Spacer";
import { Stack } from "nextjs-components/src/components/Stack";

import { ThemeSwitcher } from "@/app/theme-switcher";
import { Example } from "@/components/example";

const Page = () => {
  return (
    <div>
      <section className="bg-gradient-radial">
        <Container wrapper>
          <Container>
            <Spacer y={4} />
            <div className="max-w-[500px]">
              <h1 className="m-0 text-[80px] font-bold leading-[0.85] tracking-[max(min(-0.055em,-0.66vw),-0.07em)] text-[--geist-foreground] max-[960px]:text-[min(11.2vw,80px)]">
                Nextjs components
              </h1>
              <Spacer y={1} />
            </div>

            <div className="max-w-[500px]">
              <p className="m-0 text-[21px] font-normal leading-[30px] tracking-[-0.016em] text-[--geist-secondary]">
                A collection of components, transcribed from Vercel’s design
                system.
              </p>
            </div>

            <Spacer y={1} />
            <div>
              <Link
                href="/design/introduction"
                className="box-border inline-flex h-[--geist-space-medium] cursor-pointer select-none items-center rounded-[--geist-radius] bg-[--geist-background] px-[--geist-space-4x] font-medium text-[--geist-foreground] shadow-[--shadow-medium]"
              >
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
                  <Button>hi</Button>
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
            <Link
              href="/design/introduction"
              className="box-border inline-flex h-[--geist-space-medium] cursor-pointer select-none items-center rounded-[--geist-radius] bg-[--geist-background] px-[--geist-space-4x] font-medium text-[--geist-foreground] shadow-[--shadow-medium]"
            >
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
    <div className="h-[50px] w-[50px] rounded-[4px] bg-[--geist-success]" />
  );
};
