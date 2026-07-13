// Generates GRAPH.html — self-contained force-directed graph of the vault's wikilinks.
const fs=require('fs'),path=require('path');
const ROOT='E:/PRAGYESH - WORK/CLAUDE-BRAIN';
const files=[];(function walk(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){
 if(e.isDirectory()){if(!['.obsidian','.git','cache'].includes(e.name))walk(path.join(d,e.name));}
 else if(e.name.endsWith('.md'))files.push(path.join(d,e.name));}})(ROOT);
const ids={},nodes=[],edges=[],groupOf=f=>{
 const r=path.relative(ROOT,f).replace(/\\/g,'/');
 if(r.startsWith('craft/'))return'craft';if(r.startsWith('workflows/'))return'workflow';
 if(r.startsWith('_REGISTRY/notes/'))return'note';if(r.startsWith('_REGISTRY/'))return'registry';return'core';};
files.forEach((f,i)=>{const b=path.basename(f,'.md');ids[b]=i;nodes.push({id:i,label:b,group:groupOf(f)});});
const seen=new Set();
files.forEach((f,i)=>{const t=fs.readFileSync(f,'utf8');
 for(const m of t.matchAll(/\[\[([^\]|#]+)/g)){const tgt=ids[m[1].trim()];
  if(tgt!==undefined&&tgt!==i){const k=Math.min(i,tgt)+'-'+Math.max(i,tgt);
   if(!seen.has(k)){seen.add(k);edges.push([i,tgt]);}}}});
const data=JSON.stringify({nodes,edges});
const html=`<!DOCTYPE html><html><head><meta charset="utf-8"><title>CLAUDE-BRAIN Neural Graph</title>
<style>body{margin:0;background:#0e0f13;color:#dcdcdc;font:13px system-ui;overflow:hidden}
#hud{position:fixed;top:10px;left:12px;background:#181a20cc;padding:10px 14px;border-radius:10px;line-height:1.7}
.sw{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:6px}
#tip{position:fixed;pointer-events:none;background:#22242c;padding:4px 10px;border-radius:6px;display:none;font-weight:600}</style></head>
<body><canvas id="c"></canvas><div id="hud"><b>CLAUDE-BRAIN — ${nodes.length} nodes · ${edges.length} edges</b><br>
<span class="sw" style="background:#e8b339"></span>core &nbsp;<span class="sw" style="background:#7aa2f7"></span>craft &nbsp;
<span class="sw" style="background:#9ece6a"></span>workflows &nbsp;<span class="sw" style="background:#f7768e"></span>registry &nbsp;
<span class="sw" style="background:#bb9af7"></span>notes<br><i>drag nodes · wheel zoom · drag background to pan</i></div>
<div id="tip"></div>
<script>const D=${data};const C={core:'#e8b339',craft:'#7aa2f7',workflow:'#9ece6a',registry:'#f7768e',note:'#bb9af7'};
const cv=document.getElementById('c'),cx=cv.getContext('2d');let W,H;const R=()=>{W=cv.width=innerWidth;H=cv.height=innerHeight};R();onresize=R;
const N=D.nodes.map(n=>({...n,x:W/2+(Math.random()-.5)*W*.5,y:H/2+(Math.random()-.5)*H*.5,vx:0,vy:0}));
const E=D.edges;const adj={};E.forEach(([a,b])=>{(adj[a]=adj[a]||[]).push(b);(adj[b]=adj[b]||[]).push(a);});
N.forEach(n=>n.deg=(adj[n.id]||[]).length);
let zoom=.9,px=0,py=0,drag=null,panning=false,mx=0,my=0;
function step(){for(let i=0;i<N.length;i++){const a=N[i];for(let j=i+1;j<N.length;j++){const b=N[j];
 let dx=a.x-b.x,dy=a.y-b.y,d2=dx*dx+dy*dy+0.01;if(d2<160000){const d=Math.sqrt(d2),f=2200/d2;
 a.vx+=dx/d*f;a.vy+=dy/d*f;b.vx-=dx/d*f;b.vy-=dy/d*f;}}}
 E.forEach(([ai,bi])=>{const a=N[ai],b=N[bi];const dx=b.x-a.x,dy=b.y-a.y,d=Math.sqrt(dx*dx+dy*dy)+.01,f=(d-110)*.02;
 a.vx+=dx/d*f;a.vy+=dy/d*f;b.vx-=dx/d*f;b.vy-=dy/d*f;});
 N.forEach(n=>{n.vx+=(W/2-n.x)*.002;n.vy+=(H/2-n.y)*.002;
 const sp=Math.hypot(n.vx,n.vy);if(sp>9){n.vx*=9/sp;n.vy*=9/sp;}
 if(n!==drag){n.x+=n.vx*=.85;n.y+=n.vy*=.85;}});}
function draw(){cx.setTransform(1,0,0,1,0,0);cx.clearRect(0,0,W,H);cx.setTransform(zoom,0,0,zoom,px,py);
 cx.strokeStyle='#3a3d4a';cx.lineWidth=.7;cx.beginPath();E.forEach(([a,b])=>{cx.moveTo(N[a].x,N[a].y);cx.lineTo(N[b].x,N[b].y);});cx.stroke();
 N.forEach(n=>{const r=3+Math.min(11,n.deg*.9);cx.beginPath();cx.arc(n.x,n.y,r,0,7);cx.fillStyle=C[n.group];cx.fill();
 if(n.deg>7||zoom>1.4){cx.fillStyle='#cfd2dd';cx.font=(10/Math.max(zoom,.8))+'px system-ui';cx.fillText(n.label,n.x+r+3,n.y+3);}});}
(function loop(){step();draw();requestAnimationFrame(loop)})();
const pt=e=>({x:(e.clientX-px)/zoom,y:(e.clientY-py)/zoom});
cv.onmousedown=e=>{const p=pt(e);drag=N.find(n=>((n.x-p.x)**2+(n.y-p.y)**2)<200);if(!drag){panning=true;mx=e.clientX;my=e.clientY;}};
onmousemove=e=>{const tip=document.getElementById('tip');if(drag){const p=pt(e);drag.x=p.x;drag.y=p.y;}
 else if(panning){px+=e.clientX-mx;py+=e.clientY-my;mx=e.clientX;my=e.clientY;}
 else{const p=pt(e);const h=N.find(n=>((n.x-p.x)**2+(n.y-p.y)**2)<200);
 if(h){tip.style.display='block';tip.style.left=e.clientX+14+'px';tip.style.top=e.clientY+8+'px';tip.textContent=h.label;}else tip.style.display='none';}};
onmouseup=()=>{drag=null;panning=false};
cv.onwheel=e=>{e.preventDefault();const z=zoom*(e.deltaY<0?1.12:.89);px=e.clientX-(e.clientX-px)*z/zoom;py=e.clientY-(e.clientY-py)*z/zoom;zoom=z;};
</script></body></html>`;
fs.writeFileSync(ROOT+'/GRAPH.html',html);
console.log('GRAPH.html written:',nodes.length,'nodes,',edges.length,'edges');
