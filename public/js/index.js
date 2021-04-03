'use strict';
var prefix = 'LT_';
var TaskInfo = document.getElementById('task-info');
var limit = 0;
;
//If press enter key,call store function
TaskInfo.addEventListener('keypress', function (e) {
    var key = e.keyCode;
    if (TaskInfo.value != "" && key == 13)
        store(); //13 == enter
});
// Create DOM Element
function createElement(elm, content) {
    var parts = document.createElement(elm);
    parts.textContent = content;
    return parts;
}
//create Task
function createTaskCard(no, data) {
    var parent = document.getElementById('task-list');
    var div = document.createElement('div');
    div.className = ' task-card mx-24 p-8 border-b h-8';
    //const taskInfo:HTMLElement = document.createElement('p');
    var taskInfo = document.createElement('span');
    taskInfo.textContent = data.slice(3);
    taskInfo.className = ' ml-4';
    var statusBtn = document.createElement('button');
    statusBtn.textContent = '完了';
    statusBtn.setAttribute('onclick', 'setCompleteStatus(this.value)');
    statusBtn.setAttribute('value', no.toString());
    var removeBtn = document.createElement('button');
    removeBtn.textContent = '削除';
    removeBtn.setAttribute('onclick', 'removeTask(this.value)');
    removeBtn.setAttribute('value', no.toString());
    div.appendChild(statusBtn);
    div.appendChild(taskInfo);
    div.appendChild(removeBtn);
    parent.appendChild(div);
}
function store() {
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
    var beforeSubject = localStorage.key(parseInt(no));
    var updateData = {
        subject: beforeSubject,
        complete: 1,
    };
    var obj = JSON.stringify(updateData);
    localStorage.setItem(updateData.subject, obj);
    location.reload();
}
function cmpTime(timestamp) {
    var nowTime = new Date().getTime();
    var diff = (nowTime - timestamp) / 1000;
    var limit = 60 * 60 * 24; // 24h
    if (diff > limit)
        return 1;
    return 0;
}
function removeTask(no) {
    localStorage.removeItem(localStorage.key(no));
    location.reload();
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
