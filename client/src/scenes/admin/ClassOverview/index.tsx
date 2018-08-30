import * as React from 'react';
import {
    Panel,
    Button,
    Table,
    Form,
    FormGroup,
    FormControl,
} from 'react-bootstrap';
const viewIcon = require('../../../svg/viewIcon.svg');

class ClassOverview extends React.Component {
    render() {
        return (
        <div>
            <Panel>
            <Form horizontal={true}>
                <FormGroup controlId="formInlineSearch">
                    <FormControl type="text" placeholder="Search..." />
                </FormGroup>
                <Button type="submit" bsStyle="primary">Search Assignments</Button>
            </Form>
            </Panel>
            <Panel>
              <Panel.Heading>
                  Assignments
              </Panel.Heading>
              <Panel.Body>
                  <Button bsStyle="info">Update Selected on Blackboard</Button>
                  <Table>
                      <thead>
                          <tr>
                              <th>Select</th>
                              <th>Student</th>
                              <th>Assignment</th>
                              <th>Project Name</th>
                              <th>Date Submitted</th>
                              <th>Due Date</th>
                              <th>Recipient</th>
                              <th>View</th>
                          </tr>
                      </thead>
                      <tbody>
                          <tr>
                              <td><input type="checkbox"/>&nbsp;</td>
                              <td>Joan Hong</td>
                              <td>Peer Review 1</td>
                              <td>401 Project Platform</td>
                              <td>2/5/18</td>
                              <td>2/7/18</td>
                              <td>Student: Ingrid Wang</td>
                              <td><img src={viewIcon}/></td>
                          </tr>
                            <tr>
                              <td><input type="checkbox"/>&nbsp;</td>
                              <td>Nav Pillai</td>
                              <td>Weekly Status Report 4</td>
                              <td>401 Project Platform</td>
                              <td>2/8/18</td>
                              <td>2/8/18</td>
                              <td/>
                              <td><img src={viewIcon}/></td>
                          </tr>
                      </tbody>
                  </Table>
              </Panel.Body>
          </Panel>
        </div>
        );
    }
}

export default ClassOverview;
