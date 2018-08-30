import * as React from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';
import {
    StudentInfo,
} from './index';
import {
    Popover,
    OverlayTrigger
} from 'react-bootstrap';

const style = {
    cursor: 'move',
    backgroundColor: 'lightgray',
    margin: 5,
    padding: 5
};

interface StudentCardProps {
    student: StudentInfo;
    key: number;
    connectDragSource?: PropTypes.func.isRequired;
    isDragging?: PropTypes.bool.isRequired;
}

interface StudentCardState {

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
class StudentCard extends React.Component<StudentCardProps, StudentCardState> {
    constructor(props: StudentCardProps) {
        super(props);
    
        this.state = {
        };
    }

    render() {
        const {student, key, connectDragSource, isDragging} = this.props;

        const rankingDetails = (
            <Popover id="popover-positioned-left" title="Rankings">
                <p>{'1. ' + student.orderedRankings[0]}</p>
                <p>{'2. ' + student.orderedRankings[1]}</p>
                <p>{'3. ' + student.orderedRankings[2]}</p>
                <p>{'4. ' + student.orderedRankings[3]}</p>
                <p>{'5. ' + student.orderedRankings[4]}</p>
            </Popover>
        );

        return connectDragSource(
            <div>
                <OverlayTrigger trigger={['hover', 'focus']} placement="left" overlay={rankingDetails}>
                    <div 
                        key={key} 
                        style={{
                            ...style,
                            opacity: isDragging ? 0.5 : 1,
                        }}
                    >
                        {student.firstName + ' ' + student.lastName}
                    </div>
                </OverlayTrigger>
            </div>
        );
    }
}

export default StudentCard;