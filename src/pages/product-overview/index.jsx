import React from 'react'
import { useParams } from "react-router-dom";

function Index() {
  const { id } = useParams();
  console.log("Product ID:", id);
  return (
    <div className='text-mainBody-yellow'>Index about us</div>
  )
}

export default Index