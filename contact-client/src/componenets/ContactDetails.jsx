import React, { useEffect, useRef, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getContact, updatePhoto } from '../api/contact-service';

const ContactDetails = ({ updateContact, updateImage }) => {
    const inputRef = useRef();
    const [contact, setContact] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        title: "",
        status: "",
        photoUrl: "",
    });

    const { id } = useParams();

    const fetchContact = async (id) => {
        try {
            const { data } = await getContact(id);
            console.log(data);
            setContact(data);
        } catch (err) {
            console.log(err);
        }
    };

    const selectImage = () => {
        inputRef.current.click();
    };

    const uploadPhoto = async (file) => {
        try {
            const formData = new FormData();
            formData.append("file", file, file.name);
            formData.append("id", id);
            await updateImage(formData);
            setContact((prev) => ({
                ...prev,
                photoUrl: `${prev.photoUrl}&updated_at=${new Date().getTime()}`
            }));
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        fetchContact(id);
    }, [])

    return (
        <>
            <Link to={"/"} className="link"><i className="bi bi-arrow-left"></i> Back to list</Link>
            <div className="profile">
                <div className="profile__details">
                    <img src={contact.photoUrl} alt={`Profile photo of ${contact.name}`} />
                    <div className="profile__metadata">
                        <p className="profile__name">{contact.name}</p>
                        <p className="profile__muted">JPG, GIF or PNG. Max size of 10MB</p>
                        <button onClick={selectImage} className="btn"><i className="bi bi-cloud-upload"></i> Change Photo</button>
                    </div>
                </div>
                <div className="profile__settings">
                    Settings
                </div>
            </div>
            <form style={{ display: "none" }}>
                <input type="file" ref={inputRef} onChange={(event) => updatePhoto(event.target.files[0])} name="file" accept="image/"></input>
            </form>
        </>
    )
}

export default ContactDetails