interface Ocurrence {
    id: string,
    title: string,
    description: string,
    location: {
        lat: number,
        lng: number,
    },
    dateTime: string,
    status: boolean,
    userId: string,
    Images: {
        id: string,
        path: string;
    }[]
}

export default Ocurrence;