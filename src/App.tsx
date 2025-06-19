import React, { useState } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Calendar, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Loader2,
  UserCheck
} from 'lucide-react';

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  location: string;
  dateOfJoining: string;
  timeSlot: string;
}

interface FormErrors {
  [key: string]: string;
}

function App() {
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phoneNumber: '',
    location: '',
    dateOfJoining: '',
    timeSlot: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [touched, setTouched] = useState<{[key: string]: boolean}>({});

  const timeSlots = [
    { value: '5-hours', label: '5 Hours (Minimum)' },
    { value: '6-hours', label: '6 Hours' },
    { value: '7-hours', label: '7 Hours' },
    { value: '8-hours', label: '8 Hours (Full Time)' },
    { value: '9-hours', label: '9+ Hours' },
    { value: 'flexible', label: 'Flexible Schedule' }
  ];

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Full name must be at least 2 characters';
        if (!/^[a-zA-Z\s]+$/.test(value)) return 'Full name can only contain letters and spaces';
        return '';
      case 'email':
        if (!value) return 'Email is required';
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return 'Please enter a valid email address';
        return '';
      case 'phoneNumber':
        if (!value) return 'Phone number is required';
        if (!/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/[\s\-\(\)]/g, ''))) {
          return 'Please enter a valid phone number';
        }
        return '';
      case 'location':
        if (!value.trim()) return 'Location is required';
        if (value.trim().length < 2) return 'Please enter a valid location';
        return '';
      case 'dateOfJoining':
        if (!value) return 'Date of joining is required';
        {
          const selectedDate = new Date(value);
          const today = new Date();
          today.setHours(0, 0, 0, 0);
          if (selectedDate < today) return 'Date of joining cannot be in the past';
        }
        return '';
      case 'timeSlot':
        if (!value) return 'Time slot is required';
        return '';
      default:
        return '';
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;
    Object.keys(formData).forEach(key => {
      const error = validateField(key, formData[key as keyof FormData]);
      if (error) {
        newErrors[key] = error;
        isValid = false;
      }
    });
    setErrors(newErrors);
    setTouched(Object.keys(formData).reduce((acc, key) => ({ ...acc, [key]: true }), {}));
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setIsSubmitting(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setIsSubmitted(true);
      console.log('Registration data:', formData);
    } catch (error) {

      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      phoneNumber: '',
      location: '',
      dateOfJoining: '',
      timeSlot: ''
    });
    setErrors({});
    setTouched({});
    setIsSubmitted(false);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl p-6 max-w-sm w-full text-center">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mb-4">
            <CheckCircle className="h-6 w-6 text-white" />
          </div>
          <h2 className="text-xl font-bold text-gray-800 mb-3">Success!</h2>
          <p className="text-gray-600 mb-6 text-sm">
            Registration completed successfully.
          </p>
          <button
            onClick={resetForm}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm hover:from-purple-600 hover:to-indigo-700 transition-all duration-300"
          >
            Register Another
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-6">
          <div className="mx-auto w-12 h-12 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full flex items-center justify-center mb-3">
            <UserCheck className="h-6 w-6 text-white" />
          </div>
        </div>
        <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-purple-600/20 to-indigo-600/20 px-4 py-3 border-b border-white/10">
            <h2 className="text-lg font-bold text-gray-800">Registration</h2>
          </div>
          <form onSubmit={handleSubmit} className="p-4 space-y-4">
            <div>
              <label htmlFor="fullName" className="flex items-center text-xs font-medium text-gray-700 mb-1">
                <User className="h-3 w-3 mr-1 text-purple-400" />
                Full Name *
              </label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 backdrop-blur-sm bg-white/10 border rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-800 placeholder-gray-500 ${
                  errors.fullName && touched.fullName
                    ? 'border-red-400 bg-red-500/10'
                    : 'border-white/30 focus:border-purple-400'
                }`}
                placeholder="Enter your full name"
              />
              {errors.fullName && touched.fullName && (
                <div className="flex items-center text-red-500 text-xs mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.fullName}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="email" className="flex items-center text-xs font-medium text-gray-700 mb-1">
                <Mail className="h-3 w-3 mr-1 text-purple-400" />
                Email *
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 backdrop-blur-sm bg-white/10 border rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-800 placeholder-gray-500 ${
                  errors.email && touched.email
                    ? 'border-red-400 bg-red-500/10'
                    : 'border-white/30 focus:border-purple-400'
                }`}
                placeholder="Enter your email"
              />
              {errors.email && touched.email && (
                <div className="flex items-center text-red-500 text-xs mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.email}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="phoneNumber" className="flex items-center text-xs font-medium text-gray-700 mb-1">
                <Phone className="h-3 w-3 mr-1 text-purple-400" />
                Phone *
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 backdrop-blur-sm bg-white/10 border rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-800 placeholder-gray-500 ${
                  errors.phoneNumber && touched.phoneNumber
                    ? 'border-red-400 bg-red-500/10'
                    : 'border-white/30 focus:border-purple-400'
                }`}
                placeholder="Enter your phone"
              />
              {errors.phoneNumber && touched.phoneNumber && (
                <div className="flex items-center text-red-500 text-xs mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.phoneNumber}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="location" className="flex items-center text-xs font-medium text-gray-700 mb-1">
                <MapPin className="h-3 w-3 mr-1 text-purple-400" />
                Location *
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 backdrop-blur-sm bg-white/10 border rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-800 placeholder-gray-500 ${
                  errors.location && touched.location
                    ? 'border-red-400 bg-red-500/10'
                    : 'border-white/30 focus:border-purple-400'
                }`}
                placeholder="Enter your location"
              />
              {errors.location && touched.location && (
                <div className="flex items-center text-red-500 text-xs mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.location}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="dateOfJoining" className="flex items-center text-xs font-medium text-gray-700 mb-1">
                <Calendar className="h-3 w-3 mr-1 text-purple-400" />
                Join Date *
              </label>
              <input
                type="date"
                id="dateOfJoining"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleInputChange}
                onBlur={handleBlur}
                min={new Date().toISOString().split('T')[0]}
                className={`w-full px-3 py-2 backdrop-blur-sm bg-white/10 border rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-800 ${
                  errors.dateOfJoining && touched.dateOfJoining
                    ? 'border-red-400 bg-red-500/10'
                    : 'border-white/30 focus:border-purple-400'
                }`}
              />
              {errors.dateOfJoining && touched.dateOfJoining && (
                <div className="flex items-center text-red-500 text-xs mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.dateOfJoining}
                </div>
              )}
            </div>
            <div>
              <label htmlFor="timeSlot" className="flex items-center text-xs font-medium text-gray-700 mb-1">
                <Clock className="h-3 w-3 mr-1 text-purple-400" />
                Time Slot (Min 5hrs) *
              </label>
              <select
                id="timeSlot"
                name="timeSlot"
                value={formData.timeSlot}
                onChange={handleInputChange}
                onBlur={handleBlur}
                className={`w-full px-3 py-2 backdrop-blur-sm bg-white/10 border rounded-lg text-sm transition-all duration-300 focus:outline-none focus:ring-1 focus:ring-purple-500 text-gray-800 ${
                  errors.timeSlot && touched.timeSlot
                    ? 'border-red-400 bg-red-500/10'
                    : 'border-white/30 focus:border-purple-400'
                }`}
              >
                <option value="" className="bg-white text-gray-800">Select time slot</option>
                {timeSlots.map(slot => (
                  <option key={slot.value} value={slot.value} className="bg-white text-gray-800">
                    {slot.label}
                  </option>
                ))}
              </select>
              {errors.timeSlot && touched.timeSlot && (
                <div className="flex items-center text-red-500 text-xs mt-1">
                  <AlertCircle className="h-3 w-3 mr-1" />
                  {errors.timeSlot}
                </div>
              )}
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-purple-500 to-indigo-600 text-white py-2.5 px-4 rounded-lg font-medium text-sm hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg mt-6"
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="animate-spin h-4 w-4 mr-2" />
                  Processing...
                </div>
              ) : (
                'Register'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;