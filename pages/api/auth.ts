import type { NextApiRequest, NextApiResponse } from "next";
import { API } from "SupabaseAPI";

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  API.auth.api.setAuthCookie(req, res);
};
