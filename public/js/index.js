'use strict';
var prefix = 'LT_';
var TaskInfo = document.getElementById('task-info');
var counter = 0;
var taskLimit = 4;
var removeIcon = "\n  <svg xmlns=\"http://www.w3.org/2000/svg\" fill=\"none\" viewBox=\"0 0 24 24\" stroke=\"currentColor\" class='w-5 h-5'>\n    <path stroke-linecap=\"round\" stroke-linejoin=\"round\" stroke-width=\"2\" d=\"M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16\" />\n  </svg>\n";
;
// If press enter key,call store function
TaskInfo.addEventListener('keypress', function (e) {
    var key = e.keyCode;
    if (TaskInfo.value != '' && key == 13)
        store(); // 13 == enter
});
// Create DOM Element
function createElement(elm, content) {
    var parts = document.createElement(elm);
    parts.textContent = content;
    return parts;
}
// create Task
function createTaskCard(no, data) {
    var parent = document.getElementById('task-list');
    var div = document.createElement('div');
    div.className = 'task-card p-8 border-b h-8';
    var taskInfo = document.createElement('span');
    taskInfo.textContent = data.slice(3);
    taskInfo.className = ' ml-4';
    var buttonWrapper = document.createElement('div');
    buttonWrapper.className = 'text-right';
    var statusBtn = document.createElement('input');
    statusBtn.textContent = '完了';
    statusBtn.setAttribute('onclick', 'setCompleteStatus(this.value)');
    statusBtn.setAttribute('type', 'checkbox');
    statusBtn.setAttribute('value', no.toString());
    var removeBtn = document.createElement('button');
    removeBtn.setAttribute('onclick', 'removeTask(this.value)');
    removeBtn.setAttribute('value', no.toString());
    removeBtn.className = 'float-right';
    removeBtn.innerHTML = removeIcon;
    div.appendChild(statusBtn);
    div.appendChild(taskInfo);
    div.appendChild(removeBtn);
    parent.appendChild(div);
}
function store() {
    if (counter == taskLimit)
        throw alert('追加可能数を超えています!');
    var timestamp = new Date().getTime();
    var task = {
        subject: TaskInfo.value,
        complete: 0,
        createdAt: timestamp,
    };
    var obj = JSON.stringify(task);
    localStorage.setItem(prefix + task.subject, obj);
    counter++;
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
    console.log("diff: " + diff);
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
        counter++;
        var remainTask = taskLimit - counter;
        var limitCountElm = document.getElementById('task-limit');
        limitCountElm.textContent =
            '残り追加可能タスク数: ' + remainTask.toString();
    }
};
