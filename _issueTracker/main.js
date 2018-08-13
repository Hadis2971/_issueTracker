var clock = '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 1000 1000" enable-background="new 0 0 1000 1000" xml:space="preserve"><metadata> Svg Vector Icons : http://www.onlinewebfonts.com/icon </metadata><g><g transform="translate(0.000000,511.000000) scale(0.100000,-0.100000)"><path d="M4660,5007.5c-1078.1-95.8-1990.5-461.2-2785.1-1116C906.6,3092.9,301.7,1990.8,124,697.1C92,463.5,92-251.3,124-480.9c157.7-1126,599-2042.4,1361.6-2831c772.7-802.6,1750.9-1287.8,2924.9-1455.5c267.5-37.9,964.3-31.9,1247.8,12c1122,169.7,2030.5,622.9,2807.1,1397.6c774.7,776.6,1227.9,1685,1397.6,2807.1c43.9,283.5,49.9,980.3,12,1247.8c-141.8,992.3-495.1,1814.8-1096.1,2539.6C7984.2,4197,6880.2,4805.9,5608.4,4979.6C5440.7,5003.6,4813.8,5021.5,4660,5007.5z M5420.7,4300.8c1750.9-177.7,3228.3-1449.5,3659.6-3150.5c99.8-389.3,119.8-563,119.8-1042.2c0-479.2-20-652.9-119.8-1042.2C8740.9-2273.7,7734.7-3381.8,6421-3857c-483.2-175.7-844.5-235.6-1421.5-235.6c-479.2,0-652.9,20-1042.2,119.8c-1373.6,347.4-2501.6,1397.6-2954.8,2747.2C263.7,984.6,1473.6,3386.4,3691.7,4111.1C4246.8,4292.8,4843.7,4358.7,5420.7,4300.8z"/><path d="M4865.7,2573.8c-129.8-55.9-125.8-22-125.8-1351.6c0-1172,2-1205.9,39.9-1269.8c24-37.9,75.9-81.9,125.8-103.8c79.9-37.9,149.7-39.9,1768.9-39.9c1639.1,0,1689,2,1768.9,39.9c105.8,49.9,149.7,127.8,149.7,259.5c0,131.8-43.9,209.6-149.7,259.6c-79.9,37.9-127.8,39.9-1593.2,39.9H5338.8v1008.2c0,1122,2,1104.1-129.8,1160C5123.2,2611.7,4949.5,2609.7,4865.7,2573.8z"/></g></g></svg>'


var myStorage = localStorage;
var app_data = (myStorage.getItem("issue_obj_arr"))? JSON.parse(myStorage.getItem("issue_obj_arr")):{
    issue_arr : [],
    id_arr: []
};
var str = "";
var letter_arr = [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119, 120, 121, 122];
var arr_str = [], final_str = "", is_valid = true;
render_from_storage();
var btn = document.getElementsByTagName("button")[0];




function update_localStorage(){
    myStorage.setItem("issue_obj_arr",JSON.stringify(app_data));
}

function render_from_storage(){
    var i;
    for(i = 0; i < app_data.issue_arr.length; i++){
        str = app_data.id_arr[i];
        add_issue2(app_data.issue_arr[i].issue,app_data.issue_arr[i].severity,
                 app_data.issue_arr[i].name);
        
        
    }
}

function Issue_obj(issue, severity, name){
    this.issue = issue;
    this.severity = severity;
    this.name = name;
};

function form_validation(issue,name){
    if(/\d/.test(issue) || /\d/.test(name)){
        is_valid = false;
    }else if(/[^a-zA-Z ]/g.test(issue)
            || /[^a-zA-Z ]/g.test(name)){
        is_valid = false;
    }else{
        is_valid = true;
    }
}

function get_add_issue_values(){
    var issue = document.getElementById("describe_text").value;
    var name  = document.getElementById("assigned_to").value;
    var severity = document.getElementById("severity").value;
    form_validation(issue,name);
    if(issue && name && severity && is_valid){
        var newObj = new Issue_obj(issue, severity, name);
        app_data.issue_arr.push(newObj);
        update_localStorage();
        add_issue(issue,severity,name);
    }else if(!issue && !name && is_valid){
        alert("Please fill out all fields!!!");
    }else if(issue && severity && name && !is_valid){
        alert("No special characters or numbers are allowd in input fields!!!");
    }
    
    document.getElementById("describe_text").value = "";
    document.getElementById("assigned_to").value = "";
    //document.getElementById("severity").value = "Low";
};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}



function id_func(){
    
    var random_arr = [];
    var random_arr_2 = [];
    var number_part = Math.round(Math.random() * 10000);
    var random_arr = number_part.toString().split("");
    random_arr.push(String.fromCharCode(letter_arr[Math.floor(Math.random() * 26)]));
    random_arr.push(String.fromCharCode(letter_arr[Math.floor(Math.random() * 26)]));
    
    random_arr_2 = shuffle(random_arr);
    arr_str.push(random_arr.join(""));
    
}

function geting_the_id_str(){
    var brojac = 0, final_str = "";
    var i;
    for(i = 0; i < 5; i++){
        id_func();
    }
    app_data.id_arr.push(arr_str.join("-"));
    update_localStorage();
    /*
    if(app_data.id_arr.length){
        if(app_data.id_arr.indexOf(arr_str.join("-")) === -1){
            arr_str = [];
            geting_the_id_str();
        }else{
            app_data.id_arr.push(arr_str.join("-"));
        }
    }else{
        app_data.id_arr.push(arr_str.join("-"));
    }*/
    
}

function change_open_close(){
    var open_button = this.parentNode.parentNode.childNodes[1]
    if(open_button.textContent === "Open"){
        open_button.textContent = "Closed";
        open_button.style.backgroundColor = "#ff751a";
        this.textContent = "Open";
    }else{
        open_button.textContent = "Open";
        open_button.style.backgroundColor = "#33ccff";
        this.textContent = "Closed";
    }
}

function remove_item(){
    var parent = this.parentNode.parentNode.parentNode;
    var child  = this.parentNode.parentNode;
    app_data.issue_arr.splice(app_data.issue_arr.indexOf(child.childNodes[2].textContent),1)
    var str = child.childNodes[0].textContent;
    var sub_str = str.substring(10,str.length);
        
    app_data.id_arr.splice(app_data.id_arr.indexOf(sub_str));
    update_localStorage();
    parent.removeChild(child);
}

function add_issue(issue,severity,name){
    var list_container = document.getElementById("list_container");
    
    var item = document.createElement("div");
    item.classList.add("jumbotron");
    geting_the_id_str();
    var paragraph = document.createElement("p");
    var para_text = document.createTextNode("Issue ID: " + arr_str.join("-"));
    arr_str = [];
    paragraph.appendChild(para_text);
    paragraph.classList.add("paragraph_class");
    
    var open_button = document.createElement("button");
    var open_button_text = document.createTextNode("Open");
    open_button.appendChild(open_button_text);
    
    open_button.className += "btn btn-sm open_button_class";
    
    var issue_text = document.createElement("h1");
    issue_text.textContent = issue;
    issue_text.className += "issue_text_class";
    
    var status_div = document.createElement("div");
    var span1 = document.createElement("span");
    var img1 = document.createElement("img");
    img1.src = "clock.svg";
    span1.textContent = severity;
    var span2 = document.createElement("span");
    span2.textContent = name;
    var img2 = document.createElement("img");
    img2.src = "user.svg"
    status_div.appendChild(img1);
    status_div.appendChild(span1);
    status_div.appendChild(img2);
    status_div.appendChild(span2);
    
    status_div.classList.add("status_div_class");
    
    var buttons_div = document.createElement("div");
    buttons_div.classList.add("buttons_div_class");
    var close_btn = document.createElement("button");
    close_btn.addEventListener("click",change_open_close);
    close_btn.textContent = "Close";
    var delete_btn = document.createElement("button");
    delete_btn.addEventListener("click",remove_item);
    delete_btn.textContent = "Delete";
    close_btn.className += "btn btn-warning";
    delete_btn.className += "btn btn-danger";
    buttons_div.appendChild(close_btn);
    buttons_div.appendChild(delete_btn);
    
    item.appendChild(paragraph);
    item.appendChild(open_button);
    item.appendChild(issue_text);
    item.appendChild(status_div);
    item.appendChild(buttons_div);
    
    list_container.insertBefore(item,list_container.childNodes[0]);    
}

function add_issue2(issue,severity,name){
    var list_container = document.getElementById("list_container");
    
    var item = document.createElement("div");
    item.classList.add("jumbotron");
    
    var paragraph = document.createElement("p");
    var para_text = document.createTextNode("Issue ID: " + str);
    arr_str = [];
    paragraph.appendChild(para_text);
    paragraph.classList.add("paragraph_class");
    
    var open_button = document.createElement("button");
    var open_button_text = document.createTextNode("Open");
    open_button.appendChild(open_button_text);
    
    open_button.className += "btn btn-sm open_button_class";
    
    var issue_text = document.createElement("h1");
    issue_text.textContent = issue;
    issue_text.className += "issue_text_class";
    
    var status_div = document.createElement("div");
    var span1 = document.createElement("span");
    var img1 = document.createElement("img");
    img1.src = "clock.svg";
    span1.textContent = severity;
    var span2 = document.createElement("span");
    span2.textContent = name;
    var img2 = document.createElement("img");
    img2.src = "user.svg"
    status_div.appendChild(img1);
    status_div.appendChild(span1);
    status_div.appendChild(img2);
    status_div.appendChild(span2);
    
    status_div.classList.add("status_div_class");
    
    var buttons_div = document.createElement("div");
    buttons_div.classList.add("buttons_div_class");
    var close_btn = document.createElement("button");
    close_btn.addEventListener("click",change_open_close);
    close_btn.textContent = "Close";
    var delete_btn = document.createElement("button");
    delete_btn.addEventListener("click",remove_item);
    delete_btn.textContent = "Delete";
    close_btn.className += "btn btn-warning";
    delete_btn.className += "btn btn-danger";
    buttons_div.appendChild(close_btn);
    buttons_div.appendChild(delete_btn);
    
    item.appendChild(paragraph);
    item.appendChild(open_button);
    item.appendChild(issue_text);
    item.appendChild(status_div);
    item.appendChild(buttons_div);
    
    list_container.insertBefore(item,list_container.childNodes[0]);    
}


btn.addEventListener("click",get_add_issue_values);













