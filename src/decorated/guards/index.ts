import {
  ax
} from '../ax'

import {
  ILengthChecker,
  LengthChecker,
  IMinMax,
  IChecker
} from './checkers'

export class Guards {
  map = new Map<string, IChecker>()

  contructor() {
    this.map.set('one', new LengthChecker({ max: 1 }))
    this.map.set('many', new LengthChecker({ min: 2 }))
  }

  createLengthChecker(options: IMinMax): ILengthChecker {
    return new LengthChecker(options)
  }

  get(name: string): IChecker | undefined {
    return this.map.get(name)
  }

  notFound(name: string) {
    throw new Error('no checker found')
  }
}

export class CustomGuards {
  // registers guard for reuse
  @ax.guard({
    name: 'onlyOnXmas',
    label: 'only on Xmas',
  })
  xmas() {
    return false
  }
}
