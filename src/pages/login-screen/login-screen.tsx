import { FormEvent, ReactEventHandler, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useAppDispatch } from '../../hooks';
import { login } from '../../store/thunks/user';
import { Link } from 'react-router-dom';
import './login-screen.css';

type THTMLLoginForm = HTMLFormElement & {
  email: HTMLInputElement;
  password: HTMLInputElement;
}

type THandleChange = ReactEventHandler<HTMLInputElement | HTMLTextAreaElement>

function LoginScreen(): JSX.Element {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const dispatch = useAppDispatch();

  const handleChange: THandleChange = (evt) => {
    const {name, value} = evt.currentTarget;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = (evt: FormEvent<THTMLLoginForm>) => {
    evt.preventDefault();
    dispatch(login(formData));
  };

  return (
    <>
      <Helmet>
        <title>6 cities. Login</title>
      </Helmet>
      <main className="page__main page__main--login">
        <div className="page__login-container container">
          <section className="login">
            <h1 className="login__title">Sign in</h1>
            <form onSubmit={handleSubmit} className="login__form form" action="#" method="post">
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">E-mail</label>
                <div className="input-error">Invalid email address</div>
                <input
                  className="login__input form__input"
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="login__input-wrapper form__input-wrapper">
                <label className="visually-hidden">Password</label>
                <div className="input-error">Invalid password</div>
                <input
                  className="login__input form__input"
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>
              <button className="login__submit form__submit button" type="submit">
                Sign in
              </button>
            </form>
          </section>
          <section className="locations locations--login locations--current">
            <div className="locations__item">
              <Link className="locations__item-link" to="#">
                <span>Amsterdam</span>
              </Link>
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

export default LoginScreen;
