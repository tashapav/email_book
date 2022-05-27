import axios from 'axios';
import React, { useCallback, useState } from 'react';
import './Modal.css';

function Modal({wantToSend, emailIsOpened, userData, setError}) {
    const [emailInfo, setEmailInfo] = useState({
        userEmail: userData.email,
        userPass: userData.password,
        contactTo: emailIsOpened.contactEmail,
        subject: '',
        text: ''
    })

    const sendEmail = useCallback(async (emailInfo) => {
        try {
            await axios.post('/api/sendemail', 
            {emailInfo: emailInfo},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            .then(setEmailInfo({...emailInfo, subject: '', text: ''}))
            .catch((error) => {
                if (error.response) {
                    setError(error.response.data.message)
                    setEmailInfo({...emailInfo})
                }
            })
        } catch (err) {
            console.log(err)
        }
    }, [setError])

    return (
    
    <div className='modal'>
        <div className='modal__content'>
            <div className='exit-wrapper'>
                    <button className='modal-exit btn btn-h' onClick={() => wantToSend(false)}> × </button>
            </div>
            <h1>Email</h1>
            <div className='email-form'>
                <label htmlFor='sender'>От кого</label>
                <input type="text" id='sender' value={emailInfo.userEmail} readOnly></input>
                <label htmlFor='addressee'>Кому</label>
                <input type="text" id='addressee' placeholder='Получатель' value={emailInfo.contactTo} onChange={(e) => setEmailInfo({...emailInfo, contactTo: e.target.value})}></ input>
                <label htmlFor='subject'>Тема</label>
                <input type="text" id='subject' placeholder='Тема письма' value={emailInfo.subject} onChange={(e) => setEmailInfo({...emailInfo, subject: e.target.value})}></ input>
                <textarea value={emailInfo.text} placeholder='Письмо' onChange={(e) => setEmailInfo({...emailInfo, text: e.target.value})}></textarea>
            </div> 
            <button type='submit' className='btn btn-h' onClick={() => sendEmail(emailInfo)}>Отправить</button>
        </div>
    </div>
    );
}

export default Modal;