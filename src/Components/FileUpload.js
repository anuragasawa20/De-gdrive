import "./FileUpload.css";
import { useState } from "react";
import axios from "axios";



const FileUpload = ({ contract, account, provider }) => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `ae1dbe16ec1c98d32c30`,
                        pinata_secret_api_key: `31932d53f05a3a7c62d13aee1af4d2790acc30155b55c1894589102cb15babbe`,
                        "Content-Type": "multipart/form-data",
                    },
                });
                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                //const signer = contract.connect(provider.getSigner());
                const signer = contract.connect(provider.getSigner());
                signer.add(account, ImgHash);
                alert("Successfully Image Uploaded");
            } catch (e) {
                alert("Unable to upload image to Pinata");
            }
        }

        setFileName("No image selected");
        setFile(null);
    };
    const retrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        // console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };
    return (
        <div className="top">
            <form className="form" onSubmit={handleSubmit}>
                <label htmlFor="file-upload" className="choose">
                    Choose Image
                </label>
                <input
                    disabled={!account}
                    type="file"
                    id="file-upload"
                    name="data"
                    onChange={retrieveFile}
                />
                <span className="textArea">Image: {fileName}</span>
                <button type="submit" className="upload" disabled={!file}>
                    Upload File
                </button>
            </form>
        </div>
    );
};

export default FileUpload;