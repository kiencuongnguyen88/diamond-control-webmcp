import {rmSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

function runTsc(project){
  const tscEntry=resolve('node_modules/typescript/bin/tsc');
  return spawnSync(process.execPath,[tscEntry,'-p',project],{stdio:'inherit'});
}

rmSync('dist-test',{recursive:true,force:true});
const r=runTsc('tsconfig.test.json');
if(r.error){console.error(r.error);process.exit(1)}
process.exit(r.status??1);
