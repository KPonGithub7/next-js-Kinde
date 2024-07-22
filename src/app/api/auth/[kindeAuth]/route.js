import { NextApiRequest, NextApiResponse } from "next";
import { handleAuth } from "@kinde-oss/kinde-auth-nextjs/server";
export const GET = handleAuth();

// export default function handler(req, res) {
//     const authorizationUrl = `https://kunalpatel.kinde.com/oauth2/authorize?client_id=${process.env.KINDE_CLIENT_ID}&redirect_uri=${process.env.KINDE_REDIRECT_URI}&response_type=code&scope=openid profile email`;

//     res.redirect(authorizationUrl);
// }
