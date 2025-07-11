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
import { useNavigate } from "react-router-dom";
import Logo from "@/assets/cropped-cropped-logo-11anos-epdjmm-2022.png";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

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

  const handleLogin = () => {
    const user = users.find((u) => u.email === email && u.senha === password);

    if (user) {
      localStorage.setItem("isLoggedIn", "true");
      navigate("/home");
    } else {
      setErro("Email ou senha inválidos");
    }
  };

  return (
    <>
      <main className="h-screen flex flex-col md:flex-row w-full ">
        <div className="hidden md:flex bg-primary-foreground w-full md:w-1/2 h-64 md:h-full items-center justify-center p-16">
          <div className="flex aspect-square  rounded-md p-8">
            <img
              src={Logo}
              alt="logo-eeep"
              className="w-80 h-auto object-contain"
            />
          </div>
        </div>
        <section className="flex items-center justify-center bg-background h-full w-full md:w-1/2 p-4">
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <Label>Senha:</Label>
                <Input
                  className="mt-2"
                  id="senha"
                  placeholder="Digite sua senha"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {erro && <p className="text-red-500 text-sm">{erro}</p>}
              </div>
              <Button
                onClick={handleLogin}
                className="mt-4 w-full bg-green-700 hover:bg-green-600"
              >
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
