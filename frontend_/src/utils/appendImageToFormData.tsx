import { Platform } from "react-native";

export const appendImageToFormData = async (formData: FormData, image: any) => {
    if (!image) return;

    if (typeof window !== 'undefined' && window.document) {
      if (image instanceof File) {
        formData.append('photo', image, image.name);
      } else if (typeof image === 'string' && image.startsWith('data:')) {
        const res = await fetch(image);
        const blob = await res.blob();
        const file = new File([blob], 'photo.jpg', { type: blob.type });
        formData.append('photo', file, file.name);
      } else {
        const res = await fetch(image);
        const blob = await res.blob();
        const file = new File([blob], 'photo.jpg', { type: blob.type });
        formData.append('photo', file, file.name);
      }
    } else {
      let uri = image as string;

      const originalFilename = uri.split('/').pop() || 'photo.jpg';
      const filename = originalFilename.length > 100 ? originalFilename.substring(0, 100) : originalFilename;

      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1].toLowerCase()}` : 'image/jpeg';

      if (Platform.OS === 'ios' && uri.startsWith('file://')) {
        uri = uri.substring(7);
      }

      formData.append('photo', {
        uri,
        name: filename,
        type,
      } as any);
    }
  };