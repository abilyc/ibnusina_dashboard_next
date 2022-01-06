// routes
import { PATH_DASHBOARD } from "../../routes/paths";
// components
import SvgIconStyle from "../../components/SvgIconStyle";

// ----------------------------------------------------------------------

const getIcon = (name) => (
  <SvgIconStyle
    src={`/static/icons/navbar/${name}.svg`}
    sx={{ width: "100%", height: "100%" }}
  />
);

const ICONS = {
  user: getIcon("ic_user"),
  ecommerce: getIcon("ic_ecommerce"),
  analytics: getIcon("ic_analytics"),
  dashboard: getIcon("ic_dashboard"),
  posts: getIcon("ic_blog"),
  forms: getIcon("ic_analytics")
};

const sidebarConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: "general",
    items: [
      {
        title: "post",
        path: PATH_DASHBOARD.general.post,
        icon: ICONS.dashboard,
      },
      {
        title: "page",
        path: PATH_DASHBOARD.general.page,
        icon: ICONS.analytics,
      },
      {
        title: "media",
        path: PATH_DASHBOARD.general.media,
        icon: ICONS.analytics,
      }
    ],
  },
  
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: "management",
    items: [
      {
        title: "Users",
        path: PATH_DASHBOARD.users.root,
        icon: ICONS.user,
          children: [
            { title: "All User", path: PATH_DASHBOARD.users.allUsers },
            { title: "New User", path: PATH_DASHBOARD.users.newUser },
          ]
      },
      // {
      //   title: "Forms",
      //   path: PATH_DASHBOARD.management.forms,
      //   icon: ICONS.forms,
      //     children: [
      //       { title: "data", path: PATH_DASHBOARD.management.forms },
      //       { title: "new form", path: PATH_DASHBOARD.management.newForm},
      //     ]
      // },
    ],
  },
];

export default sidebarConfig;
