import React, { useState, useEffect } from "react";
import "./DropdownButton.css";

function DropdownButton({ onEdit, onDelete }) {
  const [showMenu, setShowMenu] = useState(false);

  const handleEdit = () => {
    onEdit();
    setShowMenu(false); // Close menu after edit
  };

  const handleDelete = () => {
    onDelete();
    setShowMenu(false); // Close menu after delete
  };

  const handleKeyDown = (e) => {
    if (e.key === "Escape") {
      setShowMenu(false); // Close menu on Esc
    }
  };

  const toggleMenu = () => setShowMenu(!showMenu);

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("keydown", handleKeyDown);
    } else {
      document.removeEventListener("keydown", handleKeyDown);
    }

    // Cleanup listener on unmount
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [showMenu]);

  return (
    <div className="dropdown">
      <button className="dropdown-button" onClick={toggleMenu}>
        &#x22EE; {/* Vertical ellipsis */}
      </button>
      {showMenu && (
        <div className="dropdown-menu">
          <button className="dropdown-item" onClick={handleEdit}>
            Edit
          </button>
          <hr className="dropdown-divider" />
          <button className="dropdown-item delete" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </div>
  );
}

export default DropdownButton;
