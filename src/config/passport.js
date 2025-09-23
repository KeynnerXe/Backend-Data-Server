import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { getPrisma } from "./prisma.js";

function configurePassport(passport) {
  const prisma = getPrisma(); // inicializa Prisma en runtime

  passport.use(
    new LocalStrategy({ usernameField: "email" }, async (email, password, done) => {
      try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return done(null, false, { message: "Usuario no encontrado" });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return done(null, false, { message: "Contraseña incorrecta" });

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    })
  );

  passport.serializeUser((user, done) => done(null, user.id));

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await prisma.user.findUnique({ where: { id } });
      done(null, user);
    } catch (err) {
      done(err);
    }
  });
}

export default configurePassport;