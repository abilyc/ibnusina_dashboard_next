// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

// const ROOTS_DASHBOARD = "";
const ROOTS_USER = "/wm/user";
const ROOTS_WM = "/wm";

// ----------------------------------------------------------------------

export const PATH_WM = {
  root: ROOTS_WM,
  general: {
    post: path(ROOTS_WM, "/post"),
    page: path(ROOTS_WM, "/page"),
    media: path(ROOTS_WM, "/media")
  }, 
  users: {
    root: ROOTS_USER,
    allUsers: path(ROOTS_USER, "/allUsers"),
    newUser: path(ROOTS_USER, "/addUser"),
  }
};
