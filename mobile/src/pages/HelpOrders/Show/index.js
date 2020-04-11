import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt-BR';

import { Container, Header, Title, Time, Text } from './styles';

export default function Show({ navigation }) {
  const helpOrder = navigation.getParam('question');

  return (
    <Container>
      <Header>
        <Title>Pergunta</Title>
        <Time>
          {formatRelative(parseISO(helpOrder.createdAt), new Date(), {
            locale: pt,
            addSufix: true,
          })}
        </Time>
      </Header>

      <Text>{helpOrder.question}</Text>

      {helpOrder.answer_at && (
        <>
          <Header>
            <Title answered={true}>Resposta</Title>
            <Time>
              {formatRelative(parseISO(helpOrder.answer_at), new Date(), {
                locale: pt,
                addSufix: true,
              })}
            </Time>
          </Header>

          <Text>{helpOrder.answer}</Text>
        </>
      )}
    </Container>
  );
}

Show.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="arrow-back" size={22} color="#666" />
    </TouchableOpacity>
  ),
});
