import Form from '../../components/Form/Form.jsx'
import React, { useState, useContext, useCallback, useEffect } from 'react';
import Modal from '../../components/Modal/Modal';
import EmailListItem from '../../components/EmailListItem/EmailListItem';
import axios from 'axios';
import UserContext from '../../context';


function EmailsPage() {
    const [people, createPeople] = useState([])
    const [person, createPerson] = useState({name: '', email: ''})
    const [emailIsOpened, changeIsOpened] = useState(false)
    const { user } = useContext(UserContext)
    const userId = user.data.user.userId
    const userData = {
        email: user.data.user.userEmail,
        password: user.data.user.userPassword
    }

    const [error, setError] = useState('')

    useEffect(() => {
        if (error) {
            alert(error)
            setError()
        }
    }, [error])

    const createNewContact = useCallback(async () => {
        try {
            await axios.post('/api/newcontact', 
            {userId: userId, contactName: person.name, contactEmail: person.email},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(res => createPeople([...people, res.data]))
            .then(createPerson({name: '', email: ''}))
            .catch((error) => {
                if (error.response) {
                    setError(error.response.data.message)
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [person, userId, people])

    const getContacts = useCallback(async () => {
        try {
            await axios.get('/api/allcontacts', {
                headers: {
                    'Content-Type': 'application/json'
                },
                params: {userId}
            })
            .then(res => createPeople(res.data))
        } catch (err) {
            console.log(err)
        }
    }, [userId])


    const removePerson = useCallback(async (id) => {
        try {
            await axios.delete(`/api/user/${id}`,
            {
                headers: {
                    'Content-Type': 'application/json'
                },
            params: {id}})
            .then(getContacts())
        } catch (err) {
            console.log(err)
        }
    }, [getContacts])

    const wantToSend = (item) => {
        if (emailIsOpened) {
        changeIsOpened(false)
        } else {
        changeIsOpened(item)
        }
    }

    useEffect(() => {
        getContacts()
    }, [getContacts])

    return (
    <div className="container">
        <main className='body'>
        <Form createNewContact={createNewContact} person={person} createPerson={createPerson} />
        <h2>Email list:</h2>
        <div className='emails-list'>
            {emailIsOpened ?
            <>
                <Modal emailIsOpened={emailIsOpened} wantToSend={wantToSend} userData={userData} setError={setError}/>
                {
                people.map((item) => <EmailListItem key={item.contactId} item={item} removePerson={removePerson} wantToSend={wantToSend}/>) 
                }
            </> :
            people.map((item) => <EmailListItem key={item.contactId} item={item} removePerson={removePerson} wantToSend={wantToSend}/>) 
            }
        </div>
        </main>
        <footer className='footer'>
        <span>2022 tashapav</span>
        </footer>
    </div>
    );
}


export default EmailsPage