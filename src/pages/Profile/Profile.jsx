import React, { useState, useEffect } from 'react';
import { useContext } from 'react';
import { toast } from 'react-toastify';
import { getUser, trackingIp, updateUser } from '../../apiCalls/users';
import { AuthContext } from '../../components/providers/AuthProvider';
import Loading from '../Loading/Loading';

const Profile = () => {

  const { user, setUser } = useContext(AuthContext);
  // console.log(user[0]._id)

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [region, setRegion] = useState('');
  const [city, setCity] = useState('');
  const [area, setArea] = useState('');
  const [address, setAddress] = useState('');
  const [ipCalled, setIpCalled] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  // const [cityIp, setCityIp] = useState('')
  // const [regionIp, setRegionIp] = useState('')




  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);

      const data = await getUser();
      setName(data.userData[0].name);
      setPhone(data.userData[0].phone);
      setRegion(data.userData[0].region);
      setCity(data.userData[0].city);
      setArea(data.userData[0].area);
      setAddress(data.userData[0].address);

      setIsLoading(false);

    };

    getUserData();


  }, []);


  if (isLoading) {
    return <Loading />;
  }



  if ((region === "" || city === "") && !ipCalled) {

    const ip = async () => {
      const data = await trackingIp();

      setRegion(region === "" ? data.region : region);
      setCity(city === "" ? data.city : city);
      setIpCalled(true)
    }
    ip();
  }

 



  const handleSubmit = async (e) => {
    e.preventDefault();

    const newData = await updateUser({ userId: user[0]._id, name, phone, region, city, area, address })
    setUser([{ ...user[0], name, phone, region, city, area, address }]);

    toast.dismiss();
    toast.success("Successfully submitted !")

  };

  return (
    <div className='px-5 lg:px-24'>
      <div className="mx-auto m-10 p-6 bg-green-100 rounded-md">
        <h2 className="text-2xl font-bold mb-4 text-center underline underline-offset-4 text-green-900">Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
              Name:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your Name"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="phone">
              Phone:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              type="tel"
              id="phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Your Phone Number"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="region">
              Region:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="region"
              value={region}
              onChange={(e) => setRegion(e.target.value)}
              placeholder="Your Region"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="city">
              City:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Your City"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="area">
              Area:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
              type="text"
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              placeholder="Your Area"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="country">
              Country:
            </label>
            <input
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline bg-white"
              type="text"
              id="country"
              value="Bangladesh"
              disabled
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
              Address:
            </label>
            <textarea
              className="appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline "
              id="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Your Address"
              required
            />
          </div>
          <div className='text-center'>
            <button
              type="submit"
              className="bg-green-800 hover:bg-green-950 text-white font-bold py-2 px-10 rounded focus:outline-none focus:shadow-outline"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Profile;
