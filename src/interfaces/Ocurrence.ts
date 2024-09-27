interface Ocurrence {
  id: string;
  title: string;
  description: string;
  location: {
    lat: number;
    lng: number;
  };
  dateTime: string;
  status: boolean;
  userId: string;
  images: {
    id: string;
    path: string;
    occurrenceId: string;
  }[];
}

export default Ocurrence;
