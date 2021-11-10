

document.addEventListener('DOMContentLoaded', () =>
{
    document.querySelector("button ").addEventListener("click", createItem);
});

function deleteItem(event)
{

    this.parentElement.remove();
}

function createItem()
{
    let list = document.getElementById("list1") ;

    // create and insert the <li> item using DOM functions (method 1)
    let newitem = document.createElement("li");
    // read input text and create the text node
    let newtext = document.createTextNode(document.getElementById("user-input").value);
    newitem.appendChild(newtext);

    // add the X button next to the new item
    let b = document.createElement("button");
    b.innerHTML = "<span> X </span>"; //insert  manually HTML string (method 2)

    newitem.appendChild(b);

    b.addEventListener('click', deleteItem); // removeListener

    list.appendChild(newitem); // attach the new item
}




