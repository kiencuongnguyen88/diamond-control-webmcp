import {cpSync,mkdirSync,rmSync} from 'node:fs';
import {resolve} from 'node:path';
import {spawnSync} from 'node:child_process';

function runTsc(project){
  const tscEntry=resolve('node_modules/typescript/bin/tsc');
  return spawnSync(process.execPath,[tscEntry,'-p',project],{stdio:'inherit'});
}

rmSync('dist',{recursive:true,force:true});
mkdirSync('dist/assets',{recursive:true});
const r=runTsc('tsconfig.build.json');
if(r.error){console.error(r.error);process.exit(1)}
if(r.status!==0)process.exit(r.status??1);
cpSync('index.html','dist/index.html');
cpSync('src/styles.css','dist/assets/styles.css');
cpSync('LICENSE','dist/LICENSE');
console.log('BUILD_OK');
