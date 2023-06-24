document.addEventListener('DOMContentLoaded', () => {

    let addButton = document.querySelector('#add');
    let addInput = document.querySelector('#item');

    let removeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M0 84V56c0-13.3 10.7-24 24-24h112l9.4-18.7c4-8.2 12.3-13.3 21.4-13.3h114.3c9.1 0 17.4 5.1 21.5 13.3L312 32h112c13.3 0 24 10.7 24 24v28c0 6.6-5.4 12-12 12H12C5.4 96 0 90.6 0 84zm416 56v324c0 26.5-21.5 48-48 48H80c-26.5 0-48-21.5-48-48V140c0-6.6 5.4-12 12-12h360c6.6 0 12 5.4 12 12zm-272 68c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208zm96 0c0-8.8-7.2-16-16-16s-16 7.2-16 16v224c0 8.8 7.2 16 16 16s16-7.2 16-16V208z"/></svg>`;
    let completeSVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"/></svg>`;

    addButton.addEventListener('click', function () {
        addItem();
    });

    addInput.addEventListener('keydown', function (e) {
        if (e.key === 'Enter') {
            addItem();
        }
    });


    function addItem() {
        let newItem = document.getElementById('item').value;
        let newDes = document.getElementById('description').value;
        if (newItem.trim() !== '') {
            addItemToList(newItem, newDes);
            document.getElementById('item').value = '';
            document.getElementById('description').value = '';
        }
    }

    function addItemToList(item, des) {
        let ul = document.getElementById('todo');
        let li = document.createElement('li');
        li.appendChild(document.createTextNode(`${item}: ${des}`));

        let createdDate = document.createElement('span');
        createdDate.classList.add('created-date');
        createdDate.appendChild(document.createTextNode(getFormattedDate()));
        li.appendChild(createdDate);

        let buttonsDiv = document.createElement('div');
        buttonsDiv.classList.add('buttons');

        let removeButton = document.createElement('button');
        removeButton.classList.add('remove');
        removeButton.innerHTML = removeSVG;
        removeButton.addEventListener('click', removeItem);

        let completeButton = document.createElement('button');
        completeButton.classList.add('complete');
        completeButton.innerHTML = completeSVG;
        completeButton.addEventListener('click', completeItem);

        buttonsDiv.appendChild(removeButton);
        buttonsDiv.appendChild(completeButton);
        li.appendChild(buttonsDiv);
        ul.appendChild(li);
    }

    function removeItem() {
        let item = this.parentNode.parentNode;
        let parent = item.parentNode;

        parent.removeChild(item);
    }

    function completeItem() {
        let item = this.parentNode.parentNode;
        let parent = item.parentNode;
        let id = parent.id;

        let target = (id === 'todo') ? document.getElementById('completed') : document.getElementById('todo');

        let completedDate = document.createElement('span');
        completedDate.classList.add('completed-date');
        completedDate.appendChild(document.createTextNode(getFormattedDate()));
        item.appendChild(completedDate);

        parent.removeChild(item);
        target.appendChild(item);
    }

    function getFormattedDate() {
        let date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let hours = date.getHours();
        let minutes = date.getMinutes();

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

});