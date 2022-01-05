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
        path: PATH_DASHBOARD.general.posts,
        icon: ICONS.user,
          children: [
            { title: "Post", path: PATH_DASHBOARD.general.newpost },
            { title: "Edit Post", path: "#" },
            { title: "Six", path: "#" },
          ]
      },
      {
        title: "form",
        path: PATH_DASHBOARD.general.posts,
        icon: ICONS.posts,
          children: [
            { title: "Post", path: PATH_DASHBOARD.general.newpost },
            { title: "Edit Post", path: "#" },
            { title: "Six", path: "#" },
          ]
      },
    ],
  },
];

export default sidebarConfig;
