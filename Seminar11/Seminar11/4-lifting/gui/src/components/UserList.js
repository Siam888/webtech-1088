import React, { useEffect, useState } from "react";
import './UserList.css'
import { User } from "./User";
import { AddUser } from "./AddUser";
import { UserDetail } from "./UserDetail";


const serverUrl = 'http://localhost:3000'

function UserList() {
    const [users, setUsers] = useState([]);
    const [userType, setUserType] = useState(null);
    const [selected, setSelected] = useState(-1)

    const getUsers = async () => {
        const response = await fetch(serverUrl + '/users');
        const data = await response.json();
        setUsers(data);
    }

    const addUser = async (user) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user)
        };

        console.log('User to add:', user)

        await fetch(serverUrl + '/users', requestOptions)
        getUsers();
    }

    useEffect(() => {
        getUsers();
    }, [])

    const handleChange = (event) => {
        setUserType(event.target.value);
    };

    return (
        <>
            {selected !== -1 ? <UserDetail item={users.find(x => x.id === selected)} onCancel={() => setSelected(-1)} /> :
                <>
                    <div>
                        <AddUser addUser={addUser}></AddUser>
                    </div>
                    <div>
                        <input type="radio" id="powerUser" name="userType" onChange={handleChange} value="power-user" />
                        <label htmlFor="powerUser">Show power users</label>
                    </div>
                    <div>
                        <input type="radio" id="regularUser" name="userType" onChange={handleChange} value="regular-user" />
                        <label htmlFor="regularUser">Show regular users</label>
                    </div>

                    <div className="user-list">
                        {users.map((u) => <User key={u.id} item={u} userType={userType} onSelect={(id) => {setSelected(id)}}></User>)}
                    </div>
                </>
            }
        </>
    );

}

export default UserList;