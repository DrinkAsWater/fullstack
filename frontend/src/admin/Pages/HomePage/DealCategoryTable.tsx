import React from 'react'
import HomeCategoryTable from './HomeCategoryTable'
import { useFormik } from 'formik'
import { discount } from 'src/data/Filter/discount'
import { useAppSelector } from 'src/State/Store'

const DealCategoryTable = () => {
  const {customer} = useAppSelector(store=>store)

  return (
    <div><HomeCategoryTable data={customer.homePageData?.dealCategories || []} /></div>
  )
}

export default DealCategoryTable