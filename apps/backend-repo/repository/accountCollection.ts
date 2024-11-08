import { type firestore } from "firebase-admin"
import { v4 as uuid } from "uuid"
import { db } from "../config/firebaseConfig"
import { type Account } from "../entities"
import { NotFound } from "../middleware"

export class AccountCollection {
  private database: firestore.CollectionReference

  constructor() {
    this.database = db.collection("account")
  }

  async getAll(): Promise<Omit<Account, "password">[]> {
    const accountsSnapshot = await this.database.get()
    return accountsSnapshot.docs.map((doc) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...rest } = doc.data() as Account
      return {
        id: doc.id,
        ...rest,
      }
    })
  }

  async getByIdUnsafe(id: string): Promise<Account> {
    const account = await this.database.doc(id).get()
    if (!account.exists) throw new NotFound(`Account does not exist.`)
    return {
      id,
      ...(account.data() as Account),
    }
  }

  async getById(id: string): Promise<Omit<Required<Account>, "password">> {
    const account = await this.database.doc(id).get()
    if (!account.exists) throw new NotFound(`Account does not exist.`)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = account.data() as Account
    return {
      id,
      ...rest,
    }
  }

  async getByFields(conditions: Partial<Record<keyof Account, unknown>>): Promise<Required<Account>[]> {
    let query: firestore.Query = this.database

    Object.entries(conditions).forEach(([field, value]) => {
      query = query.where(field, "==", value)
    })

    const querySnapshot = await query.get()

    return querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...(doc.data() as Account),
      }
    })
  }

  async create(payload: Account): Promise<Omit<Required<Account>, "password">> {
    const id = uuid()
    await this.database.doc(id).set(payload)

    const account = await this.getById(id)
    return account
  }

  async update(id: string, payload: Partial<Account>): Promise<Omit<Required<Account>, "password">> {
    await this.getById(id)
    await this.database.doc(id).update(payload)

    const updatedAccount = await this.getById(id)
    return updatedAccount
  }

  async delete(id: string): Promise<void> {
    await this.getById(id)
    await this.database.doc(id).delete()
  }
}
