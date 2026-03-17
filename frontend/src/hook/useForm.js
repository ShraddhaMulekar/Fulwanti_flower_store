import { useState } from "react";

const useForm = (initialValue) => {
    const [values, setValues] = useState(initialValue);

    const handleChange = (e)=>{
        setValues((prev) => ({
            ...prev,
            [e.target.name] : e.target.value
        }))
    }

  // Backward-compat: some files may still use `value` / `setValue`.
  return { values, setValues, value: values, setValue: setValues, handleChange };
}

export default useForm