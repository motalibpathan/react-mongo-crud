import React, { useState } from "react";
import { useParams } from "react-router-dom";

const UpdateUser = () => {
  const { id } = useParams();
  const [user, setUser] = React.useState({});
  const [success, setSuccess] = useState(false);

  React.useEffect(() => {
    console.log(id);
    fetch(`http://localhost:5000/user/${id}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch((err) => console.log(err));

    return () => {};
  }, [id]);

  const handleUpdateUser = (event) => {
    setSuccess(false);
    event.preventDefault();
    const name = event.target.name.value;
    const email = event.target.email.value;

    const updatedUser = { name, email };

    fetch(`http://localhost:5000/user/${id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(updatedUser),
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
      <h2>Update user:{user.name}</h2>
      <form onSubmit={handleUpdateUser}>
        <input type="text" name="name" placeholder="Name" required />
        <br />
        <input type="email" name="email" placeholder="Email" required />
        <br />
        <input type="submit" value="Add User" />
      </form>
      {success && <p>User updated successfully</p>}
    </div>
  );
};

export default UpdateUser;
