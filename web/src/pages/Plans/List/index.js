import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import { MdAdd } from 'react-icons/md';

import api from '~/services/api';
import { Container, Header, Table } from './styles';

import { formatPrice } from '~/util/format';

export default function Plans() {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    async function loadPlans() {
      const response = await api.get('plans');

      setPlans(response.data);
    }

    loadPlans();
  }, []);

  async function handleDelete(id) {
    try {
      await api.delete(`plans/${id}`);

      setPlans(plans.filter(plan => plan.id !== id));
      toast.info('Plano removido com sucesso');
    } catch (error) {
      toast.error('Falha ao remover plano, tente novamente!');
    }
  }

  return (
    <Container className="container">
      <Header className="header">
        <h1 className="title">Gerenciando planos</h1>

        <div className="actions">
          <Link to="/plans/register" className="primary">
            <MdAdd size={20} color="#FFF" />
            Cadastrar
          </Link>
        </div>
      </Header>
      <Table className="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Duração</th>
            <th align="center">VALOR p/ MÊS</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {plans.map(plan => (
            <tr key={plan.id}>
              <td>{plan.title}</td>
              <td>
                {plan.duration} {plan.duration > 1 ? `meses` : `mês`}
              </td>
              <td>{formatPrice(plan.price)}</td>
              <td>
                <div>
                  <Link to={`/plans/${plan.id}`} className="edit">
                    editar
                  </Link>
                  <button
                    type="button"
                    className="delete"
                    onClick={() => handleDelete(plan.id)}
                  >
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
