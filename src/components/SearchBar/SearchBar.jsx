import React from 'react';

const SearchBar = ({setSearchItem }) => {

    const handleSearch = (e) => {
        e.preventDefault();

        setSearchItem(e.target.search.value)
    }

    return (
        <div className='container mx-auto text-center py-16'>

                <form className='flex justify-center items-center' onSubmit={handleSearch}>
                    <input name='search' type="text" className='w-1/2 h-12 border border-gray-400 rounded-l-md px-3 outline-none text-lg shadow-lg' placeholder='Search here ...' />
                    <button type='submit' className='bg-green-800 text-white px-4 py-1 rounded-r-md h-12 font-semibold text-lg shadow-lg'>Search</button>
                </form>

        </div>
    );
};

export default SearchBar;