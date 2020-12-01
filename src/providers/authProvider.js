import React from 'react';

const AuthContext = React.createContext({
  accessToken: false,
  setAccessToken: () => {}
});

/**
 * The initial value of `accessToken` comes from the `accessToken`
 * prop which gets set by _app. We store that value in state and ignore
 * the prop from then on. The value can be changed by calling the
 * `setAccessToken()` method in the context.
 */
export const AuthProvider = ({ children, newAccessToken }) => {
  const [accessToken, setAccessToken] = React.useState(newAccessToken);
  
  return (
    <AuthContext.Provider value={{ accessToken, setAccessToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export function getAuthContext() {
  const context = React.useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}

// Acts as getter for token from context.
export function getAccessToken() {
  const context = getAuthContext();
  return context.accessToken;
}