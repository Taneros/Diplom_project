import React, { useEffect } from 'react'
import Categories from '../../components/pages_element/Categories'



export default function CategoriesPage() {
  
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (

    <div>
      <Categories/>
    </div>
  )
}
