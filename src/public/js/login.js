const form = document.getElementById('loginForm');

 

form.addEventListener("submit", e =>{

    e.preventDefault();

    const data = new FormData(form);

    const obj = {};

 

    data.forEach((value,key)=>obj[key]=value);
    
 

    fetch('/api/sessions/',{

        method:"POST",

        body:JSON.stringify(obj),

        headers:{

            "Content-Type":"application/json"

        }

     }).then(result => result.json())
     .then(result => {
         if (result.status === "success") {
             window.location.replace('/products');
         } else {
             console.log(result);
         }
     });
 

})