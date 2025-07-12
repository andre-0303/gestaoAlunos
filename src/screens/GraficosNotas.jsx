import React from "react";
import { useEffect, useState } from "react";
import { api } from "@/services/api";
import GraficoNotasMateria from "@/components/GraficoNotasMateria";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const agruparNotasPorMateria = (notas) => {
  const materias = {};

  for (let item of notas) {
    const materiaId = item.materiaId;
    const nota = Math.round(item.nota);

    if (!materias[materiaId]) {
      materias[materiaId] = {};
    }

    materias[materiaId][nota] = (materias[materiaId][nota] || 0) + 1;
  }

  return materias;
};

const formatarDadosParaGrafico = (materiasMapeadas) => {
  return Object.entries(materiasMapeadas).map(([materiaId, notasObj]) => {
    const total = Object.values(notasObj).reduce((acc, qtd) => acc + qtd, 0);

    const data = Object.entries(notasObj).map(([nota, qtd]) => ({
      name: `Nota ${nota}`,
      value: Number(((qtd / total) * 100).toFixed(1)),
    }));

    return {
      materiaId: Number(materiaId),
      data,
    };
  });
};

const GraficosTurma = () => {
  const [turmaSelecionada, setTurmaSelecionada] = useState("Infor_G9");
  const [notas, setNotas] = useState([]);
  const [materias, setMaterias] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const turmas = ["Infor_G8", "Infor_G9", "Infor_G10"];

  useEffect(() => {
    const carregar = async () => {
      setLoading(true);
      try {
        const [resNotas, resMaterias] = await Promise.all([
          api.get("/notas"),
          api.get(`/materias/turma/${turmaSelecionada}`),
        ]);
        setNotas(resNotas.data);
        setMaterias(resMaterias.data);
      } catch (err) {
        alert("Erro ao carregar dados.");
      } finally {
        setLoading(false);
      }
    };

    carregar();
  }, [turmaSelecionada]);

  const buscarNomeMateria = (id) => {
    const materia = materias.find((m) => m.id === id);
    return materia?.nome || `Matéria ${id}`;
  };

  const materiasAgrupadas = agruparNotasPorMateria(
    notas.filter((n) => materias.some((m) => m.id === n.materiaId))
  );

  const dadosFormatados = formatarDadosParaGrafico(materiasAgrupadas);

  return (
    <main className="p-6 min-h-screen space-y-6 max-w-7xl mx-auto">
      <div className="mb-4">
        <Button
          onClick={() => navigate(-1)}
          variant="outline"
          className="w-fit"
        >
          <ArrowLeft className="mr-2" size={18} />
          Voltar
        </Button>
      </div>
      <h1 className="text-2xl md:text-2xl font-bold text-center">
        Gráficos de Desempenho por Matéria
      </h1>

      <div className="flex justify-center px-4">
        <Select value={turmaSelecionada} onValueChange={setTurmaSelecionada}>
          <SelectTrigger className="w-full max-w-[280px]">
            <SelectValue placeholder="Selecione uma turma" />
          </SelectTrigger>
          <SelectContent>
            {turmas.map((turma) => (
              <SelectItem key={turma} value={turma}>
                {turma.replace("_", " ")}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <Skeleton key={i} className="h-[300px] rounded-xl bg-muted" />
            ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {dadosFormatados.map(({ materiaId, data }) => (
            <GraficoNotasMateria
              key={materiaId}
              materiaNome={buscarNomeMateria(materiaId)}
              data={data}
            />
          ))}
        </div>
      )}
    </main>
  );
};

export default GraficosTurma;
