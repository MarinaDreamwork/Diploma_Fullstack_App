import React from 'react';
import PropTypes from 'prop-types';

const AddressField = ({ onChange, valueZip, valueStreet, valueApp, errorStreet, errorAppartment, errorZip }) => {

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
          className={'form-control ' + (errorStreet && 'is-invalid')}
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
          className={'form-control mt-3 ' + (errorAppartment && 'is-invalid')}
          name='appartment'
          id='appartment'
          placeholder='Введите № дома-квартиры'
          onChange={onChange}
          value={valueApp}
        />
        {
          errorAppartment && <div className='invalid-feedback'>{errorAppartment}</div>
        }
      </div>

      <div className='col-md-2 mb-3'>
        {/* <label htmlFor='inputZip' className='form-label'>Zip</label> */}
        <input
          type='text'
          className={'form-control mt-3 ' + (errorZip && 'is-invalid')}
          name='zip'
          id='zip'
          placeholder='индекс'
          onChange={onChange}
          value={valueZip}
        />
        {
          errorZip && <div className='invalid-feedback'>{errorZip}</div>
        }
      </div>
    </>
  );
};

AddressField.propTypes = {
  onChange: PropTypes.func.isRequired,
  valueZip: PropTypes.string.isRequired,
  valueStreet: PropTypes.string.isRequired,
  valueApp: PropTypes.string.isRequired,
  errorStreet: PropTypes.string,
  errorAppartment: PropTypes.string,
  errorZip: PropTypes.string
}

export default AddressField;