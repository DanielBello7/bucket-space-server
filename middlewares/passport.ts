import { PassportStatic } from "passport";
import { variables } from "@/constants";
import localAuth from 'passport-local';
import jwtAuth from 'passport-jwt';
import bcrypt from 'bcrypt';
import UserModel from "@/models/user.model";
import APIError from "@/modules/api-error";
import httpStatus from "http-status";
import generateToken from "@/modules/generate-token";

const LocalStrategy = localAuth.Strategy;
const JWTStrategy = jwtAuth.Strategy;

function initialize(passport: PassportStatic) {
  const { JWT_GENERAL_SECRET } = variables;
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
        const key = generateToken({ ...user._doc }, JWT_GENERAL_SECRET);
        done(null, { user, key });
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

  passport.use('auth', authenticateUser);
  passport.use('jwt', jwtAuthenticate);
}

export default initialize;
