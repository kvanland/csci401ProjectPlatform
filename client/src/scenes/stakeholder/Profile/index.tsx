import * as React from 'react';
import {
    Panel,
    Button,
    Form,
    FormGroup,
    Col,
    FormControl,
    ControlLabel    
} from 'react-bootstrap';
const style = {
    width: 1000,
    float: 'none',
    margin: 'auto'
};

interface ProfileProps {
}
interface User {
    firstName: string;
    email: string;
    phone: string;
    organization: string;
}
interface ProfileState {
    user: User;
    isLoading: boolean;
}

class StakeholderProfile extends React.Component<ProfileProps, ProfileState> {
    constructor(props: ProfileProps) {
        super(props);
        this.state = {
            user: {firstName: '', email: '', phone: '', organization: ''},
            isLoading: false,
        };
        this.submitClicked = this.submitClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        this.setState({isLoading: true});
        fetch('http://localhost:8080/users/' + sessionStorage.getItem('email'))
        .then(response => response.json())
        .then(data => this.setState({user: data, isLoading: false}));
        /*var request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open('GET', 'http://localhost:8080/users/' + sessionStorage.getItem('email'));
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.send();

        var that = this;
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
                var response = request.responseText;
                var jsonResponse = JSON.parse(response);
                var firstNameLiteral = 'firstName';
                var emailLiteral = 'email';
                var phoneLiteral = 'phone';
                var companyLiteral = 'companyName';
                that.setState({
                    name: jsonResponse[firstNameLiteral], 
                    email: jsonResponse[emailLiteral],
                    phone: jsonResponse[phoneLiteral],
                    company: jsonResponse[companyLiteral],
                    isLoading: false
                });
            }
        };*/
    }
    submitClicked() {
   /*     var request = new XMLHttpRequest();
        request.withCredentials = true;
        request.open('POST', 'http://localhost:8080//');
        request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
        var data = JSON.stringify({
            fullName: this.state.name,
            email: this.state.email,
            phone: this.state.phone
        });
        request.setRequestHeader('Cache-Control', 'no-cache');
        request.send(data);
        alert(request.responseText + 'Logging you in...');
        request.onreadystatechange = function() {
            if (request.readyState === 4) {
            }
        }; */
    }
    handleChange(e: any) {
        this.setState({ [e.target.id]: e.target.value });
    }        
    render() {
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div style={style as any}>
            <Panel>
            <Panel.Heading>
                Profile
            </Panel.Heading>
            <Panel.Body>
            <Form horizontal={true}>
                <FormGroup controlId="formHorizontalStakeholderName">
                    <Col componentClass={ControlLabel} sm={2}>
                        Name:
                    </Col>
                    <Col sm={10}>
                        <FormControl 
                            type="text" 
                            id="name"
                            value={this.state.user.firstName}
                            onChange={e => this.handleChange(e)} 
                        />
                    </Col>             
                </FormGroup>
                
                <FormGroup controlId="formHorizontalStakeholderEmail">
                    <Col componentClass={ControlLabel} sm={2}>
                        Email:
                    </Col>
                    <Col sm={10}>
                        <FormControl 
                            type="email" 
                            id="email"
                            value={this.state.user.email} 
                            onChange={e => this.handleChange(e)}  
                        />
                    </Col>             
                </FormGroup>

                <FormGroup controlId="formHorizontalStakeholderCompany">
                    <Col componentClass={ControlLabel} sm={2}>
                        Company/Organization:
                    </Col>
                    <Col sm={10}>
                        <FormControl 
                            type="text"
                            id="company" 
                            value={this.state.user.organization}
                            onChange={e => this.handleChange(e)} 
                        />
                    </Col>             
                </FormGroup>                
                
                <FormGroup controlId="formHorizontalStakeholderPhone">
                    <Col componentClass={ControlLabel} sm={2}>
                        Phone:
                    </Col>
                    <Col sm={10}>
                        <FormControl 
                                type="tel" 
                                id="phone"
                                value={this.state.user.phone}
                                onChange={e => this.handleChange(e)} 
                        />                    
                    </Col>             
                </FormGroup> 
                
                <FormGroup>
                    <Col smOffset={2} sm={10}>
                        <Button type="submit" bsStyle="primary">Edit/Save Profile</Button>
                    </Col>
                </FormGroup>               
            </Form>    
            </Panel.Body>
            </Panel>
            </div>
        );
    }
}

export default StakeholderProfile;