import React, { useState } from "react";
import Button from "../components/buttons/button";
import Avatar from "../components/avatar/avatar";

export const Profile = (props) => {
    const [bio, setBio] = useState("");

    const handleBio = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post('http://localhost:9992/profile', {
            bio,
          });
          console.log(response.data);
        } catch (err) {
          setError(err.response.data.message);
        }
      };

    return(
        <div className="profile">
            <div>
                <Avatar
                 src = "../components/avatar/male icons/male1.png"
                 alt = "Male 1"
                 size = {50}
                />
            </div>
            <form action="">
                <input type="text" />

            </form>
        </div>
    );
}
