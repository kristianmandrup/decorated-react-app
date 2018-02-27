interface ILookup {
  className: string,
  domain?: string
}

interface IBindConfig {
  name: string,
  domain?: string,
  clazz: any
}

class EnvContainer {
  bindings = new Map<string, any>()
  domainMap = new Map<string, any>()

  bind(config: IBindConfig) {
    const {
      name,
      domain,
      clazz
    } = config
    if (domain) {
      const domainBindings = this.resolveDomain(domain)
      return domainBindings.set(name, clazz)
    }
    return this.bindings.set(name, clazz)
  }


  resolveDomain(domain: string) {
    return this.domainMap.get(domain)
  }

  // we could also check/match on domain
  lookupAndResolve(config: ILookup) {
    const {
      className,
      domain
    } = config
    if (domain) {
      const domainBindings = this.resolveDomain(domain)
      return domainBindings.get(className)
    }
    return this.bindings.get(className)
  }
}

interface IMountConfig {
  className: string
  method: string
  env?: string
}

export class ContainerMap {
  envs = new Map<string, EnvContainer>()

  forEnvironment(env) {
    return this.envs[env]
  }
}

