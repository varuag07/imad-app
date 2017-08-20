
var submit = document.getElementById('btn_submit');

submit.onclick = function () {
    var request = new XMLHttpRequest();
    
    //Capture the response
    request.onreadystatechange = function() {
      if(request.readyState === XMLHttpRequest.DONE)
      {
          if(request.status === 200)
          {
             console.log("Login Successful");
             alert("logged in successfully");
             //Create a session
          }
          else if(request.status === 403)
          {
              alert("Username/Password incorrect.");
          }
          else if(request.status === 500)
          {
              alert("Something went wrong in the server. Try again.");
          }
      }
    };
    //Make the Http Request.

//Submit Username Password Login

    var username = document.getElementById('id_username').value;
    var password = document.getElementById('id_password').value;
    
    var credentials = {
        "username": username,
        "password": password
    };
    console.log(credentials);
    //Make Login Http Request
    request.open('POST','http://varuag07.imad.hasura-app.io/login',true);
    request.setRequestHeader('Content-Type','application/json');
    request.send(JSON.stringify(credentials));
};