import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Fib = () => {
  const [seenIndexes, setSeenIndexes] = useState([]);
  const [values, setValues] = useState({});
  const [index, setIndex] = useState('');

  useEffect(() => {
    fetchValues();
    fetchIndexes();
  }, []);

  const fetchValues = async () => {
    const res = await axios.get('/api/values/current');
    setValues(res.data);
  };

  const fetchIndexes = async () => {
    const res = await axios.get('/api/values/all');
    setSeenIndexes(res.data);
  };

  const renderSeenIndexes = () => {
    return seenIndexes.map(({ number }) => number).join(', ');
  };

  const renderValues = () => {
    const entries = [];
    for (let key in values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {values[key]}
        </div>
      );
    }

    return entries;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post('api/values', { index });

    setIndex('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>Enter your input</label>
        <input value={index} onChange={(e) => setIndex(e.target.value)} />
        <button>Submit</button>
      </form>

      {seenIndexes ? (
        <>
          <h3>Indexes I have seen: </h3>
          {renderSeenIndexes()}
        </>
      ) : null}

      {values ? (
        <>
          <h3>Calculated Values: </h3>
          {renderValues()}
        </>
      ) : null}
    </div>
  );
};

export default Fib;
