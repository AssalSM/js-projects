let title = document.getElementById("title")
let price = document.getElementById("price")
let taxes= document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let sumbit = document.getElementById("sumbit")
let mood ="create"
let tmp ;
function gettotal(){
  if(price.value != ''){
    let result = ( +price.value + +taxes.value + +ads.value) - +discount.value;
    total.innerHTML = result;
    total.style.background = '#040';
    
  } else{
    total.innerHTML = '';
    total.style.background= '#a00d02'
  }}
  let datePro;
  if(localStorage.product != null) {
    datePro= JSON.parse(localStorage.product)
  }else{
    datePro=[]
  }
   submit.onclick = function(){
     let newPro = {
       title:title.value,
       price:price.value,
       taxes:taxes.value,
       ads:ads.value,
       discount:discount.value,
       total:total.innerHTML,
       count:count.value,
       category:category.value,
       
       
     }
     if(title.value !='' && count.value<100 && category.value!='' ){
     if(mood === "create"){
     if(newPro.count>1){
       for(let i=0;i<newPro.count;i++){
         datePro.push(newPro)
       }
     }else{
       datePro.push(newPro)
     }}else{
       datePro[tmp]=newPro
       mood='create'
       submit.innerHTML="create"
       count.style.display='block'
     } 
       clearData()
     }
     localStorage.setItem ('product' , JSON.stringify(datePro))
     
     
     showDate()
   }
   showDate();
  function clearData(){
     title.value ='';
     price.value ='';
     taxes.value =''
     ads.value =''
     discount.value =''
     count.value =''
     category.value =''
     total.innerHTML =''
   }
  function showDate(){
    gettotal()
    let tabel = ''
    for(let i=0 ; i<datePro.length; i++){
      tabel += `
      <tr>
        <td>${i}</td>
       <td>${datePro[i].title}</td>
        <td>${datePro[i].price}</td>
        <td>${datePro[i].taxes}</td>
        <td>${datePro[i].ads}</td>
        <td>${datePro[i].discount}</td>
        <td>${datePro[i].total}</td>
        <td>${datePro[i].category}</td>
        <td> <button onclick="updatedata(${i})" id="update">update</button></td> 
        <td><button  onclick="deletedate()" id="delete">delete</button></td>
         </tr>`
      
      
    
    }
    document.getElementById("tbody").innerHTML= tabel 
    let btndelete = document.getElementById(`deleteAll`);
    if(datePro.length>0){
      btndelete.innerHTML=`
      
      <button onclick="deleteAll()">delete All(${datePro.length})</button>
      `
    }else{
      btndelete.innerHTML=''
      
    }
    
  }
  function deletedate(i){
    datePro.splice(i,1)
    localStorage.product = JSON.stringify(datePro)
    showDate()
  }
  function deleteAll(){
    localStorage.clear()
    datePro.splice(0)
    showDate()
  }
  function updatedata(i){
    
    title.value = datePro[i].title
    price.value = datePro[i].price
    taxes.value = datePro[i].taxes
    ads.value = datePro[i].ads
    discount.value= datePro[i].discount
    category.value= datePro[i].category
gettotal()
count.style.display='none'
submit.innerHTML="update"
tmp=i
mood="update"
scroll({
  top:0,
  behavior: `smooth`})
  }
  let searchmood = 'title'
  function getsearchmood(id){
    let search = document.getElementById('search')
    if( id === 'searchtitle'){
      searchmood='title'
      
    }else{
      searchmood = 'category'
      
    } 
    search.placeholder='search by ' +searchmood
    search.focus()
    search.value =''
    showDate()
  }
  function searchdate(value){
  let tabel = ''
  for(let i=0;i<datePro.length;i++){
  if(searchmood=='title'){
      if(datePro[i].title.includes(value.toLowerCase())){
        tabel += `
      <tr>
        <td>${i}</td>
       <td>${datePro[i].title}</td>
        <td>${datePro[i].price}</td>
        <td>${datePro[i].taxes}</td>
        <td>${datePro[i].ads}</td>
        <td>${datePro[i].discount}</td>
        <td>${datePro[i].total}</td>
        <td>${datePro[i].category}</td>
        <td> <button onclick="updatedata(${i})" id="update">update</button></td> 
        <td><button  onclick="deletedate()" id="delete">delete</button></td>
         </tr>`;
         
  }
    
  
  
  
  
  
  
  
  
  
}else{
   
      if (datePro[i].category.includes(value.toLowerCase())){
        tabel += `
      <tr>
        <td>${i}</td>
       <td>${datePro[i].title}</td>
        <td>${datePro[i].price}</td>
        <td>${datePro[i].taxes}</td>
        <td>${datePro[i].ads}</td>
        <td>${datePro[i].discount}</td>
        <td>${datePro[i].total}</td>
        <td>${datePro[i].category}</td>
        <td> <button onclick="updatedata(${i})" id="update">update</button></td> 
        <td><button  onclick="deletedate()" id="delete">delete</button></td>
         </tr>`}}
}
  
   document.getElementById("tbody").innerHTML= tabel
  
}
