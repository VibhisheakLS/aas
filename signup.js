import React from 'react';

import {Route} from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import './App.css';
import App from './App';
import {app,database, storage} from './firebaseConfig'
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {useState} from 'react'
import {getAuth,signInWithEmailAndPassword, GoogleAuthProvider,createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import {collection,addDoc, onSnapshot, getDocs} from 'firebase/firestore'
import reportWebVitals from './reportWebVitals';
function App1(){
    let auth = getAuth();
  const [data,setData] = useState({})
  
  const googleProvider = new GoogleAuthProvider();
  const mycollection = collection(database,'users')

 

  const handleInput = (event) => {
    let newInput = {[event.target.name]:event.target.value}
    setData({...data,...newInput})
  }
  const handleSubmit4signin = (event)=>{
    signInWithEmailAndPassword(auth,data.email,data.password)
    .then((response)=>{
      console.log(response.user)
      alert("You have signed in successfully!!");
    })
    .catch((err)=>{alert(err.message)})
     
  }
  const handleFileSubmit=(event) =>{
    const storageRef = ref(storage, 'images/' + data.name);
const uploadTask = uploadBytesResumable(storageRef, data);    
uploadTask.on('state_changed',
  (snapshot) => {
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    console.log('Upload is ' + progress + '% done');
    switch (snapshot.state) {
      case 'paused':
        console.log('Upload is paused');
        break;
      case 'running':
        console.log('Upload is running');
        break;
    }
  }, 
  (error) => {
    // A full list of error codes is available at
    // https://firebase.google.com/docs/storage/web/handle-errors
    switch (error.code) {
      case 'storage/unauthorized':
        // User doesn't have permission to access the object
        break;
      case 'storage/canceled':
        // User canceled the upload
        break;

      // ...

      case 'storage/unknown':
        // Unknown error occurred, inspect error.serverResponse
        break;
    }
  }, 
  () => {
    // Upload completed successfully, now we can get the download URL
    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
      console.log('File available at', downloadURL);
    });
  }
); 

  
}
const getData = () => {
    getDocs(mycollection).then((response)=>{
      console.log(response.docs.map((item)=>{
        return item.data();
      }))
    })
}

const handleSubmit = (event)=>{
  
  createUserWithEmailAndPassword(auth,data.email,data.password)
    .then((response)=>{
      console.log(response.user)
      alert("You have signed up sucessfully!!")
    })
    .catch((err)=>{alert(err.message)})
}
const handleSubmitData = (event) => {
  addDoc(mycollection,{email:data.email,username:data.text,age:data.age,email:data.email,Address:data.address})
  .then((response)=>{
    alert("New user added successfully!!")
 })
 .catch((err)=>{alert(err.message)})
}
const googleSignin = (event)=>{
  signInWithPopup(auth,googleProvider)
  .then((response)=>{
    console.log(response.user)
    alert("You have signed up sucessfully!!")
  })
  .catch((err)=>{alert(err.message)})
}

    return(
        <div className='App1'>
        <h2>Sign Up</h2>
      <div className='log-1'>
      <input id="email" name="email" type="email" placeholder="Enter Email" onChange={(event)=>handleInput(event)}/><br /><br />
        <input id="Pass"  name="password" type="password" placeholder="Enter Password" onChange={(event)=>handleInput(event)}/><br /><br />
        <div class="center">
        <button class="button-81"  color='red' onClick={handleSubmit}>Sign up</button>
        <div class="center">
      <button class="button-82"  onClick={googleSignin} type="submit"><img src="https://assets.materialup.com/uploads/3a91ac9f-f60f-4370-b58b-171d988c3b4b/preview.jpg" height ="30" width="35"/></button>
      </div>
        </div>
    </div>
    </div>
    );
}
export default App1;
