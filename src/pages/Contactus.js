import "../styles/Contact.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Handshake from "../images/handshake.jpg";
import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faComment } from '@fortawesome/free-solid-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';



function Contactus(){

    const [formData, setFormData] = useState({
        name: '',
        email: '',
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value,
        }));
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        // Handle form submission logic (e.g., send data to server)
        console.log('Form Submitted:', formData);
        alert(`Name: ${formData.name}, Email: ${formData.email}`);
      };
    return (
     
        <div className="contact-container">
            
         <div className="nav-contactus">
                <Navbar/>
            </div>
            <div className="tophalf-div">
            <div className="leftside-container">
                <img src = {Handshake} alt="handshake" className="handshakeimg"/>
            </div>
             <div className="rightside-container">
             <div>
      <h2 className="h2-contactus">Contact Us</h2>
      <p className="contactus-support">We are here to help.Reach out to us for a free consultation or any inquiries</p>
      <form onSubmit={handleSubmit}>
        <div className="namecontainer">
            <div>
          <label></label>
          <input
            type="text"
            name="firstname"
            value={formData.firstname}
            placeholder="First Name"
            onChange={handleChange}
            className="firstnamecontainer"
            required
          />
        </div>
        <div>
          <label></label>
          <input
            type="text"
            name="lastname"
            value={formData.lastname}
            placeholder="Last Name"
            onChange={handleChange}
            className="lastnamecontainer"
            required
          />
        </div>
        </div>
        <div className="email-phonecontainer">
        <div>
          <label></label>
          <input
            type="email"
            name="email"
            value={formData.email}
            placeholder="Email"
            onChange={handleChange}
            required
            className="emailbox"
          />
        </div>
        <div className="phone-container">
          <label></label>
          <input
            type="phone"
            name="phone"
            placeholder="Phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="phonebox"
          />
        </div>

        </div>
        <div className="choice-container">
          <label className="choosetopiclabel"></label>
          <select
            name="topic"
            value={formData.topic}
            onChange={handleChange}
            required
            className="selectbox"
          >
      
       <option className="option-box" value="">
        choose a topic</option>    
            <option value="topic1">Topic 1</option>
            <option value="topic2">Topic 2</option>
            <option value="topic3">Topic 3</option>
          </select>
        </div> 
        <div className="messagebox">
          <label> </label>
          <input className="messageinput"
            type="text"
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder ="your message..."
            required
          />
        </div>
        <button type="submit" className="submit-button">Send</button>
      </form>
    </div>





             </div>
             </div>

          <div className="bottomhalf-div">

              <div className="left-bottom-div">  
              <FontAwesomeIcon icon={faEnvelope} className="email-icon" />
              <p className="description-email">Email</p>
              <p className="description1">
                Have questions or need more information? Send us an email
                and we will get back to you promptly
              </p>
              <p className="contactusbyemail">contact@nylitigation.com</p>
              </div>
              <div className="middle-bottom-div">
               
              <FontAwesomeIcon icon={faComment} className="chat-icon" />

              <p className="description-email">Chat</p>
              <p className="description1">
                Have questions or need more information? Send us an email
                and we will get back to you promptly
              </p>
              <p className="contactusbyemail">Start Live Chat</p>



              </div>
              <div className="right-bottom-div">
              <FontAwesomeIcon icon={faPhone} className="telephone-icon" />
              <p className="description-phone">Phone</p>
              <p className="description2-phone">
                Prefer to speak with someone?Give us a call at (844) SAM JUSTICE
              </p>
              <p className="contactusbyemail">(844)SAM JUSTICE</p>

              </div>


          </div>
          <div className="contactus-footer">
            <Footer/>
          </div>
        </div>

     
    )
}

export default Contactus