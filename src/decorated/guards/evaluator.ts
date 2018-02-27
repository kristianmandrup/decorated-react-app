import {
  autobind
} from 'core-decorators'

import {
  IChecker
} from './checkers'

import {
  Guards,
} from '.'

export class GuardEvaluator {
  $guards = new Guards()
  props: any
  guards: any

  constructor(public config: any, public target: any) {
  }

  @autobind()
  check(options: any = {}) {
    const {
      ctx
    } = options
    const {
      checkProps,
      runCustomGuards
    } = this
    this.props = delete this.config['props']
    checkProps(ctx.props)
    runCustomGuards(ctx)
  }

  @autobind()
  checkProps($props: any) {
    const { props } = this
    if (!props) return true

    const propNames = Object.keys(props)
    return !!propNames.find(key => {
      const name = props[key]
      // also allow calling custom validator function!

      const guard: IChecker | undefined = this.$guards.get(name)
      const propValue = $props[key]
      return guard ? guard.check(propValue) : true
    })
  }

  @autobind()
  runCustomGuards(options: any = {}) {
    const {
      config,
      target
    } = this
    const confKeys = Object.keys(config)
    if (!confKeys) return true
    return !!confKeys.find(key => {
      const guard: Function = this.guards.find(key)
      return guard.apply(target, options)
    })
  }
}
