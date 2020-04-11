import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import { MdArrowBack, MdSave } from 'react-icons/md';
import { addMonths, format, parseISO } from 'date-fns';

import Select from 'react-select';

import DatePicker, { registerLocale, setDefaultLocale } from 'react-datepicker';
import pt from 'date-fns/locale/pt-BR';

import { formatPrice } from '~/util/format';

import api from '~/services/api';
import { Container, Header } from './styles';

registerLocale('pt-BR', pt);

// import { formatPrice } from '~/util/format';

export default function EnrollmentForm({ match, history }) {
  const enrollment_id = match.params.id;

  const selectStyle = {};

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState('');
  const [student_id, setStudentId] = useState('');
  const [plan_id, setPlanId] = useState('');
  const [priceAmount, setPriceAmount] = useState('');

  const [plans, setPlans] = useState([]);
  const [students, setStudents] = useState([]);

  const [studentSelected, setStudentSelected] = useState({});

  useEffect(() => {
    async function loadEnrollment() {
      const response = await api.get(`enrollments/${enrollment_id}`);

      setStudentId(response.data.student_id);
      setPlanId(response.data.plan_id);
      setStartDate(parseISO(response.data.start_date));
    }

    async function loadStudents() {
      const response = await api.get(`students/`);

      const data = response.data.map(student => ({
        value: student.id,
        label: student.name,
      }));

      setStudents(data);
    }

    async function loadPlans() {
      const response = await api.get('plans');
      setPlans(response.data);
    }

    loadPlans();

    loadStudents();

    if (enrollment_id) {
      loadEnrollment();
    }
  }, []); //eslint-disable-line

  useEffect(() => {
    setStudentSelected(students.find(student => student.value === student_id));
  }, [student_id, students]); //eslint-disable-line

  useMemo(() => {
    const planSelected = plans.find(
      plan => Number(plan.id) === Number(plan_id)
    );

    if (planSelected && startDate) {
      setEndDate(
        format(addMonths(startDate, planSelected.duration), 'dd/MM/yyyy', {
          location: pt,
        })
      );

      setPriceAmount(planSelected.price * planSelected.duration);
    }
  }, [startDate, plan_id]); //eslint-disable-line

  async function handleSubmit() {
    try {
      const data = {
        id: enrollment_id,
        start_date: startDate,
        end_date: endDate,
        student_id,
        plan_id,
      };

      if (!enrollment_id) {
        await api.post('enrollments', data);

        toast.success('Matrícula criada com sucesso');
        return history.push('/enrollments');
      }

      await api.put(`enrollments/${enrollment_id}`, data);

      toast.success('Matrícula atualizada com sucesso');
    } catch (error) {
      toast.error('Falha ao salvar matrícula, tente novamente!');
    }
  }

  function handleStudentChange(student) {
    setStudentId(student.value);
    setStudentSelected(student);
  }

  return (
    <Container className="container">
      <Header className="header">
        <h1 className="title">
          {enrollment_id ? 'Edição de matricula' : 'Cadastro de matricula'}
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

        <label htmlFor="student_id">ALUNO</label>
        <Select
          styles={selectStyle}
          options={students}
          id="student_id"
          name="student_id"
          placeholder="Buscar aluno"
          value={studentSelected}
          onChange={handleStudentChange}
        />

        <div className="input-flex">
          <div>
            <label htmlFor="plan_id">PLANO</label>
            <select
              name="plan_id"
              id="plan_id"
              onChange={e => setPlanId(e.target.value)}
            >
              {plans.map(plan => (
                <option value={plan.id} selected={plan.id === plan_id}>
                  {plan.title}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="start_date">DATA DE INÍCIO</label>
            <DatePicker
              locale="pt-BR"
              selected={startDate}
              minDate={!enrollment_id ? new Date() : startDate}
              id="start_date"
              name="start_date"
              type="text"
              className="col-md-12"
              dateFormat="dd/MM/yyyy"
              withPortal
              value={startDate}
              onChange={date => setStartDate(date)}
            />
          </div>

          <div>
            <label htmlFor="end_date">DATA DE TERMINO</label>
            <input
              id="end_date"
              name="end_date"
              type="text"
              className="col-md-12"
              disabled
              value={endDate}
            />
          </div>

          <div>
            <label htmlFor="amount">VALOR FINAL</label>
            <input
              id="amount"
              name="amount"
              type="text"
              className="col-md-12"
              disabled
              value={formatPrice(priceAmount)}
            />
          </div>
        </div>
      </form>
    </Container>
  );
}

EnrollmentForm.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
  history: PropTypes.shape({
    goBack: PropTypes.func,
  }).isRequired,
};

EnrollmentForm.defaultProps = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
};
