import {
  ax
} from '../ax'

@ax.clazz({
  label: 'Application Home',
  type: 'Component',
  environment: 'test', // registers and binds it
  domains: [
    // we could bind same class to multiple domains or one for each domain
    // fx Signup for
    'guest',
    'user'
  ]
})
export class AppHome {
  @ax.fun({
    label: 'Validate name',
    type: 'validator',
    mount: {
      className: 'Validators',
      method: 'validateName'
    }
  })
  validateName() {
  }

  @ax.mount({
    className: 'RenderList',
    method: 'renderOne'
  })
  @ax.render({

  })
  render() {
  }
}
