export default class NotesAPI {
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

        return notes.sort((a, b) => {
            return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        });
    }

    static saveNote(noteToSave) {
        const notes = NotesAPI.getAllNotes();
        const existingNote = notes.find(note => note.id == noteToSave.id);

        // Edit / update
        if (existingNote) {
            existingNote.title = noteToSave.title;
            existingNote.body = noteToSave.body;
            existingNote.updated = new Date().toISOString();
        } else {
            // adding new note
            noteToSave.id = Math.floor(Math.random() * 1000000);
            noteToSave.updated = new Date().toISOString();
            notes.push(noteToSave);
        }

        localStorage.setItem("notesapp-notes", JSON.stringify(notes));
    }

    static deleteNote(id) {
        const notes = NotesAPI.getAllNotes();
        const newNotes = notes.filter(note => note.id != id); // Dikkat: splice + indexOf computational cost daha düşük olurdu

        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    }
}