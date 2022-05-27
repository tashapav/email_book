import React from "react";
import './Form.css'

function Form({createNewContact, person, createPerson}) {

    return(
        <form className="add-form" onSubmit={e => e.preventDefault()}>
            <label htmlFor='name'>Название</label>
            <input type="text" id='name' value={person.name} onChange={e => createPerson({...person, name: e.target.value})}></input>
            <label htmlFor='email'>Email</label>
            <input type="email" id='email' value={person.email} onChange={e => createPerson({...person, email: e.target.value})}></input>
            <button type="submit" onClick={createNewContact}>Добавить</button>
        </form>
    )
}

export default Form
