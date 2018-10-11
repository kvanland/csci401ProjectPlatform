import * as React from 'react';
import DeliverableList from './DeliverableList';
import ProjectInformation from './ProjectInformation';
import {
    RouteComponentProps
} from 'react-router';

const style = {
    width: 1000,
    float: 'none',
    margin: 'auto'
};

class ProjectPage extends React.Component<RouteComponentProps<any>> {
    constructor(props: RouteComponentProps<any>) {
        super(props);
    }

    render() {
        return (
                <div className="csci-container">
                    <div className="csci-main">
                        <ProjectInformation projectId={this.props.match.params.projectId} />
                        {/* <DeliverableList projectId={this.props.match.params.projectId} /> */}
                    </div>
                </div>
        
        );
    }
}

export default ProjectPage;