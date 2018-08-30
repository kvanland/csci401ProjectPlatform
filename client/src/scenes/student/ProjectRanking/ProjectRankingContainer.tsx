import * as React from 'react';
import update from 'immutability-helper';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ProjectCard from './ProjectCard';
import ItemTypes from './ItemTypes';
import {
    Button,
    Grid,
    Row,
    Col,
} from 'react-bootstrap';

const style = {
    width: 600,
    float: 'none',
    margin: 'auto',
};

const cardTarget = {
    drop() {
        return undefined;
    },
};

interface Props {
    connectDropTarget?: any;
}

interface State {
    isLoading: boolean;
    projectCards: Array<Project>;
    rankingData: Array<number>;
    submitted: boolean;
    email: string;
}

interface Project {
    projectId: number;
    projectName: string;
    statusId: number;
    minSize: number;
    maxSize: number;
    technologies: string;
    background: string;
    description: string;
}

@DragDropContext(HTML5Backend)
@DropTarget(ItemTypes.CARD, cardTarget, connect => ({
    connectDropTarget: connect.dropTarget(),
}))

class ProjectRankingContainer extends React.Component<Props, State> {

    constructor(props: any) {
        super(props);
        this.moveCard = this.moveCard.bind(this);
        this.findCard = this.findCard.bind(this);
        this.submitClicked = this.submitClicked.bind(this);
        this.state = {
            isLoading: false,
            projectCards: [],
            rankingData: [],
            submitted: false,
            email: ''
        };
    }

    submitClicked() {
        var submit = confirm('Are you sure you want to submit rankings?');
        if (submit) {
            var request = new XMLHttpRequest();
            request.withCredentials = true;
            request.open('POST', 'http://localhost:8080/projects/' + sessionStorage.getItem('email') + '/submit-ranking');
            request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
            /*var data = JSON.stringify({
            project1: this.state.projectCards[0].projectName,
            project2: this.state.projectCards[1].projectName,
            project3: this.state.projectCards[2].projectName,
            project4: this.state.projectCards[3].projectName,
            project5: this.state.projectCards[4].projectName
            });*/
            
            this.state.projectCards.map((project: Project) => (
                this.state.rankingData.push(project.projectId)
            ));
            var data = JSON.stringify(
               this.state.rankingData
            );
            request.setRequestHeader('Cache-Control', 'no-cache');
            request.send(data);
            alert('Project rankings have been submitted!');
            this.setState({submitted: true});
        }
    }

    componentDidMount() {
        this.setState({isLoading: true});
   
        fetch('http://localhost:8080/projects')
            .then(response => response.json())
            .then(data => this.setState({projectCards: data, isLoading: false}));
    }

    moveCard(id: number, atIndex: number) {
        const { projectCard, index } = this.findCard(id);
        this.setState(
            update(this.state, {
                projectCards: {
                    $splice: [[index, 1], [atIndex, 0, projectCard]],
                },
            }),
        );
    }

    findCard(id: number) {
        const { projectCards } = this.state;
        const projectCard = projectCards.filter(c => c.projectId === id)[0];

        return {
            projectCard,
            index: projectCards.indexOf(projectCard),
        };
    }

    render() {
        const { connectDropTarget } = this.props;
        const {projectCards, isLoading, submitted} = this.state;

        if (submitted) {
            return (
                <div style={style as any}>
                    <div style={{width: 600}}>
                        You have already submitted your rankings.
                    </div>
                </div>
            );
        }

        if (isLoading) {
            return <p>Loading...</p>;
        }

        return connectDropTarget(
            <div style={style as any}>
                <div style={{width: 600}}>
                    <h3>Rank Projects</h3>
                    <Grid>
                        <Row>
                            <Col lg={4}>
                                Drag to reorder projects by priority. 
                                Your first 5 preferences will be considered.
                                Click "Submit Rankings" when finished. 
                                Rankings can only be submitted once.
                            </Col>
                            <Col lg={2}>
                                <Button bsStyle="primary" onClick={this.submitClicked}>
                                    Submit Rankings
                                </Button>
                            </Col>
                        </Row>
                    </Grid>
                </div>
                <br />
                {projectCards.map((projectCard: Project, index: number) => (
                    <ProjectCard
                        key={projectCard.projectId}
                        rank={index + 1}
                        id={projectCard.projectId}
                        name={projectCard.projectName}
                        minSize={projectCard.minSize}
                        maxSize={projectCard.maxSize}
                        technologies={projectCard.technologies}
                        background={projectCard.background}
                        description={projectCard.description}
                        moveCard={this.moveCard}
                        findCard={this.findCard}
                    />
                ))}
            </div>
        );
    }
}

export default ProjectRankingContainer;