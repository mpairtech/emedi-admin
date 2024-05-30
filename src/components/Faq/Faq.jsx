import React from 'react';
import { useState, useEffect } from 'react';
import { getFaq } from '../../apiCalls/faq';



const Faq = () => {
    const [faqs, setFaq] = useState([]);

    useEffect(() => {
        const allFaqs = async () => {
            const data = await getFaq();
            setFaq(data.faqs)
        }

        allFaqs();

    }, [])

    return (
        <div className='w-5/6 md:w-2/3 lg:w-5/6'>
            {
                faqs.length > 0 &&
                faqs.map((element) => (
                    <div key={element._id} tabIndex={0} className="collapse rounded-md collapse-arrow border border-green-200 bg-gray-50 my-3">
                        <div className="collapse-title text-xl font-medium">
                            {element.qs}
                        </div>
                        <div className="collapse-content">
                            <p className='text-sm text-gray-500 font-semibold'>{element.ans}</p>
                        </div>
                    </div>
                ))
            }
        </div>
    );
};

export default Faq;