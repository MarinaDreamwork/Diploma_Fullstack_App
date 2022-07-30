import React from 'react';
import { Route, Switch, useParams } from 'react-router-dom';
import AdminPanelSection from './adminPanelSection';
import AdminGoodsPage from './adminGoodsPage';
import AdminQuotesPage from './adminQuotesPage';
import AdminUsersPage from './adminUsersPage';
import AdminSalesGoodsPage from './adminReportSalesPage';
import AdminReportRemainsPage from './adminReportRemainsPage';
import AdminReportSalesPage from './adminReportSalesPage';
import FlexStyleWrapper from '../../common/styles/flexStyleWrapper';
import SectionWrapper from '../../common/styles/sectionWrapper';
import QuotesLoader from '../../HOC/quotesLoader';

const Admin = () => {
  // сделать прослойку, где роутинги направлять
  const params = useParams();
  const { essence } = params;

  if (essence === 'books_page') return <AdminGoodsPage />
  else if (essence === 'users_page') return <AdminUsersPage />
  else if (essence === 'quotes_page') return <QuotesLoader><AdminQuotesPage /></QuotesLoader>
  else if (essence === 'report_remains_page') return <AdminReportRemainsPage />
  else if (essence === 'report_sales_page') return <AdminReportSalesPage />

  const adminEditData = [
    { id: 1, cardTitle: 'Товары', cardText: 'Изменение, добавление или удаление товаров', buttonColor: 'success', buttonPath: 'admin/books_page' },
    { id: 2, cardTitle: 'Пользователи', cardText: 'Изменение, добавление или удаление пользователей', buttonColor: 'primary', buttonPath: 'admin/users_page' },
    { id: 3, cardTitle: 'Цитаты', cardText: 'Изменение, добавление или удаление цитат', buttonColor: 'warning', buttonPath: 'admin/quotes_page' }
  ];

  const adminReportData = [
    { id: 1, cardTitle: 'Отчет об остатках', cardText: 'Общий отчет об остатках товаров на текущую дату', buttonColor: 'secondary', buttonPath: 'admin/report_remains_page' },
    { id: 2, cardTitle: 'Отчет о продажах', cardText: 'Отчет о продажах в разрезе товаров на текущую дату', buttonColor: 'danger', buttonPath: 'admin/report_sales_page' },
    // { id: 3, cardTitle: 'Отчет о продажах', cardText: 'Отчет по средней выручке', buttonColor: 'info', buttonPath: 'admin/report_avarage_revenue_page' }
  ];

  // const adminRemainsData = [
  //   { id: 1, cardTitle: 'Отчет об остатках', cardText: 'Общий отчет об остатках товаров на определенную дату', buttonColor: 'outline-primary', buttonPath: 'admin/report_remains_page' },
  //   { id: 2, cardTitle: 'Отчет об остатках', cardText: 'Общий отчет об остатках товаров на определенную дату', buttonColor: 'dark', buttonPath: 'admin/report_remains_goods_page' },
  //   { id: 3, cardTitle: 'Отчет об остатках', cardText: 'Общий отчет об остатках товаров на определенную дату', buttonColor: 'outline-success', buttonPath: 'admin/report_average_remains_goods_page' }
  // ];

  return (
    <SectionWrapper>
      <FlexStyleWrapper
        position='around'
        style='align-items-around m-3'
      >
        <AdminPanelSection
          editSectionTitle='Редактирование:'
          adminData={adminEditData}
        />
        <AdminPanelSection
          editSectionTitle='Продажи:'
          adminData={adminReportData}
        />
      </FlexStyleWrapper>
      <Switch>
        <Route path='/books_page' component={AdminGoodsPage} />
        <Route path='/quotes_page' component={AdminQuotesPage} />
        <Route path='/report_sales_page' component={AdminSalesGoodsPage} />
      </Switch>
    </SectionWrapper>
  );
}

export default Admin;