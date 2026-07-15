import React, { useEffect, useState } from "react";
import { getFirestore, collection, onSnapshot, orderBy, query } from "firebase/firestore";

const BoxGallery = () => {
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        const db = getFirestore();
        const q = query(collection(db, "GambarAman"), orderBy("createdAt", "desc"));

        const unsubscribe = onSnapshot(
            q,
            (querySnapshot) => {
                const imageList = [];
                querySnapshot.forEach((doc) => {
                    const data = doc.data();
                    if (data.imageUrl) {
                        imageList.push({
                            id: doc.id,
                            url: data.imageUrl,
                            timestamp: data.createdAt ? data.createdAt.toDate() : new Date(),
                        });
                    }
                });
                setImages(imageList);
                setLoading(false);
            },
            (error) => {
                console.error("Error fetching gallery:", error);
                setLoading(false);
            }
        );

        return () => unsubscribe();
    }, []);

   // ... bagian import tetap sama
    return (
        <div id="BoxGallery" className="p-4 bg-[#1e1e1e] rounded-xl border border-gray-800 shadow-md">
            <div className="flex justify-between items-center mb-3">
                <img src="/upload.png" alt="Upload Icon" width="40" height="40" className="w-auto h-10" />
                <img src="/next.png" alt="Next" width="20" height="20" className="h-5 w-5 cursor-pointer" />
            </div>

            <h2 className="text-white text-xl pr-3 font-semibold mb-4">Class Gallery</h2>

            {loading ? (
                <div className="text-gray-500 text-sm">Loading memories...</div>
            ) : (
                <div className="grid grid-cols-2 gap-2 max-h-[15rem] overflow-y-auto">
                    {images.map((image) => (
                        <div key={image.id} className="relative aspect-square w-full overflow-hidden rounded-lg bg-black">
                            <img
                                src={image.url}
                                alt="Kenangan kelas"
                                width="150"
                                height="150"
                                className="w-full h-full object-cover"
                                loading="lazy"
                            />
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BoxGallery