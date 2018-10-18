import * as React from 'react';
import ProjectCard from './ProjectCard';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import autobind from 'autobind-decorator';
import { IProject } from 'common/interfaces';
import { IStudent } from '../../../common/interfaces';

interface IProjectsListProps {
    projects: Array<IProject>;
}

interface IProjectsListState {
    projects: Array<IProject>;
    students: Array<IStudent>;
}

@DragDropContext(HTML5Backend)
class ProjectsList extends React.Component<IProjectsListProps, IProjectsListState> {
    constructor(props: IProjectsListProps) {
        super(props);

        let students: IStudent[] = [];
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
            members: projectCard.members.filter((s: IStudent) =>
                s.id! !== studentInfo.id
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
            studentInfo: students.filter(student => student.id === studentId)[0],
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
                if (member.id === studentId) {
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
            <div style={{ display: 'flex', flexDirection: 'row', maxWidth: '100%', flexWrap: 'wrap', margin: 10 }}>
                {projects.map((project: IProject) =>
                    <ProjectCard
                        project={project}
                        key={project.projectId}
                        id={project.projectId}
                        moveCard={this.moveCard}
                    />
                )}
            </div>
        );
    }
}

export default ProjectsList;