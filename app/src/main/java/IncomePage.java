import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;

public class IncomePage extends PageObject {
    @FindBy(css="div:nth-child(1) > div > button")
    private WebElement incomeButton;

    @FindBy(id="title")
    private WebElement addTitle;

    @FindBy(id="date")
    private WebElement addDate;

    @FindBy(id = "sum")
    private WebElement addIncome;

    @FindBy(css = "button.add-btn")
    private WebElement addButton;

    @FindBy(css = "h2.swal2-title#swal2-title")
    private WebElement successMessage;

    @FindBy(xpath = "//*[@id=\"root\"]/table/tbody/tr[1]/td[2]")
    private WebElement titleElementText;

    @FindBy(xpath = "//*[@id=\"root\"]/table/tbody/tr[1]/td[1]")
    private WebElement dateElementText;

    @FindBy(xpath = "//*[@id=\"root\"]/table/tbody/tr[1]/td[3]")
    private WebElement sumElementText;

    public IncomePage(WebDriver driver) {
        super(driver);
    }

    public void clickIncomeButton() {
        incomeButton.click();
    }

    public void createIncome(String title, String date, double sum){
        addTitle.sendKeys(title);
        addDate.sendKeys(date);
        addIncome.sendKeys(String.valueOf(sum));
        addButton.click();
    }

    public String getSuccessMessage(){
        return successMessage.getText();
    }
//    public boolean okIncome(String title, String date, double sum){
//        return title.equals(titleElementText) &&
//                date.equals(dateElementText) &&
//                String.valueOf(sum).equals(sumElementText);
//    }

}
