import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class LoginPage extends PageObject {




    @FindBy(css = "#username")
    private WebElement userName;

    @FindBy(css="#password")
    private WebElement password;

    @FindBy(css="form > .btn")
    private WebElement login;

    public LoginPage(WebDriver driver) {
        super(driver);
    }

    public void setUserName(String name) {
        userName.sendKeys(name);
    }

    public void setPassword (String value) {
        password.sendKeys(value);
    }

    public void clickLogin() {
        login.click();
    }

}