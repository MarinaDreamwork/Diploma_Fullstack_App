import React from 'react';
import PropTypes from 'prop-types';

const AddressField = ({ onChange, valueZip, valueStreet, valueApp, errorStreet }) => {
  const getInputClasses = () => {
    return 'form-control ' + (errorStreet && 'is-invalid');
  };
  return (
    <>
      <p>Заполните адрес:</p>
      {/* <div className='col-md-4'>
        <select id='inputState' className='form-select'>
          <option selected>Выберете город...</option>
          <option>Москва</option>
          <option>Питер</option>
          <option>Луховицы</option>
        </select>
      </div> */}
      <div className='col-md-6'>
        {/* <label htmlFor='inputCity' className='form-label'>Город</label> */}
        <input
          type='text'
          className={getInputClasses()}
          name='street'
          id='street'
          placeholder='Улица'
          onChange={onChange}
          value={valueStreet}
        />
        {
          errorStreet && <div className='invalid-feedback'>{errorStreet}</div>
        }
      </div>
      <div className='col-md-6'>
        {/* <label htmlFor='inputAddress2' className='form-label'>Улица</label> */}
        <input
          type='text'
          className='form-control mt-3'
          name='appartment'
          id='appartment'
          placeholder='Введите № дома-квартиры'
          onChange={onChange}
          value={valueApp}
        />
      </div>

      <div className='col-md-2'>
        {/* <label htmlFor='inputZip' className='form-label'>Zip</label> */}
        <input
          type='text'
          className='form-control mt-3'
          name='zip'
          id='zip'
          placeholder='индекс'
          onChange={onChange}
          value={valueZip}
        />
      </div>
      <div className='col-12'>
        <div className='form-check mt-3 mb-3'>
          <input className='form-check-input' type='checkbox' id='gridCheck' />
          <label className='form-check-label' htmlFor='gridCheck'>
            Принимаю условия пользовательского соглашения
          </label>
        </div>
      </div>
    </>
  );
};

AddressField.propTypes = {
  onChange: PropTypes.func.isRequired,
  valueZip: PropTypes.string.isRequired,
  valueStreet: PropTypes.string.isRequired,
  valueApp: PropTypes.string.isRequired,
  errorStreet: PropTypes.string.isRequired
}

export default AddressField;