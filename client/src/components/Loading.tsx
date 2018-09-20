import * as React from 'react';
import { NonIdealState, Spinner } from '@blueprintjs/core';

export class Loading extends React.PureComponent {
    render() {
        return (
            <div className="csci-container" style={{ alignItems: 'center', justifyContent: 'center' }} >
                <NonIdealState icon={<Spinner size={Spinner.SIZE_LARGE} />} />
            </div>
        );
    }
}