import { ObjectId } from "bson";
import habitModel from "./habit.schema.js";

export default class HabitRepository {
  async getHabits(userId) {
    return await habitModel.find({
      userId: ObjectId.createFromHexString(userId),
    });
  }

  async addHabit(userId, name) {
    return await habitModel.create({
      userId: ObjectId.createFromHexString(userId),
      name: name,
    });
  }
}
