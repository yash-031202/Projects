// app.js

class Task {
    constructor(id, title, desc, priority) {
        this.id = id;
        this.title = title;
        this.desc = desc;
        this.priority = priority;
        this.completed = false;
        this.createdAt = new Date();
    }
}

class TaskManager {
    constructor() {
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }

    addTask(task) {
        this.tasks.push(task);
        this.save();
    }

    editTask(id, data) {
        const idx = this.tasks.findIndex(t => t.id === id);
        if (idx > -1) Object.assign(this.tasks[idx], data);
        this.save();
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(t => t.id !== id);
        this.save();
    }

    toggleComplete(id) {
        const t = this.tasks.find(t => t.id === id);
        if (t) t.completed = !t.completed;
        this.save();
    }

    save() { localStorage.setItem('tasks', JSON.stringify(this.tasks)); }

    filterTasks(filter, search) {
        return this.tasks
            .filter(t => {
                if (filter === 'completed') return t.completed;
                if (filter === 'high') return t.priority === 'high';
                return true;
            })
            .filter(t => t.title.toLowerCase().includes((search || '').toLowerCase()));
    }

}

const tm = new TaskManager();
const taskList = document.getElementById('taskList');
const taskForm = document.getElementById('taskForm');
const taskMsg = document.getElementById('taskMsg');
const searchInput = document.getElementById('searchInput');
let currentFilter = 'all';

function renderTasks() {
    taskList.innerHTML = '';
    const tasks = tm.filterTasks(currentFilter, searchInput.value);
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task ${task.completed ? 'completed' : ''} ${task.priority}`;
        li.innerHTML = `
  <div>
    <strong>${task.title}</strong><br>
    <small>${task.desc}</small> | <em>${task.priority}</em>
  </div>
  <div>
    <button class="complete-btn">${task.completed ? 'Undo' : 'Done'}</button>
    <button class="delete-btn">Delete</button>
  </div>`;

        li.querySelector('.delete-btn').addEventListener('click', () => {
            tm.deleteTask(task.id);
            renderTasks();
        });
        li.querySelector('.complete-btn').addEventListener('click', () => {
            tm.toggleComplete(task.id);
            renderTasks();
        });
        taskList.appendChild(li);
    });
}

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('taskTitle').value.trim();
    const desc = document.getElementById('taskDesc').value.trim();
    const priority = document.getElementById('taskPriority').value;

    if (!title || !desc || !priority) {
        taskMsg.textContent = 'All fields are required!';
        return;
    }
    taskMsg.textContent = '';

    const task = new Task(Date.now(), title, desc, priority);
    tm.addTask(task);
    renderTasks();
    taskForm.reset();
});

document.getElementById('filterAll').addEventListener('click', () => {
    currentFilter = 'all';
    renderTasks();
});
document.getElementById('filterComp').addEventListener('click', () => {
    currentFilter = 'completed';
    renderTasks();
});
document.getElementById('filterHigh').addEventListener('click', () => {
    currentFilter = 'high';
    renderTasks();
});

searchInput.addEventListener('input', renderTasks);

setInterval(() => {
    console.log('Auto-saving tasks…');
}, 30000);

const themeBtn = document.getElementById('toggleTheme');
themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    sessionStorage.setItem('isDark', document.body.classList.contains('dark'));
});
if (sessionStorage.getItem('isDark') === 'true') document.body.classList.add('dark');

document.addEventListener('keydown', e => {
    if (e.ctrlKey && e.key === 'n') {
        document.getElementById('taskTitle').focus();
    }
});

const loginSection = document.querySelector('.login-section');
const mainSection = document.getElementById('mainSection');
const loginForm = document.getElementById('loginForm');
const loginMsg = document.getElementById('loginMsg');

function mockLogin(email, pass) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            if (email === 'user@test.com' && pass === 'password') res({ user: 'user' });
            else rej('Invalid credentials');
        }, 1500);
    });
}

loginForm.addEventListener('submit', async(e) => {
    e.preventDefault();
    loginMsg.textContent = 'Logging in...';
    try {
        await mockLogin(
            document.getElementById('loginEmail').value,
            document.getElementById('loginPassword').value
        );
        loginSection.classList.add('hidden');
        mainSection.classList.remove('hidden');
        renderTasks();
        loginMsg.textContent = '';
    } catch (err) {
        loginMsg.textContent = err;
    }
});