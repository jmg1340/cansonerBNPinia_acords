
const routes = [
  {
    path: "/",
    component: () => import("layouts/MyLayout.vue"),
    children: [
      { name: "cercar", path: "", component: () => import("pages/Index.vue") },
    ],
  },

  { 
    path: "/canso",
    // component: () => import("layouts/layoutCanso.vue"),
    name: "canso",
    component: () => import("pages/canso.vue"),
    // children: [
    //   {
    //     name: "canso",
    //     path: "",
    //     component: () => import("pages/canso.vue"),
    //   },
    // ],
  },
  // { 
  //   path: "/cansoDesdeNegre",
  //   name: "cansoDesdeNegre",
  //   component: () => import("pages/canso.vue"),
  //   children: [
  //     {
  //       name: "cansoDesdeNegre",
  //       path: "",
  //       component: () => import("pages/canso.vue"),
  //     },
  //   ],
  // },
  
  {
    path: "/negre",
    name: "negre",
    component: () => import("pages/negre.vue"),
    // component: () => import('pages/negre.vue'),
    // children: [
    //   { name: "negre", path: "", component: () => import("pages/negre.vue") },
    // ],
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }


];



export default routes
