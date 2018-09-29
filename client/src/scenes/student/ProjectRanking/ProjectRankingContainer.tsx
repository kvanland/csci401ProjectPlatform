import * as React from 'react';
import update from 'immutability-helper';
import { DropTarget, DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import ProjectCard from './ProjectCard';
import ItemTypes from './ItemTypes';
import { getApiURI } from '../../../common/server';
import { Button, Intent, NonIdealState, Spinner, Card, Tooltip } from '@blueprintjs/core';

const cardTarget = {
    drop() {
        return undefined;
    },
};

interface IProjectRankingContainerProps {
    connectDropTarget?: any;
}

interface IProjectRankingContainerState {
    isLoading: boolean;
    projectCards: Array<IProject>;
    rankingData: Array<number>;
    submitted: boolean;
    email: string;
}

interface IProject {
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

class ProjectRankingContainer extends React.Component<IProjectRankingContainerProps, IProjectRankingContainerState> {

    constructor(props: IProjectRankingContainerProps) {
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

            this.state.projectCards.map((project: IProject) => (
                this.state.rankingData.push(project.projectId)
            ));
            var data = JSON.stringify(
                this.state.rankingData
            );
            request.setRequestHeader('Cache-Control', 'no-cache');
            request.send(data);
            alert('Project rankings have been submitted!');
            this.setState({ submitted: true });
        }
    }

    async componentDidMount() {
        this.setState({ isLoading: true });

        try {
            const response = await fetch(getApiURI('/projects'));
            const data = await response.json();

            this.setState({
                projectCards: data,
                isLoading: false
            });
        } catch (e) {
            console.error(e);
        }

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
        const { projectCards, isLoading, submitted } = this.state;

        if (submitted) {
            return (
                <div className="csci-form-container">
                    <div className="csci-form-actions">
                        <h3 style={{ margin: 0 }}>You've already submitted your rankings.</h3>
                    </div>
                </div>
            );
        }

        if (isLoading) {
            return <NonIdealState icon={<Spinner size={Spinner.SIZE_LARGE} />} />;
        }

        return connectDropTarget(
            <div className="csci-container">
                <div className="csci-side">
                    <Card>
                        <p>
                            Drag to reorder projects by priority.
                            Your first 5 preferences will be considered.
                            Click "Submit Rankings" when finished.
                        Rankings can only be submitted once.</p>
                    </Card>
                </div>
                <div className="csci-main">
                    <div className="csci-form-container">
                        <div className="csci-form-actions">
                            <h1 style={{ margin: 0 }}>Rank Projects</h1>
                        </div>
                        <Card className="csci-form">
                            {projectCards.map((projectCard: IProject, index: number) => (
                                <Tooltip
                                    wrapperTagName="div"
                                    targetTagName="div"
                                    position="right"
                                    content={
                                        <div style={{ padding: 20 }}>
                                            <strong>Project Description</strong>
                                            <p>{projectCard.description}</p>
                                            <br />
                                            <strong>Technologies Expected</strong>
                                            <p>{projectCard.technologies}</p>
                                            <br />
                                            <strong>Background Requested</strong>
                                            <p>{projectCard.background}</p>
                                        </div>}
                                >
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
                                </Tooltip>
                            ))}
                        </Card>
                        <div className="csci-form-actions">
                            <Button text="Submit Rankings" intent={Intent.PRIMARY} large={true} onClick={this.submitClicked} />
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default ProjectRankingContainer;