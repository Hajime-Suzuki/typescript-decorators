import { Context } from 'vm'
import { DecodedGatewayEvent } from '../types'

export const decorateArgs = (
  target: any,
  propertyName: string,
  args: [DecodedGatewayEvent<any>, Context],
  metaKeys: string[],
) => {
  /**
   * @description: get positions of decorated arguments, pass specific values to the position
   *
   * example: get `headers`. fn(@headers headers, otherValue, anotherValue)
   * position of @headers is 0. extract headers from event and pass it to the first position of args
   */

  const getArgMap = argMapGetter(target, propertyName, args)
  const argMaps = metaKeys.map(key => getArgMap(key))
  argMaps.forEach(({ index, value }) => (args[index] = value))
}

const argMapGetter = (target: any, propertyName: string, args: any) => (metaKey: string) => {
  /**
   * @description: get position of meta key, and extract corresponding value from event object
   */
  const indexes: number[] = Reflect.getOwnMetadata(metaKey, target, propertyName)
  const event = args[0]
  return {
    index: indexes[0], // assume there are no 2 decorators with the same name in the parameters
    value: event[metaKey],
  }
}
