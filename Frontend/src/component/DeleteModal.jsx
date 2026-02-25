"use client";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import "./Modal.css";

const Delete = ({ open, onConfirm, onCancel, itemName = "item" }) => {
  const handleDelete = () => {
    onConfirm(); // actual deletion logic from parent
    onCancel(); // close modal immediately
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="modal-overlay"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}>
          <motion.div
            className="modal-content"
            initial={{ scale: 0.8, opacity: 0, x: "-50%", y: "-50%" }}
            animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
            exit={{ scale: 0.8, opacity: 0, x: "-50%", y: "-50%" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}>
            {/* <div className="modal-image">
              <img src="/assets/trash-can.gif" alt="Trash Can Animation" />
            </div> */}
            <div className="modal-title">
              Do you really want to delete this {itemName}?
            </div>
            <div className="modal-actions">
              <button
                className="modal-btn modal-btn-danger"
                onClick={handleDelete}>
                Yes
              </button>
              <button
                className="modal-btn modal-btn-primary"
                onClick={onCancel}>
                No
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Delete;
