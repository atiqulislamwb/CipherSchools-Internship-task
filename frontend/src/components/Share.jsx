import React, { useRef, useState } from "react";
import Modal from "react-modal";
import {
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsWhatsapp,
  BsEnvelopeAt,
} from "react-icons/bs";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-hot-toast";
const Share = ({ videoId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const inputRef = useRef(null);
  const handleShare = (app) => {
    switch (app) {
      case "facebook":
        window.open(
          `https://facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            videoId
          )}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://api.whatsapp.com/send?text=${encodeURIComponent(videoId)}`,
          "_blank"
        );
        break;
      case "email":
        window.location.href = `mailto:?subject=Check out this video!&body=${encodeURIComponent(
          videoId
        )}`;
      case "instagram":
        window.location.href = `https://www.instagram.com/?url=${encodeURIComponent(
          videoId
        )}`;
      case "twitter":
        window.location.href = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
          videoId
        )}`;
        break;
      default:
        break;
    }
    setIsOpen(false);
  };
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  const handleCopy = () => {
    inputRef.current.select();
    document.execCommand("copy");
    toast.success(`Copied`);
  };
  return (
    <div className="">
      <button onClick={() => setIsOpen(true)}>Share</button>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
        style={customStyles}
      >
        <div>
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-black text-xl font-bold ">Share this video</h2>
            <button onClick={() => setIsOpen(false)}>
              <IoMdClose color=" #000000" size="30" />
            </button>
          </div>
          <div className="p-5 mb-10 flex gap-7 sm:gap-[50px]">
            <button onClick={() => handleShare("facebook")}>
              <BsFacebook color="#3B5998" size={35} />
            </button>
            <button onClick={() => handleShare("whatsapp")}>
              <BsWhatsapp color="#25D366" size={35} />
            </button>
            <button onClick={() => handleShare("email")}>
              <BsEnvelopeAt color=" #888888" size={35} />
            </button>
            <button onClick={() => handleShare("instagram")}>
              <BsInstagram color=" #8134AF" size={35} />
            </button>
            <button className="" onClick={() => handleShare("twitter")}>
              <BsTwitter color=" #1C9CEA" size={35} />
            </button>
          </div>
          <div className="flex gap-4 border border-gray-300 rounded-lg p-3">
            <input
              className="sm:w-[400px]"
              type="text"
              value={videoId}
              readOnly
              ref={inputRef}
            />
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-xl"
              onClick={handleCopy}
            >
              Copy
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Share;
