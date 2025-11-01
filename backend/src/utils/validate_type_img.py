from django.core.exceptions import ValidationError
from django.core.files.uploadedfile import UploadedFile


def validate_image_type(image: UploadedFile) -> None:
    valid_mime_types = ["image/jpeg", "image/png", "image/jpg"]
    file_mime_type = image.content_type

    if file_mime_type not in valid_mime_types:
        msg = "Envie um arquivo de imagem válido (PNG ou JPEG)."

        raise ValidationError(msg) from None
