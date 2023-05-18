import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class HomePage extends PageObject {

    @FindBy(xpath = "//*[@id=\"root\"]/div/div[2]")
    private WebElement successMessage;

    @FindBy(xpath = "/html//div[@id='root']//div[@class='top_nav']")
    private WebElement userInfo;

    public HomePage(WebDriver driver) {
        super(driver);
    }

    public String getSuccessMessage() {
        return successMessage.getText();
    }

    public WebElement getSuccessMessageEl() {
        return successMessage;
    }

    public String getUserInfo() {
        return userInfo.getTagName();
    }

    public WebElement getUserInfoEl() {
        return userInfo;
    }
}
