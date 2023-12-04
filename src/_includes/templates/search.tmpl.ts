export const url = "/search.json";

//@ts-ignore
export default function ({ search }, { url }): string {
  const result: any[] = [];

  // Search tags
  for (const tag of search.tags("type=projects")) {
    result.push({
      label: `Tag: ${tag}`,
      search: tag,
      value: url(`/tags/${tag}/`),
    });
  }

  // Search projects
  for (const project of search.pages("type=projects")) {
    result.push({
      label: project.data.title,
      search: `${project.data.title} ${project.data.tags.join(" ")}`,
      value: url(project.data.url),
    });
  }

  return JSON.stringify(result);
}
