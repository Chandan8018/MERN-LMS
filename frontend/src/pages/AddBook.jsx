import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase.js";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { useNavigate } from "react-router-dom";
import "./AddBook.css";
export default function AddBook() {
  const [file, setFile] = useState(null);
  const [imageUploadProgress, setImageUploadProgress] = useState(null);
  const [imageUploadError, setImageUploadError] = useState(null);
  const [formData, setFormData] = useState({});
  const [publishError, setPublishError] = useState(null);
  const navigate = useNavigate();

  const handleUploadImage = async () => {
    try {
      if (!file) {
        setImageUploadError("Please select an image");
        return;
      }
      setImageUploadError(null);
      const storage = getStorage(app);
      const fileName = new Date().getTime() + "-" + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageUploadProgress(progress.toFixed(0));
        },
        (error) => {
          setImageUploadError("Image upload failed");
          setImageUploadProgress(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageUploadProgress(null);
            setImageUploadError(null);
            setFormData({ ...formData, image: downloadURL });
          });
        }
      );
    } catch (error) {
      setImageUploadError("Image upload failed");
      setImageUploadProgress(null);
      console.log(error);
    }
  };
  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/post/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (!res.ok) {
        setPublishError(data.message);
        return;
      }

      if (res.ok) {
        setPublishError(null);
        navigate(`/book-post/${data.slug}`);
      }
    } catch (error) {
      setPublishError("Something went wrong last", error);
    }
  };

  return (
    <div className=' p-3 pr-40 max-w-4xl mx-auto md:flex-row md:items-center gap-5'>
      <h1 className='text-3xl font-bold text-center my-7 dark:text-white'>
        Add a new book
      </h1>
      <form className='flex flex-col gap-4' onSubmit={handleUploadSubmit}>
        <div className='flex flex-col gap-4 sm:flex-row justify-between'>
          <TextInput
            id='title'
            type='text'
            placeholder='Book name'
            required
            className='flex-1 font-bold'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
          />
          <TextInput
            id='qty'
            type='number'
            placeholder='Quantity'
            min={1}
            max={100}
            onChange={(e) => setFormData({ ...formData, qty: e.target.value })}
          />
          <Select
            onChange={(e) => {
              console.log(e.target.value);
              setFormData({ ...formData, category: e.target.value });
            }}
          >
            <option value='uncategorized'>Select a catagory</option>
            <option value='Health'>Health</option>
            <option value='Technology'>Technology</option>
            <option value='Business'>Business</option>
            <option value='Sports'>Sports</option>
            <option value='Science'>Science</option>
            <option value='History'>History</option>
            <option value='Entertainment'>Entertainment</option>
            <option value='Other'>Other</option>
          </Select>
        </div>
        <div className='flex gap-4 items-center justify-between border-4 rounded-md border-teal-500 border-dotted p-5'>
          <FileInput
            type='file'
            accept='image/*'
            onChange={(e) => setFile(e.target.files[0])}
          />
          <Button
            type='button'
            gradientDuoTone='pinkToOrange'
            size='sm'
            outline
            className='hover:bg-gradient-to-r from-purple-900 via-slate-400 to-blue-600'
            onClick={handleUploadImage}
            disabled={imageUploadProgress}
          >
            {imageUploadProgress ? (
              <div className='w-16 h-16'>
                <CircularProgressbar
                  value={imageUploadProgress}
                  text={`${imageUploadProgress || 0}%`}
                  strokeWidth={50}
                  styles={buildStyles({
                    strokeLinecap: "butt",
                  })}
                />
              </div>
            ) : (
              "Upload Image"
            )}
          </Button>
        </div>

        {imageUploadError && (
          <Alert color='failure'> {imageUploadError} </Alert>
        )}

        {formData.image && (
          <img
            src={formData.image}
            alt='uploaded image'
            className='w-full h-56 object-cover'
          />
        )}

        <ReactQuill
          theme='snow'
          placeholder='Empty space is so boring... go on and write something...'
          className=' dark:bg-[#1F2937] dark:text-white'
          required
          onChange={(e) => setFormData({ ...formData, content: e })}
        />

        <Button
          type='submit'
          gradientDuoTone='pinkToOrange'
          className='my-10 hover:bg-gradient-to-r from-purple-900 via-slate-400 to-blue-600'
        >
          Publish
        </Button>
        {publishError && (
          <Alert className='my-5' color='failure'>
            {publishError}
          </Alert>
        )}
      </form>
    </div>
  );
}
