import { Container } from 'inversify';
import 'reflect-metadata';
import { makeProvideDecorator } from 'inversify-binding-decorators';
import getDecorators from 'inversify-inject-decorators';
import './third-party';

export let container = new Container({ defaultScope: "Singleton" });
export let provide = makeProvideDecorator(container);
export let { lazyInject } = getDecorators(container);
