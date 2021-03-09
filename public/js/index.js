'use strict'

const prefix = 'LT_';
const TaskInfo = document.getElementById('task-info');
const parent = document.getElementById('task-list');
let limit= 0;

setTimeout(function(){limit = 0;},60000);

// Create DOM Element
function createElement(elm, content) {
  const parts = document.createElement(elm);
  parts.textContent = content;
  return parts;
}

function createTaskCard(no, data) {
  const div = document.createElement('div');
  div.setAttribute('class', 'task-card');

  const taskInfo = document.createElement('p');
  taskInfo.textContent = data.slice(3);

  const statusBtn = document.createElement('button');
  statusBtn.textContent = '完了';
  statusBtn.setAttribute('onclick', 'setCompleteStatus(this.value)');
  statusBtn.setAttribute('value', no);

  div.appendChild(taskInfo);
  div.appendChild(statusBtn);
  parent.appendChild(div);
}


function store() {

  console.log(limit);
  if(limit == 4) throw alert('追加可能数を超えています!');

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

function setCompleteStatus(no) {
  console.log(no);
  let beforeData = localStorage.key(no);
  console.log(beforeData);

  let updateData = {
    subject: beforeData,
    complete: 1,
  };

  console.log(updateData.subject);
  let obj = JSON.stringify(updateData);
  localStorage.setItem(updateData.subject, obj);
  location.reload();
}

function cmpTime(timestamp) {
  let nowTime = new Date().getTime();
  let diff = (nowTime - timestamp) / 1000;
  console.log(diff);
  const limit = 60*60*24; //24h
  if(diff > limit) return 1;
  return 0;
}

// Display preset
window.onload = function() {
  if (localStorage.length == 0) {
    const msg = createElement('p', 'タスクがありません');
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      const taskName = localStorage.key(i);
      let obj = localStorage.getItem(taskName);
      let taskData = JSON.parse(obj);

      if(cmpTime(taskData.createdAt) == 1)
        localStorage.removeItem(taskName);

      if (!taskName.includes(prefix) || taskData.complete == 1) continue;
      createTaskCard(i, taskName);
      limit++;
    }
  }
};
