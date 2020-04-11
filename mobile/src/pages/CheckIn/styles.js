import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  margin: 20px;
`;

export const CheckInList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
})``;

export const CheckInLog = styled.View`
  padding: 15px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;

  background: #fff;
  margin-top: 10px;
  border: 1px solid #dddddd;
`;

export const Title = styled.Text`
  font-weight: bold;
  font-size: 14px;
  color: #444;
`;

export const Time = styled.Text`
  color: #666;
`;
