window.onload=function(){
    var submit_form = document.getElementById("Form");
    submit_form.onsubmit = function (e) {
        e.preventDefault();
        console.log(e.target.confirm_password) 
        if(e.target.confirm_password.value==e.target.password.value){
            validateForm(e.target);
        }else{
            alert("Incorrect password")
        }
  };
    validateForm=function(form){
        var pass_element = form.password.value;
        var email_element = form.email.value;
        var Last_name = form.Last_name.value;
        var First_name = form.First_name.value;
        var xhttp = new XMLHttpRequest();
        xhttp.open("POST", "http://localhost:80/sign_up_credentials", true);
        xhttp.setRequestHeader("Content-Type", "application/json");
        var Credentials = { email: email_element, password: pass_element, l_name: Last_name, f_name: First_name };
        xhttp.send(JSON.stringify(Credentials))

    }
}