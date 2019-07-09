describe('POC Visual Regression with Percy', function() {

  beforeEach('', function() {
    cy.visit('/')
  });

  it('Home Page', function() {
    cy.percySnapshot()
  });

  context('', function() {
    it('A/B Testing', function() {
      cy.get('[href="/abtest"]').click()
      cy.percySnapshot()
    });
  });

  context('Add/Remove Elements', function() {
    beforeEach('Access the page', function() {
      cy.get('[href="/add_remove_elements/"]').click()
    });

    it('Add Element', function() {
      cy.percySnapshot('Before Add Element')
      cy.get('[onclick="addElement()"]').click()
      cy.percySnapshot('After Add Element')
    });

    it('Remove Element',function() {
      cy.get('[onclick="addElement()"]').click()
      cy.get('[onclick="deleteElement()"]').click()
      cy.percySnapshot('After Delete Element')
    });
  });

  context('Basic Auth', function() {
    it('Basic Auth Success', function() {
      cy.visit('/basic_auth', {
        auth: {
          username: 'admin',
          password: 'admin'
        }
      });
      cy.get('.example p').then(($el) => {
        const text = $el.text().trim()
        expect(text).to.eq('Congratulations! You must have the proper credentials.')
      })
      cy.percySnapshot()
    });

    it('Basic Auth Fail', function() {
      cy.visit('/basic_auth', {
        auth: {
          username: 'admin',
          password: '321'
        },
        failOnStatusCode: false
      });
      cy.get('body').then(($el) => {
        const text = $el.text().trim()
        expect(text).to.eq('Not authorized')
      })
      cy.percySnapshot()
    });
  });

  context('Broken Images', function() {
    it('Broken Images', function() {
      cy.get('[href="/broken_images"]').click()
      cy.percySnapshot()
    });
  });

  context('Challenging DOM', function() {
    it('Challenging DOM', function() {
      cy.get('[href="/challenging_dom"]').click()
      cy.percySnapshot()
    });
  });
});