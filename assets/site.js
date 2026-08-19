const documents=[
{id:'argument',title:'Clinical argument',file:'README.md',description:'Plain-language synthesis and central longitudinal argument.',principal:true},
{id:'propositions',title:'Propositions',file:'propositions.md',description:'Questions and propositions requiring evidential or expert testing.',principal:true},
{id:'facts',title:'Facts',file:'facts.md',description:'Documentary facts anchored to the underlying clinical record.',principal:true},
{id:'decisions',title:'Decision points',file:'DECISION-POINTS.md',description:'Material choices, substitutions and opportunities to re-evaluate.',principal:true},
{id:'tensions',title:'Tensions',file:'TENSIONS.md',description:'Places where coexisting evidence requires explanation or weighting.',principal:true},
{id:'specialist',title:'Specialist input',file:'SPECIALIST-INPUT.md',description:'Specialist involvement and thresholds for renewed review.',principal:true},
{id:'referral',title:'Referral & escalation',file:'REFERRAL-SPECIALIST-ESCALATION.md',description:'What was referred, to whom, and which questions remained unresolved.',principal:true},
{id:'findings',title:'Findings register',file:'RECORD-FINDINGS-REGISTER.md',description:'Detailed evidential findings register.',reference:true},
{id:'record',title:'Complete record',file:'complete-record.md',description:'Underlying longitudinal source record.',reference:true},
{id:'quotes',title:'Quotes',file:'quotes.md',description:'Selected quotations and extracts.',reference:true},
{id:'expert',title:'Expert material',file:'expert.md',description:'Expert-oriented analysis and questions.',reference:true},
{id:'timeline',title:'Timeline',file:'TIMELINES.html',description:'Timeline presentation.',external:true}
];
const principal=documents.filter(d=>d.principal);
const $=s=>document.querySelector(s);
const reader=$('#reader'),select=$('#docSelect'),pager=$('#pager'),prev=$('#prevBtn'),next=$('#nextBtn'),hint=$('#swipeHint'),progress=$('#progressBar'),map=$('#mapGrid');
select.innerHTML=documents.map(d=>`<option value="${d.id}">${d.title}</option>`).join('');
map.innerHTML=documents.map(d=>`<a class="map-card" href="${d.external?d.file:'#/'+d.id}"><strong>${d.title}</strong><span>${d.description}</span></a>`).join('');
marked.setOptions({gfm:true,breaks:false});
const renderer=new marked.Renderer();
renderer.heading=function({tokens,depth}){const text=this.parser.parseInline(tokens);const plain=text.replace(/<[^>]+>/g,'');const id=plain.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9\s-]/g,'').trim().replace(/\s+/g,'-').replace(/-+/g,'-');return `<h${depth} id="${id}">${text}</h${depth}>`};
function routeInfo(){const raw=location.hash.replace(/^#\/?/,'');const [id,anchor]=raw.split('::');return{id:id||'argument',anchor:anchor?decodeURIComponent(anchor):''}}
function documentFor(id){return documents.find(d=>d.id===id)||documents[0]}
function updatePager(doc){const i=principal.findIndex(d=>d.id===doc.id);const p=i>0?principal[i-1]:null,n=i>=0&&i<principal.length-1?principal[i+1]:null;pager.hidden=i<0;hint.hidden=i<0;prev.disabled=!p;next.disabled=!n;prev.textContent=p?`← ${p.title}`:'← Previous';next.textContent=n?`${n.title} →`:'Next →';prev.onclick=()=>p&&go(p.id);next.onclick=()=>n&&go(n.id)}
function go(id,anchor=''){location.hash=`/${id}${anchor?'::'+encodeURIComponent(anchor):''}`}
function rewriteLinks(){reader.querySelectorAll('a[href]').forEach(a=>{const href=a.getAttribute('href');if(!href)return;if(href.startsWith('#')){const target=href.slice(1);a.href=`#/${routeInfo().id}::${encodeURIComponent(target)}`;return}const clean=href.replace(/^\.\//,'').split('#')[0];const doc=documents.find(d=>d.file===clean);if(doc&&!doc.external){const anchor=href.includes('#')?href.split('#')[1]:'';a.href=`#/${doc.id}${anchor?'::'+encodeURIComponent(anchor):''}`}})}
async function load(){const {id,anchor}=routeInfo(),doc=documentFor(id);if(doc.external){location.href=doc.file;return}select.value=doc.id;updatePager(doc);reader.classList.add('is-loading');reader.setAttribute('aria-busy','true');reader.innerHTML=`<p class="doc-label">Loading ${doc.title}…</p>`;try{const response=await fetch(doc.file,{cache:'no-cache'});if(!response.ok)throw new Error(`${response.status} ${response.statusText}`);const markdown=await response.text();reader.innerHTML=`<div class="doc-label">${doc.title}</div>${marked.parse(markdown,{renderer})}`;rewriteLinks();document.title=`${doc.title} — Clinical Record`;reader.classList.remove('is-loading');reader.setAttribute('aria-busy','false');requestAnimationFrame(()=>{if(anchor){const el=document.getElementById(anchor);if(el)el.scrollIntoView({block:'start'});else window.scrollTo({top:0})}else window.scrollTo({top:0})});}catch(error){reader.classList.remove('is-loading');reader.setAttribute('aria-busy','false');reader.innerHTML=`<div class="status"><strong>This document could not be loaded.</strong><br>${error.message}</div>`}}
select.addEventListener('change',()=>{const d=documentFor(select.value);d.external?location.href=d.file:go(d.id)});
window.addEventListener('hashchange',load);
window.addEventListener('scroll',()=>{const h=document.documentElement;const max=h.scrollHeight-h.clientHeight;progress.style.width=max?`${Math.min(100,(h.scrollTop/max)*100)}%`:'0%'},{passive:true});
let startX=0,startY=0,startTime=0;
reader.addEventListener('touchstart',e=>{if(e.touches.length!==1)return;startX=e.touches[0].clientX;startY=e.touches[0].clientY;startTime=Date.now()},{passive:true});
reader.addEventListener('touchend',e=>{const t=e.changedTouches[0];if(!t)return;const dx=t.clientX-startX,dy=t.clientY-startY,elapsed=Date.now()-startTime;if(elapsed>700||Math.abs(dx)<65||Math.abs(dx)<Math.abs(dy)*1.35)return;const current=routeInfo().id,i=principal.findIndex(d=>d.id===current);if(i<0)return;if(dx<0&&principal[i+1])go(principal[i+1].id);if(dx>0&&principal[i-1])go(principal[i-1].id)},{passive:true});
window.addEventListener('keydown',e=>{if(e.altKey||e.ctrlKey||e.metaKey||/INPUT|SELECT|TEXTAREA/.test(document.activeElement?.tagName))return;const i=principal.findIndex(d=>d.id===routeInfo().id);if(e.key==='ArrowLeft'&&principal[i-1])go(principal[i-1].id);if(e.key==='ArrowRight'&&principal[i+1])go(principal[i+1].id)});
if(!location.hash)history.replaceState(null,'','#/argument');
load();
