import * as React from 'react';
import PropTypes from 'prop-types';
import { DragSource, DropTarget } from 'react-dnd';
import ItemTypes from './ItemTypes';
import {
    Button,
    Glyphicon,
    Panel,
} from 'react-bootstrap';

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

interface State {
    open: boolean;
}

interface Props {
    connectDragSource?: PropTypes.func.isRequired;
    connectDropTarget?: PropTypes.func.isRequired;
    isDragging?: PropTypes.bool.isRequired;
    rank: PropTypes.any.isRequired;
    id: PropTypes.any.isRequired;
    name: PropTypes.string.isRequired;
    minSize: PropTypes.any.isRequired;
    maxSize: PropTypes.any.isRequired;
    technologies: PropTypes.any.isRequired;
    background: PropTypes.any.isRequired;
    description: PropTypes.any.isRequired;
    moveCard: PropTypes.func.isRequired;
    findCard: PropTypes.func.isRequired;
}

@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))
@DragSource(ItemTypes.CARD, cardSource, (connect, monitor) => ({
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
}))

class ProjectCard extends React.Component<Props, State> {
    constructor(props: Props) {
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
                        <Glyphicon glyph="menu-hamburger" style={glyphStyle}/>
                        {rank <= 5
                            ? <strong>{rank + '. ' + title}</strong>
                            : <small>{title}</small>
                        }
                        <Glyphicon glyph={this.state.open ? 'menu-up' : 'menu-down'} style={{padding}}/>
                    </Button>
                    <br />
                    <Panel expanded={this.state.open} style={panelStyle}>
                        <Panel.Collapse>
                            <Panel.Body>
                                <strong>Project Description</strong>
                                <p>{this.props.description}</p>
                                <br/>
                                <strong>Technologies Expected</strong>
                                <p>{this.props.technologies}</p>
                                <br/>
                                <strong>Background Requested</strong>
                                <p>{this.props.background}</p>
                            </Panel.Body>
                        </Panel.Collapse>
                    </Panel>
                </div>
            ),
        );
    }
}

export default ProjectCard;