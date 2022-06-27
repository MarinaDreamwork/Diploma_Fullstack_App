const CloseButton = ({ onCloseBtn, navStatus, style, onDelete }) => {
  return <i
    className='bi bi-x-lg'
    style={style}
    onClick={onDelete}></i>;
};
 
export default CloseButton;