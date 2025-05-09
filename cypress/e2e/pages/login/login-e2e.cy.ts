describe('login page testing', () => {
    beforeEach(() => {
        cy.visit('http://localhost:4200/login')
    })

    it('open login page ', () => {
        cy.get('[data-cy="submit"]').click()
    })
})