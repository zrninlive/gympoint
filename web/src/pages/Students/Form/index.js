import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { toast } from 'react-toastify';

import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import history from '~/services/history';
import api from '~/services/api';
import { parseISOtoDate, parseDateToIso } from '~/util/format';
import { Container, Header } from './styles';

export default function StudentForm({ match }) {
  const student_id = match.params.id;

  const [id, setId] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [birthDatePretty, setBirthDatePretty] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  useEffect(() => {
    async function loadStudent() {
      const response = await api.get(`students/${student_id}`);

      const { data } = response;

      // setStudent({
      //   ...data,
      //   birth_date_pretty: ,
      // });

      setId(data.id);
      setName(data.name);
      setEmail(data.email);
      setBirthDatePretty(parseISOtoDate(data.birth_date));
      setWeight(data.weight);
      setHeight(data.height);
    }

    if (student_id) {
      loadStudent();
    }
  }, []); //eslint-disable-line

  async function handleSubmit() {
    const student = {
      id,
      name,
      email,
      height,
      weight,
      birth_date: parseDateToIso(birthDatePretty),
    };

    try {
      if (student.id) {
        await api.put(`students/${student.id}`, student);
        toast.info('Dados atualizados com sucesso!');
        return;
      }

      await api.post(`students`, student);
      toast.info('Dados cadastrados com sucesso!');
      history.push('/students');
    } catch (error) {
      toast.error('Falha ao atualizar os dados, tente novamente!');
    }
  }

  return (
    <Container className="container">
      <Header className="header">
        <h1 className="title">
          {student_id ? 'Edição do aluno' : 'Cadastro do aluno'}
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

      <form onSubmit={handleSubmit}>
        <input type="hidden" name="id" />

        <label htmlFor="name">NOME COMPLETO</label>
        <input
          name="name"
          id="name"
          type="text"
          className="col-md-12"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <label htmlFor="email">ENDEREÇO DE E-MAIL</label>
        <input
          id="email"
          name="email"
          type="email"
          className="col-md-12"
          placeholder="exemplo@email.com"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <div>
          <div>
            <label htmlFor="birth_date">DATA DE NASCIMENTO</label>
            <input
              id="birth_date"
              name="birth_date_pretty"
              value={birthDatePretty}
              type="text"
              onChange={e => setBirthDatePretty(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="weight">PESO (em kg)</label>
            <input
              id="weight"
              name="weight"
              type="text"
              value={weight}
              onChange={e => setWeight(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor="height">ALTURA</label>
            <input
              id="height"
              name="height"
              type="text"
              value={height}
              onChange={e => setHeight(e.target.value)}
            />
          </div>
        </div>
      </form>
    </Container>
  );
}

StudentForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

StudentForm.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
