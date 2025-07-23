import { useState } from "react";

const CvUpload = () =>{
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [cvContent, setCvContent] = useState<string | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) =>{
        const file = e.target.files?.[0];
        if(file){
            setSelectedFile(file)
            console.log(selectedFile)
        }
    }
    const handleUpload = () =>{
        if(selectedFile){
            const formData = new FormData();
            formData.append('file', selectedFile);
            fetch('http://localhost:5162/api/cvupload',{
                method:'POST',
                body: formData
            })
            .then((res)=>res.json())
            .then((data)=>setCvContent(data.content))
            .catch((err)=>console.log(err))
        }
    }
    return(
        <>
            <h1>Upload your CV</h1>
            <input type="file" onChange={handleFileChange} />
            <button onClick={handleUpload}>Upload</button>
            <div>
                <h2>CV Content</h2>
                <p>{cvContent}</p>
            </div>
        </>
    )
}

export default CvUpload;