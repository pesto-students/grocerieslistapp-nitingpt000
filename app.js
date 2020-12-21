let registerEl=document.getElementById('register');
registerEl.addEventListener('click',registerUser);


function registerUser(e){
  let userArr=JSON.parse(localStorage.getItem('userdb')) || [];
  let username=document.getElementById('Rusername').value;
  let password=document.getElementById('Rpassword').value;
  
  if(userArr.length<3){
    userArr.push({username,password,items:[]});
  }else{
    userArr.shift();
    userArr.push({username,password,items:[]});
  }
  
  
  localStorage.setItem('userdb',JSON.stringify(userArr));
  console.log(userArr);
  document.getElementById('registerForm').style.display='none';
  document.getElementById('signinForm').style.display='block';
  e.preventDefault();
}

let sigininSubmitBtn=document.getElementById('signin');
sigininSubmitBtn.addEventListener('click',sigininUser);


function sigininUser(e){
  let userArr=JSON.parse(localStorage.getItem('userdb'));
  let username=document.getElementById('username').value;
  let password=document.getElementById('password').value;
for(let user of userArr){
  if(user.username === username && user.password === user.password){
    console.log(`login successful ${username} ${password}`);
  }else{
  console.log(`login failed ${username} ${password}`);
  }
}
  // document.getElementById('signinForm').reset();
  document.getElementById('signinForm').style.display='none';
  document.getElementById('itemForm').style.display='block';
 e.preventDefault();
}




function createDeleteBtn(){
  const btn=document.createElement('button');
  btn.textContent='Delete';
  btn.addEventListener('click',deleteItems);
  return btn;
}

function createEditBtn(){
  const btn=document.createElement('button');
  btn.textContent='Edit';
  return btn;
}

function showUserItems(username){
  let userObj;
  const userArr=JSON.parse(localStorage.getItem('userdb'));
  for(let user of userArr){
    if(user.username === 'nitinace') userObj={...user};
  }
  return [...userObj.items];

}

window.addEventListener('load',showItems);

function showItems(){
  const user='nitinace';
  const items=showUserItems(user);
  for(let item of items){
    createItem(item);
  }
}




const findUser=(username,userArr)=>userArr.find((value)=>value.username===username);


const form=document.querySelector('#itemForm form');
let itemList=document.querySelector('#itemList');

const deleteItem=(e)=>{
  itemList.removeChild(e.target.parentElement);
}

const editItem = (e)=>{
  const itemName=e.target.parentElement.firstChild.nodeValue;
  e.target.parentElement.firstChild.nodeValue=prompt("edit the value",itemName);
}

const addItem=(e)=>{
  let userArr=JSON.parse(localStorage.getItem('userdb'));
  console.log(userArr)
  const userObj = {username:'nitinace',password:'Nitinace@786',items:[]}
  let itemName=document.querySelector('input#itemname').value;

  if(userObj.items.length<10){
    userObj.items.push(itemName);
  }else{
    alert('value is limited to 10');
  }

  itemList.appendChild(createItem(itemName));
  console.log(itemName);
  localStorage.setItem('userdb',JSON.stringify(userArr));
  e.preventDefault();
}



const createItem=(itemName)=>{
  const item=document.createElement('li');
  const deleteBtn=document.createElement('button');
  deleteBtn.innerText='Delete';
  const editBtn=document.createElement('button');
  editBtn.innerText='Edit';
  item.innerText=itemName;
  item.appendChild(deleteBtn);
  item.appendChild(editBtn);
  deleteBtn.addEventListener('click',deleteItem);
  editBtn.addEventListener('click',editItem);
 
  return item;
}







form.addEventListener('submit',addItem);
	
