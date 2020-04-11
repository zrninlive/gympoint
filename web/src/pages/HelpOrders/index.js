import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import { toast } from 'react-toastify';
import api from '~/services/api';
import { Container, Header, Table, ModalAnswer } from './styles';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    background: '#1f1e1eb3',
  },
};

Modal.setAppElement('#root');

export default function HelpOrders() {
  const [modalOpen, setModalOpen] = useState(false);
  const [helpOrders, setHelpOrders] = useState([]);
  const [helpOrder, setHelpOrder] = useState({});

  useEffect(() => {
    async function loadHelpOrders() {
      const response = await api.get('help-orders');
      setHelpOrders(response.data);
    }

    loadHelpOrders();
  }, []);

  function toggleModal(helpOrder = null) {
    if (helpOrder) {
      setHelpOrder(helpOrder);
    }

    setModalOpen(!modalOpen);
  }

  async function handleAnswer() {
    try {
      await api.post(`help-orders/${helpOrder.id}/answer`, {
        ...helpOrder,
        answer_at: new Date(),
      });

      toggleModal();
      toast.success('Pedido de auxílio respondido com sucesso!');

      setHelpOrders(helpOrders.filter(help => help.id !== helpOrder.id));
    } catch (error) {
      toast.error('Falha ao enviar resposta, tente novamente!');
    }
  }

  return (
    <Container className="container">
      <Header className="header">
        <h1 className="title">Pedidos de auxílio</h1>
      </Header>

      <Modal
        isOpen={modalOpen}
        // onAfterOpen={afterOpenModal}
        onRequestClose={toggleModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <ModalAnswer>
          <h2>Pergunta do aluno</h2>
          <p>{helpOrder.question}</p>

          <h2>Sua resposta</h2>
          <textarea
            name="answer"
            placeholder="exemplo@email.com"
            cols="30"
            rows="10"
            onChange={e =>
              setHelpOrder({ ...helpOrder, answer: e.target.value })
            }
          />
          <button type="button" className="primary" onClick={handleAnswer}>
            Responder aluno
          </button>
        </ModalAnswer>
      </Modal>

      <Table className="table">
        <thead>
          <tr>
            <th width="20%">Aluno</th>
            <th width="70%">Pergunta</th>
            <th width="10%" />
          </tr>
        </thead>
        <tbody>
          {helpOrders.map(help => (
            <tr key={help.id}>
              <td width="20%">{help.student.name}</td>
              <td width="70%">{help.question}</td>
              <td width="10%">
                <div>
                  <button
                    onClick={() => toggleModal(help)}
                    type="button"
                    className="edit"
                  >
                    Responder
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
