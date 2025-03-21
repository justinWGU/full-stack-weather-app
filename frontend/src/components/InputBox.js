import React from "react";
import '../css/style.css';

const InputBox = ({ handleSubmit, handleChange, city }) => {
// Handles input box for entering city.

    return (
        <div className="text-center">
            <form onSubmit={handleSubmit}>
            <div>
                <label className="col-form-label">Enter city name</label>
                <input className="form-text" type="text" value={city || ""} name="cityName" onChange={handleChange}></input>
            </div>
            <div className="city-button"> 
            <button className="btn btn-primary" type="submit">submit</button>
            </div>
            </form>
        </div>
    );
}

export default InputBox;