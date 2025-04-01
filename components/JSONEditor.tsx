"use client";

import React, { useState } from "react";
import { Textarea } from "./ui/textarea"; // Assuming you have a Textarea component
import { Button } from "./ui/button";

interface JSONEditorProps {
  value: string | object | unknown[]; // Allows either a string, object, or array
  handleChange: (value: string | object | unknown[]) => void; // Handles both objects and arrays
  type: "resBody" | "reqBody"; // Type prop to check if the content is resBody
}

const JSONEditor = ({ value, handleChange, type }: JSONEditorProps) => {
  const [editedValue, setEditedValue] = useState<string>(
    JSON.stringify(value, null, 2)
  );

  // Prevent default behavior for Tab and Enter keys
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Tab") {
      e.preventDefault(); // Prevent default Tab behavior (focus shift)

      const textarea = e.currentTarget;
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;

      // Insert 4 spaces at the current cursor position
      const newValue =
        editedValue.substring(0, start) + "    " + editedValue.substring(end);

      setEditedValue(newValue);

      // Move the cursor to the right position after adding spaces
      setTimeout(() => {
        textarea.selectionStart = textarea.selectionEnd = start + 4;
      }, 0);
    }
  };

  const handleChangeHere = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setEditedValue(newValue);

    if (type === "resBody") {
      validateResBody(newValue); // Validate only when type is "resBody"
    } else {
      handleChange(newValue); // If no validation needed, just send the value
    }
  };

  // Function to validate resBody structure (status and optional data)
  const validateResBody = (jsonString: string) => {
    try {
      const parsedValue = JSON.parse(jsonString);

      // Validate that resBody has a `status` number
      if (parsedValue && typeof parsedValue.status === "number") {
        handleChange(parsedValue); // Send valid resBody to the parent
      } else {
      }
    } catch {}
  };

  const prettifyJSON = () => {
    try {
      const parsedValue = JSON.parse(editedValue); // Parse the JSON string
      const prettyValue = JSON.stringify(parsedValue, null, 4); // Prettify with 2 spaces
      setEditedValue(prettyValue); // Update the textarea with prettified JSON
      handleChange(parsedValue); // Call the parent handler with parsed JSON
    } catch {}
  };

  return (
    <div className="flex flex-col">
      <Textarea
        value={editedValue}
        onChange={handleChangeHere}
        onKeyDown={handleKeyDown} // Attach key down handler to prevent default tab behavior
        placeholder="Enter JSON here..."
        rows={5} // Set the number of rows for the textarea
        className="border p-2 w-full" // Example styles, adjust as needed
      />

      <div className="mt-2">
        <Button onClick={prettifyJSON} type="button">
          Prettify JSON
        </Button>
      </div>
    </div>
  );
};

export default JSONEditor;
