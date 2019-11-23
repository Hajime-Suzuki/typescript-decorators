import { APIGatewayEvent } from 'aws-lambda'
import 'reflect-metadata'
import { IHandler } from './BasaeHandler'
import { response } from './method-decorators/response'
import { gatewayEvent } from './parameter-decorators/body'

type Result = {
  hello: string
}

class Handler implements IHandler<Result> {
  @response()
  async execute(@gatewayEvent event: APIGatewayEvent, _) {
    console.log({ [typeof event.body]: event.body })

    return {
      hello: 'hello',
      something: 'test',
    }
  }
}

// if assign new Handler().execute directly, `this` would be undefined in Handler class
export const handler = new Handler().execute
