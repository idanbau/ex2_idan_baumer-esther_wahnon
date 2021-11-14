'use strict';


document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("addTaskBtn").addEventListener("click", createItem);
});

// delete the item of corresponding <li>
function deleteItem(event) {
    // NOTE THAT:
    // event.target == this

    // You could write this:
    // this.parentElement.parentElement.removeChild(this.parentElement);
    // or simply that:
    this.parentElement.remove();
}

function createItem() {
    var list = document.getElementById("list1");

    // create and insert the <li> item using DOM functions (method 1)
    var newitem = document.createElement("li");
    // read input text and create the text node
    var newtext = document.createTextNode(document.getElementById("inputTitle").value);
    newitem.appendChild(newtext);

    // add the X button next to the new item
    var b = document.createElement("button");
    b.innerHTML = "<span> X </span>"; //insert  manually HTML string (method 2)

    newitem.appendChild(b);

    b.addEventListener('click', deleteItem); // removeListener

    list.appendChild(newitem); // attach the new item
}
/*

let Task = class {
    constructor(title, description, highPriority){
        this.title = title;
        this.description = description;
        this.highPriority = highPriority;
    }
}

let tasks = []

function createItem() {
    var list = document.getElementById("list1") ;

    // create and insert the <li> item using DOM functions (method 1)
    var newitem = document.createElement("li");
    // read input text and create the text node
    var newtext = document.createTextNode("check");
    newitem.appendChild(newtext);
    list.appendChild(newitem); // attach the new item
}


function addTask(){
/!*    let task = new Task(document.getElementById("title").value, document.getElementById("description").value,
        document.getElementById("highPriority").value);
    tasks.push(task);*!/
    let list = document.getElementById("cardsList");
    let a = document.createElement("li");
    let varText = document.createTextNode("sometext");
    a.appendChild(varText);
    list.appendChild(a);
    // a.className = "card";
    // a.innerHTML = "<div class=\"card-header\">\n" +
    //                    task.title +
    //     "            </div>\n" +
    //     "            <div class=\"card-body\">\n" +
    //     "                <h5 class=\"card-title\">Special title treatment</h5>\n" +
    //     "                <p class=\"card-text\">With supporting text below as a natural lead-in to additional content.</p>\n" +
    //     "                <a href=\"#\" class=\"btn btn-primary\">Go somewhere</a>\n" +
    //     "            </div>";
    }

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("addTaskBtn").addEventListener("click", createItem);
});*/
