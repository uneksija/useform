import { useState, useEffect } from 'react'

function parseValue(type, value, checked) {
  if (type === 'checkbox') return checked
  if (type === 'number' || type === 'range') {
    const parsed = parseFloat(value)
    if (isNaN(parsed)) return undefined
    return parsed
  }
  return value
}

function useForm({ initialValues, validate, onSubmit }) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [isValid, setIsValid] = useState(true)

  useEffect(() => {
    setValues(initialValues)
  }, [initialValues])

  useEffect(() => {
    if (typeof validate !== 'function') return
    const errors = validate(values)
    setErrors(errors)
    if (errors) {
      const isValid = Object.keys(errors).length === 0
      setIsValid(isValid)
    }
  }, [values, validate])

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
