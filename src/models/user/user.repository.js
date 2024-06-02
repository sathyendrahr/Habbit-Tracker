import userModel from "./user.schema.js";

export default class UserRepository {
  async createUserRepo(name, email) {
    return await userModel.create({ name, email });
  }

  async loginRepo(email) {
    return await userModel.findOne({ email });
  }

  async getUser(userId) {
    return await userModel.findById(userId);
  }
}
