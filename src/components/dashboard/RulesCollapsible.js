import React from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { clearActiveRule } from '../../actions/rule';
import { uiOpenModalRule } from '../../actions/ui';
import { TableRules } from './TableRules'


export const RulesCollapsible = () => {

    const dispatch = useDispatch();

    const handleClickNewRule = () => {
        dispatch(uiOpenModalRule());
        dispatch(clearActiveRule());
    }

    return (

        <div>
            <button
                type="button"
                className="btn btn-success fab-add-rule"
                onClick={handleClickNewRule}
            >
                <i className="fas fa-plus"></i>
            </button>

            <Accordion defaultActiveKey="0">
                <Card>
                    <Card.Header>
                        <Accordion.Toggle as={Button} variant="link" eventKey="1">
                            Rules
                        </Accordion.Toggle>

                    </Card.Header>
                    <Accordion.Collapse eventKey="1">
                        <Card.Body>

                            <TableRules />

                        </Card.Body>
                    </Accordion.Collapse>
                </Card>
            </Accordion>

        </div>


    )
}
