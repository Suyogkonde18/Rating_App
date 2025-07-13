import React, { useEffect, useState } from 'react';
import { getStoreRatings } from '../api';

function RatingForm({ user }) {
  const [ratings, setRatings] = useState([]);

  useEffect(() => {
    getStoreRatings(user.token).then(setRatings);
  }, []);

  const avg = ratings.length > 0
    ? (ratings.reduce((a, b) => a + b.rating, 0) / ratings.length).toFixed(2)
    : 0;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-8">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center">Store Ratings</h2>
        <p className="text-center mb-4">Average Rating: <span className="font-semibold">{avg}</span></p>

        <ul className="space-y-3">
          {ratings.map(r => (
            <li key={r.userId} className="flex justify-between border-b pb-2">
              <span>{r.userName}</span>
              <span className="font-semibold">{r.rating}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default RatingForm;
