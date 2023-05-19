import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.support.FindBy;
import org.openqa.selenium.support.ui.Select;

public class ExpensesPage extends PageObject {


    @FindBy(css = ".btnAdd")
    private WebElement addExpense;

    @FindBy(css = "select#category")
    private WebElement chooseCategory;

    @FindBy(css = "#title")
    private WebElement chooseExpenseName;

    @FindBy(css = "#date")
    private WebElement chooseDate;

    @FindBy(css = "#sum")
    private WebElement chooseSum;


    @FindBy(css = "[type='submit']")
    private WebElement saveButton;

    public ExpensesPage(WebDriver driver) {
        super(driver);

    }

    public void clickAddExpense() {
        addExpense.click();
    }

    public void setChooseCategory(String category) {
        new Select(chooseCategory).selectByVisibleText(category);
    }

    public void setChooseExpenseName(String maxima) {
        chooseExpenseName.sendKeys(maxima);
    }

    public void setChooseDate(String data) {
        chooseDate.sendKeys(data);
    }

    public void setChooseSum(String chooseSum) {
        this.chooseSum.sendKeys(chooseSum);
    }

    public void setSaveButton() {
        saveButton.click();
    }
}

