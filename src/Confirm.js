import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap/lib/Button';
import Modal from 'react-bootstrap/lib/Modal';

class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isOpened: props.visible
        };
        this.onButtonClick = this.onButtonClick.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onConfirm = this.onConfirm.bind(this);
    }

    onButtonClick() {
        // Since the modal is inside the button click events will propagate up.
        if (!this.state.isOpened) {
            this.setState({
                isOpened: true
            });
        }
    }

    onClose(event) {
        if (event) {
            event.stopPropagation();
        }
        this.setState({
            isOpened: false
        });

        if (typeof this.props.onClose === 'function') {
            this.props.onClose();
        }
    }

    onConfirm(event) {
        event.stopPropagation();
        this.setState({
            isOpened: false
        });
        this.props.onConfirm();
    }

    render() {
        var cancelButton = this.props.showCancelButton ? (
            <Button bsStyle="default" onClick={this.onClose}>
                {this.props.cancelText}
            </Button>
        ) : null;
        var modal = (
            <Modal show={this.state.isOpened} onHide={this.onClose} className={this.props.className} dialogClassName={this.props.dialogClassName}>
                <Modal.Header>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{this.props.body}</Modal.Body>
                <Modal.Footer>
                    {cancelButton}
                    <Button bsStyle={this.props.confirmBSStyle} onClick={this.onConfirm}>
                        {this.props.confirmText}
                    </Button>
                </Modal.Footer>
            </Modal>
        );
        var content;
        if (this.props.children) {
            var btn = React.Children.only(this.props.children);
            content = React.cloneElement(
                btn,
                {
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
    }
}

Confirm.propTypes = {
    body: PropTypes.node.isRequired,
    buttonText: PropTypes.node,
    cancelText: PropTypes.node,
    className: PropTypes.string,
    confirmBSStyle: PropTypes.string,
    confirmText: PropTypes.node,
    dialogClassName: PropTypes.string,
    onConfirm: PropTypes.func.isRequired,
    onClose: PropTypes.func,
    showCancelButton: PropTypes.bool.isRequired,
    title: PropTypes.node.isRequired,
    visible: PropTypes.bool
};

Confirm.defaultProps = {
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    confirmBSStyle: 'danger',
    showCancelButton: true
};

export { Confirm };
export default Confirm;
