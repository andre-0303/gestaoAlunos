import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { api } from "@/services/api";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

const NotasAlunos = () => {
  const { id: alunoId } = useParams();
  const navigate = useNavigate();

  const [aluno, setAluno] = useState(null);
  const [materias, setMaterias] = useState([]);
  const [notas, setNotas] = useState({});
  const [loading, setLoading] = useState(true);

  const fetchAluno = async () => {
    const res = await api.get(`/alunos/${alunoId}`);
    setAluno(res.data);
    return res.data.turma;
  };

  const fetchMaterias = async (turma) => {
    const res = await api.get(`/materias/turma/${turma}`);
    console.log(`Turma: ${turma}`);
    console.log("Matérias:", res.data);
    if (!res.data.length) {
      alert("Essa turma não possui matérias cadastradas.");
    }
    setMaterias(res.data);
  };

  const fetchNotas = async () => {
    const res = await api.get(`/notas/aluno/${alunoId}`);
    const mapaNotas = {};
    res.data.forEach((nota) => {
      mapaNotas[nota.materiaId] = { id: nota.id, valor: String(nota.nota) };
    });
    setNotas(mapaNotas);
  };

  const loadData = async () => {
    try {
      const turma = await fetchAluno();
      await fetchMaterias(turma);
      await fetchNotas();
    } catch (err) {
      alert("Erro ao carregar dados.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") return navigate("/signin");

    loadData();
  }, []);

  const handleSave = async (materiaId) => {
    const notaAtual = notas[materiaId];
    const valor = Number(notaAtual?.valor);

    if (!notaAtual || isNaN(valor) || valor < 0 || valor > 10) {
      alert("Nota inválida. Digite um número de 0 a 10.");
      return;
    }

    try {
      if (notaAtual.id) {
        await api.put(`/notas/${notaAtual.id}`, { nota: valor });
      } else {
        await api.post(`/notas`, {
          alunoId: Number(alunoId),
          materiaId: Number(materiaId),
          nota: valor,
        });
      }
      alert("Nota salva com sucesso!");
      fetchNotas();
    } catch (err) {
      console.error(err);
      alert(
        "Erro ao salvar nota. Verifique se o aluno existe e se os dados estão corretos."
      );
    }
  };

  if (loading) {
    return <p className="text-muted-foreground">Carregando dados...</p>;
  }

  return (
    <main className="min-h-screen p-4">
      <div className="mb-4 flex justify-between items-center">
        <Button onClick={() => navigate(-1)} variant="outline">
          <ArrowLeft className="mr-2" size={18} />
          Voltar
        </Button>
        <h1 className="text-2xl font-bold text-center">
          Notas de {aluno?.nome}
        </h1>
        <div className="w-10" /> {/* espaçamento */}
      </div>

      <div className="grid gap-4">
        {materias.map((materia) => (
          <Card key={materia.id}>
            <CardHeader>
              <CardTitle>{materia.nome}</CardTitle>
            </CardHeader>
            <CardContent className="flex gap-2 items-center">
              <Input
                type="number"
                value={notas[materia.id]?.valor || ""}
                onChange={(e) =>
                  setNotas((prev) => ({
                    ...prev,
                    [materia.id]: {
                      ...prev[materia.id],
                      valor: e.target.value,
                    },
                  }))
                }
                placeholder="0-10"
                className="w-24"
              />
              <Button size="sm" onClick={() => handleSave(materia.id)}>
                Salvar
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
};

export default NotasAlunos;
