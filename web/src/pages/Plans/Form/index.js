import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdArrowBack, MdSave } from 'react-icons/md';

import api from '~/services/api';
import { Container, Header } from './styles';

import { formatPrice } from '~/util/format';

export default function PlanForm({ match, history }) {
  const plan_id = match.params.id;

  const [plan, setPlan] = useState({});

  const { duration, price } = plan;
  const priceAmount = useMemo(() => duration * price, [duration, price]);

  useEffect(() => {
    async function loadPlan() {
      const response = await api.get(`plans/${plan_id}`);
      setPlan(response.data);
    }

    if (plan_id) {
      loadPlan();
    }
  }, [plan_id]);

  function handleChange({ currentTarget }) {
    setPlan({ ...plan, [currentTarget.name]: currentTarget.value });
  }

  async function handleSubmit() {
    try {
      if (plan_id) {
        await api.put(`plans/${plan_id}`, plan);
        toast.info('Plano atualizado com sucesso!');
        return;
      }

      await api.post(`plans/`, plan);
      toast.info('Plano criado com sucesso!');
      history.push('/plans');
    } catch (error) {
      toast.error('Falha ao salvar plano, tente novamente!');
    }
  }

  return (
    <Container className="container">
      <Header className="header">
        <h1 className="title">
          {plan_id ? 'Edição do plano' : 'Cadastro do plano'}
        </h1>
        <div className="actions">
          <button
            className="secondary"
            type="button"
            onClick={() => history.goBack()}
          >
            <MdArrowBack size={20} color="#fff" />
            Voltar
          </button>
          <button className="primary" type="button" onClick={handleSubmit}>
            <MdSave size={20} color="#fff" />
            Salvar
          </button>
        </div>
      </Header>

      <form>
        <input type="hidden" name="id" value={plan.id} />

        <label htmlFor="title">TÍTULO DO PLANO</label>
        <input
          name="title"
          id="title"
          value={plan.title}
          type="text"
          onChange={handleChange}
          className="col-md-12"
        />

        <div>
          <div>
            <label htmlFor="duration">DURAÇÃO (em meses)</label>
            <input
              name="duration"
              id="duration"
              value={plan.duration}
              onChange={handleChange}
              type="text"
            />
          </div>

          <div>
            <label htmlFor="price">PREÇO MENSAL</label>
            <input
              id="price"
              name="price"
              value={plan.price}
              onChange={handleChange}
              type="text"
            />
          </div>

          <div>
            <label htmlFor="amount">PREÇO TOTAL</label>
            <input
              id="amount"
              name="amount"
              type="text"
              value={priceAmount ? formatPrice(priceAmount) : 'R$00,00'}
              disabled
            />
          </div>
        </div>
      </form>
    </Container>
  );
}

PlanForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

PlanForm.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
