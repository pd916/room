"use client"
import { X } from 'lucide-react'
import Image from 'next/image'
import { useDropzone } from "react-dropzone";
import React, { useCallback, useEffect, useState } from 'react'

interface FileUploadProps {
    onChange: (url?:string) => void
    value: File;
    // endpoint: "profileImage"
}

const FileUpload = ({
    onChange,
    value,
    // endpoint
}:FileUploadProps) => {
    // const fileType = value.split(".").pop();
     const [previewUrl, setPreviewUrl] = useState<string>("");

  const onDrop = useCallback((acceptedFiles: File[]) => {
      const file = acceptedFiles[0];
      if (!file) return;

      const localUrl = URL.createObjectURL(file);
      setPreviewUrl(localUrl);
      onChange(localUrl); // Send the file to parent
    },
    [onChange]);

    useEffect(() => {
      // Cleanup preview URL on unmount
      if (value) {
    const objectUrl = URL.createObjectURL(value);
    setPreviewUrl(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  } else {
    setPreviewUrl(""); // reset preview
  }
  }, [value]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone ({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
  });

   if (previewUrl) {
    return (
      <div className="relative h-20 w-20">
        <Image
          src={previewUrl}
          fill
          alt="Preview"
          className="rounded-full object-cover"
        />
        <button
          onClick={() => {
            setPreviewUrl("");
            onChange(undefined);
          }}
          className="bg-rose-500 text-white p-1 rounded-full absolute top-0 right-0 shadow-sm"
          type="button"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
    );
  }
  return (
     <div
      {...getRootProps()}
      className="border border-dashed border-gray-300 p-4 text-center cursor-pointer rounded-md"
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the image here ...</p>
      ) : (
        <p>Drag & drop image here, or click to upload</p>
      )}
    </div>
  )
}

export default FileUpload
