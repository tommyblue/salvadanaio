import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
    };
};

const mapDispatchToProps = dispatch => {
    return {
    }
};

class Dashboard extends React.Component {
    render() {
        return (
            <div className="container">
                <h1 className="title">Dashboard</h1>
            </div>
        );
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Dashboard);
