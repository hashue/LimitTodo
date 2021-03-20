'use strict';
var prefix = 'LT_';
var TaskInfo = document.getElementById('task-info');
var limit = 0;
;
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
function createElement(elm, content) {
    var parts = document.createElement(elm);
    parts.textContent = content;
    return parts;
}
function createTaskCard(no, data) {
    var parent = document.getElementById('task-list');
    var div = document.createElement('div');
    div.className = ' task-card mx-24 p-8 shadow-lg bg-gray-100 rounded-md w-3/5';
    var taskInfo = document.createElement('p');
    taskInfo.textContent = data.slice(3);
    taskInfo.className = 'float-left mr-96 ml-16';
    var statusBtn = document.createElement('button');
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
    if (limit == 4)
        throw alert('追加可能数を超えています!');
    var timestamp = new Date().getTime();
    var task = {
        subject: TaskInfo.value,
        complete: 0,
        createdAt: timestamp,
    };
    var obj = JSON.stringify(task);
    localStorage.setItem(prefix + task.subject, obj);
    limit++;
    location.reload();
}
// set complete status
function setCompleteStatus(no) {
    console.log(no);
    var beforeSubject = localStorage.key(parseInt(no));
    console.log(beforeSubject);
    var updateData = {
        subject: beforeSubject,
        complete: 1,
    };
    console.log(updateData.subject);
    var obj = JSON.stringify(updateData);
    localStorage.setItem(updateData.subject, obj);
    location.reload();
}
function cmpTime(timestamp) {
    var nowTime = new Date().getTime();
    var diff = (nowTime - timestamp) / 1000;
    console.log(diff);
    //  const limit = 60 * 60 * 24;  // 24h
    var limit = 10;
    if (diff > limit)
        return 1;
    return 0;
}
// Display preset
window.onload = function () {
    for (var i = 0; i < localStorage.length; i++) {
        var taskName = localStorage.key(i);
        var taskData = JSON.parse(localStorage.getItem(taskName));
        if (cmpTime(taskData.createdAt) == 1)
            localStorage.removeItem(taskName);
        if (!taskName.includes(prefix) || taskData.complete == 1)
            continue;
        createTaskCard(i, taskName);
        limit++;
    }
};
