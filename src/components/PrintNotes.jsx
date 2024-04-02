// import React, { useState } from "react";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableContainer,
//   TableHead,
//   TableRow,
//   Paper,
//   Container,
//   IconButton,
//   Box,
// } from "@mui/material";
// import EditIcon from "@mui/icons-material/Edit";
// import DeleteIcon from "@mui/icons-material/Delete";

// function PrintNotes({ notes, updateNote, deleteNode }) {
//   const [selectedRowUpdate, setSelectedRowUpdate] = useState(null);
//   const [selectedRowDelete, setSelectedRowDelete] = useState(null);
//   const toggleDelete = (id) => {
//     deleteNode(id);
//     setSelectedRowDelete(id);
//   };

//   const toggleUpdate = (note) => {
//     updateNote(note);
//     if (selectedRowUpdate === null) {
//       setSelectedRowUpdate(note.id);
//     } else {
//       setSelectedRowUpdate(null);
//     }
//   };

//   return (
//     <Container>
//       <TableContainer component={Paper}>
//         <Table sx={{ minWidth: 650 }} aria-label="simple table">
//           <TableHead>
//             <TableRow>
//               <TableCell>Id</TableCell>
//               <TableCell align="center">Title</TableCell>
//               <TableCell align="center">Description</TableCell>
//               <TableCell align="center">Completion Date</TableCell>
//               <TableCell align="center">Importance</TableCell>
//               <TableCell align="center">Operations</TableCell>
//             </TableRow>
//           </TableHead>
//           <TableBody>
//             {notes.length === 0 || notes === null
//               ? "No Records Found..."
//               : notes.map((note) => (
//                   <TableRow
//                     key={note.id}
//                     sx={{
//                       "&:last-child td, ?&:last-child th": { border: 0 },
//                       backgroundColor:
//                         (selectedRowUpdate === note.id ? "info" : "inherit") ||
//                         (selectedRowDelete === note.id ? "red" : "inherit"),
//                     }}
//                   >
//                     <TableCell component="th" scope="row">
//                       {note.id}
//                     </TableCell>
//                     <TableCell align="center">{note.title}</TableCell>
//                     <TableCell align="center">{note.description}</TableCell>
//                     <TableCell align="center">{note.cdate}</TableCell>
//                     <TableCell align="center">
//                       <Box
//                         sx={{
//                           height: 30,
//                           backgroundColor: note.importance,
//                         }}
//                       />
//                     </TableCell>

//                     <TableCell align="center">
//                       <IconButton
//                         onClick={() => {
//                           toggleDelete(note.id);
//                         }}
//                       >
//                         <DeleteIcon color="error" />
//                       </IconButton>
//                       <IconButton
//                         onClick={() => {
//                           toggleUpdate(note);
//                         }}
//                       >
//                         <EditIcon color="success" />
//                       </IconButton>
//                     </TableCell>
//                   </TableRow>
//                 ))}
//           </TableBody>
//         </Table>
//       </TableContainer>
//     </Container>
//   );
// }

// export default PrintNotes;




import React, { useState } from "react";

function PrintNotes({ notes, updateNote, deleteNode }) {
  const [selectedRowUpdate, setSelectedRowUpdate] = useState(null);
  const [selectedRowDelete, setSelectedRowDelete] = useState(null);

  const toggleDelete = (id) => {
    deleteNode(id);
    setSelectedRowDelete(id);
  };

  const toggleUpdate = (note) => {
    updateNote(note);
    setSelectedRowUpdate(selectedRowUpdate === null ? note.id : null);
  };

  return (
    <div>
      {notes.length === 0 || notes === null ? (
        <p>No Records Found...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Title</th>
              <th>Description</th>
              <th>Completion Date</th>
              <th>Importance</th>
              <th>Operations</th>
            </tr>
          </thead>
          <tbody>
            {notes.map((note) => (
              <tr
                key={note.id}
                style={{
                  backgroundColor:
                    // selectedRowUpdate === note.id ? "lightblue" : "inherit",
                    (selectedRowUpdate === note.id ? "info" : "inherit") ||
                         (selectedRowDelete === note.id ? "red" : "inherit"),
                }}
              >
                <td>{note.id}</td>
                <td>{note.title}</td>
                <td>{note.description}</td>
                <td>{note.cdate}</td>
                <td>
                  <div
                    style={{
                      height: 30,
                      backgroundColor: note.importance,
                    }}
                  />
                </td>
                <td>
                  <button className="btn" onClick={() => toggleDelete(note.id)}>Delete</button>
                  <button className="btn" onClick={() => toggleUpdate(note)}>Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PrintNotes;
