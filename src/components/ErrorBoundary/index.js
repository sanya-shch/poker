import React from "react";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  render() {
    return this.state.hasError ? (
      <p>Error! Please reload.</p>
    ) : (
      this.props.children
    );
  }
}

export default ErrorBoundary;
