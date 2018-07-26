const search = document.getElementsByClassName("search");
const usernameField = document.getElementsByName("searchField");

search[0].addEventListener("click", async function(){
  const username = usernameField[0].value;
  console.log(`https://api.github.com/users/${username}/events`);
  const req = fetch(`https://api.github.com/users/${username}/events`)
    .then(data => data.json())
    .then(function(data){ 
      const mail = data[1].payload.commits[0].author.email;
      alert(mail);
    });
});

var form_id_js = "javascript_form";

var data_js = {
    "access_token": "rdna6ryjpd55kims34idjtkz"
};

var sendButton = document.getElementById("js_send");

function js_send() {
    sendButton.value='Sending…';
    sendButton.disabled=true;
    var request = new XMLHttpRequest();
    request.onreadystatechange = function() {
        if (request.readyState == 4 && request.status == 200) {
            js_onSuccess();
        } else
        if(request.readyState == 4) {
            js_onError(request.response);
        }
    };

    function js_onSuccess() {
      // remove this to avoid redirect
      window.location = window.location.pathname + "?message=Email+Successfully+Sent%21&isError=0";
  }

  function js_onError(error) {
      // remove this to avoid redirect
      window.location = window.location.pathname + "?message=Email+could+not+be+sent.&isError=1";
  }


    var subject = document.querySelector("#" + form_id_js + " [name='subject']").value;
    var message = document.querySelector("#" + form_id_js + " [name='text']").value;
    data_js['subject'] = subject;
    data_js['text'] = message;
    var params = toParams(data_js);

    request.open("POST", "https://postmail.invotes.com/send", true);
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

    request.send(params);

    return false;
}

sendButton.onclick = js_send;

function toParams(data_js) {
    var form_data = [];
    for ( var key in data_js ) {
        form_data.push(encodeURIComponent(key) + "=" + encodeURIComponent(data_js[key]));
    }

    return form_data.join("&");
}

var js_form = document.getElementById(form_id_js);
js_form.addEventListener("submit", function (e) {
    e.preventDefault();
});