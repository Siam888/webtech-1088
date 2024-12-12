import React from "react";
import './PowerUser.css'


export function PowerUser(props) {

    const { item } = props;

    return (
        <div>
            <h2>Power Users</h2>
            <div className='power-user'>
                <div className='username'>
                    {item.username}
                </div>
                <div className='fullName'>
                    {item.fullName}
                </div>
            </div>
        </div>
    )
}