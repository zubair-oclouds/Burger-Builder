import React, { Component, ComponentType } from "react";
import Modal from "../../components/UI/Modal/Modal";
import { AxiosInstance } from "axios";

const withErrorHandler = (
  WrappedComponent: ComponentType,
  axios: AxiosInstance
) => {
  return class extends Component {
    state = {
      error: null as Error | null,
    };
    reqInterceptor: any;
    resInterceptor: any;
    componentDidMount(): void {
      this.reqInterceptor = axios.interceptors.request.use((req: any) => {
        console.log(req);
        this.setState({ error: null });
        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(
        (res: any) => res,
        (error: Error) => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount(): void {
        axios.interceptors.request.eject(this.reqInterceptor);
        axios.interceptors.response.eject(this.resInterceptor);
    }
    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <>
          {this.state.error && (
            <Modal
              show={this.state.error}
              modalClosed={this.errorConfirmedHandler}
            >
              {this.state.error.message}
            </Modal>
          )}
          <WrappedComponent {...this.props} />
        </>
      );
    }
  };
};

export default withErrorHandler;
