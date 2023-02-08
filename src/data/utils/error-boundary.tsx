import React from "react";

type ErrorBoundaryState = {
  hasError: boolean;
  error: any;
};

export const FallbackComponent = () => {
  return (
    <div className="w-screen h-screen">
      <div className="flex w-600 h-full flex-col justify-center gap-10 m-auto">
        <p className="text-white font-bold text-4xl">
          Ooops, something went wrong
        </p>
        <p className="text-white font-semibold text-xl">
          "We`re not quite sure what went wrong but we`re working hard to fix
          the problem. We`ll be up and running shortly!"
        </p>

        <div className="flex w-full gap-3">
          <button
            className="bg-dark px-5 py-3 text-white rounded-md font-semibold"
            onClick={() => window.location.reload()}
          >
            Reload page
          </button>
        </div>
      </div>
    </div>
  );
};

class ErrorBoundary extends React.Component<any, ErrorBoundaryState> {
  constructor(props: unknown) {
    super(props);
    this.state = { error: null, hasError: false };
  }

  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }

  render() {
    const { hasError, error } = this.state;
    const { children } = this.props;
    if (hasError) {
      return <FallbackComponent />;
    }

    return children;
  }
}

export default ErrorBoundary;
