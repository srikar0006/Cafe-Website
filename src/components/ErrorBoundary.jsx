import { Component } from 'react';
import Fallback from './Fallback';

export default class ErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  handleReset = () => {
    this.setState({ hasError: false });
  };

  render() {
    if (this.state.hasError) {
      return <Fallback onReset={this.handleReset} />;
    }

    return this.props.children;
  }
}
