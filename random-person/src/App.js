import React, { useState, useEffect } from "react";
import {FaUser, FaEnvelopeOpen,} from "react-icons/fa";
import "./App.css";

function App() {
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState("Random Person");
  const [value, setValue] = useState("name");
  const getUser = async () => {
    const response = await fetch("https://randomuser.me/api/");
    const data = await response.json();
    const person = data.results[0];
    const { email } = person;
    const { large: image } = person.picture;
    const { first, last } = person.name;
  

    const newPerson = {
      image,
      email,
      name: `${first} ${last}`,
    };
    setUser(newPerson);
    setTitle("name");
    setValue(newPerson.name);
  };

  useEffect(() => {
    getUser();
  }, []);

  const handleValue = (e) => {
    if (e.target.classList.contains("icon")) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(user[newValue]);
    }
  };

  return (
    <div className="App">
      <div className="block bcg-black">
         <h1>Random Person Generator</h1> 
      </div>

      <div className="block">
        <div className="container">
          <img src={user && user.image} className="user-img" alt="user-img" />
          <p className="user-title">My {title} is</p>
          <p className="user-value">{value}</p>
          <div className="values-list">
            <button
              className="icon"
              data-label="name"
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            
           
            <button
              className="icon"
              data-label="email"
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
       
          </div>
          <button className="btn" type="submit" onClick={getUser}>
            New User
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
