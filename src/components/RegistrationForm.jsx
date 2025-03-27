import React, { useState } from "react";
import "./RegistrationForm.css";

const RegistrationForm = () => {
  const [formData, setFormData] = useState({
    userId: "",
    password: "",
    name: "",
    address: "",
    country: "",
    zipCode: "",
    email: "",
    sex: "",
    language: [],
    about: "",
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  // Getter function to retrieve the form data
  const getFormData = (field) => formData[field];

  // Setter function to update the form data
  const setFormDataValue = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const validateForm = () => {
    let validationErrors = {};

    if (!getFormData("userId") || getFormData("userId").length < 5 || getFormData("userId").length > 12) {
      validationErrors.userId = "User ID must be 5-12 characters long.";
    }

    if (!getFormData("password") || getFormData("password").length < 7 || getFormData("password").length > 12) {
      validationErrors.password = "Password must be 7-12 characters long.";
    }

    if (!getFormData("name").match(/^[A-Za-z\s]+$/)) {
      validationErrors.name = "Name must contain only alphabets.";
    }

    if (getFormData("zipCode") && !/^\d+$/.test(getFormData("zipCode"))) {
      validationErrors.zipCode = "ZIP Code must contain only numbers.";
    }

    if (!getFormData("email") || !/\S+@\S+\.\S+/.test(getFormData("email"))) {
      validationErrors.email = "Invalid email format.";
    }

    if (!getFormData("country")) {
      validationErrors.country = "Please select a country.";
    }

    if (!getFormData("sex")) {
      validationErrors.sex = "Please select your gender.";
    }

    if (getFormData("language").length === 0) {
      validationErrors.language = "Please select at least one language.";
    }

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      const updatedLanguages = checked
        ? [...getFormData("language"), value]
        : getFormData("language").filter((lang) => lang !== value);
      
      setFormDataValue("language", updatedLanguages);
    } else {
      setFormDataValue(name, value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      setSubmitted(true);
    } else {
      setSubmitted(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Registration Form</h2>
      <form onSubmit={handleSubmit}>
        
        <label>User ID:</label>
        <input
          type="text"
          name="userId"
          value={getFormData("userId")}
          onChange={handleChange}
          required
        />
        {errors.userId && <p className="error">{errors.userId}</p>}

        <label>Password:</label>
        <input
          type="password"
          name="password"
          value={getFormData("password")}
          onChange={handleChange}
          required
        />
        {errors.password && <p className="error">{errors.password}</p>}

        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={getFormData("name")}
          onChange={handleChange}
          required
        />
        {errors.name && <p className="error">{errors.name}</p>}

        <label>Address (Optional):</label>
        <input
          type="text"
          name="address"
          value={getFormData("address")}
          onChange={handleChange}
        />

        <label>Country:</label>
        <select
          name="country"
          value={getFormData("country")}
          onChange={handleChange}
          required
        >
          <option value="">Select Country</option>
          <option value="USA">USA</option>
          <option value="India">India</option>
          <option value="UK">UK</option>
          <option value="Germany">Germany</option>
        </select>
        {errors.country && <p className="error">{errors.country}</p>}

        <label>ZIP Code:</label>
        <input
          type="text"
          name="zipCode"
          value={getFormData("zipCode")}
          onChange={handleChange}
        />
        {errors.zipCode && <p className="error">{errors.zipCode}</p>}

        <label>Email:</label>
        <input
          type="email"
          name="email"
          value={getFormData("email")}
          onChange={handleChange}
          required
        />
        {errors.email && <p className="error">{errors.email}</p>}

        <label>Sex:</label>
        <div>
          <label>
            <input
              type="radio"
              name="sex"
              value="Male"
              checked={getFormData("sex") === "Male"}
              onChange={handleChange}
              required
            />
            Male
          </label>
          <label>
            <input
              type="radio"
              name="sex"
              value="Female"
              checked={getFormData("sex") === "Female"}
              onChange={handleChange}
              required
            />
            Female
          </label>
        </div>
        {errors.sex && <p className="error">{errors.sex}</p>}

        <label>Language:</label>
        <div>
          <label>
            <input
              type="checkbox"
              name="language"
              value="English"
              checked={getFormData("language").includes("English")}
              onChange={handleChange}
            />
            English
          </label>
          <label>
            <input
              type="checkbox"
              name="language"
              value="Non English"
              checked={getFormData("language").includes("Non English")}
              onChange={handleChange}
            />
            Non English
          </label>
        </div>
        {errors.language && <p className="error">{errors.language}</p>}

        <label>About (Optional):</label>
        <textarea
          name="about"
          value={getFormData("about")}
          onChange={handleChange}
        />

        <button type="submit">Submit</button>
      </form>

      {submitted && (
        <div className="output-table">
          <h3>Submitted Data:</h3>
          <table border="1">
            <tbody>
              {Object.keys(formData).map((key) => (
                <tr key={key}>
                  <td>{key}</td>
                  <td>{Array.isArray(formData[key]) ? formData[key].join(", ") : formData[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default RegistrationForm;
