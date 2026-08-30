import http from 'node:http'
import { readFileSync, statSync } from 'node:fs'
import { extname, join, normalize, relative, isAbsolute } from 'node:path'
import { fileURLToPath } from 'node:url'
const root=fileURLToPath(new URL('../dist/',import.meta.url))
const port=Number(process.env.PORT||4173)
const types={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.txt':'text/plain; charset=utf-8'}
http.createServer((req,res)=>{try{const raw=(req.url||'/').split('?')[0];const rel=raw==='/'?'index.html':raw.replace(/^\/+/, '');const path=normalize(join(root,rel));const outside=relative(root,path);if(outside.startsWith('..')||isAbsolute(outside))throw new Error('bad path');if(!statSync(path).isFile())throw new Error('not file');res.writeHead(200,{'content-type':types[extname(path)]||'application/octet-stream','cache-control':'no-store'});res.end(readFileSync(path))}catch{res.writeHead(404,{'content-type':'text/plain'});res.end('Not found')}}).listen(port,'127.0.0.1',()=>console.log(`Diamond Control: http://127.0.0.1:${port}`))
