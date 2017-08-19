
import React, {
    Component
} from 'react'

class Join extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: '',
            email: '',
            username: ''
        };

        this.handleEmail = this.handleEmail.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
        this.handleUsername = this.handleUsername.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this)

    }

    handleEmail(event) {
        this.setState({email:event.target.value})
    }

    handlePassword(event) {
        this.setState({password:event.target.value})
    }

    handleUsername(event) {
        this.setState({username:event.target.value})
    }

    handleSubmit(event) {
        alert(this.state.email + ' ' +this.state.password);
        event.preventDefault()
    }


    render() {
        return (
            <form className="container" onSubmit={this.handleSubmit}>
                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="email" placeholder="Email" value={this.state.email} onChange={this.handleEmail}/>
                        <span className="icon is-small is-left">
                            <i className="fa fa-envelope"/>
                        </span>
                        <span className="icon is-small is-right">
                          <i className="fa fa-check"/>
                        </span>
                    </p>
                </div>

                <div className="field">
                    <p className="control has-icons-left has-icons-right">
                        <input className="input" type="text" placeholder="Username" value={this.state.username} onChange={this.handleUsername}/>
                        <span className="icon is-small is-left">
                            <i className="fa fa-user"/>
                        </span>
                        <span className="icon is-small is-right">
                          <i className="fa fa-check"/>
                        </span>
                    </p>
                </div>

                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePassword}/>
                        <span className="icon is-small is-left">
                          <i className="fa fa-lock"/>
                        </span>
                    </p>
                </div>

                <div className="field">
                    <p className="control has-icons-left">
                        <input className="input" type="password" placeholder="Password" value={this.state.password} onChange={this.handlePassword}/>
                        <span className="icon is-small is-left">
                          <i className="fa fa-lock"/>
                        </span>
                    </p>
                </div>

                <div className="field">
                    <p className="control">
                        <input className="button" type="submit" value="Submit"/>
                    </p>
                </div>
            </form>
        )
    }
}

export{Join};