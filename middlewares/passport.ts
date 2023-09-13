import { PassportStatic } from "passport";
import { variables } from "@/constants";
import localAuth from 'passport-local';
import jwtAuth from 'passport-jwt';
import bcrypt from 'bcrypt';
import UserModel from "@/models/user.model";
import APIError from "@/modules/api-error";
import httpStatus from "http-status";
import generateToken from "@/modules/generate-token";
import SessionModel from "@/models/session.model";

const LocalStrategy = localAuth.Strategy;
const JWTStrategy = jwtAuth.Strategy;

function initialize(passport: PassportStatic) {
  const { JWT_GENERAL_SECRET, JWT_REFRESH_SECRET, EXPIRES_IN } = variables;
  const authError = new APIError(httpStatus.UNAUTHORIZED, 'invalid credentials');

  const authenticateUser = new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password"
    },
    async function (email, password, done) {
      try {
        const response = await UserModel.findOne({ email: email });
        if (!response || (response && !bcrypt.compareSync(password, response.password))) return done(authError);
        const user: any = response;

        const key = generateToken(
          { ...user._doc },
          JWT_GENERAL_SECRET,
          EXPIRES_IN
        );

        const refreshToken = generateToken({ ...user._doc }, JWT_REFRESH_SECRET);
        done(null, { user, key, refreshToken });
      } catch (error) { done(error) }
    }
  );

  const jwtAuthenticate = new JWTStrategy(
    {
      jwtFromRequest: jwtAuth.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_GENERAL_SECRET,
      issuer: 'inScript'
    },
    async function (payload, done) {
      try {
        const response = await UserModel.findOne({ email: payload.email });
        if (!response) done(authError);
        done(null, payload);
      } catch (error) { done(error) }
    }
  );

  const refreshAuthenticate = new JWTStrategy(
    {
      jwtFromRequest: jwtAuth.ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_REFRESH_SECRET,
      issuer: "inScript"
    },
    async function (payload, done) {
      try {
        const email = payload.email;
        const check = await SessionModel.findOne({ email: email });
        if (!check) return done(authError, false);
        return done(null, payload);
      } catch (error) { done(error) }
    }
  )

  passport.use('auth', authenticateUser);
  passport.use('jwt', jwtAuthenticate);
  passport.use("refresh", refreshAuthenticate);
}

export default initialize;
