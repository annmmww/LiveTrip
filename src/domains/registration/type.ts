export interface FormValues {
  title: string;
  category: string;
  description: string;
  address: string;
  price: string;
  bannerImage: string;
  subImageUrls: string[];
  timeSlots: {
    date: string;
    startTime: string;
    endTime: string;
  }[];
}

export interface TimeSlot {
  id: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface UploadedImage {
  id: string;
  src: string;
}
