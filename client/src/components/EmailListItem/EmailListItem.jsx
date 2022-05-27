import React from "react";
import './EmailListItem.css'
import { RiMailSendLine } from 'react-icons/ri'
import { AiOutlineDelete } from 'react-icons/ai'

function EmailListItem({item, removePerson, wantToSend}) {

    return(
            <div className='email-list__item'>
                <div className='item-info'>
                    <h4 className='item-name'>{item.contactName}</h4>
                    <div className='item-email'>{item.contactEmail}</div>
                </div>
                <div className='item-buttons'>
                    <button type='submit' onClick={() => wantToSend(item)}><RiMailSendLine /></button>
                    <button type='submit' onClick={() => removePerson(item.contactId)}><AiOutlineDelete /></button>
                </div>  
            </div>
            
        
    )
}

export default EmailListItem