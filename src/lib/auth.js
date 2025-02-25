import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import connectDB from "@/lib/db"
import { AuthUser } from "@/models/authUsers"

export const authOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            id: "credentials",
            credentials: {
                username: { label: "Username", type: "text" },
                password: { label: "Password", type: "password" },
            },

            async authorize(credentials) {

                await connectDB()

                // di default Mongoose esclude la password nei dati ritornati
                // in questo caso però ne ho bisogno quindi specifico di selezionarla (tanto è criptata)
                // quindi faccio retrieve del user (se esiste) e lo immagazzino in const "user" (con tutti i suoi campi password comprresa)
                const user = await AuthUser.findOne({
                    username: credentials?.username,
                }).select("+password")

                if (!user) throw new Error("Utente o password errati")

                // faccio il check della password
                const passwordMatch = await bcrypt.compare(
                    credentials.password,
                    user.password
                )

                if (!passwordMatch) throw new Error("Utente o password errati")
                return user
            },
        }),
    ],
    // per non salvare i dati di sessione in un db,
    // utilizzo questo codice che mi salva i dati di sessione (contenuti in un jwt) nei cookie
    // in tal caso avrò bisogno di AUTH_SECRET in .env che next-auth userà in automatico per gestire jwt
    session: {
        strategy: "jwt",
    },
}