import React, { useState, useEffect } from 'react';
import { getVideos, getCategories } from '../utils/services/contentServices';
import { AppLog } from '../utils/services/appLog';
import { categoriesRef } from '../utils/firebase/firebaseAuth';
import MovieGrid from '../Components/MovieGrid';

export default function Page_Public_Home() {
  const [categoryList, setCategoryList] = useState(<p>nothing here</p>);
  useEffect(() => {
    categoriesRef.onSnapshot((query) => {
      setCategoryList(
        query.docs.map((doc, key) => {
          const { Category_Name } = doc.data();
          // AppLog(Category_Name, 'Category_Name is ');
          //  return categories.push(Category_Name);

          return (
            <>
              <h1 key={key}>{Category_Name}</h1>
              <MovieGrid Category_Name={Category_Name} />
            </>
          );
        })
      );
    });
  }, []);

  return (
    <>
      <p>this is public home page</p>
      {categoryList}
    </>
  );
}
