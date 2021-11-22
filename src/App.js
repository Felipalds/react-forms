import React from 'react'
import axios from 'axios'
import formFields from './utils/formFields'

function App() {

  const [ form, setForm ] = React.useState({
    name: '',
    email: '',
    password: '',
    cep: '',
    street: '',
    number: '',
    neighborhood: '',
    city: '',
    state: '',
  })

  // refat
  const [ resp, setResp ] = React.useState('')

  const handleChange = ({target}) => {
    const { id, value } = target
    setForm({
      ...form,
      [id]: value
    })

    if(id === "cep"){
      if(form.cep.length === 8){
        handleCep()
      }
    }

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

  const handleCep = async() => {
      try{
        await fetch(`https://viacep.com.br/ws/${form.cep}/json`)
        .then(res => res.json())
        .then(data => setAddress(data))
      } catch(err){
        return 0
      }
  }

  const setAddress = (data) => {
    setForm({
      ...form,
      street: data.logradouro,
      neighborhood: data.bairro,
      city: data.localidade,
      state: data.uf
    })
  }



  return (
    <main>
      <h1>Formulários com React</h1>
      {form.email ? <h2>{form.email}</h2> : null}
      <form onSubmit={handleSubmit}>
        {formFields.map(({id, name, type, placeholder}) => (
          <input
            id={id}
            name={name}
            type={type}
            placeholder={placeholder}
            onChange={handleChange}>
          </input>
        ))}

        {form.cep ? form.cep.length === 8 ? 
        <>
          <input
            id="street"
            name="street"
            placeholder="Rua"
            type="text"
            value={form.street}
            onChange={handleChange}>
          </input>
          <input 
            id="number"
            name="number"
            placeholder="Número"
            type="number"
            value={form.number}
            onChange={handleChange}>
          </input>
          <input
            id="neighborhood"
            name="neighborhood"
            placeholder="Bairro"
            type="text"
            value={form.neighborhood}
            onChange={handleChange}>
          </input>
          <input
            id="city"
            name="city"
            placeholder="Cidade"
            type="text"
            value={form.city}
            onChange={handleChange}>
          </input>
          <input
            id="state"
            name="state"
            placeholder="Estado"
            type="text"
            value={form.state}
            onChange={handleChange}>
          </input>
        </>
        
        : null : null}
        <button type="submit">Login</button>
        {resp ? <div id="r">{resp}</div> : null}
      </form>
    </main>
  );
}

export default App;
