import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const authToken = request.cookies.get("authToken")?.value;
  const isLoggedIn = authToken || false;

  // Rotas públicas, não precisam de autenticação
  const isPublicPath =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register";

  // Se não estiver logado e tentar acessar uma das rotas do matcher, redirecionar para login
  if (!isLoggedIn) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se estiver autenticado e tentar acessar /login ou /register, redirecionar para o dashboard
  if (isLoggedIn && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/login", "/register", "/users", "/resources"],
};
