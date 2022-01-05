// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "/dashboard";

// ----------------------------------------------------------------------

const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    post: path(ROOTS_DASHBOARD, "/post"),
    page: path(ROOTS_DASHBOARD, "/page"),
    media: path(ROOTS_DASHBOARD, "/media"),
    newpost: path(ROOTS_DASHBOARD, "/newpost"),
    pageFive: path(ROOTS_DASHBOARD, "/app/five"),
    pageSix: path(ROOTS_DASHBOARD, "/six"),
  }
};


export {PATH_DASHBOARD};
