window.onload = function () {
  // add para function
  var img_count = 0;
  var main_container = document.getElementById("root");
  new_para = function () {
    var new_para_div_row = document.createElement("div");
    new_para_div_row.className = "row";
    new_para_div_row.id = "Para Div D" + ` ${img_count}`;
    main_container.append(new_para_div_row);
    var new_para_div_col = document.createElement("div");
    new_para_div_col.className = "col-11";
    new_para_div_row.append(new_para_div_col);
    var new_para = document.createElement("p");
    new_para.innerHTML = "Start Here";
    new_para.contentEditable = "True";
    new_para.className = "new_para";
    new_para_div_col.append(new_para);
  };

  new_para();
  // image onclick function
  insert_img = function () {
    var input_div = document.createElement("div");
    input_div.className = "input-group mb-3 col-10 not_required";
    input_div.id = "Input Div D" + ` ${img_count}`;
    main_container.append(input_div);
    var input_button = document.createElement("div");
    input_button.className = "btn btn-outline-secondary";
    input_button.innerHTML = "Insert Image";
    input_button.id = `${img_count}`;
    input_button.type = "button";
    input_div.append(input_button);
    var input = document.createElement("input");
    input.type = "text";
    input.className = "form-control ";
    input.id = "Input" + ` ${img_count}`;
    input.placeholder = "Enter the URL of the image";
    input_div.append(input);

    input_button.onclick = function () {
      if (input_button.innerHTML == "Insert Image") {
        input_button.innerHTML = "Change Image";
        var img_added_div_row = document.createElement("div");
        img_added_div_row.className = "row mb-5";
        img_added_div_row.id = "Image Div D" + ` ${img_count}`;
        main_container.append(img_added_div_row);
        var change_img_div = document.createElement("div");
        change_img_div.className = "col-1";
        img_added_div_row.append(change_img_div);
        var delete_button = document.createElement("div");
        delete_button.className = "btn btn-outline-secondary not_required";
        delete_button.innerHTML = "Delete";
        delete_button.id = "D" + ` ${img_count}`;
        delete_button.type = "button";
        change_img_div.append(delete_button);

        // change button onclick function
        delete_button.onclick = function () {
          document.getElementById("Input Div " + delete_button.id).remove();
          document.getElementById("Image Div " + delete_button.id).remove();
          document.getElementById("Para Div " + delete_button.id).remove();
        };
        var img_added_div_col = document.createElement("div");
        img_added_div_col.className = "col-11";
        img_added_div_row.append(img_added_div_col);
        var img_added = document.createElement("img");
        img_added.src = input.value;
        img_added.className = "rounded mx-auto d-block";
        img_added.id = "Image" + ` ${img_count}`;
        img_added_div_col.append(img_added);
        new_para();
        img_count = 1 + img_count;
      } else {
        new_source = document.getElementById("Input " + input_button.id);
        document.getElementById("Image " + input_button.id).src =
          new_source.value;
      }
    };
  };
  k_button = document.getElementById("Submit_krna");
  k_button.onclick = function () {
    try{
      document.getElementById("button-addon1").remove();
      var list = document.getElementsByClassName("not_required");
      var list_para = document.getElementsByClassName("new_para");
      var i=0
      while (list.length!=0) {
        list[i].remove();
      }
      var J = 0;
      while (J < list_para.length) {
        if (list_para[J].innerHTML != "Start Here") {
          list_para[J].contentEditable = "false";
        } else {
          list_para[J].remove();
          J--;
        }
        J++;
      }

    }finally{
      var root = document.getElementById("root").outerHTML;
      var arr = { content: root };
      // console.log(arr);
      var xhttp = new XMLHttpRequest();
      xhttp.open("POST", "http://localhost:80/publish_credentials", true);
      xhttp.setRequestHeader("Content-Type", "application/json");
      xhttp.send(JSON.stringify(arr),()=>{
        window.location.href = "/display"
      });
    }
  };
};
