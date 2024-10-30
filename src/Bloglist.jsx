import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { db } from './firebase'; // Путь к файлу конфигурации Firebase
import { collection, deleteDoc, doc, onSnapshot, query, limit } from "firebase/firestore"; 

// Получаем ссылку на коллекцию
const Blogs = collection(db, 'blogs');

const Bloglist = () => {
    const [blogslist, setBlogs] = useState([]);

    const deleteBlog = async (id) => {
        try {
            await deleteDoc(doc(db, 'blogs', id));
            alert("Document successfully deleted!");
        } catch (error) {
            console.error("Error removing document: ", error);
        }
    };

    useEffect(() => {
        // Создаем запрос с ограничением количества документов
        const q = query(Blogs, limit(100));

        // Подписка на изменения в коллекции
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            // Получаем данные всех документов с их ID
            const data = querySnapshot.docs.map(doc => ({
                ...doc.data(),
                id: doc.id,
            }));
            // Обновляем состояние
            setBlogs(data);
        });

        // Отписка при размонтировании компонента
        return unsubscribe;
    }, []);

    return (
        <div>
            <h2 className="w-full text-center font-bold text-xl">All Blogs List</h2>
            {blogslist.map(blog => (
                <div key={blog.id}>
                    <p>Title: {blog.Title}</p>
                    <p>Body: {blog.Body}</p>
                    <Link 
                        to={`/blog/${blog.id}`}
                        className="mr-2 bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-1 px-2 border border-indigo-500 rounded"
                    >
                        View
                    </Link>
                    <Link 
                        to={`/blog/edit/${blog.id}`}
                        className="mr-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 border border-blue-500 rounded"
                    >
                        Edit
                    </Link>
                    <button 
                        onClick={() => deleteBlog(blog.id)}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 border border-red-500 rounded"
                    >
                        Delete
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Bloglist;
