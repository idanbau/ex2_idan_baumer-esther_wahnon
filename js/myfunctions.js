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

    // add more public method
    // here we build the HTML using the printFunc for a single course
    publicData.buildHTMLTaskList = function (printTitle, printDescription) {
        let result = "<h2>List of Tasks</h2><ol>";
        for (let t of tasks) {
            result += "<div class=\"card\"" +
                "<div class=\"card-body\">" +
                "<h5 className=\"card-title\">" + printTitle(t)+
                "<p className=\"card-text\">" + printDescription(t);
        }
        result += "</ol><br>";
        return result;
    }

    // we are also defining a class in that namespace !
    // don't forget to name your classes with a UPPER CASE letter at the begining ("Course" and not "course")

    publicData.Task = class Task {
        constructor(title, description) {
            this.title = title;
            this.description = description;
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

// TESTING OUR CODE
// initialize the array of courses

// PREPARE THE BUTTONS LISTENERS for testing
// wait for the DOM before reaching elements
document.addEventListener('DOMContentLoaded', (event) => {

/*    document.getElementById("compact").addEventListener('click', function () {
        document.getElementById("clist").innerHTML = listModule.buildHTMLCourseList(printCompact);
    });

    document.getElementById("details").addEventListener('click', function () {
        document.getElementById("clist").innerHTML = listModule.buildHTMLCourseList(printFullDetails);
    });*/
    document.getElementById("addTaskBtn").addEventListener('click', function() {
        listModule.addTask(new listModule.Task(document.getElementById("inputTitle").value,
            document.getElementById("inputDescription").value));
        document.getElementById("tasksList").innerHTML = listModule.buildHTMLTaskList(printTitle, printDescription);
    });
});