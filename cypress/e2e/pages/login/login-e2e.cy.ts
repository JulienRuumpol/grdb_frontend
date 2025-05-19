describe('login page testing', () => {
    beforeEach(() => {
        cy.visit('/login')
    })

    it('login with no info present ', () => {
        cy.get('[data-cy="submit"]').click()
        cy.get('[data-cy="displayEmailError"]').should('exist')
        cy.get('[data-cy="displayPasswordError"]').should('exist')
    })
    it('login with an invalid email', () => {
        cy.get('[data-cy="emailInput"').type("blablablabla")
        cy.get('[data-cy="submit"]').click()
        cy.get('[data-cy="displayEmailError"]').should('exist')


    })
    it('login with invalid password', () => {
        cy.get('[data-cy="emailInput"').type("jan@jan.nl")
        cy.get('[data-cy="passwordInput"').type("321")
        cy.get('[data-cy="submit"]').click()
        cy.wait(5000)
        // cy.get('[data-cy="displayAuthError"]').should('exist')
        cy.dataCy('displayAuthError').should('exist')

    })
    it('login with user info', () => {
        cy.get('[data-cy="emailInput"').type("jan@jan.nl")
        cy.get('[data-cy="passwordInput"').type("123")
        cy.get('[data-cy="submit"]').click()
        cy.get('[data-cy="loginSpinner"').should('exist')
        cy.wait(5000)
        cy.url().should('eq', 'http://localhost:4200/home')


    })

})