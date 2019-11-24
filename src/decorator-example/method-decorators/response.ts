import { APIGatewayEvent, Context } from 'aws-lambda'
import 'reflect-metadata'
import { decorateArgs } from '../get-meta-key'
import { gatewayBodyKey } from '../parameter-decorators/gateway-event'
import { pathParamsKey } from '../parameter-decorators/path-params'
import { queryParamsKey } from '../parameter-decorators/query-string'

export function response(status = 200) {
  return function(target: any, methodName: string, propertyDescriptor: PropertyDescriptor) {
    const originalMethod = propertyDescriptor.value

    const decoratedMethod = async function(this: any, ...args: [APIGatewayEvent, Context]) {
      const copiedArgs: any = deepCopy(args)

      decodeBody(copiedArgs)
      const decoratedKeys = [gatewayBodyKey, pathParamsKey, queryParamsKey]
      decorateArgs(target, methodName, copiedArgs, decoratedKeys)
      try {
        const res = await originalMethod.apply(this, copiedArgs)
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

const deepCopy = (data: any) => {
  return JSON.parse(JSON.stringify(data))
}

const decodeBody = ([event]: [APIGatewayEvent, Context]) => {
  event.body = event.body ? JSON.parse(event.body) : null
}
