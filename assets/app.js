const filters=[...document.querySelectorAll('.filter')];
const cards=[...document.querySelectorAll('.product-card')];
const search=document.getElementById('productSearch');
const empty=document.getElementById('emptyState');
const count=document.getElementById('productCount');
let active='all';
function updateProducts(){
  const term=search.value.trim().toLowerCase();
  let visible=0;
  cards.forEach(card=>{
    const categoryMatch=active==='all'||card.dataset.category===active;
    const searchMatch=card.dataset.name.includes(term)||card.innerText.toLowerCase().includes(term);
    const show=categoryMatch&&searchMatch;
    card.hidden=!show;
    if(show) visible++;
  });
  empty.hidden=visible!==0;
  count.textContent=String(visible).padStart(2,'0');
}
filters.forEach(button=>button.addEventListener('click',()=>{
  filters.forEach(item=>item.classList.remove('active'));
  button.classList.add('active');
  active=button.dataset.filter;
  updateProducts();
}));
search.addEventListener('input',updateProducts);
const menuToggle=document.getElementById('menuToggle');
const nav=document.getElementById('mainNav');
menuToggle.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',String(open));
  menuToggle.textContent=open?'×':'☰';
});
nav.querySelectorAll('a').forEach(link=>link.addEventListener('click',()=>{
  nav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded','false');
  menuToggle.textContent='☰';
}));
document.getElementById('year').textContent=new Date().getFullYear();
updateProducts();
