import { Context } from 'aws-lambda'
import { DecodedGatewayEvent } from './types'

export interface IHandler<TReturn> {
  execute(event: DecodedGatewayEvent<any, any>, context: Context, ...any: any[]): Promise<TReturn>
}
