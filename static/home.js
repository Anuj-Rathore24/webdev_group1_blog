window.onload = function () {
  main_heading = document.getElementById("main_heading");
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:80/user_information", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var main_list = JSON.parse(this.responseText);
      if(main_list.Email==undefined){
          document.getElementById("User").style.display="none"
        }else{
            document.getElementById("Login_button").style.display="none"
            document.getElementById('signup_button').style.display="none"
            document.getElementById("User").style.display="inline-block"
            var span=document.createElement("span")
            span.innerHTML=`Hi ${main_list.Name}!!!`
            document.getElementById("User_Name").append(span)

      }
    }
  };
  xhttp.send();
};
