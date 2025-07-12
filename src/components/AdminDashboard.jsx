import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { useWeddingData } from '../contexts/WeddingDataContext';

const { FiUser, FiLock, FiHome, FiEdit, FiSave, FiEye, FiSettings, FiUsers, FiHeart } = FiIcons;

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { weddingData, updateWeddingData } = useWeddingData();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const [editData, setEditData] = useState(weddingData);
  const [activeTab, setActiveTab] = useState('overview');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem('admin-auth');
    if (authStatus === 'authenticated') {
      setIsAuthenticated(true);
    }
  }, []);

  useEffect(() => {
    setEditData(weddingData);
  }, [weddingData]);

  const handleLogin = (e) => {
    e.preventDefault();
    // Simple authentication for demo
    if (credentials.username === 'admin' && credentials.password === 'wedding2024') {
      setIsAuthenticated(true);
      localStorage.setItem('admin-auth', 'authenticated');
    } else {
      alert('Invalid credentials. Use admin/wedding2024');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('admin-auth');
    navigate('/');
  };

  const handleSave = () => {
    setIsSaving(true);
    setTimeout(() => {
      updateWeddingData(editData);
      setIsSaving(false);
    }, 1000);
  };

  const handleInputChange = (section, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleNestedInputChange = (section, subsection, field, value) => {
    setEditData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }));
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-dustyBlue-900 via-dustyBlue-800 to-dustyBlue-900 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl max-w-md w-full"
        >
          <div className="text-center mb-8">
            <SafeIcon icon={FiLock} className="w-12 h-12 text-dustyBlue-600 mx-auto mb-4" />
            <h1 className="font-script text-3xl text-dustyBlue-700 mb-2">Admin Access</h1>
            <p className="font-serif text-dustyBlue-600">Enter your credentials to manage the wedding website</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block font-serif text-dustyBlue-600 mb-2">Username</label>
              <div className="relative">
                <SafeIcon icon={FiUser} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dustyBlue-400 w-5 h-5" />
                <input
                  type="text"
                  value={credentials.username}
                  onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-dustyBlue-200 focus:outline-none focus:ring-2 focus:ring-dustyBlue-400"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-serif text-dustyBlue-600 mb-2">Password</label>
              <div className="relative">
                <SafeIcon icon={FiLock} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-dustyBlue-400 w-5 h-5" />
                <input
                  type="password"
                  value={credentials.password}
                  onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                  className="w-full pl-12 pr-4 py-3 rounded-xl border border-dustyBlue-200 focus:outline-none focus:ring-2 focus:ring-dustyBlue-400"
                  placeholder="Enter password"
                  required
                />
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full bg-gradient-to-r from-dustyBlue-600 to-dustyBlue-700 text-white py-3 rounded-xl font-serif text-lg shadow-lg transition-all duration-300"
            >
              Login
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="font-serif text-sm text-dustyBlue-500">
              Demo: admin / wedding2024
            </p>
          </div>
        </motion.div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: FiHome },
    { id: 'couple', label: 'Couple Info', icon: FiUsers },
    { id: 'chapters', label: 'Story Chapters', icon: FiEdit },
    { id: 'details', label: 'Wedding Details', icon: FiSettings },
    { id: 'rsvp', label: 'RSVP Responses', icon: FiHeart }
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <SafeIcon icon={FiUsers} className="w-8 h-8 text-blush-500" />
                  <h3 className="font-serif text-lg text-dustyBlue-700">RSVP Responses</h3>
                </div>
                <p className="text-3xl font-bold text-dustyBlue-800">{weddingData.rsvpResponses?.length || 0}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <SafeIcon icon={FiHeart} className="w-8 h-8 text-blush-500" />
                  <h3 className="font-serif text-lg text-dustyBlue-700">Guestbook Entries</h3>
                </div>
                <p className="text-3xl font-bold text-dustyBlue-800">{weddingData.guestbookEntries?.length || 0}</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <SafeIcon icon={FiEye} className="w-8 h-8 text-blush-500" />
                  <h3 className="font-serif text-lg text-dustyBlue-700">Site Status</h3>
                </div>
                <p className="text-lg font-semibold text-green-600">Live</p>
              </div>
              
              <div className="bg-white rounded-xl p-6 shadow-lg">
                <div className="flex items-center gap-3 mb-2">
                  <SafeIcon icon={FiSettings} className="w-8 h-8 text-blush-500" />
                  <h3 className="font-serif text-lg text-dustyBlue-700">Privacy</h3>
                </div>
                <p className="text-lg font-semibold text-dustyBlue-600">
                  {weddingData.isPrivate ? 'Private' : 'Public'}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-serif text-xl text-dustyBlue-700 mb-4">Quick Actions</h3>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate('/')}
                  className="inline-flex items-center gap-2 bg-blush-100 hover:bg-blush-200 text-blush-700 px-4 py-2 rounded-lg font-serif transition-colors duration-300"
                >
                  <SafeIcon icon={FiEye} className="w-4 h-4" />
                  Preview Site
                </button>
                
                <button
                  onClick={() => setActiveTab('chapters')}
                  className="inline-flex items-center gap-2 bg-lavender-100 hover:bg-lavender-200 text-lavender-700 px-4 py-2 rounded-lg font-serif transition-colors duration-300"
                >
                  <SafeIcon icon={FiEdit} className="w-4 h-4" />
                  Edit Story
                </button>
              </div>
            </div>
          </div>
        );

      case 'couple':
        return (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-serif text-xl text-dustyBlue-700 mb-6">Couple Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-serif text-dustyBlue-600 mb-2">Bride's Name</label>
                <input
                  type="text"
                  value={editData.coupleNames?.bride || ''}
                  onChange={(e) => handleNestedInputChange('coupleNames', 'bride', 'name', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-dustyBlue-200 focus:outline-none focus:ring-2 focus:ring-dustyBlue-400"
                />
              </div>
              
              <div>
                <label className="block font-serif text-dustyBlue-600 mb-2">Groom's Name</label>
                <input
                  type="text"
                  value={editData.coupleNames?.groom || ''}
                  onChange={(e) => handleNestedInputChange('coupleNames', 'groom', 'name', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-dustyBlue-200 focus:outline-none focus:ring-2 focus:ring-dustyBlue-400"
                />
              </div>
            </div>
          </div>
        );

      case 'chapters':
        return (
          <div className="space-y-6">
            {Object.entries(editData.chapters || {}).map(([key, chapter]) => (
              <div key={key} className="bg-white rounded-xl p-6 shadow-lg">
                <h3 className="font-serif text-xl text-dustyBlue-700 mb-4 capitalize">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block font-serif text-dustyBlue-600 mb-2">Title</label>
                    <input
                      type="text"
                      value={chapter.title || ''}
                      onChange={(e) => handleNestedInputChange('chapters', key, 'title', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-dustyBlue-200 focus:outline-none focus:ring-2 focus:ring-dustyBlue-400"
                    />
                  </div>
                  
                  <div>
                    <label className="block font-serif text-dustyBlue-600 mb-2">Content</label>
                    <textarea
                      rows={4}
                      value={chapter.content || ''}
                      onChange={(e) => handleNestedInputChange('chapters', key, 'content', e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-dustyBlue-200 focus:outline-none focus:ring-2 focus:ring-dustyBlue-400"
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-serif text-dustyBlue-600 mb-2">Date</label>
                      <input
                        type="text"
                        value={chapter.date || ''}
                        onChange={(e) => handleNestedInputChange('chapters', key, 'date', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-dustyBlue-200 focus:outline-none focus:ring-2 focus:ring-dustyBlue-400"
                      />
                    </div>
                    
                    <div>
                      <label className="block font-serif text-dustyBlue-600 mb-2">Image URL</label>
                      <input
                        type="url"
                        value={chapter.image || ''}
                        onChange={(e) => handleNestedInputChange('chapters', key, 'image', e.target.value)}
                        className="w-full px-4 py-3 rounded-lg border border-dustyBlue-200 focus:outline-none focus:ring-2 focus:ring-dustyBlue-400"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        );

      case 'details':
        return (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-serif text-xl text-dustyBlue-700 mb-6">Wedding Details</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block font-serif text-dustyBlue-600 mb-2">Wedding Date</label>
                <input
                  type="text"
                  value={editData.weddingDetails?.date || ''}
                  onChange={(e) => handleNestedInputChange('weddingDetails', 'date', '', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-dustyBlue-200 focus:outline-none focus:ring-2 focus:ring-dustyBlue-400"
                />
              </div>
              
              <div>
                <label className="block font-serif text-dustyBlue-600 mb-2">Time</label>
                <input
                  type="text"
                  value={editData.weddingDetails?.time || ''}
                  onChange={(e) => handleNestedInputChange('weddingDetails', 'time', '', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-dustyBlue-200 focus:outline-none focus:ring-2 focus:ring-dustyBlue-400"
                />
              </div>
              
              <div>
                <label className="block font-serif text-dustyBlue-600 mb-2">Venue</label>
                <input
                  type="text"
                  value={editData.weddingDetails?.venue || ''}
                  onChange={(e) => handleNestedInputChange('weddingDetails', 'venue', '', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-dustyBlue-200 focus:outline-none focus:ring-2 focus:ring-dustyBlue-400"
                />
              </div>
              
              <div>
                <label className="block font-serif text-dustyBlue-600 mb-2">Dress Code</label>
                <input
                  type="text"
                  value={editData.weddingDetails?.dressCode || ''}
                  onChange={(e) => handleNestedInputChange('weddingDetails', 'dressCode', '', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-dustyBlue-200 focus:outline-none focus:ring-2 focus:ring-dustyBlue-400"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block font-serif text-dustyBlue-600 mb-2">Address</label>
                <textarea
                  rows={3}
                  value={editData.weddingDetails?.address || ''}
                  onChange={(e) => handleNestedInputChange('weddingDetails', 'address', '', e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-dustyBlue-200 focus:outline-none focus:ring-2 focus:ring-dustyBlue-400"
                />
              </div>
            </div>
          </div>
        );

      case 'rsvp':
        return (
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-serif text-xl text-dustyBlue-700 mb-6">RSVP Responses</h3>
            {weddingData.rsvpResponses?.length > 0 ? (
              <div className="space-y-4">
                {weddingData.rsvpResponses.map((response, index) => (
                  <div key={index} className="border border-dustyBlue-200 rounded-lg p-4">
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <p className="font-serif text-dustyBlue-700 font-semibold">{response.name}</p>
                        <p className="font-serif text-dustyBlue-500 text-sm">{response.email}</p>
                      </div>
                      <div>
                        <p className="font-serif text-dustyBlue-600">
                          Attendance: <span className={response.attendance === 'yes' ? 'text-green-600' : 'text-red-600'}>
                            {response.attendance === 'yes' ? 'Yes' : 'No'}
                          </span>
                        </p>
                        {response.attendance === 'yes' && (
                          <p className="font-serif text-dustyBlue-600 text-sm">
                            Guests: {response.guests}
                          </p>
                        )}
                      </div>
                      <div>
                        {response.message && (
                          <p className="font-serif text-dustyBlue-600 text-sm italic">
                            "{response.message}"
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="font-serif text-dustyBlue-500 text-center py-8">
                No RSVP responses yet.
              </p>
            )}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-blush-50 to-lavender-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Header */}
      <div className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <SafeIcon icon={FiSettings} className="w-8 h-8 text-dustyBlue-600" />
              <h1 className="font-script text-2xl text-dustyBlue-700">Wedding Admin</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <motion.button
                onClick={handleSave}
                disabled={isSaving}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-blush-400 to-lavender-400 hover:from-blush-500 hover:to-lavender-500 text-white px-4 py-2 rounded-lg font-serif shadow-lg transition-all duration-300"
              >
                <SafeIcon icon={FiSave} className="w-4 h-4" />
                {isSaving ? 'Saving...' : 'Save Changes'}
              </motion.button>
              
              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-2 text-dustyBlue-600 hover:text-dustyBlue-800 font-serif transition-colors duration-300"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          {/* Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-xl shadow-lg p-6">
              <nav className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-serif text-left transition-all duration-300 ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blush-100 to-lavender-100 text-dustyBlue-700 shadow-md'
                        : 'text-dustyBlue-600 hover:bg-dustyBlue-50'
                    }`}
                  >
                    <SafeIcon icon={tab.icon} className="w-5 h-5" />
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {renderTabContent()}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;