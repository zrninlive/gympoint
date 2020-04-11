import React from 'react';
import { Container, Text } from './styles';

export default function Button({ children, loading, onPress, ...rest }) {
  return (
    <Container onPress={onPress}>
      <Text>{children}</Text>
    </Container>
  );
}
