import React, { useState } from "react";

const FormComponent = () => {
  const [num1, setNum1] = useState("");
  const [num2, setNum2] = useState("1");
  const [num3, setNum3] = useState(null);
  const [results, setResults] = useState([]);

  // Function to check for Prime number
  const isPrime = (num) => {
    if (num <= 1) return false;
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) return false;
    }
    return true;
  };

  // Function to check for Armstrong number
  const isArmstrong = (num) => {
    const digits = num.toString().split("").map(Number);
    const power = digits.length;
    const sum = digits.reduce((acc, digit) => acc + Math.pow(digit, power), 0);
    return sum === num;
  };

  // Function to check for Ramanujam number
  const isRamanujam = (num) => {
    const cubes = new Map();
    for (let i = 1; i ** 3 < num; i++) {
      const cube = i ** 3;
      if (cubes.has(num - cube)) return true;
      cubes.set(cube, true);
    }
    return false;
  };

  const handlePrompt = () => {
    const value = prompt("Enter the third number:");
    if (!isNaN(value) && value.trim() !== "") {
      setNum3(Number(value));
    } else {
      alert("Invalid input! Please enter a valid number.");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (num1 === "" || !num3) {
      alert("Please enter all three numbers.");
      return;
    }

    const numbers = [Number(num1), Number(num2), Number(num3)];
    const newResults = numbers.map((num) => ({
      number: num,
      prime: isPrime(num) ? "Yes" : "No",
      armstrong: isArmstrong(num) ? "Yes" : "No",
      ramanujam: isRamanujam(num) ? "Yes" : "No",
    }));

    setResults(newResults);

    // Displaying the results in an alert window
    newResults.forEach((res) => {
      alert(`Number: ${res.number}
Prime: ${res.prime}
Armstrong: ${res.armstrong}
Ramanujam: ${res.ramanujam}`);
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter First Number (Text Box):</label>
        <input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          required
        />

        <label>Select Second Number (Dropdown):</label>
        <select
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>

        <button type="button" onClick={handlePrompt}>
          Enter Third Number (Prompt)
        </button>

        <button type="submit">Check Numbers</button>
      </form>

      {/* Display Results */}
      <h3>Results:</h3>
      {results.length > 0 && (
        <table>
          <thead>
            <tr>
              <th>Number</th>
              <th>Prime</th>
              <th>Armstrong</th>
              <th>Ramanujam</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, index) => (
              <tr key={index}>
                <td>{res.number}</td>
                <td>{res.prime}</td>
                <td>{res.armstrong}</td>
                <td>{res.ramanujam}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default FormComponent;
