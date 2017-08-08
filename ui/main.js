console.log('Loaded!');
var button = document.getElementById('counter');

button.onclick = function() {
    //Create request to Counter endpoint
    alert('Button Clicked.');
    var request = new XMLHttpRequest();
    
    //Capture the response
    request.onreadystatechange = function() {
      if(request.readyState === XMLHttpRequest.Done)
      {
          if(request.status === 200)
          {
                var counter = request.responseText;
                var span = document.getElementById('count');
                span.innerHTML = counter.toString();
          }
      }
    };
    //Make the Http Request.
    request.open('GET','http://varuag07.imad.hasura-app.io/counter',true);
    result.send(null);
};