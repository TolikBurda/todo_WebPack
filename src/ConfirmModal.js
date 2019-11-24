import Component from './Component.js';

export default class ConfirmModal extends Component{
    constructor(pubsub){
        super();
        this.pubsub = pubsub;
        this.confirmButton = null;
        this.cancelButton = null;
        this.confirmModalVisible = false;
    }

    handleEvent(){
        this.cancelButton.addEventListener('click', ()=>{
            this.pubsub.fireEvent('cancelDelete');
        });

        this.confirmButton.addEventListener('click', ()=>{
            this.pubsub.fireEvent('delete');
        });
    }

    render() {
        this.modal = document.createElement('div');
        this.modal.className = 'popup';
        this.modal.style.display =  this.confirmModalVisible ? '' : 'none';

        let span = document.createElement('span');
        span.className = 'title';
        span.innerText = 'Are you sure?';
        this.modal.append(span);

        let buttonsContainer = document.createElement('div');

        this.confirmButton = document.createElement('button');
        this.confirmButton.innerText = 'OK';
        buttonsContainer.append(this.confirmButton);

        this.cancelButton = document.createElement('button');
        this.cancelButton.innerText = 'Cancel';
        buttonsContainer.append(this.cancelButton);
        
        this.modal.append(buttonsContainer);

        this.element = this.modal;
        
        this.handleEvent();
        return this.element
    }
}