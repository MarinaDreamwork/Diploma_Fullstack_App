const TableHeader = () => {
  return ( 
    <thead>
      <tr>
        <th scope='col'>#</th>
        <th scope='col'>Автор</th>
        <th scope='col'>Название книги</th>
        <th scope='col'>Стоимость, руб.</th>
        <th scope='col'>Количество, шт</th>
        <th scope='col'>Общая стоимость, руб.</th>
        <th scope='col'></th>
      </tr>
    </thead>
  );
}
 
export default TableHeader;