import org.junit.jupiter.api.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.Date;

public class ExpenseTest extends BaseTest {
    @Test
    void create () {
        LoginPage loginPage =  new LoginPage(driver);
        loginPage.setUserName("Agne");
        loginPage.setPassword("testuotoja1");
        loginPage.clickLogin();

        HomePage homePage = new HomePage(driver) ;

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOf(homePage.getExpenseLink()));
        homePage.clickExpenseLink();

        String expenseName = "Expense";

        ExpensesPage expensesPage = new ExpensesPage(driver);
        expensesPage.clickAddExpense();
        expensesPage.setChooseCategory("Laisvalaikis");
        expensesPage.setChooseExpenseName(expenseName);
        expensesPage.setChooseDate("05/19/2023");
        expensesPage.setChooseSum("50");
        expensesPage.setSaveButton();

        String expectedMessage = "Sėkmingai";
        wait.until(ExpectedConditions.textToBePresentInElement(expensesPage.getSuccessMessage(), expectedMessage));
        wait.until(ExpectedConditions.elementToBeClickable(expensesPage.getConfirmationButton()));
        expensesPage.clickConfirmationButton();

        // Delete
        expensesPage.deleteFirstExpense();
        wait.until(ExpectedConditions.elementToBeClickable(expensesPage.getConfirmationButton()));
        expensesPage.clickConfirmationButton();
        wait.until(ExpectedConditions.textToBePresentInElement(expensesPage.getSuccessMessage(), expectedMessage));
    }

}

