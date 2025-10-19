const input = document.getElementById('task-input');
const addBtn = document.getElementById('add-btn');
const list = document.getElementById('task-list');

let tasks = JSON.parse(localStorage.getItem('todo-tasks')) || [];
renderTasks();

addBtn.onclick = () => {
  const value = input.value.trim();
  if (value) {
    const now = new Date();
    const task = {
      text: value,
      date: now.toLocaleDateString() + ' ' + now.toLocaleTimeString(),
      completed: false
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
    input.value = '';
    input.focus();
  }
};

input.addEventListener('keyup', function(e) {
  if (e.key === 'Enter') addBtn.click();
});

function renderTasks() {
  list.innerHTML = '';
  tasks.forEach((task, idx) => {
    const li = document.createElement('li');
    li.className = 'task-item';

    const details = document.createElement('div');
    details.className = 'task-details';

    const span = document.createElement('span');
    span.className = 'task-text';
    span.textContent = task.text;
    if (task.completed) span.classList.add('completed');

    const dateSpan = document.createElement('span');
    dateSpan.className = 'task-date';
    dateSpan.textContent = task.date;

    details.appendChild(span);
    details.appendChild(dateSpan);

    const completeBtn = document.createElement('button');
    completeBtn.className = 'action-btn complete';
    completeBtn.innerHTML = '✓';
    completeBtn.title = 'Mark as complete';
    completeBtn.onclick = () => {
      tasks[idx].completed = !tasks[idx].completed;
      saveTasks();
      renderTasks();
    };
    
    const editBtn = document.createElement('button');
    editBtn.className = 'action-btn edit';
    editBtn.innerHTML = '✎';
    editBtn.title = 'Edit task';
    editBtn.onclick = () => editTask(idx);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'action-btn delete';
    deleteBtn.innerHTML = '🗑';
    deleteBtn.title = 'Delete task';
    deleteBtn.onclick = () => {
      tasks.splice(idx, 1);
      saveTasks();
      renderTasks();
    };

    li.appendChild(details);
    li.appendChild(completeBtn);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    list.appendChild(li);
  });
}

function editTask(idx) {
  const newText = prompt('Edit your task:', tasks[idx].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[idx].text = newText.trim();
    saveTasks();
    renderTasks();
  }
}

function saveTasks() {
  localStorage.setItem('todo-tasks', JSON.stringify(tasks));
}
