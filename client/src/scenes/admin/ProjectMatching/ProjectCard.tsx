import * as React from 'react';
import ItemTypes from './ItemTypes';
import { DropTarget, DropTargetSpec, DropTargetConnector, DropTargetMonitor, ConnectDropTarget } from 'react-dnd';
import StudentCard from './StudentCard';
import { Card, HTMLTable } from '@blueprintjs/core';
import { IProject } from 'common/interfaces';
import { IStudent } from '../../../common/interfaces';

interface IProjectCardDropTargetProps {
    moveCard: (studentId: number, newProjectId: number) => void;
}

interface IProjectCardOwnProps {
    project: IProject;
    key: number;
    id: any;
    connectDropTarget?: ConnectDropTarget;
    isOver?: boolean;
}

type IProjectCardProps = IProjectCardOwnProps & IProjectCardDropTargetProps;

interface IProjectCardState {

}

const cardTarget: DropTargetSpec<IProjectCardProps> = {
    canDrop(props: IProjectCardProps) {
        return true;
    },

    drop(props: IProjectCardProps, monitor: any) {
        const { student } = monitor.getItem();
        const { id: thisId } = props;
        props.moveCard(student.userId, thisId);
    },
};

function collect(connect: DropTargetConnector, monitor: DropTargetMonitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver(),
    };
}

@DropTarget(ItemTypes.STUDENT, cardTarget, collect)
class ProjectCard extends React.Component<IProjectCardProps, IProjectCardState> {
    render() {
        const { project, key, connectDropTarget, isOver } = this.props;
        // console.log(project);
        if (connectDropTarget === undefined) {
            return undefined;
        }
        const students = project.members.sort((a: IStudent, b: IStudent) => {
            const aName = (a.lastName || '').concat(a.firstName || '');
            const bName = (b.lastName || '').concat(b.firstName || '');
            return aName.localeCompare(bName);
        });
        return connectDropTarget(
            <div style={{ width: `${100.0 / 4}%`, padding: 10 }} key={key}>
                <Card style={{ padding: 0, height: '100%', boxShadow: isOver ? '0 0 0 1px #137cbd, 0 0 0 3px rgba(19,124,189,.3), inset 0 1px 1px rgba(16,22,26,.2)' : undefined }}>
                    <div style={{ padding: 10 }}>
                        <h3 style={{ margin: 0, wordBreak: 'break-all' }}>{project.projectName}</h3>
                        <div>{project.minSize} — {project.maxSize} Students</div>
                    </div>
                    <HTMLTable style={{ width: '100%' }} striped={true}>
                        <tbody>
                            {students.map((student: IStudent) =>
                                <StudentCard student={student} key={student.id!} />
                            )}
                        </tbody>
                    </HTMLTable>
                </Card>
            </div>
        );
    }
}

export default ProjectCard;