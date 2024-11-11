// import { CLOUDINARY_NAME } from '@env';
import axios from "axios";

interface CloudinaryResponse {
    secure_url: string;
    public_id: string;
}

// Define the expected image type
interface ImageAsset {
    uri: string;
    type?: string;
    name?: string;
}
const CLOUDINARY_NAME = "dlbflgtdr"

const uploadImage = async (image: ImageAsset): Promise<CloudinaryResponse> => {
    if (!CLOUDINARY_NAME) {
        throw new Error('CLOUDINARY_NAME is not defined in environment variables');
    }

    try {
        const cloudinaryUrl = `https://api.cloudinary.com/v1_1/${CLOUDINARY_NAME}/image/upload`;

        const formData = new FormData();

        const localUri = image.uri;
        const filename = localUri.split('/').pop() || 'image';

        const match = /\.(\w+)$/.exec(filename);
        const type = match ? `image/${match[1]}` : 'image/jpeg';

        formData.append('file', {
            uri: localUri,
            name: filename,
            type,   
        } as any);
        formData.append("upload_preset", "native_ecomm");

        const response = await axios.post<CloudinaryResponse>(cloudinaryUrl, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            },
        });

        return response.data;
    } catch (error) {
        console.error("Error uploading image:", error);
        throw new Error("Failed to upload image");
    }
};

export default uploadImage;