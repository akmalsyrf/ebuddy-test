import admin from "firebase-admin"
import config from "."

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: config.PROJECT_ID,
    clientEmail: config.CLIENT_EMAIL,
    privateKey: config.PRIVATE_KEY
  }),
})

const db = admin.firestore()

export { admin, db }
