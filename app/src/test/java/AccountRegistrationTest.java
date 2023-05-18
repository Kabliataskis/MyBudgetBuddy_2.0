import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.UUID;
import java.util.concurrent.TimeUnit;

public class AccountRegistrationTest extends BaseTest{
    @Test

    void register(){

        AccountRegistration accountRegistration = new AccountRegistration(driver);

        String username = "user" + UUID.randomUUID().toString().substring(0, 8);
        String email = UUID.randomUUID().toString().substring(0, 8) + "@example.com";
        String password = "password123";

        accountRegistration.setRegisterButton();
        accountRegistration.setUsernameField(username);
        accountRegistration.setEmail(email);
        accountRegistration.setPassword(password);
        accountRegistration.setConfirmPassword(password);
        accountRegistration.submitForm();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        HomePage homePage = new HomePage(driver);
        
        // Laukiam kol atsiras sukurto userio name navigacijoj
        wait.until(ExpectedConditions.textToBePresentInElement(homePage.getUserInfoEl(), username));
//        String successMessage = homePage.getSuccessMessage();
//        Assertions.assertEquals(successMessage, "Paskyra sėkmingai sukurta.");
    }

}
