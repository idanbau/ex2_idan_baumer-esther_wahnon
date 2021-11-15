'use strict';

// define our namespace :
// we write an anonymous function that builds and returns an object
// that encapsulates what we want to publish
let listModule = ( () => {

    // private/hidden members: an array of courses and a string of the HTML to display
    let tasks = [];

    // this is the object we want to return (anything we add will be public/visible)
    // we're going to add methods and a class definition
    let publicData = {}

    // sample private/hidden method
    function printCard(task) {

    if ( ! printTitle(task) || !printDescription(task))
    {
        return "<div class=\"card " +
            "<h1 class=\"card-tittle\">" +
            ( "\"please enter a non empty tittle with letters and digits only\"") +

            "</div></div>";
    }


        return "<div class=\"card " +
            (isHighPriority(task) ? "bg-danger\">" : "bg-light\">") +
            "<div class=\"card-body\">" +
            "<h1 class=\"card-title\">" +
            ( printTitle(task)+ "</h1>") +
            "<p class=\"card-text\">" +
            (printDescription(task) + "</p>") +
            "<button type=\"button\" class=\"btn btn-danger\">Delete</button>" +
            "</div></div>";
    }

    function deleteCard(){
        this.parentElement().delete();
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
        {return (task1.title < task2.title) ? 1 : -1});
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
    publicData.buildHTMLPriorityTaskList = function (isHighPriority){
        let result = "<h2>List of Tasks</h2><ol>";
        for (const t of tasks) {
            if (isHighPriority(t)) {
                result += printCard(t);
            }
        }
        result += "</ol><br>";
        return result;
    }

    // we are also defining a class in that namespace !
    // don't forget to name your classes with a UPPER CASE letter at the begining ("Course" and not "course")

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
function printTitle(task) {

    if ( task.title === "")
        return false;

    return task.title;
}

function printDescription(task) {

    if ( task.description === "")
        return false;


    return task.description;
}

function isHighPriority(task) {
    return task.highPriority;
}

function addTask(){


    listModule.addTask(new listModule.Task(
        document.getElementById("inputTitle").value,
        document.getElementById("inputDescription").value,
        document.getElementById("highPriorityCheckBox").checked));
    document.getElementById("inputTitle").value = '';
    document.getElementById("inputDescription").value = '';
    document.getElementById("highPriorityCheckBox").checked = false;
    document.getElementById("tasksList").innerHTML = listModule.buildHTMLTaskList();
}

function sort(){
    listModule.sort();
    document.getElementById("tasksList").innerHTML = listModule.buildHTMLTaskList();
}

function highPriorityOnly(){

    document.getElementById("tasksList").innerHTML = listModule.buildHTMLPriorityTaskList(isHighPriority);
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