import { type firestore } from "firebase-admin"
import { v4 as uuid } from "uuid"
import { type User } from "../../../packages/entities"
import { db } from "../config/firebaseConfig"
import { NotFound } from "../middleware"

export class UserCollection {
  private database: firestore.CollectionReference

  constructor() {
    this.database = db.collection("users")
  }

  async getAll(): Promise<User[]> {
    const usersSnapshot = await this.database.get()
    return usersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...(doc.data() as User),
    }))
  }

  async getById(id: string): Promise<User> {
    const user = await this.database.doc(id).get()
    if (!user.exists) throw new NotFound(`User does not exist.`)
    return {
      id,
      ...(user.data() as User),
    }
  }
  async getByFields(conditions: Partial<Record<keyof User, unknown>>): Promise<Required<User>[]> {
    let query: firestore.Query = this.database

    Object.entries(conditions).forEach(([field, value]) => {
      query = query.where(field, "==", value)
    })

    const querySnapshot = await query.get()

    return querySnapshot.docs.map((doc) => {
      return {
        id: doc.id,
        ...(doc.data() as User),
      }
    })
  }

  async create(payload: User): Promise<User> {
    const id = uuid()
    await this.database.doc(id).set(payload)

    const user = await this.getById(id)
    return user
  }

  async update(id: string, payload: Partial<User>): Promise<User> {
    await this.getById(id)
    await this.database.doc(id).update(payload)

    const updatedUser = await this.getById(id)
    return updatedUser
  }

  async delete(id: string): Promise<void> {
    await this.getById(id)
    await this.database.doc(id).delete()
  }
}
