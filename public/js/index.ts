'use strict'

const prefix: string = 'LT_';
const TaskInfo: HTMLInputElement = <HTMLInputElement>document.getElementById('task-info');
let limit: number = 0;

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
  div.className = ' task-card mx-24 p-8 border-b h-8';

  //const taskInfo:HTMLElement = document.createElement('p');
  const taskInfo:HTMLElement = document.createElement('span');
  taskInfo.textContent = data.slice(3);
  taskInfo.className = ' ml-4';

  const statusBtn:HTMLElement = document.createElement('button');
  statusBtn.textContent = '完了';
  statusBtn.setAttribute('onclick', 'setCompleteStatus(this.value)');
  statusBtn.setAttribute('value', no.toString());


  const removeBtn:HTMLElement = document.createElement('button');
  removeBtn.textContent = '削除';
  removeBtn.setAttribute('onclick', 'removeTask(this.value)');
  removeBtn.setAttribute('value', no.toString());


  div.appendChild(statusBtn);
  div.appendChild(taskInfo);
  div.appendChild(removeBtn);
  parent.appendChild(div);
}


function store() {
  if (limit == 4) throw alert('追加可能数を超えています!');

  let timestamp = new Date().getTime();
  let task = {
    subject: TaskInfo.value,
    complete: 0,
    createdAt: timestamp,
  };
  let obj = JSON.stringify(task);
  localStorage.setItem(prefix + task.subject, obj);
  limit++;
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
    limit++;
  }
};

