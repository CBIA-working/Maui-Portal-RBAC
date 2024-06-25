"use client";
import React, { use, useEffect } from 'react'

export default function Page() {
    const [users, setUsers] = React.useState([]);

    useEffect(() => {
        fetch('/api/getUsers')
            .then((res) => res.json())
            .then((data) => setUsers(data));
        
    }, []);
    // console.log(users);
    return (
        <div className='flex items-center flex-col mt-10 gap-x-3'>
            <h1 className='text-2xl font-semibold mb-10'>Users</h1>
            {
                users.map((user: { fname: string, lname: string, password: string }, index: number) => (
                    <div key={index} className='flex items-center gap-x-3'>
                        <p>{user.fname} {user.lname} : {user.password}</p>
                    </div>
                ))
            }
        </div>
    )
}
