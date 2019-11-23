### Decorator example

Motivation:
With AWS Lambda, I always need to parse event.body, handle error, and format response. Normally I compose functions for that, but I don't enjoy to read it.
Here are some examples decorator examples to make these process readable. To compare decorator solutions (with classes) and functional approach, I will write a helper function to pipe all functions passed into it.
