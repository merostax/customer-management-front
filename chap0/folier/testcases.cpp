#include <iostream>
#include <cmath>
#include <stdexcept>
double calculate_price(double baseprice, double specialprice, double extrprice, int extras, double discount)
{
    if (baseprice < 0 || specialprice < 0 || extrprice < 0 || discount < 0 || extras < 0) {
        throw std::invalid_argument("Invalid input values: Prices and discounts cannot be negative.");
    }
    double addon_discount;
    double result;

    if (extras >= 3)
        addon_discount = 10;
    else if (extras >= 5)
        addon_discount = 15;
    else
        addon_discount = 0;

    if (discount > addon_discount)
        addon_discount = discount;

    result = baseprice / 100.0 * (100 - discount) + specialprice + extrprice / 100.0 * (100 - addon_discount);

    return result;
}

bool test_calculate_price()
{
    double price;
    bool test_ok = true;

    // Testcase 01
    price = calculate_price(10000.00, 2000.00, 1000.00, 3, 0);
    test_ok = test_ok && (abs(price - 12900.00) < 0.01);

    // Testcase 02
    price = calculate_price(25500.00, 3450.00, 6000.00, 6, 0);
    test_ok = test_ok && (abs(price - 34050.00) < 0.01);

    // Testcase 20 (handling invalid price)
    price = calculate_price(-1000.00, 0.00, 0.00, 0, 0);
    test_ok = test_ok && (ERR_CODE == INVALID_PRICE);

    // Testcase 30 (handling invalid argument)
    price = calculate_price("abc", 0.00, 0.00, 0, 0);
    test_ok = test_ok && (ERR_CODE == INVALID_ARGUMENT);

    return test_ok;
}
