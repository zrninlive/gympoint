import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { MdAdd } from 'react-icons/md';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';
import { Container, Header, Table } from './styles';

export default function Enrollments() {
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    async function loadEnrollments() {
      const response = await api.get('enrollments');

      setEnrollments(response.data);
    }

    loadEnrollments();
  }, []);

  return (
    <Container className="container">
      <Header className="header">
        <h1 className="title">Gerenciando matriculas</h1>

        <div className="actions">
          <Link to="/enrollments/register" className="primary">
            <MdAdd size={20} color="#FFF" />
            Cadastrar
          </Link>
        </div>
      </Header>
      <Table className="table">
        <thead>
          <tr>
            <th>Aluno</th>
            <th>Plano</th>
            <th align="center">Inicio</th>
            <th align="center">Término</th>
            <th>ATIVA</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {enrollments.map(enrollment => (
            <tr key={enrollment.id}>
              <td>{enrollment.student.name}</td>
              <td>{enrollment.plan.title}</td>
              <td align="center">{enrollment.start_date_formatted}</td>
              <td align="center">{enrollment.end_date_formatted}</td>
              <td />
              <td>
                <div>
                  <Link to={`/enrollments/${enrollment.id}`} className="edit">
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
