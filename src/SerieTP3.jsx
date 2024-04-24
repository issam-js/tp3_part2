import { useState } from "react";
import Form from "./components/Form";
import Registered from "./components/Registered";

function SerieTP3() {
  //this state will be used to toggle between the form and the registered component
  const [isRegistered, setIsRegistered] = useState(false);
  const toggleRegistered = () => {
    setIsRegistered(!isRegistered);
  };
  return (
    <div className="app">
      {isRegistered ? (
        <Registered toggleRegistered={toggleRegistered} />
      ) : (
        <Form toggleRegistered={toggleRegistered} />
      )}
    </div>
  );
}
export default SerieTP3;
