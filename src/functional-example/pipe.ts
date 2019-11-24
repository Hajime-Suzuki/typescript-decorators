import { APIGatewayEvent, Context } from 'aws-lambda'

type Unpromise<T> = T extends Promise<infer U> ? U : T
type TFunc = (...args: any[]) => any

type EntryFunction = (event: APIGatewayEvent, context: Context) => any
type Chain<TPrev extends TFunc> = (arg: Unpromise<ReturnType<TPrev>>) => any

const pipeFactory = <TEntry extends TFunc>({ onError }: { onError: Function }) => <
  TFn1 extends TEntry,
  TFn2 extends Chain<TFn1>,
  TFn3 extends Chain<TFn2>,
  TFn4 extends Chain<TFn3>,
  TFn5 extends Chain<TFn4>,
  TFn6 extends Chain<TFn5>
>(
  fn1: TFn1,
  fn2: TFn2,
  fn3?: TFn3,
  fn4?: TFn4,
  fn5?: TFn5,
  fn6?: TFn6,
) => async (...args: any[]) => {
  const funcs = [fn2, fn3, fn4, fn5, fn6]
  try {
    return await funcs.reduce(async (prevResultPromise, fn) => {
      if (!fn) return prevResultPromise
      const prevResult = await prevResultPromise
      return fn(prevResult)
    }, Promise.resolve(fn1(...args)))
  } catch (error) {
    return onError(error)
  }
}

export const lambdaPipe = pipeFactory<EntryFunction>({
  onError: e => {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: e.message }),
    }
  },
})
