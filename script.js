document.addEventListener('DOMContentLoaded',()=>{
  // Gallery and modal were removed (no gallery section). Modal logic removed accordingly.

  // Kuro interactions: toggle the folder categories panel with a bounce
  const kuroLaunch = document.getElementById('kuroLaunch');
  const categoriesList = document.getElementById('categoriesList');
  if(kuroLaunch){
    const card = kuroLaunch.closest('.kuro-card');
    // Click toggles open/close
    kuroLaunch.addEventListener('click', ()=>{
      const expanded = kuroLaunch.getAttribute('aria-expanded') === 'true';
      kuroLaunch.setAttribute('aria-expanded', String(!expanded));

      // Toggle the visual open state on the card (gives a bounce)
      card?.classList.toggle('kuro-open', !expanded);

      // Show/hide folder-style categories panel and overlay backdrop
      const overlay = document.getElementById('kuroOverlay');
      if(categoriesList){
        categoriesList.setAttribute('aria-hidden', expanded ? 'true' : 'false');
        if(!expanded) categoriesList.querySelector('button')?.focus();
      }
      if(overlay) overlay.setAttribute('aria-hidden', expanded ? 'true' : 'false');

      // Prevent body scroll when overlay is open
      if(!expanded) document.body.classList.add('no-scroll'); else document.body.classList.remove('no-scroll');
    });

    // Keyboard: Enter/Space should activate the button
    kuroLaunch.addEventListener('keydown', (e)=>{
      if(e.key === 'Enter' || e.key === ' ') { e.preventDefault(); kuroLaunch.click(); }
    });

    // If the page was opened with '?kuro=open', auto-open the folder for smoother flow
    try{
      const params = new URLSearchParams(location.search);
      if(params.get('kuro') === 'open'){
        // small timeout to allow layout to settle
        setTimeout(()=> kuroLaunch.click(), 120);
      }
    }catch(e){/* ignore if URL parsing fails */}
  }

  // When a category is chosen: brief visual feedback, then close the panel
  if(categoriesList){
    categoriesList.addEventListener('click', (e)=>{
      const item = e.target.closest('.kuro-subitem');
      if(!item) return;

      // Brief active state for visual feedback
      item.classList.add('kuro-active');
      setTimeout(()=> item.classList.remove('kuro-active'), 300);

      // If item is an anchor, navigate to its href, adding a small query param for context
      if(item.tagName === 'A' && item.href){
        e.preventDefault();
        const url = new URL(item.href, location.href);
        url.searchParams.set('from','kuro');
        window.location.href = url.toString();
        return;
      }

      // Fallback: dataset-target scroll
      const tgt = item.dataset.target;
      if(tgt){
        const el = document.querySelector(tgt);
        if(el) el.scrollIntoView({behavior:'smooth', block:'start'});
      }

      // Close the folder panel and hide overlay
      kuroLaunch.setAttribute('aria-expanded','false');
      categoriesList.setAttribute('aria-hidden','true');
      card?.classList.remove('kuro-open');
      const overlay = document.getElementById('kuroOverlay');
      if(overlay) overlay.setAttribute('aria-hidden','true');
      document.body.classList.remove('no-scroll');

    });

    // Close when pressing Escape while focus is inside the list
    categoriesList.addEventListener('keydown', (e)=>{
      if(e.key === 'Escape'){
        kuroLaunch.setAttribute('aria-expanded','false');
        categoriesList.setAttribute('aria-hidden','true');
        card?.classList.remove('kuro-open');
        const overlay = document.getElementById('kuroOverlay');
        if(overlay) overlay.setAttribute('aria-hidden','true');
        document.body.classList.remove('no-scroll');
        kuroLaunch.focus();
      }
    });

    // Clicking the overlay backdrop closes the folder panel
    const overlay = document.getElementById('kuroOverlay');
    if(overlay){
      overlay.addEventListener('click', ()=>{
        kuroLaunch.setAttribute('aria-expanded','false');
        categoriesList.setAttribute('aria-hidden','true');
        card?.classList.remove('kuro-open');
        overlay.setAttribute('aria-hidden','true');
        document.body.classList.remove('no-scroll');
      });
    }
  }

});
