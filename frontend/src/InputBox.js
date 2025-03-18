import React from "react";

const InputBox = ({ handleSubmit, handleChange, city }) => {
// Handles input box for entering city.

    return (
        <div>
            <form onSubmit={handleSubmit}>
            <label>Enter city name:</label>
            <input type="text" value={city || ""} name="cityName" onChange={handleChange}></input>
            <button type="submit">submit</button>
            </form>
        </div>
    );
}

export default InputBox;