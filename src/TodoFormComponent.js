import Component from './Component';

export default class TodoFormComponent extends Component {
    constructor(pubsub) {
        super();
        this.pubsub = pubsub;
        this.form = null;
        this.render();
        this.formListener();
    }

    formListener(){
        this.form.addEventListener('submit', (e)=>{
            e.preventDefault();
            let title = e.target.firstChild.value;
            
            this.pubsub.fireEvent('onCreate', title);
            e.target.firstChild.value = '';
        });
    }

    render() {
        this.form = document.createElement('form');
        this.form.className = 'todo-form';

        let input = document.createElement('input');
        input.type = 'text';
        input.placeholder = 'What do we have to do?';
        this.form.append(input);
        
        let submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.innerText = 'Add';
        this.form.append(submitButton);
        
        this.element = this.form;
    }
}