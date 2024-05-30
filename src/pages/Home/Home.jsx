import React from 'react';
import { useState } from 'react';
import Banner from '../../components/Banner/Banner';
import Cards from '../../components/Cards/Cards';
import ChooseUs from '../../components/ChooseUs/ChooseUs';
import ContactUs from '../../components/ContactUs/ContactUs';
import Filters from '../../components/Filters/Filters';
import SearchBar from '../../components/SearchBar/SearchBar';

const Home = () => {

    const [displayFilter, setDisplayFilter] = useState(true)

    const [filterItem, setFilterItem] = useState("")
    const [searchItem, setSearchItem] = useState("")

    return (
        <div className='bg-gradient-to-r from-emerald-100 from-10% via-emerald-100 via-30% to-emerald-100 to-90%'>
            <Banner />
            <SearchBar setSearchItem={setSearchItem} />

            <div className='flex'>

                <Filters
                    displayFilter={displayFilter}
                    setDisplayFilter={setDisplayFilter}
                    filterItem={filterItem}
                    setFilterItem={setFilterItem}
                />

                <Cards
                    displayFilter={displayFilter}
                    setDisplayFilter={setDisplayFilter}
                    filterItem={filterItem}
                    searchItem={searchItem}
                />
            </div>
            
            <ContactUs />

            <ChooseUs />

        </div>
    );
};

export default Home;