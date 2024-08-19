package SeliniumTests;
import org.junit.jupiter.api.*;
import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.htmlunit.HtmlUnitDriver;
import org.openqa.selenium.support.ui.ExpectedConditions;
import org.openqa.selenium.support.ui.WebDriverWait;

import java.time.Duration;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

public class CustomerIT {

    private WebDriver driver;
    private LoginHelper loginHelper;

    @BeforeEach
    public void setUp() {
        driver = new HtmlUnitDriver();
        loginHelper = new LoginHelper(driver);
        loginHelper.login("fabiola.jackson@bikes.shop", "555-5554");

    }

    @AfterEach
    public void tearDown() {
        driver.quit();
    }

    @Test
    public void testCustomerUpdateForm() {
        driver.get("http://localhost:8080/redirect/customers.xhtml");
        List<WebElement> customerRows = driver.findElements(By.xpath("//table[@id='customerTable']//tbody/tr"));
        if (customerRows.size()<2) {
            System.out.println("No customers found in the table.");
            return;
        }
        WebElement firstRowEditButton = driver.findElement(By.xpath("//input[@type='submit' and @value='edit / Details']"));
        firstRowEditButton.click();

        WebDriverWait wait = new WebDriverWait(driver, Duration.ofSeconds(10));
        wait.until(ExpectedConditions.visibilityOfElementLocated(By.id("updateForm:city")));
        WebElement cityField = driver.findElement(By.id("updateForm:city"));
        cityField.clear();
        cityField.sendKeys("New City");
        System.out.println("Entered city: " + cityField.getAttribute("value"));

        WebElement emailField = driver.findElement(By.id("updateForm:email"));
        emailField.clear();
        emailField.sendKeys("new.email@example.com");
        System.out.println("Entered email: " + emailField.getAttribute("value"));

        WebElement firstNameField = driver.findElement(By.id("updateForm:firstName"));
        firstNameField.clear();
        firstNameField.sendKeys("NewFirstName");
        System.out.println("Entered first name: " + firstNameField.getAttribute("value"));

        WebElement lastNameField = driver.findElement(By.id("updateForm:lastName"));
        lastNameField.clear();
        lastNameField.sendKeys("NewLastName");
        System.out.println("Entered last name: " + lastNameField.getAttribute("value"));

        WebElement phoneField = driver.findElement(By.id("updateForm:phone"));
        phoneField.clear();
        phoneField.sendKeys("1234567890");
        System.out.println("Entered phone: " + phoneField.getAttribute("value"));

        WebElement stateField = driver.findElement(By.id("updateForm:state"));
        stateField.clear();
        stateField.sendKeys("New State");
        System.out.println("Entered state: " + stateField.getAttribute("value"));

        WebElement streetField = driver.findElement(By.id("updateForm:street"));
        streetField.clear();
        streetField.sendKeys("123 New Street");
        System.out.println("Entered street: " + streetField.getAttribute("value"));

        WebElement zipCodeField = driver.findElement(By.id("updateForm:zipCode"));
        zipCodeField.clear();
        zipCodeField.sendKeys("12345");
        System.out.println("Entered postal code: " + zipCodeField.getAttribute("value"));

        WebElement updateButton = driver.findElement(By.xpath("//input[@type='submit' and @value='Update']"));
        updateButton.click();

        WebElement messagesElement = driver.findElement(By.className("messages"));
        String messagesText = messagesElement.getText();
        assertTrue(messagesText.contains("Success! Customer updated successfully."), "Success! Customer updated successfully.");
    }
    @Test
    public void testDeleteCustomer() {
        driver.get("http://localhost:8080/redirect/customers.xhtml");
        List<WebElement> customerRows = driver.findElements(By.xpath("//table[@id='customerTable']//tbody/tr"));
        if (customerRows.size() < 2) {
            System.out.println("No customers found in the table.");
            return;
        }
        System.out.println(customerRows.getFirst().getText());
        assertEquals("5  Homer  Simpson", customerRows.getFirst().getText().trim());
        WebElement firstRowEditButton = driver.findElement(By.xpath("//input[@type='submit' and @value='Delete']"));
        firstRowEditButton.click();

        List<WebElement> newCustomerRows = driver.findElements(By.xpath("//table[@id='customerTable']//tbody/tr"));
        System.out.println(newCustomerRows.getFirst().getText());
        assertNotEquals(newCustomerRows, customerRows);
    }
    @Test
    public void testCustomerCreateForm() {
        driver.get("http://localhost:8080/redirect/customerCreate.xhtml");
        WebElement cityField = driver.findElement(By.id("createForm:city"));
        cityField.sendKeys("Springfield");

        WebElement emailField = driver.findElement(By.id("createForm:email"));
        emailField.sendKeys("homer.simpson@example.com");

        WebElement firstNameField = driver.findElement(By.id("createForm:firstName"));
        firstNameField.sendKeys("Homer");

        WebElement lastNameField = driver.findElement(By.id("createForm:lastName"));
        lastNameField.sendKeys("Simpson");

        WebElement phoneField = driver.findElement(By.id("createForm:phone"));
        phoneField.sendKeys("5551234567");

        WebElement stateField = driver.findElement(By.id("createForm:state"));
        stateField.sendKeys("IL");

        WebElement streetField = driver.findElement(By.id("createForm:street"));
        streetField.sendKeys("742 Evergreen Terrace");

        WebElement zipCodeField = driver.findElement(By.id("createForm:zipCode"));
        zipCodeField.sendKeys("62704");

        WebElement createButton = driver.findElement(By.xpath("//input[@type='submit' and @value='Create']"));
        createButton.click();

        WebElement messagesElement = driver.findElement(By.className("messages"));
        String messagesText = messagesElement.getText();
        assertTrue(messagesText.contains("Success! Customer created successfully."), "Success message should be displayed");
    }

}
