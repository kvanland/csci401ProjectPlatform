import * as React from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import {
    Button, Card,
} from 'reactstrap';
import { MdMenu, MdKeyboardArrowUp, MdKeyboardArrowDown } from 'react-icons/md';
import CardBody from 'reactstrap/lib/CardBody';

const panelStyle = {
    width: 600,
};

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
            isDragging,
            connectDragSource,
            connectDropTarget,
        } = this.props;
        const opacity = isDragging ? 0 : 1;
        const padding = 5;

        const title = name + ' (' + minSize + '-' + maxSize + ' students)';

        return connectDragSource(
            connectDropTarget(
                <div style={{ opacity }}>
                    <Button onClick={() => this.setState({ open: !this.state.open })} style={cardStyle as any}>
                        <MdMenu style={glyphStyle} />
                        {rank <= 5
                            ? <strong>{rank + '. ' + title}</strong>
                            : <small>{title}</small>
                        }
                        {this.state.open ? <MdKeyboardArrowUp style={{ padding }} /> : <MdKeyboardArrowDown style={{ padding }} />}
                    </Button>
                    <br />
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
                </div>
            ),
        );
    }
}

export default ProjectCard;