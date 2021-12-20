import {closeModal, openModal} from './modal';
import {postDate} from '../services/services';

function forms(formSelector, modalTimerId){

    const forms = document.querySelectorAll(formSelector);
    const message = {
        loading: 'img/spinner.svg',
        success: 'спасибоб скоро мы с вами свяжемся',
        failure: 'Что-то пошло не так...'
    };

    forms.forEach(item => {
        bindPostDate(item);
    });

    

    function bindPostDate(form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            // console.log(e);
            // return false;
            const statusMessage = document.createElement('img');
            statusMessage.src = message.loading;
            statusMessage.style.cssText = `
                display: block;
                margin: 0 auto;
            `;
            //form.append(statusMessage);
            form.insertAdjacentElement('afterend', statusMessage);

            const formDate = new FormData(form);
            const json = JSON.stringify(Object.fromEntries(formDate.entries()));
            // const object = {};
            // formDate.forEach(function(value, key) {
            //     object[key] = value;
            // });

            postDate('http://localhost:3000/requests', json)
                .then(data => {
                    console.log(data);
                    showThanksModal(message.success);
                    statusMessage.remove();
                }).catch(() => {
                    showThanksModal(message.failure);
                }).finally(() => {
                    form.reset();
                });

            // const request = new XMLHttpRequest();
            // request.open('post', 'server.php');

            // //request.setRequestHeader('Content-type', 'multipart/form-data');
            // request.setRequestHeader('Content-type', 'application/json');
            // const formDate = new FormData(form);

            // const obj = {};
            // formDate.forEach(function(val, key) {
            //     obj[key] = val;
            // });

            // const json = JSON.stringify(obj);

            // request.send(json);
            // request.addEventListener('load', () => {
            //     if (request.status === 200) {
            //         console.log(request.response);
            //         showThanksModal(message.success);
            //         form.reset();
            //         statusMessage.remove();
            //     } else {
            //         showThanksModal(message.failure);
            //     }
            // });
        });
    }

    function showThanksModal(message) {
        const prevModalDialog = document.querySelector('.modal__dialog');

        prevModalDialog.classList.add('hide');
        openModal('.modal', modalTimerId);

        const thanksModal = document.createElement('div');
        thanksModal.classList.add('modal__dialog');
        thanksModal.innerHTML = `
            <div class="modal__content">
                <div class="modal__close" data-close>&times;</div>
                <div class="modal__title">${message}</div>
            </div>
        `;

        document.querySelector('.modal').append(thanksModal);
        setTimeout(() => {
            thanksModal.remove();
            prevModalDialog.classList.add('show');
            prevModalDialog.classList.remove('hide');
            closeModal('.modal');
        }, 4000);
    }

    // fetch('http://localhost:3000/menu')
    //     .then(data => data.json())
    //     .then(res => console.log(res));
}

export default forms;