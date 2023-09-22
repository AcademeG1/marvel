import { Component } from "react/cjs/react.production.min";
import ErrorMessage from "../errorMessage/errorMessage";

class ErrorBoundary extends Component {
    state = {
        error: false,
    }

    componentDidCatch(err, info) {
        console.log(err, info)
        this.setState({error: true});
    }

    render () {
        if (this.state.error) {
            return (
                <h2 style={{textAlign: "center"}}>
                    Something went wrong
                    <ErrorMessage />
                </h2>
            )
        }
     
        return this.props.children;
    }
}

export default ErrorBoundary;