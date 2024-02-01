import React, { useEffect, useState } from 'react'
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";
import Button from 'react-bootstrap/Button';
import { v4 as uuidv4 } from 'uuid';
import { getDatabase, ref as dref, set, push, onValue } from "firebase/database";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ModalImage from "react-modal-image";
import { getAuth, signOut } from "firebase/auth";
import { userLoginInfo } from '../slices/userSlice';

const HomePage = () => {
    const auth = getAuth();
    const notify = () => toast("please wait a few seconds");
    let navigate = useNavigate()
    let data = useSelector((state) => state.userLoginInfo.value)

    if (data == 'null') {
        navigate('/')
    }

    const db = getDatabase();
    let id = uuidv4();
    let [image, setImage] = useState('')
    let [imageList, setImageList] = useState([])
    const storage = getStorage();

    let handleImage = (e) => {
        setImage(e.target.files[0])
    }
    let handleUpdate = () => {
        notify()
        const storageRef = ref(storage, id);

        // 'file' comes from the Blob or File API
        uploadBytes(storageRef, image).then((snapshot) => {
            getDownloadURL(storageRef).then((downloadURL) => {

                set(push(dref(db, 'image/')), {
                    adminid: data.uid,
                    image: downloadURL
                }).then(() => {
                    setImage('')

                })
            });
        });
    }

    useEffect(() => {
        const starCountRef = dref(db, 'image/');
        onValue(starCountRef, (snapshot) => {
            let array = []
            snapshot.forEach(item => {
                if (data.uid == item.val().adminid) {
                    array.push({ ...item.val(), key: item.key })

                }
            });
            setImageList(array)
        });
    }, [])

    let handleLogout=()=>{
        signOut(auth).then(() => {
            navigate('/')
            useDispatch(userLoginInfo(null))
            localStorage.removeItem('userInfo')
          }).catch((error) => {
            console.log(error)
          });
    }
    return (
        <div className='mainDiv  '>
            <ToastContainer />
            <div>
                <input onChange={handleImage} type="file" /> <br />
                <Button onClick={handleUpdate} className='button' variant="primary">Upload Image</Button>{' '}
                <Button onClick={handleLogout} className='button' variant="danger">Logout</Button>{' '}
                <div className='imageList'>
                    {
                        imageList.map((item) => (
                            <ModalImage
                                small={item.image}
                                large={item.image}
                                alt="Hello World!"
                            />

                    ))
                }

                </div>
            </div>
        </div>
    )
}

export default HomePage