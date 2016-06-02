var React = require('react');
var { Button, Modal } = require('react-bootstrap');

var Confirm = React.createClass({
    propTypes: {
        body: React.PropTypes.any.isRequired,
        buttonText: React.PropTypes.any,
        cancelText: React.PropTypes.any,
        confirmText: React.PropTypes.any,
        onConfirm: React.PropTypes.func.isRequired,
        title: React.PropTypes.string.isRequired,
        visible: React.PropTypes.bool,
    },

    getInitialState() {
        if (!this.props.visible) {
            return {
                isOpened: false,
            };
        } else {
            return {
                isOpened: true,
            };
        }
    },

    onButtonClick() {
        this.setState({
            isOpened: true,
        });
    },

    onClose() {
        this.setState({
            isOpened: false,
        });
    },

    onConfim() {
        this.setState({
            isOpened: false,
        });
        this.props.onConfirm();
    },

    render() {
        var content;
        if (this.props.children) {
            content = React.cloneElement(React.Children.only(this.props.children), {
                onClick: this.onButtonClick,
            });
        } else {
            content = (
                <Button onClick={this.onButtonClick}>
                    {this.props.buttonText}
                </Button>
            );
        }


        return (
            <span style={this.props.style}>
                {content}
                <Modal show={this.state.isOpened} onHide={this.onClose}>
                    <Modal.Header>
                        <Modal.Title>{this.props.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.body}
                    </Modal.Body>
                    <Modal.Footer>
                        <Button bsStyle="default" onClick={this.onClose}>{this.props.cancelText ? this.props.cancelText : 'Cancel'}</Button>
                        <Button bsStyle="danger" onClick={this.onConfim}>{this.props.confirmText ? this.props.confirmText : 'Confirm'}</Button>
                    </Modal.Footer>
                </Modal>
            </span>
        );
    },
});

module.exports = Confirm;