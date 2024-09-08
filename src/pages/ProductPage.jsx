import React from 'react'
import { Container } from '../components/Container'
import BreadCrumb from '../components/BreadCrumb'
import ProductList from '../components/ProductList'

const ProductPage = () => {
  return (
    <section>
      <Container>
        <BreadCrumb currentPageTitle={"Product Page"}/>
        <ProductList/>
      </Container>
    </section>
  )
}

export default ProductPage