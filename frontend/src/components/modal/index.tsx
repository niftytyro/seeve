import React from "react";

interface ModalProps {
  title: string;
  isOpen: boolean;
  closeModal: () => void;
  onSave: () => void;
}

const Modal: React.FC<ModalProps> = ({
  children,
  title,
  isOpen,
  closeModal,
  onSave,
}) => {
  if (isOpen)
    return (
      <div className="absolute left-0 top-0 w-full h-full transition-all">
        <div className="absolute w-full h-full bg-gray-800 opacity-20" />
        <div className="flex justify-center items-center absolute w-full h-full">
          <div className="flex flex-col w-1/2 p-8 bg-white shadow-md transition-all">
            <div className="flex justify-between mb-4 text-2xl font-medium">
              <div>{title}</div>
              <div onClick={closeModal} className="cursor-pointer">
                &#10005;
              </div>
            </div>
            {children}
            <button
              onClick={onSave}
              className="self-end px-6 py-2 mt-4 bg-black text-white rounded-md focus:outline-none"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    );
  return <div></div>;
};

export default Modal;
