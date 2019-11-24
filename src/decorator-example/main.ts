import { Context } from 'vm'
import { DecodedGatewayEvent } from '../types'
import { response } from './method-decorators/response'
import { GatewayEvent } from './parameter-decorators/gateway-event'
import { Params } from './parameter-decorators/path-params'

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

interface IHandler<TReturn> {
  execute(event: DecodedGatewayEvent<any, any>, context: Context, ...any: any[]): Promise<TReturn>
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
