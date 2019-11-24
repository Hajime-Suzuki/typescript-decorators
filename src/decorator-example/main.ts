import { response } from './method-decorators/response'
import { GatewayBody } from './parameter-decorators/gateway-event'
import { Params } from './parameter-decorators/path-params'
import { Query } from './parameter-decorators/query-string'

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

type Query = {
  someQuery: string
  'another-value': string
}

interface IHandler<TReturn> {
  execute(...args: any[]): Promise<TReturn>
}

class Handler implements IHandler<Result> {
  @response()
  async execute(@Params params: PathParams, @GatewayBody body: Body, @Query query: Query) {
    console.log({ [typeof body]: body })
    console.log({ params, query })

    return {
      hello: 'hello',
      body,
      params,
      query,
    }
  }
}

// if assign new Handler().execute directly, `this` would be undefined in Handler class
export const handler = new Handler().execute
