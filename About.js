import React, { useState } from 'react';
import { storage, db } from './firebase'; // Adjust the import path as needed
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, setDoc } from 'firebase/firestore';
import Imageupload from '../components/Imageupload';
const About = () => { 

  return(
    <Imageupload/>
  )
}// Accept userId as a prop
 
export default About;
