import date, { Options as DateOptions } from "lume/plugins/date.ts";
import pagefind, { Options as PagefindOptions } from "lume/plugins/pagefind.ts";
import prism, { Options as PrismOptions } from "lume/plugins/prism.ts";
import terser from "lume/plugins/terser.ts";
import basePath from "lume/plugins/base_path.ts";
import jsx from "lume/plugins/jsx.ts";
import mdx from "lume/plugins/mdx.ts";
import a11yEmoji from "npm:@fec/remark-a11y-emoji";
import rehypeRemoveComments from "npm:rehype-remove-comments@5";
import inline from "lume/plugins/inline.ts";
import minifyHTML from "lume/plugins/minify_html.ts";
import sass from "lume/plugins/sass.ts";
import esbuild from "lume/plugins/esbuild.ts";
import sourceMaps from "lume/plugins/source_maps.ts";
import tailwindcss from "lume/plugins/tailwindcss.ts";
import typography from "npm:@tailwindcss/typography";
import postcss from "lume/plugins/postcss.ts";
import codeHighlight from "lume/plugins/code_highlight.ts";
import lang_javascript from "npm:highlight.js/lib/languages/javascript";
import lang_bash from "npm:highlight.js/lib/languages/bash";
import svgo from "lume/plugins/svgo.ts";
import metas from "lume/plugins/metas.ts";

import slugifyUrls from "lume/plugins/slugify_urls.ts";
import resolveUrls from "lume/plugins/resolve_urls.ts";
import pageFind from "lume/plugins/pagefind.ts";

import sitemap from "lume/plugins/sitemap.ts";

import type { Page, Site } from "lume/core.ts";

export interface Options {
  prism?: Partial<PrismOptions>;
  date?: Partial<DateOptions>;
  pagefind?: Partial<PagefindOptions>;
}

/** Configure the site */
export default function (options: Options = {}) {
  return (site: Site) => {
    site
      .use(basePath())
      .use(prism(options.prism))
      .use(date(options.date))
      .use(metas())
      .use(resolveUrls())
      .use(slugifyUrls())
      .use(svgo())
      .use(inline())
      .use(sass())
      .use(esbuild())
      .use(sourceMaps())
      .use(minifyHTML())
      .use(terser())
      .use(pagefind(options.pagefind))
      .use(sitemap())
      .use(jsx())
      .remoteFile(
        "_includes/css/code.css",
        "https://cdn.jsdelivr.net/gh/highlightjs/cdn-release@11.6.0/build/styles/github.min.css"
      )
      .use(
        mdx({
          remarkPlugins: [a11yEmoji],
          rehypePlugins: [rehypeRemoveComments],
        })
      )
      .use(
        codeHighlight({
          languages: {
            javascript: lang_javascript,
            bash: lang_bash,
          },
        })
      )
      .use(
        tailwindcss({
          // Extract the classes from HTML and JSX files
          extensions: [".html", ".jsx"],

          // Your Tailwind options, like the theme colors and fonts
          options: {
            theme: {
              colors: {
                blue: "#1fb6ff",
                purple: "#7e5bef",
                pink: "#ff49db",
              },
              fontFamily: {
                sans: ["Graphik", "sans-serif"],
                serif: ["Merriweather", "serif"],
              },
            },
            plugins: [typography],
          },
        })
      )
      .use(postcss())
      .ignore("README.md", "CHANGELOG.md")
      .copy("fonts")
      .copy("js")
      .copy("favicon.png")
      .preprocess([".md"], (page: Page) => {
        page.data.excerpt ??= (page.data.content as string).split(
          /<!--\s*more\s*-->/i
        )[0];
      });

    // Basic CSS Design System
    site.remoteFile(
      "_includes/css/ds.css",
      "https://unpkg.com/@lumeland/ds@0.3.2/ds.css"
    );
  };
}
