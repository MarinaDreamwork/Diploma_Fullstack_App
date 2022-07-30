import React from 'react';
import FlexStyleWrapper from '../common/styles/flexStyleWrapper';
import UserLoader from '../HOC/userLoader';
import Orders from '../Main/orders/orders';

const MyOrders = () => {
  return (
    <UserLoader>
      <section>
        <FlexStyleWrapper
          position='center'
          style='flex-column m-3 p-2'
        >
          <Orders />
        </FlexStyleWrapper>
      </section>
    </UserLoader>
  );
};

export default MyOrders;