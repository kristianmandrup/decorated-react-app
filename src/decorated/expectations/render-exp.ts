import {
  INodeTree
} from './node-tree'

interface IRenderExpectation {
  expect(): boolean
}

export class RenderExpectation implements IRenderExpectation {
  findByTag: (tag: string) => any
  findByClass: (clazz: string) => any

  tree: INodeTree

  buildTree(expectation: string) {
    //    expectation.
  }

  expect(): boolean {
    return this.tree.traverseAndValidate()
  }
}
