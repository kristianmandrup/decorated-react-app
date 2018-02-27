import {
  PropertyLengthChecker,
  IPropertyLengthChecker
} from './prop-checker'

import {
  IChecker
} from './base'

export interface IMinMax {
  min?: number
  max?: number
}

export interface ILengthChecker extends IChecker {

}

export class LengthChecker implements IChecker {
  min = 0
  max = 9999

  propNames = [
    'length',
    'size',
    'count'
  ]

  constructor(config: IMinMax) {
    this.min = config.min || this.min
    this.max = config.max || this.max
  }

  protected createLengthChecker(config: any): IPropertyLengthChecker {
    return new PropertyLengthChecker(config)
  }

  check(obj: any): boolean {
    const {
      propNames,
      min,
      max,
      createLengthChecker
    } = this
    return !!propNames.find(name => {
      const config = {
        min,
        max,
        obj,
        name
      }
      return createLengthChecker(config).check()
    })
  }
}
