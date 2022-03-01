import type { NextApiRequest, NextApiResponse } from "next";
import { API } from "SupabaseAPI";

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  await API.auth.api.deleteAuthCookie(req, res, { redirectTo: '/' });
  await API.auth.signOut();
  res.redirect(301, "login");
};
