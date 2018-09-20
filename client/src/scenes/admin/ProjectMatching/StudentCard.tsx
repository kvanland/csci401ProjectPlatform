import * as React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';
import autobind from 'autobind-decorator';
import {
    StudentInfo,
} from './index';
import { Popover } from '@blueprintjs/core';

const style = {
    cursor: 'move',
    backgroundColor: 'lightgray',
    margin: 5,
    padding: 5,
    borderRadius: 3,
};

interface IStudentCardProps {
    student: StudentInfo;
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
            <div style={{ padding: 20 }}>
                <h2>Rankings</h2>
                <ol>
                    <li>{student.orderedRankings[0]}</li>
                    <li>{student.orderedRankings[1]}</li>
                    <li>{student.orderedRankings[2]}</li>
                    <li>{student.orderedRankings[3]}</li>
                    <li>{student.orderedRankings[4]}</li>
                </ol>
            </div>
        );

        return connectDragSource(
            <div style={{ width: '100%' }}>
                <Popover
                    interactionKind="hover"
                    content={popoverContent}
                    targetTagName="div"
                >
                    <div
                        key={key}
                        style={{
                            ...style,
                            opacity: isDragging ? 0.5 : 1,
                        }}
                        id={'target-' + key}
                        onMouseOver={this.showPopover}
                        onMouseOut={this.hidePopover}
                    >
                        {student.firstName + ' ' + student.lastName}
                    </div>
                </Popover>
            </div>
        );
    }
}

export default StudentCard;