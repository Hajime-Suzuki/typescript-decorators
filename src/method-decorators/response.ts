// this could be done in BaseHandle
export function response(status = 200) {
  return function(_, __, propertyDescriptor: PropertyDescriptor) {
    const originalMethod = propertyDescriptor.value

    const decoratedMethod = async function(this: any, ...args: any[]) {
      const res = await originalMethod.apply(this, args)

      return {
        statusCode: status,
        body: JSON.stringify(res),
      }
    }

    propertyDescriptor.value = decoratedMethod

    return propertyDescriptor
  }
}
