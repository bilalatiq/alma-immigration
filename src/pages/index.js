import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    country: '',
    linkedin: '',
    visas: [],
    resume: null,
    additionalInfo: '',
  });
  const [showPopup, setShowPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, files, checked } = e.target;
    if (type === 'file') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (type === 'checkbox') {
      const updatedVisas = checked
        ? [...formData.visas, value]
        : formData.visas.filter((visa) => visa !== value);
      setFormData({ ...formData, visas: updatedVisas });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.visas.length === 0) {
      alert('Please select at least one visa category.');
      return;
    }
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === 'visas') {
        formData[key].forEach((visa) => formDataToSend.append('visas', visa));
      } else {
        formDataToSend.append(key, formData[key]);
      }
    });

    const response = await fetch('/api/submit-lead', {
      method: 'POST',
      body: formDataToSend,
    });
    const result = await response.json();
    if (result.success) {
      setShowPopup(true);
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        country: '',
        linkedin: '',
        visas: [],
        resume: null,
        additionalInfo: '',
      });
    }
  };

  const closePopup = () => {
    setShowPopup(false);
    window.location.href = '/';
  };

  return (
    <div className="min-h-screen">
      {/* Banner Section */}
      <div>
        <div className="text-center">
          <img src="/banner.png" alt="almá logo" className="h-120 w-full" />
        </div>
      </div>

      {/* Main Form Section */}
      <div className="bg-[#ffffff]">
        <div className="max-w-md mx-auto">
          <form onSubmit={handleSubmit} className="bg-white p-6 space-y-6">
            {/* Section 1: Want to understand your visa options? */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <span className="text-purple-400 text-2xl">📄</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">
                Want to understand your visa options?
              </p>
              <p className="text-gray-600 mt-2">
                Submit the form below and our team of experienced attorneys will review your information and send a
                preliminary assessment of your case based on your goals.
              </p>
            </div>

            {/* Form Fields */}
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="First Name"
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Last Name"
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />
            <select
              name="country"
              value={formData.country}
              onChange={handleChange}
              required
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              <option value="" disabled>
                Country of Citizenship
              </option>
              <option value="USA">USA</option>
              <option value="Canada">Canada</option>
              <option value="Mexico">Mexico</option>
              {/* Add more countries as needed */}
            </select>
            <input
              type="text"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="LinkedIn / Personal Website URL"
              className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300"
            />

            {/* Section 2: Visa categories of interest? */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <span className="text-purple-400 text-2xl">🎲</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">Visa categories of interest?</p>
              <div className="space-y-2 mt-4">
                {['O-1', 'EB-1A', 'EB-2 NIW', "I don't know"].map((visa) => (
                  <label key={visa} className="flex items-center">
                    <input
                      type="checkbox"
                      name="visas"
                      value={visa}
                      checked={formData.visas.includes(visa)}
                      onChange={handleChange}
                      className="mr-2"
                    />
                    {visa}
                  </label>
                ))}
              </div>
            </div>

            {/* Resume Upload */}
            <input
              type="file"
              name="resume"
              onChange={handleChange}
              className="w-full p-3 border rounded-md focus:outline-none"
            />

            {/* Section 3: How can we help you? */}
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <span className="text-purple-400 text-2xl">❤️</span>
              </div>
              <p className="text-lg font-semibold text-gray-800">How can we help you?</p>
              <textarea
                name="additionalInfo"
                value={formData.additionalInfo}
                onChange={handleChange}
                placeholder="What is your current status and when does it expire? What is your past immigration history? Are you looking for long-term permanent residency or short-term employment visa or both? Are there any timeline considerations? Tell us more!"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-gray-300 h-32"
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors w-full"
            >
              Submit
            </button>
          </form>
        </div>
      </div>

      {/* Popup on Successful Submission */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-md text-center max-w-md">
            <div className="flex items-center justify-center mb-4">
              <span className="text-purple-400 text-2xl">📄</span>
            </div>
            <p className="text-lg font-semibold text-gray-800 mb-4">Thank You</p>
            <p className="text-gray-600 mb-4">
              Your information was submitted to our team of immigration attorneys. Expect an email from hello@alma.ai.
            </p>
            <button
              onClick={closePopup}
              className="bg-black text-white py-2 px-6 rounded-md hover:bg-gray-800 transition-colors"
            >
              Go Back to Homepage
            </button>
          </div>
        </div>
      )}
    </div>
  );
}