const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const inputTime = document.getElementById("inputTime");
const sortBtn = document.getElementById("sortBtn");

let tasks = [];
let sortMode = 0; 

function addTask() {
    const taskText = inputBox.value.trim();
    let time = parseInt(inputTime.value);
    if (taskText === "" || isNaN(time) || time <= 0) {
        alert("შეიყვანეთ ტექსტი და სწორი დრო");
        return;
    }
    tasks.unshift({ text: taskText, time: time, checked: false });
    inputBox.value = "";
    inputTime.value = "";
    renderTasks();
}

function renderTasks() {
    listContainer.innerHTML = "";
    tasks.forEach((task, index) => {
        let li = document.createElement("LI");
        li.innerHTML = `${task.text} | დარჩენილი დრო: ${task.time} წამი`;
        if (task.checked) {
            li.classList.add("checked");
        }
        li.onclick = function () {
            task.checked = !task.checked;
            renderTasks();
        };
        let span = document.createElement("span");
        span.innerHTML = "x";
        span.onclick = function (e) {
            e.stopPropagation(); 
            tasks.splice(index, 1);
            renderTasks();
        };
        li.appendChild(span);
        listContainer.appendChild(li);
    });
}


sortBtn.addEventListener("click", function () {
    let interval;
    let count = 0;
    interval = setInterval(() =>{
        count ++;
         sortMode = (sortMode + 1) % 3; 
    if (sortMode === 0) {
        tasks.sort((a, b) => a.time - b.time);
    } else if (sortMode === 1){
        tasks.sort((a, b) => b.time - a.time);
    } else if (sortMode === 2){
    tasks.sort((a, b) => a.time - b.time);
    }
    tasks.sort((a, b) => a.checked - b.checked);

    renderTasks();
    if(count==1){
        clearInterval(interval);
    }
    },500)

});


