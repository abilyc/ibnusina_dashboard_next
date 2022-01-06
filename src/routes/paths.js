// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_DASHBOARD = "";

// ----------------------------------------------------------------------

const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    post: path(ROOTS_DASHBOARD, "/post"),
    page: path(ROOTS_DASHBOARD, "/page"),
    media: path(ROOTS_DASHBOARD, "/media")
  },
  users: {
    root: path(ROOTS_DASHBOARD, "/user"),
    // userHome: path(ROOTS_DASHBOARD, "/user/"),
    allUsers: path(ROOTS_DASHBOARD, "/user/allUsers"),
    newUser: path(ROOTS_DASHBOARD, "/user/addUser"),
    // forms: path(ROOTS_DASHBOARD, "form"),
    // newForm: path(ROOTS_DASHBOARD, "form/addForm"),
  }
};


export {PATH_DASHBOARD};
