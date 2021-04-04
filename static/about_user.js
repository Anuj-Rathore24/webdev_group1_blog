window.onload = function () {
  var xhttp = new XMLHttpRequest();
  xhttp.open("POST", "http://localhost:80/blogs_information", true);
  xhttp.setRequestHeader("Content-Type", "application/json");
  xhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var main_list = JSON.parse(this.responseText);
      console.log(main_list.length);
      if (main_list.length != 0) {
        for (i = 0; i < main_list.length; i++) {
          console.log(main_list[0].content);
          create_blogcards(main_list[i]);
        }
      } else {
      }
    }
  };
  xhttp.send();

  var main_container = document.getElementById("root");
  create_blogcards = function (content_div) {
    console.log(content_div);
    console.log(content_div.content);
    var blog_container = document.createElement("div");
    blog_container.className = "container border blog_card m-3";
    main_container.append(blog_container);
    blog_container.innerHTML = content_div.content;
    blog_container.onclick = function () {
      console.log(this.outerHTML)
      console.log(this.innerHTML)
      var arr={content:this.innerHTML}
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", "http://localhost:80/view_myblog", true);
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.send(JSON.stringify(arr));
      window.location.href = "/display";
    };
  };
};
