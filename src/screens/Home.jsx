import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LogoInfor from "@/assets/logo_cursos_INFOR_2022-1.png";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/signin");
    }
  }, []);

  const handleLogout = () => {
    const confirmLogout = window.confirm("Tem certeza que deseja sair?");
    if (confirmLogout) {
      localStorage.removeItem("isLoggedIn");
      navigate("/signin");
    }
  };

  return (
    <main className="h-screen flex flex-col md:flex-row w-full">
      <div className="hidden md:flex bg-primary-foreground w-full md:w-1/2 h-64 md:h-full items-center justify-center p-16">
        <div className="flex flex-col items-center justify-center aspect-square rounded-md p-8">
          <img
            src={LogoInfor}
            alt="logo-infor"
            className="w-80 h-auto object-contain"
          />
          <h1 className="-mt-16">Gestão de Alunos - Informática</h1>
        </div>
      </div>
      <section className="flex items-center justify-center bg-background h-full w-full md:w-1/2 p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="flex items-center justify-center">
            <CardTitle className="text-2xl font-bold tracking-tighter">
              Turmas
            </CardTitle>
            <CardDescription>
              Entre e edite os dados dos alunos.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Button onClick={() => navigate("/turma/Infor_G8")}>
                Infor G8
              </Button>
              <Button onClick={() => navigate("/turma/Infor_G9")}>
                Infor G9
              </Button>
              <Button onClick={() => navigate("/turma/Infor_G10")}>
                Infor G10
              </Button>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col items-center gap-4 mt-4">
            <Button
              onClick={handleLogout}
              className="w-full max-w-[200px]"
              variant="destructive"
            >
              Sair
            </Button>
            <p className="text-muted-foreground text-center text-sm leading-snug px-4">
              Sistema feito pelo curso técnico em Informática
            </p>
          </CardFooter>
        </Card>
      </section>
    </main>
  );
};

export default Home;
