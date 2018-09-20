export interface IUser {
    id?: number;
    firstName: string;
    lastName?: string;
    email?: string;
    phone?: string;
    organization?: string;
}

export interface IProject {
    projectId: number;
    projectName: string;
    minSize: string;
    technologies: string;
    background: string;
    description: string;
}