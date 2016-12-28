/* @flow */

import Type from './Type';
import type {Constructor} from './';
import type Validation, {IdentifierPath} from '../Validation';

import TypeParameterApplication from './TypeParameterApplication';

export default class TypeReference<T> extends Type {
  typeName: string = 'TypeReference';
  name: string;

  get type (): Type<T> {
    const {context, name} = this;
    const type = context.get(name);
    if (!type) {
      throw new ReferenceError(`Cannot resolve type: ${name}`);
    }
    return type;
  }

  collectErrors (validation: Validation<any>, path: IdentifierPath, input: any): boolean {
    return this.type.collectErrors(validation, path, input);
  }

  accepts (input: any): boolean {
    return this.type.accepts(input);
  }

  acceptsType (input: Type<any>): boolean {
    return this.type.acceptsType(input);
  }

  apply <X> (...typeInstances: Type<X>[]): TypeParameterApplication<T> {
    const target = new TypeParameterApplication(this.context);
    target.parent = this;
    target.typeInstances = typeInstances;
    return target;
  }

  makeErrorMessage (): string {
    return `Invalid value for type: ${this.name}.`;
  }

  /**
   * Get the inner type or value.
   */
  unwrap (): Type<T> | Constructor {
    return this.type.unwrap();
  }

  toString (): string {
    return this.name;
  }

  toJSON () {
    return {
      typeName: this.typeName,
      name: this.name
    };
  }
}
