import UserRepository from "../models/user/user.repository.js";

export default class UserController {
  constructor() {
    this.userRepository = new UserRepository();
  }

  getCreateUser(req, res, next) {
    res.render("createUser", { errorMessage: null });
  }

  async createUser(req, res, next) {
    try {
      const { name, email } = req.body;
      const user = await this.userRepository.createUserRepo(name, email);

      // Setting cookie after successful user creating
      res.cookie("userId", user._id.toString(), {
        httpOnly: true,
      });

      res.redirect("/habits");
    } catch (err) {
      // Handling duplicate email error
      if (err.message.includes("duplicate key error")) {
        return res.render("createUser", {
          errorMessage: "Email already exists",
        });
      }

      next(err);
    }
  }

  getLogin(req, res, next) {
    if (req.cookies.userId) {
      return res.redirect("/habits");
    }
    res.render("index", { errorMessage: null });
  }

  async login(req, res, next) {
    try {
      // User validation
      const user = await this.userRepository.loginRepo(req.body.email);
      //   console.log(user);

      if (!user) {
        return res.render("index", {
          errorMessage: "User not found",
        });
      }

      // Setting cookie after successful user login
      res.cookie("userId", user._id, {
        httpOnly: true,
      });

      res.redirect("/habits");
    } catch (err) {
      next(err);
    }
  }
}
