let todoList = [];

// Load todos from localStorage when page loads
window.addEventListener('load', () => {
  try {
    const savedTodos = localStorage.getItem('todoList');
    if (savedTodos) {
      todoList = JSON.parse(savedTodos);
      displayItems();
    }
  } catch (error) {
    console.error('Error loading todos:', error);
    todoList = [];
  }
});

function displayItems() {
  let containerElement = document.querySelector('.todo-container');
  let newHtml = '';
  for (let i = 0; i < todoList.length; i++) {
    let {item, dueDate} = todoList[i];
    newHtml += `
      <span>${item}</span>
      <span>${dueDate}</span>
      <button class='btn-delete' onclick="deleteTodo(${i})">Delete</button>
    `;
  }
  containerElement.innerHTML = newHtml;
}

function deleteTodo(index) {
  todoList.splice(index, 1);
  saveTodos();
  displayItems();
}

function addTodo() {
  let inputElement = document.querySelector('#todo-input');
  let dateElement = document.querySelector('#todo-date');
  let todoItem = inputElement.value;
  let todoDate = dateElement.value;
  
  if (todoItem && todoDate) {
    todoList.push({item: todoItem, dueDate: todoDate});
    saveTodos();
    
    // Clear inputs
    inputElement.value = '';
    dateElement.value = '';
    
    displayItems();
  }
}

function saveTodos() {
  try {
    localStorage.setItem('todoList', JSON.stringify(todoList));
  } catch (error) {
    console.error('Error saving todos:', error);
  }
}
