import { registerParameterDecorator } from '../register-parameter-decorator'

export const queryParamsKey = 'queryStringParameters'
export const Query = registerParameterDecorator(queryParamsKey)
