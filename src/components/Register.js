import React from "react";
import { Link, withRouter} from 'react-router-dom';
import * as auth from './auth.js';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        email: '',
        password: '',
        message: '',
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
      }
      handleChange = (e) => {
        const {name, value} = e.target;
        this.setState({
          [name]: value
        });
      }
      handleSubmit = (e) => {
        e.preventDefault();
        auth.register(this.state.password, this.state.email)
          .then((res) =>{
              if(res){
              this.setState({
                message: ''
              }, () => {
                this.props.history.push('/sign-in');
               })
               this.props.notify()
              }
            }).catch((err) =>{
               this.setState({
                message: 'Что-то пошло не так!'
              })
              this.props.error()
            }).finally(() => this.props.isOpen(true))
          }
        
      
      render(){
        return (
          <div className="register">
            <p className="register__welcome">
                Регистрация
            </p>
            <form onSubmit={this.handleSubmit} className="form-auth">
              <input  name="email" type="email" value={this.state.email} onChange={this.handleChange} className="form-auth__input" placeholder="Email" />
              <input  name="password" type="password" value={this.state.password} onChange={this.handleChange} className="form-auth__input" placeholder="Пароль"/>
              <div className="register__button-container">
                <button type="submit" onSubmit={this.handleSubmit} className="register__link">Зарегистрироваться</button>
              </div>
            </form>
            <div className="register__signin">
              <p>Уже зарегистрированы?</p>
              <Link to="sign-in" className="register__login-link">Войти</Link>
            </div>
            </div>
      );
}
}
export default withRouter(Register);