import { useState } from 'react'

const noValidation = () => ({})

function useForm({ initialValues, validate = noValidation, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(true)

  const handleChange = ({ target: { name, type, value, checked } }) =>
    setValues({
      ...values,
      [name]: type === 'checkbox' ? checked : value
    })

  const handleSubmit = event => {
    const errors = validate(values)
    setErrors(errors)
    const isValid = Object.keys(errors).length === 0
    setIsValid(isValid)

    if (isValid) onSubmit(values)
    event.preventDefault()
    return false
  }

  return {
    values,
    errors,
    isValid,
    handleChange,
    handleSubmit
  }
}

export default useForm
