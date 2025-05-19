describe('Home page testing', () => {
    beforeEach(() => {
        cy.visit('/login')
        cy.get('[data-cy="emailInput"').type("jan@jan.nl")
        cy.get('[data-cy="passwordInput"').type("123")
        cy.get('[data-cy="submit"]').click()
        cy.get('[data-cy="loginSpinner"').should('exist')
        cy.wait(8000)
        cy.url().should('eq', 'http://localhost:4200/home')


    })

    it('open add game to library dialog', () => {
        cy.get('[data-cy="addToLibraryButton"').should('exist')
        cy.get('[data-cy="addToLibraryButton"').click()
        cy.get('[data-cy="AddGameDialog"').should('exist')
    })

    //todo add game to library 


    it('open add game to server dialog', () => {
        cy.get('[data-cy="addToServerButton"').should('exist')
        cy.get('[data-cy="addToServerButton"').click()
        cy.get('[data-cy="addGameToServerDialog"').should('exist')
        cy.get('[data-cy="descriptionInput"').should('exist')
        cy.get('[data-cy="titleInput"').should('exist')
    })

    it('navigate to the first gameCard', () => {
        cy.get('[data-cy="gameCard"').should('exist')
        cy.get('[data-cy="gameCard"').first().click()
        cy.url().should('eq', 'http://localhost:4200/game/1')
    })



})