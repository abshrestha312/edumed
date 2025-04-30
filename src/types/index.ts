export interface University {
  id: string;
  name: string;
  location: {
    lat: number;
    lng: number;
    state: string;
  };
  ranking: number;
  courses: string[];
  tuitionRange: {
    min: number;
    max: number;
  };
}

export interface Testimonial {
  id: string;
  studentName: string;
  university: string;
  course: string;
  year: number;
  content: string;
  imageUrl: string;
}

export interface FAQ {
  id: string;
  category: 'admissions' | 'visa' | 'post-arrival';
  question: string;
  answer: string;
}

export interface ApplicationStatus {
  id: string;
  university: string;
  status: 'pending' | 'submitted' | 'under-review' | 'accepted' | 'rejected';
  nextSteps: string[];
  documents: {
    name: string;
    status: 'pending' | 'submitted' | 'approved' | 'rejected';
  }[];
}