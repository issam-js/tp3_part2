import { useState } from "react";

const database = [
  { username: "user1", password: "pass1" },
  { username: "user2", password: "pass2" },
];

// list of possible errors
const errors = {
  usernameExists: "identifiant deja existe.",
  passwordNotValid:
    "Mot de passe doit contenir au moins une lettre, un chiffre et un caractère spécial.",
  passwordShort: "Mot de passe doit contenir au moins 8 caractères.",
};

function Form({ toggleRegistered }) {
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState({ uname: "", upass: "" });

  // handle password change
  const handlePasswordChange = (e) => {
    const passwordValue = e.currentTarget.value;
    let errorText = "";
    if (passwordValue.length < 8) {
      errorText = errors.passwordShort;
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[^\w\s]).*$/.test(passwordValue)) {
      errorText = errors.passwordNotValid;
    }
    setErrorMessages((prev) => ({ ...prev, upass: errorText }));
    setPassword(passwordValue);
  };

  //handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    //stop form submiting if there is already a password error (we dont want to consume our database resources if the password is not valid)
    if (errorMessages.upass) {
      return;
    }
    //checking if the username already exists in the db
    const formData = new FormData(event.target);
    const username = formData.get("uname");
    const userNameExists = database.find((user) => user.username === username);
    if (userNameExists) {
      setErrorMessages((prev) => ({ ...prev, uname: errors.usernameExists }));
      return;
    } else {
      //delete username error message
      setErrorMessages((prev) => ({ ...prev, uname: "" }));
    }
    //add the user to the database and send him to the registered component
    database.push({ username, password });
    toggleRegistered();
  };

  const renderErrorMessage = (name) => {
    return (
      errorMessages[name] && <div className="error">{errorMessages[name]}</div>
    );
    // same as:
    // if (errorMessages[name]) {
    //   return <div className="error">{errorMessages[name]}</div>;
    // }
  };
  return (
    <div className="login-form">
      <div className="title">Inscription</div>
      <div className="form">
        <form onSubmit={handleSubmit}>
          <div className="input-container">
            <label>L'identifiant </label>
            <input type="text" name="uname" required />
            {renderErrorMessage("uname")}
          </div>
          <div className="input-container">
            <label>Mot de passe </label>
            <input
              type="password"
              name="upass"
              required
              value={password}
              onChange={handlePasswordChange}
            />
            {renderErrorMessage("upass")}
          </div>
          <div className="input-container">
            <label>Date de naissance </label>
            <input type="date" name="upass" />
          </div>
          <div className="input-container">
            <label>Ville </label>
            <select name="ville">
              <option>Oujda</option>
              <option>Berkane</option>
              <option>Fes</option>
              <option>Rabat</option>
            </select>
          </div>
          <div className="">
            <label>Genre </label>
            <input type="radio" name="genre" id="homme" />
            <label htmlFor="homme">Homme</label>
            <input type="radio" name="genre" id="femme" />
            <label htmlFor="femme">Femme</label>
          </div>
          <div className="button-container">
            <label>Loisir: </label>
            <input type="checkbox" />
            <label>Sport</label>
            <input type="checkbox" />
            <label>Lecture</label>
            <input type="checkbox" />
            <label>Musique</label>
          </div>
          {/* submit button */}
          <div className="button-container">
            <input type="submit" value="Se connecter" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Form;
