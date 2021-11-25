const express = require("express");
const path = require("path");
const Handlebars = require("handlebars");
const {
  allowInsecurePrototypeAccess,
} = require("@handlebars/allow-prototype-access");
const mongoose = require("mongoose");
const exphbs = require("express-handlebars");
const homeRoutes = require("./routes/home");
const cartRoutes = require("./routes/cart");
const coursesRoutes = require("./routes/courses");
const addRoutes = require("./routes/add");
const User = require("./models/user");

const app = express();

const hbs = exphbs.create({
  defaultLayout: "main",
  extname: "hbs",
  handlebars: allowInsecurePrototypeAccess(Handlebars),
});

app.engine("hbs", hbs.engine);
app.set("view engine", "hbs");
app.set("views", "views");

app.use(async (req, res, next) => {
  try {
    const user = await User.findById("619fbb427091beceaf35f1f5");
    req.user = user;
    next();
  } catch (e) {
    console.log(e);
  }
});

app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({ extended: true }));
app.use("/", homeRoutes);
app.use("/courses", coursesRoutes);
app.use("/cart", cartRoutes);
app.use("/add", addRoutes);

const PORT = process.env.PORT || 3000;

async function start() {
  try {
    const password = "Snake0241";
    const url = `mongodb+srv://Vitalii:${password}@cluster0.4em9n.mongodb.net/nodeJsUdemy?retryWrites=true&w=majority`;
    await mongoose.connect(url, {
      useNewUrlParser: true,
    });
    const candidate = await User.findOne();
    if (!candidate) {
      const user = new User({
        email: "punisher-07@mail.ru",
        name: "Vitalii",
        cart: { items: [] },
      });
      await user.save();
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
}

start();
