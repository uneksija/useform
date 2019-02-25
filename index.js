import { useState, useEffect } from 'react'

const noValidation = () => ({})

function parseValue(type, value, checked) {
  if (type === 'checkbox') return checked
  if (type === 'number' || type === 'range') {
    const parsed = parseFloat(value)
    if (isNaN(parsed)) return undefined
    return parsed
  }
  return value
}

function useForm({ initialValues, validate = noValidation, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    const errors = validate(values)
    setErrors(errors)
    const isValid = Object.keys(errors).length === 0
    setIsValid(isValid)
  }, [values])

  const handleChange = ({ target: { name, type, value, checked } }) =>
    setValues({
      ...values,
      [name]: parseValue(type, value, checked)
    })

  const handleSubmit = event => {
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
