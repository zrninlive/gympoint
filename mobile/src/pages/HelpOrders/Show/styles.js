import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  margin: 20px;
  padding: 15px;

  background: #fff;
  border: 1px solid #ddd;
`;

export const Header = styled.View`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const Title = styled.Text`
  font-size: 14px;
  color: #444;
  font-weight: bold;
  color: ${(prop) => (prop.answered ? '#42CB59' : '#999')};
`;

export const Time = styled.Text`
  font-size: 14px;
  color: #666;
`;

export const Text = styled.Text`
  margin: 15px 0;
  color: #666;
  font-size: 14px;
  line-height: 26px;
`;
