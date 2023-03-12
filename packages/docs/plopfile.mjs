/**
 * @typedef {import('plop').NodePlopAPI} NodePlopAPI
 * @param {NodePlopAPI} plop
 */
// eslint-disable-next-line import/no-anonymous-default-export
export default function (plop) {
  plop.setGenerator("mdx", {
    description: "Add a new mdx file",
    prompts: [
      {
        type: "input",
        name: "slug",
        message: "What is your mdx slug name?",
        description:
          "This will be the name of the mdx file, and the website URL will reference it by this name.",
      },
      {
        type: "input",
        name: "title",
        message: "What is your component name?",
      },
      {
        type: "input",
        name: "description",
        message: "Leave a brief description of your component",
      },
    ],
    actions: [
      {
        type: "add",
        path: "app/design/(components)/[slug]/{{slug}}.mdx",
        templateFile: "app/design/(components)/[slug]/templates/component.mdx",
      },
    ],
  });
}
