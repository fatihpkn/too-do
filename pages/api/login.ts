import type { NextApiRequest, NextApiResponse } from "next";
import { API } from "SupabaseAPI";

export default async (req: NextApiRequest, res: NextApiResponse<any>) => {
  const body = JSON.parse(req.body);

  const { user, session, error } = await API.auth.signIn({ email: body.email });

  return res.status(200).json({ user, session, error });
};
