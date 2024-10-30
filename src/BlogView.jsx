import React, { useState, useEffect } from 'react';
import { useParams } from "react-router-dom";
import { db } from './firebase';
import { doc, getDoc } from "firebase/firestore"; // Импортируем нужные функции

const BlogView = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null); // Начальное значение null

    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const docRef = doc(db, 'blogs', id); // Создаем ссылку на документ
                const docSnap = await getDoc(docRef); // Получаем документ

                if (docSnap.exists()) {
                    setBlog(docSnap.data()); // Устанавливаем данные в состояние
                } else {
                    console.log("No such document!");
                }
            } catch (error) {
                console.error("Error fetching document: ", error);
            }
        };

        fetchBlog(); // Запускаем функцию получения данных
    }, [id]); // Депенденси массив для запуска при изменении id

    return (
        <div>
            <div className="w-full max-w-2xl mx-auto">
                {blog ? (
                    <>
                        <h1 className="text-2xl">
                            <span><b>Title:</b></span>
                            <span>{blog.Title}</span>
                        </h1>
                        <p><b>Body:</b></p>
                        <p>{blog.Body}</p>
                    </>
                ) : (
                    <p>Loading...</p> // Показ загрузки, пока данные не получены
                )}
            </div>            
        </div>
    );
};

export default BlogView;
