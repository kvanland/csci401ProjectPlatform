import * as React from 'react';
import { DragSource } from 'react-dnd';
import ItemTypes from './ItemTypes';
import autobind from 'autobind-decorator';
import {
    StudentInfo,
} from './index';
import {
    Popover,
    PopoverHeader,
    PopoverBody
} from 'reactstrap';

const style = {
    cursor: 'move',
    backgroundColor: 'lightgray',
    margin: 5,
    padding: 5
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

        return connectDragSource(
            <div>
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
                <Popover id="popover-positioned-left" placement="left" target={'target-' + key} isOpen={this.state.popoverOpen}>
                    <PopoverHeader>Rankings</PopoverHeader>
                    <PopoverBody>
                        <p>{'1. ' + student.orderedRankings[0]}</p>
                        <p>{'2. ' + student.orderedRankings[1]}</p>
                        <p>{'3. ' + student.orderedRankings[2]}</p>
                        <p>{'4. ' + student.orderedRankings[3]}</p>
                        <p>{'5. ' + student.orderedRankings[4]}</p>
                    </PopoverBody>
                </Popover>
            </div>
        );
    }
}

export default StudentCard;