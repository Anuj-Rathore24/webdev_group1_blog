window.onload = function () {
  var submit_form = document.getElementById("Form");
  submit_form.onsubmit = function (e) {
    e.preventDefault();
    validateForm(e.target);
  };
  function validateForm(form) {
    // sending credentials
    var pass_element = form.password.value;
    var email_element = form.email.value;
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", "http://localhost:80/login_credentials", true);
    xhttp.setRequestHeader("Content-Type", "application/json");
    var Credentials = { email: email_element, password: pass_element };

    // asking if credentials entered are coorect or not
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        var main_list = JSON.parse(this.responseText);
        console.log(main_list);
        if (main_list.correct == "wrong") {
          alert("Wrong Password/Email entered");
        }
        if (main_list.correct == "correct") {
          window.location.href = "/";
        }
      }
    };
    xhttp.send(JSON.stringify(Credentials));
  }
  
};
