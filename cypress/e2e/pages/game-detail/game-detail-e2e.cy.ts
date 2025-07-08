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
    it('place a review if possible', () => {
        var hasReview: Boolean = false;
        // somehow it still goes through here. Perhaps it's best to use this as a boolean
        if (cy.get('[data-cy="addReviewCard"').should('exist')) {
            cy.get('[data-cy="addReviewInput"').type("this a review made by cypress")
            cy.get('[data-cy="addReviewButton"').click()

            cy.get('[data-cy="reviewCard"').each(($el, index, $list) => {
                cy.wrap($el).find('[data-cy="reviewInput"').invoke('val')
                    .then(text => {
                        const reviewText = text;

                        // check if review text is equal to expected text
                        if (!hasReview && reviewText === "a lot of action which requires good gameplay") {
                            hasReview = true

                        }
                    });

                // check boolean value to be true
                cy.then(() => {
                    expect(hasReview).to.be.true;
                });
            })

        }
    })


    it('checks for exisiting review', () => {
        var hasReview: Boolean = false;

        cy.get('[data-cy="reviewCard"').each(($el, index, $list) => {
            cy.wrap($el).find('[data-cy="reviewInput"').invoke('val')
                .then(text => {
                    const reviewText = text;

                    // check if review text is equal to expected text
                    if (!hasReview && reviewText === "a lot of action which requires good gameplay") {
                        hasReview = true
                    }
                });


        })
        // check boolean value to be true
        cy.then(() => {
            expect(hasReview).to.be.true;
        });

    })

    it('removes the self created review', () => {

        cy.get('[data-cy="reviewCard"').each(($el, index, $list) => {
            cy.wrap($el).find('[data-cy="reviewInput"').invoke('val')
                .then(text => {
                    const reviewText = text;

                    // check if review text is equal to expected text
                    if (reviewText === "this a review made by cypress") {
                        cy.wrap($el).get('[data-cy="deleteReviewButton"').click
                        console.log("we found review")
                    }
                });



        })
        var hasReview: Boolean = false;

        cy.get('[data-cy="reviewCard"').each(($el, index, $list) => {
            cy.wrap($el).find('[data-cy="reviewInput"').invoke('val')
                .then(text => {
                    const reviewText = text;

                    // check if review text is equal to expected text
                    if (!hasReview && reviewText === "a lot of action which requires good gameplay") {
                        hasReview = true
                    }
                });


        })
        // check boolean value to be true
        cy.then(() => {
            expect(hasReview).to.be.false;
        });


    })


})