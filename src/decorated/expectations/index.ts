import {
  NodeTree
} from './node-tree'

// expectation must return a class that can be used to resolve render expectation
// the class must be configurable from the test, able to pass in either of the following
// - methods to find node by class
// - methods to find node by tag


function parseEmmetNode(node: string): any {
  const [tag, counter] = node.split('*')
  const [tagName, className] = (tag || node).split('.')
  return {
    tagName,
    className,
    counter
  }
}

function parseEmmet(emmet: string) {
  const levels = emmet.split('>')
  const root = levels[0]
  const node = parseEmmetNode(root)
  const tree = new NodeTree({ min: 1, node })
  levels.slice(0).map(lv => {
    const node = parseEmmetNode(root)
    tree.addNode(node)
  })
}

class ExpectationRegistry {
  register(config: any) {

  }
}

const expectationRegistry = new ExpectationRegistry()

export function registerExpectation(renderExpectation: string, target: any, methodName: string) {
  const expectation = parseEmmet(renderExpectation)
  expectationRegistry.register({ target, methodName, expectation })
}
