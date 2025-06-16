import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  // Middleware desativado - permitindo todas as requisições
  return NextResponse.next();
}

export const config = {
  matcher: ["/perguntas/:path*", "/ranking", "/"],
};

