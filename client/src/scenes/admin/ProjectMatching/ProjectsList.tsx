import * as React from 'react';
import ProjectCard from './ProjectCard';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import autobind from 'autobind-decorator';
import {
    StudentInfo,
    Project,
} from './index';
import { HTMLTable } from '@blueprintjs/core';

const style = {
    width: 1000,
    float: 'none',
    margin: 'auto',
};

interface IProjectsListProps {
    projects: Array<Project>;
}

interface IProjectsListState {
    projects: Array<Project>;
    students: Array<StudentInfo>;
}

@DragDropContext(HTML5Backend)
class ProjectsList extends React.Component<IProjectsListProps, IProjectsListState> {
    constructor(props: IProjectsListProps) {
        super(props);

        let students: StudentInfo[] = [];
        props.projects.forEach(project => {
            project.members.forEach(student => {
                students.push(student);
            });
        });

        this.state = {
            projects: props.projects,
            students: students
        };
    }

    @autobind
    moveCard(studentId: number, newProjectId: number) {
        const { projects } = this.state;

        // find and remove student from former project
        const { studentInfo, projectCard, index, error } = this.findOldProjectCard(studentId);

        if (error !== 0) {
            // couldn't find student or project
            return;
        }

        if (projectCard.projectId === newProjectId) {
            // dropping into same project
            return;
        }

        const updatedOldProjectCard = {
            projectId: projectCard.projectId,
            projectName: projectCard.projectName,
            // semester: projectCard.semester,
            minSize: projectCard.minSize,
            maxSize: projectCard.maxSize,
            members: projectCard.members.filter((s: StudentInfo) =>
                s.userId !== studentInfo.userId
            )
        };
        let newProjects = projects;
        newProjects.splice(index, 1, updatedOldProjectCard);

        // find and add student to new project
        const newProjectResult = this.findCard(newProjectId);
        const newProjectCard = newProjectResult.projectCard;
        newProjectCard.members = newProjectCard.members.concat(studentInfo);
        newProjects.splice(newProjectResult.index, 1, newProjectCard);

        this.setState({ projects: newProjects });
    }

    @autobind
    findOldProjectCard(studentId: number) {
        const { projects, students } = this.state;
        const { projectCard, error } = this.findProjectByStudent(studentId);

        return {
            projectCard,
            index: projects.indexOf(projectCard),
            studentInfo: students.filter(student => student.userId === studentId)[0],
            error
        };
    }

    @autobind
    findProjectByStudent(studentId: number) {
        const { projects } = this.state;
        let projectCard = projects[0];
        let error = 1;
        projects.forEach(project => {
            project.members.forEach(member => {
                if (member.userId === studentId) {
                    projectCard = project;
                    error = 0;
                }
            });
        });

        return {
            projectCard,
            error
        };
    }

    @autobind
    findCard(projectId: number) {
        const { projects } = this.state;
        const projectCard = projects.filter(project => project.projectId === projectId)[0];

        return {
            projectCard,
            index: projects.indexOf(projectCard),
        };
    }

    render() {
        const { projects } = this.state;
        return (
            <HTMLTable bordered={true} striped={true} style={{ width: '100%' }}>
                <thead>
                    <tr>
                        <th>Project Name</th>
                        <th>Semester</th>
                        <th>Min Size</th>
                        <th>Max Size</th>
                        <th>Members</th>
                    </tr>
                </thead>
                <tbody>
                    {projects.map((project: Project) =>
                        <ProjectCard
                            project={project}
                            key={project.projectId}
                            id={project.projectId}
                            moveCard={this.moveCard}
                        />
                    )}
                </tbody>
            </HTMLTable>
        );
    }
}

export default ProjectsList;