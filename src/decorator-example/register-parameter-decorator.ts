export const registerParameterDecorator = (metaKey: string) => (
  target: any,
  propertyName: string,
  parameterIndex: number,
) => {
  const paramsWithDecodeDecorator: number[] =
    Reflect.getOwnMetadata(metaKey, target, propertyName) || []

  paramsWithDecodeDecorator.push(parameterIndex)

  Reflect.defineMetadata(metaKey, paramsWithDecodeDecorator, target, propertyName)
}
