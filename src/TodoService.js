import TodoItem from './TodoItem';

export default class TodoService {
    constructor(pubsub) {
        this.pubsub = pubsub;
        this.todos = [];
    }

    createTodo(title){
        let todo = new TodoItem(title, this.pubsub);
        this.todos.push(todo);
        this.pubsub.fireEvent('create', this.todos);
    }

    deleteTodo(id){
        let todoToDel = this.todos.findIndex(todo => todo.id === id);
        this.todos.splice(todoToDel, 1);
        this.pubsub.fireEvent('onDelete', this.todos);
    }
    
    toggleTodo(id){
        let todoToToggle = this.todos.find(todo => todo.id === id);
        todoToToggle.completed = !todoToToggle.completed;
        this.pubsub.fireEvent('onToggle', this.todos);
    }
    editTodo(title, id){
        let todoToEdit = this.todos.find(todo => todo.id === id);
        todoToEdit.title = title;
        this.pubsub.fireEvent('onEdit', this.todos);
    }
}