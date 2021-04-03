'use strict'

const prefix: string = 'LT_';
const TaskInfo: HTMLInputElement = <HTMLInputElement>document.getElementById('task-info');
let counter: number = 0;
let taskLimit: number = 4;
const removeIcon:string = `
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class='w-5 h-5'>
    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
  </svg>
`

interface Task{
  subject:string;
  complete:number;
  createdAt:number;
};

//If press enter key,call store function
TaskInfo.addEventListener('keypress',(e)=>{
  const key:number = e.keyCode;
  if(TaskInfo.value!="" && key == 13) store(); //13 == enter
});


// Create DOM Element
function createElement(elm:string, content:string):HTMLElement {
  const parts = document.createElement(elm);
  parts.textContent = content;
  return parts;
}

//create Task
function createTaskCard(no:number, data:string) {

  const parent:HTMLElement = document.getElementById('task-list');
  const div:HTMLElement = document.createElement('div');
  div.className = 'task-card p-8 border-b h-8';

  const taskInfo:HTMLElement = document.createElement('span');
  taskInfo.textContent = data.slice(3);
  taskInfo.className = ' ml-4';

  const buttonWrapper:HTMLElement = document.createElement('div');
  buttonWrapper.className = "text-right"


  const statusBtn:HTMLElement = document.createElement('input');
  statusBtn.textContent = '完了';
  statusBtn.setAttribute('onclick', 'setCompleteStatus(this.value)');
  statusBtn.setAttribute('type', 'checkbox');
  statusBtn.setAttribute('value', no.toString());

  const removeBtn:HTMLElement = document.createElement('button');
  removeBtn.setAttribute('onclick', 'removeTask(this.value)');
  removeBtn.setAttribute('value', no.toString());
  removeBtn.className = 'float-right'
  removeBtn.innerHTML = removeIcon;

  div.appendChild(statusBtn);
  div.appendChild(taskInfo);
  div.appendChild(removeBtn);
  parent.appendChild(div);
}


function store() {
  if (counter == taskLimit) throw alert('追加可能数を超えています!');

  let timestamp = new Date().getTime();
  let task = {
    subject: TaskInfo.value,
    complete: 0,
    createdAt: timestamp,
  };
  let obj = JSON.stringify(task);
  localStorage.setItem(prefix + task.subject, obj);
  counter++;
  location.reload();
}

// set complete status
function setCompleteStatus(no:string) {
  let beforeSubject:string = localStorage.key(parseInt(no));

  let updateData = {
    subject: beforeSubject,
    complete: 1,
  };

  let obj = JSON.stringify(updateData);
  localStorage.setItem(updateData.subject, obj);
  location.reload();
}

function cmpTime(timestamp:number):number {
  let nowTime:number = new Date().getTime();
  let diff:number = (nowTime - timestamp) / 1000;
  const limit = 60 * 60 * 24;  // 24h
  if (diff > limit) return 1;
  return 0;
}

function removeTask(no:number){
  localStorage.removeItem(localStorage.key(no));
  location.reload();
}

// Display preset
window.onload = function() {
  for (let i = 0; i < localStorage.length; i++) {
    const taskName:string = localStorage.key(i);
    let taskData:Task = JSON.parse(localStorage.getItem(taskName));

    if (cmpTime(taskData.createdAt) == 1) localStorage.removeItem(taskName);

    if (!taskName.includes(prefix) || taskData.complete == 1) continue;
    createTaskCard(i, taskName);
    counter++;
    let remainTask:number= taskLimit - counter;
    const limitCountElm:HTMLElement = document.getElementById("task-limit");
    limitCountElm.textContent = "残り追加可能タスク数: "+remainTask.toString();
  }
};

