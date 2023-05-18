import org.openqa.selenium.SearchContext;
import org.openqa.selenium.support.PageFactory;

public abstract class PageObject<WebDriver> {

    protected WebDriver driver;

    public PageObject(WebDriver driver) {
        this.driver = driver;
        PageFactory.initElements((SearchContext) driver, this);
    }
}