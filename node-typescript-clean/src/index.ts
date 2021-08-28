import yargs from 'yargs'
import { $ } from 'zx'

interface Arguments {
  exampleArgument: string | undefined
}

const parseArguments = async (): Promise<Arguments> => {
  return yargs(process.argv.slice(2)).options({
    exampleArgument: { type: 'string', demandOption: false },
  }).argv
}

const start = async () => {
  // https://github.com/yargs/yargs
  const args = await parseArguments()
  console.log('Arguments given', args)

  // https://github.com/google/zx
  // print out the version from package.json
  await $`cat ./package.json | grep -m 1 version | sed 's/[^0-9.]//g'`
}

start()
