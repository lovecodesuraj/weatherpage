
const weatherForm=document.querySelector('form');
const search=document.querySelector('input');

const msg1=document.querySelector('#msg1');
const msg2=document.querySelector('#msg2');

weatherForm.addEventListener('submit',(e)=>{
  e.preventDefault();
  msg1.innerHTML='Loading..';
  msg2.innerHTML='';




  fetch('/weather?address='+search.value).then((response)=>{
   response.json().then((data)=>{
     if(data.error){
     msg1.innerHTML=data.error;
     msg2.innerHTML='';
   }else{
     msg1.innerHTML=data.location;
     msg2.innerHTML=data.forecast;
   }
   })
  })

})
