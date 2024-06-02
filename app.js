import express from "express";
import dotenv from "dotenv";
import expressEjsLayouts from "express-ejs-layouts";
import cors from "cors";
import path from "path";
import cookieParser from "cookie-parser";
import { errorHandler } from "./src/utils/errorhandler.js";
import UserController from "./src/controllers/user.controller.js";
import HabitController from "./src/controllers/habit.controller.js";
import TrackerController from "./src/controllers/tracker.controller.js";

dotenv.config();

const app = express();

app.use(cors());
app.use(expressEjsLayouts);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve("public")));

// View Engine configuration
app.set("view engine", "ejs");
app.set("views", path.join(path.resolve(), "src", "views"));

// Controller objects
const userController = new UserController();
const habitController = new HabitController();
const trackerController = new TrackerController();

// Route Handling

app.get("/", (req, res, next) => userController.getLogin(req, res, next));
app.post("/login", (req, res, next) => userController.login(req, res, next));

app.get("/createUser", (req, res, next) =>
  userController.getCreateUser(req, res, next)
);
app.post("/createUser", (req, res, next) =>
  userController.createUser(req, res, next)
);

app.get("/habits", (req, res, next) =>
  habitController.getHabits(req, res, next)
);

app.post("/habit", (req, res, next) =>
  habitController.addHabit(req, res, next)
);

app.get("/weeklyView", (req, res, next) =>
  trackerController.getWeeklyView(req, res, next)
);

app.post("/tracker", (req, res, next) =>
  trackerController.updateTracker(req, res, next)
);

// Default error handler
app.use(errorHandler);

export default app;
