import { APIGatewayEvent, Context } from 'aws-lambda'

export interface IHandler<TReturn> {
  execute(event: APIGatewayEvent, context: Context): Promise<TReturn>
}
