import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';

import api from '~/services/api';
import { Container, Header, Table } from './styles';

export default function Students() {
  const [studentsList, setStudentsList] = useState([]);
  const [studentsFiltered, setStudentsFiltered] = useState([]);

  useEffect(() => {
    async function loadStudents() {
      const response = await api.get('students');

      setStudentsList(response.data);
      setStudentsFiltered(response.data);
    }

    loadStudents();
  }, []);

  function handleSearchStudent(value) {
    if (value === '') {
      setStudentsFiltered(studentsList);
      return;
    }

    const textSearched = value.toLowerCase();

    const filtered = studentsFiltered.filter(
      student =>
        student.name.toLowerCase().includes(textSearched) ||
        student.age.toString().includes(textSearched) ||
        !!student.email.toLowerCase().includes(textSearched)
    );

    setStudentsFiltered(filtered);
  }

  return (
    <Container className="container">
      <Header className="header">
        <h1 className="title">Gerenciando alunos</h1>

        <div className="actions">
          <Link to="/students/register" className="primary">
            <MdAdd size={20} color="#FFF" />
            Cadastrar
          </Link>
          <input
            type="text"
            placeholder="Buscar aluno"
            onChange={e => handleSearchStudent(e.target.value)}
          />
        </div>
      </Header>
      <Table className="table">
        <thead>
          <tr>
            <th>NOME</th>
            <th>E-MAIL</th>
            <th align="center">IDADE</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {studentsFiltered.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.age}</td>
              <td>
                <div>
                  <Link to={`/students/${student.id}`} className="edit">
                    editar
                  </Link>
                  <button type="button" className="delete">
                    apagar
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
