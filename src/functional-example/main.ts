import { APIGatewayEvent, Context } from 'aws-lambda'
import axios from 'axios'
import { lambdaPipe } from './pipe'
import { DecodedGatewayEvent } from '../types'

const decode = (event: APIGatewayEvent, context: Context) => {
  event.body = (event.body && JSON.parse(event.body)) || null
  return [(event as any) as DecodedGatewayEvent<Body>, context]
}

const extractBody = ([event, context]: [DecodedGatewayEvent<Body>, Context]) => {
  return [event.body, context]
}

const log = (args: [Body, Context]) => {
  console.log('log: ', args[0])
  return args
}

const main = async ([body]: [Body, Context]) => {
  const { data } = await axios.get('https://jsonplaceholder.typicode.com/todos/1')

  return { data, body }
}

const success = data => {
  return {
    statusCode: 200,
    body: JSON.stringify(data),
  }
}

export const handler = lambdaPipe(decode, extractBody, log, main, success)
