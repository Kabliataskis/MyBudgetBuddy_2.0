import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;


public class AccountRegistration extends PageObject {
    @FindBy(xpath = "//*[@id=\"root\"]/div/div[2]/main/div[2]/button")
    private WebDriver registerButton;

    @FindBy(id = "username")
    private WebDriver usernameField;

    @FindBy(id = "email")
    private WebDriver emailField;

    @FindBy(id = "password")
    private WebDriver passwordField;

    @FindBy(id = "password_repeat")
    private WebDriver confirmPasswordField;

    @FindBy(xpath = "//*[@id=\"root\"]/div/div[2]/main/div[2]/form/button")
    private WebDriver submitButton;

    @FindBy(xpath = "//*[@id=\"root\"]/div/div[2]")
    private WebDriver successMessage;

    public AccountRegistration(WebDriver driver) {
        super(driver);
    }

    public void setRegisterButton() {
        registerButton.click();
    }

    public void setUsernameField(String username) {
        usernameField.sendKeys(username);
    }

    public void setEmail(String email) {
        emailField.sendKeys(email);
    }

    public void setPassword(String password) {
        passwordField.sendKeys(password);
    }

    public void setConfirmPassword(String confirmPassword) {
        confirmPasswordField.sendKeys(confirmPassword);
    }

    public void submitForm() {
        submitButton.click();
    }

    public String getSuccessMessage() {
        return successMessage.getText();
    }
}
