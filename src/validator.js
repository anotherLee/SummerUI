

class Validator {
  constructor() {}
  validate(data, rules) {
    let errors = {}
    rules.forEach(rule => {
      let value = data[rule.key]

      if (rule.required) {
        let error = this.required(value)
        if (error) {
          ensureObj(errors, rule.key)
          errors[rule.key].required = error
          return
        }
      }

      const needValidate = Object.keys(rule).filter(key => key !== 'key' && key !== 'required')

      needValidate.forEach(k => {
        if (this[k]) {
          let error = this[k](value, rule[k])
          if (error) {
            ensureObj(errors, rule.key)
            errors[rule.key][k] = error
          }
        } else {
          throw `不存在校验器：${k}`
        }
      })

    })
    return errors
  }

  required (value) {
    if (value !== 0 && !value) {
      return '必填'
    }
  }

  pattern (value, pattern) {
    if (pattern === 'email') {
      pattern = /^.+@.+$/
    }
    if (!pattern.test(value)) {
      return '格式不正确'
    }
  }

  minLength (value, minLength) {
    if (value.length < minLength) {
      return '太短'
    }
  }

  maxLength (value, maxLength) {
    if (value.length > maxLength) {
      return '太长'
    }
  }
}

Validator.add = function(name, fn) {
  Validator.prototype[name] = fn
}

export default Validator

// export default function validate(data, rules) {
//   let errors = {}
//   rules.forEach(rule => {
//     let value = data[rule.key]
//
//     if (rule.required) {
//       let error = validate.required(value)
//       if (error) {
//         ensureObj(errors, rule.key)
//         errors[rule.key].required = error
//         return
//       }
//     }
//
//     const needValidate = Object.keys(rule).filter(key => key !== 'key' && key !== 'required')
//
//     needValidate.forEach(k => {
//       if (validate[k]) {
//         let error = validate[k](value, rule[k])
//         if (error) {
//           ensureObj(errors, rule.key)
//           errors[rule.key][k] = error
//         }
//       } else {
//         throw `不存在校验器：${k}`
//       }
//     })
//
//   })
//   return errors
// }
//
// validate.required = function(value) {
//   if (value !== 0 && !value) {
//     return '必填'
//   }
// }
//
// validate.pattern = function(value, pattern) {
//   if (pattern === 'email') {
//     pattern = /^.+@.+$/
//   }
//   if (!pattern.test(value)) {
//     return '格式不正确'
//   }
// }
//
// validate.minLength = function(value, minLength) {
//   if (value.length < minLength) {
//     return '太短'
//   }
// }
//
// validate.maxLength = function(value, maxLength) {
//   if (value.length > maxLength) {
//     return '太长'
//   }
// }

function ensureObj(obj, key) {
  if (typeof obj[key] !== 'object') {
    obj[key] = {}
  }
}
