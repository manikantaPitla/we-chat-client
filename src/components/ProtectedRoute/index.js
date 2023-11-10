import { Redirect, Route } from "react-router-dom";

const ProtectedRoute = (props) => {
  const chatUserToken = localStorage.getItem("WeChatUser");

  if (chatUserToken === null) {
    return <Redirect to="/auth" />;
  }
  return <Route {...props} />;
};

export default ProtectedRoute;
