var React = require('react');
var { Button, Modal } = require('react-bootstrap');

var Confirm = React.createClass({
    propTypes: {
        body: React.PropTypes.node.isRequired,
        buttonText: React.PropTypes.node,
        showCancelButton: React.PropTypes.bool.isRequired,
        cancelText: React.PropTypes.node,
        confirmBSStyle: React.PropTypes.string,
        confirmText: React.PropTypes.node,
        onConfirm: React.PropTypes.func.isRequired,
        title: React.PropTypes.node.isRequired,
        visible: React.PropTypes.bool,
    },

    getDefaultProps() {
        return {
            cancelText: 'Cancel',
            showCancelButton: true,
            confirmText: 'Confirm',
            confirmBSStyle: 'danger',
        };
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
        var cancelButton = this.state.showCancelButton ?
            (<Button bsStyle="default" onClick={this.onClose}>{this.props.cancelText}</Button>) : null;
        var modal = (
            <Modal show={this.state.isOpened} onHide={this.onClose}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.body}
                </Modal.Body>
                <Modal.Footer>
                    {cancelButton}
                    <Button bsStyle={this.props.confirmBSStyle} onClick={this.onConfim}>{this.props.confirmText}</Button>
                </Modal.Footer>
            </Modal>
        );
        var content;
        if (this.props.children) {
            var btn = React.Children.only(this.props.children);
            content = React.cloneElement(btn, {
                onClick: this.onButtonClick,
                style: this.props.style
            },
                btn.props.children,
                modal
            );
        } else {
            content = (
                <Button onClick={this.onButtonClick} style={this.props.style}>
                    {this.props.buttonText}
                    {modal}
                </Button>
            );
        }
        return content;
    },
});

module.exports = Confirm;
