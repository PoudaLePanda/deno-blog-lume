export const layout = "layouts/tag.njk";

//@ts-ignore
export default function* ({ search }) {
  for (const tag of search.tags()) {
    yield {
      url: `/tags/${tag}/`,
      title: `Tagged “${tag}”`,
      type: "tag",
      tag,
    };
  }
}
