import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getAuthToken } from "./utils";

export function proxy(request: NextRequest) {
  const authToken = getAuthToken();
  const isLoggedIn = authToken || false;

  // Rotas públicas, não precisam de autenticação
  const isPublicPath =
    request.nextUrl.pathname === "/login" ||
    request.nextUrl.pathname === "/register";

  // Se não estiver logado e tentar acessar uma rota protegida, redirecionar para login
  if (!isLoggedIn && !isPublicPath) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  // Se estiver autenticado e tentar acessar /login ou /register, redirecionar para o dashboard
  if (isLoggedIn && isPublicPath) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/users"],
};
