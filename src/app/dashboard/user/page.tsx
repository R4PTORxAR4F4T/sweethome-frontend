'use client';

import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');

    const [userName, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [userType, setRole] = useState('');
    const [dob, setDob] = useState('');
    const [number, setNumber] = useState('');
    const [gander, setGander] = useState('');
    const [address, setAddress] = useState('');

    const router = useRouter();
    const [openModal, setOpenModal] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, [search]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`http://localhost:4000/control/alluser?search=${search}`, { withCredentials: true });
            if (response.status === 200 && Array.isArray(response.data)) {
                setUsers(response.data);
            } else {
                console.error("Expected an array but got:", response.data);
            }
        } catch (error) {
            if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                router.push("/login");
            } else {
                console.error("Error fetching users:", error);
            }
        }
    };

    const handleAddUser = async (e) => {
        e.preventDefault();
        if (!userName.trim() || !email.trim() || !password.trim() || !userType.trim()) {
            alert("All fields are required!");
            return;
        }
        try {
            const response = await axios.post("http://localhost:4000/control/adminadduser", 
                { userName, email, password, userType },
                { withCredentials: true }
            );
            if (response.status === 201) {
                alert(response.data.message);
                setName('');
                setEmail('');
                setPassword('');
                setRole('');
                fetchUsers();
            }
        } catch (error) {
            console.error("Error adding user:", error);
        }
    };

    const handleGetUser = async (userId) => {
        try {
            const response = await axios.get(`http://localhost:4000/control/alluser/${userId}`, { withCredentials: true });
            setSelectedUser(response.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    useEffect(() => {
        if (selectedUser) {
            setName(selectedUser.userName || '');
            setEmail(selectedUser.email || '');
            setPassword(selectedUser.password || '');
            setRole(selectedUser.userType || '');
            setDob(selectedUser.dob || '');
            setNumber(selectedUser.number || '');
            setGander(selectedUser.gander || '');
            setAddress(selectedUser.address || '');
        }
    }, [selectedUser]); // Run this effect when selectedUser changes
    

    const handleEditUser = async (userId, updatedData) => {
        try {
            const response = await axios.patch(`http://localhost:4000/control/alluser/${userId}`, updatedData, { withCredentials: true });
            if (response.status === 200) {
                alert("User updated successfully");
                fetchUsers();
                setOpenModal(null);
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    const handleDeleteUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:4000/control/alluser/${userId}`, { withCredentials: true });
            alert("User deleted successfully");
            fetchUsers();
            setOpenModal(null);
            
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };


    return (
        <div className=''>
            <div className='flex justify-end items-center mb-5'>
                <div className='w-[40%]'>
                    <form className="max-w-md mx-auto">   
                        <label htmlFor="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative">
                            <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                                </svg>
                            </div>
                            <input value={search} onChange={(e) => setSearch(e.target.value)} type="search" id="default-search" className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Mockups, Logos..."/>
                        </div>
                    </form>
                </div>
                <div>
                    <button data-modal-target="adduser-modal" data-modal-toggle="adduser-modal" type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="20" height="20" viewBox="0 0 24 24">
                        <path d="M12,2C6.477,2,2,6.477,2,12s4.477,10,10,10s10-4.477,10-10S17.523,2,12,2z M16,13h-3v3c0,0.552-0.448,1-1,1h0 c-0.552,0-1-0.448-1-1v-3H8c-0.552,0-1-0.448-1-1v0c0-0.552,0.448-1,1-1h3V8c0-0.552,0.448-1,1-1h0c0.552,0,1,0.448,1,1v3h3 c0.552,0,1,0.448,1,1v0C17,12.552,16.552,13,16,13z"></path>
                    </svg>
                        Add User
                    </button>

                    <div id="adduser-modal" tab-index="-1" aria-hidden="true" className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full">
                        <div className="relative p-4 w-full max-w-md max-h-full">
                            <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        Create New User
                                    </h3>
                                    <button type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="adduser-modal">
                                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                                        </svg>
                                        <span className="sr-only">Close modal</span>
                                    </button>
                                </div>
                                <form onSubmit={handleAddUser} className="p-4 md:p-5">
                                    <div className="grid gap-4 mb-4 grid-cols-2">
                                        <div className="col-span-2">
                                            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                                            <input type="text" value={userName} onChange={(e) => setName(e.target.value)}  name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="User name" required/>
                                        </div>
                                        <div className="col-span-2">
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Email</label>
                                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="User Email" required/>
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="password" required/>
                                        </div>
                                        <div className="col-span-2 sm:col-span-1">
                                            <label htmlFor="category" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Role</label>
                                            <select id="category" value={userType} onChange={(e) => setRole(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                                <option value="">Select Type</option>
                                                <option value="user">User</option>
                                                <option value="landlord">Landlord</option>
                                                <option value="admin">Admin</option>
                                            </select>
                                        </div>
                                    </div>
                                    <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                        Add
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col gap-5 flex-wrap'>
                {users.length > 0 ? (
                    users.map((user) => (
                        <div key={user.userId} className='bg-gray-900 flex justify-center items-center gap-5 p-4 rounded-lg'>
                            <div className='flex justify-start items-center'>
                                <div><svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M12 20a7.966 7.966 0 0 1-5.002-1.756l.002.001v-.683c0-1.794 1.492-3.25 3.333-3.25h3.334c1.84 0 3.333 1.456 3.333 3.25v.683A7.966 7.966 0 0 1 12 20ZM2 12C2 6.477 6.477 2 12 2s10 4.477 10 10c0 5.5-4.44 9.963-9.932 10h-.138C6.438 21.962 2 17.5 2 12Zm10-5c-1.84 0-3.333 1.455-3.333 3.25S10.159 13.5 12 13.5c1.84 0 3.333-1.455 3.333-3.25S13.841 7 12 7Z" clipRule="evenodd"/>
                                </svg></div>
                                <div>
                                <p className='w-40 text-green-300'>Name: {user.userName}</p>
                                <p>User role: {user.userType}</p>
                                </div>
                            </div>
                            <div>
                                <p>Membership</p>
                                <p>Gold</p>
                            </div>
                            <div className='flex gap-2'>
                                <div className='rounded-lg pl-6 py-3 w-48 text-black bg-orange-400/[80%]'>
                                    <p className='font-bold text-sm'>sales</p>
                                    <p className='mt-4 text-md font-bold'>$80</p>
                                    <p className='text-xs'>24hr to update</p>
                                </div>
                                <div className='rounded-lg pl-6 py-3 w-48 text-black bg-green-400/[80%]'>
                                    <p className='font-bold text-sm'>post interection</p>
                                    <p className='mt-4 p-0 text-md font-bold'>247 likes</p>
                                    <p className='p-0 text-md font-bold'>100 comment</p>
                                    
                                    <p className='text-xs'>new interaction</p>
                                </div>
                                <div className='rounded-lg p-3 w-48 text-black bg-purple-400/[80%]'>
                                    <p className='font-bold text-sm'>Number of transaction</p>
                                    <p className='mt-4 p-0 text-md font-bold'>3 total sales</p>   

                                    <p className='text-xs'>10% new transaction</p>
                                </div>
                            </div>
                            <div>
                                <button 
                                    data-modal-target={`userdetails-modal-${user.userId}`} 
                                    data-modal-toggle={`userdetails-modal-${user.userId}`} 
                                    type="button"
                                    onClick={() => {setOpenModal("details");handleGetUser(user.userId)}}
                                    className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                                    Details
                                </button>
                                
                                <button type="button" onClick={async() => { await handleGetUser(user.userId); setOpenModal('editopen');}}  className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Edit</button>
                                
                                <button type="button" onClick={() => {setOpenModal('deleteopen'); handleGetUser(user.userId);}} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">Delete</button>
                                    
                            </div>
                        </div>
                    ))
                ) : (
                    <p>No users found</p>
                )}


                {/* Details Modal */}
                {openModal === "details" && selectedUser && (
                    <div className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-black p-8 rounded-lg">
                            <div className="flex items-center gap-4 text-lg font-semibold border-b pb-8 mb-8">
                                <div>
                                    <svg className ="w-[40px] h-[40px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M4 4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2H4Zm10 5a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm0 3a1 1 0 0 1 1-1h3a1 1 0 1 1 0 2h-3a1 1 0 0 1-1-1Zm-8-5a3 3 0 1 1 6 0 3 3 0 0 1-6 0Zm1.942 4a3 3 0 0 0-2.847 2.051l-.044.133-.004.012c-.042.126-.055.167-.042.195.006.013.02.023.038.039.032.025.08.064.146.155A1 1 0 0 0 6 17h6a1 1 0 0 0 .811-.415.713.713 0 0 1 .146-.155c.019-.016.031-.026.038-.04.014-.027 0-.068-.042-.194l-.004-.012-.044-.133A3 3 0 0 0 10.059 14H7.942Z" clipRule="evenodd"/>
                                    </svg>
                                </div>
                                <div>
                                User Details
                                </div>
                            </div>
                            <div className='flex border p-7 rounded-xl'>
                                <div className='border-r pr-6 mr-6'>
                                    <p>User ID: {selectedUser.userId}</p>
                                    <p>Name: {selectedUser.userName}</p>
                                    <p>Email: {selectedUser.email}</p>
                                    <p>password: {selectedUser.password}</p>
                                    <p>Role: {selectedUser.userType}</p>
                                </div>
                                <div>
                                    <p>DOB: {selectedUser.dob}</p>
                                    <p>Number: {selectedUser.number}</p>
                                    <p>Gander: {selectedUser.gander}</p>
                                    <p>Address: {selectedUser.address}</p>
                                    <p>AC: {selectedUser.createdAt}</p>
                                </div>
                            </div>
                            <div className='w-full grid'>
                            <button onClick={() => setOpenModal(null)} className="justify-self-center w-[50%] mt-4 bg-gray-500 text-white px-4 py-2 rounded">Close</button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Edit Modal */}
                {openModal === "editopen" && selectedUser && (
                    <div className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-black p-8 rounded-lg">
                        <div className="flex items-center gap-4 text-lg font-semibold border-b pb-8 mb-8">
                            <div>
                            <svg className="w-[48px] h-[48px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z" clipRule="evenodd"/>
                                <path fillRule="evenodd" d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z" clipRule="evenodd"/>
                            </svg>
                            </div>
                            <div>
                            Edit User
                            </div>
                        </div>
                        <div className='flex border p-7 rounded-xl'>
                            <div className='text-black flex flex-col gap-4 border-r pr-6 mr-6'>
                                <input
                                    placeholder="Username"
                                    className="bg-white px-4 py-2 border border-black rounded-xl"
                                    type="text"
                                    value={userName}
                                    onChange={(e) => setName(e.target.value)} // Update state on change
                                />
                                <input
                                    placeholder="Email"
                                    className="bg-white px-4 py-2 border border-black rounded-xl"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)} // Update state on change
                                />
                                <input
                                    placeholder="Password"
                                    className="bg-white px-4 py-2 border border-black rounded-xl"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)} // Update state on change
                                />
                                <select value={userType} onChange={(e) => setRole(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="">Select Type</option>
                                    <option value="user">User</option>
                                    <option value="landlord">Landlord</option>
                                    <option value="admin">Admin</option>
                                </select>

                            </div>
                            <div className='text-black flex flex-col gap-4'>
                                <input placeholder='Date' className='bg-white px-4 py-2 border border-black rounded-xl' type="date" value={dob}
                                    onChange={(e) => setDob(e.target.value)}/>

                                <input placeholder='Number' className='bg-white px-4 py-2 border border-black rounded-xl' type="number" value={number}
                                    onChange={(e) => setNumber(e.target.value)}/>

                                <select value={gander} onChange={(e) => setGander(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                    <option value="">Select Gender</option>
                                    <option value="Male">Male</option>
                                    <option value="Female">Female</option>
                                </select>

                                <input
                                    placeholder="Address"
                                    className="bg-white px-4 py-2 border border-black rounded-xl"
                                    type="text"
                                    value={address} onChange={(e) => setAddress(e.target.value)}
                                />
                                
                            </div>
                        </div>
                        <div className='w-full grid'>
                        <button onClick={async() => {await handleEditUser(selectedUser.userId, {userName,email,password,userType,dob,number,gander,address}); setSelectedUser(null);
                            setName('');
                            setEmail('');
                            setPassword('');
                            setRole('');
                            setDob('');
                            setNumber('');
                            setGander('');
                            setAddress('');
                            setOpenModal(null);}} className="mt-4 bg-green-500 text-white px-4 py-2 rounded">Confirm Edit</button>
                        <button onClick={async() => {
                            setSelectedUser(null);
                            setName('');
                            setEmail('');
                            setPassword('');
                            setRole('');
                            setDob('');
                            setNumber('');
                            setGander('');
                            setAddress('');
                            setOpenModal(null);
                        }} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                    </div>
                </div>
                )}

                {/* Delete Modal */}
                {openModal === "deleteopen" && selectedUser && (
                    <div className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg">
                            <h3 className="text-lg font-semibold text-red-600">Confirm Delete</h3>
                            <p>Are you sure you want to delete {selectedUser.userName}?</p>
                            <button onClick={() => handleDeleteUser(selectedUser.userId)} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Delete</button>
                            <button onClick={() => setOpenModal(null)} className="mt-4 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Page;
