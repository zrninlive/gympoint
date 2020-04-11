import React, { useEffect, useState } from 'react';
import { Alert } from 'react-native';

import AsyncStorage from '@react-native-community/async-storage';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { Container, TextArea } from './styles';
import Button from '~/components/Button';

import api from '~/services/api';

export default function New({ navigation }) {
  const [question, setQuestion] = useState('');

  async function handleAddHelpOrder() {
    const student_id = await AsyncStorage.getItem('student_id');

    await api.post(`students/${student_id}/help-orders`, {
      question,
    });

    setQuestion('');

    Alert.alert('Pedido de ajuda enviado com sucesso!');
    navigation.navigate('List');
  }

  return (
    <Container>
      <TextArea
        textAlignVertical="top"
        editable
        multiline
        numberOfLines={15}
        placeholder="Inclua seu pedido de auxílio"
        returnKeyType="go"
        onChangeText={setQuestion}
        value={question}
      />

      <Button onPress={handleAddHelpOrder}>Enviar Pedido</Button>
    </Container>
  );
}

New.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}>
      <Icon name="arrow-back" size={22} color="#666" />
    </TouchableOpacity>
  ),
});
