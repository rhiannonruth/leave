describe('Clicking on the login button ', function(){
    var email, password, loginButton;

    beforeEach(function() {
      browser.get('/#/login');
      email = element(by.model('data.email'));
      password = element(by.model('data.password'));
      loginButton = element(by.id('login'));
    });

    it('should validate the credentials for a successful login and display the Dashboard view', function() {
      email.sendKeys('pat@pat.pat');
      password.sendKeys('patpatpat');

      loginButton.click().then(function() {
        expect(browser.getLocationAbsUrl()).toMatch('/tab/dashboard');
      });
    });

    it('should display a popup for an unsuccessful login', function() {
      email.sendKeys('test@test.com');
      password.sendKeys('blahblah');

      loginButton.click().then(function() {
        expect(browser.getLocationAbsUrl()).toMatch('login');

        var popup = element(by.css('.popup-container.popup-showing.active'));
        expect(popup.isDisplayed()).toBeTruthy();
      });
    });
});
