import React, { useState, useRef } from "react";

function UserPage() {
  const [name, setName] = useState("John Byrd");
  const [email, setEmail] = useState("jsmith@gmail.com");
  const [profilePicture, setProfilePicture] = useState("./defaultUser.png");
  const [isNameEditing, setIsNameEditing] = useState(false);
  const [isEmailEditing, setIsEmailEditing] = useState(false);
  const [emailError, setEmailError] = useState("");
  const fileInputRef = useRef(null);

  const handleNameSave = () => {
    // Save name changes to backend or wherever necessary
    setIsNameEditing(false);
  };

  const handleEmailSave = () => {
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    // Save email changes to backend or wherever necessary
    setIsEmailEditing(false);
    setEmailError("");
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClickEditPicture = () => {
    fileInputRef.current.click();
  };

  return (
    <div style={{ textAlign: "center", margin: "auto", maxWidth: "600px" }}>
      <h2>User Profile</h2>
      <div style={{ textAlign: "center", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "20px" }}>
        <div style={{ textAlign: "left" }}>
          <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: "none" }} ref={fileInputRef} />
          <div>
            <img src={profilePicture} alt="Profile" style={{ width: "100px", height: "100px", borderRadius: "50%", marginBottom: "10px" }} />
          </div>
          <div>
            <button onClick={handleClickEditPicture} style={{ marginTop: "5px" }}>Edit Picture</button>
          </div>
        </div>
        <div style={{ marginLeft: "20px" }}>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            {isNameEditing ? (
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
            ) : (
              <h3>{name}</h3>
            )}
            <span style={{ marginLeft: "10px" }}>
              {isNameEditing ? (
                <button onClick={handleNameSave}>Save</button>
              ) : (
                <button onClick={() => setIsNameEditing(true)}>Edit Name</button>
              )}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            {isEmailEditing ? (
              <>
                <input type="text" value={email} onChange={(e) => setEmail(e.target.value)} />
                <p style={{ color: "red" }}>{emailError}</p>
              </>
            ) : (
              <p>Email: {email}</p>
            )}
            <span style={{ marginLeft: "10px" }}>
              {isEmailEditing ? (
                <button onClick={handleEmailSave}>Save</button>
              ) : (
                <button onClick={() => setIsEmailEditing(true)}>Edit Email</button>
              )}
            </span>
          </div>
        </div>
      </div>
      <div style={{ border: "1px solid #ccc", borderRadius: "5px", padding: "10px", marginBottom: "20px" }}>
        <h3>Ongoing Projects</h3>
        <div>
          <p>Byrd Feeders</p>
          <p>Total Donation: $2333</p>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
