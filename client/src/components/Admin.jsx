import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Admin = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get('http://localhost:5000/api/auth/admin/users');
            setUsers(res.data);
        };
        fetchUsers();
    }, []);

    return (
        <div className="container" style={{padding: '40px'}}>
            <h1 style={{color: 'var(--primary)'}}>ADMIN PANEL: User Management</h1>
            <table style={{width: '100%', background: 'var(--glass)', borderRadius: '15px', padding: '20px', borderCollapse: 'collapse'}}>
                <thead>
                    <tr style={{textAlign: 'left', borderBottom: '1px solid #334155'}}>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>XP Level</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(u => (
                        <tr key={u._id} style={{borderBottom: '1px solid #1e293b'}}>
                            <td style={{padding: '15px'}}>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td>{Math.floor(u.xp / 100) + 1}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default Admin;