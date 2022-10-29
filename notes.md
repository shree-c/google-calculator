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

# algorithm for adding brackets

- if there is '(' as last element then add '('
  - else if num of '(' is greater than num of ')' then add ')'
  - else add '('
- always add a '(' to functions that need it
- automatically add ')' after a value is given to such functions so that answer can be shown

# types of buttons

- values
  - [x] numerical values
  - [x] math constants
- calculator operations
  - [x] backspace
  - [x] clear
  - [x] answer
- math functions
  - [ ] sin
  - [ ] con
  - [ ] tan
  - [ ] square root
  - [ ] log10
  - [ ] loge
  - [ ] factorial
   
# types of tokens

- numbers
- .
- +, -, *, /, **, %
- Math.constants (inbuilt math functions)
- f-functions (custom functions to handle math functions)

# things to be taken care of
- Math.constants are always prefixed and suffixed with '(' and ')'
- f-functions are always paired with a opening brace
