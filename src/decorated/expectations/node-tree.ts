export interface INode {
  tagName: string
  className: string
}

export interface INodeTree {
  children: INodeTree[]
  node: INode
  validator: IValidator

  traverseAndValidate(): boolean
}

export class NodeTree implements INodeTree {
  children: INodeTree[]
  node: INode
  validator: IValidator
  constructor(protected config?: any) {
    this.node = config.node
    const {
      min,
      max
    } = config
    this.validator = new LengthValidator({
      min,
      max
    })
  }

  addNode(node: INode) {
    this.node = node
  }

  traverseAndValidate(): boolean {
    return true
  }
}
