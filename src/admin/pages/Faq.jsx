import React, { useEffect, useState } from "react";
import { AiFillEdit } from "react-icons/ai";
import { MdDeleteForever } from "react-icons/md";
import { RiAddFill } from "react-icons/ri";
import Loading from "../../pages/Loading/Loading";
import { addFaq, deleteFaq, updateFaq, getFaq } from "../../apiCalls/faq";

const Faq = () => {
  const [faqs, setFAQs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);


  const getFAQs = async () => {
    setIsLoading(true);
    const data = await getFaq();
    setFAQs(data.faqs);
    setIsLoading(false);
  };

useEffect(() => {
  getFAQs();
}, []);

  const faqSubmit = async (e) => {
    e.preventDefault();

    const data = await addFaq({
      qs: e.target.qs.value,
      ans: e.target.ans.value,
    });
    getFAQs();
  };

  

  const [editedFAQ, setEditedFAQ] = useState(null);
  const [inputState, setInputState] = useState({});

  



  const editButtonHandler = (id) => {
    setEditedFAQ(id);
  };

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setInputState({ ...inputState, [name]: value });
  };

  const saveFAQ = async (id) => {
   const editedFAQ = faqs.find((faq) => faq._id === id);
   const updatedFaq = {
    id: editedFAQ._id,
    qs: inputState.question || editedFAQ.qs,
    ans: inputState.answer || editedFAQ.ans,
   }
    const data = await updateFaq(updatedFaq);
    getFAQs();

    setEditedFAQ(null);

  };



  const handleDelete = async (id) => {
    const data = await deleteFaq(id);
    getFAQs();
  };

  



  if(isLoading) {
    return <Loading />
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-4 rounded border border-gray-200 mb-4">
        <strong className="text-gray-700 font-medium mb-2">Insert FAQ</strong>
        <div className="bg-gray-100 p-4 rounded flex flex-col items-start">
          <form onSubmit={faqSubmit} className="w-full">
            <input
              type="text"
              name="qs"
              placeholder="Question"
              required
              className="w-full border border-gray-400 p-2 mb-2 h-20"
            />
            <textarea
              name="ans"
              placeholder="Answer"
              required
              className="w-full border border-gray-400 p-2 mb-2 h-32"
            />
            <button
              className="bg-green-500 hover:bg-green-700 text-white font-bold p-1 px-2 rounded flex"
              type="submit"
            >
              Add FAQ
            </button>
          </form>
        </div>
      </div>

      <strong className="text-gray-700 font-medium mb-2">View FAQs</strong>
      <div className="overflow-x-auto border-x border-gray-200 rounded mb-4">
        <table className="w-full text-gray-700">
          <thead>
            <tr>
              {/* <th>ID</th> */}
              <th>Question</th>
              <th>Answer</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {faqs.map((faq) => (
              <tr key={faq._id}>
                {/* <td>{faq._id}</td> */}
                <td className="whitespace-normal">
                  {editedFAQ === faq._id ? (
                    <input
                      type="text"
                      name="question"
                      defaultValue={faq.qs}
                      onChange={inputHandler}
                      className="w-full border border-gray-400 p-2 mb-2"
                    />
                  ) : (
                    faq.qs
                  )}
                </td>
                <td className="whitespace-normal">
                  {editedFAQ === faq._id ? (
                    <textarea
                      name="answer"
                      defaultValue={faq.ans}
                      onChange={inputHandler}
                      className="w-full border border-gray-400 p-2 mb-2 h-32"
                    />
                  ) : (
                    faq.ans
                  )}
                </td>
                <td>
                  {editedFAQ === faq._id ? (
                    <button
                      className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded font-bold mr-1"
                      onClick={() => saveFAQ(faq._id)}
                    >
                      <RiAddFill />
                    </button>
                  ) : (
                    <button
                      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mr-1"
                      onClick={() => editButtonHandler(faq._id)}
                    >
                      <AiFillEdit />
                    </button>
                  )}
                  <button
                    className="bg-red-500 hover:bg-red-700 text-white py-1 px-2 rounded font-bold"
                    onClick={() => handleDelete(faq._id)}
                  >
                    <MdDeleteForever />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Faq;
  