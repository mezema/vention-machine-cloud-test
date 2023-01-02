import { Builtins, Cli } from "clipanion"

import { EnforceFileFolderNamingConVention } from "./commands/enforce-file-folder-naming-conVention"
import { EnforceValidImportsApi } from "./commands/enforce-valid-imports-api"
import { GenerateCacheKeyFile } from "./commands/generate-cache-key-file"
import { GenerateEntityIndexFile } from "./commands/generate-entity-index-file"
import { RenameProject } from "./commands/rename-project"

const [, , ...args] = process.argv

const cli = new Cli({
  binaryLabel: `ventionMachineCloudTest-cli`,
  binaryName: `npm run ventionMachineCloudTest-cli`,
  binaryVersion: `1.0.0`,
})

cli.register(RenameProject)
cli.register(GenerateCacheKeyFile)
cli.register(GenerateEntityIndexFile)
cli.register(EnforceValidImportsApi)
cli.register(EnforceFileFolderNamingConVention)
cli.register(Builtins.HelpCommand)
cli.runExit(args).catch(console.error)
