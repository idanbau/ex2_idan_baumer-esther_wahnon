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
    function isHighPriority(task)
    {
        return task.highPriority;
    }

    // add more public method
    publicData.addTask = function (task) {
        tasks.push(task);
    }

    // add more public method
    // here we build the HTML using the printFunc for a single course
    publicData.buildHTMLTaskList = function (printTitle, printDescription) {
        let result = "<h2>List of Tasks</h2><ol>";
        for (let t of tasks) {
            result += "<div class=\"card\">" +
                "<div class=\"card-body\">" +
                "<h1 className=\"card-title\">" +
                printTitle(t)+ "</h1>" +
                "<p className=\"card-text\">" +
                printDescription(t) + "</p>" +
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

function addTask(){
    listModule.addTask(new listModule.Task(document.getElementById("inputTitle").value,
        document.getElementById("inputDescription").value,
        document.getElementById("highPriorityCheckBox").checked));
    document.getElementById("inputTitle").value = '';
    document.getElementById("inputDescription").value = '';
    document.getElementById("tasksList").innerHTML = listModule.buildHTMLTaskList(printTitle, printDescription);
}

// TESTING OUR CODE
// initialize the array of courses

// PREPARE THE BUTTONS LISTENERS for testing
// wait for the DOM before reaching elements
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById("addTaskBtn").addEventListener('click', addTask)
});