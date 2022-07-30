import React from 'react';
import PropTypes from 'prop-types';
import Button from './button';
import FlexStyleWrapper from './flexStyleWrapper';
import { useHistory } from 'react-router-dom';

const SectionWrapper = ({ children, style }) => {
  const history = useHistory();
  const handleBackHomePage = () => {
    history.push('/');
  };

  return (
    <section>
      <div className={'container ' + style}>
        <FlexStyleWrapper style='m-auto p-3'>
          <Button
            color='outline-success'
            description='Вернуться на главную страницу'
            onClick={handleBackHomePage}
          />
        </FlexStyleWrapper>
        {children}
      </div>
    </section>
  );
};

SectionWrapper.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node)
  ]),
  style: PropTypes.string
};

export default SectionWrapper;