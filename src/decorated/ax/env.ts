const environments: string[] = [
  'dev',
  'test',
  'stage',
  'prod'
]

// ax test environment config
const test = {
}

// ax dev environment config
const dev = {
}

const configurations = {
  test,
  dev
}

function matchingEnv(name: string): boolean {
  return !!process.env[name]
}


export function createAx(): any {
  const env: string = environments.find(matchingEnv) || 'dev'
  return configurations[env]
}
