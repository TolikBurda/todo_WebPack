import Component from './Component';

export default class TodoItemComponent extends Component {
    constructor(pubsub, id) {
        super();
        this.pubsub = pubsub;
        this.id = id;
        this.checkBoxButton = null;
        this.deleteButton = null;
        this.editButton = null;
        this.controlsContainerDiv = null;
        this.editDivContainer = null;
        this.saveButton = null;
    }

    handleEvent() {
        this.deleteButton.addEventListener('click', ()=>{
            this.pubsub.fireEvent('handleDelete', this.id);
        })

        this.checkBoxButton.addEventListener('click', ()=>{
            this.pubsub.fireEvent('toggle', this.id);
        })

        this.editButton.addEventListener('click', ()=>{
            this.controlsContainerDiv.style.display = 'none';
            this.editDivContainer.style.display = '';
        })

        this.saveButton.addEventListener('click', ()=>{
            let data = {title: this.textField.value, id: this.id};
            this.pubsub.fireEvent('edit', data);
        })
    }

    render(title, completed){
        let section = document.createElement('section');
        section.className = 'todo-list';
        

        let arrOfHtmlElements = [];
        this.controlsContainerDiv = document.createElement('div');
        this.controlsContainerDiv.className = 'todo-item';
        this.controlsContainerDiv.className += completed ? ' completed' : '';

        this.checkBoxButton = document.createElement('button');
        this.checkBoxButton.classList.add('checkbox', 'icon' );

        let i = document.createElement('i');
        i.className = 'material-icons';
        i.innerText = completed ? 'check_box' : 'check_box_outline_blank';
        this.checkBoxButton.prepend(i);
    
        let span = document.createElement('span');
        span.className = 'title';
        span.innerText = title;

        let actionsDiv = document.createElement('div');
        actionsDiv.className = 'actions';

        let editButton = document.createElement('button');
        editButton.classList.add('edit', 'icon');

        let edit = document.createElement('i');
        edit.className = 'material-icons';
        edit.innerText = 'create';
        editButton.append(edit);

        actionsDiv.append(editButton);
        this.editButton = editButton;

        this.deleteButton = document.createElement('button');
        this.deleteButton.classList.add('delete', 'icon');

        let iDel = document.createElement('i');
        iDel.className = 'material-icons';
        iDel.innerText = 'delete';
        this.deleteButton.append(iDel);

        actionsDiv.append(this.deleteButton);

        arrOfHtmlElements.push(this.checkBoxButton);
        arrOfHtmlElements.push(span);
        arrOfHtmlElements.push(actionsDiv);

        for(let n = 0; n < arrOfHtmlElements.length; n++){
            this.controlsContainerDiv.append(arrOfHtmlElements[n]);
        }
        ////////////////////////////editDiv
        let arrOfEditElements = [];//arrOf

        let editDivContainer = document.createElement('div');//editDivContainer
        editDivContainer.className = 'todo-item';
        editDivContainer.style.display = 'none';
        this.editDivContainer = editDivContainer;
    
        let textField = document.createElement('input');
        textField.type = 'text';
        textField.value = title;
        this.textField = textField;

        let actionsEditDiv = document.createElement('div');
        actionsEditDiv.className = 'actions';

        this.saveButton = document.createElement('button');
        this.saveButton.classList.add('save', 'icon');

        let save = document.createElement('i');
        save.className = 'material-icons';
        save.innerText = 'save';
        this.saveButton.append(save);

        actionsEditDiv.append(this.saveButton);

        arrOfEditElements.push(textField);
        arrOfEditElements.push(actionsEditDiv);

        for(let n = 0; n < arrOfEditElements.length; n++){
            editDivContainer.append(arrOfEditElements[n]);
        }


        section.append(editDivContainer);
        section.append(this.controlsContainerDiv);


        this.element = section; 
        this.handleEvent();
    }
}