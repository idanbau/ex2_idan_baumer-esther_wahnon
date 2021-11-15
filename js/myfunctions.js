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
    publicData.buildHTMLTaskList = function (printTitle, printDescription, isHighPriority) {
        let result = "<h2>List of Tasks</h2><ol>";
        for (let t of tasks) {
            result += "<div class=\"card " +
                (isHighPriority(t) ? "bg-danger\">" : "bg-light\">") +
            "<div class=\"card-body\">" +
                "<h1 className=\"card-title\">" +
                printTitle(t)+ "</h1>" +
                "<p className=\"card-text\">" +
                printDescription(t) + "</p>" +
                "<button type=\"button\" class=\"btn btn-danger\">Delete</button>" +
                "</div></div>";
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
    return task.title;
}

function printDescription(task) {
    return task.description;
}

function isHighPriority(task) {
    return task.highPriority;
}

function printCard(task){
    return ""
}

function addTask(){
    listModule.addTask(new listModule.Task(
        document.getElementById("inputTitle").value,
        document.getElementById("inputDescription").value,
        document.getElementById("highPriorityCheckBox").checked));
    document.getElementById("inputTitle").value = '';
    document.getElementById("inputDescription").value = '';
    document.getElementById("highPriorityCheckBox").checked = false;
    document.getElementById("tasksList").innerHTML = listModule.buildHTMLTaskList(printTitle,
        printDescription, isHighPriority);
}

function sort(){
    listModule.sort();
    document.getElementById("tasksList").innerHTML = listModule.buildHTMLTaskList(printTitle,
        printDescription, isHighPriority);
}
// TESTING OUR CODE
// initialize the array of courses

// PREPARE THE BUTTONS LISTENERS for testing
// wait for the DOM before reaching elements
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("sortBtn").addEventListener('click', sort)
    document.getElementById("addTaskBtn").addEventListener('click', addTask)
})