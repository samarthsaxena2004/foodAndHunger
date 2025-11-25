import React, { useState, useEffect } from 'react';
import { X, Upload, MapPin } from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMapEvents } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const LocationMarker = ({ position, setPosition }) => {
    const map = useMapEvents({
        click(e) {
            setPosition(e.latlng);
            map.flyTo(e.latlng, map.getZoom());
        },
    });

    useEffect(() => {
        if (position) {
            map.flyTo(position, map.getZoom());
        }
    }, [position, map]);

    return position === null ? null : (
        <Marker position={position}></Marker>
    );
};

const DonationForm = ({ isOpen, onClose, onSuccess, donation, donorId, axios }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        type: 'Food',
        location: '',
        address: '',
        latitude: null,
        longitude: null
    });
    const [photo, setPhoto] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (donation) {
            setFormData({
                title: donation.title || '',
                description: donation.description || '',
                type: donation.type || 'Food',
                location: donation.location || '',
                address: donation.address || '',
                latitude: donation.latitude || null,
                longitude: donation.longitude || null
            });
        }
    }, [donation]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleFileChange = (e) => {
        if (e.target.files[0]) {
            setPhoto(e.target.files[0]);
        }
    };

    const handleGetLocation = () => {
        if (navigator.geolocation) {
            setLoading(true);
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const lat = position.coords.latitude;
                    const lng = position.coords.longitude;
                    setFormData({
                        ...formData,
                        latitude: lat,
                        longitude: lng
                    });
                    setLoading(false);
                    // alert("Location detected successfully!"); // Removed alert to be less intrusive
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setLoading(false);
                    alert("Failed to get location. Please allow location access.");
                }
            );
        } else {
            alert("Geolocation is not supported by this browser.");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            if (donation) {
                // Update
                await axios.put(`/donation/update/${donation.id}`, { ...formData, donorId });
                if (photo) {
                    const photoData = new FormData();
                    photoData.append('photo', photo);
                    await axios.post(`/donation/${donation.id}/photo`, photoData);
                }
            } else {
                // Create
                const data = new FormData();
                data.append('donorId', donorId);
                data.append('title', formData.title);
                data.append('description', formData.description);
                data.append('type', formData.type);
                data.append('location', formData.location);
                data.append('address', formData.address);
                if (formData.latitude) data.append('latitude', formData.latitude);
                if (formData.longitude) data.append('longitude', formData.longitude);
                if (photo) {
                    data.append('photo', photo);
                }
                await axios.post('/donation/add', data);
            }
            onSuccess();
        } catch (error) {
            console.error("Error saving donation:", error);
            alert("Failed to save donation");
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-white rounded-2xl w-full max-w-lg shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
                <div className="flex justify-between items-center p-6 border-b">
                    <h2 className="text-xl font-bold text-gray-900">
                        {donation ? 'Edit Donation' : 'Add New Donation'}
                    </h2>
                    <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                        <X className="w-5 h-5 text-gray-500" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            required
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                            placeholder="e.g., Fresh Vegetables"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleChange}
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                        >
                            <option value="Food">Food</option>
                            <option value="Clothes">Clothes</option>
                            <option value="Money">Money</option>
                            <option value="Medical">Medical</option>
                            <option value="Other">Other</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                            placeholder="Describe the donation..."
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Location (City/Area)</label>
                            <div className="relative">
                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                    className="w-full pl-10 pr-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    placeholder="City"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Full Address</label>
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    name="address"
                                    value={formData.address}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 border rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 outline-none transition-all"
                                    placeholder="Street address"
                                />
                                <button
                                    type="button"
                                    onClick={handleGetLocation}
                                    className="p-2 bg-blue-50 text-blue-600 rounded-xl hover:bg-blue-100 transition-colors"
                                    title="Use Current Location"
                                >
                                    <MapPin className="w-5 h-5" />
                                </button>
                            </div>
                            {formData.latitude && (
                                <p className="text-xs text-green-600 mt-1">
                                    Location detected: {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="h-64 w-full rounded-xl overflow-hidden border z-0">
                        <MapContainer
                            center={[formData.latitude || 20.5937, formData.longitude || 78.9629]} // Default to India center
                            zoom={formData.latitude ? 13 : 5}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <TileLayer
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                            />
                            <LocationMarker
                                position={formData.latitude && formData.longitude ? { lat: formData.latitude, lng: formData.longitude } : null}
                                setPosition={(latlng) => setFormData({ ...formData, latitude: latlng.lat, longitude: latlng.lng })}
                            />
                        </MapContainer>
                        <p className="text-xs text-gray-500 mt-1">Click on the map to set location</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Photo</label>
                        <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-green-500 transition-colors">
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleFileChange}
                                className="hidden"
                                id="donation-photo"
                            />
                            <label htmlFor="donation-photo" className="cursor-pointer flex flex-col items-center gap-2">
                                <Upload className="w-8 h-8 text-gray-400" />
                                <span className="text-sm text-gray-600">
                                    {photo ? photo.name : "Click to upload photo"}
                                </span>
                            </label>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="flex-1 px-4 py-2 bg-green-600 text-white rounded-xl font-medium hover:bg-green-700 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Saving...' : 'Save Donation'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DonationForm;
