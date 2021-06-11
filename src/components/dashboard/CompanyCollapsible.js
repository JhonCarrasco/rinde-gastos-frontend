import React from 'react'
import { Accordion, Card, Button } from 'react-bootstrap'
import { TableCompanies } from './TableCompanies'

export const CompanyCollapsible = () => {
    
    
    return (

        <Accordion defaultActiveKey="0">
            <Card>
                <Card.Header>
                    <Accordion.Toggle as={Button} variant="link" eventKey="1">
                        Empresas
                    </Accordion.Toggle>
                </Card.Header>
                <Accordion.Collapse eventKey="1">
                    <Card.Body>
                        
                            <TableCompanies />
                        
                    </Card.Body>
                </Accordion.Collapse>
            </Card>
        </Accordion>

    )
}
