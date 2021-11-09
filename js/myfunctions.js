

    class Task
    {
        constructor(title, description, highPriority){
            this.title = title;
            this.description = description;
            this.highPriority = highPriority;
        }
    }

    let tasksList = []

    class Course {
    #example = ""; // example of private member

    // the ctor
    constructor (courseName, credits, lecturer) {
    this.courseName = courseName;
    this.credits = credits;
    this.lecturer = lecturer;
}
    #examplePrivate() { // example of private method
}
}

    // an array of courses and a string of the HTML to display
    let coursesList = [];
    let result = "";
    const separator = ", "

    function printCompact (course) {
    return course.courseName;
}

    function printFullDetails (course) {
    return (course.courseName
    + separator + course.lecturer
    + separator + course.credits
    + " credits ");
}

    // function expression, arrow style
    let addCourse =  (course) => {
    coursesList.push(course);
}
    // same as
    // function addCourse(course) {
    //     coursesList.push(course);
    // }

    //function buildHTMLCourseList (printFunct) {
    var buildHTMLCourseList =  (printFunct) => {
    var result = "<h2>List of Courses</h2><ol>";
    for (var c of coursesList) {
    result += "<li>" + printFunct(c) + "</li>";
}
    result += "</ol>";
    return result;
}


    // TESTING OUR CODE  - in general there is no such code in global scope
    // initialize the array of courses
    addCourse(new Course("Internet Programming", 4, "Dr. Cohen"));
    addCourse(new Course("Architecture", 5, "Dr. Levy"));

    // PREPARE THE BUTTONS LISTENERS for testing
    // wait for the DOM before reaching elements
    window.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById("compact").addEventListener('click', () => {
    // display the HTML
    document.getElementById("clist").innerHTML = buildHTMLCourseList(printCompact);
});

    document.getElementById("details").addEventListener('click', () => {
    // display the HTML
    document.getElementById("clist").innerHTML = buildHTMLCourseList(printFullDetails);
});
});




