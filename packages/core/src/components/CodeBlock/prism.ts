import { Prism } from "prism-react-renderer";
import extraPrism from "prismjs";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-diff";
import "prismjs/components/prism-lua";
import "prismjs/components/prism-toml";

// Extend the renderer's bundled grammars with the reference's extra languages.
for (const language of ["bash", "shell", "diff", "lua", "toml"]) {
  Prism.languages[language] = extraPrism.languages[language];
}

export { Prism };
