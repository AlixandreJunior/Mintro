import { appendImageToFormData } from '@/share/utils/appendImageToFormData';

export const buildFormData = async (form: {
  title: string;
  notes: string;
  selectedDate: Date;
  selectedTime: Date;
  selectedMoodId: string;
  selectedActivitiesIds: string[];
  selectedImageUri: string | null;
}) => {
  const formData = new FormData();
  formData.append('title', form.title);
  formData.append('content', form.notes);
  formData.append(
    'datetime',
    getCombinedDateTime(form.selectedDate, form.selectedTime).toISOString()
  );
  formData.append('mood', form.selectedMoodId);
  form.selectedActivitiesIds.forEach((id) => formData.append('activity', id));
  await appendImageToFormData(formData, form.selectedImageUri);
  return formData;
};
