import { useState } from "react";

const WalkInForm = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    ownerName: "",
    petName: "",
    phoneNumber: "",
    reason: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass data to backend
    setFormData({ ownerName: "", petName: "", phoneNumber: "", reason: "" }); // Reset form
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="ownerName"
        placeholder="Owner Name"
        value={formData.ownerName}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="petName"
        placeholder="Pet Name"
        value={formData.petName}
        onChange={handleChange}
        required
      />
      <input
        type="tel"
        name="phoneNumber"
        placeholder="Phone Number"
        value={formData.phoneNumber}
        onChange={handleChange}
        required
      />
      <textarea
        name="reason"
        placeholder="Reason for Visit"
        value={formData.reason}
        onChange={handleChange}
        required
      ></textarea>
      <button type="submit">Check In</button>
    </form>
  );
};

export default WalkInForm;
