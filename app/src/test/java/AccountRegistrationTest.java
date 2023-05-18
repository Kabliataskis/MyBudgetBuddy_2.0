import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;

import java.util.UUID;

public class AccountRegistrationTest extends BaseTest{
    @Test

    void register(){
        AccountRegistration accountRegistration = new AccountRegistration(driver);

        String username = "user_" + UUID.randomUUID().toString().substring(0, 8);
        String email = UUID.randomUUID().toString().substring(0, 8) + "@example.com";
        String password = "password123";

        accountRegistration.setRegisterButton();
        accountRegistration.setUsernameField(username);
        accountRegistration.setEmail(email);
        accountRegistration.setPassword(password);
        accountRegistration.setConfirmPassword(password);
        accountRegistration.submitForm();

        String successMessage = accountRegistration.getSuccessMessage();
        Assertions.assertEquals(successMessage, "Paskyra sėkmingai sukurta.");
    }

}
