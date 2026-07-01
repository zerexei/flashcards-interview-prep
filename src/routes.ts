const ROUTES = {
  home: {
    name: "home",
    path: "/",
    title: "Home",
  },

  login: {
    name: "login",
    path: "/login",
    title: "Login",
  },

  flashcards: {
    name: "flashcards",
    path: "/flash-cards",
    title: "Flashcards",
  },

  admin: {
    flashcards: {
      name: "admin.flashcards",
      path: "/admin/flash-cards",
      title: "Admin Flashcards",
    },
  },
};

export default ROUTES;
