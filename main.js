import { saveNote, getNotes, onGetNotes, deleteNote, getNote, updateNote } from './firebase.js'

const notesContainer = document.getElementById('notes-container')
const noteForm = document.getElementById('note-form')

const buttonNuevaNota = document.getElementById('button-new-note')
const buttonCloseForm = document.getElementById('button-close-form')
const modalForm = document.getElementById('modal-form')

let editStatus = false;
let id = '';

const modalOpen = () => {
    modalForm.classList.add('--active-modal')
    document.getElementById('header').classList.add('--header-desactive');
}

const modalClose = () => {
    modalForm.classList.remove('--active-modal');
    document.getElementById('header').classList.remove('--header-desactive');
}



window.addEventListener('DOMContentLoaded', async () => {
    // console.log(querySnapchot)
    // const querySnapchot = await getNotes();

    onGetNotes((querySnapchot) => {
        notesContainer.innerHTML = '';
        querySnapchot.forEach(doc => {
            const note = doc.data();
            notesContainer.innerHTML += `
                <div class="notes__list --${note.ntype}">
                    <h3>${note.ntitle}</h3>
                    <p>${note.ncontent}</p>
                    <div class="buttons-form-container">
                    <button class='button-edit' data-id="${doc.id}">Editar</button>
                    <button class='button-delete' data-id="${doc.id}">Eliminar</button>
                    </div>
                </div>`
        });
        const buttonsDelete = notesContainer.querySelectorAll('.button-delete');
        buttonsDelete.forEach(button => {
            button.addEventListener('click', ({ target: { dataset } }) => {
                deleteNote(dataset.id);
            })
        })

        const buttonsEdit = notesContainer.querySelectorAll('.button-edit');
        buttonsEdit.forEach(button => {
            button.addEventListener('click', async ({ target: { dataset } }) => {
                const doc = await getNote(dataset.id)
                const note = doc.data()
                id = doc.id

                noteForm['note-title'].value = note.ntitle;
                noteForm['note-type'].value = note.ntype;
                noteForm['note-content'].value = note.ncontent;

                editStatus = true;

                noteForm['button-save'].innerText = 'Actualizar Nota';
                modalOpen();
            })

        })
    });
})

buttonNuevaNota.addEventListener('click', (e) => {
    e.preventDefault()
    modalOpen();
})

buttonCloseForm.addEventListener('click', (e) => {
    e.preventDefault()
    modalClose();
})

noteForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const ntitle = noteForm['note-title'];
    const ntype = noteForm['note-type'];
    const ncontent = noteForm['note-content'];

    if (!editStatus) {
        saveNote(ntitle.value, ntype.value, ncontent.value);
        modalClose();
    } else {
        updateNote(id, {
            ntitle: ntitle.value,
            ntype: ntype.value,
            ncontent: ncontent.value,
        })
        
        modalClose();
        editStatus = false
        noteForm['button-save'].innerText = 'Crear Nota';
    }

    noteForm.reset();
})