import React, { useState } from 'react';
import HelpDialog from './HelpDialog';
const HelpButton = ({ title, content }) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const openDialog = () => setIsDialogOpen(true);
  const closeDialog = () => setIsDialogOpen(false);
  return (
    <>
      <button onClick={openDialog} className="absolute top-4 right-4 bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center z-40">
        ?
      </button>
      {isDialogOpen && <HelpDialog title={title} content={content} onClose={closeDialog} />}
    </>
  );
};
export default HelpButton;