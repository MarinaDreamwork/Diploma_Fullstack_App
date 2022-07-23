import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { filterCategoryBook, filterSubCategoryBook, filterSubSubCategoryBook } from '../../../app/store/books';
import PagesSectionWrapper from '../../common/styles/pagesSectionWrapper';
import BreadCrumps from '../../Main/breadCrumps';
import CategoriesPage from './categoriesPage';

const Categories = () => {

  const { category, subCategory, subSubCategory } = useParams();
  const categories = useSelector(filterCategoryBook(category));
  const subCategories = useSelector(filterSubCategoryBook(subCategory));
  const subSubCategories = useSelector(filterSubSubCategoryBook(subSubCategory));
  console.log('params', category, subCategory, subSubCategory);
  console.log('selector', categories, subCategories, subSubCategories);
  return (
    <PagesSectionWrapper>
      <BreadCrumps
        category={category}
        subCategory={subCategory}
        subSubCategory={subSubCategory}
      />
      <div className='container'>
        <h3>{subSubCategory || subCategory || category}</h3>
        <div className="row row-cols-1 row-cols-md-3 m-2">
          {
            subSubCategory ? (
              subSubCategories.map(item => <CategoriesPage key={item.id} {...item} />))
              : (subCategory
                ? subCategories.map(item => <CategoriesPage key={item.id} {...item} />)
                : category ? categories.map(item => <CategoriesPage key={item.id} {...item} />) : null)

          }
        </div>
        {/* {(subSubCategory && subSubCategories || subCategory && subCategories || category && categories).map(item => <CategoriesPage key={item.id} {...item} />)} */}
      </div>
    </PagesSectionWrapper>
  );
};

export default Categories;