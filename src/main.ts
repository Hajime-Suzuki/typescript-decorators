import { IHandler } from './BasaeHandler'
import { response } from './method-decorators/response'
import { GatewayEvent } from './parameter-decorators/gateway-event'
import { Params } from './parameter-decorators/path-params'
import { DecodedGatewayEvent } from './types'
import { Context } from 'vm'

type Result = {
  hello: string
}

type Body = {
  key1: string
  key2: string
}

type PathParams = {
  id: string
}

class Handler implements IHandler<Result> {
  @response()
  async execute(
    @GatewayEvent event: DecodedGatewayEvent<Body, 'id'>,
    context: Context,
    @Params params: PathParams,
  ) {
    console.log({ [typeof event.body]: event.body })
    console.log(params)
    return {
      hello: 'hello',
      body: event.body.key1,
      params,
    }
  }
}

// if assign new Handler().execute directly, `this` would be undefined in Handler class
export const handler = new Handler().execute
