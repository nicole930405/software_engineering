import React from "react";
import "../App.css"

const store = (city) => {
    console.log(city)
    const catchCity = city.city;
    return (
        <div className="background">
            <div className="move_text">
                餐廳 &gt; {catchCity}
            </div>
        </div>
    );
};

export default store;
