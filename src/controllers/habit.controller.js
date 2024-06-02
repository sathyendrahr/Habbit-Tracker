import HabitRepository from "../models/habit/habit.repository.js";
import UserRepository from "../models/user/user.repository.js";

export default class HabitController {
  constructor() {
    this.habitRepository = new HabitRepository();
    this.userRepository = new UserRepository();
  }

  async getHabits(req, res, next) {
    try {
      const userId = req.cookies.userId;
      const user = await this.userRepository.getUser(userId);
      const habits = await this.habitRepository.getHabits(userId);

      res.render("habits", { habits, user });
    } catch (err) {
      next(err);
    }
  }

  async addHabit(req, res, next) {
    try {
      const userId = req.cookies.userId;
      const habit = await this.habitRepository.addHabit(userId, req.body.name);

      res.redirect("/habits");
    } catch (err) {
      next(err);
    }
  }
}
