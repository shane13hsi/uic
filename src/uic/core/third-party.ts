import { Base, Form } from '@uic/mobx-react-form';
import { decorate, injectable } from 'inversify';

decorate(injectable(), Base);
decorate(injectable(), Form);
