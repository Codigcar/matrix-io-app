
export interface IData {
    last_user: number;
    publications: IPublication[];
}

export interface IPublication {
    userId: number;
    id:     number;
    title:  string;
    body:   string;
}
