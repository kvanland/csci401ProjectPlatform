import * as React from 'react';
import {
  Panel,
  Alert
} from 'react-bootstrap';

const style = {
  width: 1000,
  float: 'none',
  margin: 'auto',
};

class AdminHome extends React.Component {
  
  render() {
    return (
          <div style={style as any}>
            <h3>Welcome back!</h3>
          </div>
    );
  }
}

export default AdminHome;