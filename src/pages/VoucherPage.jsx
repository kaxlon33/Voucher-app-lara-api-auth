import React from 'react'
import BreadCrumb from '../components/BreadCrumb'
import VoucherList from '../components/VoucherList';

const VoucherPage = () => {
  return (
    <section>
      <BreadCrumb currentPageTitle={"Voucher Module"}/>
      <VoucherList/>
    </section>
  )
}

export default VoucherPage