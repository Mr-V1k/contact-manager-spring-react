import { useEffect, useRef, useState } from 'react';
import './App.css';
import { getContacts, saveContact, updateContact, updatePhoto } from './api/contact-service';

import Header from './componenets/Header';
import ContactList from "./componenets/ContactList"

import { Routes, Route, Navigate } from 'react-router-dom';
import ContactDetails from './componenets/ContactDetails';

function App() {
  const modalRef = useRef();
  const fileRef = useRef();
  const [data, setData] = useState({});
  const [currentPage, setCurrentPage] = useState(0);
  const [file, setFile] = useState(undefined)
  const [values, setValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    occupation: '',
    status: '',
  });

  const getAllContacts = async (page = 0, size = 10) => {
    try{
      setCurrentPage(page);
      const {data} = await getContacts(page, size);
      setData(data);
      console.log(data);
    }catch(err){
      console.log(err);
      fileRef.current.value = undefined;
    }
  }

  const handleNewContact = async (event) => {
    event.preventDefault();
    try{
      const { data } = await saveContact(values);
      const formData = new FormData();
      formData.append("file", file, file.name);
      formData.append("id", data.id);
      const {data: photoUrl} = await updatePhoto(formData)
      toggleModal(false)
      setFile(undefined);
      fileRef.current.value = null;
      setValues({
        name: '',
        email: '',
        phone: '',
        address: '',
        occupation: '',
        status: '',
      });
      getAllContacts();
    }catch(err){
      console.log(err);
    }
  }

  const updateContact = async (formData) => {
    try{
      const {data: photoUrl} = await updatePhoto(formData);
    }catch(err){
      console.log(err);
    }
  }

  const updateImage = async () => {
    try{

    }catch(err){
      console.log(err);
    }
  }

  const onChange = (event) => {
    setValues({ ...values, [event.target.name]: event.target.value }); 
  }

  useEffect(() => {
    getAllContacts();
  }, []);

  const toggleModal = (show) => show ? modalRef.current.showModal() : modalRef.current.close(); 

  return (
    <>
      <Header toggleModal={toggleModal} nbOfContacts={data.numberOfElements}/> 
      <main className="main">
        <div className="container">
          <Routes>
            <Route path="/" element={<Navigate to={'/contacts'}/>} />
            <Route path="/contacts" element={<ContactList data={data} cuurentPage={currentPage} getAllContacts={getAllContacts}/>}/>
            <Route path="contacts/:id" element={<ContactDetails updateContact={updateContact} updateImage={updateImage}/> } />
          </Routes>
        </div>
      </main>

      {/* */}
      <dialog ref={modalRef} className="modal" id="modal">
        <div className="modal__header">
          <h3>New Contact</h3>
          <i onClick={() => toggleModal(false)} className="bi bi-x-lg"></i>
        </div>
        <div className="divider"></div>
        <div className="modal__body">
          <form onSubmit={handleNewContact}>
            <div className="user-details">
              <div className="input-box">
                <span className="details">Name</span>
                <input type="text" value={values.name} onChange={onChange} name='name' required />
              </div>
              <div className="input-box">
                <span className="details">Email</span>
                <input type="text" value={values.email} onChange={onChange} name='email' required />
              </div>
              <div className="input-box">
                <span className="details">Occupation</span>
                <input type="text" value={values.occupation} onChange={onChange} name='occupation' required />
              </div>
              <div className="input-box">
                <span className="details">Phone Number</span>
                <input type="text" value={values.phone} onChange={onChange} name='phone' required />
              </div>
              <div className="input-box">
                <span className="details">Address</span>
                <input type="text" value={values.address} onChange={onChange} name='address' required />
              </div>
              <div className="input-box">
                <span className="details">Account Status</span>
                <input type="text" value={values.status} onChange={onChange} name='status' required />
              </div>
              <div className="file-input">
                <span className="details">Profile Photo</span>
                <input type="file" onChange={(event) => setFile(event.target.files[0])} ref={fileRef} name='photo' required />
              </div>
            </div>
            <div className="form_footer">
              <button onClick={() => toggleModal(false)} type='button' className="btn btn-danger">Cancel</button>
              <button type='submit' className="btn">Save</button>
            </div>
          </form>
        </div>
      </dialog>
    </>
  );
}

export default App;
