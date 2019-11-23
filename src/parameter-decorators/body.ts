export const gatewayEventKey = Symbol('decoded')

export function gatewayEvent(target: any, propertyName: string, parameterIndex: number) {
  const paramsWithDecodeDecorator: number[] =
    Reflect.getOwnMetadata(gatewayEventKey, target, propertyName) || []

  paramsWithDecodeDecorator.push(parameterIndex)

  Reflect.defineMetadata(gatewayEventKey, paramsWithDecodeDecorator, target, propertyName)
}
