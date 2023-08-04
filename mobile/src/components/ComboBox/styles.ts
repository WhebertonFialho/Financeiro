import styled, { css } from 'styled-components/native';

export const Container = styled.View`
  width: 100%;
  height: 56px;

  background-color: ${({ theme }) => theme.COLORS.GRAY_500};
  border-radius: 6px;

  flex-direction: row;
  align-items: center;
  
  margin-bottom: 2px;

`;