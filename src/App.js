import React from 'react'


function App() {

  const [ form, setForm ] = React.useState({
    email: '',
    password: ''
  })

  const handleChange = ({target}) => {
    const { id, value } = target
    setForm({
      ...form,
      [id]: value
    })

    console.log(form)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <main>
      <h1>Formulários com React</h1>
      {form.email ? <h2>{form.email}</h2> : null}
      <form onSubmit={handleSubmit}>
        <input 
          id="email"
          name="email"
          placeholder="Digite seu email"
          type="email"
          value={form.email}
          onChange={handleChange}>
        </input>
        <br /><br />
        <input
          id="password"
          name="email"
          placeholder="Digite sua senha"
          type="password"
          value={form.password}
          onChange={handleChange}
          >
        </input>


        <br/><br/>
        <button type="submit">Login</button>
      </form>
    </main>
  );
}

export default App;
