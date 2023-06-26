function handleResponse(res) {
    if (!res.ok) {
        throw new Error(`An error ocurred please try again later: ${res.status}`);
    }
    return res.json();
}
async function getTodos() {
    const data = await fetch('https://jsonplaceholder.typicode.com/todos').then(handleResponse);
    buildTodoList(data);
}
getTodos();
function buildTodoList(todos) {
    const todoList = document.querySelector('[data-todo-list]');
    const fragment = document.createDocumentFragment();
    for (const todo of todos) {
        const item = document.createElement('li');
        const label = document.createElement('label');
        const check = document.createElement('input');
        const button = document.createElement('button');
        check.type = 'checkbox';
        check.checked = todo.completed;
        button.innerHTML = '&times;';
        label.textContent = todo.title;
        label.prepend(check);
        item.append(label, button);
        fragment.append(item);
    }
    todoList.append(fragment);
}
// const promise = new Promise((resolve, reject) => {
//   setTimeout(() => resolve('yeeey!'), 2000);
// });
// async function testPromises() {
//   const data = await promise;
//   console.log(data);
//   return 'Paul';
// }
// testPromises().then(console.log).catch(console.error);
