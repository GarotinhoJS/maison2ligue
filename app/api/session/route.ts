import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import authConfig from "@/app/auth/page";

export async function GET(request: Request) {
  const session = await getServerSession(authConfig);

  return NextResponse.json({
    authenticated: !!session,
    session,
  });
}
