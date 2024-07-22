import React from 'react';
import '../styles/Logo.css'; // Ensure the path to your CSS file is correct

function Logo() {
  return (
    <div style = {{marginBottom:"25px",marginLeft:"10px"}}>
    <div className="line-container">
        <p className='shlivko'><b>SHLIVKO</b></p>
      <span >&</span>
      <p className='young'><b>YOUNG</b></p>
      <p style={{fontSize:"7px",marginTop:"55px",position:"absolute",marginLeft:"30px"}}>LAW FIRM</p>
    </div></div>
  );
}

export default Logo;
