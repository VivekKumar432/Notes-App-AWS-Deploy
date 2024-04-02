import Notes from "../model/NotesModel"

const NOTESOPERATION={
    notes:[],
    getNotes(){
        return this.notes
    },
    totalrecords(){
        return this.notes.length;
    },
    markedrecords(){
        return this.notes.filter((e)=>e.isMarked === true).length;
    },
    add(noteobj){
        const note = new Notes(noteobj);
        this.notes.push(note);
    },
    togglemark(id){
       this.searchById(id).toggleMark()
    },
    searchById(id){
        return this.notes.find((e)=>e.id===id);
    },
    delete(){
        this.notes = this.notes.filter((e)=>e.isMarked ===false);
    }
}

export default NOTESOPERATION;