import { registerParameterDecorator } from '../register-parameter-decorator'

export const gatewayBodyKey = 'body'
export const GatewayBody = registerParameterDecorator(gatewayBodyKey)
