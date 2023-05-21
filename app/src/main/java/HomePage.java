import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class HomePage extends PageObject {

    @FindBy(xpath = "//*[@id=\"root\"]/div/div[2]")
    private WebElement successMessage;

    @FindBy(xpath = "/html//div[@id='root']//div[@class='top_nav']")
    private WebElement userInfo;

    @FindBy(css = "#nav_islaidos")
    private WebElement expenseLink;

    @FindBy(css = "#nav_pajamos")
    private WebElement incomeLink;

    public HomePage(WebDriver driver) {
        super(driver);
    }

    public WebElement getExpenseLink() {
        return expenseLink;
    }

    public void clickExpenseLink() {
        this.expenseLink.click();
        ;
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

    public WebElement getIncomeLink() {
        return incomeLink;
    }
    public void clickIncomeLink() {
        this.incomeLink.click();
    }
}
