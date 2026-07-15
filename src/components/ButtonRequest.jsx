import React, { useEffect, useState } from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import { useSpring, animated } from "@react-spring/web";
import CloseIcon from "@mui/icons-material/Close";
import { getFirestore, collection, onSnapshot, orderBy, query } from "firebase/firestore";

export default function ButtonRequest() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fade = useSpring({
    opacity: open ? 1 : 0,
    config: { duration: 200 },
  });

  const [images, setImages] = useState([]);
  useEffect(() => {
    if (!open) return;

    const db = getFirestore();
    const q = query(collection(db, "GambarAman"), orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const imageURLs = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          if (data.imageUrl) {
            imageURLs.push({
              url: data.imageUrl,
              timestamp: data.createdAt ? data.createdAt.toDate() : new Date(),
            });
          }
        });
        setImages(imageURLs);
      },
      (error) => {
        console.error("Error fetching images from Firestore:", error);
      }
    );

    return () => unsubscribe();
  }, [open]);

  return (
    <div>
      <button
        onClick={handleOpen}
        className="flex items-center space-x-2 text-white px-6 py-4"
        id="SendRequest">
        <img src="/Request.webp" alt="Icon" className="w-6 h-6 relative bottom-1" />
        <span className="text-base">Request</span>
      </button>

      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{ timeout: 500 }}>
        <animated.div style={fade}>
          <Box className="modal-container p-4 sm:p-6">
            <CloseIcon
              style={{ position: "absolute", top: "10px", right: "10px", cursor: "pointer", color: "grey" }}
              onClick={handleClose}
            />
            <Typography id="spring-modal-description" sx={{ mt: 2 }}>
              <h6 className="text-center text-white text-2xl mb-5">Request</h6>
              <div className="max-h-[22rem] overflow-y-auto overflow-x-hidden overflow-y-scroll-no-thumb">
                {images.length === 0 ? (
                  <div className="text-center text-gray-400 text-sm mt-10">
                    Belum ada data gambar di database.
                  </div>
                ) : (
                  images
                    .map((imageData, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between gap-3 px-2 py-2 mt-2"
                        id="LayoutIsiButtonRequest">
                        <img
                          src={imageData.url}
                          alt={`Image ${index}`}
                          className="h-12 w-12 flex-shrink-0 object-cover rounded"
                          loading="lazy"
                          onError={(e) => {
                            e.target.src = "https://placehold.co/100x100?text=Error";
                          }}
                        />
                        <span className="text-white text-xs leading-relaxed break-all">
                          {new Date(imageData.timestamp).toLocaleString("id-ID")}
                        </span>
                      </div>
                    ))
                    .reverse()
                )}
              </div>
              <div className="text-white text-[0.7rem] mt-5">
                Note : Jika tidak ada gambar yang sudah anda upload silahkan reload
              </div>
            </Typography>
          </Box>
        </animated.div>
      </Modal>
    </div>
  );
}