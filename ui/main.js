console.log('Loaded!');
var button = document.getElementById('counter');

button.onclick = function() {
    //Create request to Counter endpoint
    //alert('Button Clicked.');
    var request = new XMLHttpRequest();
    
    //Capture the response
    request.onreadystatechange = function() {
      if(request.readyState === XMLHttpRequest.DONE && request.status === 200)
      {
         var counter = request.responseText;
         var span = document.getElementById('count');
         span.innerHTML = counter.toString();
      }
    };
    //Make the Http Request.
    request.open('GET','http://varuag07.imad.hasura-app.io/counter',true);
    request.send(null);
};

//Submit Name
var nameInput = document.getElementById('name');
var submit = document.getElementById('submit_btn');
submit.onclick = function () {
    //Make request to the server.
    //Capture the names and Display
    var names = ['name1','name2','name3','name4'];
    var list = '';
    for(var i=0; i<names.length;i++)
    {
        list += '<li>' + names[i] + '</li>'
    }
    var ul = document.getElementById('namelist');
    ul.innerHTML = list;
};