const router = require("express").Router();

// fake DB
const db = {
  users: [
    {
      id: 1,
      username: "chapter@gmail.com",
      password: "Chapter@123",
      name: "Chapter",
    },
  ],
};

// session
const session = {};

router.get("/", async (req, res) => {
  res.render("pages/index");
});

router.get("/login", async (req, res) => {
  res.render("pages/login");
});

router.get("/logout", async (req, res) => {
  delete session[req.cookies.sessionId];
  res.setHeader("Set-Cookie", 'sessionId=; HttpOnly');
  res.redirect("/login");
});

router.get("/dashboard", async (req, res) => {
  const sessionId = session[req.cookies.sessionId];
  console.log("🚀 ~ router.get ~ session:", session)

  if(!sessionId) {
    res.redirect("/login");
    return;
  }

  const user = db.users.find((user) => user.id === sessionId.userId);

  if(!user) {
    res.redirect("/login");
    return;
  }

  res.render("pages/dashboard", { user });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const user = db.users.find(
    (user) => user.username === username && user.password === password
  );

  if (user) {
    const sessionId = Math.random().toString(36).substring(7);
    session[sessionId] = {
      userId: user.id,
    };
    console.log("🚀 ~ router.post ~ session:", session)
    res.setHeader("Set-Cookie", `sessionId=${sessionId}; HttpOnly; max-age=3600`).redirect("dashboard");
    return;
  }
  res.setHeader("Set-Cookie", 'sessionId=; HttpOnly');
  res.send("Invalid username or password");
});

module.exports = router;
