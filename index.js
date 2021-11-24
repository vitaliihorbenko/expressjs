const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const cartRoutes = require("./routes/cart");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/cart", cartRoutes);
app.use("/add", addRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
