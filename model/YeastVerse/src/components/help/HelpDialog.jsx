import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '../ui/card';
const HelpDialog = ({ title, content, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <Card className="w-11/12 max-w-2xl">
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>{title}</span>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          {content}
        </CardContent>
      </Card>
    </div>
  );
};
export default HelpDialog;