import React, { useState } from 'react';
import QuickCards from '../../components/QuicCards/QuickCards';
import SearchBar from '../../components/SearchBar/SearchBar';

const QuickServices = () => {

    const [searchItem, setSearchItem] = useState("")

    return (
        <div className='bg-gradient-to-r from-emerald-100 from-10% via-emerald-100 via-30% to-emerald-100 to-90%'>
            <SearchBar setSearchItem={setSearchItem} />
            <QuickCards searchItem={searchItem} />
        </div>
    );
};

export default QuickServices;