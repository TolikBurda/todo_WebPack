import Component from './Component';
import TodoItemComponent from './TodoItemComponent';

export default class TodoListComponent extends Component {
    constructor(pubsub) {
        super();
        this.element = document.createElement('div');
        this.pubsub = pubsub;
        this.todoList = null;

        this.pubsub.subscribe('create', this, this.render);
        this.pubsub.subscribe('onDelete', this, this.render);
        this.pubsub.subscribe('onToggle', this, this.render);
        this.pubsub.subscribe('onEdit', this, this.render);
    }
    render(data){
        if(data){
            this.element.innerHTML = '';
            this.todoList = data;
            this.todoList.forEach(todoItem => {  
                let item = new TodoItemComponent(this.pubsub, todoItem.id);
                item.render(todoItem.title, todoItem.completed);
                if(todoItem.completed == true){
                    this.element.append(item.element);
                }else{
                    this.element.prepend(item.element);
                }
            })
        }
    }
}