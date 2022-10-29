export const TM = {
  '％': '%',
  '×': '*',
  '+': '+',
  '-': '-',
  '^': '**',
  '÷': '/',
}

export const fc = {
  fsin: function (val) {
    return Math.sin(val)
  },
  fcos: function (val) {
    return Math.cos(val)
  },
  ftan: function (val) {
    return Math.cos(val)
  },
  flog: function (val) {
    return Math.log10(val)
  },
  fln: function (val) {
    return Math.log(val)
  },
  fasin: function (val) {
    return Math.asin(val)
  },
  facos: function (val) {
    return Math.acos(val)
  },
  fatan: function (val) {
    return Math.atan(val)
  },
  fsqrt: function (val) {
    return Math.sqrt(val)
  },
  fraise2: function (val) {
    return val ** 2
  },
  fraise10: function (val) {
    return val ** 10
  }
}
export const FUNS = {
  'sin': 'fc.fsin',
  'cos': 'fc.fcos',
  'tan': 'fc.ftan',
  'ln': 'fc.fln',
  'log': 'fc.flog',
}

export const ERASEVALS = {
  'fc.fsin': 3,
  'fc.fcos': 3,
  'fc.ftan': 3,
  'fc.fln': 2,
  'fc.flog': 3,
  'Math.E': 1,
  'Math.PI': 1
}
