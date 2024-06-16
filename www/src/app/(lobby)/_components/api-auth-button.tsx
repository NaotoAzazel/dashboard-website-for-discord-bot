"use client";

import { Button } from "@/components/ui/button";

import * as Api from "@/lib/api";
import { parseCookies, setCookie } from "nookies";

import { ILoginFormDto } from "@/lib/api/auth/dto/auth.dto";
import { useEffect, useState } from "react";

export function ApiAuthButton() {
  const [isAuth, setIsAuth] = useState<boolean>(false);

  const onSubmit = async (values: ILoginFormDto) => {
    try {
      const { token } = await Api.auth.login(values);

      setCookie(null, "_token", token, {
        path: "/",
      });

      setIsAuth(true);
    } catch (error) {
      console.warn("Failed to login in api", error);
    }
  };

  useEffect(() => {
    const { _token } = parseCookies();
    setIsAuth(!!_token);
  }, []);

  return (
    <Button disabled={isAuth} onClick={() => onSubmit({ password: "admin" })}>
      Authrorize api
    </Button>
  );
}
