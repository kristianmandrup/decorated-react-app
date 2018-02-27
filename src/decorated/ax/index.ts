import {
  ContainerMap
} from '../container'

export class Ax {
  // lazyInject
  container = new ContainerMap()

  render(config: any): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
      // register validator function
      return descriptor
    }
  }

  validator(): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): any {
      // register validator function
      return descriptor
    }
  }

  expect(config: any): Function {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
      // register expectations function
      const {
        render
      } = config

      // registerExpectation(render)

      return descriptor
    }
  }

  or(functionNames: string[]) {
    function createOrHandler(target: any, fname: string) {
      return function orCall() {
        const fun: Function = target[fname] //.bind(target)
        if (!fun) {
          const clazzName = target.constructor.name
          throw new Error(`@ax.or missing method ${fname} in class ${clazzName}`)
        }
        // keep going for each value that is true (ie. will return false)
        // return for first value that is false (ie. will return true)
        return !fun.call(target, arguments)
      }
    }


    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
      descriptor.value = function () {
        functionNames.find(function (fname: string) {
          return createOrHandler(target, fname)()
        })
      }
      return descriptor
    }
  }

  // register guard for reuse
  guard(config: any): Function {
  }

  // apply one or more guards
  guardWith(config: any): Function {
    const {
      props,
    } = config
    const guardEval = new GuardEvaluator(config)
    return function (target, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
      const original = descriptor.value
      descriptor.value = function ({ ctx }) {
        guardEval.evaluate()
        original.apply(original, { ctx: target, ...arguments })
      };
      return descriptor
    }
  }

  mount(config: IMountConfig): Function {
    const {
      method,
      env,
      className
    } = config
    return function (target, propertyKey: string, descriptor: PropertyDescriptor): PropertyDescriptor {
      const clazz = this.container.forEnvironment(env).lookupAndResolve(className)
      const delegate = clazz.prototype[method]
      descriptor.value = function (...args) {
        delegate.apply(delegate, { ctx: target, ...args })
      };

      return descriptor;
    }
  }

  clazz(config = {}): Function {
    return function (target: any) {
      return target
    }
  }

  // higher order decorator
  fun(config = {}) {
    return function (target, propertyKey: string, descriptor: PropertyDescriptor): any {
      // register render function
      return descriptor
    }
  }
}

export const ax = new Ax()
