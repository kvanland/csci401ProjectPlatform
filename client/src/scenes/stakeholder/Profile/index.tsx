import * as React from 'react';
import {
    Card,
    Button,
    Form,
    FormGroup,
    Col,
    Input,
    Label,
    InputProps
} from 'reactstrap';
import { IUser } from '../../../common/interfaces';
import { getApiURI } from '../../../common/server';
import CardHeader from 'reactstrap/lib/CardHeader';
import CardTitle from 'reactstrap/lib/CardTitle';
import CardBody from 'reactstrap/lib/CardBody';
const style = {
    width: 1000,
    float: 'none',
    margin: 'auto'
};

interface IProfileProps {
}
interface IProfileState extends IUser {
    isLoading: boolean;
}

class StakeholderProfile extends React.Component<IProfileProps, IProfileState> {
    constructor(props: IProfileProps) {
        super(props);
        this.state = {
            firstName: '',
            email: '',
            phone: '',
            organization: '',
            isLoading: false,
        };
        this.submitClicked = this.submitClicked.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    async componentDidMount() {
        this.setState({ isLoading: true });

        try {
            const response = await fetch(getApiURI('users/' + sessionStorage.getItem('email')));
            const data = await response.json();

            this.setState({
                ...data,
                isLoading: false
            });
        } catch (e) {
            console.error(e);
        }
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

    public handleChange = (id: keyof IProfileState) => (e: React.ChangeEvent<HTMLInputElement>) => {
        this.setState({ [id]: e.currentTarget.value } as any);
    }

    render() {
        if (this.state.isLoading) {
            return <p>Loading...</p>;
        }

        return (
            <div style={style as any}>
                <Card>
                    <CardHeader><CardTitle>Profile</CardTitle></CardHeader>
                    <CardBody>
                        <Form horizontal={true}>
                            <FormGroup>
                                <Col componentClass={Label} sm={2}>
                                    First Name:
                    </Col>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        id="firstName"
                                        value={this.state.firstName}
                                        onChange={this.handleChange('firstName')}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={Label} sm={2}>
                                    Email:
                    </Col>
                                <Col sm={10}>
                                    <Input
                                        type="email"
                                        id="email"
                                        value={this.state.email}
                                        onChange={this.handleChange('email')}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={Label} sm={2}>
                                    Company/Organization:
                    </Col>
                                <Col sm={10}>
                                    <Input
                                        type="text"
                                        id="organization"
                                        value={this.state.organization}
                                        onChange={this.handleChange('organization')}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col componentClass={Label} sm={2}>
                                    Phone:
                    </Col>
                                <Col sm={10}>
                                    <Input
                                        type="tel"
                                        id="phone"
                                        value={this.state.phone}
                                        onChange={this.handleChange('phone')}
                                    />
                                </Col>
                            </FormGroup>

                            <FormGroup>
                                <Col smOffset={2} sm={10}>
                                    <Button type="submit" bsStyle="primary">Edit/Save Profile</Button>
                                </Col>
                            </FormGroup>
                        </Form>
                    </CardBody>
                </Card>
            </div>
        );
    }
}

export default StakeholderProfile;