export const gatewayEventKey = Symbol('gatewayEvent')
export function GatewayEvent(target: any, propertyName: string, parameterIndex: number) {
  const paramsWithDecodeDecorator: number[] =
    Reflect.getOwnMetadata(gatewayEventKey, target, propertyName) || []

  paramsWithDecodeDecorator.push(parameterIndex)

  Reflect.defineMetadata(gatewayEventKey, paramsWithDecodeDecorator, target, propertyName)
}
