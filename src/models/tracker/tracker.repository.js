import { ObjectId } from "bson";
import trackerModel from "./tracker.schema.js";
import habitModel from "../habit/habit.schema.js";
import {
  getDateString,
  getPreviousDate,
  getWeekRange,
} from "../../utils/dateUtils.js";

export default class TrackerRepository {
  async updateTracker(data) {
    const { userId, habitId, status, date } = data;

    // Update or insert record on updating status of habit for a particular date
    const tracker = await trackerModel.findOneAndUpdate(
      {
        userId: ObjectId.createFromHexString(userId),
        habitId: ObjectId.createFromHexString(habitId),
        date,
      },
      { $set: { status } },
      { upsert: true }
    );

    /* Updating habit statitics */

    // Completed count update
    let habit = await habitModel.findByIdAndUpdate(habitId, {
      $set: { doneCount: await this.getDoneCount(userId, habitId) },
    });

    // Streak update
    const currentStreak = await this.getCurrentStreak(userId, habitId);

    habit = await habitModel.findByIdAndUpdate(habitId, {
      $set: { currentStreak },
    });

    // longest streak update
    if (habit.longestStreak < currentStreak) {
      habit.longestStreak = currentStreak;
      await habit.save();
    }
  }

  // Returns an array of habits with required weekly view data
  async getHabitTracker(userId) {
    const habits = await habitModel.find({
      userId: ObjectId.createFromHexString(userId),
    });

    habits.forEach(async (habit) => {
      habit.tracker = getWeekRange();
      await habit.tracker.forEach(async (day) => {
        const record = await trackerModel.findOne({
          userId: ObjectId.createFromHexString(userId),
          habitId: habit._id,
          $expr: { $eq: ["$date", day.dateString] },
        });

        if (record) day.status = record.status;
        else day.status = "None";
      });
    });

    return habits;
  }

  // Method to calculate the total completed habit count since the habit creation
  async getDoneCount(userId, habitId) {
    const trackRecords = await trackerModel.find({
      userId: ObjectId.createFromHexString(userId),
      habitId: ObjectId.createFromHexString(habitId),
      status: "Done",
    });

    return trackRecords.length;
  }

  // Method to calculate streak
  async getCurrentStreak(userId, habitId) {
    let currentDateString = getDateString(new Date());
    const habit = await habitModel.findById(habitId);
    const creationDate = new Date(habit.createdOn);
    let currentStreak = 0;

    const tracker = await trackerModel.find({
      userId: ObjectId.createFromHexString(userId),
      habitId: ObjectId.createFromHexString(habitId),
    });

    while (new Date(currentDateString) >= creationDate) {
      const record = tracker.find((e) => e.date == currentDateString);
      if (!record || record.status == "Not done") break;
      else if (record.status == "Done") currentStreak++;

      currentDateString = getPreviousDate(currentDateString);
    }

    return currentStreak;
  }
}
