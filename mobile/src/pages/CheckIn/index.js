import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import api from '~/services/api';

import { Container, CheckInList, CheckInLog, Title, Time } from './styles';
import Button from '~/components/Button';

export default function CheckIn() {
  const [checkIns, setCheckIns] = useState([]);

  async function handleAddCheckIn() {
    const student_id = await AsyncStorage.getItem('student_id');

    const response = await api.post(`students/${student_id}/checkins`, {});
    setCheckIns([...checkIns, response.data]);
  }

  useEffect(() => {
    async function loadCheckIns() {
      const student_id = await AsyncStorage.getItem('student_id');

      const response = await api.get(`students/${student_id}/checkins`);
      setCheckIns(response.data);
    }

    loadCheckIns();
  }, []);

  return (
    <Container>
      <Button onPress={handleAddCheckIn}>Novo check-in</Button>

      <CheckInList
        data={checkIns}
        keyExtractor={(checkIn) => String(checkIn.id)}
        renderItem={({ item, index }) => (
          <CheckInLog>
            <Title>Check-in #{index + 1}</Title>
            <Time>
              {formatRelative(parseISO(item.createdAt), new Date(), {
                locale: pt,
                addSufix: true,
              })}
            </Time>
          </CheckInLog>
        )}></CheckInList>
    </Container>
  );
}
