import { APIGatewayEvent, Context } from 'aws-lambda'

export abstract class BaseHandler<TReturn> {
  abstract execute(event: APIGatewayEvent, context: Context): Promise<TReturn>
}
