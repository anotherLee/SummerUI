export default function validate(data, rules) {
  let errors = {}
  rules.forEach(rule => {
    let value = data[rule.key]

    if (rule.required) {
      let error = validate.required(value)
      if (error) {
        ensureObj(errors, rule.key)
        errors[rule.key].required = error
        return
      }
    }

    if (rule.pattern) {
      let error = validate.pattern(value, rule.pattern)
      if (error) {
        ensureObj(errors, rule.key)
        errors[rule.key].pattern = error
      }
    }

    if (rule.minLength) {
      let error = validate.minLength(value, rule.minLength)
      if (error) {
        ensureObj(errors, rule.key)
        errors[rule.key].minLength = error
      }
    }

    if (rule.maxLength) {
      let error = validate.maxLength(value, rule.maxLength)
      if (error) {
        ensureObj(errors, rule.key)
        errors[rule.key].maxLength = error
      }
    }
  })
  return errors
}

validate.required = function(value) {
  if (value !== 0 && !value) {
    return '必填'
  }
}

validate.pattern = function(value, pattern) {
  if (pattern === 'email') {
    pattern = /^.+@.+$/
  }
  if (!pattern.test(value)) {
    return '格式不正确'
  }
}

validate.minLength = function(value, minLength) {
  if (value.length < minLength) {
    return '太短'
  }
}

validate.maxLength = function(value, maxLength) {
  if (value.length > maxLength) {
    return '太长'
  }
}

function ensureObj(obj, key) {
  if (typeof obj[key] !== 'object') {
    obj[key] = {}
  }
}
