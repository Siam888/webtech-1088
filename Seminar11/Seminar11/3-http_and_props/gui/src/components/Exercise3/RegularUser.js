import React from "react";
import './RegularUser.css'

export function RegularUser(props) {
    const { item } = props;

    return (
        <div>
            <h2>Regular Users</h2>
            <div className='regular-user'>
                <div className='username'>
                    {item.username}
                </div>
                <div className='fullName'>
                    {item.fullName}
                </div>
            </div>
        </div>
    );
}