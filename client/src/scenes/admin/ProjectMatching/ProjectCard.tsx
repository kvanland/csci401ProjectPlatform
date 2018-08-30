import * as React from 'react';
import PropTypes from 'prop-types';
import ItemTypes from './ItemTypes';
import { DropTarget } from 'react-dnd';
import StudentCard from './StudentCard';
import {
    StudentInfo,
    Project,
} from './index';

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

interface ProjectCardProps {
    project: PropTypes.any.isRequired;
    key: PropTypes.any.isRequired;
    id: PropTypes.any.isRequired;
    canDrop?: PropTypes.bool.isRequired;
    connectDropTarget?: PropTypes.func.isRequired;
    moveCard: PropTypes.func.isRequired;
}

interface ProjectCardState {

}

@DropTarget(ItemTypes.STUDENT, cardTarget, collect)
class ProjectCard extends React.Component<ProjectCardProps, ProjectCardState> {
    constructor(props: ProjectCardProps) {
        super(props);
    
        this.state = {
        };
    }

    render() {
        const {project, key, connectDropTarget} = this.props;
        return connectDropTarget(
            <tr key={key}>
              <td>{project.projectName}</td>
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