import React from 'react'
import Component from '../page'
import { singleLocation } from '@/app/service/operations/room'

function page({params}) {
  const {id} = params
  
  return (
    <>
      <Component/>
    </>
  )
}

export default page