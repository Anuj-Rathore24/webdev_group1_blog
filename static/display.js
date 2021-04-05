window.onload = function () {
  main_heading = document.getElementById("main_heading");
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:80/blog_display", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var main_list = JSON.parse(this.responseText);
      display_function(main_list);
    }
  };
  xhttp.send();

  display_function = function (item) {
    //   main_container=document.createElement("div")
    var main_container = document.getElementById("root");
    main_container.innerHTML = item.content;
    
  };
};
