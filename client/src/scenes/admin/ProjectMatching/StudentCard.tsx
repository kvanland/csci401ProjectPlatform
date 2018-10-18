import * as React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';
import autobind from 'autobind-decorator';
import { Tooltip, HTMLTable, Position } from '@blueprintjs/core';
import { IStudent } from '../../../common/interfaces';

const style = {
    cursor: 'move',
    backgroundColor: 'lightgray',
    margin: 5,
    padding: 5,
    borderRadius: 3,
};

interface IStudentCardProps {
    student: IStudent;
    key: number;
    connectDragSource?: any;
    isDragging?: any;
}

interface IStudentCardState {
    popoverOpen: boolean;
}

const studentSource = {
    beginDrag(props: any) {
        return { student: props.student };
    },
};

function collect(connect: any, monitor: any) {
    return {
        connectDragSource: connect.dragSource(),
        isDragging: monitor.isDragging(),
    };
}

@DragSource(ItemTypes.STUDENT, studentSource, collect)
class StudentCard extends React.Component<IStudentCardProps, IStudentCardState> {
    public state: IStudentCardState = {
        popoverOpen: false,
    };

    @autobind
    showPopover() {
        this.setState({
            popoverOpen: true,
        });
    }

    @autobind
    hidePopover() {
        this.setState({
            popoverOpen: false,
        });
    }

    render() {
        const { student, key, connectDragSource, isDragging } = this.props;

        const popoverContent = (
            <div style={{ margin: '-10px -12px' }}>
                <HTMLTable striped={true} condensed={true}>
                    <tbody>
                        {student.orderedRankings.slice(0, 5).map((projectName: string, i: number) => (
                            <tr key={`${student.id}-${projectName}`}>
                                <td style={{ color: 'white' }}>{i}</td>
                                <td style={{ color: 'white' }}>{projectName}</td>
                            </tr>
                        ))}
                    </tbody>
                </HTMLTable>
            </div>
        );

        return connectDragSource(
            <tr style={{ cursor: 'move' }}>
                <Tooltip
                    content={popoverContent}
                    targetTagName="div"
                    wrapperTagName="td"
                    disabled={isDragging}
                    hoverOpenDelay={0}
                    hoverCloseDelay={0}
                    position={Position.LEFT}
                >
                    <div
                        key={key}
                        style={{
                            opacity: isDragging ? 0.5 : 1,
                            margin: -11,
                            padding: 11
                        }}
                        id={'target-' + key}
                    >
                        {student.firstName + ' ' + student.lastName}
                    </div>
                </Tooltip>
            </tr>
        );
    }
}

export default StudentCard;