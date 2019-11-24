import PubSub from './PubSub.js';
import Component from './Component.js';
import TodoService from './TodoService.js';
import TodoFormComponent from './TodoFormComponent.js';
import TodoListComponent from './TodoListComponent.js';
import ConfirmModal from './ConfirmModal.js';

export default class TodoAppComponent extends Component {
    constructor() {
        super();
        this.pubsub = new PubSub();
        this.element = document.createElement('div');
        this.todoService = new TodoService(this.pubsub);
        this.form = new TodoFormComponent(this.pubsub);
        this.todoList = new TodoListComponent(this.pubsub);
        this.confirmModal = new ConfirmModal(this.pubsub);

        this.idTodo_ToDelete = null;

        this.title = 'My 2Do';
        document.getElementsByTagName('header')[0].innerHTML = this.title;

        this.render();

        this.pubsub.subscribe('onCreate', this, this.createTodo); //from form
        this.pubsub.subscribe('handleDelete', this, this.handleDelete); //from todoItem
        this.pubsub.subscribe('delete', this, this.deleteTodo); //from confirmModal
        this.pubsub.subscribe('cancelDelete', this, this.cancelDelete);//from confirmModal
        this.pubsub.subscribe('toggle', this, this.toggleTodo); //from todoItem
        this.pubsub.subscribe('edit', this, this.editTodo); //from todoItem
    }

    render(){
        this.element.innerHTML = '';
        this.element.append(this.confirmModal.render());
        this.element.append(this.form.element);
        this.element.append(this.todoList.element);
    }

    createTodo(title) {
        if(title){
            this.todoService.createTodo(title);
        }
    }

    handleDelete(id) {
        this.idTodo_ToDelete = id;
        this.confirmModal.confirmModalVisible = true;
        this.render();
    }
    
    cancelDelete(){
        this.idTodo_ToDelete = null;
        this.confirmModal.confirmModalVisible = false;
        this.render();
    }

    deleteTodo() {
        this.todoService.deleteTodo(this.idTodo_ToDelete);
        this.idTodo_ToDelete = null;
        this.confirmModal.confirmModalVisible = false;
        this.render();
    }

    toggleTodo(id) {
        if(id){
            this.todoService.toggleTodo(id);
        }
    }

    editTodo(data){
        if(data){
            this.todoService.editTodo(data.title, data.id);
        }
    }
}

let todo = new TodoAppComponent();
document.body.append(todo.element);