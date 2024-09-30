import React from 'react'
import { useParams } from 'react-router-dom'

const Search = () => {
  const { query } = useParams() // Lấy tham số từ URL
  console.log(query)

  return <div>Search</div>
}

export default Search
