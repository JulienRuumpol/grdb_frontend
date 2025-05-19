describe('game-detail-page testing', () => {
    beforeEach(() => {
        cy.visit('/login')
        cy.get('[data-cy="emailInput"').type("jan@jan.nl")
        cy.get('[data-cy="passwordInput"').type("123")
        cy.get('[data-cy="submit"]').click()
        cy.get('[data-cy="loginSpinner"').should('exist')
        cy.wait(8000)
        cy.url().should('eq', 'http://localhost:4200/home')
        cy.get('[data-cy="gameCard"').should('exist')
        cy.get('[data-cy="gameCard"').first().click()
        cy.url().should('eq', 'http://localhost:4200/game/1')

    })
    it('place a review', () => {
        if (cy.get('[data-cy="gameCard"').should('exist')
        ) {

        }

    })

})