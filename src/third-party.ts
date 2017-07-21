import MobxReactForm, { Base } from '@uic/mobx-react-form';
import { decorate, injectable } from 'inversify';

decorate(injectable(), Base);
decorate(injectable(), MobxReactForm);
