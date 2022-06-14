//import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {app,database, storage} from './firebaseConfig'
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import {useState} from 'react'
import {getAuth,signInWithEmailAndPassword, GoogleAuthProvider,createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth";

import Signup from "./signup"
import Layout from "./layout"
import Home from "./home"
import {collection,addDoc, onSnapshot, getDocs} from 'firebase/firestore'


function App() {
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
      alert("You have signed up successfully!!")
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

  return (
    
    
    <div className="login">
      <div class="login1"> 
      <h2>LOGIN</h2>
      <input id="Uname" onChange={(event)=>handleInput(event)} name="email" type="email" placeholder="Enter Email"/><br /><br />
        <input id="Pass" onChange={(event)=>handleInput(event)} name="password" type="password" placeholder="Enter Password"/><br /><br />
         
         <button id="btn12" class="button-81" onClick={handleSubmit4signin}>Sign In</button>
         <BrowserRouter>
          <Routes>
          <Route path="/" element={<Layout />}>
              <Route path="signup" element={<Signup />} />
              </Route>
          </Routes>
    </BrowserRouter>
    </div>
        <hr />
        <div className='log-2'>
        <h2>DETAILS</h2>
        <input id="uname" onChange={(event)=>handleInput(event)} name="text" type="text" placeholder="Enter Username"/><br /><br />
        <input id="age" onChange={(event)=>handleInput(event)} name="age" type="age" placeholder="Enter age"/><br /><br />
        <input id="address" onChange={(event)=>handleInput(event)} name="address" type="text" placeholder="Enter address"/><br />
        <div class="center2"> 
         <button class="button-81"  color='red' onClick={handleSubmitData}>Submit</button><br /><br /><br />
         </div>
         <hr />
      <input type='file' id="actual-btn" aria-label="File browser example" hidden onChange={(event)=>{setData(event.target.files[0])}}/>
      <span class="file-custom"></span>
      <label id="ac12" onClick={handleFileSubmit} for="actual-btn">Choose File</label><br /><br /> 
  
      <div class="center">
      <button id="btn123" class="button-81"  onClick={getData}>Get Data</button><br /><br />
     </div>
      
      </div>
    </div>
  );
}

export default App;
