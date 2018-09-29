import * as React from 'react';
import { Card, FormGroup, InputGroup, TextArea, Button, Intent } from '@blueprintjs/core';

class FinalPresentationReviews extends React.Component {
    render() {
        return (
            <div className="csci-container">
                <div className="csci-side">
                    <Card>
                        <h2 style={{ marginTop: 0 }}>New Review</h2>
                        <FormGroup label="Project Name">
                            <InputGroup />
                        </FormGroup>

                        <FormGroup label="Review">
                            <TextArea />
                        </FormGroup>

                        <Button intent={Intent.PRIMARY} text="Submit" />
                    </Card>
                </div>
                <div className="csci-main">
                    <Card>
                        <h1 style={{ marginTop: 0 }}>Reviews</h1>
                        <div>
                            This feature has not been implemented yet.
                        </div>
                    </Card>
                </div>
            </div>
        );
    }
}

export default FinalPresentationReviews;