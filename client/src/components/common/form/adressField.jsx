import React from 'react';
import PropTypes from 'prop-types';

const AddressField = ({
  onChange,
  label,
  valueZip,
  valueStreet,
  valueApp,
  nameZip,
  nameStreet,
  nameApp,
  errorstreet,
  errorapp,
  errorzip
}) => {

  return (
    <div className='mt-3 mb-3'>
      <p>{label}</p>
      {/* <div className='col-md-4'>
        <select id='inputState' className='form-select'>
          <option selected>Выберете город...</option>
          <option>Москва</option>
          <option>Питер</option>
          <option>Луховицы</option>
        </select>
      </div> */}
      <div className='col-md-6'>
        <input
          className={'shadow ms-0 form-control ' + (errorstreet && 'is-invalid')}
          name={nameStreet}
          placeholder='Улица'
          onChange={onChange}
          value={valueStreet}
          errorstreet={errorstreet}
        />
        {
          errorstreet && <div className='invalid-feedback'>{errorstreet}</div>
        }
      </div>
      <div className='col-md-6'>
        <input
          className={'shadow ms-0 form-control mt-3 ' + (errorapp && 'is-invalid')}
          name={nameApp}
          placeholder='Введите № дома-квартиры'
          onChange={onChange}
          value={valueApp}
          errorapp={errorapp}
        />
        {
          errorapp && <div className='invalid-feedback'>{errorapp}</div>
        }
      </div>

      <div className='col-md-2 mb-3'>
        <input
          className={'shadow ms-0 form-control mt-3 ' + (errorzip && 'is-invalid')}
          name={nameZip}
          placeholder='индекс'
          onChange={onChange}
          value={valueZip}
          errorzip={errorzip}
        />
        {
          errorzip && <div className='invalid-feedback'>{errorzip}</div>
        }
      </div>
    </div>
  );
};

AddressField.defaultProps = {
  type: 'text'
};

AddressField.propTypes = {
  onChange: PropTypes.func.isRequired,
  label: PropTypes.string.isRequired,
  valueZip: PropTypes.string.isRequired,
  valueStreet: PropTypes.string.isRequired,
  valueApp: PropTypes.string.isRequired,
  nameZip: PropTypes.string.isRequired,
  nameStreet: PropTypes.string.isRequired,
  nameApp: PropTypes.string.isRequired,
  errorstreet: PropTypes.string,
  errorapp: PropTypes.string,
  errorzip: PropTypes.string
}

export default AddressField;