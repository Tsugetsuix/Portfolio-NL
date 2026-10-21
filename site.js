(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var slots = document.querySelectorAll('.slot');
  var rises = document.querySelectorAll('.rise');
  if (reduce || !('IntersectionObserver' in window)) {
    slots.forEach(function(el){el.classList.add('in')});
    rises.forEach(function(el){el.classList.add('in')});
    return;
  }
  // units slide into the rack one after another, like servers on rails
  slots.forEach(function(el, i){
    setTimeout(function(){ el.classList.add('in'); }, 80 + i * 90);
  });
  // project rows and the contact field arrive once as they enter
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){
      if (e.isIntersecting) {
        var el = e.target;
        var idx = Array.prototype.indexOf.call(rises, el);
        setTimeout(function(){ el.classList.add('in'); }, el.tagName === 'LI' ? (idx % 3) * 80 : 0);
        io.unobserve(el);
      }
    });
  }, {rootMargin: '0px 0px -10% 0px'});
  rises.forEach(function(el){ io.observe(el); });
  // safety net: never leave content hidden
  setTimeout(function(){
    slots.forEach(function(el){el.classList.add('in')});
  }, 1500);
})();
