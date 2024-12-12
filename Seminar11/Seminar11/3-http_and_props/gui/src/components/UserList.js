import React, { useEffect, useState } from "react";
import './UserList.css'
import { User } from "./User";


const serverUrl = 'http://localhost:3000'

function UserList() {
    const [users, setUsers] = useState([]);
    const [userType, setUserType] = useState(null);

    const getUsers = async () => {
        const response = await fetch(serverUrl + '/users');
        const data = await response.json();
        setUsers(data);
    }

    useEffect(() => {
        getUsers();
    }, [])

    const handleChange = (event) => {
        setUserType(event.target.value);
    };

    return (
        <>
            <div>
                <input type="radio" id="powerUser" name="userType" onChange={handleChange} value="power-user" />
                <label htmlFor="powerUser">Show power users</label>
            </div>
            <div>
                <input type="radio" id="regularUser" name="userType" onChange={handleChange} value="regular-user" />
                <label htmlFor="regularUser">Show regular users</label>
            </div>

            <div className="user-list">
                {users.map((u) => <User key={u.id} item={u} userType={userType}></User>)}
            </div>
        </>
    );

}

export default UserList;