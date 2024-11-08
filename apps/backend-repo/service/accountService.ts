import { AccountCollection } from "../repository"
import { UserService } from "./userService"

export class AccountService {
  private accountRepository: AccountCollection
  private userService: UserService

  constructor() {
    this.accountRepository = new AccountCollection()
    this.userService = new UserService()
  }

  async getAccountById(id: string) {
    return await this.accountRepository.getById(id)
  }

  async delete(id: string) {
    await this.accountRepository.delete(id)
    await this.userService.deleteUserByAccountId(id)
  }
}
