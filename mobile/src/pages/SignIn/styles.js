import { Platform } from 'react-native';
import styled from 'styled-components/native';

import Button from '~/components/Button';

export const Container = styled.KeyboardAvoidingView.attrs({
  enabled: Platform.OS === 'ios',
  behavior: 'padding',
})`
  flex: 1;
  padding: 0 30px;

  align-items: center;
  justify-content: center;
`;

export const Form = styled.View`
  align-self: stretch;
`;

export const FormInput = styled.TextInput.attrs({
  placeholderTextColor: '#aaa',
})`
  padding: 10px;
  margin: 10px 0;

  border: 1px solid #ddd;

  font-size: 16px;
`;

export const SubmitButton = styled(Button)`
  margin-top: 10px;
`;
