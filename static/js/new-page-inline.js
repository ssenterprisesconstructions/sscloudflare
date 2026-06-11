(function(){
  // Handle ?scroll=anchor -> set hash
  try{
    var params = new URLSearchParams(window.location.search);
    var s = params.get('scroll');
    if (s) {
      try { s = decodeURIComponent(s); } catch(e) {}
      document.location.hash = '#' + s;
    }
  }catch(e){}

  // LOADER
  window.addEventListener('load', function(){
    setTimeout(function(){
      var ld = document.getElementById('loader');
      if(ld) ld.classList.add('hide');
    }, 1800);
  });

  // NAVBAR SCROLL
  window.addEventListener('scroll', function(){
    var nb = document.getElementById('navbar');
    if(nb) nb.classList.toggle('stuck', window.scrollY>70);
  });

  // MOBILE NAV
  var burger = document.getElementById('burger');
  if(burger) burger.addEventListener('click', function(){
    var mn = document.getElementById('mobNav'); if(mn) mn.classList.add('open');
  });
  var mobClose = document.getElementById('mobClose');
  if(mobClose) mobClose.addEventListener('click', closeMob);
  function closeMob(){ var mn = document.getElementById('mobNav'); if(mn) mn.classList.remove('open'); }

  // Attach close behaviour to mobile nav links (avoid inline onclick)
  document.querySelectorAll('.mob-nav a').forEach(function(a){ a.addEventListener('click', function(){ closeMob(); }); });

  // SMOOTH SCROLL
  document.querySelectorAll('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var t=document.querySelector(this.getAttribute('href'));
      if(t){e.preventDefault();t.scrollIntoView({behavior:'smooth'});}    
    });
  });

  // LIGHTBOX (init with jQuery if present)
  if(window.jQuery && typeof jQuery().nivoLightbox !== 'undefined'){
    jQuery(document).ready(function(){ jQuery('a[data-lightbox-gallery]').nivoLightbox(); });
  }

  // SLIDESHOW
  try{
    var si=0;
    function showSlides(){
      var s=document.querySelectorAll('.mySlides'),d=document.querySelectorAll('.dot');
      s.forEach(function(x){x.style.display='none';});
      si++;if(si>s.length)si=1;
      d.forEach(function(x){x.classList.remove('on');});
      if(s[si-1]){s[si-1].style.display='block';}
      if(d[si-1]){d[si-1].classList.add('on');}
      setTimeout(showSlides,4500);
    }
    showSlides();
  }catch(e){}

  // SCROLL REVEAL (IntersectionObserver)
  try{
    var io=new IntersectionObserver(function(entries){
      entries.forEach(function(e){if(e.isIntersecting)e.target.classList.add('in');});
    },{threshold:0.1});
    document.querySelectorAll('.rv,.rv-l,.rv-r').forEach(function(el){io.observe(el);});
  }catch(e){}

  // Input sanitiser for contact number (moved from inline oninput)
  var cnum = document.querySelector('input[name="cnum"]');
  if(cnum){
    cnum.addEventListener('input', function(){
      this.value=this.value.replace(/[^0-9.]/g,'').replace(/(\..*?)\..*/g,'$1');
    });
  }

  // Form submit handler (removed inline onsubmit)
  (function(){
    var form = document.querySelector('form[method="POST"]');
    if(form){
      form.addEventListener('submit', function(e){
        if(!validateForm()){ e.preventDefault(); }
      });
    }
  })();

  // validateForm (same logic as before)
  window.validateForm = function(){
    if(typeof grecaptcha==='undefined' || typeof grecaptcha.getResponse!=='function'){
      alert('reCAPTCHA is not available — this is a static site and messages are not sent. Please contact via email or phone.');
      return false;
    }
    try{
      if(grecaptcha.getResponse().length===0){alert('Please complete the reCAPTCHA.');return false;}
    }catch(e){return false;}
    return true;
  };

})();
