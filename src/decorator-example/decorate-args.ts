import { Context } from 'vm'
import { DecodedGatewayEvent } from '../types'

export const decorateArgs = (
  target: any,
  propertyName: string,
  args: [DecodedGatewayEvent<any>, Context],
  keysToDecorate: string[],
) => {
  /**
   * @description: get positions of decorated arguments, pass specific values to the position
   *
   * example: get `headers`. methodA(@headers headers, otherValue, anotherValue)
   * position of @headers is 0. extract headers from event and pass it to the first position of args
   */
  const getArgMapFromEvent = argMapGetterFromEvent(target, propertyName, args[0])
  const argMaps = keysToDecorate.map(getArgMapFromEvent)

  // pass decorated args to specific position
  argMaps.forEach(({ index, value }) => {
    if (index !== undefined) args[index] = value
  })
}

const argMapGetterFromEvent = (
  target: any,
  propertyName: string,
  event: DecodedGatewayEvent<any>,
) => (keyToDecorate: keyof DecodedGatewayEvent<any>) => {
  /**
   * @description: get position of meta key, and extract corresponding value from event object
   */

  const indexes: number[] | undefined = Reflect.getOwnMetadata(keyToDecorate, target, propertyName)
  return {
    index: indexes?.[0], // by [0], assume there are no 2 decorators with the same name in the parameters
    value: event[keyToDecorate],
  }
}
