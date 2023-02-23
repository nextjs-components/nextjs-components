"use client";

import type { Metadata } from "next";
import Link from "next/link";
import {
  Button,
  Container,
  Description,
  File,
  Folder,
  Spacer,
  Spinner,
  Tree,
  fs,
} from "nextjs-components";

import "./geist-text.css";
import styles from "./index.module.css";

export const metadata: Metadata = {
  title: "Nextjs components",
  description: "Nextjs components",
  icons: [{ url: "/favicon.ico" }],
};

const Page = () => {
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
              <Link href="/design/button" className={styles.install}>
                Install →
              </Link>
            </div>
            <Spacer y={2} />

            {/* carousel */}
            <div className="">
              <fs.Tabs tabs={["Button", "Spinner", "File Tree"]}>
                <fs.Fieldset>
                  <fs.Content>
                    <Container>
                      <Container direction={["column", "row", "row"]}>
                        <Container left>
                          <Button type="secondary">Upload</Button>
                        </Container>

                        <Container left>
                          <Button type="success">Upload</Button>
                        </Container>

                        <Container left>
                          <Button type="error">Upload</Button>
                        </Container>

                        <Container left>
                          <Button type="warning">Upload</Button>
                        </Container>

                        <Container left>
                          <Button type="alert">Upload</Button>
                        </Container>

                        <Container left>
                          <Button type="violet">Upload</Button>
                        </Container>
                      </Container>

                      <Container direction={["column", "row", "row"]}>
                        <Container left>
                          <Button variant="shadow">Upload</Button>
                        </Container>

                        <Container left>
                          <Button type="secondary" variant="shadow">
                            Upload
                          </Button>
                        </Container>

                        <Container left>
                          <Button type="success" variant="shadow">
                            Upload
                          </Button>
                        </Container>

                        <Container left>
                          <Button type="error" variant="shadow">
                            Upload
                          </Button>
                        </Container>

                        <Container left>
                          <Button type="warning" variant="shadow">
                            Upload
                          </Button>
                        </Container>

                        <Container left>
                          <Button type="alert" variant="shadow">
                            Upload
                          </Button>
                        </Container>

                        <Container left>
                          <Button type="violet" variant="shadow">
                            Upload
                          </Button>
                        </Container>
                      </Container>
                    </Container>
                  </fs.Content>
                  <fs.Footer>
                    <fs.Footer.Status>
                      <Description
                        title="Button"
                        content="Used to trigger an operation."
                      />
                    </fs.Footer.Status>
                  </fs.Footer>
                </fs.Fieldset>

                <fs.Fieldset>
                  <fs.Content>
                    <Container>
                      <Container direction={["column", "row", "row"]}>
                        <Spinner />
                      </Container>
                    </Container>
                  </fs.Content>
                  <fs.Footer>
                    <fs.Footer.Status>
                      <Description
                        title="Spinner"
                        content="Indicate an action running in the background."
                      />
                    </fs.Footer.Status>
                  </fs.Footer>
                </fs.Fieldset>

                <fs.Fieldset>
                  <fs.Content>
                    <Container>
                      <Container style={{ marginLeft: "var(--geist-gap)" }}>
                        <Tree
                          style={
                            {
                              /** TODO: this should be optional*/
                            }
                          }
                        >
                          <Folder name="components">
                            <Folder name="typography">
                              <File name="paragraph.js" />
                              <File name="code.js" />
                              <File name="heading.js" />
                            </Folder>
                            <File name="button.js" />
                            <File name="avatar.js" />
                          </Folder>
                          <Folder name="pages">
                            <File name="dashboard.js" />
                            <File name="about.js" />
                            <File name="index.js" />
                          </Folder>
                          <File name="README.md" />
                          <File name=".gitignore" />
                        </Tree>
                      </Container>
                    </Container>
                  </fs.Content>
                  <fs.Footer>
                    <fs.Footer.Status>
                      <Description
                        title="File Tree"
                        content="Display a list of files and folders in a hierarchical tree structure."
                      />
                    </fs.Footer.Status>
                  </fs.Footer>
                </fs.Fieldset>
              </fs.Tabs>
            </div>
            <Spacer y={4} />
          </Container>
        </Container>
      </section>
    </div>
  );
};

export default Page;
