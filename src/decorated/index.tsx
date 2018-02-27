// create ax configuration depending on current environment
const $ax = createAx()

$ax.prod = {
  mount({ className, method }) {
    ax.mount({ className, method })
  }
}


