import styled from 'styled-components/native';

import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  margin: 20px;
  margin-bottom: 60px;
`;

export const HelpOrderList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const HelpOrder = styled(RectButton)`
  padding: 15px;
  margin-top: 20px;
  background: #fff;
  border: 1px solid #ddd;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

export const Status = styled.Text`
  font-weight: bold;
  margin-left: 10px;
  color: ${(prop) => (prop.answered ? '#42CB59' : '#999')};
  font-size: 14px;
`;
export const Time = styled.Text`
  font-size: 14px;
`;

export const TextHelp = styled.Text`
  margin-top: 20px;
  line-height: 26px;
  color: #666;
  font-size: 14px;
`;
