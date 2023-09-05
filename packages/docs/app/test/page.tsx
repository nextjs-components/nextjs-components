import {
  Avatar,
  Button,
  Container,
  Footer,
  Menu,
  MenuButton,
  MenuItem,
  MenuWrapper,
  Pill,
  Spacer,
  Stack,
  Switch,
  Text,
} from "nextjs-components";

// import { useState } from "react";

export default async function Page() {
  // useState(); // should cause error
  return (
    <Container>
      <Container wrapper>
        <Text size={48} as="h1">
          Test
        </Text>

        <Spacer y={2} />

        <Text>
          This is a test page for smoke-testing server components compliance
          with various nextjs-components components.
        </Text>

        <Spacer />

        <Text>Also smoke testing the TypeScript types in the IDE.</Text>

        <Spacer />

        <Stack debug direction={"row"} gap={4}>
          <div>
            <Pill href="#" label="Label">
              <Pill.Menu>
                <Pill.MenuItem>Item 1</Pill.MenuItem>
                <Pill.MenuItem>Item 1</Pill.MenuItem>
                <Pill.MenuItem>Item 1</Pill.MenuItem>
              </Pill.Menu>
            </Pill>
          </div>

          <Stack direction={"column"} debug gap={2}>
            <Button size="small">Upload</Button>
            <Button>Upload</Button>
            <Button size="large">Upload</Button>
          </Stack>

          <MenuWrapper>
            <div>
              <MenuButton variant="unstyled">
                <Avatar
                  size={30}
                  src="https://thekevinwang.com/image/kevin.webp"
                />
              </MenuButton>
            </div>
            <Menu width={200}>
              <MenuItem>One</MenuItem>
              <MenuItem>Two</MenuItem>
              <MenuItem>Three</MenuItem>
            </Menu>
          </MenuWrapper>
        </Stack>

        <Spacer />

        <div className="block">
          <Switch name="default">
            <Switch.Control label="Source" defaultChecked value="source" />
            <Switch.Control label="Output" value="output" />
            <Switch.Control label="Other" value="other" />
          </Switch>
        </div>

        <Spacer />
      </Container>

      <Footer>
        <Footer.Group title="Company">
          <Footer.Link href="#">Home</Footer.Link>
          <Footer.Link href="#">About</Footer.Link>
          <Footer.Link href="#">Careers</Footer.Link>
          <Footer.Link href="#">Partners</Footer.Link>
          <Footer.Link href="#">Blog</Footer.Link>
          <Footer.Link href="#">Wang Conf</Footer.Link>
        </Footer.Group>

        <Footer.Group title="Product">
          <Footer.Link href="#">Pricing</Footer.Link>
          <Footer.Link href="#">Wang for GitHub</Footer.Link>
          <Footer.Link href="#">Wang for GitLab</Footer.Link>
          <Footer.Link href="#">Wang for Bitbucket</Footer.Link>
          <Footer.Link href="#">Wang Edge Network</Footer.Link>
          <Footer.Link href="#">Integrations Marketplace</Footer.Link>
          <Footer.Link href="#">Command-Line</Footer.Link>
        </Footer.Group>
      </Footer>
    </Container>
  );
}
