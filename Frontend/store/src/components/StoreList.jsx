import React, { useEffect, useState } from 'react';
import { getStores, submitRating } from '../api';

function StoreList({ user }) {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    getStores(user.token).then(setStores);
  }, []);

  const handleRating = (storeId, rating) => {
    submitRating(user.token, storeId, Number(rating)).then(res => {
      alert(res.message);
      getStores(user.token).then(setStores);
    });
  };

  const filtered = stores.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.address.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">Store List</h2>

        <input
          type="text"
          placeholder="Search by Name or Address"
          onChange={e => setSearch(e.target.value)}
          className="w-full mb-6 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <ul className="space-y-4">
          {filtered.map(store => (
            <li key={store._id} className="p-4 bg-gray-50 rounded-lg shadow-sm">
              <p className="font-semibold text-lg">{store.name}</p>
              <p className="text-sm text-gray-600">{store.address}</p>
              <p className="mt-1">Avg Rating: <span className="font-bold">{store.avgRating}</span></p>
              <p>Your Rating:</p>

              <input
                type="number"
                min="1"
                max="5"
                defaultValue={store.userRating}
                onBlur={e => handleRating(store._id, e.target.value)}
                className="mt-1 w-20 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default StoreList;
