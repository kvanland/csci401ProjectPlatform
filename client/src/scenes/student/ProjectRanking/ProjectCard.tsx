import * as React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import { MdMenu, MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import { Button } from '@blueprintjs/core';

const glyphStyle = {
    padding: '5px',
    cursor: 'move',
    opacity: 0.5,
};

const cardStyle = {
    textAlign: 'left',
    width: 600,
};

const cardSource = {
    beginDrag(props: any) {
        return {
            id: props.id,
            originalIndex: props.findCard(props.id).index,
        };
    },

    endDrag(props: any, monitor: any) {
        const { id: droppedId, originalIndex } = monitor.getItem();
        const didDrop = monitor.didDrop();

        if (!didDrop) {
            props.moveCard(droppedId, originalIndex);
        }
    },
};

const cardTarget = {
    canDrop() {
        return false;
    },

    hover(props: any, monitor: any) {
        const { id: draggedId } = monitor.getItem();
        const { id: overId } = props;

        if (draggedId !== overId) {
            const { index: overIndex } = props.findCard(overId);
            props.moveCard(draggedId, overIndex);
        }
    },
};

interface IProjectCardState {
    open: boolean;
}

interface IProjectCardProps {
    connectDragSource?: any;
    connectDropTarget?: any;
    isDragging?: boolean;
    rank: any;
    id: any;
    name: string;
    minSize: any;
    maxSize: any;
    technologies: any;
    background: any;
    description: any;
    moveCard: any;
    findCard: any;
}

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))

class ProjectCard extends React.Component<IProjectCardProps, IProjectCardState> {
    constructor(props: IProjectCardProps) {
        super(props);

        this.state = {
            open: false,
        };
    }

    render() {
        const {
            rank,
            name,
            minSize,
            maxSize,
            connectDragSource,
            connectDropTarget,
            isDragging,
        } = this.props;

        const title = name + ' (' + minSize + '-' + maxSize + ' students)';

        return connectDragSource(
            connectDropTarget(
                <div style={{ opacity: isDragging ? 0.3 : 1 }}>
                    <Button
                        onClick={() => this.setState({ open: !this.state.open })}
                        minimal={true}
                        fill={true}
                        large={true}
                        rightIcon="drag-handle-vertical"
                        alignText="left"
                        style={{ cursor: 'move' }}
                    >
                        {rank <= 5
                            ? <strong>{rank + '. ' + title}</strong>
                            : <small>{title}</small>
                        }
                    </Button>
                </div>
            ),
        );
    }
}

/*
    <Card expanded={this.state.open} style={panelStyle}>
        <CardBody>
            <strong>Project Description</strong>
            <p>{this.props.description}</p>
            <br />
            <strong>Technologies Expected</strong>
            <p>{this.props.technologies}</p>
            <br />
            <strong>Background Requested</strong>
            <p>{this.props.background}</p>
        </CardBody>
    </Card>
*/

export default ProjectCard;