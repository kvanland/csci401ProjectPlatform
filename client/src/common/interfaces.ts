export interface IJwtToken {
    auth: string; // usertype
    exp: number; // expiration
    iat: number; // creation time
    sub: string; // email
}

export interface IUser {
    id?: number;
    firstName: string;
    lastName?: string;
    email?: string;
    phone?: string;
    organization?: string;
    userType?: string;
    semester?: string;
    year?: string;
}

export interface IStudent extends IUser {
    orderedRankings: string[];
    rankings: { [key: string]: number };
}

export interface IProject {
    projectId: number;
    projectName: string;
    minSize?: string | number;
    maxSize?: string | number;
    technologies?: string;
    background?: string;
    description?: string;
    semester?: string;
    year?: string;

    adminComments?: string;
    c?: number;
    n?: number;
    sum_p?: number;
    popularity?: number;
    projSatScore?: number;
    stakeholderId?: number;
    statusId?: number;

    members: IStudent[];
}