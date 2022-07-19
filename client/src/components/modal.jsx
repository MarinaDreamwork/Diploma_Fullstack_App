// import { Button, Modal } from 'bootstrap';
// import React, { useState } from 'react';

// const ModalWindow = () => {
//   const [show, setShow] = useState(false);
//   const handleShow = () => setShow(true);
//   const handleClose = () => setShow(false);

//   const handleClick = () => {

//   };

//   return (
//     <>
//       <Button variant='primary' onClick={handleShow}>
//         Categories
//       </Button>
//        <Modal show={show} onHide={handleClose}>
//         <Modal.Header closeButton>
//           <Modal.Title>Categories:</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <ul>
//           {categories.map(category => <li key={category.id}>
//               <a className='category' onClick={handleClick}>{category.name}</a>
//             </li>
//           )}
//           </ul>
//         </Modal.Body>
//       </Modal>
//     </>
//   )
// }
 
// export default ModalWindow;