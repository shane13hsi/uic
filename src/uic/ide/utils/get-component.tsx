import { Button, Card as AntCard, Form, Input, Rate, UndefinedComponent } from '../../antd/antd';
import styled from 'styled-components';
const FormItem = Form.Item;

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
  }
`;

const map = {
  Rate,
  Card,
  Board,
  Button,
  Input,
  FormItem
};

export function getComponent(name: string) {
  if (map[name]) {
    return map[name];
  } else {
    return UndefinedComponent;
  }
}
