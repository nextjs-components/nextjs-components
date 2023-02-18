export function useMDXComponents(components) {
  console.log("useMDXComponents", components);
  return { h1: null, h2: null, ...components };
}
