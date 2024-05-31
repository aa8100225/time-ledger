"use client";

import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  Textarea,
  useDisclosure,
} from "@nextui-org/react";
import { ChangeEvent, useEffect, useRef, useState } from "react";
import { IoCloseCircleSharp } from "react-icons/io5";
import { isStringEmpty } from "@/utils/stringUtils";
import { ToastType, showToast } from "@/helper/toastHelper";
import NextImage from "next/image";

type Base64Image = {
  id: string;
  imageSrc: string;
  width: number;
  height: number;
  format: string;
};

const srcRegex = /src="(.*?)"/;
const base64Regex = /^data:image\/[^;]+;base64,[A-Za-z0-9+/]+={0,2}$/i;
const base64ImageFormatRegex = /^data:image\/(png|jpeg|jpg|webp);base64,/;

const sanitizeFileName = (fileName: string) => {
  const invalidCharsRegex = /[<>:"\/\\|?*\x00-\x1F]/g;
  return fileName.replace(invalidCharsRegex, "_");
};

const MAX_IMAGE_NUMBER = 6;

export default function Page() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const endOfImagesRef = useRef<HTMLDivElement>(null);

  const [base64Input, setBase64Input] = useState("");
  const [images, setImages] = useState<Base64Image[]>([]);
  const [selectedImage, setSelectedImage] = useState(-1);
  const prevImagesLength = useRef<number>(images.length);

  const handleBase64InputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setBase64Input(e.target.value);
  };

  const clearInput = () => {
    setBase64Input("");
  };

  const extractBase64 = (inputText: string) => {
    if (isStringEmpty(inputText)) {
      throw new Error("Input is empty");
    }
    inputText = inputText.trim();
    const srcMatches = inputText.match(srcRegex);
    const imageURL =
      srcMatches && srcMatches.length > 1 ? srcMatches[1] : inputText;
    if (!base64Regex.test(imageURL)) {
      throw new Error("Invalid input");
    }
    return imageURL;
  };

  const getImageSizeFromBase64 = (base64Image: string) => {
    return new Promise<{ width: number; height: number }>((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({ width: img.width, height: img.height });
        URL.revokeObjectURL(img.src);
      };
      img.onerror = (error) => {
        reject(error);
      };
      img.src = base64Image;
    });
  };

  const getImageFormatFromBase64 = (base64Image: string) => {
    const formatMatch = base64Image.match(base64ImageFormatRegex);
    return !formatMatch ? "png" : formatMatch[1];
  };

  const handleAddImage = async () => {
    try {
      const imageURL = extractBase64(base64Input);
      const { width, height } = await getImageSizeFromBase64(imageURL);
      const format = getImageFormatFromBase64(imageURL);
      const newImage = {
        id: crypto.randomUUID(),
        imageSrc: imageURL,
        width,
        height,
        format,
      };
      setImages((prevImages) => {
        if (prevImages.length >= MAX_IMAGE_NUMBER) {
          return [...prevImages.slice(1), newImage];
        }
        return [...prevImages, newImage];
      });
      clearInput();
    } catch (e: any) {
      showToast(ToastType.Error, e?.message || "Unknown error");
    }
  };

  const handleDeleteImage = (id: string) => {
    setImages(images.filter((image) => image.id !== id));
  };

  useEffect(() => {
    if (images.length > prevImagesLength.current && endOfImagesRef.current) {
      endOfImagesRef.current.scrollIntoView({ behavior: "smooth" });
    }
    prevImagesLength.current = images.length;
  }, [images]);

  const handleImageClick = (index: number) => {
    setSelectedImage(index);
    onOpen();
  };

  const downloadImage = (image: Base64Image) => {
    const link = document.createElement("a");
    link.href = image.imageSrc;
    link.download =
      sanitizeFileName(image.id.split("-")[0]) + `.${image.format}`;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const onModalClose = () => {
    setSelectedImage(-1);
  };

  return (
    <>
      <div className="flex h-full w-full flex-grow flex-col">
        <div className="flex  h-full w-full flex-grow flex-col  items-center bg-pink-100  p-4 shadow-md">
          <div className="w-4/5 flex-grow overflow-auto rounded-lg bg-pink-100 p-4">
            <div className="flex items-center space-x-3">
              {images.map((image, index) => (
                <div
                  key={image.id}
                  className="relative h-60 w-48 flex-shrink-0 rounded-lg bg-pink-200 shadow-md"
                >
                  <NextImage
                    className="h-full w-full cursor-pointer rounded-lg object-cover"
                    onClick={() => handleImageClick(index)}
                    fill
                    alt={`image-${index}`}
                    src={image.imageSrc}
                  />
                  <Button
                    onClick={() => handleDeleteImage(image.id)}
                    variant="light"
                    className="absolute right-1 top-1 z-10 h-6 w-6 min-w-0 bg-white p-0"
                  >
                    <IoCloseCircleSharp className="h-6 w-6 text-red-600" />
                  </Button>
                  <Button
                    onClick={() => downloadImage(image)}
                    className="absolute bottom-1 left-1 right-1 h-5 w-auto rounded-lg bg-blue-500 text-white"
                  >
                    Download
                  </Button>
                </div>
              ))}
              <div ref={endOfImagesRef}></div>
            </div>
          </div>
          <div className="mt-4 text-center text-sm text-gray-600">
            After exceeding {MAX_IMAGE_NUMBER} images, the first image will be
            automatically replaced.
          </div>
        </div>
        <div className="h-2/5 rounded-lg bg-gray-100 p-4 shadow-md">
          <div className="flex h-full items-center justify-between">
            <Button
              onClick={handleAddImage}
              className="rounded-lg bg-pink-400 px-4 py-2 text-white transition-colors hover:bg-pink-600"
            >
              Convert
            </Button>
            <Textarea
              value={base64Input}
              size="lg"
              variant="bordered"
              onChange={handleBase64InputChange}
              disableAutosize
              classNames={{
                inputWrapper: ["shadow-lg", "bg-orange-50"],
              }}
              placeholder={"Enter Base64"}
              className="mx-4"
            />
            <Button
              onClick={clearInput}
              className="rounded-lg bg-red-400 px-4 py-2 text-white transition-colors hover:bg-red-600"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={onModalClose}
        closeButton
      >
        <ModalContent className="h-5/6 min-w-[80vw] overflow-auto p-4">
          {(onClose) => (
            <>
              <ModalBody>
                <div className="mx-2 my-auto">
                  {0 <= selectedImage && selectedImage < images.length && (
                    <NextImage
                      alt={`image-${selectedImage}`}
                      src={images[selectedImage].imageSrc}
                      width={images[selectedImage].width}
                      height={images[selectedImage].height}
                    />
                  )}
                </div>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
