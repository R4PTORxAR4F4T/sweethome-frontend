import Card from '@/Component/Card/Card';
import axios from 'axios';
import React from 'react';

const page = async() => {

    const resp = await axios.get('https://dummyjson.com/products');
    const datas = resp.data.products;

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
        {datas.length > 0 ? (
            datas.map((data:any) => <Card key={data.id} data={data} />)
        ) : (
            <p>No data available or an error occurred.</p>
        )}
        </div>
    );
};

export default page;