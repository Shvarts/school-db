import React, { Component } from 'react'
import {
    Button,
    ButtonToolbar,
    ButtonGroup
} from 'reactstrap'

const PagingButtons = (props, context) => {

    const prev = props.pageInfo.prev
    const next = props.pageInfo.next
    const first = props.pageInfo.first
    const last = props.pageInfo.last

    const selectPage = (page, offset, limit) => () => {
        console.log(page, offset, limit)
        return false
    }

    return (
        <nav>
            <ButtonGroup>
            <Button outline onClick={selectPage("Prev", prev.offset, prev.limit)} color="primary">Prev</Button>{' '}
            <Button outline onClick={selectPage("First", first.offset, first.limit)} color="primary">First</Button>{' '}
            <Button outline onClick={selectPage("Last", last.offset, last.limit)} color="primary">Last</Button>{' '}
            <Button outline onClick={selectPage("Next", next.offset, next.limit)} color="primary">Next</Button>{' '}
            </ButtonGroup>
        </nav>
    )
}

export default PagingButtons
