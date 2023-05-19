import org.junit.jupiter.api.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

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

        ExpensesPage expensesPage = new ExpensesPage(driver);
        expensesPage.clickAddExpense();
        expensesPage.setChooseCategory("Laisvalaikis");
        expensesPage.setChooseExpenseName("Maxima");
        expensesPage.setChooseDate("05/19/2023");
        expensesPage.setChooseSum("50");
        expensesPage.setSaveButton();

    }

}

