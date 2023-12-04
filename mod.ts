import plugins, { Options } from "./plugins.ts";

import type { Site } from "lume/core.ts";

export type { Options } from "./plugins.ts";

export default function (options: Partial<Options> = {}) {
  return (site: Site) => {
    // Configure the site
    site.use(plugins(options));

    // Add remote files
    const files = [
      "_components/home/landing.njk",
      "_components/button.njk",
      "_components/container.njk",
      "_components/footer.njk",
      "_components/navbar.njk",
      "_data/site.yml",
      "_includes/css/code.css",
      "_includes/layouts/archive.njk",
      "_includes/layouts/article.njk",
      "_includes/layouts/base.njk",
      "_includes/layouts/home.njk",
      "_includes/layouts/page.njk",
      "_includes/layouts/project.njk",
      "_includes/layouts/tag.njk",
      "_includes/templates/archive.tmpl.ts",
      "_includes/templates/projectlist.njk",
      "_includes/templates/search.tmpl.ts",
      "_includes/templates/tag.tmpl.ts",
      "_includes/templates/tag.njk",
      "projects/_data.yml",
      "404.njk",
      "aboutme.njk",
      "index.njk",
      "styles.css",
    ];

    for (const file of files) {
      site.remoteFile(file, import.meta.resolve(`./src/${file}`));
    }
  };
}
