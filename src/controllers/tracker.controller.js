import TrackerRepository from "../models/tracker/tracker.repository.js";
import UserRepository from "../models/user/user.repository.js";

export default class TrackerController {
  constructor() {
    this.trackerRepository = new TrackerRepository();
    this.userRepository = new UserRepository();
  }

  async getWeeklyView(req, res, next) {
    try {
      const habits = await this.trackerRepository.getHabitTracker(
        req.cookies.userId
      );

      const user = await this.userRepository.getUser(req.cookies.userId);

      res.render("habitsWeekly", { habits, user });
    } catch (err) {
      next(err);
    }
  }

  async updateTracker(req, res, next) {
    try {
      const status = req.query.status || req.body.status;
      const userId = req.cookies.userId;
      const habitId = req.body.habitId;
      const date = req.body.date || new Date().toISOString().substring(0, 10);

      await this.trackerRepository.updateTracker({
        userId,
        habitId,
        status,
        date,
      });

      res.redirect("/weeklyView");
    } catch (err) {
      next(err);
    }
  }
}
