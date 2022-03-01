import { NextFetchEvent, NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { API } from "SupabaseAPI";

export async function middleware(req: NextRequest, ev: NextFetchEvent) {
  //The line below isn't working as expected, see README.tx
  //let authResult = await supabase.auth.api.getUserByCookie(req)

  let authResult = await getUser(req);


  const url = req.nextUrl.clone()

  // if (authResult.error) {
  //   console.log("Authorization error, redirecting to login page", authResult.error);
  //   return NextResponse.redirect(`${req.url}?redirect=login`);
  // } else if (!authResult.user) {
  //   console.log("No auth user, redirecting");
  //   return NextResponse.redirect(`${req.url}?redirect=login`);
  // } else {
  //   console.log("User is found", authResult.user);
  //   return NextResponse.next();
  // }

}

async function getUser(req: NextRequest): Promise<any> {
  return await API.auth.api.getUserByCookie(req);
}
