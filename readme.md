### Decorator example

Motivation:
With AWS Lambda, I always need to parse event.body, handle error, and format response. Normally I compose functions for that, but I don't enjoy to read it.
Here are some examples decorator examples to make these process readable. To compare decorator solutions (with classes) and functional approach, I will write a helper function to pipe all functions passed into it.

#### How to run

- `yarn install` to install all dependencies
- `yarn dev` to run serverless offline.
- ``

#### @Method Decorators

A method decorator has access to the target class, the method name and the original method. So you can do something before/after the method is executed.

#### @Parameter Decorators

A property decorator has access to target class, property name, and the decorated parameter's index.

#### Reflect Metadata

By default it's not possible to modify an argument with a parameter decorator. Because a parameter decorator doesn't know anything but the position of the parameter that it decorates. It doesn't know the actual value.
Use Reflect to register the parameter decorator's position, then retrieve that position in a method decorator.

##### Execution order:

Parameter Decorator -> Method Decorator -> Constructor

---

#### Functional Approach with pipe

Although pipes are easy to read, it's hard to keep type safety. If every function receive and return the same type, it's quite handy, but if you want to change function signature, it's less flexible.
