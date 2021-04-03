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
    main_container.outerHTML = item.content;
    document.getElementById("button-addon1").remove();
    var list = document.getElementsByClassName("not_required");
    var list_para = document.getElementsByClassName("new_para");
    for (i = 0; i < list.length; i++) {
      console.log(list[i]);
      list[i].remove();
      console.log("working");
    }
    for (i = 0; i < list_para.length; i++) {
      list_para[i].contentEditable = "false";
    }
  };
};
