import React, { useState } from "react";

const AddUser = () => {
  const [success, setSuccess] = useState(false);

  const handleAddUser = (event) => {
    setSuccess(false);
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;
    console.log(name, email);
    const user = { name, email };

    fetch("http://localhost:5000/user", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("success", data);
        event.target.reset();
        setSuccess(true);
      });
  };
  return (
    <div>
      <h2>Please add a new user</h2>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" placeholder="Name" required />
        <br />
        <input type="email" name="email" placeholder="Email" required />
        <br />
        <input type="submit" value="Add User" />
      </form>
      {success && <p>User added successfully</p>}
    </div>
  );
};

export default AddUser;
