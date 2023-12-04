export const layout = "layouts/archive.njk";
export const title = "Archive";

interface PaginationData {
  pagination: {
    page: number;
  };
  menu?: {
    visible: boolean;
    order: number;
  };
}

//@ts-ignore
export default function* ({ search, paginate }) {
  const projects = search.pages("type=projects", "date=desc");

  for (const data of paginate(projects, { url, size: 10 })) {
    // Show the first page in the menu
    if (data.pagination.page === 1) {
      data.menu = {
        visible: true,
        order: 1,
      };
    }

    yield data;
  }
}

function url(n: number): string {
  if (n === 1) {
    return "/projects/";
  }

  return `/projects/${n}/`;
}
