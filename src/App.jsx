import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import SignIn from "./screens/SignIn";
import Home from "./screens/Home";
import ListaAlunos from "./screens/ListaAluno";
import FormAluno from "./screens/FormAluno";
import NotasAlunos from "./screens/NotasAlunos";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
        <Route path="/turma/:id" element={<ListaAlunos />} />
        <Route path="/aluno/novo" element={<FormAluno />} />
        <Route path="/aluno/editar/:id" element={<FormAluno />} />
        <Route path="/notas/:id" element={<NotasAlunos />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
