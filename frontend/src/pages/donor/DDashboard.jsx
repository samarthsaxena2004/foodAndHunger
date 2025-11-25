import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import DonationList from '../../Components/donor/DonationList';
import RequestFeed from '../../Components/donor/RequestFeed';
import DonorProfile from '../../Components/donor/DonorProfile';
import { Heart, List, User } from 'lucide-react';

const DDashboard = () => {
  const { publicAxiosInstance } = useOutletContext();
  const [activeTab, setActiveTab] = useState('donations');
  const [donorId, setDonorId] = useState(null);

  useEffect(() => {
    const storedRoleId = localStorage.getItem('roleId');
    if (storedRoleId) {
      setDonorId(parseInt(storedRoleId));
    }
  }, []);

  if (!donorId) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-12">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              <div className="flex-shrink-0 flex items-center">
                <h1 className="text-2xl font-bold text-gray-900">Donor Dashboard</h1>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-2xl shadow-sm p-2 mb-8 inline-flex gap-2">
          <button
            onClick={() => setActiveTab('donations')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === 'donations'
                ? 'bg-green-100 text-green-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            <Heart className="w-5 h-5" />
            My Donations
          </button>
          <button
            onClick={() => setActiveTab('requests')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === 'requests'
                ? 'bg-green-100 text-green-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            <List className="w-5 h-5" />
            Requests Feed
          </button>
          <button
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-6 py-3 rounded-xl font-medium transition-all duration-200 ${activeTab === 'profile'
                ? 'bg-green-100 text-green-700 shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
              }`}
          >
            <User className="w-5 h-5" />
            Profile
          </button>
        </div>

        {/* Content */}
        <div className="bg-white rounded-2xl shadow-sm p-6 min-h-[500px]">
          {activeTab === 'donations' && <DonationList donorId={donorId} axios={publicAxiosInstance} />}
          {activeTab === 'requests' && <RequestFeed axios={publicAxiosInstance} />}
          {activeTab === 'profile' && <DonorProfile donorId={donorId} axios={publicAxiosInstance} />}
        </div>
      </div>
    </div>
  );
};

export default DDashboard;