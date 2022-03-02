let apiData;
fetch("paginationData.json")
  .then(response => response.json())
  .then(function(data){
    apiData=data;
    loadUsers(0,9,apiData);
    loadPagination(apiData.length);
  });

  function loadPagination(dataLength){
    let totalPages = dataLength/10;
    const pageContainer=document.createElement("div");
    pageContainer.className="page-display";
    pageContainer.innerHTML=`<button class="btn" onclick="loadPages(this.textContent)">First</button>
    <button class="btn" onclick="loadPages(this.textContent)">Previous</button>`;
    for(var i=2;i<=totalPages;i++)
    {
      const buttonContainer = document.createElement("span")
      buttonContainer.innerHTML=`<button class="btn" onclick="loadPages(this.textContent)">${i}</button>`;
    pageContainer.append(buttonContainer);
    }
   
    document.body.append(pageContainer);
  }

  function loadUsers(from,to,apiData){
    var userDetails=apiData;
    const userList = document.createElement("div");
    userList.className = "user-list";
 for(var i=from;i<=to;i++){
    const userContainer = document.createElement("div");
    userContainer.className = "user-container";
  
    userContainer.innerHTML = `
    <div>
   <p><b>ID:</b> ${userDetails[i].id}</p>
   <p><b>NAME:</b> ${userDetails[i].name}</p>
   <p><b>EMAIL:</b> ${userDetails[i].email}</p>
    </div>
    `;
  
    userList.append(userContainer);
  }
  document.body.append(userList);
}


function refreshUsers(){
  var element = document.querySelectorAll(".user-list");
  var page = document.querySelectorAll(".page-display");
  
  if(element.length>0)
  {
      element[0].remove();
  }
  if(page.length>0)
  {
      page[0].remove();
  }
  
}

let count=1;
  function loadPages(buttonName){
    
    refreshUsers();
    let from,to;
    let totalPages=Math.ceil(apiData/10);
   if(buttonName =="First"){
from=0; to=9;
loadUsers(from,to,apiData);
loadPagination(apiData.length);
   }
   if(buttonName=="Previous"){
     if(count==1){ loadUsers(0,9,apiData);
      loadPagination(apiData.length);}
     else{     --count;
      to=(count*10)-1;
      from=to-9;
      loadUsers(from,to,apiData);
      loadPagination(apiData.length);}

}
   if(buttonName !=="First" && buttonName !=="Previous"){
     count=buttonName;
   to=(buttonName*10)-1;
   from=to-9;
   loadUsers(from,to,apiData);
   loadPagination(apiData.length);
   }
  
  }