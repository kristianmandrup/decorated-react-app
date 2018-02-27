import {
  IChecker
} from './base'

export interface IPropertyLengthChecker extends IChecker {
  checkMin(): boolean
  checkMax(): boolean
}

interface IPropertyLength extends IMinMax {
  name: string
  obj: any
  min: number
  max: number
}

export class PropertyLengthChecker implements IChecker {
  constructor(protected config: IPropertyLength) {
  }

  check(): boolean {
    const {
      obj,
      name
    } = this.config
    if (!obj[name]) return false
    return this.checkMin() && this.checkMax()
  }

  checkMin(): boolean {
    const {
      obj,
      min,
      name
    } = this.config
    return !min || obj[name] >= min
  }

  checkMax(): boolean {
    const {
      obj,
      max,
      name
    } = this.config

    return !max || obj[name] <= max
  }
}
