import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";
import { useState } from "react";


const SignIn = () => {
  let users = [
    {
      nome: "Saulo",
      email: "saulo@prof.ce.gov.br",
      senha: "123456",
    },
    {
      nome: "Henrique",
      email: "rick@prof.ce.gov.br",
      senha: "123456",
    },
  ];

  return (
    <>
      <main className="h-screen flex w-full">
        <div className="bg-primary-foreground w-full h-full flex items-center justify-center p-16"></div>
        <section className="flex items-center justify-center bg-background h-full max-w-3xl w-full p-4">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle className="text-2xl font-bold tracking-tighter">
                Entre com sua conta
              </CardTitle>
              <CardDescription>
                Entre com seu email constitucional
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-1">
              <div>
                <Label>Email:</Label>
                <Input
                  className="mt-2"
                  id="email"
                  placeholder="Digite seu email"
                  type="email"
                />
              </div>
              <div>
                <Label>Senha:</Label>
                <Input
                  className="mt-2"
                  id="senha"
                  placeholder="Digite sua senha"
                  type="password"
                />
              </div>
              <Button className="mt-4 w-full bg-green-700 hover:bg-green-600">
                Entrar
              </Button>
            </CardContent>
            <CardFooter>
              <p className="text-muted-foreground text-center text-sm">
                Ao entrar na nossa plataforma, você concorda com nossos termos
                de Uso e Política de Privacidade.
              </p>
            </CardFooter>
          </Card>
        </section>
      </main>
    </>
  );
};

export default SignIn;
