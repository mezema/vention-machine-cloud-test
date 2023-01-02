(()=>{var __webpack_modules__={857:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.EnforceFileFolderNamingConVention=void 0;const path_1=(0,__webpack_require__(752).__importDefault)(__webpack_require__(17)),clipanion_1=__webpack_require__(638),utils_1=__webpack_require__(733);class EnforceFileFolderNamingConVention extends clipanion_1.Command{async execute(){const ignoredPaths=["node_modules","dist",".git",".idea",".gitkeep",".eslintrc",".cache","README","LICENSE","CONTRIBUTING","dockerfiles","Dockerfile"],capitalLetterRegex=/[A-Z]/gm,errorPathPaths=[];function validateEntryName(entry){const entryName=path_1.default.basename(entry).replace(/\.[^/.]+$/,"");entryName.length>0&&!ignoredPaths.includes(entryName)&&entryName.match(capitalLetterRegex)&&errorPathPaths.push(entry)}const folderNames=[];for await(const entry of(0,utils_1.walk)(path_1.default.join(__dirname,".."),ignoredPaths,folderNames))validateEntryName(entry);for(const folderName of folderNames)validateEntryName(folderName);if(errorPathPaths.length>0){const errorMessage=`${errorPathPaths.length} files/directories do not respect the kebab-case conVention enforced.`;console.error(errorMessage),console.error(errorPathPaths),process.exit(1)}console.info("Congratulations, all your files and directories are properly named!")}}exports.EnforceFileFolderNamingConVention=EnforceFileFolderNamingConVention,EnforceFileFolderNamingConVention.paths=[["enforce-file-folder-naming-conVention"]],EnforceFileFolderNamingConVention.usage=clipanion_1.Command.Usage({category:"enforcers",description:"This script will make sure that your folders and file use kebab-case.",examples:[["A basic example","npm run ventionMachineCloudTest-cli generate-cache-key-file"]]})},351:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.EnforceValidImportsApi=void 0;const tslib_1=__webpack_require__(752),fs_1=(0,tslib_1.__importDefault)(__webpack_require__(147)),path_1=(0,tslib_1.__importDefault)(__webpack_require__(17)),clipanion_1=__webpack_require__(638),utils_1=__webpack_require__(733);class EnforceValidImportsApi extends clipanion_1.Command{async execute(){const invalidImportRegex=/import .*ventionMachineCloudTest\/[a-zA-Z]+\//gm,fileContainingInvalidImports=[];async function validateEntryName(entry){(await fs_1.default.promises.readFile(entry,{encoding:"utf-8"})).match(invalidImportRegex)&&fileContainingInvalidImports.push(entry)}for await(const entry of(0,utils_1.walk)(path_1.default.join(__dirname,"../apps/api/src"),[]))await validateEntryName(entry);if(fileContainingInvalidImports.length>0){const errorMessage=`${fileContainingInvalidImports.length} file(s) have invalid imports. They should NOT look like this: "@ventionMachineCloudTest/models/something/entity"`;console.error(errorMessage),console.error(fileContainingInvalidImports),process.exit(1)}console.info("Congratulations, all your imports in api are valid!")}}exports.EnforceValidImportsApi=EnforceValidImportsApi,EnforceValidImportsApi.paths=[["enforce-valid-imports-api"]],EnforceValidImportsApi.usage=clipanion_1.Command.Usage({category:"enforcers",description:"This script will make sure that your imports are valid in the API. This is used to avoid import errors than can be hard to spot.",examples:[["A basic example","npm run ventionMachineCloudTest-cli enforce-valid-imports-api"]]})},744:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.GenerateCacheKeyFile=void 0;const tslib_1=__webpack_require__(752),fs_1=(0,tslib_1.__importDefault)(__webpack_require__(147)),path_1=(0,tslib_1.__importDefault)(__webpack_require__(17)),clipanion_1=__webpack_require__(638),camelCase_1=(0,tslib_1.__importDefault)(__webpack_require__(897)),capitalize_1=(0,tslib_1.__importDefault)(__webpack_require__(969)),kebabCase_1=(0,tslib_1.__importDefault)(__webpack_require__(546)),utils_1=__webpack_require__(733);class GenerateCacheKeyFile extends clipanion_1.Command{async execute(){const endpointsPath=path_1.default.join(__dirname,"../apps/webapp/src/redux/endpoints"),importStatements=[],cacheKeys=[];let cacheFileContent="/**\n * This file was automatically generated by tools/generators/generate-cache-file.js file\n */\n\nIMPORT_STATEMENTS\n\n";for await(const pathName of(0,utils_1.walk)(endpointsPath,[])){if(fs_1.default.lstatSync(pathName).isFile()&&pathName.includes("-endpoints")){const cacheKey=(0,camelCase_1.default)(path_1.default.basename(pathName,".ts").replace("-endpoints",""));cacheKeys.push(cacheKey);const endpointsSelectorRegex=/build => \(({[\s\S]+overrideExisting: false,\s+})/m,endpointSelectorRegex=/([a-z-A-Z]+): build.[qm]/gm,endpointNames=[...fs_1.default.readFileSync(pathName,{encoding:"utf8"}).match(endpointsSelectorRegex)[1].matchAll(endpointSelectorRegex)].map((entries=>[entries[1]])).flat();endpointNames.length>0&&(importStatements.push(`import { ${cacheKey}Api } from "./${(0,kebabCase_1.default)(cacheKey)}-endpoints"`),cacheFileContent+=`export const add${(0,capitalize_1.default)(cacheKey)}CacheKeys = () =>\n  ${cacheKey}Api.enhanceEndpoints({\n    endpoints: {\n${endpointNames.map((endpointName=>{const tagPropertyKey=endpointName.includes("get")?"providesTags":"invalidatesTags";return`      ${endpointName}: { ${tagPropertyKey}: ["${cacheKey}"] },`})).join("\n")}\n    },\n  })\n`)}}cacheFileContent=cacheFileContent.replace("IMPORT_STATEMENTS",importStatements.map((importStatement=>importStatement)).join("\n")),cacheFileContent+=`export const addGeneratedCacheKeys = () => {\n  ${cacheKeys.map((cacheKey=>`add${(0,capitalize_1.default)(cacheKey)}CacheKeys()`)).join("\n")}\n}\n`,fs_1.default.writeFileSync(`${endpointsPath}/generated-cache-keys.ts`,cacheFileContent,{encoding:"utf8"}),console.info(`Generated ${endpointsPath}/generated-cache-keys.ts`)}}exports.GenerateCacheKeyFile=GenerateCacheKeyFile,GenerateCacheKeyFile.paths=[["generate-cache-key-file"]],GenerateCacheKeyFile.usage=clipanion_1.Command.Usage({category:"generators",description:"This script will generate the required cache key files for your redux webapp.",examples:[["A basic example","npm run ventionMachineCloudTest-cli generate-cache-key-file"]]})},999:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.GenerateEntityIndexFile=void 0;const tslib_1=__webpack_require__(752),fs_1=(0,tslib_1.__importDefault)(__webpack_require__(147)),path_1=(0,tslib_1.__importDefault)(__webpack_require__(17)),utils_1=__webpack_require__(733),clipanion_1=__webpack_require__(638);class GenerateEntityIndexFile extends clipanion_1.Command{async execute(){const entityIndexLockFilePath=path_1.default.join(__dirname,"entity-index-hash.txt"),indexFilePath=path_1.default.join(__dirname,"../libs/models/src/index.ts"),filePathsByFolder={};for await(const entry of(0,utils_1.walk)(path_1.default.join(__dirname,"../libs/models/src/lib"),[])){const folder=entry.split("lib/")[1].split("/")[0];filePathsByFolder[folder]||(filePathsByFolder[folder]=[]),filePathsByFolder[folder].push(entry)}let indexFileContent="/**\n * This file was automatically generated by generate-entity-index.js file\n * You can disable the automatic generation by removing the prepare section of the workspace.json file under api section\n */\n\n";const sortedFolders=Object.entries(filePathsByFolder).sort().reduce(((container,[key,value])=>({...container,[key]:value})),{});for(const[folder,filePaths]of Object.entries(sortedFolders))indexFileContent+=`// ${folder}\n`,indexFileContent+=getExportLinesFromFilePaths(filePaths),indexFileContent+="\n";const entityIndexLockFileExists=fs_1.default.existsSync(entityIndexLockFilePath),existingEntityHash=parseInt(entityIndexLockFileExists?await fs_1.default.promises.readFile(entityIndexLockFilePath,{encoding:"utf8"}):""),currentHash=function(str){let i,chr,hash=0;for(i=0;i<str.length;i++)chr=str.charCodeAt(i),hash=(hash<<5)-hash+chr,hash|=0;return hash}(indexFileContent);existingEntityHash!==currentHash&&(await fs_1.default.promises.writeFile(entityIndexLockFilePath,currentHash.toString(),{encoding:"utf8"}),await fs_1.default.promises.writeFile(indexFilePath,indexFileContent,{encoding:"utf8"}),console.info("Generated index file for shared entity library"))}}function getExportLinesFromFilePaths(filePaths){return filePaths.sort().map((filePath=>`export * from "./${filePath.split("src/")[1].replace(".ts","")}"\n`)).join("")}exports.GenerateEntityIndexFile=GenerateEntityIndexFile,GenerateEntityIndexFile.paths=[["generate-entity-index-file"]],GenerateEntityIndexFile.usage=clipanion_1.Command.Usage({category:"generators",description:"This script will generate index file for the model library.",examples:[["A basic example","npm run ventionMachineCloudTest-cli generate-entity-index-file"]]})},28:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.RenameProject=void 0;const tslib_1=__webpack_require__(752),fs_1=(0,tslib_1.__importDefault)(__webpack_require__(147)),path_1=(0,tslib_1.__importDefault)(__webpack_require__(17)),clipanion_1=__webpack_require__(638),lodash_1=__webpack_require__(517),utils_1=__webpack_require__(733);class RenameProject extends clipanion_1.Command{constructor(){super(...arguments),this.organization=clipanion_1.Option.String("--organization",{required:!0}),this.project=clipanion_1.Option.String("--project",{required:!0})}async execute(){await this.renameProject()}async renameProject(){try{/^[a-zA-Z-\d_]+$/gim.test(this.organization)||(console.error("The organization name must respect this regex /^[a-zA-Z-\\d_]+$/gmi"),process.exit(1));/^[a-zA-Z-\d_]+$/gim.test(this.project)||(console.error("The project name must respect this regex /^[a-zA-Z-\\d_]+$/gmi"),process.exit(1));const databaseName=this.project.replace(/-/g,"_"),databaseFiles=["docker-compose.yml","seed-data.js","init.sql","test.ts","orm-config.ts"],camelCaseProjectName=(0,lodash_1.camelCase)(this.project),ignoredFolders=["node_modules","dist",".git",".idea",".cache"];for await(const entry of(0,utils_1.walk)(path_1.default.join(__dirname,"../"),ignoredFolders)){if((await fs_1.default.promises.lstat(entry)).isFile()){const fileContent=await fs_1.default.promises.readFile(entry,"utf-8");if(fileContent){const isDatabaseFile=databaseFiles.some((databaseFile=>entry.includes(databaseFile))),replacedFileContent=fileContent.replace(/Vention/gim,this.organization).replace(/ventionMachineCloudTest/gim,isDatabaseFile?databaseName:camelCaseProjectName);await fs_1.default.promises.writeFile(entry,replacedFileContent,"utf-8")}}}console.info("This is now YOUR project provided generously by:\n\n███████ ████████  █████  ████████  ██████  ██████ \n██         ██    ██   ██    ██    ██    ██ ██   ██ \n███████    ██    ███████    ██    ██    ██ ██████  \n     ██    ██    ██   ██    ██    ██    ██ ██   ██ \n███████    ██    ██   ██    ██     ██████  ██   ██ \n                                                   \n    ")}catch(error){console.error(error)}}}exports.RenameProject=RenameProject,RenameProject.paths=[["rename-project"]],RenameProject.usage=clipanion_1.Command.Usage({category:"getting-started",description:"This script will rename all occurrences of ventionMachineCloudTest and chocolat-chaud with your own names.",examples:[["A basic example","npm run ventionMachineCloudTest-cli rename-project --organization Vention --project ventionMachineCloudTest"]]})},733:(__unused_webpack_module,exports,__webpack_require__)=>{Object.defineProperty(exports,"__esModule",{value:!0}),exports.walk=void 0;const tslib_1=__webpack_require__(752),fs_1=(0,tslib_1.__importDefault)(__webpack_require__(147)),path_1=(0,tslib_1.__importDefault)(__webpack_require__(17));exports.walk=async function*(dir,ignoredPaths,walkedFolderNames=[]){for await(const directoryEntry of await fs_1.default.promises.opendir(dir)){const entryPath=path_1.default.join(dir,directoryEntry.name);directoryEntry.isDirectory()&&!ignoredPaths.includes(directoryEntry.name)?(walkedFolderNames.push(entryPath),yield*(0,exports.walk)(entryPath,ignoredPaths,walkedFolderNames)):directoryEntry.isFile()&&(yield entryPath)}}},638:module=>{"use strict";module.exports=require("clipanion")},517:module=>{"use strict";module.exports=require("lodash")},897:module=>{"use strict";module.exports=require("lodash/camelCase")},969:module=>{"use strict";module.exports=require("lodash/capitalize")},546:module=>{"use strict";module.exports=require("lodash/kebabCase")},752:module=>{"use strict";module.exports=require("tslib")},147:module=>{"use strict";module.exports=require("fs")},17:module=>{"use strict";module.exports=require("path")}},__webpack_module_cache__={};function __webpack_require__(moduleId){var cachedModule=__webpack_module_cache__[moduleId];if(void 0!==cachedModule)return cachedModule.exports;var module=__webpack_module_cache__[moduleId]={exports:{}};return __webpack_modules__[moduleId](module,module.exports,__webpack_require__),module.exports}var __webpack_exports__={};(()=>{var exports=__webpack_exports__;Object.defineProperty(exports,"__esModule",{value:!0});const clipanion_1=__webpack_require__(638),enforce_file_folder_naming_conVention_1=__webpack_require__(857),enforce_valid_imports_api_1=__webpack_require__(351),generate_cache_key_file_1=__webpack_require__(744),generate_entity_index_file_1=__webpack_require__(999),rename_project_1=__webpack_require__(28),[,,...args]=process.argv,cli=new clipanion_1.Cli({binaryLabel:"ventionMachineCloudTest-cli",binaryName:"npm run ventionMachineCloudTest-cli",binaryVersion:"1.0.0"});cli.register(rename_project_1.RenameProject),cli.register(generate_cache_key_file_1.GenerateCacheKeyFile),cli.register(generate_entity_index_file_1.GenerateEntityIndexFile),cli.register(enforce_valid_imports_api_1.EnforceValidImportsApi),cli.register(enforce_file_folder_naming_conVention_1.EnforceFileFolderNamingConVention),cli.register(clipanion_1.Builtins.HelpCommand),cli.runExit(args).catch(console.error)})();var __webpack_export_target__=exports;for(var i in __webpack_exports__)__webpack_export_target__[i]=__webpack_exports__[i];__webpack_exports__.__esModule&&Object.defineProperty(__webpack_export_target__,"__esModule",{value:!0})})();
//# sourceMappingURL=main.js.map