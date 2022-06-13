import { createWebHashHistory, createRouter } from "vue-router";
import UploadNotebook from "../components/Zeus/UploadNotebook.vue";
import NotebookOverview from "../components/Zeus/NotebookOverview.vue";
import NotebookList from "../components/Zeus/NotebookList.vue";

const routes = [
  {
    path: "/upload-notebook",
    name: "UploadNotebook",
    component: UploadNotebook,
  },
  {
    path: "/notebooks",
    name: "NotebookList",
    component: NotebookList,
  },
  {
    path: "/notebooks/:notebookId",
    name: "NotebookOverview",
    component: NotebookOverview,
    props: true
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// router.beforeEach((to, from, next) => {
//   const requiresAuth = to.matched.some((x) => x.meta.requiresAuth);
//
//   if (requiresAuth && !auth.currentUser && to.name != "Home") {
//     next("/sign-in");
//   } else {
//     next();
//   }
// });

export default router;
