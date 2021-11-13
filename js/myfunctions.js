'use strict';

let Task = class {
    constructor(title, description, highPriority){
        this.title = title;
        this.description = description;
        this.highPriority = highPriority;
    }

}

let tasks = []



let addTask = function(){
    let task = new Task(document.getElementById("title").value, document.getElementById("description").value,
        document.getElementById("highPriority").value);
    tasks.push(task);
    let list = document.getElementById("cardsList");
    let a = document.createElement("li");
    a.className("card");
    a.innerHTML = "<div class=\"card-header\">\n" +
                       task.title +
        "            </div>\n" +
        "            <div class=\"card-body\">\n" +
        "                <h5 class=\"card-title\">Special title treatment</h5>\n" +
        "                <p class=\"card-text\">With supporting text below as a natural lead-in to additional content.</p>\n" +
        "                <a href=\"#\" class=\"btn btn-primary\">Go somewhere</a>\n" +
        "            </div>";
    list.appendChild(a);
    }

document.addEventListener('DOMContentLoaded', ()=>{
    document.getElementById("addTask").addEventListener("click", addTask)
})