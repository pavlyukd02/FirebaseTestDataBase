import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import { db } from './firebase';
import { doc, getDoc, updateDoc, Timestamp } from "firebase/firestore"; // Импортируем нужные функции

const BlogEdit = () => {
    const { id } = useParams();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const docRef = doc(db, 'blogs', id); // Создаем ссылку на документ
                const docSnap = await getDoc(docRef); // Получаем документ

                if (docSnap.exists()) {
                    const data = docSnap.data();
                    setTitle(data.Title);
                    setBody(data.Body);
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
            }
        };

        fetchBlog(); // Запускаем функцию получения данных
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const docRef = doc(db, 'blogs', id);
            await updateDoc(docRef, {
                Title: title,
                Body: body,
                last_Updated: Timestamp.fromDate(new Date())
            });
            alert("Data Successfully Updated");
        } catch (error) {
            console.error("Error updating document: ", error);
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    placeholder="Title" 
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} 
                    required 
                />

                <textarea  
                    name="content" 
                    placeholder="Write your content here" 
                    rows="10" 
                    cols="150" 
                    value={body}
                    onChange={(e) => setBody(e.target.value)} 
                    required 
                />

                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default BlogEdit;
