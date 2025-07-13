import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboard } from '../api'; // Import your API method

function Dashboard({ user, setUser }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
      return;
    }

    const fetchData = async () => {
      try {
        const result = await getDashboard(user.token);
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate]);

  const logout = () => {
    setUser(null);
    navigate('/');
  };

  if (!user) return null;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-8">
      <div className="bg-white rounded-xl shadow-md p-8 w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center capitalize">{user.role} Dashboard</h2>

        {loading && <p className="text-gray-500 text-center">Loading...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && data && (
          <>
            {user.role === 'admin' && (
              <div className="space-y-4">
                <p>Total Users: <span className="font-semibold">{data.totalUsers}</span></p>
                <p>Total Stores: <span className="font-semibold">{data.totalStores}</span></p>
                <p>Total Ratings: <span className="font-semibold">{data.totalRatings}</span></p>

                <button
                  onClick={() => navigate('/admin/users')}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                >
                  Manage Users
                </button>

                <button
                  onClick={() => navigate('/admin/stores')}
                  className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg transition"
                >
                  Manage Stores
                </button>
              </div>
            )}

            {user.role === 'user' && (
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/stores')}
                  className="w-full bg-purple-500 hover:bg-purple-600 text-white py-2 rounded-lg transition"
                >
                  View & Rate Stores
                </button>

                <button
                  onClick={() => navigate('/rate-store')}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-lg transition"
                >
                  Open Rating Form
                </button>
              </div>
            )}

            {user.role === 'store_owner' && (
              <div className="space-y-4">
                <button
                  onClick={() => navigate('/store/ratings')}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-white py-2 mt-4 rounded-lg transition"
                >
                  View My Store Ratings
                </button>

                <button
                  onClick={() => navigate('/rate-store')}
                  className="w-full bg-indigo-500 hover:bg-indigo-600 text-white py-2 mt-4 rounded-lg transition"
                >
                  Rate a Store (Demo)
                </button>
              </div>
            )}
          </>
        )}

        <button
          onClick={logout}
          className="w-full bg-red-500 hover:bg-red-600 text-white py-2 mt-6 rounded-lg transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
