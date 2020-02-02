// React
import React from "react";

const TopArrow = () => {
    const scrollTop = () => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    };

    return (
        <i onClick={scrollTop} className="fas fa-arrow-up fa-2x top-arrow"></i>
    );
};

export default TopArrow;
