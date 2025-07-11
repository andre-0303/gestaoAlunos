import React from "react";
import { useState, useEffect } from "react";
import { api } from "@/services/api";
import { ArrowLeft } from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const ListaAluno = () => {
  const { id: turma } = useParams();
  const navigate = useNavigate();
  const [alunos, setAlunos] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchAlunos = async () => {
    try {
      const res = await api.get(`/alunos/turma/${turma}`);
      setAlunos(res.data);
    } catch (error) {
      console.log("Erro ao buscar alunos: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchAlunos = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/alunos/turma/${turma}`);
        console.log("Alunos recebidos:", res.data);
        setAlunos(res.data || []);
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
        setAlunos([]); // evita estado indefinido
      } finally {
        setLoading(false);
      }
    };

    fetchAlunos();
  }, [turma]);

  return (
    <>
      <main className="min-h-screen p-4">
        <div className="mb-4">
          <Button onClick={() => navigate(-1)} variant="outline">
            <ArrowLeft className="mr-2" size={18} />
            Voltar
          </Button>
        </div>
        <h1 className="text-3xl font-bold mb-4">
          Turma: {turma.replace("_", "")}
        </h1>
        {loading ? (
          <p className="text-muted-foreground">Carregando alunos...</p>
        ) : alunos.length === 0 ? (
          <p className="text-muted-foreground">Nenhum aluno encontrado.</p>
        ) : (
          <div className="grid gap-4">
            {alunos.map((aluno) => (
              <Card key={aluno.id}>
                <CardHeader>
                  <CardTitle>{aluno.nome}</CardTitle>
                  <CardDescription> {aluno.email} </CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground">
                  Idade: {aluno.idade}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </main>
    </>
  );
};

export default ListaAluno;
