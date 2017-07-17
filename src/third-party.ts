import MobxReactForm, { Base } from 'mobx-react-form';
import { decorate, injectable } from 'inversify';

decorate(injectable(), Base);
decorate(injectable(), MobxReactForm);
