import {
  ax,
  React
} from './_common'

const defaults = {
  styles() {
    return []
  },
  classNames() {
    return []
  }
}

@ax.clazz({
  label: 'Render item',
  type: 'Render',
  environment: 'test', // registers and binds it
  domains: [
    // we could bind same class to multiple domains or one for each domain
    // fx Signup for
    'guest'
  ]
})
export class RenderItem {
  static oneItem(options: any) {
    let {
      classNames,
      styles,
      item
    } = options
    return <li style={styles()} className={classNames()}>{item.label}</li>
  }
}

import * as classNames from 'classnames'

const classes = {
  user(props: any): any {
    const {
      isPressed,
      isHovered
    } = props
    return classNames({
      'btn': true,
      'btn-pressed': isPressed,
      'btn-over': !isPressed && isHovered
    })
  }
}

function populateOpts(options: any) {
  let {
    classNames,
    styles,
  } = options
  styles = styles || defaults.styles
  styles = classNames || defaults.classNames
  options.styles = styles
  options.classNames = classNames
  return options
}

@ax.factory({
  name: 'ItemFactory'
  type: 'item'
})
export class RenderItemFactory {
  oneItem(options: any) {
    return function (item: any) {
      RenderItem.oneItem({ item, ...populateOpts(options) })
    }
  }
}

