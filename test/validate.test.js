import validate from "../src/validator"
const expect = chai.expect

describe('validate', () => {
  it('存在', () => {
    expect(validate).to.exist
  })

  it('required true 报错', () => {
    let data = {
      email: ''
    }
    let rules = [
      { key: 'email', required: true }
    ]
    let errors = validate(data, rules)
    expect(errors.email.required).to.eq('必填')
  })

  it('required true 通过', () => {
    let data = {
      email: 0
    }
    let rules = [
      { key: 'email', required: true }
    ]
    let errors = validate(data, rules)
    expect(errors.email).not.to.exist
  })

  it('pattern 报错', () => {
    let data = {
      email: '@abc.com'
    }
    let rules = [
      { key: 'email', pattern: /^.+@.+$/ }
    ]
    let errors = validate(data, rules)
    expect(errors.email.pattern).to.eq('格式不正确')
  })

  it('pattern 报错', () => {
    let data = {
      email: '@abc.com'
    }
    let rules = [
      { key: 'email', pattern: /^.+@.+$/ }
    ]
    let errors = validate(data, rules)
    expect(errors.email.pattern).to.eq('格式不正确')
  })

  it('pattern 通过', () => {
    let data = {
      email: '1@abc.com'
    }
    let rules = [
      { key: 'email', pattern: /^.+@.+$/ }
    ]
    let errors = validate(data, rules)
    expect(errors.email).not.to.exist
  })

  it('pattern email 报错', () => {
    let data = {
      email: '@abc.com'
    }
    let rules = [
      { key: 'email', pattern: 'email' }
    ]
    let errors = validate(data, rules)
    expect(errors.email.pattern).to.eq('格式不正确')
  })

  it('pattern email 通过', () => {
    let data = {
      email: '1@abc.com'
    }
    let rules = [
      { key: 'email', pattern: 'email' }
    ]
    let errors = validate(data, rules)
    expect(errors.email).not.to.exist
  })

  it('required & pattern', () => {
    let data = {
      email: ''
    }
    let rules = [
      { key: 'email', pattern: 'email', required: true }
    ]
    let errors = validate(data, rules)
    expect(errors.email.required).to.eq('必填')
    expect(errors.email.pattern).to.not.exist
  })

  it('required & pattern', () => {
    let data = {
      email: ''
    }
    let rules = [
      { key: 'email', pattern: 'email', minLength: 6}
    ]
    let errors = validate(data, rules)
    expect(errors.email.pattern).to.eq('格式不正确')
    expect(errors.email.minLength).to.exist
  })

  it('maxLength', () => {
    let data = {
      email: '1233333333@163.com'
    }
    let rules = [
      { key: 'email', maxLength: 10}
    ]
    let errors = validate(data, rules)
    expect(errors.email.maxLength).to.eq('太长')
  })
})
