import React, { useState } from 'react';
import { Image, Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

import logo from '~/assets/logo.png';
import api from '~/services/api';

import { Container, Form, FormInput, SubmitButton } from './styles';

export default function SignIn({ navigation }) {
  const [id, setId] = useState('');

  async function handleSubmit() {
    try {
      const response = await api.post('session/students', {
        id,
      });

      await AsyncStorage.setItem('student_id', String(response.data.id));
      navigation.navigate('CheckIns');
    } catch (error) {
      Alert.alert('Invalid ID, Try again!');
    }
  }

  return (
    <Container>
      <Image source={logo} />
      <Form>
        <FormInput
          onChangeText={setId}
          value={id}
          onSubmitEditing={handleSubmit}
          placeholder="Informe seu ID de cadastro"
        />
        <SubmitButton onPress={handleSubmit}>Acessar o sistema</SubmitButton>
      </Form>
    </Container>
  );
}
