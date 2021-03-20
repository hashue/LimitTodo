'use strict'

const prefix: string = 'LT_';
const TaskInfo: HTMLInputElement = <HTMLInputElement>document.getElementById('task-info');
let limit: number = 0;

interface Task{
  subject:string;
  complete:number;
  createdAt:number;
};

// setTimeout(forceRemoveTask(), 10000);
// 
// function forceRemoveTask() {
//   for (let i = 0; i < localStorage.length; i++) {
//     const taskName: string = localStorage.key(i);
//     let obj = localStorage.getItem(taskName) as string;
//     // let taskData: any = JSON.parse(obj);
//     // if (cmpTime(taskData.createdAt) == 1) localStorage.removeItem(taskName);
//     if (!taskName.includes(prefix)) continue;
//   }
// }

// Create DOM Element
function createElement(elm:string, content:string):HTMLElement {
  const parts = document.createElement(elm);
  parts.textContent = content;
  return parts;
}


function createTaskCard(no:number, data:string) {
  const parent:HTMLElement = document.getElementById('task-list');
  const div:HTMLElement = document.createElement('div');
  div.className = ' task-card mx-24 p-8 shadow-lg bg-gray-100 rounded-md w-3/5';

  const taskInfo:HTMLElement = document.createElement('p');
  taskInfo.textContent = data.slice(3);
  taskInfo.className = 'float-left mr-96 ml-16';

  const statusBtn:HTMLElement = document.createElement('button');
  statusBtn.textContent = '完了';
  statusBtn.setAttribute('onclick', 'setCompleteStatus(this.value)');
  statusBtn.setAttribute('value', no.toString());
  statusBtn.className = 'mx-8 inset-y-0.right-0 absolute';

  div.appendChild(taskInfo);
  div.appendChild(statusBtn);
  parent.appendChild(div);
}


function store() {
  console.log(limit);
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
  console.log(no);
  let beforeSubject:string = localStorage.key(parseInt(no));
  console.log(beforeSubject);

  let updateData = {
    subject: beforeSubject,
    complete: 1,
  };

  console.log(updateData.subject);
  let obj = JSON.stringify(updateData);
  localStorage.setItem(updateData.subject, obj);
  location.reload();
}

function cmpTime(timestamp:number) {
  let nowTime:number = new Date().getTime();
  let diff:number = (nowTime - timestamp) / 1000;
  console.log(diff);
  //  const limit = 60 * 60 * 24;  // 24h
  const limit:number = 10;
  if (diff > limit) return 1;
  return 0;
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

