import React from 'react';
import './Login.css';
import { useLogin } from './useLogin';

const Login: React.FC = () => {
  const { 
    username, setUsername, 
    password, setPassword, 
    rememberMe, handleMemberMe, 
    login, loading 
  } = useLogin();

  const handleSubmit = () => login({ login: username, password });
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) handleSubmit();
  };

  return (
    <div className="login-container">
      <div className="login-card">
        
        {/* Заголовок */}
        <div className="login-header">
          <div className="brand-icon">🚀</div>
          <h1 className="login-title">Мобильный инспектор</h1>
          <p className="login-subtitle">Сахатранснефтегаз</p>
        </div>

        {/* Форма входа */}
        <div className="login-form">
          <div className="input-group">
            <div className="input-with-icon">
              <div className="input-icon">👤</div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                onKeyPress={handleKeyPress}
                className="mobile-input"
                placeholder="Логин или Email"
                disabled={loading}
              />
            </div>
          </div>

          <div className="input-group">
            <div className="input-with-icon">
              <div className="input-icon">🔒</div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyPress={handleKeyPress}
                className="mobile-input"
                placeholder="Пароль"
                disabled={loading}
              />
            </div>
          </div>

          {/* Опции */}
          <div className="form-options">
            <label className="checkbox-container">
              <input
                type="checkbox"
                className="mobile-checkbox"
                checked={rememberMe}
                onChange={(e) => handleMemberMe(e.target.checked)}
                disabled={loading}
              />
              <span className="checkbox-label">Запомнить меня</span>
            </label>
            <a href="/forgot-password" className="forgot-link">
              Забыли пароль?
            </a>
          </div>

          {/* Кнопка входа */}
          <button
            onClick={handleSubmit}
            className="mobile-login-btn"
            disabled={loading}
          >
            {loading ? (
              <div className="loading-spinner"></div>
            ) : (
              'Войти в систему'
            )}
          </button>

          {/* Регистрация */}
          <div className="register-section">
            <p className="register-text">
              Нет аккаунта? <a href="/register" className="register-link">Зарегистрироваться</a>
            </p>
          </div>

          {/* Поддержка */}
          <div className="support-section">
            <div className="support-item">
              <span className="support-icon">📧</span>
              support@company.com
            </div>
            <div className="support-item">
              <span className="support-icon">📞</span>
              +7 (XXX) XXX-XX-XX
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;