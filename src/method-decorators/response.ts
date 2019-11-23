import { gatewayEventKey } from '../parameter-decorators/body'
import { APIGatewayEvent } from 'aws-lambda'

// this could be done in BaseHandler class

export function response(status = 200) {
  return function(target: any, propertyName: string, propertyDescriptor: PropertyDescriptor) {
    const originalMethod = propertyDescriptor.value

    const decoratedMethod = async function(this: any, ...args: any[]) {
      decodeGatewayBody(target, propertyName, args)

      try {
        const res = await originalMethod.apply(this, args)
        return {
          statusCode: status,
          body: JSON.stringify(res),
        }
      } catch (error) {
        return {
          statusCode: error.status || 500,
          body: JSON.stringify({ error: error.message }),
        }
      }
    }

    propertyDescriptor.value = decoratedMethod
  }
}

const decodeGatewayBody = (target: any, propertyName: string, args: any) => {
  const decodeEventParams: number[] = Reflect.getOwnMetadata(gatewayEventKey, target, propertyName)

  if (decodeEventParams) {
    decodeEventParams.forEach(i => {
      const event: APIGatewayEvent = args[i]
      event.body = event.body ? JSON.parse(event.body) : event.body
    })
  }
}
