import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { Session } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import mysql from 'mysql2/promise';
import { RowDataPacket } from "mysql2/promise";
import { compare } from 'bcrypt';

declare module "next-auth" {
  interface Session {
    id: number;
    nom: string;
    email: string;
    prenom: string;
  }
}

export const authConfig: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "Email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials || !credentials.email || !credentials.password) {
          return null;
        }

        try {
          const connection = await mysql.createConnection({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
          });

          const [utilisateur] = await connection.query<RowDataPacket[]>('SELECT * FROM utilisateur WHERE email = ?', [credentials.email]);
          connection.end();

          if (utilisateur.length > 0 && await compare(credentials.password, utilisateur[0].mdp)) {
            const user = {
              id: utilisateur[0].id,
              nom: utilisateur[0].nom,
              email: utilisateur[0].email,
              prenom: utilisateur[0].prenom,
            };
            return user;
          } else {
            return null;
          }
        } catch (error) {
          console.error('Erreur lors de la recherche de l\'utilisateur :', error);
          return null;
        }
      },
    }),

    GitHubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, session, trigger }) {
      console.log("jwt callback", { token, user, session, trigger });
      if (user) {
        return {
          ...token,
          id: (user as any).id,
          nom: (user as any).nom,
          email: (user as any).email,
          prenom: (user as any).prenom,
        };
      }
      if (trigger === "update" && session) {
        // Vous pouvez ajouter des logiques de mise à jour du token ici si nécessaire
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("session callback ", { session, token, user });

      if (user) {
        return {
          ...session,
          id: (user as any).id,
          nom: (user as any).nom,
          email: (user as any).email,
          prenom: (user as any).prenom,
        };
      }
     
      return session;
    },
  },
};

export default authConfig;
