import { type Request, type Response, type NextFunction } from "express"
import { z } from "zod"
import { authSchema, userSchema } from "../entities"
import { accountSchema } from "../entities/account"
import { badRequestValidator } from "../middleware"
import { AccountService, AuthService, UserService } from "../service"

class ApiHandler {
  private authService: AuthService
  private accountService: AccountService
  private userService: UserService

  constructor() {
    this.authService = new AuthService()
    this.accountService = new AccountService()
    this.userService = new UserService()
  }

  registerHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = badRequestValidator(req.body, accountSchema)
      const register = await this.authService.register(payload)
      res.success(register, "Register success")
    } catch (error) {
      next(error)
    }
  }

  loginHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = badRequestValidator(req.body, authSchema)
      const login = await this.authService.login(payload)
      res.success(login, "Login success")
    } catch (error) {
      next(error)
    }
  }

  checkAuthHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const account = await this.authService.checkAuth(req!.users!.id)
      res.success(account, "Check auth success")
    } catch (error) {
      next(error)
    }
  }

  deleteAccountHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const account = await this.accountService.delete(req!.users!.id)
      res.success(account, "Delete account success")
    } catch (error) {
      next(error)
    }
  }

  createUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = badRequestValidator(req.body, userSchema)
      const user = await this.userService.createUser(payload)
      res.success({ profile: user, account: req.users }, "Success create profile")
    } catch (error) {
      next(error)
    }
  }

  updateUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const payload = badRequestValidator(req.body, userSchema.omit({ accountId: true }))
      const user = await this.userService.updateUser(req!.users!.id, payload)
      res.success({ profile: user, account: req.users }, "Success update profile")
    } catch (error) {
      next(error)
    }
  }

  getAllUserHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await this.userService.getAllUser()
      res.success(users)
    } catch (error) {
      next(error)
    }
  }

  getUserByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = badRequestValidator(req.params, z.object({ id: z.string() }))
      const users = await this.userService.getUserById(id)
      res.success(users)
    } catch (error) {
      next(error)
    }
  }
}

export default new ApiHandler()
