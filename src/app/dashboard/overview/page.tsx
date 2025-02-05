import ColumnGraph from '@/Component/Graph/ColumChart/ColumnGraph';
import ColumnChart from '@/Component/Graph/ColumnChart/ColumnChart';
import LineChart from '@/Component/Graph/LineChart/LineChart';
import React from 'react';

const page = () => {
    return (
        <div className='p-8 flex gap-5'>
            <ColumnChart></ColumnChart>
            <ColumnGraph></ColumnGraph>
            <LineChart></LineChart>
        </div>
    );
};

export default page;