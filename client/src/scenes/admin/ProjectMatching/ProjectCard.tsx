import * as React from 'react';
import ItemTypes from './ItemTypes';
import { DropTarget } from 'react-dnd';
import StudentCard from './StudentCard';
import {
    StudentInfo,
    Project,
} from './index';

interface IProjectCardDropTargetProps {
    moveCard: (studentId: number, newProjectId: number) => void;
}

interface IProjectCardOwnProps {
    project: any;
    key: number;
    id: any;
    connectDropTarget?: any;
}

type IProjectCardProps = IProjectCardOwnProps & IProjectCardDropTargetProps;

interface IProjectCardState {

}

const cardTarget = {
    canDrop(props: any) {
        return true;
    },

    drop(props: any, monitor: any) {
        const { student } = monitor.getItem();
        const { id: thisId } = props;
        props.moveCard(student.userId, thisId);
    },
};

function collect(connect: any, monitor: any) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
}

@DropTarget(ItemTypes.STUDENT, cardTarget, collect)
class ProjectCard extends React.Component<IProjectCardProps, IProjectCardState> {
    constructor(props: IProjectCardProps) {
        super(props);
    }

    render() {
        const { project, key, connectDropTarget } = this.props;
        return connectDropTarget(
            <tr key={key}>
                <td>{project.projectName}</td>
                <td>{project.semester}</td>
                <td>{project.minSize}</td>
                <td>{project.maxSize}</td>
                <td>
                    {project.members.map((student: StudentInfo) =>
                        <StudentCard student={student} key={student.userId} />
                    )}
                </td>
            </tr>
        );
    }
}

export default ProjectCard;