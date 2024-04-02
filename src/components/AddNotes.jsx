// import React, { useState } from 'react';
// import {v4 as uuid} from 'uuid'
// import { useForm } from 'react-hook-form';
// import { Box, Button, Container, TextField, Typography } from '@mui/material';
// import TotalRecords from './TotalRecords';
// import NOTESOPERATION from '../services/notes_Services';
// import PrintNotes from './PrintNotes';

// const AddNotes = () => {
//   const { register, handleSubmit, formState: { errors }, setValue } = useForm();
//   const noteId = uuid();
//   const [totalrec, setTotalRec] = useState(null);
//   const [markedrec, setMarkedRec] = useState(null);
//   const [notes, setNotes] = useState([]);
//   const [selectedNote, setSelectedNote] = useState(null);

//   const onUpdate = (data) =>{
//    const noteToBeUpdated = NOTESOPERATION.searchById(data.id);
//    NOTESOPERATION.togglemark(noteToBeUpdated.id);
//    NOTESOPERATION.delete(noteToBeUpdated);
//     const updatedObj = {
//       id: updatedNotes.id,
//       title: data.title,
//       description: data.description,
//       cdate: data.cdate,
//       importance: data.importance
//     };

//     NOTESOPERATION.add(updatedObj);
//     setTotalRec(NOTESOPERATION.totalrecords());
//     resetForm();
//   }

//   const onSubmit = (data) => {
//     const noteObj = {
//       id: noteId,
//       title: data.title,
//       description: data.description,
//       cdate: data.cdate,
//       importance: data.importance
//     };

//     if (selectedNote) {
//       // Update existing note
//       const updatedNotes = notes.map(note => {
//         if (note.id === selectedNote.id) {
//           return noteObj;
//         }
//         return note;
//       });
//       setNotes(updatedNotes);
//       setSelectedNote(null);
//     } else {
//       // Add new note
//       setNotes([...notes, noteObj]);
//     }

//     NOTESOPERATION.add(noteObj);
//     setTotalRec(NOTESOPERATION.totalrecords());
//     resetForm();
//   };

//   const resetForm = () => {
//     setValue('id', '');
//     setValue('title', '');
//     setValue('description', '');
//     setValue('cdate', '');
//     setValue('importance', '');
//   };

//   const updatedNotes = (note) => {
//     setSelectedNote(note);
//     setValue('id', note.id);
//     setValue('title', note.title);
//     setValue('description', note.description);
//     setValue('cdate', note.cdate);
//     setValue('importance', note.importance);
//   };
//   const deleteNote=(id)=>{
    
//     NOTESOPERATION.togglemark(id);
//     setTotalRec(NOTESOPERATION.totalrecords());
//     setMarkedRec(NOTESOPERATION.markedrecords());
//   }
//   const deleteNodes=()=>{
//     NOTESOPERATION.delete();
//     const newnotes = NOTESOPERATION.getNotes();
//     setNotes(newnotes);
//     setTotalRec(NOTESOPERATION.totalrecords());
//     setMarkedRec(NOTESOPERATION.markedrecords());
//   }

//   return (
//     <>
//       <Container>
        
//         <Typography variant='h3' margin={4}>{selectedNote ? 'Update Note' : 'Add Note'}</Typography>

//         <Box sx={{ margin: 5, display: 'flex', flexDirection: 'column' }}>
//           <TextField value={noteId} label="Id" margin='dense'  />

//           <TextField label="Title" {...register('title', { required: 'Title is required' })} margin='dense' />
//           {errors.title && <span style={{ color: 'red' }}>{errors.title.message}</span>}

//           <TextField label="Description" {...register('description', { required: 'Description is required' })} margin='dense' />
//           {errors.description && <span style={{ color: 'red' }}>{errors.description.message}</span>}

//           <TextField type='date' {...register('cdate', { required: 'Date is required' })} margin='dense' />
//           {errors.cdate && <span style={{ color: 'red' }}>{errors.cdate.message}</span>}

//           <TextField type='color' label="Importance" {...register('importance', { required: 'Importance is required' })} margin='dense' />
//           {errors.importance && <span style={{ color: 'red' }}>{errors.importance.message}</span>}

//           <Box sx={{ marginTop: 5, display: 'flex', justifyContent: 'end', alignItems: 'end' }}>
//             <Button variant='outlined' color='warning' onClick={resetForm} style={{ margin: 5 }}>Clear All</Button>
//             <Button variant='outlined' color='primary' onClick={handleSubmit(selectedNote? onUpdate: onSubmit)} style={{ margin: 5 }}>{selectedNote ? 'Update' : 'Save'}</Button>
//           </Box>
//         </Box>
//         <Box sx={{ margin: 5, display: "flex", justifyContent: "center" }}>
//         <TotalRecords totalrec={totalrec ? totalrec : 0} marked={markedrec? markedrec:0}   />
//         {markedrec>0?<Button color='error' variant='contained' onClick={()=>{deleteNodes()}}>Delete</Button>:""}
//       </Box>
//         <Box sx={{ marginBottom: 5, display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
//         {notes.length > 0 ? (
//           <PrintNotes notes={notes} updateNote={updatedNotes} deleteNode={deleteNote} />
//         ) : (
//           <Typography variant="h6" color="textSecondary">
//             No records
//           </Typography>
//         )}
//       </Box>
//       </Container>
//     </>
//   );
// };

// export default AddNotes;

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import TotalRecords from './TotalRecords';
import NOTESOPERATION from '../services/notes_Services';
import PrintNotes from './PrintNotes';

const AddNotes = () => {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const [notes, setNotes] = useState([]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [totalrec, setTotalRec] = useState(0);
  const [markedrec, setMarkedRec] = useState(0);

  const onSubmit = (data) => {
    const noteObj = {
      title: data.title,
      description: data.description,
      cdate: data.cdate,
      importance: data.importance
    };

    if (selectedNote) {
      const updatedNotes = notes.map(note => (note.id === selectedNote.id ? noteObj : note));
      setNotes(updatedNotes);
      setSelectedNote(null);
    } else {
      setNotes([...notes, noteObj]);
    }

    NOTESOPERATION.add(noteObj);
    setTotalRec(NOTESOPERATION.totalrecords());
    resetForm();
  };

  const onUpdate = (data) => {
    const noteToBeUpdated = NOTESOPERATION.searchById(data.id);
    NOTESOPERATION.togglemark(noteToBeUpdated.id);
    NOTESOPERATION.delete(noteToBeUpdated);

    const updatedObj = {
      id: noteToBeUpdated.id,
      title: data.title,
      description: data.description,
      cdate: data.cdate,
      importance: data.importance
    };

    NOTESOPERATION.add(updatedObj);
    setTotalRec(NOTESOPERATION.totalrecords());
    resetForm();
  };

  const resetForm = () => {
    ['id', 'title', 'description', 'cdate', 'importance'].forEach(field => setValue(field, ''));
  };

  const updatedNotes = (note) => {
    setSelectedNote(note);
    ['id', 'title', 'description', 'cdate', 'importance'].forEach(field => setValue(field, note[field]));
  };

  const deleteNote = (id) => {
    NOTESOPERATION.togglemark(id);
    setTotalRec(NOTESOPERATION.totalrecords());
    setMarkedRec(NOTESOPERATION.markedrecords());
  };

  const deleteNodes = () => {
    NOTESOPERATION.delete();
    const newnotes = NOTESOPERATION.getNotes();
    setNotes(newnotes);
    setTotalRec(NOTESOPERATION.totalrecords());
    setMarkedRec(NOTESOPERATION.markedrecords());
  };

  return (
    <div className='container'>
      <h3>{selectedNote ? 'Update Note' : 'Add Note'}</h3>

      <div style={{ margin: '10px' }}>
        <label htmlFor="noteId">Id</label>
        <input className='form-control' id="noteId" type="text"/>
        
        <label htmlFor="title">Title</label>
        <input className='form-control' id="title" type="text" {...register('title', { required: 'Title is required' })} />
        {errors.title && <span style={{ color: 'red' }}>{errors.title.message}</span>}

        <label htmlFor="description">Description</label>
        <input className='form-control' id="description" type="text" {...register('description', { required: 'Description is required' })} />
        {errors.description && <span style={{ color: 'red' }}>{errors.description.message}</span>}

        <label htmlFor="cdate">Date</label>
        <input className='form-control' id="cdate" type="date" {...register('cdate', { required: 'Date is required' })} />
        {errors.cdate && <span style={{ color: 'red' }}>{errors.cdate.message}</span>}

        <label htmlFor="importance">Importance</label>
        <input className='form-control' id="importance" type="color" {...register('importance', { required: 'Importance is required' })} />
        {errors.importance && <span style={{ color: 'red' }}>{errors.importance.message}</span>}

        <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'end' }}>
          <button onClick={resetForm} style={{ marginRight: '10px' }}>Clear All</button>
          <button onClick={handleSubmit(selectedNote ? onUpdate : onSubmit)}>{selectedNote ? 'Update' : 'Save'}</button>
        </div>
      </div>

      <div style={{ margin: '10px', display: "flex", justifyContent: "center" }}>
        <TotalRecords totalrec={totalrec} marked={markedrec} />
        {markedrec > 0 && <button onClick={deleteNodes}>Delete</button>}
      </div>

      <div style={{ margin: '10px', display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        {notes.length > 0 ? (
          <PrintNotes notes={notes} updateNote={updatedNotes} deleteNode={deleteNote} />
        ) : (
          <p>No records</p>
        )}
      </div>
    </div>
  );
};

export default AddNotes;
