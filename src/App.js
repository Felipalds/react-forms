import React from 'react'
import axios from 'axios'

function App() {

  const [ form, setForm ] = React.useState({
    name: '',
    email: '',
    password: '',
    cep: '',
    street: ''
  })

  const [ resp, setResp ] = React.useState('')

  const handleChange = ({target}) => {
    const { id, value } = target
    setForm({
      ...form,
      [id]: value
    })

    console.log(form)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    try{
    await axios.post('https://ranekapi.origamid.dev/json/api/usuario', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(form)
    })
    setResp('Sucess')
    }catch(err){
      setResp('Err')
    }
  }

  const handleCep = async({target}) => {
    const { id, value } = target
    setForm({
      ...form,
      [id]:value
    })
    if(form.cep.length === 8)
    try{
      fetch(`https://viacep.com.br/ws/${form.cep}/json`).then(res => res.json()).then(data => console.log(data))
    } catch(err){
      return 0
    }
  }



  return (
    <main>
      <h1>Formulários com React</h1>
      {form.email ? <h2>{form.email}</h2> : null}
      <form onSubmit={handleSubmit}>
        <input
          id="name"
          name="name"
          placeholder="Nome completo"
          type="text"
          value={form.name}
          onChange={handleChange}>
        </input>
        <input 
          id="email"
          name="email"
          placeholder="Digite seu email"
          type="email"
          value={form.email}
          onChange={handleChange}>
        </input>
        <input
          id="password"
          name="email"
          placeholder="Digite sua senha"
          type="password"
          value={form.password}
          onChange={handleChange}
          >
        </input>
        <input 
          id="cep"
          name="cep"
          placeholder="CEP"
          type="number"
          value={form.cep}
          onChange={handleCep}>
        </input>

        <button type="submit">Login</button>
        {resp ? <div id="r">{resp}</div> : null}
      </form>
    </main>
  );
}

export default App;
