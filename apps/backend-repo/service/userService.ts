import { type User } from "../entities"
import { BadRequest } from "../middleware"
import { UserCollection } from "../repository"

export class UserService {
  private userRepository: UserCollection

  constructor() {
    this.userRepository = new UserCollection()
  }

  async createUser(payload: User) {
    const checkUser = await this.getUserByAccountId(payload.accountId)
    if (checkUser.length) throw new BadRequest("Your profile already exist")
    return await this.userRepository.create(payload)
  }

  async updateUser(accountId: string, payload: Partial<User>) {
    const checkUser = await this.getUserByAccountId(accountId)
    if (!checkUser.length) throw new BadRequest("Your don't have profile, create profile first")
    return await this.userRepository.update(checkUser[0].id, payload)
  }

  async getAllUser() {
    return await this.userRepository.getAll()
  }

  async getUserByAccountId(accountId: string) {
    return await this.userRepository.getByFields({ accountId })
  }

  async getUserById(id: string) {
    return await this.userRepository.getById(id)
  }

  async deleteUserByAccountId(accountId: string) {
    const checkUser = await this.getUserByAccountId(accountId)
    if (checkUser.length) {
      await this.userRepository.delete(checkUser[0].id)
    }
  }
}
