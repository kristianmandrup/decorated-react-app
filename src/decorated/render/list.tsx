import {
  ax,
  React
} from './_common'

@ax.clazz({
  label: 'Render list',
  type: 'Render',
  environment: 'test', // registers and binds it
  domains: [
    // we could bind same class to multiple domains or one for each domain
    // fx Signup for
    'guest'
  ]
})
export class RenderList {
  @ax.guardWith({
    props: {
      items: 'many'
    },
    'onlyOnXmas': true
  })
  // note: a render method should only take primitive types and Arrays
  @ax.expect({
    render: 'ul>li*items'
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

  @ax.guard({
    props: {
      items: 'one'
    }
  })
  @ax.expect({
    // could also be used to generate render code
    render: 'div.item> $item.label'
  })
  one(options: any = {}) {
    const {
      ctx
    } = options
    return (
      <div className="item">{ctx.item.label}</div>
    )
  }

  // use expectations as decorators directly on functions
  // much more convenient and logical place
  // then we can have the test generator (or tests) use this info to generate tests
  @ax.expect({
    render: '!ul'
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
