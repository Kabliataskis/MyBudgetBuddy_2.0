import dev.failsafe.internal.util.Assert;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;

public class IncomeTest extends BaseTest {

    @Test
    public void insertEditDeleteIncome(){

        LoginPage loginPage =  new LoginPage(driver);
        loginPage.setUserName("Inga");
        loginPage.setPassword("laivelis1");
        loginPage.clickLogin();

        HomePage homePage = new HomePage(driver) ;

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOf(homePage.getIncomeLink()));
        homePage.clickIncomeLink();

        IncomePage incomePage = new IncomePage(driver);

        incomePage.clickIncomeButton();
        incomePage.createIncome("Alga", "05/23/2023", 1000);

        String expectedMessage = "Sėkmingai";
        wait.until(ExpectedConditions.textToBePresentInElement(incomePage.getSuccessMessage(), expectedMessage));
    }
}
