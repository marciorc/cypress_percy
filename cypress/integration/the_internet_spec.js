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

  context('Checkboxes', function() {
    it('Checkboxes', function() {
      cy.get('[href="/checkboxes"]').click()
      cy.percySnapshot('Before Check')

      cy.get('[type="checkbox"]:first-child').click()
      cy.get('[type="checkbox"]:last-child').click()

      cy.percySnapshot('After Checks')
    });
  });

  context('File Upload', function() {
    it('Upload a file', function() {
      cy.get('[href="/upload"]').click()
      cy.percySnapshot('Before upload file')

      const fileName = 'file.txt';
      cy.fixture(fileName).then(fileContent => {
        cy.get('#file-upload').upload({ fileContent, fileName, mimeType: 'plain/text' });
      });
      cy.get('#file-submit').click()

      cy.get('#uploaded-files').then(($el) => {
        const text = $el.text().trim()
        expect(text).to.eq(fileName)
      });
      cy.percySnapshot('After upload file')
    });
  });
});