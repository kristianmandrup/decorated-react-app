import {
  ax,
  React
} from './_common'

@ax.clazz({
  label: 'Render list',
  type: 'Render',
  item: {
    factory: 'ItemFactory'
  },
  list: {
    prop: 'items',
    class: 'user'
  }
})
export class RenderList {
  @ax.render({
    type: 'many',
    expect: 'ul>li*items' // default
  })
  many(options: any = {}) {
    const {
      ctx
    } = options
    const {
      oneItem
    } = this
    return (<ul>
      {ctx.items.map(oneItem)}
    </ul>
    )
  }

  @ax.render({
    // or uses item factory as defined for class
    // item: {
    //   factory: 'ItemFactory'
    // }
  })
  oneItem() {
  }

  @ax.render({
    type: 'one',
    expect: 'div.item> $item.label'
  })
  one(options: any = {}) {
    const {
      ctx
    } = options
    return (
      <div className="item">{ctx.item.label}</div>
    )
  }

  @ax.render({
    type: 'empty',
    expect: '!ul'
  })
  empty() {
    return (<div>No items found</div>
    )
  }

  @ax.or([
    'many',
    'one',
    'empty' // default
  ])
  render() {
  }
}
