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
        var blog_container = document.createElement("div");
        blog_container.className = "container border blog_card m-3 empty_blog";
        blog_container.style.cursor="default"
        document.getElementById("root").append(blog_container);
        var text=document.createElement("h2")
        text.className="text"
        text.innerHTML="You Haven't Posted Any Blogs"
        blog_container.append(text)
        var button=document.createElement("button")
        button.className="btn btn-outline-primary"
        button.innerHTML="Write More"
        button.onclick=function(){
            window.location.href = "/posting"
        }
        blog_container.append(button)
      }
    }
  };
  xhttp.send();

  var main_container = document.getElementById("root");
  create_blogcards = function (content_div) {
    var blog_container = document.createElement("div");
    blog_container.className = "container border blog_card m-3";
    main_container.append(blog_container);
    blog_container.innerHTML = content_div.content;
    blog_container.onclick = function () {
      var arr = { content: this.innerHTML };
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", "http://localhost:80/view_myblog", true);
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.send(JSON.stringify(arr));
      window.location.href = "/display";
    };
  };
};
