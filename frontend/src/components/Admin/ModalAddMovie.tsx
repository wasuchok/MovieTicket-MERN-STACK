import React, { ChangeEvent, ReactNode } from "react";

interface ModalType {
  isVisible: boolean;
  onClose: () => void;
  children: ReactNode;
}
const ModalAddMovie: React.FC<ModalType> = ({
  isVisible,
  onClose,
  children,
}) => {
  const handleClose = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.id == "wrapper") onClose();
  };

  if (!isVisible) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-25 backdrop-blur-sm flex justify-center items-center z-10"
      id="wrapper"
      onClick={() => handleClose}
    >
      <div className="w-[600px] flex flex-col">
        <button
          className="text-white text-xl place-self-end"
          onClick={() => onClose()}
        >
          X
        </button>
        <div className="bg-white p-2 rounded">{children}</div>
      </div>
    </div>
  );
};

export default ModalAddMovie;
