import { registerParameterDecorator } from '../register-parameter-decorator'

export const pathParamsKey = 'pathParameters'
export const Params = registerParameterDecorator(pathParamsKey)
