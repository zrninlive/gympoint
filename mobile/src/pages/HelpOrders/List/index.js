import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import {
  Container,
  HelpOrderList,
  HelpOrder,
  Header,
  Status,
  Time,
  TextHelp,
} from './styles';
import Button from '~/components/Button';

export default function List({ navigation }) {
  const [helpOrders, setHelpOrders] = useState('');

  useEffect(() => {
    async function loadHelpOrders() {
      const student_id = await AsyncStorage.getItem('student_id');

      const response = await api.get(`students/${student_id}/help-orders`);

      setHelpOrders(response.data);
    }

    loadHelpOrders();
  }, []);

  return (
    <Container>
      <Button onPress={() => navigation.navigate('New')}>
        Novo pedido de auxílio
      </Button>

      <HelpOrderList
        data={helpOrders}
        keyExtractor={(help) => String(help.id)}
        renderItem={({ item }) => (
          <HelpOrder
            onPress={() =>
              navigation.navigate('Show', {
                question: item,
              })
            }>
            <Header>
              <Status answered={!!item.answer}>
                {item.answer ? 'Respondido ' : 'Sem resposta'}
              </Status>
              <Time>
                {formatRelative(parseISO(item.createdAt), new Date(), {
                  locale: pt,
                  addSufix: true,
                })}
              </Time>
            </Header>

            <TextHelp>{item.question}</TextHelp>
          </HelpOrder>
        )}></HelpOrderList>
    </Container>
  );
}
