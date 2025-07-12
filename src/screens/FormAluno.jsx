import React from "react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { api } from "@/services/api";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const FormAluno = () => {
  const { id } = useParams();
  console.log("Id capturado na rota: ", id);
  const navigate = useNavigate();

  const [aluno, setAluno] = useState(null);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [email, setEmail] = useState("");
  const [turma, setTurma] = useState("");
  const [loading, setLoading] = useState(Boolean(id));

  const isEditando = Boolean(id);

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") {
      navigate("/signin");
    }
  }, [navigate]);

  useEffect(() => {
    if (isEditando) {
      setLoading(true);
      api
        .get(`/alunos/${id}`)
        .then((res) => {
          const data = res.data;
          setAluno(data);
          setNome(data.nome);
          setIdade(data.idade);
          setEmail(data.email);
          setTurma(data.turma);
        })
        .catch((err) => {
          alert("Erro ao buscar aluno.");
          navigate("/home");
        })
        .finally(() => {
          setLoading(false);
        });
    }
  }, [id, isEditando, navigate]);

  const handleSubmit = async () => {
    if (!nome || !idade || !email || !turma) {
      alert("Preencha todos os campos!");
      return;
    }

    const payload = {
      nome,
      idade: Number(idade),
      email,
      turma,
    };

    try {
      if (isEditando) {
        await api.put(`/alunos/${id}`, payload);
      } else {
        await api.post("/alunos", payload);
      }
      navigate(-1);
    } catch (error) {
      alert(error.response?.data?.error || "Erro ao salvar aluno");
    }
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Carregando aluno...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4">
      <div className="mb-4">
        <Button onClick={() => navigate(-1)} variant="outline">
          <ArrowLeft className="mr-2" size={18} />
          Voltar
        </Button>
      </div>
      <Card className="w-full max-w-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {isEditando ? "Editar Aluno" : "Cadastrar Aluno"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-1">
            <Label>Nome</Label>
            <Input
              value={nome}
              onChange={(e) => setNome(e.target.value)}
              placeholder="Digite o nome do aluno"
            />
          </div>

          <div className="space-y-1">
            <Label>Idade</Label>
            <Input
              value={idade}
              onChange={(e) => setIdade(e.target.value)}
              placeholder="Digite a idade"
              type="number"
            />
          </div>

          <div className="space-y-1">
            <Label>Email</Label>
            <Input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="email@aluno.ce.gov.br"
              type="email"
            />
          </div>

          <div className="space-y-1">
            <Label>Turma</Label>
            <Input
              value={turma}
              onChange={(e) => setTurma(e.target.value)}
              placeholder="Ex: Infor_G8"
            />
          </div>

          <Button className="w-full" onClick={handleSubmit}>
            {isEditando ? "Atualizar Aluno" : "Cadastrar Aluno"}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
};

export default FormAluno;
