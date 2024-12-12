import React, { useState } from 'react'
import './AddUser.css'

export function AddUser(props) {

    const { addUser } = props

    const [username, setUsername] = useState(null);
    const [fullName, setfullName] = useState(null);
    const [type, setType] = useState('regular-user');

    const options = [{
        label: 'regular',
        value: 'regular-user'
    },
    {
        label: 'power',
        value: 'power-user'
    }]

    return (
        <>
            <form className='user-form' onSubmit={(ev) => {
                ev.preventDefault();
                addUser({
                    username,
                    fullName,
                    type
                })
            }}>
                <div className="username">
                    <input type="text" placeholder='Enter username:' onChange={(evt) => setUsername(evt.target.value)} />
                </div>
                <div className="fullName">
                    <input type="text" placeholder='Enter full name:' onChange={(evt) => setfullName(evt.target.value)} />
                </div>
                <div className="type">
                    <select onInput={(evt) => setType(evt.target.value)}>
                        {options.map(o => {
                            return <option key={o.value} value={o.value}>{o.label}</option>
                        })}
                    </select>
                </div>
                <button className="add" type='Submit'>Add User</button>
            </form>
        </>
    )
}