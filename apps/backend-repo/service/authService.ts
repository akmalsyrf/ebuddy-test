import { genSalt, hash, compare } from "bcryptjs"
import { sign } from "jsonwebtoken"
import { type JwtPayload, type Account, type Auth } from "../../../packages/entities"
import config from "../config"
import { BadRequest } from "../middleware"
import { AccountCollection } from "../repository"
import { UserService } from "./userService"

export class AuthService {
  private accountRepository: AccountCollection
  private userService: UserService

  constructor() {
    this.accountRepository = new AccountCollection()
    this.userService = new UserService()
  }

  async register(payload: Account) {
    const salt = await genSalt(10)
    const hashedPw = await hash(payload.password, salt)
    payload.password = hashedPw

    const { email, username } = payload
    const isNotUniqueEmail = await this.accountRepository.getByFields({ email })
    const isNotUniqueUsername = await this.accountRepository.getByFields({ username })
    if (isNotUniqueEmail.length || isNotUniqueUsername.length) throw new BadRequest("Username or email already exists")

    const account = await this.accountRepository.create(payload)
    const dataToken: JwtPayload = {
      id: account.id,
      username: account.username,
      email: account.email,
      role: account.role,
    }
    const token = sign(dataToken, config.TOKEN_API)

    return { account, token }
  }

  async login(payload: Auth) {
    const { usernameOrEmail, password } = payload
    const accountByEmail = await this.accountRepository.getByFields({ email: usernameOrEmail })
    const accountByUsername = await this.accountRepository.getByFields({ username: usernameOrEmail })
    if (!accountByEmail.length && !accountByUsername.length) throw new BadRequest("Username or password is invalid")

    const account = { ...accountByEmail[0], ...accountByUsername[0] }
    const isValid = await compare(password, account.password)
    if (!isValid) throw new BadRequest("Username or password is invalid")

    const dataToken: JwtPayload = {
      id: account.id,
      username: account.username,
      email: account.email,
      role: account.role,
    }
    const token = sign(dataToken, config.TOKEN_API)

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: pw, ...rest } = account

    const user = await this.userService.getUserByAccountId(rest.id)
    return { account: rest, profile: user[0] ?? null, token }
  }

  async checkAuth(id: string) {
    const account = await this.accountRepository.getById(id)
    const user = await this.userService.getUserByAccountId(id)
    console.log('id ', id)
    return { account, profile: user[0] ?? null }
  }
}
