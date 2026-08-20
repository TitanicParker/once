(()=>{
  const header=document.querySelector('header');
  const viewButtons=document.getElementById('viewButtons');
  const toolbar=document.querySelector('.toolbar');
  const compare=document.getElementById('compareControls');
  if(!header||!viewButtons||!toolbar)return;

  const style=document.createElement('style');
  style.textContent=`
    .timeline-menu-toggle{margin-top:10px;display:inline-flex;align-items:center;justify-content:space-between;gap:10px;min-height:42px;padding:8px 11px;border:1px solid var(--line);border-radius:9px;background:var(--panel);color:var(--ink);font-weight:650;cursor:pointer}
    .timeline-menu-toggle .chev{font-size:12px;color:var(--muted);transition:transform .18s ease}
    body.timeline-menu-collapsed #viewButtons,body.timeline-menu-collapsed .toolbar,body.timeline-menu-collapsed #compareControls{display:none!important}
    body:not(.timeline-menu-collapsed) .timeline-menu-toggle .chev{transform:rotate(180deg)}
    @media(max-width:800px){
      header{padding:11px 14px}
      header h1{font-size:20px;margin-bottom:2px}
      header .sub{font-size:12px;line-height:1.35}
      .timeline-menu-toggle{width:100%;margin-top:8px}
      main{padding:14px}
      .toolbar{margin-top:10px}
    }
    @media(min-width:801px){.timeline-menu-toggle{display:none}}
  `;
  document.head.appendChild(style);

  const toggle=document.createElement('button');
  toggle.type='button';
  toggle.className='timeline-menu-toggle';
  toggle.setAttribute('aria-controls','viewButtons');
  toggle.innerHTML='<span>Timeline options</span><span class="chev" aria-hidden="true">▾</span>';
  header.insertBefore(toggle,viewButtons);

  const mobile=window.matchMedia('(max-width:800px)');
  function setCollapsed(collapsed){
    document.body.classList.toggle('timeline-menu-collapsed',collapsed);
    toggle.setAttribute('aria-expanded',String(!collapsed));
    toggle.firstElementChild.textContent=collapsed?'Timeline options':'Hide timeline options';
  }
  function applyDefault(){setCollapsed(mobile.matches)}
  applyDefault();
  toggle.addEventListener('click',()=>setCollapsed(!document.body.classList.contains('timeline-menu-collapsed')));
  if(mobile.addEventListener)mobile.addEventListener('change',applyDefault);
})();
