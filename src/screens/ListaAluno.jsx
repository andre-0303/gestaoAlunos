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
import { Loader2 } from "lucide-react";

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
        setAlunos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAlunos();
  }, [turma]);

  const handleDelete = async (id) => {
    const confirmar = confirm("Tem certeza que deseja excluir este aluno?");
    if (!confirmar) return;

    try {
      await api.delete(`/alunos/${id}`);
      setAlunos((prev) => prev.filter((aluno) => aluno.id !== id));
    } catch (error) {
      alert("Erro ao deletar aluno");
    }
  };

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
          <main className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <Loader2 className="w-6 h-6 animate-spin text-green-700" />
              <p>Carregando dados...</p>
            </div>
          </main>
        ) : alunos.length === 0 ? (
          <p className="text-muted-foreground">Nenhum aluno encontrado.</p>
        ) : (
          <div className="grid gap-4">
            {alunos.map((aluno) => (
              <Card key={aluno.id}>
                <CardHeader>
                  <CardTitle>{aluno.nome}</CardTitle>
                  <CardDescription>{aluno.email}</CardDescription>
                </CardHeader>
                <CardContent className="text-muted-foreground space-y-2">
                  <p>Idade: {aluno.idade}</p>
                  <div className="flex gap-2 mt-2">
                    <Button
                      size="sm"
                      onClick={() => navigate(`/notas/${aluno.id}`)}
                    >
                      Ver Notas
                    </Button>
                    <Button
                      size="sm"
                      className="bg-yellow-500 hover:bg-yellow-400"
                      onClick={() => navigate(`/aluno/editar/${aluno.id}`)}
                    >
                      Editar
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(aluno.id)}
                    >
                      Deletar
                    </Button>
                  </div>
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
