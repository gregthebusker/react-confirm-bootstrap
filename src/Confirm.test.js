import React from 'react';
import ReactTestUtils from 'react-dom/test-utils';
import Confirm from './Confirm';

it('renders properly without onClose prop', () => {
    let component = ReactTestUtils.renderIntoDocument(
        <Confirm
            onConfirm={() => {}}
            body="Are you sure?"
            confirmText="Confirm"
            title="Confirmation">
            <button className="btn">Action</button>
        </Confirm>
    )

    // no modal dialog yet
    expect(
        ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'modal-dialog')
    ).toEqual([]);

    let actionButton = ReactTestUtils.findRenderedDOMComponentWithClass(
        component,
        'btn'
    );
    expect(actionButton.nodeType).toEqual(Node.ELEMENT_NODE);
    expect(actionButton.textContent).toMatch('Action');
});

it('renders properly with onClose prop', () => {
    let component = ReactTestUtils.renderIntoDocument(
        <Confirm
            onConfirm={() => {}}
            onClose={() => {}}
            body="Are you sure?"
            confirmText="Confirm"
            title="Confirmation">
            <button className="btn">Action</button>
        </Confirm>
    )

    // no modal dialog yet
    expect(
        ReactTestUtils.scryRenderedDOMComponentsWithClass(component, 'modal-dialog')
    ).toEqual([]);

    let actionButton = ReactTestUtils.findRenderedDOMComponentWithClass(
        component,
        'btn'
    );
    expect(actionButton.nodeType).toEqual(Node.ELEMENT_NODE);
    expect(actionButton.textContent).toMatch('Action');
});

it('click on confirm calls onConfirm callback', (done) => {
    var onConfirmCallback = function () {
        console.log('Confimred!');
        done();
    };

    let component = ReactTestUtils.renderIntoDocument(
        <Confirm
            onConfirm={() => {onConfirmCallback();}}
            body="Are you sure?"
            confirmText="Confirm"
            confirmBSStyle="danger"
            title="Confirmation">
            <button className="btn">Action</button>
        </Confirm>
    )

    let actionButton = ReactTestUtils.findRenderedDOMComponentWithClass(
        component,
        'btn'
    );
    ReactTestUtils.Simulate.click(actionButton);

    let confirmationDialog = ReactTestUtils.findRenderedDOMComponentWithClass(
        component,
        'modal-dialog'
    );
    expect(confirmationDialog).toBeTruthy();
    expect(confirmationDialog.nodeType).toEqual(Node.ELEMENT_NODE);

    let confirmButton = ReactTestUtils.findRenderedDOMComponentWithClass(
        component,
        'btn-danger'
    );
    expect(confirmButton).toBeTruthy();
    expect(confirmButton.nodeType).toEqual(Node.ELEMENT_NODE);

    ReactTestUtils.Simulate.click(confirmButton);
});

it('click on cancel calls onClose callback prop', (done) => {
    var onCloseCallback = function () {
        console.log('Closed!');
        done();
    };

    let component = ReactTestUtils.renderIntoDocument(
        <Confirm
            onConfirm={() => {console.log('Confirmed');}}
            onClose={() => {onCloseCallback();}}
            body="Are you sure?"
            confirmText="Confirm"
            confirmBSStyle="danger"
            title="Confirmation">
            <button className="btn">Action</button>
        </Confirm>
    )

    let actionButton = ReactTestUtils.findRenderedDOMComponentWithClass(
        component,
        'btn'
    );
    ReactTestUtils.Simulate.click(actionButton);

    let cancelButton = ReactTestUtils.findRenderedDOMComponentWithClass(
        component,
        'btn-default'
    );
    expect(cancelButton).toBeTruthy();
    expect(cancelButton.nodeType).toEqual(Node.ELEMENT_NODE);

    ReactTestUtils.Simulate.click(cancelButton);
});
