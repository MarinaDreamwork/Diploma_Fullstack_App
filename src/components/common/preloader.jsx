const Preloader = () => {
  return ( 
    <div className='m-auto p-5'><div
        className='spinner-border text-success'
        role='status'
      >
          <span
            className="visually-hidden"
          >
            Loading...</span>
      </div></div>
  );
}
 
export default Preloader;