import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;


public class AccountRegistration extends PageObject {
    @FindBy(xpath = "//*[@id=\"root\"]/div/div[2]/main/div[2]/button")
    private WebElement registerButton;

    @FindBy(id = "username")
    private WebElement usernameField;

    @FindBy(id = "email")
    private WebElement emailField;

    @FindBy(id = "password")
    private WebElement passwordField;

    @FindBy(id = "password_repeat")
    private WebElement confirmPasswordField;

    @FindBy(xpath = "//*[@id=\"root\"]/div/div[2]/main/div[2]/form/button")
    private WebElement submitButton;

    @FindBy(xpath = "//*[@id=\"root\"]/div/div[2]")
    private WebElement successMessage;

    @FindBy(css = ".Navbar > div.top_nav")
    private WebElement userInfo;

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

    public String getUserInfo() {
        return userInfo.getText();
    }
}
