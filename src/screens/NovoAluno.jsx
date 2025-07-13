import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "@/services/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const NovoAluno = () => {
  const [searchParams] = useSearchParams();
  const turmaDefault = searchParams.get("turma") || "";
  const navigate = useNavigate();

  const [form, setForm] = useState({
    nome: "",
    idade: "",
    email: "",
    turma: turmaDefault,
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/alunos", {
        nome: form.nome,
        idade: form.idade,
        email: form.email,
      });
      alert("Aluno cadastrado com sucesso!");
      navigate(-1);
    } catch (err) {
      alert("Erro ao cadastrar aluno");
    }
  };

  return (
    <main className="p-6 max-w-lg mx-auto space-y-4">
      <h1 className="text-2xl font-bold">Cadastrar Novo Aluno</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label>Nome</Label>
          <Input
            name="nome"
            value={form.nome}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Idade</Label>
          <Input
            type="number"
            name="idade"
            value={form.idade}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Email</Label>
          <Input
            type="email"
            name="email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label>Turma</Label>
          <Input
            name="turma"
            value={form.turma}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" className="w-full">
          Salvar Aluno
        </Button>
      </form>
    </main>
  );
};

export default NovoAluno;