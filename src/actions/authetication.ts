"use server";
import { AUTH_DASH } from "@/functions/api/api-auth";
import { cookies } from "next/headers";

type Props = {
  email: string;
  senha: string;
};

export default async function authetication_dash(login: Props) {
  const { url } = AUTH_DASH();
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(login),
      cache: "no-store",
    });

    const data = await response.json();

    (await cookies()).set("access_token", data.access_token, {
      httpOnly: true,
      secure: true,
    });
    (await cookies()).set("id_recrutador", data.user.id_recrutador, {
      httpOnly: true,
      secure: true,
    });
    (await cookies()).set("nome", data.user.nome, {
      httpOnly: true,
      secure: true,
    });

    return { data, ok: response.ok, error: "" };
  } catch (error) {
    return { data: null, ok: false, error: "Erro ao fazer login" };
  }
}