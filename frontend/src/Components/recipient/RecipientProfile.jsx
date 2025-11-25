import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Building, FileText, CheckCircle, XCircle } from 'lucide-react';

const RecipientProfile = ({ recipientId, axios }) => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await axios.get(`/recipient/${recipientId}`);
                setProfile(res.data);
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        if (recipientId) {
            fetchProfile();
        }
    }, [recipientId, axios]);

    if (loading) return <div className="text-center py-8">Loading profile...</div>;
    if (!profile) return <div className="text-center py-8 text-red-500">Failed to load profile.</div>;

    return (
        <div className="max-w-4xl mx-auto">
            <div className="bg-white rounded-2xl overflow-hidden border shadow-sm">
                <div className="h-32 bg-gradient-to-r from-green-400 to-green-600"></div>
                <div className="px-8 pb-8">
                    <div className="relative flex justify-between items-end -mt-12 mb-6">
                        <div className="relative">
                            <div className="w-24 h-24 rounded-full border-4 border-white overflow-hidden bg-gray-100">
                                {profile.photo ? (
                                    <img
                                        src={`http://localhost:8080/uploads/${profile.photo}`}
                                        alt={profile.name}
                                        className="w-full h-full object-cover"
                                        onError={(e) => { e.target.src = 'https://via.placeholder.com/150?text=User'; }}
                                    />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                                        <User className="w-10 h-10" />
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className="mb-1">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${profile.status === 'approved' ? 'bg-green-100 text-green-700' :
                                profile.status === 'rejected' ? 'bg-red-100 text-red-700' :
                                    'bg-yellow-100 text-yellow-700'
                                }`}>
                                {profile.status ? profile.status.toUpperCase() : 'PENDING'}
                            </span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 mb-1">{profile.name}</h2>
                            <p className="text-gray-500 mb-6">{profile.organizationName}</p>

                            <div className="space-y-4">
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Mail className="w-5 h-5 text-gray-400" />
                                    <span>{profile.email}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Phone className="w-5 h-5 text-gray-400" />
                                    <span>{profile.phone}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <MapPin className="w-5 h-5 text-gray-400" />
                                    <span>{profile.address}</span>
                                </div>
                                <div className="flex items-center gap-3 text-gray-600">
                                    <Building className="w-5 h-5 text-gray-400" />
                                    <span>{profile.organizationType}</span>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-50 rounded-xl p-6">
                            <h3 className="font-semibold text-gray-900 mb-4">Verification Documents</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-blue-500" />
                                        <span className="text-sm font-medium text-gray-700">Certificate</span>
                                    </div>
                                    {profile.certificate ? (
                                        <a
                                            href={`http://localhost:8080/uploads/${profile.certificate}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-blue-600 hover:underline"
                                        >
                                            View
                                        </a>
                                    ) : (
                                        <span className="text-xs text-gray-400">Not uploaded</span>
                                    )}
                                </div>
                                <div className="flex items-center justify-between p-3 bg-white rounded-lg border">
                                    <div className="flex items-center gap-3">
                                        <FileText className="w-5 h-5 text-blue-500" />
                                        <span className="text-sm font-medium text-gray-700">Signature</span>
                                    </div>
                                    {profile.signature ? (
                                        <a
                                            href={`http://localhost:8080/uploads/${profile.signature}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-xs text-blue-600 hover:underline"
                                        >
                                            View
                                        </a>
                                    ) : (
                                        <span className="text-xs text-gray-400">Not uploaded</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RecipientProfile;