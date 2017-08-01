import { Button, Card as AntCard, Rate, UndefinedComponent } from '../antd/antd';
import styled from 'styled-components';

const Card = styled(AntCard)`// styled
  & {
    .ant-card-body {
      padding: 0;
    }
  }
`;

const Board = styled.div`// styled
  & {
    height: 100%;
    background-color: #fefefe;
  }
`;

const map = {
  Rate,
  Card,
  Board,
  Button
};

export function getComponent(name: string) {
  if (map[name]) {
    return map[name];
  } else {
    return UndefinedComponent;
  }
}
