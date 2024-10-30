import { useState } from 'react';
import { db } from '../../firebase'; // Путь к файлу firebaseConfig.js
import { collection, addDoc, Timestamp } from "firebase/firestore"; // Импортируйте необходимые функции

const Blogs = collection(db, 'blogs'); // Создайте ссылку на коллекцию

const CreateBlog = () => {
    const [title, setTitle] = useState(""); 
    const [body, setBody] = useState("");

    const sub = async (e) => {
        e.preventDefault();
        
        try {
            // Добавляем данные в Firestore
            await addDoc(Blogs, {
                Title: title,
                Body: body,
                publish: false,
                published_on: Timestamp.fromDate(new Date()) // Используем Timestamp для текущей даты
            });
            alert("Data Successfully Submitted");
        } catch (error) {
            console.error("Error adding document: ", error);
        }
    };

    return (
        <div>
            <form onSubmit={sub}>    
                <input 
                    type="text" 
                    placeholder="Title" 
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />
                <textarea
                    name="content"
                    placeholder="Write your content here"
                    rows="10"
                    cols="150"
                    onChange={(e) => setBody(e.target.value)}
                    required
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default CreateBlog;
