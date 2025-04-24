import React from "react";

const Alert = () => {
  return (
    <div>
      <div
        class="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-600 dark:text-red-400"
        role="alert"
      >
        <span class="font-medium">Alert!</span> You are not accpet friend
        request
      </div>
    </div>
  );
};

export default Alert;
