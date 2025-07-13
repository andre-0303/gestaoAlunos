
# 📊 Gestão de Alunos - Informática

Sistema web para gestão de turmas, alunos e visualização de gráficos estatísticos de desempenho por matéria. Feito com **React**, **Tailwind CSS**, **ShadCN UI**, **Recharts** e **API REST** com Node.js + Neon.

---

## 🚀 Tecnologias Utilizadas

- [React](https://reactjs.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/)
- [ShadCN UI](https://ui.shadcn.dev/)
- [Recharts](https://recharts.org/)
- [Axios](https://axios-http.com/)
- Backend: Node.js + Express + Neon + Prisma

---

## 📂 Estrutura do Projeto

```
src/
├── components/
│   ├── GraficoNotasMateria.jsx
│   └── ui/
│       ├── button.jsx
│       ├── card.jsx
│       ├── select.jsx
│       └── skeleton.jsx
├── screens/
│   ├── Home.jsx
│   ├── Signin.jsx
│   ├── Turma.jsx
│   └── GraficosNotas.jsx
├── services/
│   └── api.js
└── App.jsx
```

---

## 🔧 Como rodar o projeto

1. **Clone o repositório**

```bash
git clone https://github.com/andre-0303/gestaAlunos.git
cd gestao-alunos
```

2. **Instale as dependências**

```bash
npm install
```

3. **Configure a URL da API** (se necessário)

Edite `src/services/api.js`:

```js
export const api = axios.create({
  baseURL: "https://sua-api.onrender.com",
});
```

4. **Execute o projeto**

```bash
npm run dev
```

Acesse: [http://localhost:5173](http://localhost:5173)

---

## ✨ Funcionalidades

- ✅ Login com proteção de rota via \`localStorage\`
- ✅ Listagem de turmas e alunos
- ✅ Lançamento de notas por aluno
- ✅ Visualização de gráficos de desempenho por matéria
- ✅ Filtro de gráficos por turma
- ✅ UI responsiva com Tailwind + ShadCN
- ✅ Componentes reutilizáveis
- ✅ Skeleton loading enquanto carrega os dados

---

## 📈 Exemplo de uso (Gráfico de Pizza)

> Mostra a distribuição percentual das notas de todos os alunos por matéria, agrupadas e renderizadas com **Recharts**.

---

## 🗃 Backend (API)

> A API usada neste frontend está hospedada em:  
> [https://api-alunos-sql-lite-2.onrender.com](https://api-alunos-sql-lite-2.onrender.com)

Exemplos de rotas utilizadas:

- `GET /notas` — Todas as notas lançadas
- `GET /materias/turma/:nomeTurma` — Matérias da turma
- `POST /alunos` — Cadastro de aluno
- `PUT /notas/:id` — Editar nota

---

## 🤝 Contribuição

Quer contribuir? Faça um fork, crie uma branch com sua feature/fix:

```bash
git checkout -b minha-feature
```

Depois abra um Pull Request 🔥

---

## 🧠 Autor

Desenvolvido por **André Bandeira**  
Técnico em Informática 💻 apaixonado por programação e o mundo tech

---

## 📄 Licença

Esse projeto está sob licença MIT.
