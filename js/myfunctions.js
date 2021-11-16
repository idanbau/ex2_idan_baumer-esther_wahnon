'use strict';

// define our namespace :
// we write an anonymous function that builds and returns an object
// that encapsulates what we want to publish
let listModule = ( () => {

    // private/hidden members: an array of courses and a string of the HTML to display
    let tasks = [];

    // this is the object we want to return (anything we add will be public/visible)
    // we're going to add methods and a class definition
    let publicData = {};

    // sample private/hidden method
    function printCard(task) {

        if ( !task.title || !task.description )
        {
            return "<div class=\"card " +  (task.highPriority ? "  bg-light \">" : "bg-danger\">") +

                ( "\"please enter a non empty tittle with letters and digits only\"") +  "\n"+


                "</div></div>";
        }

        return "<li class=\"card " +
            (task.highPriority ? "bg-danger\">" : "bg-light\">") +
            "<div class=\"card-body\">" +
            "<h1 class=\"card-title\">" +
            task.title + "</h1>" +
            "<p class=\"card-text\">" +
            task.description + "</p>" +
            "<button type=\"button\" class=\"btn btn-danger\">Delete</button>" +
            "</div></li><p></p>";
    }

    function deleteCard(){
        for(let i = 0; i < tasks.length; i++){
            if(tasks[i].title === this.parentElement.firstElementChild.innerText &&
                tasks[i].description === this.parentElement.children[1].innerText)
            {
                tasks.splice(i, 1);
                break;
            }
        }
        this.parentElement.parentElement.remove();
    }

    function separator() {
        return (", ");
    }

    // add more public method
    publicData.addTask = function (task) {
        tasks.push(task);
    }
    publicData.sort = function(){
        tasks.sort((task1, task2) =>
        {return (task1.title > task2.title) ? 1 : -1});
    }
    publicData.addDeleteListeners = function(){
        document.querySelectorAll("ol > li > div > button").forEach(closeBtn =>{
            closeBtn.addEventListener('click', deleteCard);
        });
    }

    // add more public method
    // here we build the HTML using the printFunc for a single course
    publicData.buildHTMLTaskList = function () {
        let result = "<h2>List of Tasks</h2><ol>";
        for (const t of tasks) {
            result += printCard(t);
        }
        result += "</ol><br>";
        return result;
    }
    publicData.buildHTMLPriorityTaskList = function (){
        let result = "<h2>List of Tasks</h2><ol>";
        for (const t of tasks) {
            if (t.highPriority) {
                result += printCard(t);
            }
        }
        result += "</ol><br>";
        return result;
    }

    // we are also defining a class in that namespace !
    publicData.Task = class Task {
        constructor(title, description, highPriority) {
            this.title = title;
            this.description = description;
            this.highPriority = highPriority;
        }

    }

    // we return the object containing the 'public' functions
    return publicData;

}) ();  // end of definition and building of our namespace - pay attention to the () here

//create a couple print functions strategies


function addTask(){
    listModule.addTask(new listModule.Task(
        document.getElementById("inputTitle").value,
        document.getElementById("inputDescription").value,
        document.getElementById("highPriorityCheckBox").checked));
    document.getElementById("inputTitle").value = '';
    document.getElementById("inputDescription").value = '';
    document.getElementById("highPriorityCheckBox").checked = false;
    document.getElementById("tasksList").innerHTML = listModule.buildHTMLTaskList();
    listModule.addDeleteListeners();
}

function sort(){
    listModule.sort();
    document.getElementById("tasksList").innerHTML = listModule.buildHTMLTaskList();
    listModule.addDeleteListeners();
}

function highPriorityOnly(){
    document.getElementById("highPriorityOnlyBtn").hidden = true;
    document.getElementById("sortBtn").hidden = true;
    document.getElementById("tasksForm").hidden = true;
    document.getElementById("tasksList").innerHTML = listModule.buildHTMLPriorityTaskList();
    listModule.addDeleteListeners();
    let backBtn = document.createElement("button");
    backBtn.id = "back-btn";
    backBtn.appendChild(document.createTextNode("Back"));
    document.getElementById("menuBtn").appendChild(backBtn);
    backBtn.addEventListener('click', backToList);
}

function backToList()
{
    document.getElementById("back-btn").remove();
    document.getElementById("highPriorityOnlyBtn").hidden = false;
    document.getElementById("sortBtn").hidden = false;
    document.getElementById("tasksForm").hidden = false;
    document.getElementById("tasksList").innerHTML = listModule.buildHTMLTaskList();
    listModule.addDeleteListeners();
}

// TESTING OUR CODE
// initialize the array of courses

// PREPARE THE BUTTONS LISTENERS for testing
// wait for the DOM before reaching elements
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById("sortBtn").addEventListener('click', sort)
    document.getElementById("highPriorityOnlyBtn").addEventListener('click', highPriorityOnly)
    document.getElementById("addTaskBtn").addEventListener('click', addTask)
})