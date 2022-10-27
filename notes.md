# notes for creating calculator that mimics google's android calculator

- algorithm can be written to decide which bracket should be typed based on the existing expression
  - this reduces the hassle of validating expression for valid bracket usage 
  - but I am using eval() anyway which check for correct syntax
- differentiating internal expression from that shown on display
  - reduces hassle of replacing user readable functions with that of javascript ones
  - eval() cannot receive any malicious code as we are deciding what to send
  - the internal expression has to be changed according to that edited on display
- restricting keyboard usage to only certain keys
- storing history in local storage

