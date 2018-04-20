import ContentEdit from "../views/Content/ContentEdit.jsx";

const redirectRoutes = [
  {
    path: "/content/update/:id",
    component: ContentEdit
  },
  {
    path: "/content/create",
    component: ContentEdit
  }
];

export default redirectRoutes;
