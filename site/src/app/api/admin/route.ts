import { chaveAdminConfere } from "@/lib/servidor";

// Confere a chave das telas internas (ex.: liberar o download da logo).
export async function POST(request: Request) {
  const ok = chaveAdminConfere(request.headers.get("x-admin-chave"));
  return Response.json({ ok }, { status: ok ? 200 : 401 });
}
