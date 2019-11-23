import { gatewayEventKey } from '../parameter-decorators/gateway-event'
import { APIGatewayEvent } from 'aws-lambda'
import 'reflect-metadata'
import { pathParamsKey } from '../parameter-decorators/path-params'

// this could be done in BaseHandler class

export function response(status = 200) {
  return function(target: any, propertyName: string, propertyDescriptor: PropertyDescriptor) {
    const originalMethod = propertyDescriptor.value

    const decoratedMethod = async function(this: any, ...args: any[]) {
      const decoratedArgs = decorateArgs(target, propertyName, args)
      try {
        const res = await originalMethod.apply(this, decoratedArgs)
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

const decorateArgs = (target: any, propertyName: string, args: any) => {
  const gatewayEventIndexes: number[] = Reflect.getOwnMetadata(
    gatewayEventKey,
    target,
    propertyName,
  )

  const pathParamsIndexes: number[] = Reflect.getOwnMetadata(pathParamsKey, target, propertyName)

  const event = args[gatewayEventIndexes[0]] // assume there is only one @gatewayEvent decorator in params

  event.body = decodeGatewayBody(event)
  args[pathParamsIndexes[0]] = getPathParams(event) // also assume there is only one @pathParams decorator in params

  return args
}

const decodeGatewayBody = (event: APIGatewayEvent) => {
  return event.body ? JSON.parse(event.body) : event.body
}

const getPathParams = (event: APIGatewayEvent) => {
  return event.pathParameters
}
