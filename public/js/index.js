'use strict'

const prefix = 'LT_';
const TaskInfo = document.getElementById('task-info');
const parent = document.getElementById('task-list');

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
  let task = {
    subject: TaskInfo.value,
    complete: 0,
  };
  console.log(task.subject);
  let obj = JSON.stringify(task);
  localStorage.setItem(prefix + task.subject, obj);
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

// Display preset
window.onload = function() {
  if (localStorage.length == 0) {
    const msg = createElement('p', 'タスクがありません');
    console.log(msg);
  } else {
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);

      let obj = localStorage.getItem(key);
      let taskData = JSON.parse(obj);
      console.log(taskData);
      if (!taskData.includes(prefix)) continue;
      createTaskCard(i, taskData);
    }
  }
};
