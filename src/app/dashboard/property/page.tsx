'use client'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Page = () => {
    const [properties, setProperties] = useState([]);
    const [openModal, setOpenModal] = useState(null);
    const [feedback, setFeedback] =useState('');

    
    const [selectedVerifyProperty, setSelectedVerifyProperty] = useState(null);
    const router = useRouter();

    useEffect(() => {
        fetchProperty();
    }, []);

    const fetchProperty = async () => {
        try {
            const response = await axios.get('http://localhost:4000/control/allproperty', { withCredentials: true });
            if (response.status === 200){
                setProperties(response.data);
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

    const handleGetverifyProperty = async (id) => {
        try {
            const response = await axios.get(`http://localhost:4000/control/allproperty/${id}`, { withCredentials: true });
            setSelectedVerifyProperty(response.data);
        } catch (error) {
            console.error("Error fetching user details:", error);
        }
    };

    const handleUpdateVerify = async (id, data) => {
        try {
            const response = await axios.patch(`http://localhost:4000/control/allproperty/${id}`, data, { withCredentials: true });

            if (response.status === 200) {
                alert("Property Updated successfully");
                fetchProperty();
                setOpenModal(null);
                setSelectedVerifyProperty(null);
                setFeedback('')
            }
        } catch (error) {
            console.error("Error updating user:", error);
        }
    };

    

    return (
        <div>
            <h1>Properties</h1>
            <div className='flex flex-col gap-4'>
                {properties.length > 0 ? (
                    properties.map((property, index) => (
                        <div key={index} className='bg-gray-800 rounded-lg p-4 flex gap-5'>
                            <div className=''>
                                <svg className="w-[130px] h-[130px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                <path fillRule="evenodd" d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                                <path fillRule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z" clipRule="evenodd"/>
                                </svg>
                            </div>
                            <div className=' grid grid-cols content-between gap-1'>
                                <p className='text-blue-700 text-2xl font-bold '>{property.propertyId}</p>
                                <p className='font-bold'>{property.description}</p>
                                <p className='text-xs'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus ipsum, numquam facilis fugit a illo tenetur perspiciatis impedit repellendus eveniet hic sit ea quisquam fuga totam autem, placeat, nisi officia.</p>
                                
                                <button type="button" onClick={async() => { await handleGetverifyProperty(property.verifyId); setOpenModal('openverify');}}  className="w-28 focus:outline-none text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700">Verify</button>
                            </div>
                        </div>
                    ))
                ) : (
                    <p>Loading...</p>
                )}

                {openModal === "openverify" &&(
                    <div className="z-10 fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="flex bg-gray-950 p-8 gap-6 rounded-lg">
                        <div className='bg-black border border-gray-700 rounded-lg p-5 flex flex-col gap-2'>
                            <p>Photo and Document</p>
                            <div className='grid grid-cols-3'>
                                {selectedVerifyProperty?.images?.map((image, index) => (
                                    <div key={index}>
                                        <svg className="w-[100px] h-[100px] text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                            <path fillRule="evenodd" d="M13 10a1 1 0 0 1 1-1h.01a1 1 0 1 1 0 2H14a1 1 0 0 1-1-1Z" clipRule="evenodd"/>
                                            <path fillRule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12c0 .556-.227 1.06-.593 1.422A.999.999 0 0 1 20.5 20H4a2.002 2.002 0 0 1-2-2V6Zm6.892 12 3.833-5.356-3.99-4.322a1 1 0 0 0-1.549.097L4 12.879V6h16v9.95l-3.257-3.619a1 1 0 0 0-1.557.088L11.2 18H8.892Z" clipRule="evenodd"/>
                                        </svg>
                                    </div>
                                ))}
                            </div>
                            <div>
                                <p>Land Document : provided dovument link</p>
                                <p>Property Ownership : provided dovument link</p>
                                <p>Registration certificate : provided dovument link</p>
                                <p>NID : provided dovument link</p>
                                <p>Birth Certificate : provided dovument link</p>
                                <p>Other Document : provided dovument link</p> 
                            </div>
                        </div>
                        <div className='grid grid-col content-between'>
                            <div className=''>
                                <div className='flex justify-between mb-5 px-3'>
                                    <p>Property No : {selectedVerifyProperty.propertyId}</p>
                                    <div>
                                        <svg onClick={async() =>{ setOpenModal(null);
                                        setFeedback('')

                                        }} className="w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 12H4m12 0-4 4m4-4-4-4m3-4h2a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-2"/>
                                        </svg>
                                    </div>
                                </div>
                                <div className='bg-black border border-gray-700 flex p-5 gap-5 rounded-lg'>
                                    <div className='grid grid-cols content-around pr-5 border-r'>
                                        <p>ID</p>
                                        <p>{selectedVerifyProperty.userId}</p>
                                    </div>
                                    <div>
                                        <p>Total Floor: {selectedVerifyProperty.floors}</p>
                                        <p>Total Units: {selectedVerifyProperty.unitsPerFloor}</p>
                                        <p>Date: {selectedVerifyProperty.createdAt}</p>
                                    </div>
                                </div>
                            </div>
                            <div className='flex flex-col'>
                                <label htmlFor="">Feedback</label>
                                <textarea value={feedback} onChange={(e) => setFeedback(e.target.value)} className='text-black rounded-lg' rows={6}></textarea>
                            </div>
                            <div className='flex justify-between gap-5'>
                                <button 
                                    onClick={async() => {
                                        await handleUpdateVerify(selectedVerifyProperty.verifyId, {feedback,verifyStatus:"rejected"}); setSelectedVerifyProperty(null); 
                                    }} 
                                className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full">Reject</button>
                                <button onClick={async() => {
                                        await handleUpdateVerify(selectedVerifyProperty.verifyId, {feedback,verifyStatus:"approved"}); setSelectedVerifyProperty(null); 
                                    }}
                                className="mt-4 bg-green-500 text-white px-4 py-2 rounded w-full">Approved</button>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
        </div>
    );
};

export default Page;
