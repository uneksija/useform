# useform

React hook for simple form control

![npm (scoped)](https://img.shields.io/npm/v/@uneksija/useform.svg)
![GitHub](https://img.shields.io/github/license/uneksija/useform.svg)

## Installation

```sh
npm install @uneksija/useform
```

## Importing the hook

```js
import useForm from '@uneksija/useform'
```

## Example usage

```js
function validate({ age }) {
  if (age < 18) return { age: '18+ only' }
  return {}
}

function App() {
  const { values, errors, isValid, handleChange, handleSubmit } = useForm({
    validate,
    initialValues: {
      name: 'john',
      age: 23
    },
    onSubmit: console.log
  })

  return (
    <form onSubmit={handleSubmit}>
      <label>
        name
        <input
          name="name"
          type="text"
          value={values.name}
          onChange={handleChange}
        />
      </label>
      <br />
      <label>
        age
        <input
          name="age"
          type="number"
          value={values.age}
          onChange={handleChange}
        />
        {errors.age}
      </label>
      <br />
      <button type="submit" disabled={!isValid}>
        save
      </button>
    </form>
  )
}
```

## Arguments

| Argument      | Description                                            |
| ------------- | ------------------------------------------------------ |
| initialValues | Object containing the form initial values              |
| onSubmit      | Function called with the values on form submit         |
| validate      | Validate function, returns an object of error messages |

## Return object

| Key          | Description                                           |
| ------------ | ----------------------------------------------------- |
| values       | Form values                                           |
| errors       | Error messages                                        |
| isValid      | Flag indicating if there are any errors               |
| handleChange | OnChange handler, input name needs to match value key |
| handleSubmit | OnSubmit handler                                      |