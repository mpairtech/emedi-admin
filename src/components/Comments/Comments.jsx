import React, { useState } from 'react';
import { useContext } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { addComment, getComments } from '../../apiCalls/addComment';
import Comment from '../Comment/Comment';
import { AuthContext } from '../providers/AuthProvider';

const Comments = ({ serviceId }) => {

    const { user } = useContext(AuthContext)
    const navigate = useNavigate();


    const [inputComment, setInputComment] = useState("");
    const [serviceComments, setServiceComments] = useState([]);


    useEffect(() => {
        const getAllComments = async () => {
            const data = await getComments(serviceId);
            setServiceComments(data.comment);
        }

        getAllComments();

    }, [inputComment])


    const handleAddComment = async () => {

        const obj = {
            userId: user[0]._id,
            serviceId: serviceId,
            comment: inputComment
        }

        await addComment(obj);
        setInputComment("");


    }

    return (
        <div className='max-h-[420px] border my-10 overflow-auto px-1 rounded'>
            <div className='flex my-1'>
                <input onChange={(e) => setInputComment(e.target.value)} className='border w-full focus:border-green-500 px-2 outline-none' value={inputComment} type="text" />
                {
                    user?.length > 0 ?
                        <button onClick={handleAddComment} className='bg-green-200 text-green-800 hover:bg-green-300 px-2 py-1 w-28 h-12 font-bold'>Comment</button>
                        :
                        <button onClick={() => navigate('/login')} className='bg-green-200 text-green-800 hover:bg-green-300 px-2 py-1 w-28 h-12 font-bold'>Comment</button>
                }
            </div>


            <div>
                {
                    serviceComments.length > 0 ?
                        serviceComments.map((element) => (
                            <Comment key={element._id} element={element} />
                        ))
                        :

                        <div className='text-center font-bold text-gray-500 my-5'>
                            <h2>No comment has been made yet</h2>
                        </div>
                }
            </div>

        </div>
    );
};

export default Comments;