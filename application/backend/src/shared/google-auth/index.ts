import { OAuth2Client } from "google-auth-library";
import { env } from "@shared/env";
import { AppError } from "@shared/app-error";
import crypto from "crypto";

const googleClient = new OAuth2Client({
  clientId: env.GOOGLE_CLIENT_ID,
  clientSecret: env.GOOGLE_CLIENT_SECRET,
  redirectUri: env.GOOGLE_REDIRECT_URI
});

export class GoogleAuth {
  static setState(state: string) {
    const serializedState = crypto.randomBytes(32).toString('hex')
    return serializedState
  }

  static generateAuthUrl(state: string ) {
    return googleClient.generateAuthUrl({
      access_type: 'offline',
      scope: ["profile", "email"],
      state: state
    });
  }

  static async verifyGoogleToken(tokenCode: string) {
    try {
      const { tokens } = await googleClient.getToken({
        code: tokenCode, 
        redirect_uri: 'postmessage'
      });
      
      if (!tokens.id_token) {
        throw new AppError("Failed to retrieve ID token from Google", 401);
      }

      const ticket = await googleClient.verifyIdToken({
        idToken: tokens.id_token,
        audience: env.GOOGLE_CLIENT_ID,
      });

      return ticket.getPayload();
    } catch (err) {
      throw new AppError(`Google Authentication failed: ${err}`, 401);
    }
  }
}