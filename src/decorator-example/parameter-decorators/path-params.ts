export const pathParamsKey = Symbol('pathParams')

export function Params(target: any, propertyName: string, parameterIndex: number) {
  const paramsWithDecodeDecorator: number[] =
    Reflect.getOwnMetadata(pathParamsKey, target, propertyName) || []

  paramsWithDecodeDecorator.push(parameterIndex)

  Reflect.defineMetadata(pathParamsKey, paramsWithDecodeDecorator, target, propertyName)
}
