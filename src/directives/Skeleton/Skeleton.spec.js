import * as Module from './Skeleton.ts'
const Skeleton = Module.SkeletonDirective

describe('Skeleton directive object', () => {
  test('has the mounted method', () => {
    expect(Skeleton.mounted).toBeDefined()
  })

  test('has the updated method', () => {
    expect(Skeleton.updated).toBeDefined()
  })

  test('has the unmounted method', () => {
    expect(Skeleton.unmounted).toBeDefined()
  })
})

describe('Skeleton mounted hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    spyOn(Module, 'applyClass')
  })

  test('calls the applyClass method if the directive value is true', () => {
    Skeleton.mounted({}, { value: true })
    expect(Module.applyClass).toHaveBeenCalled()
  })

  test('does not call the applyClass method if the directive value is false', () => {
    Skeleton.mounted({}, { value: false })
    expect(Module.applyClass).not.toHaveBeenCalled()
  })
})

describe('Skeleton updated hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    spyOn(Module, 'applyClass')
    spyOn(Module, 'removeClass')
  })

  test('calls the applyClass method if the directive value is true and was falsey previously', () => {
    Skeleton.updated({}, { value: true, oldValue: false })
    expect(Module.applyClass).toHaveBeenCalled()
  })

  test('does not call the applyClass method if the directive value is true and was true previously', () => {
    Skeleton.updated({}, { value: true, oldValue: true })
    expect(Module.applyClass).not.toHaveBeenCalled()
  })

  test('calls the removeClass method if the directive value is false and was true previously', () => {
    Skeleton.updated({}, { value: false, oldValue: true })
    expect(Module.removeClass).toHaveBeenCalled()
  })

  test('does not call the removeClass method if the directive value is false and was false previously', () => {
    Skeleton.updated({}, { value: false, oldValue: false })
    expect(Module.removeClass).not.toHaveBeenCalled()
  })
})

describe('Skeleton unmounted hook', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    spyOn(Module, 'removeClass')
  })

  test('calls the removeClass method', () => {
    Skeleton.unmounted({}, {})
    expect(Module.removeClass).toHaveBeenCalled()
  })
})
