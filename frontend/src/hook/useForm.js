import React, { useState } from 'react'

const useForm = (initialValue) => {
    const [value, setValue] = useState(initialValue)

    const handleChange = (e)=>{
        setValue({
            ...value,
            [e.target.name] : e.target.value
        })
    }
  return (
    {value, setValue, handleChange}
  )
}

export default useForm